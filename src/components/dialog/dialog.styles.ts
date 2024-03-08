import { css } from 'lit';

export default css`
  :host {
    --backdrop: hsl(240 3.8% 46.1% / 33%);
    --border-radius: 4px;
    --dialog-surface: #fff;
    --size: fit-content;

    --dialog-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --dialog-size-small: 480px;
    --dialog-size-medium: 640px;
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
    max-inline-size: min(90vw, var(--dialog-size-medium));
    max-block-size: min(80vh, 100%);
    max-block-size: min(80dvb, 100%);
    width: var(--size);
  }

  dialog::backdrop {
    /* https://developer.chrome.com/blog/css-backdrop-inheritance (Chrome 122+, Safari 17.4+) */
    background: var(--backdrop, hsl(240 3.8% 46.1% / 33%));
    /*backdrop-filter: blur(25px);*/
  }

  .dialog__header {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
  }

  .dialog__title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .dialog__body {
    padding: 0.75rem 1rem;
  }

  .has-actions .dialog__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem;
  }

  slot[name='actions']::slotted(*) {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .dialog__close-button {
    position: absolute;
    cursor: pointer;
    right: 0px;
    top: 0px;
    z-index: 1;
    user-select: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  :host([align='top']) dialog {
    margin-block-start: 50px;
  }

  :host([size='small']) dialog {
    max-inline-size: min(90vw, var(--dialog-size-small));
    --size: var(--dialog-size-small);
  }

  :host([size='medium']) dialog {
    --size: var(--dialog-size-medium);
  }

  :host([size='large']) dialog {
    max-inline-size: min(90vw, var(--dialog-size-large));
    --size: var(--dialog-size-large);
  }

  /*
  ::slotted([slot='footer']) {
    padding: 1rem;
  }
  */

  @media (prefers-reduced-motion: no-preference) {
    dialog[open] {
      //animation: bounceFadeIn 2500ms ease forwards;
    }

    :host(:not([quick])) dialog::backdrop {
      /* https://bugzilla.mozilla.org/show_bug.cgi?id=1725177 */
      animation: backdropFadeIn 250ms forwards;
    }

    :host(:not([quick])) dialog.is-closing::backdrop {
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
