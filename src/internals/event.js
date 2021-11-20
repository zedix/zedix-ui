/**
 * Default custom event options.
 *
 * Remarks: to make a custom event pass through shadow DOM boundaries, we must set
 * both the composed and bubbles flags to true.
 */
const defaultEventOptions = {
  // If true, the event goes through its target’s ancestors in reverse tree order
  bubbles: true,
  // If true, the event can be canceled by invoking the preventDefault() method
  cancelable: true,
  // If true, the event invokes listeners past a ShadowRoot node that is the root of its target
  composed: true,
};

/**
 * Emits a custom HTML event.
 *
 * @param {HTMLElement} element - The HTML element emitting event.
 * @param {string} eventName - The name of the event.
 * @param {object} detail - The event detail object to send with the event.
 * @param {object} options - The event options. By default bubbles and composed.
 * @returns {CustomEvent}
 */
export function dispatchEvent(element, eventName, detail, options) {
  const event = new CustomEvent(eventName, {
    detail,
    ...defaultEventOptions,
    ...options,
  });
  element.dispatchEvent(event);
  return event;
}
