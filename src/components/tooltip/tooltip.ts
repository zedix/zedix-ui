import type { Placement } from '@floating-ui/dom';
import { LitElement, html, PropertyValues, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { dispatchEvent } from '../../internals/event';
import { animate, stopAnimations } from '../../internals/animate';
import PopupController from '../../controllers/PopupController';
import styles from './tooltip.styles';

/**
 * A Tooltip custom HTML element.
 *
 * @example
 * ```html
 * <button id="btn-close" type="button">✗<button>
 * <zx-tooltip for="btn-close" placement="bottom">Close</zx-tooltip>
 * ```
 *
 * @link https://www.w3.org/TR/wai-aria-1.2/#tooltip
 * @link https://open-ui.org/components/tooltip.research/
 * @link https://github.com/microsoft/fast/tree/master/packages/web-components/fast-foundation/src/tooltip
 */
export class Tooltip extends LitElement {
  static styles: CSSResultGroup = styles;

  private animations = new Map();
  private popup!: PopupController;

  /** The HTML id of the element triggering the tooltip. */
  @property()
  for = '';

  /** The event type triggering the tooltip. */
  @property()
  trigger = 'hover';

  /** The preferred placement of the tooltip. */
  @property()
  placement: Placement = 'top';

  /** The distance in pixels from the target element. */
  @property({ type: Number })
  distance = 8;

  /** Whether or not the tooltip is visible. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Whether or not to display an arrow. */
  @property({ type: Boolean, reflect: true, attribute: 'no-arrow' })
  noArrow = false;

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    // Default animations
    this.setAnimation('tooltip.show', {
      keyframes: [
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1 },
      ],
      options: { duration: 150, easing: 'ease-in' },
    });

    this.setAnimation('tooltip.hide', {
      keyframes: [
        { opacity: 1, scale: 1 },
        { opacity: 0, scale: 0.9 },
      ],
      options: { duration: 150, easing: 'ease-out' },
    });
  }

  setAnimation(name: 'tooltip.show' | 'tooltip.hide', animation: any) {
    this.animations.set(name, animation);
  }

  firstUpdated() {
    this.setAttribute('role', 'tooltip');
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
    }
  }

  async handleOpenChange() {
    const { keyframes, options } = this.animations.get(this.open ? 'tooltip.show' : 'tooltip.hide');

    await stopAnimations(this);

    if (this.open) {
      this.popup.updatePosition();
      this.hidden = false; // must be after stopAnimations
      await animate(this, keyframes, options);
    } else {
      await animate(this, keyframes, options);
      this.hidden = true;
    }
    this.setAttribute('aria-live', this.open ? 'polite' : 'off');
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
      ${this.noArrow ? null : html`<i part="arrow" role="presentation"></i>`}
      <slot></slot>
    `;
  }
}

window.customElements.define('zx-tooltip', Tooltip);
