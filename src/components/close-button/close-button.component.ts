import { html, LitElement, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './close-button.styles';
import componentStyles from '../../styles/component.styles.js';
import { dispatchEvent } from '../../internals/event';

export default class CloseButton extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  private readonly _internals: ElementInternals;

  /**
   * Whether or not the button is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The accessible text to include.
   *
   * @link https://www.benjystanton.co.uk/blog/accessible-close-buttons/
   */
  @property({ attribute: 'assistive-text' })
  assistiveText = 'Close';

  private handleClick(event: Event) {
    event.stopPropagation();
    dispatchEvent(this, 'close');
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.ariaLabel = this.assistiveText;
  }

  render() {
    return html`
      <button
        type="button"
        part="button"
        ?disabled="${this.disabled}"
        tabindex=${this.disabled ? '-1' : '0'}
        @click="${this.handleClick}"
      >
        <svg
          version="1.1"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
          ></path>
        </svg>
      </button>
    `;
  }
}
