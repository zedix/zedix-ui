/* global Keyframe, KeyframeAnimationOptions */
import { LitElement, CSSResultGroup, PropertyValues, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, query, state } from 'lit/decorators.js';
import { animate, stopAnimations } from '../../internals/animate.js';
import { dispatchEvent } from '../../internals/event.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './dialog.styles.js';
import '../close-button/close-button.js';

/**
 * Dialog custom element wraps the standard interactive HTML `dialog` element.
 *
 * "The HTML dialog element is the recommended way to create such content because its features
 * were built to provide better and consistent usability and accessibility."
 *
 * Note on  in Safari/WebKit:
 * - WebKit tabbing must be activated in accessibility settings: https://github.com/tailwindlabs/headlessui/issues/1643#issuecomment-1245438358
 * - WebKit restore focus to previous element only if it had focus (not if clicked)
 *
 * Specs:
 * - [Dialog whatwg specification](https://html.spec.whatwg.org/dev/interactive-elements.html#the-dialog-element)
 * - [Dialog focusing steps](https://html.spec.whatwg.org/#dialog-focusing-steps)
 * - [Handle shadow DOM and <dialog> focusing](https://github.com/whatwg/html/pull/7285)
 * - [dialog & ::backdrop](https://github.com/web-platform-tests/interop/issues/12)
 *
 * Accessibility:
 * - [ARIA Authoring Practices Guide for a modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
 * - [Trapping focus completely is not desired](https://github.com/whatwg/html/issues/8339#issuecomment-1822591131)
 *  - Tabbing to browser/environment controls is desirable, page content controls are blocked.
 *
 * Browser Bugs:
 * - [Firefox: ::backdrop with animation does not work](https://bugzilla.mozilla.org/show_bug.cgi?id=1725177)
 * - [Webkit: Implement new dialog initial focus algorithm](https://bugs.webkit.org/show_bug.cgi?id=250795)
 *
 * Articles:
 * - [Dialogs and shadow DOM: can we make it accessible?](https://nolanlawson.com/2022/06/14/dialogs-and-shadow-dom-can-we-make-it-accessible/)
 * - [Use the dialog element (reasonably)](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html)
 *
 * Implementation References (Native dialog):
 * - https://github.com/material-components/material-web/blob/main/dialog/internal/dialog.ts#L293
 * - https://github.com/microsoft/fluentui/blob/master/packages/web-components/src/dialog/dialog.template.ts#L26
 * - https://ambitious-cliff-0c8148010.2.azurestaticapps.net/?path=/docs/webcomponents_components-dialog--default
 * - https://github.com/carbon-design-system/carbon/issues/13807
 * - https://github.com/primer/view_components/pull/2364
 *
 * Implementation References (Custom dialog):
 * - https://github.com/shoelace-style/shoelace/blob/next/src/components/dialog/dialog.component.ts#L68
 * - https://github.com/carbon-design-system/carbon-web-components/blob/main/src/components/modal/modal.ts#L65
 * - https://vaadin.com/docs/latest/components/confirm-dialog
 * - https://quasar.dev/vue-components/dialog/
 * * https://www.radix-ui.com/primitives/docs/components/dialog
 *
 * Notes:
 * -  When using the `<dialog>` in shadow DOM, using `<form method="dialog">` from the light DOM
 * will have no effect.
 */
export default class Dialog extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private readonly animations = new Map();

  // https://chromestatus.com/feature/4722261258928128
  // private closeWatcher: null;

  @query('dialog') dialog!: HTMLDialogElement;

  /**
   * Indicates whether or not the dialog is open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The title of the dialog.
   * If the dialog has no header, it will be used as `ariaLabel`.
   */
  @property()
  title = '';

  /**
   * By default, dialog is viewport centered; but can at the top of the screen with a fixed margin.
   */
  @property({ reflect: true })
  align: 'top' | 'center' = 'center';

  /**
   * Indicates the size of the dialog.
   */
  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' | 'default' = 'default';

  /**
   * Skips the opening and closing animations.
   */
  @property({ type: Boolean, reflect: true })
  quick = false;

  /**
   * A persistent dialogs is not dismissed when clicking outside of it or hitting the ESC key.
   */
  @property({ type: Boolean, reflect: true })
  persistent = false;

  /**
   * Do not render the dialog header.
   */
  @property({ type: Boolean, reflect: true })
  noHeader = false;

  /**
   * Do not render the default close button.
   */
  @property({ type: Boolean, reflect: true })
  noCloseButton = false;

  /**
   * Aria label of the close icon.
   */
  @property({ type: String, attribute: 'aria-close-label' })
  ariaCloseLabel = 'Close';

  /**
   * Gets or sets the dialog's return value, usually to indicate which button
   * a user pressed to close it.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue
   */
  @property({ attribute: false })
  returnValue = '';

  @state() private hasActions = false;

  constructor() {
    super();
    this.setupDefaultAnimations();
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
  }

  firstUpdated() {
    this.dialog.addEventListener('click', this.handleBackdropClick);
    if (this.open) {
      this.show();
    }
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  async updated(changedProperties: PropertyValues<this>) {
    // Note: changedProperties gives the property values from the previous update.
    // At the time of the first update, previous values are always undefined.
    if (changedProperties.get('open') === undefined && !this.open) {
      // If the open attribute is not truthy at first update, do nothing
      return;
    }
    if (changedProperties.has('open')) {
      await this.handleOpenChange();
    }
  }

  async handleOpenChange() {
    const { keyframes, options } = this.animations.get(this.open ? 'dialog.show' : 'dialog.close');

    await stopAnimations(this.dialog);
    if (this.open) {
      dispatchEvent(this, 'show');

      this.lockBodyScroll();

      // Dialog element must be rendered before any animate() call
      this.dialog.showModal();

      // Do not rely on browser focusing algorithm for `autofocus`:
      // Firefox & Safari do not resolve `autofocus` correctly when `<dialog>`
      // is in the shadow DOM and `autofocus` target in the light DOM.
      const autoFocusTarget = this.querySelector('[autofocus]') as HTMLElement;
      if (autoFocusTarget) {
        autoFocusTarget.focus({ preventScroll: true });
      }

      // Note: animate() helps to handle `prefers-reduced-motion: reduce`
      // (instead of relying on `animationend` event)
      await this.animateDialog(keyframes, options);
      dispatchEvent(this, 'after-show');
    } else {
      const event = dispatchEvent(this, 'close');
      if (event.defaultPrevented) {
        return;
      }
      this.dialog.classList.add('is-closing');
      await this.animateDialog(keyframes, options);
      this.dialog.classList.remove('is-closing');
      this.dialog.close();
      this.unlockBodyScroll();
      dispatchEvent(this, 'after-close');
    }
  }

  /**
   * Close the modal on ::backdrop click
   */
  async handleBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      // if event.target === dialog
      if (this.persistent) {
        const { keyframes, options } = this.animations.get('dialog.denyClose');
        await this.animateDialog(keyframes, options);
      } else {
        this.close();
      }
    }
  }

  async animateDialog(keyframes: Keyframe[], options: KeyframeAnimationOptions) {
    if (this.quick) {
      return Promise.resolve(true);
    }
    return await animate(this.dialog, keyframes, options);
  }

  handleCancelDialog(event: Event) {
    event.preventDefault();

    if (!this.persistent) {
      this.close();
    }
  }

  handleCloseDialog() {
    // Note: as of Chrome 120 `<dialog>` and `[popover]` make use of the `CloseWatcher` internally.
    // console.log(event, this.dialog.returnValue)
  }

  setAnimation(name: 'dialog.show' | 'dialog.close' | 'dialog.denyClose', animation: any) {
    this.animations.set(name, animation);
  }

  /**
   * This can be replaced in the near future) by:
   *
   * ```css
   * html:has(dialog[open]:modal) {
   *   overflow: hidden;
   * }
   *
   * html {
   *   scrollbar-gutter: stable both-edges;
   * }
   * ````
   *
   * @link https://caniuse.com/css-has
   */
  private lockBodyScroll() {
    const { body } = document;
    body.dataset.scrollY = String(window.scrollY);
    body.style.position = 'fixed';
    body.style.inset = '0';
    body.style.top = `-${body.dataset.scrollY}px`;
  }

  private unlockBodyScroll() {
    const { body } = document;
    body.style.position = '';
    body.style.top = '';
    body.style.inset = '';
    window.scrollTo(0, Number(body.dataset.scrollY));
  }

  setupDefaultAnimations() {
    // Default animations
    this.setAnimation('dialog.show', {
      keyframes: [
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 },
      ],
      options: { duration: 250, easing: 'ease' },
    });

    this.setAnimation('dialog.close', {
      keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.8 },
      ],
      options: { duration: 250, easing: 'ease' },
    });

    this.setAnimation('dialog.denyClose', {
      keyframes: [{ scale: 1 }, { scale: 1.02 }, { scale: 1 }],
      options: { duration: 250 },
    });

    /*
    this.setAnimation('dialog.show.bouncy', {
      keyframes: [
        { transform: 'scale(0)', opacity: 0, offset: 0 },
        { transform: 'scale(110%)', offset: 0.8 },
        { transform: 'scale(100%)', opacity: 1, offset: 1 },
      ],
      options: { duration: 600, easing: 'ease' },
    });
    */
  }

  private handleSlotActionsChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasActions = slot.assignedElements().length > 0;
  }

  render() {
    const classes = {
      'has-actions': this.hasActions,
    };

    return html`<dialog
      part="dialog"
      class=${classMap(classes)}
      data-open=${this.open}
      aria-label=${this.noHeader ? this.title : nothing}
      aria-labelledby=${this.noHeader ? nothing : 'title'}
      @cancel=${this.handleCancelDialog}
      @close=${this.handleCloseDialog}
      .returnValue=${this.returnValue || ''}
    >
      ${!this.noCloseButton
        ? html`
            <zx-close-button
              class="dialog__close-button"
              part="close"
              assistive-text="${this.ariaCloseLabel}"
              @close="${this.close}"
            ></zx-close-button>
          `
        : ''}
      ${!this.noHeader
        ? html`
            <header class="dialog__header" part="header">
              <h2 id="title" class="dialog__title" part="title">
                <slot name="title">${this.title}</slot>
              </h2>
            </header>
          `
        : ''}
      <div class="dialog__body" part="body">
        <slot></slot>
      </div>
      <footer class="dialog__footer" part="footer">
        <slot name="actions" @slotchange=${this.handleSlotActionsChange}></slot>
      </footer>
    </dialog>`;
  }
}
