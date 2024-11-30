import { LitElement, html, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './product-sticky-bar.styles.js';

export default class ProductStickyBar extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  targetElement: HTMLElement | null = null;

  @property({ type: String, attribute: 'target-selector' })
  targetSelector = '';

  @property({ reflect: true })
  placement: 'end' | 'start' = 'end';

  @property({ type: Boolean, reflect: true })
  reveal = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.targetElement = document.querySelector('.' + this.targetSelector);
    if (this.targetElement) {
      this.createObserver();

      if (this.placement === 'end') {
        document.body.classList.add('product-sticky-bar');
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.placement === 'end') {
      document.body.classList.remove('product-sticky-bar');
    }
  }

  createObserver() {
    new IntersectionObserver(entries => {
      entries[0].intersectionRatio === 0 ? this.show() : this.hide();
    }).observe(this.targetElement!);
  }

  hide() {
    this.reveal = false;
  }

  show() {
    this.reveal = true;
  }

  render() {
    return html`<slot></slot>`;
  }
}
