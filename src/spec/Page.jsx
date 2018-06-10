import ReactDOM from 'react-dom';

export default class Page {
  constructor(app) {
    this._app = app;
    this._el = null;

    this.render = this.render.bind(this);
    this.cleanup = this.cleanup.bind(this);
  }

  get isRendered() {
    return this._el !== null;
  }

  get el() {
    return this._el;
  }

  render() {
    if(this.isRendered) {
      throw new Error("Tried to render the app twice! (fyi: you can only render in a beforeEach)");
    }
    this._el = document.createElement('div');
    ReactDOM.render(this._app, this._el);
  }

  cleanup() {
    if(this.isRendered) {
      ReactDOM.unmountComponentAtNode(this._el);
      this._el = null;
    }
  }
}
