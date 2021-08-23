import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './spinner.styles.js';

export class Spinner extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      type: {
        type: String, // beat, square, circle
        reflect: true,
      },

      size: {
        type: Number,
        reflect: true,
      },
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.type = 'beat';
    this.size = 16;
  }

  render() {
    const spinnerStyles = {
      height: `${this.size}px`,
      width: `${this.size}px`,
    };

    let spinner = '';

    switch (this.type) {
      case 'square':
        spinner = html`<div class="square" style=${styleMap(spinnerStyles)}></div>`;
        break;

      case 'circle':
        spinner = html`
          <div class="circle" style=${styleMap(spinnerStyles)}>
            <i></i><i></i><i></i><i></i><i></i><i></i> <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        `;
        break;

      case 'beat':
      default:
        spinner = html`
          <div class="beat beat-odd" style=${styleMap(spinnerStyles)}></div>
          <div class="beat beat-even" style=${styleMap(spinnerStyles)}></div>
          <div class="beat beat-odd" style=${styleMap(spinnerStyles)}></div>
        `;
        break;
    }

    return spinner;
  }
}

window.customElements.define('zx-spinner', Spinner);
