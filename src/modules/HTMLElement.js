export default class HTMLElement
{
    constructor(elementType, elementId, clickCallback = false, attachToDocumentBody = false) {
        // object properties
        this._elementType = elementType;
        this._elementId = elementId;
        this._clickCallback = clickCallback;
        this._attachToDocumentBody = attachToDocumentBody;
    }

    init({window, document}) {
        // injected dependencies
        this._window = window;
        this._document = document;
    }


    create() {
        let element = this.get();

        if (!element) {
            // create element
            element = this._document.createElement(this._elementType);
            element.id = this._elementId;

            if (this._clickCallback) {
                // attach behaviour
                element.onclick = this.onClick;
            }

            if (this._attachToDocumentBody) {
                // add to document body
                this._document.body.appendChild(element);
            }
        }

        return element;
    }

    get() {
        return this._document.getElementById(this._elementId);
    }

    show() {
        let element = this.create();
        element.style.display = 'block';

        return element;
    }

    hide() {
        let element = this.get();

        if (element) {
            element.style.display = 'none';
        }

        return element;
    }

    destroy() {
        let element = this.get();

        if (element) {
            element.parentNode.removeChild(element);
        }
    }

    onClick() {
        // this should be overwritten with custom behaviour
    }
}