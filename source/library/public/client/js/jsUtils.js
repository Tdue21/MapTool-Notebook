const namespace = "net.dovesoft.notebook";



/**
 * Encodes JSON for transport between layers.
 * @param {JSON} data - Data to encode.
 */
 function transEncode(data) {
    const text = JSON.stringify(data);
    const encoded = btoa(text);
    return encoded;
}


/**
 * Decode transport encoded data to json.
 * @param {string} data - Transport encoded data string.
 * @returns {JSON} The decoded json object.
 */
function transDecode(data) {
    const decoded = atob(data);
    const json = JSON.parse(decoded);
    return json;
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
    MapTool.log(output);
}

/**
 * 
 * @param {string} message 
 * @returns 
 */
const logMessage = (message) => MapTool.log(message); 

const logJson = (json) => {
    evaluateMacro(`[h:data='${JSON.stringify(json)}'][h:broadcast("<pre>" + json.indent(data) + "</pre>")]`);
}

/**
 * 
 * @param {string} playerName 
 * @param {string} userPreference 
 * @param {string} value 
 */
const setUserPreference = (playerName, userPreference, value) => {
    const userPrefs = JSON.parse(`{"${userPreference}":"${value}"}`);
    const macro = `[h:playerName="${transEncode(playerName)}"]
                   [h:userPref="${transEncode(userPrefs)}"]
                   [h:js.setUserPreferences(playerName, userPref)]`;
    evaluateMacro(macro);
}


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