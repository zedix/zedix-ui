import ProductStickyBar from './product-sticky-bar.component';

export * from './product-sticky-bar.component';
export default ProductStickyBar;

if (!customElements.get('zx-product-sticky-bar')) {
  customElements.define('zx-product-sticky-bar', ProductStickyBar);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-product-sticky-bar': ProductStickyBar;
  }
}
