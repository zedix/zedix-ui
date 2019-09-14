import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { FormElementMixin } from '../../mixins/form-element-mixin.js';

export class ZxRadio extends FormElementMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        --input-radio-size: 20px;
        --input-background-color: #fff;
        --input-border-width: 1px;
        --input-border-color: #718096;
        --input-border-color-hover: #4a5568;
        --input-checkmark-color: var(--input-border-color);

        display: inline-block;
      }

      :host([disabled]) {
        -webkit-tap-highlight-color: transparent;
      }

      .radio {
        position: relative;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
      }

      input {
        position: absolute;
        clip: rect(0, 0, 0, 0);
      }

      i {
        position: relative;
        display: inline-block;
        width: var(--input-radio-size);
        height: var(--input-radio-size);
        margin-right: 8px;
        background-color: var(--input-background-color);
        border: var(--input-border-width) solid var(--input-border-color);
        border-radius: 50%;
        box-shadow: 0 0 0 1px transparent, 0 1px 0 0 rgba(22, 29, 37, 0.05);
        transition: border-color 0.2s cubic-bezier(0.64, 0, 0.35, 1);
      }

      i::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        height: 50%;
        width: 50%;
        border-radius: 50%;
        background-color: var(--input-checkmark-color);
        transition: transform 0.1s cubic-bezier(0.36, 0, 1, 1);
        transform-origin: 50% 50%;
        transform: translate(-50%, -50%) scale(0);
      }

      input:checked + i::after {
        transform: translate(-50%, -50%) scale(1);
      }

      input:active + span,
      input:checked + span,
      input:focus + span,
      input:hover + span {
        border-color: var(--input-checkmark-color);
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
    this.value = 'on';
    this.checked = false;
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
    this.setAttribute('role', 'radio');
  }

  updated() {
    this.setAttribute('aria-checked', this.checked);
    this.radioElement.checked = this.checked;
  }

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  render() {
    const classes = { radio: true };

    return html`
      <label class="${classMap(classes)}">
        <input
          role="presentation"
          type="radio"
          tabindex="-1"
          name="${this.name}"
          value="${this.value}"
          ?checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this.onChange}"
        />
        <i></i>
        <span part="label"><slot /></span>
      </label>
    `;
  }

  onChange(e) {
    const target = e.composedPath()[0];
    this.checked = target.checked;
    this.value = target.value;

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
  get radioElement() {
    return this.shadowRoot.querySelector('input');
  }

  /**
   * @protected
   */
  get focusElement() {
    return this.radioElement;
  }

  /**
   * Toggles the radio button, so that the native `change` event
   * is dispatched. Overrides the standard `HTMLElement.prototype.click`.
   *
   * @protected
   */
  click() {
    this.shadowRoot.querySelector('input').click();
  }
}

window.customElements.define('zx-radio', ZxRadio);
