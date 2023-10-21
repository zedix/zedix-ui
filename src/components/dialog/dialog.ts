import Dialog from './dialog.component';

export * from './dialog.component';
export default Dialog;

customElements.define('zx-dialog', Dialog);

declare global {
  interface HTMLElementTagNameMap {
    'zx-dialog': Dialog;
  }
}
