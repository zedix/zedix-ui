import { LitElement } from 'lit';
import styles from './skeleton.styles.js';

export class Skeleton extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      /**
       * wave | pulse
       */
      animation: {
        type: String,
        reflect: true,
      },

      /**
       * circle | rect | text
       */
      shape: {
        type: String,
        reflect: true,
      },

      width: {
        type: String,
        reflect: true,
      },

      height: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.animation = 'pulse';
    this.shape = 'text';
  }

  render() {
    if (this.height) {
      this.style.height = `${this.height}px`;
    }
    if (this.width) {
      this.style.width = `${this.width}px`;
    }
  }
}

window.customElements.define('zx-skeleton', Skeleton);
