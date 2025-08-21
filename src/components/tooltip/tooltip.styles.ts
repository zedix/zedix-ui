import { css } from 'lit';

export default css`
  :host {
    --arrow-size: 8px;
    --arrow-color: var(--background-color);
    --background-color: #1f2937;
    --border-radius: 4px;
    --color: #fff;
    --font-size: 13px;
    --padding: 4px 8px;
    --shadow: 0 1px 2px rgba(0, 0, 0, 0.16);

    position: absolute;
    isolation: isolate;
    display: block;
    box-sizing: border-box;

    /* Customizable with CSS class */
    width: max-content;
    max-width: 180px;
    border-radius: var(--border-radius);
    background-color: var(--background-color);
    color: var(--color);
    font-size: var(--font-size);
    filter: drop-shadow(var(--shadow));
    z-index: 10;
  }

  .body {
    /* Avoid padding reset from tailwindcss  */
    padding: var(--padding);
  }

  i {
    position: absolute;
    display: block;
    width: var(--arrow-size);
    height: var(--arrow-size);
    background: var(--arrow-color);
    transform: rotate(45deg);
  }
`;
