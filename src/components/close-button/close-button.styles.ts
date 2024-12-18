import { css } from 'lit';

export default css`
  :host {
    --button-size: 32px;
    --button-radius: 4px;
    --button-color: #374151; /* gray.700 */
    --button-bg: transparent;
    --button-bg-hover: #f3f4f6; /* gray.100 */

    display: inline-flex;
    align-items: center;
    justify-items: center;
  }

  :host([disabled]) button {
    opacity: 0.5;
    pointer-events: none;
  }

  button {
    all: unset;
    display: grid;
    place-items: center;
    margin: auto;
    width: var(--button-size);
    height: var(--button-size);
    background-color: var(--button-bg);
    border-radius: var(--button-radius);
    color: var(--button-color);
    cursor: pointer;
  }

  button:hover {
    background-color: var(--button-bg-hover);
  }

  button:focus-visible {
    outline: 2px solid #111827;
    outline-offset: -2px;
  }

  :host([variant='square']) {
    /*
    https://www.benjystanton.co.uk/blog/accessible-close-buttons/
    Accessibility: the overall size of should be at least 44 pixels in height and width
    */
    padding: 8px;
  }

  :host([variant='circle']) {
    --button-radius: 9999px;
    --button-size: 44px;
    --button-bg: #f3f4f6; /* gray.100 */
    --button-bg-hover: #e5e7eb; /* gray.200 */
  }
`;
