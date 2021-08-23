import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { FormElementMixin } from '../../mixins/form-element-mixin.js';
import styles from './select.styles.js';

export class Select extends FormElementMixin(LitElement) {
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

      options: {
        type: Array, // { label, value  } | { label, options }
        reflect: true,
      },

      emptyOption: {
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
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.name = '';
    this.value = '';
    this.options = [];
    this.emptyOption = null;
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
    this.updateDisplayValue();
  }

  updateDisplayValue() {
    const select = this.focusElement;
    this.displayValue = select.options[select.selectedIndex].text;
    this.requestUpdate();
  }

  renderSelect() {
    const classes = { select: true };

    // prettier-ignore
    return html`
      <div class="${classMap(classes)}">
        <span>${this.displayValue ? this.displayValue : html`&nbsp;`}</span>
        <select
          ?name="${this.name}"
          ?value="${this.value}"
          ?disabled="${this.disabled}"
          @change=${this.onChange}
        >
          ${this.emptyOption !== null ? html`<option value="">${this.emptyOption}</option>` : ''}
          ${this.options.map(option => (option.options
    ? html`
                <optgroup label${option.label}>
                  ${option.options.map(opt => html`
                    <option value=${opt.value} ?disabled="${opt.disabled}">${opt.label}</option>`)}
                </optgroup>`
    : html`<option value=${option.value} ?disabled="${option.disabled}">${option.label}</option>`))}
        </select>
      </div>
    `;
  }

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  render() {
    if (this.textContent) {
      return html`
        <label part="label" for="${this.name}"><slot /></label>
        ${this.renderSelect()}
      `;
    }
    return this.renderSelect();
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

    this.updateDisplayValue();
    this.updateFormValue(this.value);
  }

  /**
   * @protected
   */
  get focusElement() {
    return this.shadowRoot.querySelector('select');
  }
}

window.customElements.define('zx-select', Select);
