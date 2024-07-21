import Carousel from './carousel.component.js';

export * from './carousel.component.js';
export default Carousel;

if (!customElements.get('zx-carousel')) {
  customElements.define('zx-carousel', Carousel);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-carousel': Carousel;
  }
}
