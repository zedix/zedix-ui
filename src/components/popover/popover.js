import { LitElement } from 'lit-element';
import tippy from 'tippy.js';

export class Popover extends LitElement {
  static get properties() {
    return {
      /*
       * The id of the element that the tooltip is anchored to.
       */
      for: {
        type: String,
        reflect: true,
      },

      /**
       * The type of transition animation.
       *
       * Default value: `fade`
       */
      animation: {
        type: String,
      },

      arrow: {
        type: Boolean,
      },

      distance: {
        type: Number,
      },

      showDelay: {
        type: Number,
      },

      hideDelay: {
        type: Number,
      },

      maxWidth: {
        type: String,
      },

      /**
       * The preferred placement.
       *
       * // default
       * placement: 'top'
       *
       * // full list:
       * placement: 'top-start'
       * placement: 'top-end'
       * placement: 'right'
       * placement: 'right-start'
       * placement: 'right-end'
       * placement: 'bottom'
       * placement: 'bottom-start'
       * placement: 'bottom-end'
       * placement: 'left'
       * placement: 'left-start'
       * placement: 'left-end'
       *
       * // choose the side with most space
       * placement: 'auto'
       * placement: 'auto-start'
       * placement: 'auto-end'
       */
      placement: {
        type: String,
        reflect: true,
      },

      /**
       * The css theme string to be added.
       * Allow to style `tippy-box[data-theme~='my-theme']`.
       *
       * Default value: `light-border`
       */
      theme: {
        type: String,
      },

      /**
       * Popover's type for styling purpose.
       * Allow to style `tippy-box[data-type~='filter']`.
       */
      type: {
        type: String,
      },

      trigger: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    // Always call super() first
    super();

    // Initialize properties
    this.for = '';
    this.arrow = false;
    this.animation = 'fade';
    this.distance = 10;
    this.showDelay = 0;
    this.hideDelay = 150;
    this.maxWidth = 350;
    this.placement = 'bottom-start';
    this.theme = 'light-border';
    this.type = '';
    this.trigger = 'click'; // hover (mouseenter), click

    this._configure = this._configure.bind(this);
    this._fireEvent = this._fireEvent.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(this._configure, 0);
  }

  _configure() {
    // By default, use the first child element (preserving bound events)
    let content = this.firstElementChild; // Ignore nodes of type Node.TEXT_NODE

    // If the first child element is a <template> element, use its content
    // It may be useful when using hotwire/turbo to preserve the template before caching the page.
    if (this.firstElementChild.content) {
      content = document.importNode(this.firstElementChild.content, true);
    }

    this.tippy = tippy(document.querySelector(`#${this.for}`), {
      ...this.options(),
      // Set content from HTMLElement instead of string to not loose DOM events
      // See https://github.com/atomiks/tippyjs/blob/master/src/template.ts#L14
      content,
      allowHTML: true,
      popperOptions: {
        modifiers: [
          {
            name: 'minWidth',
            enabled: true,
            fn: ({ state }) => {
              // See https://github.com/popperjs/popper-core/issues/794#issuecomment-589253942
              // eslint-disable-next-line no-param-reassign
              state.styles.popper.minWidth = `${state.rects.reference.width}px`;
            },
            phase: 'beforeWrite',
            requires: ['computeStyles'],
          },
          // https://popper.js.org/docs/v2/modifiers/prevent-overflow/
          // Removes the virtual padding to the boundary
          {
            name: 'preventOverflow',
            options: {
              padding: 0,
            },
          },
        ],
      },
      onCreate: ({ reference, popper }) => {
        reference.setAttribute('aria-haspopup', 'true');
        if (this.type) {
          // eslint-disable-next-line no-param-reassign
          popper.firstElementChild.dataset.type = this.type;
        }
      },
      onShow: ({ reference }) => {
        reference.setAttribute('aria-expanded', 'true');
        this._fireEvent('show');
      },
      onShown: () => {
        this._fireEvent('shown');
      },
      onHide({ reference }) {
        reference.setAttribute('aria-expanded', 'false');
      },
      onHidden: () => {
        this._fireEvent('hidden');
      },
      theme: this.theme,
      appendTo: document.body,
    });
  }

  options() {
    return {
      animation: this.animation,
      arrow: this.arrow,
      delay: [this.showDelay, this.hideDelay],
      interactive: true,
      maxWidth: this.maxWidth,
      offset: [0, this.distance],
      placement: this.placement,
      trigger: this.trigger.replace('hover', 'mouseenter'),
    };
  }

  updated() {
    if (this.tippy) {
      this.tippy.setProps(this.options());
    }
  }

  setContent(content) {
    this.tippy.setContent(content);
  }

  show() {
    this.tippy.show();
  }

  hide() {
    this.tippy.hide();
  }

  _fireEvent(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          reference: this.tippy.reference,
          popper: this.tippy.popper,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

window.customElements.define('zx-popover', Popover);
