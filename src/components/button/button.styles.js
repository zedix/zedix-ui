import { css } from 'lit';

export default css`
  :host {
    --button-border-radius: 2px;
    --button-shadow-focus: 0 0 0 0.2rem #e9d8fd;
    --button-shadow-hover: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
    --button-transition: 300ms ease-out;

    --button-primary-background-color: #6b46c1;
    --button-primary-background-color-hover: #805ad5;
    --button-primary-text-color: #fff;
    --button-primary-text-color-hover: #fff;
    --button-primary-border: none;
    --button-primary-border-hover: none;
    --button-primary-shadow-hover: var(--button-shadow-hover);
    --button-primary-shadow-focus: var(--button-shadow-focus);
    --button-outline-primary-text-color: var(--button-primary-background-color);

    --button-secondary-background-color: #fff;
    --button-secondary-background-color-hover: #f7fafc;
    --button-secondary-text-color: #4a5568;
    --button-secondary-text-color-hover: #1a202c;
    --button-secondary-border: 1px solid #4a5568;
    --button-secondary-border-hover: 1px solid #1a202c;
    --button-secondary-shadow-focus: var(--button-shadow-focus);
    --button-secondary-shadow-hover: var(--button-shadow-hover);

    display: inline-block;
    outline: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]) {
    display: none;
  }

  .button {
    box-sizing: border-box;
    margin-bottom: 0;
    border: 0;
    border-radius: var(--button-border-radius);
    background-color: transparent;
    background-image: none;
    font-family: inherit;
    font-size: inherit;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    transition: var(--button-transition);
    text-align: center;
    text-decoration: none;
    outline: none;
    -webkit-appearance: none; /* Remove background on iOS */
  }

  .button::-moz-focus-inner {
    border: none;
  }

  button:disabled {
    pointer-events: none;
    cursor: not-allowed;
    filter: alpha(opacity=45);
    opacity: 0.45;
  }

  :host([block]),
  :host([block]) .button {
    display: block;
    width: 100%;
  }

  :host([variant='primary']) zx-spinner {
    --spinner-color: rgba(255, 255, 255, 0.84);
    margin-left: 4px;
  }

  :host([variant='primary']) .button {
    background-color: var(--button-primary-background-color);
    color: var(--button-primary-text-color);
    border: var(--button-primary-border);
  }

  :host([variant='primary']) .button:hover,
  :host([variant='primary']) .button:active {
    background-color: var(--button-primary-background-color-hover);
    color: var(--button-primary-text-color-hover);
    border: var(--button-primary-border-hover);
  }

  :host([variant='primary']) .button:hover:not(:focus) {
    box-shadow: var(--button-primary-shadow-hover);
  }

  :host([variant='primary']) .button:focus {
    box-shadow: var(--button-primary-shadow-focus);
  }

  :host([variant='secondary']) .button {
    background-color: var(--button-secondary-background-color);
    color: var(--button-secondary-text-color);
    border: var(--button-secondary-border);
  }

  :host([variant='secondary']) .button:hover,
  :host([variant='secondary']) .button:active {
    color: var(--button-secondary-text-color-hover);
    background-color: var(--button-secondary-background-color-hover);
    border: var(--button-secondary-border-hover);
  }

  :host([variant='secondary']) .button:hover:not(:focus) {
    box-shadow: var(--button-primary-shadow-hover);
  }

  :host([variant='secondary']) .button:focus {
    box-shadow: var(--button-secondary-shadow-focus);
  }

  :host([variant='outline-primary']) .button {
    border: 1px solid var(--button-primary-background-color);
    background-color: white;
    color: var(--button-outline-primary-text-color);
  }

  .button:focus {
    outline: 0;
    box-shadow: var(--button-shadow-focus);
  }

  .button:hover:not(:focus) {
    box-shadow: var(--button-shadow-hover);
  }

  :host([size='large']) .button {
    padding: 10px 24px;
  }

  :host([size='medium']) .button {
    padding: 8px 12px;
  }

  :host([size='small']) .button {
    padding: 4px 8px;
  }

  @media (prefers-reduced-motion: reduce) {
    .button {
      transition: none;
    }
  }
`;
