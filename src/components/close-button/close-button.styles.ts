import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: inline-flex;
    align-items: center;
    justify-items: center;
    padding: 8px;
  }

  button {
    all: unset;
    display: grid;
    place-items: center;
    cursor: pointer;
    width: 32px;
    height: 32px;
    margin: auto;
    border-radius: var(--c-button-border-radius);
  }

  button:hover {
    background: var(--c-color-palette-neutral-gray-100); /* FIXME: use semantic color */
  }

  button:focus {
    background: var(--c-color-palette-neutral-gray-100); /* FIXME: use semantic color */
  }

  button:focus-visible {
    outline: 2px solid blue;
    outline-offset: -2px;
  }

  :host([disabled]) button {
    opacity: 0.5;
    pointer-events: none;
  }
`;
