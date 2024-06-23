import { LitElement, html, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './spinner.styles.js';

// https://uiball.com/ldrs/
export default class Spinner extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  @property({ reflect: true })
  type: 'beat' | 'square' | 'circle' = 'beat';

  /** The size of the spinner */
  @property({ type: Number, reflect: true })
  size = 16;

  render() {
    const spinnerStyles = {
      height: `${this.size}px`,
      width: `${this.size}px`,
    };

    let spinner;

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
