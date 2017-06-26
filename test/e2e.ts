import { expect } from 'chai';
import * as electronPath from 'electron';
import * as path from 'path';

const { Application } = require('spectron');

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  this.timeout(10000);

  let app: any;
  before(async () => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', 'app')],
    });
    return app.start();
  });

  after(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  const findCounter = () => app.client.element('[data-tid="counter"]');

  const findButtons = async () => {
    const { value } = await app.client.elements('[data-tclass="btn"]');
    return value.map((btn: any) => btn.ELEMENT);
  };

  it('should open window', async () => {
    const { client, browserWindow } = app;

    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).to.equal('Hello Electron React!');
  });

  it('should haven\'t any logs in console of main window', async () => {
    const { client } = app;
    const logs = await client.getRenderProcessLogs();
    // Print renderer process logs
    logs.forEach((log: any) => {
      console.log(log.message);
      console.log(log.source);
      console.log(log.level);
    });
    expect(logs.length).to.eq(0);
  });

  it('should to Counter with click "to Counter" link', async () => {
    const { client } = app;

    await client.click('[data-tid="container"] > a');
    expect(await findCounter().getText()).to.equal('0');
  });

  it('should display updated count after increment button click', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[0]);  // +
    expect(await findCounter().getText()).to.equal('1');
  });

  it('should display updated count after descrement button click', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[1]);  // -
    expect(await findCounter().getText()).to.equal('0');
  });

  it('shouldnt change if even and if odd button clicked', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[2]);  // odd
    expect(await findCounter().getText()).to.equal('0');
  });

  it('should change if odd and if odd button clicked', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[0]);  // +
    await client.elementIdClick(buttons[2]);  // odd
    expect(await findCounter().getText()).to.equal('2');
  });

  it('should change if async button clicked and a second later', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[3]);  // async
    expect(await findCounter().getText()).to.equal('2');
    await delay(1000);
    expect(await findCounter().getText()).to.equal('3');
  });

  it('should back to home if back button clicked', async () => {
    const { client } = app;
    await client.element(
      '[data-tid="backButton"] > a'
    ).click();

    expect(
      await client.isExisting('[data-tid="container"]')
    ).to.be.true;
  });
});
