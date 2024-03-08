import Details from './details.component';

export * from './details.component';
export default Details;

if (!customElements.get('zx-details')) {
  customElements.define('zx-details', Details);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-details': Details;
  }
}
