import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import type { AxisOptionType } from 'embla-carousel/components/Axis.js';
import type { SlidesToScrollOptionType } from 'embla-carousel/components/SlidesToScroll.js';
import type { ScrollContainOptionType } from 'embla-carousel/components/ScrollContain.js';
import type { AlignmentOptionType } from 'embla-carousel/components/Alignment.js';
import EmblaCarousel from 'embla-carousel';
import { html, LitElement, CSSResultGroup } from 'lit';
import { property, query } from 'lit/decorators.js';
import styles from './carousel.styles.js';
import componentStyles from '../../styles/component.styles.js';

/**
 * Carousel custom element based on Embla Carousel.
 *
 * https://github.com/davidjerleke/embla-carousel/pull/222
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
  @property({ type: Boolean })
  dragFree = false;

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
  @property({ type: Boolean })
  skipSnaps = true;

  /**
   * Group slides together. Drag interactions, dot navigation, and previous/next
   * buttons are mapped to group slides into the given number, which has to be an integer.
   * Set it to auto if you want Embla to group slides automatically.
   *
   * @link  https://www.embla-carousel.com/api/options/#slidestoscroll
   */
  @property()
  slidesToScroll: SlidesToScrollOptionType = 1;

  /**
   * Set the initial scroll snap to the given number. First snap index starts at 0.
   * Please note that this is not necessarily equal to the number of slides when used together
   * with the slidesToScroll option.
   *
   * @link https://www.embla-carousel.com/api/options/#startindex
   */
  @property({ type: Number })
  startIndex = 0;

  /**
   * Clear leading and trailing empty space that causes excessive scrolling.
   * Use trimSnaps to only use snap points that trigger scrolling or keepSnaps to keep them.
   *
   * @link https://www.embla-carousel.com/api/options/#containscroll
   */
  @property()
  containScroll: ScrollContainOptionType = 'trimSnaps';

  @query('.button-prev') previousBtn!: HTMLButtonElement;
  @query('.button-next') nextBtn!: HTMLButtonElement;
  @query('.viewport') viewport!: HTMLElement;
  @query('.container') container!: HTMLElement;

  constructor() {
    super();
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.updateNavigationState = this.updateNavigationState.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.embla = EmblaCarousel(this, this.options());
  }

  disconnectedCallback() {
    if (this.embla) {
      this.embla.destroy();
    }
  }

  protected firstUpdated(): void {
    this.embla
      .on('select', this.updateNavigationState)
      .on('init', this.updateNavigationState)
      .on('reInit', this.updateNavigationState)
      .on('destroy', this.detachEventListeners);

    this.attachEventListeners();
  }

  protected attachEventListeners() {
    this.previousBtn.addEventListener('click', this.previous);
    this.nextBtn.addEventListener('click', this.next);
  }

  protected detachEventListeners() {
    this.previousBtn.removeEventListener('click', this.previous);
    this.nextBtn.removeEventListener('click', this.next);
  }

  protected updateNavigationState() {
    this.previousBtn.toggleAttribute('disabled', !this.embla.canScrollPrev());
    this.nextBtn.toggleAttribute('disabled', !this.embla.canScrollNext());
  }

  private handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    if (slot.assignedElements().length > 0) {
      this.embla.reInit(this.options(slot.assignedElements() as HTMLElement[]));
    }
  }

  options(slides: HTMLElement[] = []): EmblaOptionsType {
    return {
      active: true,
      // https://www.embla-carousel.com/api/options/#slides
      // Enables using custom slide elements.
      // Note: Even though it's possible to provide custom slide elements, they still have to be direct descendants of the carousel container.
      slides,
      // https://www.embla-carousel.com/api/options/#container
      // Enables choosing a custom container element which holds the slides
      container: this.container,
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
    return this.embla.internalEngine().options.active;
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
          <div part="container" class="container">
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>
        ${this.renderNextPrevButtons()}
      </div>
      <div class="dots"></div>
    `;
  }
}
