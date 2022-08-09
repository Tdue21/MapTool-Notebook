const namespace = "net.dovesoft.notebook";


/**
 * This is the abstract base for page models.
 */
class AbstractBaseModel {
    _connected;
    _connectFailed;

    /**
     * Must be called immediately after creating the model object. It will 
     * resolve the asynchronous data look up needed for the overlay logic.
     * @returns {Promise} - A Promise object that will be resolved when 
     * the model is finished loading data.
     */
    onConnect() {
        try {
            return new Promise((resolve, reject) => {
                this._connected = resolve;
                this._connectFailed = reject;
            });
        } catch (error) {
            logError("onConnect error", error);
        }
    }
}

class AbstractBaseView {

    /**
     * 
     * @param {string} type - HTMLElement type to create
     * @param {json} options - Object containing all properties to set.
     * @returns {HTMLElement}
     */
    createElement(type, options) {
        let element = document.createElement(type);
        let keys = Object.keys(options);
        for (let prop of keys) {
            element[prop] = options[prop];
        }
        return element;
    }
}

class AbstractBaseController {

    constructor(model, view) {
        try {
            this._model = model;
            this._view = view;

            this._model.onConnect().then(
                (model) => this._onControllerConnected(model),
                (error) => logError("controller.onConnected", error));
        } catch (error) {
            logError("baseCtrl.ctor", error);
        }
    }

    _onControllerConnected(model) {
        throw new Error("Implement _onControllerConnected()");
    }
}

/**
 * 
 * @param {string} message 
 * @param {Error} error 
 */
function logError(message, error = undefined) {
    let output = `<h4>${message}</h4>`;
    
    if(error != undefined) {
        output += `<pre>${error}\n${error.stack}</pre>`;
    }
    console.log(output);
}

/**
 * 
 * @param {string} message 
 * @returns 
 */
const logMessage = (message) => console.log(message);

/**
 * 
 * @param {string} args 
 * @param {function} callBack 
 */
const evaluateMacro = (args, callBack = undefined) => {
    try {
        let uri = "macro:EvaluateMacro@lib:net.dovesoft.notebook";
        let promise = fetch(uri, { method: "POST", body: args });
        if (callBack) {
            promise.then(
                (r) => r.text().then(
                    d => callBack(d),
                    e1 => logError("eval 2", e1)
                ),
                (e2) => logError("eval 1", e2)
            );
        }
    } catch (error) {
        logError("evaluateMacro", error);
    }
}

/**
 * Try..Catch wrapper for simplifying code. 
 * @param {function} action 
 * @param {string} message 
 */
const tryCatch = (action, message = undefined) => {
    try {
        action();
    } catch (error) {
        logError(message ? message : action.name, error);
    }
}