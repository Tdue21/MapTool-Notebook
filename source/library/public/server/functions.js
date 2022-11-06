"use strict";

/**
 * Encodes JSON for transport between layers.
 * @param {JSON} data - Data to encode.
 */
function transEncode(data) {
    const text = JSON.stringify(data);
    const encoded = MT.btoa(text);
    return encoded;
}
MTScript.registerMacro("transEncode", transEncode);


/**
 * Decode transport encoded data to json.
 * @param {string} data - Transport encoded data string.
 * @returns {JSON} The decoded json object.
 */
function transDecode(data) {
    const decoded = MT.atob(data);
    const json = JSON.parse(decoded);
    return json;
}
MTScript.registerMacro("transDecode", transDecode);

/**
 * Function for showing the Notebook About dialog.
 */
function showAbout() {
    try {
        let data = MT.getLibraryInfo(ns);
        let options = getDialogOptions(400, 450, data.version);
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
        let options = getDialogOptions(500, 480, loadSetup());
        MT.showDialog("Notebook General Setup", `lib://${ns}/client/setup.html`, options);
    } catch (error) {
        MT.printException(showSetup.name, error);
    }
}
MTScript.registerMacro("showSetup", showSetup);

function closeSetup() {
    try {

    } catch (error) {
        MT.printException("closeSetup", error);
    }
}

/**
 * Function for showing the notebook library.
 */
function showLibrary() {
    try {
        const _playerName = MT.getPlayerName();
        const _notebooks = JSON.parse(MT.getLibProperty("notebooks", ns));
        const _userPrefs = getUserPreferences(_playerName);
        const data = {
            "isGM": MT.isGM(),
            "playerName": _playerName,
            "asFrame": _userPrefs.asFrame,
            "notebooks": _notebooks
        };

        let options = getDialogOptions(260, 500, transEncode(data));
        MT.showFrame("Notebook Library", `lib://${ns}/client/library.html`, options);
    } catch (error) {
        MT.printException("showLibrary", error);
    }
}
MTScript.registerMacro("showLibrary", showLibrary);


/**
 * 
 * @param {string} data - string representation of a notebook object. 
 * @param {number} asFrame - 
 */
function showNotebook(data, asFrame = 0) {
    try {
        let book = JSON.parse(MT.atob(data));
        let options = getDialogOptions(800, 600, data);

        if (1 == Number(asFrame)) {
            MT.showFrame(`Notebook - ${book.title}`, `lib://${ns}/client/show.html`, options);
        } else {
            MT.showDialog(`Notebook - ${book.title}`, `lib://${ns}/client/show.html`, options);
        }
    } catch (error) {
        MT.printException("showNotebook", error);
    }
}
MTScript.registerMacro("showNotebook", showNotebook);

function closeNotebook(data) {
    try {
        const bookData = transDecode(data);
        if(bookData.kind == "frame5") {
            MT.closeFrame(bookData.name);
        } else if(bookData.kind == "dialog5") {
            MT.closeDialog(bookData.name);
        }
    } catch (error) {
        MT.printException("closeNotebook", error);
    }
}
MTScript.registerMacro("closeNotebook", closeNotebook);


/**
 * 
 * @param {string} data - transEncoded book data.
 */
function editBook(data = "") {
    const bookData = data !== "" ? transDecode(data) : { "kind": "", "name": "", "title":"", "owner": MT.getPlayerName()};
    const notebooks = JSON.parse(MT.getLibProperty("notebooks", ns));
    const notebook = bookData.title !== "" ? notebooks[bookData.title] : {
        "title": "",
        "summary": "",
        "owner": bookData.owner,
        "private": false,
        "accent": "#cccccc",
        "readonly": false,
        "pages":[]
    };
    bookData["book"] = notebook;

    let options = getDialogOptions(600, 800, transEncode(bookData));
    MT.showDialog(`Edit Book`, `lib://${ns}/client/edit.html`, options);
}
MTScript.registerMacro("editBook", editBook);

/**
 * 
 */
function showOverlay() {
    try {
        const overlayName = "Library";
        const data = {
            gm: MT.isGM(),
            player: MT.getPlayerName()
        }

        if (!MT.isOverlayRegistered(overlayName)) {
            MT.showOverlay("Library", `lib://${ns}/client/overlay.html`, "zorder=90;value=" + transEncode(data));
        }

        if (!MT.isOverlayVisible(overlayName)) {
            MT.setOverlayVisible(overlayName, true);
        }
    } catch (error) {
        MT.printException("showOverlay", error);
    }
}
MTScript.registerMacro("showOverlay", showOverlay);


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
        MT.printMessage(final);
    } catch (error) {
        MT.printException("showWelcome", error);
    }
}
MTScript.registerMacro("showWelcome", showWelcome);


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
 * Function for loading the general settings.
 * @returns {json} - A json object containing the general settings.
 */
function loadSetup() {
    try {
        let data = MT.getLibProperty("settings", ns);
        return data;
    } catch (error) {
        MT.printException("loadSetup", error);
    }
}
MTScript.registerMacro("loadSetup", loadSetup);

/**
 * Function for saving the general settings.
 * @param {json} data - The general settings to save.
 */
function saveSetup(data) {
    try {
        if (data != "") {
            MT.setLibProperty("settings", data, ns);
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
        MT.setLibProperty("settings", data, ns);
    } catch (error) {
        MT.printException("resetSettings", error);
    }
}
MTScript.registerMacro("resetSettings", resetSettings);


/**
 * 
 * @param {string} userName - Name of the user.
 * @returns {JSON} - A json object containing the user preferences. 
 */
function getUserPreferences(userName = "") {
    try {
        let userPref = {};
        let raw = MT.getLibProperty("userPreferences", ns);
        if (isJson(raw)) {
            let userPreferences = JSON.parse(raw);
            if(userName != "") {
                userPref = userPreferences[userName];
            } else {
                userPref = userPreferences;
            }
        }
        return userPref;
    } catch (error) {
        MT.printException("getUserPreferences", error);
    }
}
MTScript.registerMacro("getUserPreferences", getUserPreferences);

/**
 * 
 * @param {string} userName - Name of the user.
 * @param {string} userPreferences - A json object as string containing the user preferences.
 */
function setUserPreferences(userName, userPrefs) {
    try {
        const playerName = transDecode(userName);
        const userPref = transDecode(userPrefs);
        let userPreferences = getUserPreferences();
        let usersPrefs = userPreferences[playerName];

        const keys = Object.keys(userPref);
        for(let key of keys) {
            usersPrefs[key] = userPref[key];
        }
        userPreferences[playerName] = usersPrefs;
        MT.setLibProperty("userPreferences", userPreferences, ns);
    } catch (error) {
        MT.printException("setUserPreferences", error);
    }
}
MTScript.registerMacro("setUserPreferences", setUserPreferences);
