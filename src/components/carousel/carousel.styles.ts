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
    --button-arrow-size: 20px;
    --button-arrow-color: #4b5563;
    --button-offset: 8px;
    --button-border-color: #e5e7eb;
    --button-border-radius: 8px;
    --button-bg: rgba(255, 255, 255, 0.8);
    --button-color: inherit;
    --button-box-shadow-hover:
      0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);

    /*
    --dot-color: hsla(0, 0%, 100%, 0.4);
    --dot-color-active: white;
    */
    --dot-color: #9ca3af;
    --dot-color-active: #111827;
    --dot-margin: 0.5rem 0;

    display: block;
    /* Note: moving this elsewhere (e.g wrapper) may bug the container translate position */
    position: relative;
  }

  :host([single]) {
    --slide-size: 100%;
    --slide-gap: 0;
  }

  :host([axis='y']) .container {
    flex-direction: column;
    max-height: var(--slide-height);
  }

  :host([axis='y']) .viewport {
    max-height: var(--slide-height);
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
    border: 1px solid var(--button-border-color);
    border-radius: var(--button-border-radius);
    width: var(--button-size);
    height: var(--button-size);
    background-color: var(--button-bg);
    color: var(--button-color);
    cursor: pointer;
    pointer-events: auto;
    -webkit-tap-highlight-color: rgba(49, 49, 49, 0.5);
    -webkit-appearance: none;
  }

  .button-prev {
    left: var(--button-offset);
  }

  .button-next {
    right: var(--button-offset);
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
    width: var(--button-arrow-size);
    height: var(--button-arrow-size);
    color: var(--button-arrow-color);
  }

  .dots {
    display: flex;
    justify-content: center;
    margin: var(--dot-margin);
  }

  .dot {
    -webkit-appearance: none;
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-items: center;
    touch-action: manipulation;
    background: none;
    padding-inline: 0.25rem;
    padding-block: 0.5rem;
    border: 0;
    cursor: pointer;
  }

  .dot i {
    background: var(--dot-color);
    height: 0.125rem;
    width: 1rem;
  }

  .dot--selected i {
    background: var(--dot-color-active);
  }
`;
