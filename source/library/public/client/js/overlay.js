"use strict";

/**
 * Overlay Model 
 * This class handles business logic for the overlay. 
 */
class OverlayModel extends AbstractBaseModel {
    /**
     * Handles instantiation logic for the model. 
     */
    constructor() {
        super();
        evaluateMacro("[r:json.set('{}', 'gm', isGM(), 'player', getPlayerName())]", json => {
            let data = JSON.parse(json);
            this._isGM = data.gm == 1;
            this._player = data.player;
            this._connected(this);
        });
    }


    /** 
     * Read-only property - Returns true if the current player is GM, otherwise false.
    */
    get isGM() { return this._isGM; }


    /**
     * Read-only property - Returns the name of the current player. 
     */
    get playerName() { return this._player; }


    /**
     * Calls the server side logic for displaying the library frame. 
     */
    openLibrary = () => evaluateMacro("[h:js.showLibrary()]");


    /**
     * Calls the server side logic for displaying the edit book dialog. 
     */
    addBook = () => evaluateMacro("[h:js.addBook()]");


    /**
     * Calls the server side logic for displaying the Notebook general setup dialog. 
     */
    openSettings = () => evaluateMacro("[h:js.showSetup()]");


    /**
     * Calls the server side logic for displaying the About dialog. 
     */
    openAbout = () => evaluateMacro("[h:js.showAbout()]");
}


/**
 * Overlay View
 * This class contains the logic for handling view related logic in the overlay. 
 */
class OverlayView extends AbstractBaseView {
    /**
     * Handles instantiation logic for the view. 
     */
    constructor() {
        super();
        
        this._library = document.getElementById("quill");
        this._add = document.getElementById("add");
        this._settings = document.getElementById("settings");
        this._about = document.getElementById("about");
    }


    /**
     * Shows or hides the settings icon, depending on the parameter. 
     * @param {boolean} isGm - True is the current player is the GM.
     */
    showSettings = (isGm) => {
        try {
            if (!isGm) {
                this._settings.parentElement.style.visibility = "hidden";
            }
        } catch (error) {
            logError("view.setGM", error);
        }
    }

    /**
     * Adds click handler for the Open library icon.
     * @param {function} handler - The handler to execute when the icon is clicked.
     */
    bindLibraryClick = (handler) => this._library.addEventListener("click", () => handler());


    /**
     * Adds click handler for the Add notebook icon.
     * @param {function} handler - The handler to execute when the icon is clicked.
     */
    bindAddClick = (handler) => this._add.addEventListener("click", () => handler());


    /**
     * Adds click handler for the Open Setup icon.
     * @param {function} handler - The handler to execute when the icon is clicked.
     */
    bindSettingsClick = (handler) => this._settings.addEventListener("click", () => handler());


    /**
     * Adds click handler for the Show About icon.
     * @param {function} handler - The handler to execute when the icon is clicked.
     */
    bindAboutClick = (handler) => this._about.addEventListener("click", () => handler());
}


/**
 * Overlay Controller
 * This class contains the logic for binding the model and view together. 
 */
class OverlayController extends AbstractBaseController {
    /**
     * 
     * @param {OverlayModel} model 
     */
     _onControllerConnected(model) {
        try {
            this._view.bindLibraryClick(this._model.openLibrary);
            this._view.bindAddClick(this._model.addBook);
            this._view.bindSettingsClick(this._model.openSettings);
            this._view.bindAboutClick(this._model.openAbout);

            this._view.setGM(model.isGM);
        } catch (error) {
            logError("controller.ctor", e);
        }
    }
}

new OverlayController(new OverlayModel(), new OverlayView());