import Popover from './popover.component';

export * from './popover.component';
export default Popover;

if (!customElements.get('zx-popover')) {
  customElements.define('zx-popover', Popover);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-popover': Popover;
  }
}
