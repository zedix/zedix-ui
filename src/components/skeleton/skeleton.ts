import Skeleton from './skeleton.component';

export * from './skeleton.component';
export default Skeleton;

if (!customElements.get('zx-skeleton')) {
  customElements.define('zx-skeleton', Skeleton);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-skeleton': Skeleton;
  }
}
