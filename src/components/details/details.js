import { html, LitElement } from 'lit';
// import { classMap } from 'lit/directives/class-map.js';
// import { styleMap } from 'lit/directives/style-map.js';
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
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.open = false;
    this.summary = '';
    this.disabled = false;
  }

  get body() {
    return this.shadowRoot.querySelector('.details__body');
  }

  show() {
    if (this.open) {
      return;
    }
    this.open = true;
  }

  hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
  }

  toggle() {
    if (!this.disabled) {
      this.open ? this.hide() : this.show();
    }
  }

  firstUpdated() {
    this.body.hidden = !this.open;
    this.body.style.height = this.open ? 'auto' : '0';
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.body.hidden = false;
        this.body.style.height = 'auto';
      } else {
        this.body.hidden = true;
        this.body.style.height = 'auto';
      }
    }
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
    return html`
      <div
        part="summary"
        role="button"
        class="details__summary"
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
      </div>
      <div class="details__body">
        <div part="content" class="details__content" role="region">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

window.customElements.define('zx-details', Details);
