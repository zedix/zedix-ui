/* eslint-disable prefer-object-spread */
import { html, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './rating.styles.js';

// https://github.com/Polymer/lit-html/pull/1000
// import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

/**
 * Build a 5-stars input field (using SVG to draw the shape).
 *
 * @see https://css-tricks.com/five-methods-for-five-star-ratings/
 */
export class Rating extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      editMode: {
        type: Boolean,
        reflect: true,
      },

      labels: {
        type: Array,
        reflect: true,
        converter: {
          fromAttribute: value => value.split('|'),
          toAttribute: value => value.join('|'),
        },
      },

      name: {
        type: String,
        reflect: true,
      },

      value: {
        type: Number,
        reflect: true,
      },

      shape: {
        type: String,
        reflect: true,
      },

      size: {
        type: String,
        reflect: true,
      },

      backgroundColor: {
        type: String,
        reflect: true,
      },

      ratingColor: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    // Always call super() first, or the element won’t render at all.
    super();

    // Initialize properties
    this.editMode = false;
    this.name = '';
    this.shape = '1';
    this.size = '';
    this.backgroundColor = '#DDDDDD';
    this.ratingColor = 'gold';
    this.currentLabel = '';
    this.labels = [];
    this.value = 0;
  }

  firstUpdated() {
    this.setLabelForValue(this.value);
  }

  setLabelForValue(value) {
    const intValue = parseInt(value, 10);
    this.currentLabel = intValue ? this.labels[intValue - 1] : '';
    this.requestUpdate();
  }

  getSymbol() {
    let svg;

    if (this.shape === '1') {
      // https://www.svgrepo.com/svg/17475/star
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="var(--symbol-size)" height="var(--symbol-size)" viewBox="0 0 501.986 501.986" fill>
        <path d="M287.442 42.472l42.984 87.096a40.643 40.643 0 0 0 30.604 22.235l96.116 13.966c33.339 4.844 46.651 45.815 22.527 69.331l-69.55 67.795a40.648 40.648 0 0 0-11.69 35.978l16.419 95.728c5.695 33.204-29.157 58.526-58.976 42.849l-85.969-45.196a40.649 40.649 0 0 0-37.829 0l-85.969 45.196c-29.819 15.677-64.671-9.644-58.976-42.849l16.419-95.728a40.65 40.65 0 0 0-11.69-35.978L22.312 235.1c-24.124-23.515-10.812-64.486 22.527-69.33l96.116-13.966a40.646 40.646 0 0 0 30.604-22.235l42.984-87.096c14.911-30.211 57.99-30.211 72.899-.001z" />
        <path fill="rgba(0, 0, 0, 0.24)" d="M374.839 492.172c-8.05 0-16.139-1.941-23.616-5.872l-85.969-45.196a30.646 30.646 0 0 0-28.521 0L150.764 486.3c-17.189 9.037-37.628 7.56-53.338-3.855-15.711-11.415-23.431-30.395-20.149-49.535l16.419-95.728a30.645 30.645 0 0 0-8.813-27.126l-69.551-67.794C1.426 228.707-3.484 208.813 2.517 190.343c6-18.469 21.667-31.677 40.885-34.469l96.115-13.967a30.642 30.642 0 0 0 23.075-16.765l42.984-87.096c8.595-17.414 25.998-28.232 45.417-28.232s36.822 10.818 45.417 28.232l42.984 87.096a30.642 30.642 0 0 0 23.075 16.765l96.115 13.967c19.218 2.792 34.885 16 40.885 34.469 6.001 18.469 1.091 38.363-12.815 51.918l-69.55 67.794a30.64 30.64 0 0 0-8.814 27.127l16.419 95.727c3.282 19.14-4.438 38.121-20.148 49.535-8.876 6.451-19.266 9.728-29.722 9.728zm-123.846-74.59a50.605 50.605 0 0 1 23.567 5.819l85.969 45.196c10.559 5.551 22.625 4.679 32.275-2.333s14.208-18.217 12.191-29.974l-16.419-95.728a50.641 50.641 0 0 1 14.567-44.829l69.549-67.794c8.543-8.327 11.442-20.071 7.756-31.417-3.687-11.345-12.935-19.142-24.739-20.857l-96.117-13.967a50.64 50.64 0 0 1-38.134-27.706l-42.984-87.096c-5.279-10.697-15.553-17.083-27.481-17.083-11.929 0-22.202 6.386-27.481 17.083l-42.984 87.096a50.642 50.642 0 0 1-38.134 27.706l-96.116 13.967c-11.806 1.715-21.054 9.513-24.74 20.857-3.687 11.345-.787 23.09 7.756 31.416l69.55 67.794a50.641 50.641 0 0 1 14.566 44.829l-16.42 95.73c-2.017 11.757 2.541 22.962 12.191 29.974 9.651 7.012 21.717 7.884 32.275 2.333l85.969-45.196a50.616 50.616 0 0 1 23.568-5.82z"/><path d="M231.978 103.014a9.966 9.966 0 0 1-4.418-1.035c-4.952-2.444-6.985-8.44-4.542-13.393l8.559-17.342a9.998 9.998 0 0 1 13.394-4.542c4.952 2.444 6.985 8.44 4.542 13.393l-8.559 17.342a10.005 10.005 0 0 1-8.976 5.577z"/>
        <path fill="rgba(0, 0, 0, 0.24)" d="M145.668 198.093c-4.887 0-9.16-3.585-9.884-8.563-.794-5.465 2.993-10.54 8.458-11.334a71.526 71.526 0 0 0 53.863-39.134l9.612-19.476c2.443-4.953 8.44-6.986 13.394-4.542 4.952 2.444 6.985 8.44 4.542 13.393l-9.612 19.476a91.528 91.528 0 0 1-68.922 50.075c-.487.071-.972.105-1.451.105z"/>
      </svg>
      `;
    } else if (this.shape === '2') {
      // https://www.svgrepo.com/svg/2799/star-favourite
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="var(--symbol-size)" height="var(--symbol-size)" viewBox="0 0 43.128 43.128" fill>
        <path d="M39.199 15.197H27.668L24.105 4.232c-1.404-4.326-3.68-4.326-5.084 0l-3.563 10.965H3.928c-4.545 0-5.25 2.164-1.571 4.836l9.326 6.775-3.562 10.967c-1.404 4.322.438 5.662 4.116 2.988l9.326-6.775 9.328 6.775c3.678 2.674 5.52 1.334 4.116-2.988l-3.564-10.967 9.326-6.775c3.68-2.672 2.975-4.836-1.57-4.836z" />
      </svg>`;
    } else if (this.shape === '3') {
      // https://www.svgrepo.com/svg/13293/star-medal
      svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="var(--symbol-size)" height="var(--symbol-size)" viewBox="0 0 55.867 55.867" fill>
        <path d="M55.818 21.578a1.002 1.002 0 0 0-.808-.681l-18.09-2.629-8.09-16.392a.998.998 0 0 0-1.792 0l-8.091 16.393-18.09 2.629a1.002 1.002 0 0 0-.555 1.705l13.091 12.76-3.091 18.018c-.064.375.09.754.397.978a.992.992 0 0 0 1.053.076l16.182-8.506 16.18 8.506a1 1 0 0 0 1.451-1.054l-3.09-18.017 13.091-12.761c.272-.267.37-.664.252-1.025z"/>
      </svg>
      `;
    }

    return svg;
  }

  render() {
    const svg = this.getSymbol();

    const rootStyles = {
      background: `url('data:image/svg+xml;base64,${btoa(
        svg.replace('fill', `fill="${this.backgroundColor}"`),
      )}')`,
    };

    const innerStyles = {
      background: `url('data:image/svg+xml;base64,${btoa(
        svg.replace('fill', `fill="${this.ratingColor}"`),
      )}')`,
    };

    if (!this.editMode) {
      // Note: using Object.assign for Edge 18 compatibility
      return html`
        <div class="rating" style=${styleMap(rootStyles)}>
          <i
            style=${styleMap(Object.assign({}, innerStyles, { width: `${this.value * 20}%` }))}
          ></i>
        </div>
      `;
    }

    return html`
      <div class="wrapper">
        <div class="rating" style=${styleMap(rootStyles)}>
          ${[1, 2, 3, 4, 5].map(
            ratingValue => html`
              <input
                type="radio"
                name="${this.name}"
                .value="${ratingValue}"
                ?checked="${Number(this.value) === ratingValue}"
                @change=${this.onChange}
                @mouseover=${this.onInputMouseOver}
                @mouseout=${this.onInputMouseOut}
              />
              <i style=${styleMap(innerStyles)}></i>
            `,
          )}
        </div>
        ${this.labels.length > 0
          ? html`<div class="rating-label" part="label">${this.currentLabel}</div>`
          : ''}
      </div>
    `;
  }

  onInputMouseOver(e) {
    this.setLabelForValue(e.currentTarget.value);
  }

  onInputMouseOut() {
    this.setLabelForValue(this.value);
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
  }
}

window.customElements.define('zx-rating', Rating);
