import { html, LitElement } from 'lit';
import { FormElementMixin } from '../../mixins/form-element-mixin.js';
import styles from './input-stepper.styles.js';

/**
 * A stepper is a two-segment control used to increase or decrease an incremental value.
 *
 * @link https://www.nngroup.com/articles/input-steppers/
 * @link https://developer.apple.com/documentation/uikit/uistepper
 */
export class InputStepper extends FormElementMixin(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      name: {
        type: String,
      },

      value: {
        type: String,
        reflect: true,
      },

      /*
      // inherited from DelegateFocusMixin
      disabled: {
        type: Boolean,
        reflect: true,
      },
      */

      min: {
        type: Number,
        reflect: true,
      },

      max: {
        type: Number,
        reflect: true,
      },

      step: {
        type: Number,
        reflect: true,
      },
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.min = 0;
    this.max = Infinity;
    this.step = 1;
    this.name = '';
    this.value = 1;
  }

  decrement() {
    this.newValue(this.value - this.step);
  }

  increment() {
    this.newValue(this.value + this.step);
  }

  newValue(val) {
    this.value = Math.min(Math.max(val, this.min), this.max);
    this.updateFormValue(this.value);
  }

  render() {
    return html`<div class="stepper">
      <button
        type="button"
        @click="${this.decrement}"
        .disabled="${this.value === this.min || this.disabled}"
      >
        -
      </button>
      <input
        type="number"
        .disabled="${this.disabled}"
        .value="${this.value}"
        min="${this.min}"
        max="${this.max}"
      />
      <button
        type="button"
        @click="${this.increment}"
        .disabled="${this.value === this.max || this.disabled}"
      >
        +
      </button>
    </div>`;
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

window.customElements.define('zx-input-stepper', InputStepper);
