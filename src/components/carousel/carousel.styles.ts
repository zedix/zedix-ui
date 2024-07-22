import { css } from 'lit';

/*
@media (min-width: 750px) {
  zx-carousel {
    --slide-size: 30%;
    --slide-gap: 1.6rem;
  }
}

@media (min-width: 1200px) {
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
    --slide-gap: 1rem;

    --button-size: 40px;
    --button-border-color: #e5e7eb;
    --button-border-radius: 8px;
    --button-bg: rgba(255, 255, 255, 0.8);
    --button-color: inherit;

    display: block;
  }

  .wrapper {
    position: relative;
  }

  .viewport {
    position: relative;
    overflow: hidden;
  }

  .container {
    backface-visibility: hidden;
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-gap) * -1);
  }

  ::slotted(zx-carousel-item) {
    flex: 0 0 var(--slide-size);
    padding-left: var(--slide-gap);
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

  .button:disabled {
    visibility: hidden;
  }

  .button svg {
    width: 50%;
    height: 50%;
  }
`;
