import { html, LitElement } from 'lit';
import { dispatchEvent } from '../../internals/event';
import { animate, stopAnimations } from '../../internals/animate';
import styles from './details.styles.js';

export class Details extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      open: {
        type: Boolean,
        reflect: true,
      },

      summary: {
        type: String,
        reflect: true,
      },

      disabled: {
        type: Boolean,
        reflect: true,
      },

      animationDuration: {
        attribute: 'animation-duration',
        type: Number,
        reflect: false,
      },
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.open = false;
    this.summary = '';
    this.disabled = false;

    /* https://cubic-bezier.com/#.01,1.22,.2,.89 */
    /* https://cubic-bezier.com/#.17,.67,.05,.95 */
    this.animation = 'on';
    this.animationEasing = 'cubic-bezier(.17,.67,.05,.95)';
    this.animationDuration = 225;
  }

  get body() {
    return this.shadowRoot.querySelector('.details__body');
  }

  get bodyHeight() {
    return this.body.scrollHeight;
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

  firstUpdated() {
    // this.style.setProperty('--details-body-height', `${this.bodyHeight}px` );
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? 'auto' : '0';
  }

  async updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        // Show
        await stopAnimations(this.body);
        this.body.hidden = false;
        this.body.style.height = 'auto';
        await this.animateShow();
      } else {
        // Hide
        await stopAnimations(this.body);
        await this.animateHide();
        this.body.hidden = true;
        this.body.style.height = '0';
      }
    }
  }

  animateShow() {
    return this.animationDuration > 0
      ? animate(
          this.body,
          [
            { height: '0', opacity: '0' },
            { height: `${this.bodyHeight}px`, opacity: '1' },
          ],
          {
            duration: this.animationDuration,
            easing: this.animationEasing,
          },
        )
      : Promise.resolve();
  }

  animateHide() {
    return this.animationDuration > 0
      ? animate(
          this.body,
          [
            { height: `${this.bodyHeight}px`, opacity: '1' },
            { height: '0', opacity: '0' },
          ],
          {
            duration: this.animationDuration,
            easing: this.animationEasing,
          },
        )
      : Promise.resolve();
  }

  onSummaryKeyDown(event) {
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
        @keydown=${this.onSummaryKeyDown}
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
window.customElements.define('zx-details', Details);
