import { LitElement, ReactiveController } from 'lit';
import { computePosition, arrow, flip, shift, offset, type Placement } from '@floating-ui/dom';

/**
 * Floating UI controller used by `Tooltip`, `Popover` custom elements.
 * Host element must provide `hide`, `show` and `toggle` methods.
 *
 * Usage:
 * ```js
 * class Tooltip extends LitElement {
 *   private popup!: PopupController;
 *
 *   firstUpdated() {
 *     this.popup = new PopupElement(this, {
 *       target: 'target-button',
 *       trigger: 'click hover',
 *       placement: 'top',
 *       distance: 0,
 *       showDelay: 0,
 *       hideDelay: 150,
 *     });
 *   }
 *
 *   updated() {
 *     this.popup.updatePosition();
 *   }
 * }
 * ```
 *
 * Note:
 * Controllers cannot add attributes, instance methods or properties (including reactive properties).
 * @see https://github.com/lit/lit/issues/2148
 */

type PopupControllerOptions = {
  target: string;
  trigger: string;
  placement: Placement;
  distance: number;
  showDelay: number;
  hideDelay: number;
};

interface PopupElement extends LitElement {
  open: boolean;
  hide: () => void;
  show: () => void;
  toggle: () => void;
}

export default class PopupController implements ReactiveController {
  private host: PopupElement;
  private hoverTimeout = 0;
  private options!: PopupControllerOptions;

  constructor(host: PopupElement, options: PopupControllerOptions) {
    this.setOptions(options);
    (this.host = host).addController(this);
  }

  hostConnected() {
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.addEventListeners();
  }

  hostDisconnected() {
    this.removeEventListeners();
  }

  get targetElement(): HTMLElement {
    return document.querySelector(`#${this.options.target}`)!;
  }

  get floatingElement(): HTMLElement {
    return this.host;
  }

  get arrowElement(): HTMLElement {
    return this.host.shadowRoot!.querySelector('i')!;
  }

  get middlewares() {
    return [
      // https://floating-ui.com/docs/offset
      // offset() should generally be placed at the beginning of your middleware array.
      offset(this.options.distance),
      // https://floating-ui.com/docs/flip
      flip(),
      // https://floating-ui.com/docs/shift
      shift(),
      // https://floating-ui.com/docs/arrow
      // arrow() should generally be placed toward the end of your middleware array, after shift().
      arrow({ element: this.arrowElement, padding: 8 }),
    ];
  }

  async updatePosition() {
    const { x, y, strategy, placement, middlewareData } = await computePosition(
      this.targetElement,
      this.floatingElement,
      {
        placement: this.options.placement,
        middleware: this.middlewares,
      },
    );

    Object.assign(this.floatingElement.style, {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`,
    });

    const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[
      placement.split('-')[0]
    ];

    if (middlewareData.arrow && this.arrowElement) {
      const { x, y } = middlewareData.arrow;
      Object.assign(this.arrowElement.style, {
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
        [staticSide!]: `${-this.arrowElement.offsetWidth / 2}px`,
      });
      // Store the final placement as a dataset attribute for styling purpose
      this.floatingElement.dataset.placement = placement;
      //this.floatingElement.style.setProperty('--arrow-left', x != null ? `${x}px` : '');
      //this.floatingElement.style.setProperty('--arrow-top', y != null ? `${y}px` : '');
      //this.floatingElement.style.setProperty(`--arrow-${staticSide}`, `${-this.arrowElement.offsetWidth / 2}px`);
    }
  }

  setOptions(options: PopupControllerOptions) {
    this.options = options;
    return this;
  }

  addEventListeners() {
    this.targetElement.addEventListener('keydown', this.handleKeyDown);

    if (this.hasTrigger('click')) {
      this.targetElement.addEventListener('click', this.handleClick);
      document.addEventListener('click', this.handleClickOutside, true);
    }

    if (this.hasTrigger('hover')) {
      this.targetElement.addEventListener('mouseover', this.handleMouseOver);
      this.targetElement.addEventListener('mouseout', this.handleMouseOut);
    }

    if (this.hasTrigger('focus')) {
      this.targetElement.addEventListener('focusin', this.handleFocusIn, true);
      this.targetElement.addEventListener('focusout', this.handleFocusOut, true);
    }
  }

  removeEventListeners() {
    this.targetElement.removeEventListener('keydown', this.handleKeyDown);

    if (this.hasTrigger('click')) {
      this.targetElement?.removeEventListener('click', this.handleClick);
      document.removeEventListener('click', this.handleClickOutside, true);
    }

    if (this.hasTrigger('hover')) {
      this.targetElement?.removeEventListener('mouseover', this.handleMouseOver);
      this.targetElement?.removeEventListener('mouseout', this.handleMouseOut);
    }

    if (this.hasTrigger('focus')) {
      this.targetElement?.removeEventListener('focusin', this.handleFocusIn, true);
      this.targetElement?.removeEventListener('focusout', this.handleFocusOut, true);
    }
  }

  hasTrigger(trigger: string) {
    return this.options.trigger.split(' ').includes(trigger);
  }

  handleClick() {
    this.host.toggle();
  }

  handleMouseOver() {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = window.setTimeout(() => this.host.show(), this.options.showDelay);
  }

  handleMouseOut() {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = window.setTimeout(() => this.host.hide(), this.options.hideDelay);
  }

  handleFocusIn() {
    this.host.show();
  }

  handleFocusOut() {
    this.host.hide();
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !this.floatingElement.contains(target) &&
      !this.targetElement.contains(target) &&
      event.button === 0
    ) {
      this.host.hide();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.host.open && event.key === 'Escape') {
      event.stopPropagation();
      this.host.hide();
    }
  }
}
