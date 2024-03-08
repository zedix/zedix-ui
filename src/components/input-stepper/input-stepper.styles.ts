import { css } from 'lit';

export default css`
  :host {
    --input-stepper-border-color: #e2e8f0;
    --input-stepper-border-radius: 2px;
    --input-stepper-color: #f7fafc;
    --input-stepper-color-hover: #edf2f7;
    --input-stepper-button-width: 48px;

    display: inline-flex;
    outline: none;
  }

  .stepper {
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    white-space: nowrap;
    border: 1px solid var(--input-stepper-border-color);
    border-radius: var(--input-stepper-border-radius);
    min-height: var(--input-stepper-button-width);
  }

  button {
    box-sizing: border-box;
    padding: 0;
    appearance: none;
    background: none;
    border: 0;
    font-family: inherit;
    font-size: inherit;
    width: var(--input-stepper-button-width);
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  button:not(:disabled) {
    background-color: var(--input-stepper-color);
  }

  @media (hover: hover) {
    button:hover:not(:disabled) {
      background-color: var(--input-stepper-color-hover);
    }
  }

  input {
    appearance: none;
    -moz-appearance: textfield;
    font-family: inherit;
    font-size: inherit;
    border: 0;
    text-align: center;
    max-width: calc(var(--input-stepper-button-width) * 1.2);
  }

  input:disabled {
    background-color: inherit;
    cursor: not-allowed;
    /* iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655. */
    opacity: 1;
  }
`;
