import Spinner from './spinner.component';

export * from './spinner.component';
export default Spinner;

if (!customElements.get('zx-spinner')) {
  customElements.define('zx-spinner', Spinner);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-spinner': Spinner;
  }
}
