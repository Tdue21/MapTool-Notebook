"use strict";

/**
 * Helper function for building option string for dialogs. 
 * @param {number} width - width of the window.
 * @param {number} height - height of the window.
 * @param {string} data - user data to pass to the window.
 * @returns {string} - A complete options string to pass to a dialog.
 */
function getDialogOptions(width, height, data) {
    return `width=${width}; height=${height}; temporary=1; noframe=0; input=1; value=${data}`;
}


/**
 * Function for showing the Notebook About dialog.
 */
function showAbout() {
    try {
        let info = MT.getLibraryInfo(ns);
        let encoded = MT.btoa(info.version);
        let options = getDialogOptions(400, 380, encoded);

        MT.showDialog("About", `lib://${ns}/client/about.html`, options);
    } catch (error) {
        MT.printException(showAbout.name, error);
    }
}
MTScript.registerMacro("showAbout", showAbout);


/**
 * Function for showing the Markdown help dialog.
 */
function showHelp() {
    try {
        let data = MT.getPlayerName();
        let options = getDialogOptions(350, 550, data);

        MT.showDialog("Markdown Help", `Lib://${ns}/client/help.html`, options);
    } catch (error) {
        MT.printException(showHelp.name, error);
    }
}
MTScript.registerMacro("showHelp", showHelp);


/**
 * Function to show the general setup dialog.
 */
function showSetup() {
    try {
        let data = MT.getLibProperty("Settings", ns);
        let options = getDialogOptions(500, 480, data);

        MT.showDialog("Notebook General Setup", `lib://${ns}/client/setup.html`, options);
    } catch (error) {
        MT.printException(showSetup.name, error);
    }
}
MTScript.registerMacro("showSetup", showSetup);


/**
 * Function for showing the notebook library.
 */
function showLibrary() {
    try {
        let json = {
            isGM: Number(MTScript.evalMacro("[r:isGM()]")),
            playerName: MTScript.evalMacro("[r:getPlayerName()]"),
            notebooks: JSON.parse(MT.getLibProperty("notebooks", ns))
        };
        let text = MT.btoa(json);
        let options = getDialogOptions(200, 500, text);

        MT.showFrame("Notebook Library", `lib://${ns}/client/library.html`, options);
    } catch (error) {
        MT.printException(showLibrary.name, error);
    }
}
MTScript.registerMacro("showLibrary", showLibrary);


/**
 * 
 * @param {string} data - string representation of a notebook object. 
 */
function showNotebook(data) {
    try {
        MT.printMessage(showNotebook.name, data);

        let book = JSON.parse(MT.atob(data));
        let options = getDialogOptions(600, 600, data);

        MT.showDialog(`Notebook - ${book.title}`, `lib://${ns}/client/show.html`, options);
    } catch (error) {
        MT.printException(showNotebook.name, error);
    }
}
MTScript.registerMacro("showNotebook", showNotebook);


/**
 * 
 */
function showOverlay() {
    try {
        MT.closeOverlay("Library");

        let gm = MTScript.execMacro("[r:isGM()]");
        let json = { isGM: Number(gm) };
        let data = JSON.stringify(json);
        let encoded = MT.btoa(data);

        MT.showOverlay("Library", `lib://${ns}/client/overlay.html`, `zorder=90; value=${encoded}`);
    } catch (error) {
        MT.printException(showOverlay.name, error);
    }
}
MTScript.registerMacro("showOverlay", showOverlay);


/**
 * Function resetting the notebook library. 
 * Primarily used for testing.
 */
function resetLibrary() {
    let data = MT.getStaticData(ns, "/public/server/data/userguide.json");
    MT.setLibProperty("notebooks", data, ns);
}
MTScript.registerMacro("resetLibrary", resetLibrary);


/**
 * Function for saving the general settings.
 * @param {string} data 
 */
function saveSetup(data) {
    if (data != "") {
        MT.setLibProperty("Settings", data, ns);
    }
    MT.closeDialog("Notebook General Setup");
}
MTScript.registerMacro("saveSetup", saveSetup);


/**
 * 
 * @param {boolean} enable - true to enable debug logging.
 */
function setDebug(enable) { MT.setLibProperty("DebugOn", enable, ns); }
MTScript.registerMacro("setDebug", setDebug);


/**
 * 
 * @returns true if debug logging is enabled.
 */
function getDebug() { return MT.getLibProperty("DebugOn", ns); }
MTScript.registerMacro("getDebug", getDebug);


/**
 * Function for resetting the general settings to default values. 
 * Primarily used for testing.
 */
function resetSettings() {
    let data = MT.getStaticData(ns, "/public/server/data/settings.json");
    let encoded = MT.btoa(data);

    MT.setLibProperty("Settings", encoded, ns);
}
MTScript.registerMacro("resetSettings", resetSettings);