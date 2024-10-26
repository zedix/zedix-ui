import { css } from 'lit';

export default css`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
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
