import Rating from './rating.component';

export * from './rating.component';
export default Rating;

if (!customElements.get('zx-rating')) {
  customElements.define('zx-rating', Rating);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-rating': Rating;
  }
}
