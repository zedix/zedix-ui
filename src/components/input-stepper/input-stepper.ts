import InputStepper from './input-stepper.component';

export * from './input-stepper.component';
export default InputStepper;

if (!customElements.get('zx-input-stepper')) {
  customElements.define('zx-input-stepper', InputStepper);
}

declare global {
  interface HTMLElementTagNameMap {
    'zx-input-stepper': InputStepper;
  }
}
