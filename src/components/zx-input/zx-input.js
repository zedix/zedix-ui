import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { FormElementMixin } from '../../mixins/form-element-mixin.js';
import styles from './zx-input.styles.js';

export class ZxInput extends FormElementMixin(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      name: {
        type: String,
        reflect: true,
      },

      value: {
        type: String,
        reflect: true,
      },

      type: {
        type: String,
        reflect: true,
      },

      placeholder: {
        type: String,
        reflect: true,
      },

      readOnly: {
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
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.name = '';
    this.value = '';
    this.type = 'text';
    this.readOnly = false;
    this.placeholder = '';
  }

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  render() {
    const classes = { textfield: true };

    return html`
      <label class="${classMap(classes)}">
        <span part="label"><slot /></span>
        <input
          type="${this.type}"
          name="${this.name}"
          value="${this.value}"
          ?disabled="${this.disabled}"
          ?placeholder="${this.placeholder}"
          ?readOnly="${this.readOnly}"
          @change="${this.onChange}"
        />
      </label>
    `;
  }

  onChange(e) {
    const target = e.composedPath()[0];
    this.value = target.value;

    // The change event is not able to propagate across shadow boundaries
    // To make a custom event pass through shadow DOM boundaries, we must set
    // both the composed and bubbles flags to true:
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          name: target.name,
          value: target.value,
          sourceEvent: e,
        },
        bubbles: true,
        composed: true,
      }),
    );

    this.updateFormValue(this.value);
  }

  /**
   * @protected
   */
  get inputElement() {
    return this.shadowRoot.querySelector('input');
  }

  /**
   * @protected
   */
  get focusElement() {
    return this.inputElement;
  }

  /**
   * @protected
   */
  click() {
    this.inputElement.click();
  }
}

window.customElements.define('zx-input', ZxInput);
