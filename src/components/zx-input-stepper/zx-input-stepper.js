// https://design.mixpanel.com/#mp-dialog
import { html, LitElement } from 'lit-element';
import { FormElementMixin } from '../../mixins/form-element-mixin.js';
import styles from './zx-input-stepper.styles.js';

/**
 * A stepper is a two-segment control used to increase or decrease an incremental value.
 *
 * @link https://www.nngroup.com/articles/input-steppers/
 * @link https://developer.apple.com/documentation/uikit/uistepper
 */
export class ZxInputStepper extends FormElementMixin(LitElement) {
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
  }

  render() {
    return html`<div class="stepper">
      <button type="button" @click="${this.decrement}" .disabled="${this.value === this.min}">
        -
      </button>
      <input
        type="number"
        name="${this.name}"
        .value="${this.value}"
        min="${this.min}"
        max="${this.max}"
      />
      <button type="button" @click="${this.increment}" .disabled="${this.value === this.max}">
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

window.customElements.define('zx-input-stepper', ZxInputStepper);
