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
 * Helper function for reading the latest version of the library from github.
 * @returns A string containing the latest version.
 */
function getLatestVersion() {
    const updateLink = "https://raw.githubusercontent.com/Tdue21/MapTool-Notebook/master/build/latest.txt";
    const latest = MTScript.evalMacro(`[r:REST.get("${updateLink}")]`);
    return latest;
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
        MT.printException("showAbout", error);
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
        MT.printException("showHelp", error);
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
        MT.printException("showLibrary", error);
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
        MT.printException("showNotebook", error);
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
        MT.showOverlay("Library", `lib://${ns}/client/overlay.html`, `zorder=90; value=${gm}`);
    } catch (error) {
        MT.printException("showOverlay", error);
    }
}
MTScript.registerMacro("showOverlay", showOverlay);


/**
 * Function resetting the notebook library. 
 * Primarily used for testing.
 */
function resetLibrary() {
    try {
        let data = MT.getStaticData(ns, "/public/server/data/userguide.json");
        MT.setLibProperty("notebooks", data, ns);
    } catch (error) {
        MT.printException("resetLibrary", error);
    }
}
MTScript.registerMacro("resetLibrary", resetLibrary);


/**
 * Function for saving the general settings.
 * @param {string} data 
 */
function saveSetup(data) {
    try {
        if (data != "") {
            MT.setLibProperty("Settings", data, ns);
        }
        MT.closeDialog("Notebook General Setup");
    } catch (error) {
        MT.printException("saveSetup", error);
    }
}
MTScript.registerMacro("saveSetup", saveSetup);


/**
 * Function for resetting the general settings to default values. 
 * Primarily used for testing.
 */
function resetSettings() {
    try {
        let data = MT.getStaticData(ns, "/public/server/data/settings.json");
        let encoded = MT.btoa(data);

        MT.setLibProperty("Settings", encoded, ns);
    } catch (error) {
        MT.printException("resetSettings", error);
    }
}
MTScript.registerMacro("resetSettings", resetSettings);


/**
 * 
 */
function showWelcome() {
    try {
        let data = MT.getStaticData(ns, "/public/server/data/welcome.html");
        let gitLatest = getLatestVersion();
        let libData = MT.getLibraryInfo(ns);

        let final = evalTemplate(data, {
            latest: gitLatest,
            version: libData.version,
            doUpdate: gitLatest.localeCompare(libData.version) > 0
        });
        MT.broadcast(final);
    } catch (error) {
        MT.printException("showWelcome", error);
    }
}

/**
 * Input a string containing a template, which can be anything really, but 
 * usually html and a json object containing options for the template. 
 * @param {string} template - string with the template.
 * @param {json} options - json object with options.
 * @returns {string} - returns the finished string.
 */
function evalTemplate(template, options) {
    let wrapper = "";
    try {
        wrapper = `"use strict";\r\n`;
        wrapper += `let options=${JSON.stringify(options)};\r\n`;
        wrapper += `let html=\`${template}\`;\r\n\r\nreturn html`;

        return Function(wrapper)();
    } catch (error) {
        MT.printException("evalTemplate: " + wrapper, error);
    }
}