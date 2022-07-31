const newLine = "\r\n";
const namespace = "net.dovesoft.notebook";
let debugOn = false;

/**
 * 
 * @param {string} message 
 * @param {Error} error 
 */
const logError = (message, error) => console.log(`${message}: ${error}${newLine}${error.stack}`);

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
    console.log(`Evaluate macro: '${args}`);

    let uri = "macro:EvaluateMacro@lib:net.dovesoft.notebook";
    let promise = fetch(uri, { method: "POST", body: args });
    if (callBack) {
        promise.then(
            r => {
                r.text().then(
                    d => callBack(d),
                    e1 => logError("eval 2", e1)
                );
            },
            e2 => logError("eval 1", e2)
        );
    }
}

/**
 * Reads the "DebugOn" libProp from the library and set the "debugOn" global variable.
 */
try {
    evaluateMacro(`[r:js.getDebug()]`, result => {
        debugOn = result === 1;
    });
} catch (error) {
    logError("Failed to read doDebug: " + error);
}