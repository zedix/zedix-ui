import { LitElement, CSSResultGroup, PropertyValues, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { animate, stopAnimations } from '../../internals/animate';
import styles from './dialog.styles';

/**
 * Dialog based on the native HTML `dialog` element.
 *
 * Specs:
 * - [Dialog whatwg specification](https://html.spec.whatwg.org/dev/interactive-elements.html#the-dialog-element)
 * - [Handle shadow DOM and <dialog> focusing](https://github.com/whatwg/html/pull/7285)
 * - [dialog & ::backdrop](https://github.com/web-platform-tests/interop/issues/12)
 *
 * Bugs:
 * - [Firefox: ::backdrop with animation does not work](https://bugzilla.mozilla.org/show_bug.cgi?id=1725177)
 *
 * Articles:
 * - [Dialogs and shadow DOM: can we make it accessible?](https://nolanlawson.com/2022/06/14/dialogs-and-shadow-dom-can-we-make-it-accessible/)
 * - [Use the dialog element (reasonably)](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html)
 *
 * References:
 * - https://github.com/shoelace-style/shoelace/blob/next/src/components/dialog/dialog.component.ts#L68
 * - https://github.com/carbon-design-system/carbon-web-components/blob/main/src/components/modal/modal.ts#L65
 * - https://quasar.dev/vue-components/dialog/
 *
 * Notes:
 * -  When using the `<dialog>` in shadow DOM, using `<form method="dialog">` from the light DOM
 * will have no effect.
 */
export default class Dialog extends LitElement {
  static styles: CSSResultGroup = styles;

  private readonly animations = new Map();

  @query('dialog') dialog!: HTMLDialogElement;

  /**
   * Indicates whether or not the dialog is open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * By default, dialog is viewport centered; but can at the top of the screen with a fixed margin.
   */
  @property({ reflect: true })
  align: 'top' | 'center' = 'center';

  /**
   * Indicates the size of the dialog.
   */
  @property({ reflect: true })
  size: 'small' | 'default' | 'large' = 'default';

  /**
   * A persistent dialogs is not dismissed when clicking outside of it or hitting the ESC key.
   */
  @property({ type: Boolean, reflect: true })
  persistent = false;

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

  async show() {
    this.open = true;
  }

  async close() {
    this.open = false;
  }

  async updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      await this.handleOpenChange();
    }
  }

  async handleOpenChange() {
    const { keyframes, options } = this.animations.get(this.open ? 'dialog.show' : 'dialog.close');

    await stopAnimations(this.dialog);
    if (this.open) {
      this.lockBodyScroll();
      // Dialog element must be rendered before any animate() call
      this.dialog.showModal();
      // Note: animate() helps to handle `prefers-reduced-motion: reduce`
      // (instead of relying on `animationend` event)
      await animate(this.dialog, keyframes, options);
    } else {
      this.dialog.classList.add('is-closing');
      await animate(this.dialog, keyframes, options);
      this.dialog.classList.remove('is-closing');
      this.dialog.close();
      this.unlockBodyScroll();
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
        await animate(this.dialog, keyframes, options);
      } else {
        this.close();
      }
    }
  }

  handleCancelDialog(event: Event) {
    event.preventDefault();

    if (!this.persistent) {
      this.close();
    }
  }

  handleSubmitDialog() {
    // console.log('submit', event);
    this.open = false;
  }

  handleCloseDialog() {
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

  private setupDefaultAnimations() {
    // Default animations
    this.setAnimation('dialog.show', {
      keyframes: [
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 },
      ],
      options: { duration: 250, easing: 'ease' },
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
  }

  render() {
    return html`<dialog
      part="base"
      @cancel="${this.handleCancelDialog}"
      @close="${this.handleCloseDialog}"
    >
      <div>
        <header part="header">
          <h2 part="title">
            <slot name="label"></slot>
          </h2>
        </header>
        <slot></slot>
        <footer part="footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </dialog>`;
  }
}
