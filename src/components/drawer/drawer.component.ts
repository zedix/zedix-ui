import { CSSResultGroup, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { parseDurationInMilliseconds } from '../../internals/animate.js';
import componentStyles from '../../styles/component.styles.js';
import Dialog from '../dialog/dialog.js';
import styles from './drawer.styles.js';

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
    const duration = parseDurationInMilliseconds(
      getComputedStyle(this).getPropertyValue('--transition-duration'),
    );

    this.setAnimation('dialog.show', {
      keyframes: [
        { opacity: 0, translate: this.placement === 'end' ? '100%' : '-100%' },
        { opacity: 1, translate: '0' },
      ],
      options: { duration, easing: 'ease' },
    });

    this.setAnimation('dialog.close', {
      keyframes: [
        { opacity: 1, translate: '0' },
        { opacity: 0, translate: this.placement === 'end' ? '100%' : '-100%' },
      ],
      options: { duration, easing: 'ease' },
    });

    this.setAnimation('dialog.denyClose', {
      keyframes: [{ scale: 1 }, { scale: 1.02 }, { scale: 1 }],
      options: { duration: 250 },
    });
  }
}
