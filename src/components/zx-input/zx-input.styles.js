import { css } from 'lit-element';

export default css`
  :host {
    --input-background-color: #fff;
    --input-border-width: 1px;
    --input-border-radius: 4px;
    --input-border-color: #2a4365;
    --input-border-color-hover: #2c5282;
    --input-border-color-focus: #2c5282;
    --input-placeholder-color: #cbd5e0;
    --input-caret-color: #2a4365;
    --input-background-color-disabled: #edf2f7;
    --input-focus-shadow: 0 0 0 0.2rem #e9d8fd;

    display: inline-block;
  }

  label {
    display: inline-block;
    margin-bottom: 4px;
  }

  .textfield {
    display: block;
    box-sizing: border-box;
    padding: 12px;
    font-size: 1rem;
    border: var(--input-border-width) solid var(--input-border-color);
    border-radius: var(--input-border-radius);
    background-color: var(--input-background-color);
    background-image: none; /* [1] */
    background-clip: padding-box;
    caret-color: var(--input-caret-color);
    width: 100%;
  }

  .textfield:hover {
    border-color: var(--input-border-color-hover);
  }

  .textfield:focus {
    border-color: var(--input-border-color-focus);
    box-shadow: var(--input-focus-shadow);
    outline: none;
  }

  .textfield:disabled {
    background-color: var(--input-background-color-disabled);
    cursor: not-allowed;
    /* iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655. */
    opacity: 1;
  }

  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: var(--input-placeholder-color);
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: var(--input-placeholder-color);
  }

  ::placeholder {
    color: var(--input-placeholder-color);
    opacity: 1; /* Mozilla Firefox */
  }
`;
