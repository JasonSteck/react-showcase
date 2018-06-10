import React from 'react';
import Page from './Page.jsx'
import App from '../App';

global.page = new Page(<App />);

const _it = global.it;
global.it = function(desc, func) {
  return _it(desc, () => {
    if(!page.isRendered) {
      page.render()
    }
    return func();
  });
}

afterEach(function() {
  page.cleanup();
});
