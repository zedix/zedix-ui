import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { DelegateFocusMixin } from '../../mixins/delegate-focus-mixin.js';

// Note: this component does not extend HTMLButtonElement
// because Safari isn't going to implement customized built-ins.
// This is the alternate approach rather than forcing all Safari users
// to use a polyfill indefinitely.

export class ZxButton extends DelegateFocusMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        --btn-border-radius: 2px;
        --btn-focus-shadow: 0 0 0 0.2rem #e9d8fd;

        --btn-primary-background-color: #6b46c1;
        --btn-primary-background-color-hover: #805ad5;
        --btn-primary-text-color: #fff;
        --btn-primary-text-color-hover: #fff;

        display: inline-block;
      }

      :host([hidden]) {
        display: none;
      }

      .button {
        padding: 8px 12px;
        margin-bottom: 0;
        border: 0;
        border-radius: var(--btn-border-radius);
        background: transparent;
        background-image: none;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        transition: 0.2s ease-out;
        text-decoration: none;
        outline: none;
      }

      .button::-moz-focus-inner {
        border: none;
      }

      :host([disabled]) {
        pointer-events: none;
        cursor: not-allowed;
        filter: alpha(opacity=45);
        opacity: 0.45;
      }

      :host([is-block]) .button {
        display: block;
        width: 100%;
      }

      :host([variant='primary']) .button {
        background-color: var(--btn-primary-background-color);
        color: var(--btn-primary-text-color);
      }

      :host([variant='primary']) .button:hover,
      :host([variant='primary']) .button:focus,
      :host([variant='primary']) .button:active {
        color: var(--btn-primary-text-color-hover);
        background-color: var(--btn-primary-background-color-hover);
      }

      .button:focus {
        outline: 0;
        box-shadow: var(--btn-focus-shadow);
      }

      :host([size='large']) {
        .button {
          padding: 0.5rem 1rem;
          font-size: 1.25rem;
          line-height: 1.5;
          border-radius: 0.3rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .button {
          transition: none;
        }
      }
    `;
  }

  static get properties() {
    return {
      href: {
        type: String,
        reflect: true,
      },

      type: {
        type: String,
        reflect: true,
      },

      name: {
        type: String,
        reflect: true,
      },

      size: {
        type: String, // small, default, large
        reflect: true,
      },

      variant: {
        type: String, // primary, secondary, success, danger, warning, info
        reflect: true,
      },
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.disabled = false;
    this.name = '';
    this.type = 'button';
    this.size = 'default';
    this.variant = 'primary';
  }

  firstUpdated() {
    super.firstUpdated();
    this.setAttribute('role', 'button');
  }

  // Events that happen in shadow DOM have the host element as the target,
  // when caught outside of the component.
  // Most events successfully bubble through a shadow DOM boundary.
  // This is governed by the composed event object property.
  // If it’s true, then the event does cross the boundary.
  // Otherwise, it only can be caught from inside the shadow DOM.

  render() {
    const classes = { button: true, [`${this.variant}`]: !!this.variant };

    if (this.href) {
      // https://github.com/Polymer/lit-html/issues/78
      return html`
        <a class="${classMap(classes)}" href="${this.href}" ?disabled="${this.disabled}">
          <slot></slot>
        </a>
      `;
    }

    return html`
      <button
        role="presentation"
        type="${this.type}"
        class="${classMap(classes)}"
        ?name="${this.name}"
        ?disabled="${this.disabled}"
        ?size="${this.size}"
      >
        <slot></slot>
      </button>
    `;
  }

  /**
   * @protected
   */
  get focusElement() {
    return this.shadowRoot.querySelector('button');
  }
}

window.customElements.define('zx-button', ZxButton);
