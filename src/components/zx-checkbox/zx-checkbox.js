import { html, svg, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { FormElementMixin } from '../../mixins/form-element-mixin.js';

export class ZxCheckbox extends FormElementMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        --input-background-color: #fff;
        --input-background-color-disabled: #edf2f7;
        --input-checked-color: var(--input-border-color);
        --input-checkmark-color: #fff;
        --input-checkbox-size: 20px;
        --input-border-width: 1px;
        --input-border-radius: 4px;
        --input-border-color: #2a4365;
        --input-border-color-hover: #2c5282;

        outline: none;
      }

      .checkbox {
        position: relative;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
      }

      input {
        position: absolute;
        clip: rect(0, 0, 0, 0);
      }

      .checkbox__control {
        position: relative;
        display: inline-block;
        width: var(--input-checkbox-size);
        height: var(--input-checkbox-size);
        margin-right: 8px;
        border: var(--input-border-width) solid var(--input-border-color);
        border-radius: var(--input-border-radius);
        background-color: var(--input-background-color);
        transition-duration: 0.2s;
        transition-property: background-color, border-color;
        transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
      }

      .checkbox__control:hover {
        border-color: var(--input-border-color-hover);
      }

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        transition: transform 0.1s cubic-bezier(0.36, 0, 1, 1);
        transform-origin: 50% 50%;
        transform: translate(-50%, -50%) scale(0);
        fill: var(--input-checkmark-color);
      }

      input:checked + .checkbox__control svg,
      input:indeterminate + .checkbox__control svg {
        transform: translate(-50%, -50%) scale(1);
      }

      input:active + .checkbox__control,
      input:focus + .checkbox__control,
      input:checked + .checkbox__control {
        border-color: var(--input-border-color);
      }

      input:checked + .checkbox__control,
      input:indeterminate + .checkbox__control {
        background-color: var(--input-checked-color);
      }

      input:disabled + .checkbox__control {
        pointer-events: none;
        cursor: not-allowed;
        filter: alpha(opacity=45);
        opacity: 0.45;
        background-color: var(--input-background-color-disabled);
      }
    `;
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
