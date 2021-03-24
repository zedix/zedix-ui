import { css } from 'lit-element';

export default css`
  :host {
    --input-background-color: #fff;
    --input-background-color-disabled: #edf2f7;
    --input-checked-color: var(--input-border-color);
    --input-checkmark-color: #fff;
    --input-checkbox-size: 20px;
    --input-border-width: 1px;
    --input-border-radius: 4px;
    --input-border-color: #2a4365;
    --input-border-color-hover: #2c5282;
    --input-border-color-focus: #2c5282;
    --input-focus-shadow: 0 0 0 0.2rem #e9d8fd;

    display: inline-block;
    outline: none;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .checkbox:focus-within .checkbox__control {
    border-color: var(--input-border-color-focus);
    box-shadow: var(--input-focus-shadow);
  }

  input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  .checkbox__control {
    position: relative;
    display: inline-block;
    width: var(--input-checkbox-size);
    height: var(--input-checkbox-size);
    margin-right: 8px;
    border: var(--input-border-width) solid var(--input-border-color);
    border-radius: var(--input-border-radius);
    background-color: var(--input-background-color);
    transition-duration: 0.2s;
    transition-property: background-color, border-color;
    transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
  }

  .checkbox__control:hover {
    border-color: var(--input-border-color-hover);
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    transition: transform 0.1s cubic-bezier(0.36, 0, 1, 1);
    transform-origin: 50% 50%;
    transform: translate(-50%, -50%) scale(0);
    fill: var(--input-checkmark-color);
  }

  input:checked + .checkbox__control svg,
  input:indeterminate + .checkbox__control svg {
    transform: translate(-50%, -50%) scale(1);
  }

  input:active + .checkbox__control,
  input:focus + .checkbox__control,
  input:checked + .checkbox__control {
    border-color: var(--input-border-color);
  }

  input:checked + .checkbox__control,
  input:indeterminate + .checkbox__control {
    background-color: var(--input-checked-color);
  }

  input:disabled + .checkbox__control {
    pointer-events: none;
    cursor: not-allowed;
    filter: alpha(opacity=45);
    opacity: 0.45;
    background-color: var(--input-background-color-disabled);
  }
`;
