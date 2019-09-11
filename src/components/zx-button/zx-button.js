import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { DelegateFocusMixin } from '../../mixins/delegate-focus-mixin.js';
import '../zx-spinner/zx-spinner.js';

// Note: ZxButton does not extend HTMLButtonElement
// because Safari isn't going to implement customized built-ins.
// This is the alternate approach rather than forcing all Safari users
// to use a polyfill indefinitely.

export class ZxButton extends DelegateFocusMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        --button-border-radius: 2px;
        --button-shadow-focus: 0 0 0 0.2rem #e9d8fd;
        --button-shadow-hover: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
        --button-transition: 300ms ease-out;

        --button-primary-background-color: #6b46c1;
        --button-primary-background-color-hover: #805ad5;
        --button-primary-text-color: #fff;
        --button-primary-text-color-hover: #fff;
        --button-primary-border: none;
        --button-primary-border-hover: none;
        --button-primary-shadow-hover: var(--button-shadow-hover);
        --button-primary-shadow-focus: var(--button-shadow-focus);
        --button-outline-primary-text-color: var(--button-primary-background-color);

        --button-secondary-background-color: #fff;
        --button-secondary-background-color-hover: #f7fafc;
        --button-secondary-text-color: #4a5568;
        --button-secondary-text-color-hover: #1a202c;
        --button-secondary-border: 1px solid #4a5568;
        --button-secondary-border-hover: 1px solid #1a202c;
        --button-secondary-shadow-focus: var(--button-shadow-focus);
        --button-secondary-shadow-hover: var(--button-shadow-hover);

        display: inline-block;
        outline: none;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }

      :host([hidden]) {
        display: none;
      }

      .button {
        box-sizing: border-box;
        margin-bottom: 0;
        border: 0;
        border-radius: var(--button-border-radius);
        background: transparent;
        background-image: none;
        font-family: inherit;
        font-size: inherit;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        transition: var(--button-transition);
        text-align: center;
        text-decoration: none;
        outline: none;
      }

      .button::-moz-focus-inner {
        border: none;
      }

      button:disabled {
        pointer-events: none;
        cursor: not-allowed;
        filter: alpha(opacity=45);
        opacity: 0.45;
      }

      :host([block]),
      :host([block]) .button {
        display: block;
      }

      :host([variant='primary']) zx-spinner {
        --spinner-color: rgba(255, 255, 255, 0.84);
        margin-left: 4px;
      }

      :host([variant='primary']) .button {
        background-color: var(--button-primary-background-color);
        color: var(--button-primary-text-color);
        border: var(--button-primary-border);
      }

      :host([variant='primary']) .button:hover,
      :host([variant='primary']) .button:active {
        background-color: var(--button-primary-background-color-hover);
        color: var(--button-primary-text-color-hover);
        border: var(--button-primary-border-hover);
      }

      :host([variant='primary']) .button:hover:not(:focus) {
        box-shadow: var(--button-primary-shadow-hover);
      }

      :host([variant='primary']) .button:focus {
        box-shadow: var(--button-primary-shadow-focus);
      }

      :host([variant='secondary']) .button {
        background-color: var(--button-secondary-background-color);
        color: var(--button-secondary-text-color);
        border: var(--button-secondary-border);
      }

      :host([variant='secondary']) .button:hover,
      :host([variant='secondary']) .button:active {
        color: var(--button-secondary-text-color-hover);
        background-color: var(--button-secondary-background-color-hover);
        border: var(--button-secondary-border-hover);
      }

      :host([variant='secondary']) .button:hover:not(:focus) {
        box-shadow: var(--button-primary-shadow-hover);
      }

      :host([variant='secondary']) .button:focus {
        box-shadow: var(--button-secondary-shadow-focus);
      }

      :host([variant='outline-primary']) .button {
        border: 1px solid var(--button-primary-background-color);
        background-color: white;
        color: var(--button-outline-primary-text-color);
      }

      .button:focus {
        outline: 0;
        box-shadow: var(--button-shadow-focus);
      }

      .button:hover:not(:focus) {
        box-shadow: var(--button-shadow-hover);
      }

      :host([size='large']) .button {
        padding: 10px 24px;
      }

      :host([size='medium']) .button {
        padding: 8px 12px;
      }

      :host([size='small']) .button {
        padding: 4px 8px;
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

      fake: {
        type: Boolean,
        reflect: true,
      },

      block: {
        type: Boolean,
        reflect: true,
      },

      /*
      // inherited from DelegateFocusMixin
      disabled: {
        type: Boolean,
        reflect: true,
      },
      */

      loading: {
        type: Boolean,
        reflect: true,
      },

      size: {
        type: String, // small, normal, large
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
    this.name = '';
    this.disabled = false;
    this.loading = false;
    this.type = 'button';
    this.size = 'medium';
    this.variant = 'primary';
  }

  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */
  firstUpdated() {
    super.firstUpdated();
    this.setAttribute('role', 'button');
  }

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   *
   * Notes on the button `click` event:
   * - Events that happen in shadow DOM have the host element as the target,
   * when caught outside of the component.
   *
   * - Mouse events successfully bubble through the shadow DOM boundary.
   * This is governed by the `composed` event object property.
   * If it’s true, then the event does cross the boundary.
   * Otherwise, it only can be caught from inside the shadow DOM.
   */
  render() {
    const classes = { button: true };

    if (this.href) {
      // https://github.com/Polymer/lit-html/issues/78
      return html`
        <a class="${classMap(classes)}" href="${this.href}">
          <slot></slot>
        </a>
      `;
    }

    if (this.fake) {
      // For the case where button is nested inside a <a>, no interactive content within is allowed
      // https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element
      return html`
        <div class="${classMap(classes)}">
          <slot></slot>
        </div>
      `;
    }

    return html`
      <button
        role="presentation"
        type="${this.type}"
        class="${classMap(classes)}"
        ?name="${this.name}"
        ?disabled="${this.disabled || this.loading}"
        ?size="${this.size}"
      >
        <slot></slot>
        ${this.loading
          ? html`
              <zx-spinner size="2" />
            `
          : ''}
      </button>
    `;
  }

  /**
   * @protected
   */
  get focusElement() {
    return this.shadowRoot.querySelector('.button');
  }
}

window.customElements.define('zx-button', ZxButton);
