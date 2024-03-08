import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import type Dialog from './dialog.js';
import '../../../dist/index.js';

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe('<zx-dialog>', () => {
  it('should be visible with the `open` attribute', async () => {
    const el = await fixture<Dialog>(html`
      <zx-dialog open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</zx-dialog>
    `);
    //await elementUpdated(el)
    //await wait(1 * 60 * 1000)
    const nativeDialog = el.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!;
    expect(nativeDialog.open).to.be.true;
    // https://modern-web.dev/guides/test-runner/watch-and-debug/#debug
    //debugger
  });

  it('should not be visible by default', async () => {
    const el = await fixture<Dialog>(html`
      <zx-dialog>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</zx-dialog>
    `);

    const nativeDialog = el.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!;
    expect(nativeDialog.open).to.be.false;
  });

  it('should emit `show` and `after-show` when calling show()', async () => {
    const el = await fixture<Dialog>(html`
      <zx-dialog>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</zx-dialog>
    `);
    const showHandler = sinon.spy();
    const afterShowHandler = sinon.spy();

    el.addEventListener('show', showHandler);
    el.addEventListener('after-show', afterShowHandler);
    await el.show();

    await waitUntil(() => showHandler.calledOnce);
    await waitUntil(() => afterShowHandler.calledOnce);

    expect(showHandler).to.have.been.calledOnce;
    expect(afterShowHandler).to.have.been.calledOnce;
  });

  it('should emit `close` and `after-close` when calling close()', async () => {
    const el = await fixture<Dialog>(html`
      <zx-dialog open>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</zx-dialog>
    `);
    const nativeDialog = el.shadowRoot!.querySelector<HTMLDialogElement>('dialog')!;
    const closeHandler = sinon.spy();
    const afterCloseHandler = sinon.spy();

    el.addEventListener('close', closeHandler);
    el.addEventListener('after-close', afterCloseHandler);
    el.open = false;

    await waitUntil(() => closeHandler.calledOnce);
    await waitUntil(() => afterCloseHandler.calledOnce);

    expect(closeHandler).to.have.been.calledOnce;
    expect(afterCloseHandler).to.have.been.calledOnce;
    expect(nativeDialog.open).to.be.false;
  });
});
