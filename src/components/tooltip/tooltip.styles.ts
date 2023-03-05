import { css } from 'lit';

export default css`
  :host {
    --background-color: #1f2937;
    --arrow-size: 8px;
    --arrow-color: var(--background-color);
    --shadow: 0 1px 2px rgba(0, 0, 0, 0.16);

    position: absolute;
    isolation: isolate;
    display: block;
    box-sizing: border-box;
    padding: 4px 8px;
    width: max-content;
    max-width: 180px;
    border-radius: 4px;
    background-color: var(--background-color);
    color: #fff;
    font-size: 13px;
    filter: drop-shadow(var(--shadow));
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
