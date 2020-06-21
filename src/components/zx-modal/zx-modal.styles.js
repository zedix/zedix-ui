import { css } from 'lit-element';

export default css`
  :host {
    --backdrop: rgba(0, 0, 0, 0.24);
    --close-button-color: inherit;
    --dialog-surface: #fff;
    --dialog-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  /*
  ::slotted([slot='body']) {	}
	*/

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: var(--backdrop);
    opacity: 0;
    z-index: 9000;
  }

  :host([open]) .modal {
    animation: fadeOverlayIn 160ms forwards;
  }

  .modal.is-closing {
    animation: fadeOverlayOut 160ms forwards;
  }

  :host([open]) .modal-dialog {
    animation: bounceFadeIn 160ms ease forwards;
  }
  .modal.is-closing .modal-dialog {
    animation: bounceFadeOut 160ms ease forwards;
  }

  .close-button {
    position: absolute;
    appearance: none;
    background: none;
    border: 0;
    font-size: 24px;
    cursor: pointer;
    right: 12px;
    top: 12px;
    z-index: 10;
    color: var(--close-button-color);
    fill: currentColor;
    user-select: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .modal-dialog {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
    margin: auto;
    background-color: var(--dialog-surface);
    border-radius: 4px;
    box-shadow: var(--dialog-shadow);
    opacity: 0;
    overflow: auto;
  }

  @keyframes fadeOverlayIn {
    from {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: 0.8;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOverlayOut {
    from {
      opacity: 0.8;
      transform: translate3d(0, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes bounceFadeIn {
    0 {
      opacity: 0;
      transform: scale3d(0.97, 0.97, 0.97);
    }
    55% {
      opacity: 1;
    }
    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes bounceFadeOut {
    from {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
    to {
      opacity: 0;
      transform: scale3d(0.97, 0.97, 0.97);
    }
  }
`;
