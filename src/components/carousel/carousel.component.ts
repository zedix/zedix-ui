import type { EmblaCarouselType } from 'embla-carousel';
import EmblaCarousel from 'embla-carousel';
import { html, LitElement, CSSResultGroup } from 'lit';
import { property, query } from 'lit/decorators.js';
import styles from './carousel.styles.js';
import componentStyles from '../../styles/component.styles.js';

/**
 * https://github.com/davidjerleke/embla-carousel/pull/222
 */
export default class Carousel extends LitElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  embla!: EmblaCarouselType;

  @query('.embla__button--prev') previousBtn!: HTMLElement;
  @query('.embla__button--next') nextBtn!: HTMLElement;
  @query('.embla__viewport') viewport!: HTMLElement;

  /**
   * Enables momentum scrolling. The duration of the continued scrolling is proportional to how vigorous the drag gesture is.
   */
  @property({ type: Boolean, reflect: true })
  dragFree = false;

  constructor() {
    super();
    this.scrollPrev = this.scrollPrev.bind(this);
    this.scrollNext = this.scrollNext.bind(this);
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
      .on('reInit', this.updateNavigationState);

    this.previousBtn.addEventListener('click', this.scrollPrev);
    this.nextBtn.addEventListener('click', this.scrollNext);
  }

  private handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    if (slot.assignedElements().length > 0) {
      this.embla.reInit(this.options(slot.assignedElements() as HTMLElement[]));
    }
  }

  options(slides: HTMLElement[] = []) {
    return {
      // https://www.embla-carousel.com/api/options/#container
      // Enables choosing a custom container element which holds the slides
      container: this.renderRoot.querySelector('.embla__container') as HTMLElement,
      // https://www.embla-carousel.com/api/options/#slides
      // Enables using custom slide elements.
      // Note: Even though it's possible to provide custom slide elements, they still have to be direct descendants of the carousel container.
      slides,
      // https://www.embla-carousel.com/api/options/#dragfree
      // Enables momentum scrolling. The duration of the continued scrolling is proportional to how vigorous the drag gesture is.
      dragFree: this.dragFree,
    };
  }

  scrollNext() {
    this.embla.scrollNext();
  }

  scrollPrev() {
    this.embla.scrollPrev();
  }

  goToSlide(index: number, jump?: boolean) {
    this.embla.scrollTo(index, jump);
  }

  updateNavigationState() {
    this.previousBtn.toggleAttribute('disabled', !this.embla.canScrollPrev());
    this.nextBtn.toggleAttribute('disabled', !this.embla.canScrollNext());
  }

  renderNavigation() {
    return html`<div class="embla__controls">
      <div class="embla__buttons">
        <button part="button button-prev" class="embla__button embla__button--prev" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            part="svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            ></path>
          </svg>
        </button>

        <button part="button button-next" class="embla__button embla__button--next" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            part="svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            ></path>
          </svg>
        </button>
      </div>
    </div>`;
  }

  render() {
    return html`
      <div class="embla__viewport">
        <div class="embla__container">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
        ${this.renderNavigation()}
      </div>
    `;
  }
}
