class EventManager {
    _listeners = [];

    addListener(listener) { this._listeners.push(listener); }

    trigger(params) { this._listeners.forEach(listener => { return listener(params); }); }
}

class ViewHelpers {
    setupEventListener(selector, eventName, eventManager) {
        const element = this.getElement(selector);
        element.addEventListener(eventName, () => {
            eventManager.trigger();
        });
        return element;
    }

     createElement(type, options) {
        let element = document.createElement(type);
        if (options != undefined) {
            let keys = Object.keys(options);
            for (let prop of keys) {
                element[prop] = options[prop];
            }
        }
        return element;
    }

    getElement(selector) { const element = document.querySelector(selector); return element; }

    getElements(selector) { const elements = document.querySelectorAll(selector); return elements; }
}
