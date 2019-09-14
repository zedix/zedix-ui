import { html, svg, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { FormElementMixin } from '../../mixins/form-element-mixin.js';
import styles from './zx-checkbox.styles.js';

export class ZxCheckbox extends FormElementMixin(LitElement) {
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

      checked: {
        type: Boolean,
        reflect: true,
      },

      indeterminate: {
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
    this.checked = false;
    this.indeterminate = false;
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
    this.setAttribute('role', 'checkbox');
  }

  updated() {
    if (this.indeterminate) {
      this.setAttribute('aria-checked', 'mixed');
    } else {
      this.setAttribute('aria-checked', this.checked);
    }
    this.checkboxElement.indeterminate = this.indeterminate;
  }

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  render() {
    const classes = { checkbox: true };

    return html`
      <label class="${classMap(classes)}">
        <input
          role="presentation"
          type="checkbox"
          name="${this.name}"
          value="${this.value}"
          ?checked="${this.checked}"
          ?disabled="${this.disabled}"
          ?indeterminate="${this.indeterminate}"
          @change="${this.onChange}"
        />
        <span class="checkbox__control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="${this.indeterminate ? '0 0 8 2' : '0 0 8 7'}"
            aria-hidden="true"
          >
            ${this.indeterminate
              ? svg`
                  <path
                    d="M7.182 1.636H.818A.634.634 0 0 1 .182 1c0-.351.285-.636.636-.636h6.364a.637.637 0 0 1 0 1.272z"
                  />
                `
              : svg`
                  <path
                    d="M7.665 1.869L3.458 6.776.436 4.509A.636.636 0 0 1 1.2 3.491l2.068 1.551 3.43-4.002a.637.637 0 0 1 .967.829z"
                  />
                `}
          </svg>
        </span>
        <span part="label"><slot /></span>
      </label>
    `;
  }

  onChange(e) {
    const target = e.composedPath()[0];
    this.value = target.value;
    this.checked = target.checked;

    // The change event is not able to propagate across shadow boundaries
    // To make a custom event pass through shadow DOM boundaries, we must set
    // both the composed and bubbles flags to true:
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          name: target.name,
          value: target.value,
          checked: target.checked,
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
  get checkboxElement() {
    return this.shadowRoot.querySelector('input');
  }

  /**
   * @protected
   */
  get focusElement() {
    return this.checkboxElement;
  }
}

window.customElements.define('zx-checkbox', ZxCheckbox);
