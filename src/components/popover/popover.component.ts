/* global Keyframe, KeyframeAnimationOptions */
import type { Placement } from '@floating-ui/dom';
import { LitElement, html, PropertyValues, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { animate, stopAnimations, parseDurationInMilliseconds } from '../../internals/animate';
import componentStyles from '../../styles/component.styles.js';
import PopupController from '../../controllers/PopupController';
import styles from './popover.styles';

type PopoverAnimation =
  | 'popover.fade.show'
  | 'popover.fade.hide'
  | 'popover.shift-toward-extreme.show'
  | 'popover.shift-toward-extreme.hide';

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
export default class Popover extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private popup!: PopupController;

  private lastComputedPlacement;

  /** The HTML id of the element triggering the popover. */
  @property()
  for = '';

  /** The animation of the popover. */
  @property()
  animation: 'fade' | 'shift-toward-extreme' = 'fade';
  // 'shift-away', 'shift-toward', 'fade', 'scale', 'perspective'

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

  /**
   * Skips the opening and closing animations.
   */
  @property({ type: Boolean, reflect: true })
  quick = false;

  /** The delay in milliseconds before showing popover. */
  @property({ type: Number, attribute: 'show-delay' })
  showDelay = 0;

  /** The delay in milliseconds before hiding popover. */
  @property({ type: Number, attribute: 'hide-delay' })
  hideDelay = 150;

  /** Whether or not the popover is visible. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Whether or not to display an arrow. */
  @property({ type: Boolean, reflect: true, attribute: 'arrow' })
  arrow = false;

  /** Whether or not to display an arrow. */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  constructor() {
    super();
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.lastComputedPlacement = this.placement;
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

  /**
   * Retrieve a *placement-aware* animation.
   */
  getAnimation(animation: PopoverAnimation, placement: Placement) {
    // https://github.com/floating-ui/floating-ui/pull/2089
    const side = placement.split('-')[0];

    const duration = parseDurationInMilliseconds(
      getComputedStyle(this).getPropertyValue('--animation-duration'),
    );

    if (animation.includes('shift-toward-extreme')) {
      return {
        keyframes:
          animation === 'popover.shift-toward-extreme.show'
            ? [
                {
                  opacity: 0,
                  transform: {
                    top: 'translateY(-20px)',
                    bottom: 'translateY(20px)',
                    right: 'translateX(20px)',
                    left: 'translateX(-20px)',
                  }[side],
                },
                { opacity: 1 },
              ]
            : [
                { opacity: 1 },
                {
                  opacity: 0,
                  transform: {
                    top: 'translateY(-20px)',
                    bottom: 'translateY(20px)',
                    right: 'translateX(20px)',
                    left: 'translateX(-20px)',
                  }[side],
                },
              ],
        options: { duration, easing: 'ease-in' },
      };
    }

    return {
      keyframes:
        animation === 'popover.fade.show'
          ? [
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1 },
            ]
          : [
              { opacity: 1, scale: 1 },
              { opacity: 0, scale: 0.95 },
            ],
      options: { duration, easing: 'ease-in' },
    };
  }

  async animatePopover(keyframes: Keyframe[], options: KeyframeAnimationOptions) {
    if (this.quick) {
      return Promise.resolve(true);
    }
    return await animate(this, keyframes, options);
  }

  async handleOpenChange() {
    await stopAnimations(this);
    if (this.open) {
      this.popup.updatePosition().then(({ placement }) => {
        // Get the animation for the computed placement
        const { keyframes, options } = this.getAnimation(
          `popover.${this.animation}.show`,
          placement,
        );
        this.lastComputedPlacement = placement;
        this.animatePopover(keyframes, options);
      });
      this.hidden = false; // must be after stopAnimations
    } else {
      const { keyframes, options } = this.getAnimation(
        `popover.${this.animation}.hide`,
        this.lastComputedPlacement,
      );
      await this.animatePopover(keyframes, options);
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
      showDelay: this.showDelay,
      hideDelay: this.hideDelay,
      fullWidth: this.fullWidth,
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
