// https://design.mixpanel.com/#mp-dialog
// https://github.com/thepassle/generic-components/tree/master/generic-dialog

import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import styles from './zx-modal.styles.js';

export class ZxModal extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      closeable: {
        type: Boolean,
      },

      closeOnClickOutside: {
        type: Boolean,
      },

      closeOnEscape: {
        type: Boolean,
      },

      open: {
        type: Boolean,
        reflect: true,
      },

      noBodyScrollClass: {
        type: String,
      },

      // state: {
      // type: String, // success, error, warning, info
      // reflect: true,
      // },
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.open = false;
    this.closeable = true;
    this.closeOnClickOutside = false;
    this.closeOnEscape = true;
    this.noBodyScrollClass = 'fixed';

    this.handleKeydown = this.handleKeydown.bind(this);
  }

  get dialogElement() {
    return this.shadowRoot.querySelector('.modal-dialog');
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.connectedCallback();
    document.removeEventListener('keydown', this.handleKeydown);
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      // The change event is not able to propagate across shadow boundaries
      // To make a custom event pass through shadow DOM boundaries, we must set
      // both the composed and bubbles flags to true:
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            open: this.open,
          },
          bubbles: true,
          composed: true,
        }),
      );
    }
    document.body.classList.toggle(this.noBodyScrollClass, this.open);
  }

  showModal() {
    this.open = true;
  }

  close() {
    this.isClosing = true;
    this.requestUpdate();
  }

  onAnimationEnd({ animationName }) {
    if (animationName === 'bounceFadeOut') {
      this.isClosing = false;
      this.open = false;
    }
  }

  onClickOutside(e) {
    if (
      this.closeable &&
      this.closeOnClickOutside &&
      !this.dialogElement.contains(e.target) &&
      e.button === 0
    ) {
      this.close();
    }
  }

  // https://www.w3.org/TR/wai-aria-practices/#dialog_modal
  handleKeydown({ key }) {
    if (this.closeOnEscape && key === 'Escape') {
      this.close();
    }
  }

  render() {
    const classes = {
      modal: true,
      'is-closing': this.open && this.isClosing,
    };

    if (!this.open) {
      return null;
    }

    const closeButton =
      this.closeable &&
      html` <button class="close-button" @click="${this.close}">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path
            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
          />
        </svg>
      </button>`;

    return html`<div class="${classMap(classes)}" @click="${this.onClickOutside}">
      <div role="dialog" class="modal-dialog" @animationend="${this.onAnimationEnd}">
        ${closeButton}
        <slot></slot>
      </div>
    </div>`;
  }
}

window.customElements.define('zx-modal', ZxModal);
