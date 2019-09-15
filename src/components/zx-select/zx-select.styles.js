import { css } from 'lit-element';

export default css`
  :host {
    --input-background-color: white;
    --input-border: 1px solid #718096;
    --input-border-hover: 1px solid #4a5568;
    --input-border-radius: 4px;
    --input-focus-shadow: 0 0 0 0.2rem #e9d8fd;
    --input-text-color: #1a202c;
    --input-dropdown-arrow-color: var(--input-text-color);
    --input-min-width: 60px;
    --input-font-size: 1rem;

    display: inline-block;
  }

  .select {
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    padding: 10px 28px 10px 12px;
    border: var(--input-border);
    border-radius: var(--input-border-radius);
    background-color: var(--input-background-color);
    background-image: none; /* [1] */
    background-clip: padding-box;
    min-width: var(--input-min-width);
    max-width: 100%;
  }

  .select:hover,
  .select:focus-within {
    border-color: var(--input-border-hover);
  }

  .select::after {
    content: '';
    display: inline-block;
    position: absolute;
    right: 12px;
    top: calc(50% - 8px);
    padding: 4px;
    border: solid var(--input-dropdown-arrow-color);
    border-width: 0 2px 2px 0;
    pointer-events: none;
    transform: rotate(45deg);
    vertical-align: middle;
  }

  .select > span {
    display: inline-block;
    min-width: 1rem;
    color: var(--input-text-color);
  }

  .select > select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    /* Required to have <select /> with height 100% in Safari  */
    -webkit-appearance: menulist-button;
  }

  .select option {
    font-size: var(--input-font-size);
  }

  .select:focus-within {
    border-color: var(--input-border-color-focus);
    box-shadow: var(--input-focus-shadow);
  }

  label {
    display: inline-block;
    margin-bottom: 4px;
  }
`;
