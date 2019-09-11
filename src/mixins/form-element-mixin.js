import { DelegateFocusMixin } from './delegate-focus-mixin.js';

// https://web.dev/more-capable-form-controls
const formAssociatedSupported =
  'ElementInternals' in window && 'setFormData' in window.ElementInternals;

export const FormElementMixin = superClass =>
  class extends DelegateFocusMixin(superClass) {
    // Identify the element as a form-associated custom element
    static get formAssociated() {
      return true;
    }

    constructor() {
      super();

      if (formAssociatedSupported) {
        this._internals = this.attachInternals();
      }
    }

    get form() {
      return this._internals.form;
    }

    get validity() {
      return this._internals.validity;
    }

    get validationMessage() {
      return this._internals.validationMessage;
    }

    get willValidate() {
      return this._internals.willValidate;
    }

    checkValidity() {
      return this._internals.checkValidity();
    }

    // New lifecycle callback. This is called when the owner form is reset.
    formResetCallback() {
      this.value = this.getAttribute('value') || '';
    }

    reportValidity() {
      return this._internals.reportValidity();
    }

    updateFormValue(value) {
      if (formAssociatedSupported) {
        this._internals.setFormValue(value);
      }
    }
  };
