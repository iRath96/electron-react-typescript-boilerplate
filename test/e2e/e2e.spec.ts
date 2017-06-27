import * as electronPath from 'electron';
import * as path from 'path';

const { Application } = require('spectron');

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  let app: any;
  beforeAll(async () => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', '..', 'app')],
    });
    return app.start();
  });

  afterAll(() => {
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
    expect(title).toBe('Hello Electron React!');
  });

  it('should not have any logs in console of main window', async () => {
    const { client } = app;
    const logs = await client.getRenderProcessLogs();
    // Print renderer process logs
    logs.forEach((log: any) => {
      console.log(log.message);
      console.log(log.source);
      console.log(log.level);
    });
    expect(logs).toHaveLength(0);
  });

  it('should navigate to Counter by "to Counter" link', async () => {
    const { client } = app;

    await client.click('[data-tid="container"] > a');
    await delay(100);
    expect(await findCounter().getText()).toBe('0');
  });

  it('should display updated count after increment button click', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[0]);  // +
    expect(await findCounter().getText()).toBe('1');
  });

  it('should display updated count after descrement button click', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[1]);  // -
    expect(await findCounter().getText()).toBe('0');
  });

  it('shouldn\'t change if even and if odd button clicked', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[2]);  // odd
    expect(await findCounter().getText()).toBe('0');
  });

  it('should change if odd and if odd button clicked', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[0]);  // +
    await client.elementIdClick(buttons[2]);  // odd
    expect(await findCounter().getText()).toBe('2');
  });

  it('should change if async button clicked and a second later', async () => {
    const { client } = app;

    const buttons = await findButtons();
    await client.elementIdClick(buttons[3]);  // async
    expect(await findCounter().getText()).toBe('2');
    await delay(1000);
    expect(await findCounter().getText()).toBe('3');
  });

  it('should navigate to home using back button', async () => {
    const { client } = app;
    await client.element(
      '[data-tid="backButton"] > a'
    ).click();
    await delay(100);

    expect(
      await client.isExisting('[data-tid="container"]')
    ).toBe(true);
  });
});
