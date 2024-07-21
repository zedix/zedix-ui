import { css } from 'lit';

/*
@media (min-width: 750px) {
  zx-carousel {
    --slide-size: 30%;
    --slide-spacing: 1.6rem;
  }
}

@media (min-width: 1200px) {
  zx-carousel {
    --slide-size: calc(100% / 3);
    --slide-spacing: 2rem;
  }
}
*/

export default css`
  :host {
    --slide-height: 19rem;
    --slide-size: 100%;
    --slide-spacing: 1rem;

    --button-size: 3.6rem;
  }

  .embla__viewport {
    position: relative;
    overflow: hidden;
  }

  .embla__container {
    backface-visibility: hidden;
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
  }

  ::slotted(zx-carousel-item) {
    min-width: 0;
    flex: 0 0 var(--slide-size);
    padding-left: var(--slide-spacing);
  }

  .embla__slide__number {
    box-shadow: inset 0 0 0 0.2rem rgb(231, 231, 231);
    border-radius: 1.8rem;
    font-size: 4rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--slide-height);
    user-select: none;
  }

  .embla__buttons {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .embla__button {
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    touch-action: manipulation;
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    border: 1px solid white;
    width: var(--button-size);
    height: var(--button-size);
    border-radius: 50%;
    color: var(--text-body);
    -webkit-tap-highlight-color: rgba(49, 49, 49, 0.5);
    -webkit-appearance: none;
  }

  .embla__button:disabled {
    visibility: hidden;
    /*
    color: #e5e7eb;
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
    */
  }

  .embla__button svg {
    width: 35%;
    height: 35%;
  }
`;
