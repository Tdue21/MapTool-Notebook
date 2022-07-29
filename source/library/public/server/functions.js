"use strict";

/**
 * Helper function for building option string for dialogs. 
 * @param {number} width - width of the window.
 * @param {number} height - height of the window.
 * @param {number} data - user data to pass to the window.
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
    } catch(error) {
        MT.printException(showAbout.name, error);
    }
}
MTScript.registerMacro("showAbout", showAbout);


/**
 * Function for showing the Markdown help dialog.
 */
 function showHelp() {
    let data = MT.getPlayerName();
    let options = getDialogOptions(350, 550, data);

    MT.showDialog("Markdown Help", `Lib://${ns}/client/help.html`, options);
}
MTScript.registerMacro("showHelp", showHelp);


/**
 * Function to show the general setup dialog.
 */
function showSetup() {
    let data = MT.getLibProperty("Settings", ns);
    let options = getDialogOptions(500, 480, data);

    MT.showDialog("Notebook General Setup", `lib://${ns}/client/setup.html`, options);
}
MTScript.registerMacro("showSetup", showSetup);

/**
 * Function for saving the general settings.
 * @param {string} data 
 */
function saveSetup(data) {
    if(data != "") {
        MT.setLibProperty("Settings", data, ns);
    }
    MT.closeDialog("Notebook General Setup");
}
MTScript.registerMacro("saveSetup", saveSetup);

/**
 * Function for resetting the general settings to default values.
 */
function resetSettings() {
    let data = MT.getStaticData(ns, "/public/server/data/settings.json");
    let encoded = MT.btoa(JSON.stringify(data));
    
    MT.setLibProperty("Settings", encoded, ns);
}
MTScript.registerMacro("resetSettings", resetSettings);
