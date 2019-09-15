import { css } from 'lit-element';

export default css`
  :host {
    --input-radio-size: 20px;
    --input-background-color: #fff;
    --input-border-width: 1px;
    --input-border-color: #2a4365;
    --input-border-color-hover: #2c5282;
    --input-border-color-focus: #2c5282;
    --input-checkmark-color: var(--input-border-color);
    --input-focus-shadow: 0 0 0 0.2rem #e9d8fd;

    display: inline-block;
  }

  :host([disabled]) {
    -webkit-tap-highlight-color: transparent;
  }

  .radio {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .radio:focus-within i {
    border-color: var(--input-border-color-focus);
    box-shadow: var(--input-focus-shadow);
  }

  input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  i {
    position: relative;
    display: inline-block;
    width: var(--input-radio-size);
    height: var(--input-radio-size);
    margin-right: 8px;
    background-color: var(--input-background-color);
    border: var(--input-border-width) solid var(--input-border-color);
    border-radius: 50%;
    box-shadow: 0 0 0 1px transparent, 0 1px 0 0 rgba(22, 29, 37, 0.05);
    transition: border-color 0.2s cubic-bezier(0.64, 0, 0.35, 1);
  }

  i::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50%;
    width: 50%;
    border-radius: 50%;
    background-color: var(--input-checkmark-color);
    transition: transform 0.1s cubic-bezier(0.36, 0, 1, 1);
    transform-origin: 50% 50%;
    transform: translate(-50%, -50%) scale(0);
  }

  input:checked + i::after {
    transform: translate(-50%, -50%) scale(1);
  }

  input:active + span,
  input:checked + span,
  input:focus + span,
  input:hover + span {
    border-color: var(--input-checkmark-color);
  }
`;
