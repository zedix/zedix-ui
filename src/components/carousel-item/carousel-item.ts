import CarouselItem from './carousel-item.component.js';

export * from './carousel-item.component.js';
export default CarouselItem;

if (!customElements.get('zx-carousel-item')) {
  customElements.define('zx-carousel-item', CarouselItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-carousel-item': CarouselItem;
  }
}
