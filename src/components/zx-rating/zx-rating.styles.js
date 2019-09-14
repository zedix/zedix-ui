import { css } from 'lit-element';

export default css`
  :host {
    --star-size: 20px;

    font-size: 0;
    line-height: 0;
  }

  :host([size='small']) {
    --star-size: 16px;
  }

  :host([size='xsmall']) {
    --star-size: 12px;
  }

  .wrapper {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .rating {
    position: relative;
    width: calc(5 * var(--star-size));
    height: var(--star-size);
    background-size: contain;
  }

  .rating input {
    appearance: none;
    position: relative;
    z-index: 2;
    display: inline-block;
    width: 20%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
  }

  .rating input:checked + i,
  .rating input:hover + i {
    opacity: 1;
  }

  .rating:hover input:checked:not(:hover) + i {
    opacity: 0;
  }

  .rating i {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100%;
    background-size: contain;
    transition: opacity 200ms ease-out;
    opacity: 0;
  }

  .rating i:only-child {
    opacity: 1;
  }

  .rating i:nth-of-type(1) {
    width: 20%;
  }

  .rating i:nth-of-type(2) {
    width: 40%;
  }

  .rating i:nth-of-type(3) {
    width: 60%;
  }

  .rating i:nth-of-type(4) {
    width: 80%;
  }

  .rating i:nth-of-type(5) {
    width: 100%;
  }

  .rating-label {
    margin-right: 4px;
    margin-left: 4px;
    flex: 1;
    font-size: 1rem;
  }
`;
