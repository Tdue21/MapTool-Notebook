/**
 * EventManager class
 * The event manager is used for ease of managing events, enabling the model, 
 * view and controller to "talk" together, by adding listeners and triggering 
 * them.
 */
class EventManager {
    /**
     * 
     */
    _listeners = [];
    

    /**
     * 
     * @param {*} listener 
     */
    addListener(listener) {
        this._listeners.push(listener);
    }


    /**
     * 
     * @param {*} params 
     */
    trigger(params) {
        this._listeners.forEach(listener => {
            return listener(params);
        });
    }
}


class ViewHelpers {

    /**
     * 
     * @param {string} selector 
     * @param {string} eventName 
     * @param {EventManager} eventManager 
     * @returns {HTMLElement} The element
     */
    setupEventListener(selector, eventName, eventManager) {
        const element = this.getElement(selector);
        element.addEventListener(eventName, () => {
            eventManager.trigger();
        });
        return element;
    }


    /**
     * Create a HTMLElement of the supplied type. An optional options object,
     * with properties matching those of the element in question can be
     * supplied as well, with values for said properties.
     * @param {string} type - HTMLElement type to create
     * @param {JSON} options - Object containing all properties to set.
     * @returns {HTMLElement} - The newly created element.
     */
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

    /**
     * Returns the first element from the DOM, which matches the selector.
     * @param {string} selector - Standard CSS selector.
     * @returns {HTMLElement} The first element that matches the selector, or null.
     */
    getElement(selector) {
        const element = document.querySelector(selector);
        // @ts-ignore
        return element;
    }


    /**
     * Returns all elements from the DOM, that match the selector.
     * @param {string} selector - Standard CSS selector.
     * @returns {NodeList} All elements that match the selector or an empty list.
     */
    getElements(selector) {
        const elements = document.querySelectorAll(selector);
        return elements;
    }
}
