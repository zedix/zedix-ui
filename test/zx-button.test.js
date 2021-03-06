// import { stub } from 'sinon';
import { fixture, expect, triggerFocusFor, triggerBlurFor } from '@open-wc/testing';

import '../index.js';

// https://dev.to/open-wc/testing-workflow-for-web-components-g73

describe('<zx-button/>', () => {
  // let button;
  // beforeEach(async () => {
  // button = await fixture(`<zx-button>Save</zx-button>`);
  // });

  it('should set role="button" on host element', async () => {
    const button = await fixture(`<zx-button>Save</zx-button>`);
    expect(button.getAttribute('role')).to.equal('button');
  });

  it('should propagate disabled property to native element', async () => {
    const button = await fixture(`<zx-button>Save</zx-button>`);
    button.disabled = true;
    await button.updateComplete;
    expect(button.focusElement.hasAttribute('disabled')).to.be.true;
  });

  describe('#type', () => {
    it('has a default type "button"', async () => {
      const button = await fixture(`<zx-button>Save</zx-button>`);
      expect(button.type).to.equal('button');
    });

    it('can change the button type', async () => {
      const button = await fixture(`<zx-button type="submit">Save</zx-button>`);
      expect(button.type).to.equal('submit');
    });
  });

  /*
  describe('@click', () => {
    it('can handle a click event', async () => {
      const onClickStub = stub();
      const button = await fixture(`<zx-button>Save</zx-button>`);

      button.addEventListener('click', onClickStub);
      expect(onClickStub).to.have.callCount(1);
    });
  });
  */

  describe('focus', () => {
    it('can be focused and blured', async () => {
      const button = await fixture(`<zx-button>Save</zx-button>`);

      await triggerFocusFor(button);
      expect(document.activeElement === button).to.be.true;

      await triggerBlurFor(button);
      expect(document.activeElement === button).to.be.false;
    });
  });
});
