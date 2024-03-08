import Tooltip from './tooltip.component';

export * from './tooltip.component';
export default Tooltip;

if (!customElements.get('zx-tooltip')) {
  customElements.define('zx-tooltip', Tooltip);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-tooltip': Tooltip;
  }
}
