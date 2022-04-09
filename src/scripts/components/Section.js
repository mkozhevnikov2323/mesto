export class Section {
  constructor({
    // items,
    renderer
  },
  containerSelector
  ) {
    // this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    [].concat(items).forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
