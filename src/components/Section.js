export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element, isReversed = false) {
        isReversed ? this._container.prepend(element) : this._container.append(element);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        })
    }
}