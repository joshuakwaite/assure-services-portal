import { AssurePortalPage } from './app.po';

describe('assure-portal App', () => {
  let page: AssurePortalPage;

  beforeEach(() => {
    page = new AssurePortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
