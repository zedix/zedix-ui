import { css } from 'lit';

export default css`
  :host {
    --border-color: oklch(0.872 0.01 258.338); /* gray.300 */
    --border-radius: 4px;
    --button-background-color: oklch(0.985 0.002 247.839); /* gray.50 */
    --button-background-color-hover: oklch(0.967 0.003 264.542); /* gray.100 */
    --button-width: 42px;

    display: inline-flex;
    outline: none;
  }

  .stepper {
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    white-space: nowrap;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    min-height: var(--button-width);
  }

  button {
    padding: 0;
    appearance: none;
    background: none;
    border: 0;
    font-family: inherit;
    font-size: inherit;
    width: var(--button-width);
    aspect-ratio: 1/1;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  button:first-of-type {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  button:last-of-type {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  button:not(:disabled) {
    background-color: var(--button-background-color);
  }

  @media (hover: hover) {
    button:hover:not(:disabled) {
      background-color: var(--button-background-color-hover);
    }
  }

  input {
    appearance: none;
    -moz-appearance: textfield;
    font-family: inherit;
    font-size: inherit;
    border: 0;
    text-align: center;
    margin-inline: 1px;
    max-width: calc(var(--button-width) * 1.15);
  }

  input:disabled {
    background-color: inherit;
    cursor: not-allowed;
    /* iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655. */
    opacity: 1;
  }
`;
