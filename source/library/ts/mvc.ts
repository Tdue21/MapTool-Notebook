/**
 * 
 */
abstract class AbstractModel {
    connected: (value: unknown) => void;
    connectFailed: (reason?: any) => void;

    /**
     * 
     */
    constructor() {
        // @ts-ignore
        MapTool.getUserData().then(
            (d: any) => this.initializeData(d),
            (e: Error) => this.handleInitializationError(e)
        );
    }

    public onConnect(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connected = resolve;
            this.connectFailed = reject;
        });
    }

    /**
     * 
     * @param d 
     */
    protected abstract initializeData(d: any): void;

    /**
     * 
     * @param e 
     */
    protected abstract handleInitializationError(e: Error): void;
}

/**
 * 
 */
abstract class AbstractView {
    /**
     * Create a HTMLElement of the supplied type. An optional options object,
     * with properties matching those of the element in question can be
     * supplied as well, with values for said properties.
     * @param {string} type - HTMLElement type to create
     * @param {JSON} options - Object containing all properties to set.
     * @returns {HTMLElement} - The newly created element.
     */
    protected createElement(type: string, options: JSON): HTMLElement {
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
    protected getElement(selector: string): HTMLElement {
        const element = document.querySelector(selector);
        // @ts-ignore
        return element;
    }


    /**
     * Returns all elements from the DOM, that match the selector.
     * @param {string} selector - Standard CSS selector.
     * @returns {NodeList} All elements that match the selector or an empty list.
     */
    protected getElements(selector: string): NodeList {
        const elements = document.querySelectorAll(selector);
        return elements;
    }
}

abstract class AbstractController {
    model: AbstractModel;
    view: AbstractView;

    /**
     * 
     * @param model 
     * @param view 
     */
    constructor(model : AbstractModel, view : AbstractView){
        this.model = model;
        this.view = view;

        this.model.onConnect().then(
            (m) => this.initializeController(m),
            (e) => this.handleInitializationError(e)
        );
    }

    /**
     * 
     * @param d 
     */
    protected abstract initializeController(model: AbstractModel): void;


    /**
     * 
     * @param e 
     */
    protected abstract handleInitializationError(error: Error): void;

}