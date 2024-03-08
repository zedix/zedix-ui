/* global ElementInternals */
import { LitElement, html, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './input-stepper.styles.js';

/**
 * A stepper is a two-segment control used to increase or decrease an incremental value.
 *
 * @link https://www.nngroup.com/articles/input-steppers/
 * @link https://developer.apple.com/documentation/uikit/uistepper
 */
export default class InputStepper extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static formAssociated = true;
  private _internals: ElementInternals;

  @property({ type: String })
  name = '';

  @property({ type: String, reflect: true })
  value = 1;

  @property({ type: Number, reflect: true })
  min = 0;

  @property({ type: Number, reflect: true })
  max = Infinity;

  @property({ type: Number, reflect: true })
  step = 1;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  decrement() {
    this.newValue(this.value - this.step);
  }

  increment() {
    this.newValue(this.value + this.step);
  }

  newValue(val: number) {
    this.value = Math.min(Math.max(val, this.min), this.max);
    this._internals.setFormValue(String(this.value));
  }

  /**
   * @protected
   */
  get inputElement() {
    return this.shadowRoot?.querySelector('input');
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
    this.inputElement?.click();
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
}
