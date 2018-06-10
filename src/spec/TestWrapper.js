export default function testWrapper(page) {
  global._it = global.it;
  global.it = wrappedIt;

  afterEach(function() {
    page.cleanup();
  });
}

function wrappedIt(desc, func) {
  return global._it(desc, () => {
    if(!page.isRendered) {
      page.render()
    }
    return func();
  });
}
