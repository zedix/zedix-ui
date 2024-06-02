import { CSSResultGroup, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import Dialog from '../dialog/dialog';
import styles from './drawer.styles';

export default class Drawer extends Dialog {
  static styles: CSSResultGroup = [
    // Inherits styles from Dialog
    // https://lit.dev/docs/components/styles/#inheriting-styles-from-a-superclass
    //super.styles,
    componentStyles,
    styles,
  ];

  @property({ reflect: true })
  placement: 'end' | 'start' = 'start';

  constructor() {
    super();
    this.setupDefaultAnimations();
  }

  async updated(changedProperties: PropertyValues<this>) {
    await super.updated(changedProperties);

    if (changedProperties.has('placement')) {
      this.setupDefaultAnimations();
    }
  }

  setupDefaultAnimations() {
    if (this.placement === 'end') {
      this.setAnimation('dialog.show', {
        keyframes: [
          { opacity: 0, translate: '100%' },
          { opacity: 1, translate: '0' },
        ],
        options: { duration: 250, easing: 'ease' },
      });

      this.setAnimation('dialog.close', {
        keyframes: [
          { opacity: 1, translate: '0' },
          { opacity: 0, translate: '100%' },
        ],
        options: { duration: 250, easing: 'ease' },
      });
    } else {
      this.setAnimation('dialog.show', {
        keyframes: [
          { opacity: 0, translate: '-100%' },
          { opacity: 1, translate: '0' },
        ],
        options: { duration: 250, easing: 'ease' },
      });

      this.setAnimation('dialog.close', {
        keyframes: [
          { opacity: 1, translate: '0' },
          { opacity: 0, translate: '-100%' },
        ],
        options: { duration: 250, easing: 'ease' },
      });
    }
  }
}