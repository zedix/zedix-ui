import { css } from 'lit';

export default css`
  :host {
    --aspect-ratio: inherit;

    display: block;
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
