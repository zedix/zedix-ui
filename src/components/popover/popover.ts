import type { Placement } from '@floating-ui/dom';
import { LitElement, html, PropertyValues, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { dispatchEvent } from '../../internals/event.js';
import { animate, stopAnimations } from '../../internals/animate';
import PopupController from '../../controllers/PopupController';
import styles from './popover.styles';

/**
 * A Popover custom HTML element.
 *
 * @example
 * ```html
 * <button id="btn-menu" type="button">Menu<Close>
 * <zx-popover for="btn-menu" placement="bottom">
 *   <div>Content</div>
 * </zx-popover>
 * ```
 *
 * @see https://open-ui.org/components/popup.research/
 */
export class Popover extends LitElement {
  static styles: CSSResultGroup = styles;

  private animations = new Map();
  private popup!: PopupController;

  /** The HTML id of the element triggering the popover. */
  @property()
  for = '';

  /** The event triggering the popover. */
  @property()
  trigger = 'click';

  /** The preferred placement of the popover. */
  @property()
  placement: Placement = 'bottom';

  /** The theme the popover. */
  @property()
  theme = 'light-border';

  /** The distance in pixels from the target element. */
  @property({ type: Number })
  distance = 8;

  /** The distance in pixels from the target element. */
  @property({ type: Number })
  showDelay = 0;

  /** The distance in pixels from the target element. */
  @property({ type: Number })
  hideDelay = 150;

  /** Whether or not the popover is visible. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Whether or not to display an arrow. */
  @property({ type: Boolean, reflect: true, attribute: 'arrow' })
  arrow = false;

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    // Default animations
    this.setAnimation('popover.fade.show', {
      keyframes: [
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1 },
      ],
      options: { duration: 150, easing: 'ease-in' },
    });

    this.setAnimation('popover.fade.hide', {
      keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.9 },
      ],
      options: { duration: 150, easing: 'ease-out' },
    });
  }

  setAnimation(name: 'popover.fade.show' | 'popover.fade.hide', animation: any) {
    this.animations.set(name, animation);
  }

  firstUpdated() {
    this.classList.add(this.theme);
    this.hidden = !this.open;
    this.popup = new PopupController(this, this.popupOptions());

    if (this.open) {
      this.popup.updatePosition();
    }
  }

  async updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      await this.handleOpenChange();
    } else {
      this.popup.setOptions(this.popupOptions());
      this.popup.updatePosition();
    }
  }

  async handleOpenChange() {
    const { keyframes, options } = this.animations.get(
      this.open ? 'popover.fade.show' : 'popover.fade.hide',
    );

    await stopAnimations(this);
    if (this.open) {
      this.popup.updatePosition();
      this.hidden = false; // must be after stopAnimations
      await animate(this, keyframes, options);
    } else {
      await animate(this, keyframes, options);
      this.hidden = true;
    }
    this.popup.targetElement.setAttribute('aria-expanded', this.open ? 'true' : 'false');
  }

  popupOptions() {
    return {
      target: this.for,
      trigger: this.trigger,
      distance: this.distance,
      placement: this.placement,
      showDelay: 0,
      hideDelay: 0,
    };
  }

  show() {
    this.open = true;
  }

  hide() {
    this.open = false;
  }

  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  render() {
    return html`
      <slot></slot>
      ${this.arrow ? html`<i part="arrow" role="presentation"></i>` : null}
    `;
  }
}

window.customElements.define('zx-popover', Popover);
