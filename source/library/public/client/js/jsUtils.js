const newLine = "\r\n";
let debugOn = false;

/**
 * 
 * @param {string} message 
 * @param {Error} error 
 * @returns 
 */
const logMessage = (message, error) => console.log(`${message}: ${error}${newLine}${error.stack}`);

/**
 * 
 * @param {string} macroName 
 * @param {string} args 
 * @returns {Promise}
 */
const executeMacro = (macroName, args = null) => {
    if (debugOn) {
        console.log(`Execute macro: '${macroName}'${args != null ? ` with args: ${args}.` : "."}`);
    }

    let uri = "macro:helpers/" + macroName + "@lib:net.dovesoft.notebook";
    let promise = fetch(uri, { method: "POST", body: args });
    return promise;
}

/**
 * 
 * @param {string} args 
 * @param {function} callBack 
 */
const evaluateMacro = (args, callBack = undefined) => {
    if (debugOn) {
        console.log(`Evaluate macro: '${args}`);
    }

    let uri = "macro:helpers/ExecuteMacro@lib:net.dovesoft.notebook";
    let promise = fetch(uri, { method: "POST", body: args });
    if (callBack) {
        promise.then(
            r => {
                r.text().then(
                    d => callBack(d),
                    e1 => logMessage("eval 2", e1)
                );
            },
            e2 => logMessage("eval 1", e2)
        );
    }
}

/**
 * 
 */
const setDebug = () => {
    try {
        let args = JSON.stringify(["DebugOn", "net.dovesoft.notebook"]);
        let uri = "macro:helpers/GetLibraryProperty@lib:net.dovesoft.notebook";

        fetch(uri, { method: "POST", body: args }).then(
            r => {
                r.text().then(
                    d => debugOn = Number(d) == 1,
                    e => logMessage("Failed to set debugOn", e)
                );
            },
            e2 => logMessage("Failed to get data", e2)
        );
    } catch (error) {
        logMessage("Failed to read doDebug: " + error);
    }
}

setDebug();