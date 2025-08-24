import type { EmblaCarouselType, EmblaOptionsType /*, EmblaEventType*/ } from 'embla-carousel';
import type { AxisOptionType } from 'embla-carousel/components/Axis.js';
import type { SlidesToScrollOptionType } from 'embla-carousel/components/SlidesToScroll.js';
import type { ScrollContainOptionType } from 'embla-carousel/components/ScrollContain.js';
import type { AlignmentOptionType } from 'embla-carousel/components/Alignment.js';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { html, LitElement, type PropertyValues, type CSSResultGroup } from 'lit';
import { property, query, queryAll } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import styles from './carousel.styles.js';
import componentStyles from '../../styles/component.styles.js';
import { dispatchEvent } from '../../internals/event.js';

/**
 * Carousel custom element based on Embla Carousel.
 *
 * https://github.com/davidjerleke/embla-carousel/pull/222
 *
 * @csspart button-prev - The previous slide navigation button.
 * @csspart button-next - The next slide navigation button.
 * @csspart button-dot - Any dot navigation button.
 * @csspart footer - The footer of the carousel.
 *
 * @cssproperty --button-background-color - The background color of next/previous buttons.
 * @customElement cb-carousel
 *
 * Resources:
 * - https://flackr.github.io/carousel/
 * - https://open-ui.org/components/carousel.research/
 */
export default class Carousel extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  embla!: EmblaCarouselType;

  /**
   * Choose a delay between transitions in milliseconds (default: 4000).
   */
  @property({ type: Number, reflect: true })
  autoplay = 0;

  /**
   * Configure autoplay options.
   *
   * @link https://www.embla-carousel.com/plugins/autoplay/#options
   */
  @property({ type: Object, attribute: 'autoplay-options' })
  autoplayOptions: any; // = { stopOnInteraction: false };

  /**
   * Choose scroll axis between x and y.
   *
   * @link https://www.embla-carousel.com/api/options/#axis
   */
  @property()
  axis: AxisOptionType = 'x';

  /**
   * Align the slides relative to the carousel viewport. Use one of the predefined alignments start, center or end.
   * Alternatively, provide your own callback to fully customize the alignment.
   *
   * - `start`: means that slides should be aligned to the left edge of the carousel viewport
   *
   * @link https://www.embla-carousel.com/api/options/#align
   */
  @property()
  align: AlignmentOptionType = 'start';

  /*
   * An object with options that will be applied for a given breakpoint by overriding the options at the root level.
   */
  @property({ type: Object, reflect: true })
  breakpoints: any = {
    // '(min-width: 768px)': { active: false }
  };

  /**
   * Enables infinite looping. Embla will apply translateX or translateY to the slides that need
   * to change position in order to create the loop effect.
   *
   * @link https://www.embla-carousel.com/api/options/#loop
   */
  @property({ type: Boolean })
  loop = false;

  /**
   * Enables momentum scrolling. The duration of the continued scrolling is proportional to how vigorous the drag gesture is.
   *
   * @link https://www.embla-carousel.com/api/options/#dragfree
   */
  @property({ type: Boolean, attribute: 'drag-free' })
  dragFree = false; // Default: false

  /**
   * Set scroll duration when triggered by any of the API methods. Higher numbers enables slower scrolling.
   * Drag interactions are not affected because duration is then determined by the drag force.
   *
   * @link https://www.embla-carousel.com/api/options/#duration
   */
  @property({ type: Number })
  duration = 20;

  /**
   * Allow the carousel to skip scroll snaps if it's dragged vigorously.
   * Note that this option will be ignored if the dragFree option is set to true.
   *
   * @link https://www.embla-carousel.com/api/options/#skipsnaps
   */
  @property({ type: Boolean, attribute: 'skip-snaps' })
  skipSnaps = false; // Default: false

  /**
   * Group slides together. Drag interactions, dot navigation, and previous/next
   * buttons are mapped to group slides into the given number, which has to be an integer.
   * Set it to auto if you want Embla to group slides automatically.
   *
   * @link  https://www.embla-carousel.com/api/options/#slidestoscroll
   */
  @property({ attribute: 'slides-to-scroll' })
  slidesToScroll: SlidesToScrollOptionType = 1; // Default: 1

  /**
   * Set the initial scroll snap to the given number. First snap index starts at 0.
   * Please note that this is not necessarily equal to the number of slides when used together
   * with the slidesToScroll option.
   *
   * @link https://www.embla-carousel.com/api/options/#startindex
   */
  @property({ type: Number, attribute: 'start-index' })
  startIndex = 0;

  /**
   * Clear leading and trailing empty space that causes excessive scrolling.
   * Use trimSnaps to only use snap points that trigger scrolling or keepSnaps to keep them.
   *
   * @link https://www.embla-carousel.com/api/options/#containscroll
   */
  @property({ attribute: 'contain-scroll' })
  containScroll: ScrollContainOptionType = 'trimSnaps'; // Default: 'trimSnaps'

  @property({ type: Boolean })
  single = false;

  @property({ type: Boolean, attribute: 'with-dots' })
  withDots = false;

  @property({ type: Boolean, attribute: 'with-scrollbar' })
  withScrollbar = false;

  @property({ type: Boolean, attribute: 'with-fullscreen' })
  withFullscreen = false;

  @property({ type: String, attribute: 'dot-appearance' })
  dotAppearance: 'circle' | 'bar' = 'bar';

  @property({ type: String, attribute: 'scroll-buttons-position' })
  scrollButtonsPosition: 'inside' | 'outside' = 'inside';

  @query('.scroll-buttons') scrollButtons!: HTMLElement;
  @query('.button-previous') previousBtn!: HTMLButtonElement;
  @query('.button-next') nextBtn!: HTMLButtonElement;
  @query('.container') container!: HTMLSlotElement;
  @queryAll('.dot') dotNodes!: HTMLButtonElement[];

  constructor() {
    super();
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onInit = this.onInit.bind(this);
    this.onReInit = this.onReInit.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSlidesInView = this.onSlidesInView.bind(this);
    this.detachEventListeners = this.detachEventListeners.bind(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.createEmbla();
  }

  disconnectedCallback() {
    if (this.embla) {
      this.embla.destroy();
    }
  }

  protected firstUpdated(): void {
    this.attachEventListeners();
  }

  protected createEmbla() {
    this.embla = EmblaCarousel(this, this.options());
    this.embla
      .on('init', this.onInit)
      .on('reInit', this.onReInit)
      .on('resize', this.onResize)
      .on('slidesInView', this.onSlidesInView)
      .on('select', this.onSelect)
      .on('destroy', this.detachEventListeners);
  }

  protected onSlidesInView() {
    dispatchEvent(this, 'slides-in-view', {
      indexes: this.embla.slidesInView(),
    });
  }

  protected onInit() {
    this.updateNavigation();
  }

  /**
   * Runs when the reInit method is called. When the window is resized,
   * Embla Carousel automatically calls the reInit method which will also fire this event.
   */
  protected onReInit() {
    this.updateNavigation();
    this.requestUpdate();
  }

  /**
   * Runs when the selected scroll snap changes. The select event is triggered
   * by drag interactions or the scrollNext, scrollPrev or scrollTo methods.
   */
  protected onSelect() {
    dispatchEvent(this, 'select', {
      index: this.embla.selectedScrollSnap(),
    });

    this.updateNavigation();
  }

  protected onResize() {
    this.requestUpdate();
  }

  protected attachEventListeners() {
    this.previousBtn.addEventListener('click', this.previous);
    this.nextBtn.addEventListener('click', this.next);
  }

  protected detachEventListeners() {
    this.previousBtn.removeEventListener('click', this.previous);
    this.nextBtn.removeEventListener('click', this.next);
  }

  protected updateNavigation() {
    const canScroll = this.embla.canScrollPrev() || this.embla.canScrollNext();

    // Set disabled state for next/previous buttons
    this.previousBtn.toggleAttribute('disabled', !this.embla.canScrollPrev());
    this.nextBtn.toggleAttribute('disabled', !this.embla.canScrollNext());
    this.scrollButtons.classList.toggle('scroll-buttons--disabled', !canScroll);

    // Set active state for dots
    if (this.withDots) {
      const previous = this.embla.previousScrollSnap();
      const selected = this.embla.selectedScrollSnap();
      this.dotNodes[previous]?.classList.remove('dot--selected');
      this.dotNodes[previous]?.removeAttribute('aria-selected');
      this.dotNodes[selected]?.classList.add('dot--selected');
      this.dotNodes[selected]?.setAttribute('aria-selected', 'true');
    }
  }

  async updated(changedProperties: PropertyValues<this>) {
    // Note: changedProperties gives the property values from the previous update.
    // At the time of the first update, previous values are always undefined.

    // Fix React 18 where `autoplay` has no value at `connectedCallback` (props instead of attributes)
    if (changedProperties.has('autoplay') && this.autoplay) {
      this.initAutoplay();
    }
  }

  private initAutoplay() {
    // reInit will hard reset the carousel after it has been initialized (options + plugins)
    this.embla.reInit(
      // Passed options will be merged with current options
      this.options(),
      // /!\ but passed plugins will replace current plugins.
      [Autoplay(this.autoplayOptions || { delay: this.autoplay })],
    );
  }

  private handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    if (slot.assignedElements().length > 0) {
      this.embla.reInit(this.options());
    }
  }

  private handleDotClick(event: Event) {
    const button = event.currentTarget as HTMLButtonElement;
    this.goToSlide(Number(button.dataset.index));
  }

  options(): EmblaOptionsType {
    //const container = this.shadowRoot!.querySelector('zx-carousel-container');
    const container = this.shadowRoot!.querySelector('slot')!;

    if (!container) {
      return {
        container: this,
        slides: [],
      };
    }

    return {
      // https://www.embla-carousel.com/api/options/#container
      // Enables choosing a custom container element which holds the slides
      container: container,
      // https://www.embla-carousel.com/api/options/#slides
      // Enables using custom slide elements.
      // Note: Even though it's possible to provide custom slide elements, they still have to be direct descendants of the carousel container.
      slides: container.assignedElements() as HTMLElement[],
      containScroll: this.containScroll,
      breakpoints: this.breakpoints,
      axis: this.axis,
      align: this.align,
      dragFree: this.dragFree,
      duration: this.duration,
      loop: this.loop,
      slidesToScroll: this.slidesToScroll,
      skipSnaps: this.skipSnaps,
      startIndex: this.startIndex,
    };
  }

  next() {
    this.embla.scrollNext();
  }

  previous() {
    this.embla.scrollPrev();
  }

  goToSlide(index: number, jump?: boolean) {
    this.embla.scrollTo(index, jump);
  }

  slideNodes() {
    this.embla.slideNodes();
  }

  slidesInView() {
    this.embla.slidesInView();
  }

  isActive() {
    return this.embla?.internalEngine().options.active;
  }

  renderFullscreenButton() {
    return html`<button
      type="button"
      part="button button-fullscreen"
      class="button button-fullscreen"
      @click=${dispatchEvent(this, 'fullscreen')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        part="button-icon button-icon-fullscreen"
      >
        <path
          d="M295 183c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135 0 86.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144c0-13.3-10.7-24-24-24L344 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l86.1 0-135 135zM217 329c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L48 430.1 48 344c0-13.3-10.7-24-24-24S0 330.7 0 344L0 488c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-86.1 0 135-135z"
        />
      </svg>
    </button>`;
  }

  renderNextPreviousButtons() {
    return html`<div
      class="scroll-buttons scroll-buttons--${this.scrollButtonsPosition}"
      part="scroll-buttons"
    >
      <button part="button button-previous" class="button button-previous" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          part="button-icon button-icon-previous"
        >
          <path
            d="M7 239c-9.4 9.4-9.4 24.6 0 33.9L175 441c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L81.9 280 488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24L81.9 232 209 105c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 239z"
          />
        </svg>
      </button>

      <button part="button button-next" class="button button-next" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          part="button-icon button-icon-next"
        >
          <path
            d="M505 273c9.4-9.4 9.4-24.6 0-33.9L337 71c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l127 127-406.1 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l406.1 0-127 127c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L505 273z"
          />
        </svg>
      </button>
    </div>`;
  }

  render() {
    return html`
      <div class="wrapper ${this.isActive() ? '' : 'inactive'}">
        <div part="viewport" class="viewport">
          <slot part="container" class="container" @slotchange=${this.handleSlotChange}></slot>
        </div>
        ${this.withFullscreen ? this.renderFullscreenButton() : ''}
        ${this.renderNextPreviousButtons()}
        ${this.withDots
          ? html`<div class="dots" part="dots" role="tablist">
              ${map(this.embla.scrollSnapList(), (_, index) => {
                return html`<button
                  part="button-dot"
                  type="button"
                  role="tab"
                  class="dot dot--${this.dotAppearance}"
                  aria-label="Go to slide ${index + 1}"
                  data-index="${index}"
                  @click=${this.handleDotClick}
                >
                  <i></i>
                </button>`;
              })}
            </div> `
          : ''}
      </div>
    `;
  }
}
