import { html, LitElement } from 'lit';

export default class CarouselItem extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
  }

  render() {
    return html`<slot></slot>`;
  }
}
