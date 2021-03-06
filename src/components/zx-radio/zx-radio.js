import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { FormElementMixin } from '../../mixins/form-element-mixin.js';
import styles from './zx-radio.styles.js';

export class ZxRadio extends FormElementMixin(LitElement) {
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

  update(props) {
    super.update(props);

    this.setAttribute('aria-checked', this.checked);
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
          ?disabled="${this.disabled}"
          .checked="${this.checked}"
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
