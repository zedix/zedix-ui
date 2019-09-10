import { html, css, LitElement } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';

export class ZxSpinner extends LitElement {
  static get styles() {
    return css`
      @keyframes beatStretchDelay {
        50% {
          transform: scale(0.75);
          opacity: 0.2;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes circleFadeDelay {
        0%,
        39%,
        100% {
          opacity: 0;
        }
        40% {
          opacity: 1;
        }
      }

      @keyframes squareDelay {
        25% {
          transform: rotateX(180deg) rotateY(0);
        }
        50% {
          transform: rotateX(180deg) rotateY(180deg);
        }
        75% {
          transform: rotateX(0) rotateY(180deg);
        }
        100% {
          transform: rotateX(0) rotateY(0);
        }
      }

      :host {
        --spinner-color: #718096;

        color: var(--spinner-color);
      }

      .beat {
        animation: beatStretchDelay 0.7s infinite linear;
        animation-fill-mode: both;
        display: inline-block;
        background-color: currentColor;
        color: inherit;
        border-radius: 100%;
      }

      .beat-odd {
        animation-delay: 0;
      }

      .beat-even {
        animation-delay: 0.35s;
      }

      .square {
        animation: squareDelay 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);
        animation-fill-mode: both;
        perspective: 100px;
        display: inline-block;
        color: inherit;
        background-color: currentColor;
      }

      .circle {
        position: relative;
      }

      .circle i {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .circle i::before {
        content: '';
        display: block;
        margin: 0 auto;
        width: 15%;
        height: 15%;
        color: inherit;
        background-color: currentColor;
        border-radius: 100%;
        animation: circleFadeDelay 1.2s infinite ease-in-out both;
      }

      .circle i:nth-of-type(2) {
        transform: rotate(30deg);
      }

      .circle i:nth-of-type(3) {
        transform: rotate(60deg);
      }

      .circle i:nth-of-type(4) {
        transform: rotate(90deg);
      }

      .circle i:nth-of-type(5) {
        transform: rotate(120deg);
      }

      .circle i:nth-of-type(6) {
        transform: rotate(150deg);
      }

      .circle i:nth-of-type(7) {
        transform: rotate(180deg);
      }

      .circle i:nth-of-type(8) {
        transform: rotate(210deg);
      }

      .circle i:nth-of-type(9) {
        transform: rotate(240deg);
      }

      .circle i:nth-of-type(10) {
        transform: rotate(270deg);
      }

      .circle i:nth-of-type(11) {
        transform: rotate(300deg);
      }

      .circle i:nth-of-type(12) {
        transform: rotate(330deg);
      }

      .circle i:nth-of-type(2)::before {
        animation-delay: -1.1s;
      }

      .circle i:nth-of-type(3)::before {
        animation-delay: -1s;
      }

      .circle i:nth-of-type(4)::before {
        animation-delay: -0.9s;
      }

      .circle i:nth-of-type(5)::before {
        animation-delay: -0.8s;
      }

      .circle i:nth-of-type(6)::before {
        animation-delay: -0.7s;
      }

      .circle i:nth-of-type(7)::before {
        animation-delay: -0.6s;
      }

      .circle i:nth-of-type(8)::before {
        animation-delay: -0.5s;
      }

      .circle i:nth-of-type(9)::before {
        animation-delay: -0.4s;
      }

      .circle i:nth-of-type(10)::before {
        animation-delay: -0.3s;
      }

      .circle i:nth-of-type(11)::before {
        animation-delay: -0.2s;
      }

      .circle i:nth-of-type(12)::before {
        animation-delay: -0.1s;
      }
    `;
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
    const styles = {
      height: `${this.size}px`,
      width: `${this.size}px`,
    };

    let spinner = '';

    switch (this.type) {
      case 'square':
        spinner = html`
          <div class="square" style=${styleMap(styles)}></div>
        `;
        break;

      case 'circle':
        spinner = html`
          <div class="circle" style=${styleMap(styles)}>
            <i></i><i></i><i></i><i></i><i></i><i></i> <i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        `;
        break;

      case 'beat':
      default:
        spinner = html`
          <div class="beat beat-odd" style=${styleMap(styles)}></div>
          <div class="beat beat-even" style=${styleMap(styles)}></div>
          <div class="beat beat-odd" style=${styleMap(styles)}></div>
        `;
        break;
    }

    return spinner;
  }
}

window.customElements.define('zx-spinner', ZxSpinner);
