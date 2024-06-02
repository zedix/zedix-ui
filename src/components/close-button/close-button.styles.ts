import { css } from 'lit';

export default css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-items: center;
    /*
    https://www.benjystanton.co.uk/blog/accessible-close-buttons/
    Accessibility: the overall size of should be at least 44 pixels in height and width
    */
    padding: 8px;

    --border-radius: 4px;
    --bg-hover: #f5f5f5;
  }

  :host([disabled]) button {
    opacity: 0.5;
    pointer-events: none;
  }

  button {
    all: unset;
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    margin: auto;
    border-radius: var(--border-radius);
    cursor: pointer;
  }

  button:hover {
    background: var(--bg-hover);
  }

  button:focus-visible {
    outline: 2px solid #111827;
    outline-offset: -2px;
  }
`;
