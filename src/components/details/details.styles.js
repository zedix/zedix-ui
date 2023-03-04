import { css } from 'lit';

export default css`
  :host {
    display: block;

    --details-body-height: auto;
    --details-padding: 1rem;
    --details-toggle-color: currentColor;
    --details-toggle-size: 16px;
    --details-toggle-thickness: 2px;
    --details-toggle-transition: 300ms transform ease, 100ms background-color ease;
  }

  @media (prefers-reduced-motion) {
    --details-toggle-transition: none;
  }

  :host([disabled]) {
    opacity: 0.5;
  }

  .details__summary {
    display: flex;
    align-items: center;
    padding: var(--details-padding);
    border-radius: inherit;
    cursor: pointer;
    user-select: none;
  }

  :host([disabled]) .details__summary {
    cursor: not-allowed;
  }

  [name='summary-icon']::slotted(*) {
    margin-left: auto;
  }

  .details__summary-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: var(--details-toggle-size);
    height: var(--details-toggle-size);
  }

  /**
   * "Plus" sign
   */
  .details__summary-icon::before,
  .details__summary-icon::after {
    content: '';
    position: absolute;
    background-color: var(--details-toggle-color);
    border-radius: 2px;
    transition: var(--details-toggle-transition);
  }

  /**
   * "Plus"sign: vertical part
   */
  .details__summary-icon::before {
    height: 100%;
    width: var(--details-toggle-thickness);
  }

  /**
   * "Plus" sign: horizontal part
   */
  .details__summary-icon::after {
    width: 100%;
    height: var(--details-toggle-thickness);
  }

  :host([open]) .details__summary-icon::before,
  :host([open]) .details__summary-icon::after {
    transform: rotate(90deg);
  }

  :host([open]) .details__summary-icon::after {
    background-color: transparent;
  }

  .details__body {
    overflow: hidden;
  }

  :host([overflow-visible]) .details__body {
    overflow: visible;
  }

  .details__content {
    padding: var(--details-padding);
  }
`;
