import { css } from 'lit';

export default css`
  :host {
    --skeleton-fill-default: #e1dfdd;
    --skeleton-timing-default: ease-in-out;
    --skeleton-animation-gradient-default: linear-gradient(
      270deg,
      var(--skeleton-fill, var(--skeleton-fill-default)) 0%,
      #f3f2f1 51.13%,
      var(--skeleton-fill, var(--skeleton-fill-default)) 100%
    );

    position: relative;
    overflow: hidden;
    display: block;
    width: 100%;
    height: 1.2em;
    background-color: var(--skeleton-fill, var(--skeleton-fill-default));
  }

  :host > * {
    visibility: hidden;
  }

  /* :host:not(:blank) */
  :host([has-children]) {
    /* Children width no width */
    max-width: fit-content;

    /* Children width no height */
    height: auto;
  }

  :host([shape='circle']) {
    border-radius: 100%;
  }

  :host([shape='rectangle']) {
    border-radius: 4px;
  }

  :host([shape='text']) {
    height: auto;
    transform: scale(1, 0.6);
    margin-top: 0;
    border-radius: 4px;
    margin-bottom: 0;
    transform-origin: 0 60%;
  }

  :host([shape='text']):empty::before {
    content: '\\00a0';
  }

  :host([animation='pulse']) {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite;
    animation-fill-mode: backwards;
  }

  :host([animation='wave'])::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: var(
      --skeleton-animation-gradient,
      var(--skeleton-animation-gradient-default)
    );
    background-repeat: no-repeat;
    background-size: 0 0 / 90% 100%;
    animation: wave 2s infinite;
    animation-timing-function: var(--skeleton-animation-timing, var(--skeleton-timing-default));
    animation-direction: normal;
    z-index: 1;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes wave {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
