import { LitElement, html, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import { dispatchEvent } from '../../internals/event';
import styles from './input-stepper.styles.js';

/**
 * A stepper is a two-segment control used to increase or decrease an incremental value.
 *
 * @link https://www.nngroup.com/articles/input-steppers/
 * @link https://developer.apple.com/documentation/uikit/uistepper
 *
 * - https://khagwal.com/interactions/
 */
export default class InputStepper extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static formAssociated = true;
  private readonly _internals: ElementInternals;

  @property()
  name = '';

  @property({ type: Number })
  value = 1;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = Infinity;

  @property({ type: Number })
  step = 1;

  @property({ type: Boolean })
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
    dispatchEvent(this, 'change', { value: this.value });
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

  /**
   * When user clicks up/down arrows or enter a valid number.
   */
  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newValue(Number(input.value));
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
        .value="${String(this.value)}"
        @change="${this.handleChange}"
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
