/**
 * Executes a MTScript macro in the library, and returns the output (expected as json).
 * @param {string} macro - full name of the macro.
 * @returns {json}
 */
async function executeMacro(macro, args) {
    let uri = "macro:helpers/" + macro + "@lib:net.dovesoft.notebook"
    let p = fetch(uri, { method: "POST", body: args != null ? args : null })
    let r = await p
    let data = await r.json()

    return data;
}

/**
 * Fetches MapTool data to use on the help page.
 */
async function fetchHelpData() { return executeMacro("GetHelpData") }

/**
 * Fetches library info from MapTool
 */
async function fetchLibraryData() { return executeMacro("GetLibraryData") }

/**
 * List of all notebooks
 */
async function fetchNotebookList() { return executeMacro("ListNotebooks") }

/**
 * Fetch setup data.
 */
async function fetchSetupData() { return executeMacro("GetSetupData") }

/**
 * Fetch data for edit notebook - workaround for not being able to use query parameters. 
*/
async function getEditNotebookArgs() { return executeMacro("getEditNotebookArgs") }

async function getNotebookData(name) { return executeMacro("getNotebookData", name) }
