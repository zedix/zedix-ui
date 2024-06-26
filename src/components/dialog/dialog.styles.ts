import { css } from 'lit';

export default css`
  :host {
    --backdrop: hsl(240 3.8% 46.1% / 33%);
    --border-radius: 4px;
    --dialog-surface: #fff;
    --size: fit-content;

    /* --dialog-shadow: var(--c-shadow-xl); */
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

    /* https://github.com/whatwg/html/issues/7732#issuecomment-1579431410
    overflow: auto;
    overscroll-behavior: contain; */
  }

  dialog:not([open]) {
    display: none;
  }

  dialog::backdrop {
    /*
      https://developer.chrome.com/blog/css-backdrop-inheritance
      - ✔ Firefox 120 (https://bugzilla.mozilla.org/show_bug.cgi?id=1855668)
      - ✔ Chrome 122 (https://issues.chromium.org/issues/40569411)
      - ✔ Safari 17.4+ (https://bugs.webkit.org/show_bug.cgi?id=263834)
    */
    background: var(--backdrop, hsl(240 3.8% 46.1% / 33%));
    /*backdrop-filter: blur(2px);*/
  }

  .dialog__header {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
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

  .dialog__title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  slot[name='actions']::slotted(*) {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  /*
  ::slotted(:is(h1, h2, h3)) {}
  ::slotted([slot='footer']) { padding: 1rem; }
  */

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

  @media (prefers-reduced-motion: no-preference) {
    :host(:not([quick])) dialog::backdrop {
      /* https://bugzilla.mozilla.org/show_bug.cgi?id=1725177 */
      animation: backdropFadeIn 250ms forwards;
    }

    :host(:not([quick])) dialog.is-closing::backdrop {
      animation: backdropFadeOut 250ms forwards;
    }
  }

  /*
  @starting-style {
    &:where([open]) {
      opacity: 0;
      transform: scaleY(0);
    }
  }
  */

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
