import { html, LitElement } from 'lit-element';
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

      rows: {
        type: Number,
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

  renderInput() {
    if (this.rows > 0) {
      // prettier-ignore
      return html`
        <textarea
          class="textfield"
          placeholder="${this.placeholder}"
          rows="${this.rows}"
          ?disabled="${this.disabled}"
          ?readOnly="${this.readOnly}"
          @change="${this.onChange}"
          @input="${this.onInput}"
        >
          ${this.value}
        </textarea>
      `;
    }

    return html`
      <input
        class="textfield"
        type="${this.type}"
        name="${this.name}"
        value="${this.value}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readOnly="${this.readOnly}"
        @change="${this.onChange}"
        @input="${this.onInput}"
      />
    `;
  }

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  render() {
    if (!this.textContent) {
      return this.renderInput();
    }

    return html`
      <label part="label" for="${this.name}"><slot /></label>
      ${this.renderInput()}
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
        bubbles: true,
        composed: true,
      }),
    );

    this.updateFormValue(this.value);
  }

  onInput(e) {
    const target = e.composedPath()[0];
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('input', {
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
    return this.shadowRoot.querySelector('.textfield');
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
