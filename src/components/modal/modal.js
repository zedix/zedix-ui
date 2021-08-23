// https://design.mixpanel.com/#mp-dialog
// https://github.com/thepassle/generic-components/tree/master/generic-dialog

import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import styles from './modal.styles.js';

export class Modal extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      closeable: {
        type: Boolean,
        reflect: true,
      },

      closeOnClickOutside: {
        type: Boolean,
        reflect: true,
      },

      closeOnEscape: {
        type: Boolean,
        reflect: true,
      },

      align: {
        type: String,
        reflect: true,
      },

      size: {
        type: String,
        reflect: true,
      },

      open: {
        type: Boolean,
        reflect: true,
      },

      blurSelector: {
        type: String,
        reflect: true,
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
    this.align = 'top';
    this.size = 'default';
    this.blurSelector = '';

    this._onKeyDown = this._onKeyDown.bind(this);
  }

  get blurElement() {
    return this.blurSelector ? document.querySelector(this.blurSelector) : null;
  }

  disconnectedCallback() {
    if (this.open) {
      this._enableBodyScroll();
    }
    super.disconnectedCallback();
  }

  showModal(options = {}) {
    // If the modal is already open, abort
    if (this.open) {
      return;
    }
    this.invokerElement = options.invokerElement || document.activeElement;
    this.open = true;
  }

  close() {
    // If the modal is already closed, abort
    if (!this.open) {
      return;
    }
    this.isClosing = true;
    this.requestUpdate();
  }

  updated(changedProperties) {
    if (this.open) {
      this._onOpen();
    } else {
      this._onClose();
    }
    // console.log(this.shadowRoot.querySelector('slot').assignedNodes({ flatten: true }));
  }

  _onOpen() {
    document.addEventListener('keydown', this._onKeyDown);
    this._disableBodyScroll();
    this.dispatchEvent(new CustomEvent('open'));
  }

  _onClose() {
    document.removeEventListener('keydown', this._onKeyDown);
    this._enableBodyScroll();
    // https://www.w3.org/TR/wai-aria-practices/#dialog_modal
    // When a dialog closes, focus returns to the element that invoked the dialog
    if (this.invokerElement) {
      this.invokerElement.focus();
      this.invokerElement = null;
    }
    this.dispatchEvent(new CustomEvent('close'));
  }

  _onAnimationEnd({ animationName }) {
    if (animationName === 'bounceFadeOut') {
      this.isClosing = false;
      this.open = false;
    }
  }

  _onClickOutside(e) {
    if (
      this.closeable &&
      this.closeOnClickOutside &&
      // Test if default slot contains the clicked target
      !this.shadowRoot
        .querySelector('slot')
        .assignedElements()
        .some(el => el.contains(e.target)) &&
      e.button === 0
    ) {
      this.close();
    }
  }

  _onKeyDown({ key }) {
    if (this.closeOnEscape && key === 'Escape') {
      this.close();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _disableBodyScroll() {
    const { body } = document;
    body.dataset.scrollY = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${body.dataset.scrollY}px`;

    if (this.blurElement) {
      this.blurElement.style.filter = 'blur(3px)';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _enableBodyScroll() {
    const { body } = document;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, body.dataset.scrollY);

    if (this.blurElement) {
      this.blurElement.style.filter = '';
    }
  }

  _renderDefaultCloseButton() {
    return html` <button type="button" class="close-button" @click="${this.close}">
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path
          d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
        />
      </svg>
    </button>`;
  }

  render() {
    const classes = {
      modal: true,
      'is-closing': this.open && this.isClosing,
    };

    if (!this.open) {
      return null;
    }

    return html`<div
      aria-hidden=${this.open ? 'false' : 'true'}
      class="${classMap(classes)}"
      @click="${this._onClickOutside}"
    >
      <div
        role="dialog"
        aria-hidden=${this.open ? 'false' : 'true'}
        class="modal-dialog"
        @animationend="${this._onAnimationEnd}"
      >
        ${this.closeable ? this._renderDefaultCloseButton() : ''}
        <slot></slot>
      </div>
    </div>`;
  }
}

window.customElements.define('zx-modal', Modal);
