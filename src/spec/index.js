import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

global.page = null;

global.render = () => {
  if(page !== null) {
    throw new Error("Tried to render the app twice! (fyi: you can only render in a beforeEach)");
  }
  page = document.createElement('div');
  ReactDOM.render(<App />, page);
};

global.cleanup = () => {
  if(page !== null) {
    ReactDOM.unmountComponentAtNode(page);
    page = null;
  }
}

const _it = global.it;
global.it = function(desc, func) {
  return _it(desc, () => {
    if(page === null) {
      render()
    }
    return func();
  });
}

afterEach(function() {
  cleanup();
});
