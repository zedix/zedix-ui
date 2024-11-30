import { css } from 'lit';

export default css`
  :host {
    --transition-duration: 300ms;
    --translateY: 100%;

    display: block;
    left: 0;
    right: 0;
    z-index: 1;
    transition: transform var(--transition-duration) ease-out;
  }

  :host([placement='start']) {
    --translateY: -100%;
    position: sticky;
    top: 0;
  }

  :host([placement='end']) {
    position: fixed;
    bottom: 0;
  }

  :host(:not([reveal])) {
    transform: translateY(var(--translateY));
  }
`;
