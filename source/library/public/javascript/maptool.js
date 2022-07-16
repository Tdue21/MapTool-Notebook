/**
 * Executes a MTScript macro in the library, and returns the output (expected as json).
 * @param {string} macro - full name of the macro.
 * @returns {json}
 */
async function executeMacro(macro, args) {
    console.log(`executeMacro called for: ${macro}, with args: ${args}`)

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
async function fetchNotebookList() {
    return {
        "notebook Manual": {
            "summary": "User guide for MapTool notebook add-on.",
            "owner": "gm",
            "private": false,
            "pages": {
                "0. Introduction": "content of page 1",
                "1. First section": "content of page 2",
                "2. second section": "content of page 2",
                "3. third section": "content of page 2"
            }
        },
        "notebook 1": {
            "summary": "This is the first notebook.",
            "owner": "",
            "private": true,
            "pages": {
                "page 1": "content of page 1",
                "page 2": "content of page 2"
            }
        },
        "notebook 2": {
            "summary": "This is the second notebook.",
            "owner": "",
            "private": true,
            "pages": {
                "page 1": "content of page 1",
                "page 2": "content of page 2"
            }
        }
    }




    //return executeMacro("ListNotebooks") 
}

    /**
     * Fetch setup data.
     */
    async function fetchSetupData() { return executeMacro("GetSetupData") }
