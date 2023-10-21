import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    --backdrop: hsl(240 3.8% 46.1% / 33%);
    --border-radius: 4px;
    --dialog-surface: #fff;
    --dialog-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --dialog-size-small: 480px;
    --dialog-size-default: 640px;
    --dialog-size-large: 960px;
  }

  dialog {
    position: fixed;
    inset: 0;
    padding: 0;
    background: var(--dialog-surface);
    box-shadow: var(--dialog-shadow);
    border: 0;
    border-radius: 6px;
    max-inline-size: min(90vw, var(--dialog-size-default));
    max-block-size: min(80vh, 100%);
    max-block-size: min(80dvb, 100%);
  }

  /*
  ::backdrop {
    --zx-backdrop: rgba(0, 0, 0, 0.54);
  }
  */
  dialog::backdrop {
    background: hsl(240 3.8% 46.1% / 33%);
    /*backdrop-filter: blur(25px);*/
  }

  dialog > form {
    display: grid;
    grid-template-rows: auto 1fr auto;
    align-items: start;
    max-block-size: 80vh;
    max-block-size: 80dvb;
  }

  dialog > form > footer {
    padding: 1rem;
  }

  :host([align='top']) dialog {
    margin-block-start: 50px;
  }

  :host([size='small']) dialog {
    max-inline-size: min(90vw, var(--dialog-size-small));
    width: var(--dialog-size-small);
  }

  :host([size='default']) dialog {
    width: var(--dialog-size-default);
  }

  :host([size='large']) dialog {
    max-inline-size: min(90vw, var(--dialog-size-large));
    width: var(--dialog-size-large);
  }

  /*
  ::slotted([slot='footer']) {
    padding: 1rem;
  }
  */

  :host([size='default']) ::slotted([slot='editor']) {
    border: 1px solid red;
  }

  @media (prefers-reduced-motion: no-preference) {
    dialog[open] {
      //animation: bounceFadeIn 2500ms ease forwards;
    }

    dialog::backdrop {
      animation: backdropFadeIn 250ms forwards;
    }

    dialog.is-closing::backdrop {
      animation: backdropFadeOut 250ms forwards;
    }
  }

  dialog:not([open]) {
    display: none;
  }

  @keyframes backdropFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes backdropFadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
