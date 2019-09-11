// https://web.dev/more-capable-form-controls

import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { DelegateFocusMixin } from '../../mixins/delegate-focus-mixin.js';

export class ZxSelect extends DelegateFocusMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        --input-border-color: #718096;
        --input-caret-color: var(--input-border-color);
        --input-border-color-hover: #4a5568;
        --input-border-radius: 4px;
        --input-background-color: white;
        --input-text-color: #1a202c;
        --input-min-width: 60px;
        --input-font-size: 1rem;
      }

      .select {
        position: relative;
        display: inline-flex;
        align-items: center;
        padding: 6px 28px 6px 12px;
        border: 2px solid var(--input-border-color);
        border-radius: var(--input-border-radius);
        background-color: var(--input-background-color);
        background-image: none; /* [1] */
        background-clip: padding-box;
        min-width: var(--input-min-width);
      }

      .select:hover,
      .select:focus-within {
        border-color: var(--input-border-color-hover);
      }

      .select::after {
        content: '';
        display: inline-block;
        position: absolute;
        right: 12px;
        top: calc(50% - 8px);
        padding: 4px;
        border: solid var(--input-caret-color);
        border-width: 0 2px 2px 0;
        pointer-events: none;
        transform: rotate(45deg);
        vertical-align: middle;
      }

      .select > span {
        display: inline-block;
        min-width: 1rem;
        color: var(--input-text-color);
      }

      .select > select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        /* Required to have <select /> with height 100% in Safari  */
        -webkit-appearance: menulist-button;
      }

      .select > option {
        font-size: var(--input-font-size);
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

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  render() {
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
          ${this.options.map(option =>
            option.options
              ? html`
                <optgroup label${option.label}>
                  ${option.options.map(opt => html`
                    <option value=${opt.value} ?disabled="${opt.disabled}">${opt.label}</option>`
                  )}
                </optgroup>`
              : html`<option value=${option.value} ?disabled="${option.disabled}">${option.label}</option>`,
          )}
        </select>
      </div>
    `;
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
  }

  /**
   * @protected
   */
  get focusElement() {
    return this.shadowRoot.querySelector('select');
  }
}

window.customElements.define('zx-select', ZxSelect);
