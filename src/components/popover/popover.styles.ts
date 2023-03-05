import { css } from 'lit';

export default css`
  :host {
    --background-color: #fff;
    --arrow-size: 8px;
    --arrow-color: var(--background-color);
    --shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
    --border-color: #ccc;
    --border-width: 1px;
    --max-width: 180px;
    --theme: bordered;

    /* Note: arrow can not be used with overflow-hidden */

    position: absolute;
    isolation: isolate;
    display: block;
    box-sizing: border-box;
    padding: 0;
    width: max-content;
    width: var(--max-width);
    background-color: var(--background-color);
    background-clip: content-box;
    font-size: 13px;
    filter: drop-shadow(var(--shadow));
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  i {
    position: absolute;
    display: block;
    width: var(--arrow-size);
    height: var(--arrow-size);
    background: var(--arrow-color);
    transform: rotate(45deg);
    border: 0;
    z-index: -1;
  }

  /*
  :host::before {
    content: '';
    position: absolute;
    display: block;
    width: var(--arrow-size);
    height: var(--arrow-size);
    background: var(--arrow-color);
    transform: rotate(45deg);
    top: var(--arrow-top);
    left: var(--arrow-left);
    right: var(--arrow-right);
    bottom: var(--arrow-bottom);
    border: 0;
    z-index: 9;
  }
  */

  /*@container style(--theme: bordered) {}*/

  /* Theme: light-border */
  :host(.light-border) {
    border: var(--border-width) solid var(--border-color) !important;
  }

  :host(.light-border[data-placement^='right']) i {
    border-left: var(--border-width) solid var(--border-color) !important;
    border-bottom: var(--border-width) solid var(--border-color) !important;
    margin-left: calc(var(--border-width) * -1);
  }

  :host(.light-border[data-placement^='bottom']) i {
    border-top: var(--border-width) solid var(--border-color) !important;
    border-left: var(--border-width) solid var(--border-color) !important;
    margin-top: calc(var(--border-width) * -1);
  }

  :host(.light-border[data-placement^='left']) i {
    border-right: var(--border-width) solid var(--border-color) !important;
    border-top: var(--border-width) solid var(--border-color) !important;
    margin-right: calc(var(--border-width) * -1);
  }

  :host(.light-border[data-placement^='top']) i {
    border-right: var(--border-width) solid var(--border-color) !important;
    border-bottom: var(--border-width) solid var(--border-color) !important;
    margin-bottom: calc(var(--border-width) * -1);
  }
`;
