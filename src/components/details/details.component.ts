import { LitElement, html, PropertyValues, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { dispatchEvent } from '../../internals/event';
import { animate, stopAnimations, setKeyframesHeightAuto } from '../../internals/animate';
import styles from './details.styles';

export default class Details extends LitElement {
  static styles: CSSResultGroup = styles;

  private animations = new Map();

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ reflect: true })
  summary = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Number, reflect: false, attribute: 'animation-duration' })
  animationDuration = 225;

  constructor() {
    // Always call super() first
    super();

    /* https://cubic-bezier.com/#.01,1.22,.2,.89 */
    /* https://cubic-bezier.com/#.17,.67,.05,.95 */
    const animationEasing = 'cubic-bezier(.17,.67,.05,.95)';

    // Default animations
    this.setAnimation('details.show', {
      keyframes: [
        { height: '0', opacity: '0' },
        { height: 'auto', opacity: '1' },
      ],
      options: {
        duration: this.animationDuration,
        easing: animationEasing,
      },
    });

    this.setAnimation('details.hide', {
      keyframes: [
        { height: 'auto', opacity: '1' },
        { height: '0', opacity: '0' },
      ],
      options: {
        duration: this.animationDuration,
        easing: animationEasing,
      },
    });
  }

  get body(): HTMLElement {
    return this.shadowRoot!.querySelector('.details__body')!;
  }

  get bodyHeight() {
    return this.body!.scrollHeight;
  }

  firstUpdated() {
    // this.style.setProperty('--details-body-height', `${this.bodyHeight}px` );
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? 'auto' : '0';
  }

  async updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      await this.handleOpenChange();
    }
  }

  async handleOpenChange() {
    const { keyframes, options } = this.animations.get(this.open ? 'details.show' : 'details.hide');

    await stopAnimations(this.body);

    if (this.open) {
      // Show
      this.body.hidden = false;
      this.body.style.height = 'auto';
      await animate(this.body, setKeyframesHeightAuto(keyframes, this.bodyHeight), options);
    } else {
      // Hide
      await animate(this.body, setKeyframesHeightAuto(keyframes, this.bodyHeight), options);
      this.body.hidden = true;
      this.body.style.height = '0';
    }
  }

  handleSummaryKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.hide();
        break;

      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.show();
        break;
    }
  }

  setAnimation(name: 'details.show' | 'details.hide', animation: any) {
    this.animations.set(name, animation);
  }

  show() {
    if (this.open || this.disabled) {
      return;
    }
    this.open = true;
  }

  hide() {
    if (!this.open || this.disabled) {
      return;
    }
    this.open = false;
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
    dispatchEvent(this, 'toggle');
  }

  render() {
    // Note: <details> and <summary> are weirdos with some issues they need to work out.
    // https://www.scottohara.me/blog/2022/09/12/details-summary.html
    // https://github.com/whatwg/html/issues/2272
    return html`
      <header
        id="summary"
        part="summary"
        role="button"
        class="details__summary"
        aria-controls="content"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this.toggle}
        @keydown=${this.handleSummaryKeyDown}
      >
        <slot name="summary">${this.summary}</slot>
        <slot name="summary-icon">
          <span part="summary-icon" class="details__summary-icon"></span>
        </slot>
      </header>
      <div class="details__body">
        <div
          id="content"
          part="content"
          class="details__content"
          role="region"
          aria-labelledby="summary"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
