import { LitElement, PropertyValues, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './skeleton.styles';

export class Skeleton extends LitElement {
  static styles: CSSResultGroup = styles;

  @property({ reflect: true })
  animation: 'wave' | 'pulse' = 'pulse';

  @property({ reflect: true })
  shape: 'circle' | 'rect' | 'text' = 'text';

  @property({ reflect: true })
  width = '';

  @property({ reflect: true })
  height = '';

  render() {
    if (this.height) {
      this.style.height = `${this.height}px`;
    }
    if (this.width) {
      this.style.width = `${this.width}px`;
    }
  }
}

window.customElements.define('zx-skeleton', Skeleton);
