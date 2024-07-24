import { css } from 'lit';

/*
zx-carousel {
  --slide-size: 100%;
  --slide-gap: 1.6rem;
}

@media (min-width: 768px) {
  zx-carousel {
    --slide-size: calc(100% / 3);
    --slide-gap: 2rem;
  }
}
*/

export default css`
  :host {
    --slide-height: 19rem;
    --slide-size: 100%;
    --slide-gap: 0;

    --button-size: 40px;
    --button-border-color: #e5e7eb;
    --button-border-radius: 8px;
    --button-bg: rgba(255, 255, 255, 0.8);
    --button-color: inherit;
    --button-box-shadow-hover: 0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);

    --dot-color: #9ca3af;
    --dot-color-active: #111827;

    display: block;
    /* Note: moving this elsewhere (e.g wrapper) may bug the container translate position */
    position: relative;
  }

  :host([single]) {
    --slide-size: 100%;
    --slide-gap: 0;
  }

  .viewport {
    overflow: hidden;
  }

  .container {
    backface-visibility: hidden;
    display: flex;
    gap: var(--slide-gap);
    touch-action: pan-y pinch-zoom;
    /* https://github.com/davidjerleke/embla-carousel/issues/376#issuecomment-1258366383 */
    /*margin-left: calc(var(--slide-gap) * -1);*/
  }

  ::slotted(zx-carousel-item) {
    flex: 0 0 var(--slide-size);
    /*padding-left: var(--slide-gap);*/
    min-width: 0;
  }

  .buttons {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .inactive .buttons {
    display: none;
  }

  .button-next,
  .button-prev {
    position: absolute;
    top: calc(50% - (var(--button-size) / 2));
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    touch-action: manipulation;
    cursor: pointer;
    border: 1px solid var(--button-border-color);
    border-radius: var(--button-border-radius);
    width: var(--button-size);
    height: var(--button-size);
    background-color: var(--button-bg);
    color: var(--button-color);
    pointer-events: auto;
    -webkit-tap-highlight-color: rgba(49, 49, 49, 0.5);
    -webkit-appearance: none;
  }

  .button-prev {
    left: 0;
  }

  .button-next {
    right: 0;
  }

  @media (hover: hover) {
    .button:hover:not(:disabled) {
      box-shadow: var(--button-box-shadow-hover);
    }
  }

  .button:disabled {
    visibility: hidden;
  }

  .button svg {
    width: 50%;
    height: 50%;
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .dot {
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
    display: inline-flex;
    border: 0;
    background: var(--dot-color);
    height: 0.125rem;
    width: 1rem;
  }

  .dot--selected {
    background: var(--dot-color-active);
  }
`;
