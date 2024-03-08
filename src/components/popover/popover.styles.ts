import { css } from 'lit';

export default css`
  :host {
    --animation-duration: 150ms;
    --background-color: #fff;
    --arrow-size: 8px;
    --arrow-color: var(--background-color);
    --shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
    --border-color: #e4e4e7;
    --border-width: 1px;
    --max-width: 320px;
    --theme: bordered;

    /* Note: arrow can not be used with overflow-hidden */

    position: absolute;
    isolation: isolate;
    display: block;
    box-sizing: border-box;
    padding: 0;
    width: fit-content;
    background-color: var(--background-color);
    background-clip: content-box;
    filter: drop-shadow(var(--shadow));
    z-index: 10;
  }

  :host(:not([full-width])) {
    max-width: var(--max-width);
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
