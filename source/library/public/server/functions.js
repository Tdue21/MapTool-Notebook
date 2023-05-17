"use strict";

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

function showLibrary() {
    try {
        const _playerName = MT.getPlayerName();
        const json = MT.getLibProperty("notebooks", ns);
        console.log(json);
        const _notebooks = JSON.parse(json);
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

function initLibrary() {
    try {
        let data = MT.getStaticData(ns, "/public/server/data/userguide.json");
        MT.setLibProperty("notebooks", data, ns);
    } catch (error) {
        MT.printException("initLibrary", error);
    }
}
MTScript.registerMacro("resetLibrary", resetLibrary);

function transEncode(data) {
    const text = JSON.stringify(data);
    const encoded = MT.btoa(text);
    return encoded;
}
MTScript.registerMacro("transEncode", transEncode);

function transDecode(data) {
    const decoded = MT.atob(data);
    const json = JSON.parse(decoded);
    return json;
}
MTScript.registerMacro("transDecode", transDecode);


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
