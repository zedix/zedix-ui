import Dialog from './dialog.component';

export * from './dialog.component';
export default Dialog;

if (!customElements.get('zx-dialog')) {
  customElements.define('zx-dialog', Dialog);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-dialog': Dialog;
  }
}
