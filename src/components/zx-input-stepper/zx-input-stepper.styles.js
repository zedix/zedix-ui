import { css } from 'lit-element';

export default css`
  :host {
    --input-stepper-color: #f7fafc;
    --input-stepper-color-hover: #edf2f7;
    --input-stepper-button-with: 48px;

    display: inline-flex;
  }

  .stepper {
    display: flex;
    align-items: stretch;
    white-space: nowrap;
    border: 1px solid var(--input-stepper-color);
    min-height: var(--input-stepper-button-with);
  }

  button {
    appearance: none;
    background: none;
    border: 0;
    width: var(--input-stepper-button-with);
    background-color: var(--input-stepper-color);
    cursor: pointer;
  }

  button:hover {
    background-color: var(--input-stepper-color-hover);
  }

  input {
    appearance: none;
    -moz-appearance: textfield;
    border: 0;
    text-align: center;
  }
`;
