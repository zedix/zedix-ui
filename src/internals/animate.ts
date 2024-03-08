/* global Keyframe, KeyframeAnimationOptions */

/**
 * Web Animations API (WAAPI) helpers.
 * https://caniuse.com/web-animation
 *
 * @link https://github.com/lit/lit/blob/main/packages/labs/motion/src/animate.ts
 */

function supportsWebAnimationsApi() {
  return 'animate' in document.body;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function animate(el: HTMLElement, keyframes: Keyframe[], options: KeyframeAnimationOptions) {
  if (!supportsWebAnimationsApi()) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    const animation = el.animate(keyframes, {
      ...options,
      duration: prefersReducedMotion() ? 0 : options.duration,
    });
    animation.addEventListener('cancel', resolve, { once: true });
    animation.addEventListener('finish', resolve, { once: true });
  });
}

export function stopAnimations(el: HTMLElement) {
  if (!supportsWebAnimationsApi()) {
    return Promise.resolve();
  }
  return Promise.all(
    el.getAnimations().map(
      animation =>
        new Promise(resolve => {
          const handleCancel = () => requestAnimationFrame(resolve);
          animation.addEventListener('cancel', handleCancel, { once: true });
          animation.addEventListener('finish', handleCancel, { once: true });
          animation.cancel();
        }),
    ),
  );
}

export function setKeyframesHeightAuto(keyframes: Keyframe[], height: number) {
  return keyframes.map(keyframe => ({
    ...keyframe,
    height: keyframe.height === 'auto' ? `${height}px` : keyframe.height,
  }));
}

export function parseDurationInMilliseconds(delay: string) {
  // CSSStyleValue.parse('animation-duration', delay)
  const cssValue = delay.toLowerCase();

  if (cssValue.includes('ms')) {
    return parseFloat(delay);
  }

  if (cssValue.includes('s')) {
    return parseFloat(delay) * 1000;
  }

  return parseFloat(delay);
}
