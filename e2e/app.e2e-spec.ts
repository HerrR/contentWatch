import { ContentWatchPage } from './app.po';

describe('content-watch App', function() {
  let page: ContentWatchPage;

  beforeEach(() => {
    page = new ContentWatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
