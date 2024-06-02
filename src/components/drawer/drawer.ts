import Drawer from './drawer.component';

export * from './drawer.component';
export default Drawer;

if (!customElements.get('zx-drawer')) {
  customElements.define('zx-drawer', Drawer);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-drawer': Drawer;
  }
}
