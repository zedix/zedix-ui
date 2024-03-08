import CloseButton from './close-button.component';

export * from './close-button.component';
export default CloseButton;

if (!customElements.get('zx-close-button')) {
  customElements.define('zx-close-button', CloseButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-close-button': CloseButton;
  }
}
