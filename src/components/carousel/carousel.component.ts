import type { EmblaCarouselType, EmblaOptionsType /*, EmblaEventType*/ } from 'embla-carousel';
import type { AxisOptionType } from 'embla-carousel/components/Axis.js';
import type { SlidesToScrollOptionType } from 'embla-carousel/components/SlidesToScroll.js';
import type { ScrollContainOptionType } from 'embla-carousel/components/ScrollContain.js';
import type { AlignmentOptionType } from 'embla-carousel/components/Alignment.js';
import EmblaCarousel from 'embla-carousel';
import { html, LitElement, CSSResultGroup } from 'lit';
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
 * Resources:
 * - https://flackr.github.io/carousel/
 * - https://open-ui.org/components/carousel.research/
 */
export default class Carousel extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  embla!: EmblaCarouselType;

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

  @query('.button-prev') previousBtn!: HTMLButtonElement;
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
    // Set disabled state for next/previous buttons
    this.previousBtn.toggleAttribute('disabled', !this.embla.canScrollPrev());
    this.nextBtn.toggleAttribute('disabled', !this.embla.canScrollNext());

    // Set active state for dots
    if (this.withDots) {
      const previous = this.embla.previousScrollSnap();
      const selected = this.embla.selectedScrollSnap();
      this.dotNodes[previous]?.classList.remove('dot--selected');
      this.dotNodes[selected]?.classList.add('dot--selected');
    }
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

  renderNextPrevButtons() {
    return html`<div class="buttons">
      <button part="button button-prev" class="button button-prev" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" part="svg">
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          ></path>
        </svg>
      </button>

      <button part="button button-next" class="button button-next" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" part="svg">
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          ></path>
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
        ${this.renderNextPrevButtons()}
        ${this.withDots
          ? html`<div class="dots">
              ${map(this.embla.scrollSnapList(), (_, index) => {
                return html`<button
                  part="button-dot"
                  type="button"
                  class="dot"
                  aria-label="${index + 1}"
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
