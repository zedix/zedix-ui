import { css } from 'lit';

export default css`
  :host {
    --width: 320px;
    --backdrop: hsl(240 3.8% 46.1% / 33%);
    --border-radius: 0.25rem;
    --transition-duration: 250ms;
    --padding: 0;
  }

  dialog {
    /* position: absolute to be contained by its relative parent  */
    position: fixed;
    width: min(var(--width), 100dvw - 2rem);
    box-sizing: border-box;
    height: 100dvh;
    max-height: unset;
    padding: var(--padding);
    border: none;
    box-shadow: none;
    /*
    transition-property: translate, overlay, display;
    transition-behavior: allow-discrete;
    transition-duration: var(--transition-duration);
    translate: -100% 0;
    */
  }

  dialog:not([open]) {
    display: none;
  }

  dialog::backdrop {
    background: var(--backdrop);
  }

  :host([placement='start']) dialog {
    left: 0;
    margin-left: 0;
    margin-right: auto;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  :host([placement='end']) dialog {
    right: 0;
    margin-right: 0;
    margin-left: auto;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
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
`;
