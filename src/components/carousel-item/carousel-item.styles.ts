import { css } from 'lit';

export default css`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
  }

  /*
  ::slotted(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
  */
`;
