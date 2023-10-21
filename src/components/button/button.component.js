import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { DelegateFocusMixin } from '../../mixins/delegate-focus-mixin.js';
import styles from './button.styles.js';
import '../spinner/spinner.js';

// Note: ZxButton does not extend HTMLButtonElement
// because Safari isn't going to implement customized built-ins.
// This is the alternate approach rather than forcing all Safari users
// to use a polyfill indefinitely.

export default class Button extends DelegateFocusMixin(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
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

      href: {
        type: String,
        reflect: true,
      },

      target: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.name = '';
    this.block = false;
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
        <a class="${classMap(classes)}" href="${this.href}" target="${this.target}">
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
        ?aria-busy="${this.loading}"
      >
        <slot></slot>
        ${this.loading
          ? // eslint-disable-next-line lit/no-invalid-html
            html`<zx-spinner size="2" />`
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
