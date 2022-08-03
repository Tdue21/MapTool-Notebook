const namespace = "net.dovesoft.notebook";

/**
 * 
 * @param {string} message 
 * @param {Error} error 
 */
const logError = (message, error) => console.log(`<div style="width:200px;overflow:auto"><pre>${message}: ${error}\r\n${error.stack}</pre></div>`);

/**
 * 
 * @param {string} message 
 * @returns 
 */
const logMessage = (message) => console.log(`<div style="width:200px;overflow:auto"><pre>${message}</pre></div>`);

/**
 * 
 * @param {string} args 
 * @param {function} callBack 
 */
const evaluateMacro = (args, callBack = undefined) => {
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