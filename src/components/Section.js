export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
    }

    addItem(item) {
        this._container.prepend(item);
    }
}


