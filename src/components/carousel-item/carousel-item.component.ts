import { html, LitElement, CSSResultGroup } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default class CarouselItem extends LitElement {
  static styles: CSSResultGroup = [componentStyles];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  render() {
    return html`<slot></slot>`;
  }
}
