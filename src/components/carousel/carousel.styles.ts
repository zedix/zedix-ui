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

    --button-size: 48px;
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

    --scrollbar-color: #d1d5db transparent;

    display: block;
    /* Note: moving this elsewhere (e.g wrapper) may bug the container translate position */
    position: relative;
    container-type: inline-size;
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

  :host([with-scrollbar]) .viewport {
    overflow-x: scroll;
    scrollbar-color: var(--scrollbar-color); /* progress / track */
    scrollbar-gutter: stable both-edges;
    scrollbar-width: thin;
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

  /*
  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   🆂🅲🆁🅾🅻🅻-🅱🆄🆃🆃🅾🅽🆂
  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  */
  .scroll-buttons--inside {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .scroll-buttons--outside {
    /*
    --button-arrow-color: white;
    --button-bg: var(--dot-color-active);
    --button-color: white;
    --button-size: 44px;
    */

    display: flex;
    gap: 8px;
    justify-content: end;
    padding-block: 8px;
  }

  .scroll-buttons--disabled,
  .inactive .scroll-buttons {
    display: none;
  }

  .button-next,
  .button-previous,
  .button-fullscreen {
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

  .scroll-buttons--inside .button-previous,
  .scroll-buttons--inside .button-next,
  .button-fullscreen {
    position: absolute;
    top: calc(50% - (var(--button-size) / 2));
    z-index: 1;
  }

  .scroll-buttons--inside .button-previous {
    left: var(--button-offset);
  }

  .scroll-buttons--inside .button-next {
    right: var(--button-offset);
  }

  .scroll-buttons--inside .button:disabled {
    visibility: hidden;
  }

  .button:disabled {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.4;
  }

  .button-fullscreen {
    border-radius: 4px;
    right: var(--button-offset);
    top: var(--button-offset);
    width: calc(var(--button-size) * 0.75);
    height: calc(var(--button-size) * 0.75);
  }

  @container (min-width: 640px) {
    .button-fullscreen {
      width: var(--button-size);
      height: var(--button-size);
    }
  }

  @media (hover: hover) {
    .button:hover:not(:disabled) {
      box-shadow: var(--button-box-shadow-hover);
    }
  }

  .button svg {
    width: var(--button-arrow-size);
    height: var(--button-arrow-size);
    color: var(--button-arrow-color);
  }

  /*
  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
   🅳🅾🆃🆂
  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  */

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

  .dot--bar i {
    background: var(--dot-color);
    height: 0.125rem;
    width: 1rem;
  }

  .dot--selected i {
    background: var(--dot-color-active);
  }

  .dot--circle i {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 8px;
    border: 2px solid var(--dot-color-active);
  }

  .dot--circle.dot--selected i {
    width: 30px;
  }
`;
