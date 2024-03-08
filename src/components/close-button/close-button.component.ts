import { html, LitElement, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './close-button.styles';
import { dispatchEvent } from '../../internals/event';

/**
 * CloseButton component.
 */
export default class CloseButton extends LitElement {
  static styles: CSSResultGroup = styles;

  /**
   * Whether or not the button is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private handleClick(event: Event) {
    event.stopPropagation();
    dispatchEvent(this, 'close');
  }

  render() {
    return html`
      <button type="button" part="button" @click="${this.handleClick}" ?disabled="${this.disabled}">
        <svg version="1.1" aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
          <path
            d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
          ></path>
        </svg>
      </button>
    `;
  }
}
