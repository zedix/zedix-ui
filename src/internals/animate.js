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

export function animate(el, keyframes, options) {
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

export function stopAnimations(el) {
  if (!supportsWebAnimationsApi()) {
    return Promise.resolve();
  }
  return Promise.all(
    el.getAnimations().map(animation => {
      return new Promise(resolve => {
        const handleCancel = () => requestAnimationFrame(resolve);
        animation.addEventListener('cancel', handleCancel, { once: true });
        animation.addEventListener('finish', handleCancel, { once: true });
        animation.cancel();
      });
    })
  );
}
