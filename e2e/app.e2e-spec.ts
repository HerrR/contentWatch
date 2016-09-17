import { ContentWatch2Page } from './app.po';

describe('content-watch2 App', function() {
  let page: ContentWatch2Page;

  beforeEach(() => {
    page = new ContentWatch2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
