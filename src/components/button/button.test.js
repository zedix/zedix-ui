import { html } from 'lit/static-html.js';
import { fixture, expect, triggerFocusFor, triggerBlurFor } from '@open-wc/testing';
// import Button from './button.component.js';
import './button.js';

describe('<zx-button/>', () => {
  it('should set role="button" on host element', async () => {
    const button = await fixture(html`<zx-button>Save</zx-button>`);
    expect(button.getAttribute('role')).to.equal('button');
  });

  it('should propagate disabled property to native element', async () => {
    const button = await fixture(html`<zx-button>Save</zx-button>`);
    button.disabled = true;
    await button.updateComplete;
    expect(button.focusElement.hasAttribute('disabled')).to.be.true;
  });

  describe('#type', () => {
    it('has a default type "button"', async () => {
      const button = await fixture(html`<zx-button>Save</zx-button>`);
      expect(button.type).to.equal('button');
    });

    it('can change the button type', async () => {
      const button = await fixture(html`<zx-button type="submit">Save</zx-button>`);
      expect(button.type).to.equal('submit');
    });
  });

  describe('focus', () => {
    it('can be focused and blured', async () => {
      const button = await fixture(html`<zx-button>Save</zx-button>`);

      await triggerFocusFor(button);
      expect(document.activeElement === button).to.be.true;

      await triggerBlurFor(button);
      expect(document.activeElement === button).to.be.false;
    });
  });

  /*
  describe('@click', () => {
    it('can handle a click event', async () => {
      const onClickStub = stub();
      const button = await fixture(html`<zx-button>Save</zx-button>`);

      button.addEventListener('click', onClickStub);
      expect(onClickStub).to.have.callCount(1);
    });
  });
  */
});
