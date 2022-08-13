/**
 * Overlay Model 
 * This class handles business logic for the overlay. 
 */
class OverlayModel {
    constructor() {
        MapTool.getUserData().then(
            (d) => {
                try {
                    const data = transDecode(d);
                    this._isGM = data.gm;
                    this._player = data.player;
                } catch (error) {
                    logError("model.ctor", error);
                }
                this.connected(this);
            },
            (e) => this.connectFailed(e)
        );
    }

    /**
     * 
     * @returns 
     */
    onConnect() {
        return new Promise((resolve, reject) => {
            this.connected = resolve;
            this.connectFailed = reject;
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
    openLibrary = () => {
        evaluateMacro("[h:js.showLibrary()]");
    };


    /**
     * Calls the server side logic for displaying the edit book dialog. 
     */
    addBook = () => {
        evaluateMacro("[h:js.addBook()]");
    }


    // /**
    //  * Calls the server side logic for displaying the Notebook general setup dialog. 
    //  */
    // openSettings = () => {
    //     evaluateMacro("[h:js.showSetup()]");
    // }


    /**
     * Calls the server side logic for displaying the About dialog. 
     */
    openAbout = () => {
        evaluateMacro("[h:js.showAbout()]");
    }
}


/**
 * Overlay View
 * This class contains the logic for handling view related logic in the overlay. 
 */
class OverlayView {

    constructor() {
        try {
            this.libraryClicked = new EventManager();
            this.addBookClicked = new EventManager();
            //this.settingsClicked = new EventManager();
            this.aboutClicked = new EventManager();

            let _vh = new ViewHelpers();
            _vh. setupEventListener("#quill", "click", this.libraryClicked);
            _vh.setupEventListener("#add", "click", this.addBookClicked);
            //_vh.setupEventListener("#settings", "click", this.settingsClicked);
            _vh.setupEventListener("#about", "click", this.aboutClicked);

        } catch (error) {
            logError(`${this.constructor.name}.ctor`, error);
        };
    }

    // initializeData(model) {
    //     try {
    //         if (model.isGM) {
    //             this._settings.parentElement.style.visibility = "hidden";
    //         }
    //     } catch (error) {
    //         logError("view.setGM", error);
    //     }
    // }
}


/**
 * Overlay Controller
 * This class contains the logic for binding the model and view together. 
 */
class OverlayController {

    constructor(model, view) {
        try {
            this.model = model;
            this.view = view;

            this.model.onConnect().then(
                this.onControllerConnected,
                this.handleConnectionError);
        } catch (error) {
            logError("baseCtrl.ctor", error);
        }
    }

    /**
     * 
     * @param {OverlayModel} model 
     */
    onControllerConnected = (model) => {
        try {
            this.view.libraryClicked.addListener(() => this.model.openLibrary());
            this.view.addBookClicked.addListener(() => this.model.addBook());
            //this.view.settingsClicked.addListener(() => this.model.openSettings());
            this.view.aboutClicked.addListener(() => this.model.openAbout());

            //this.view.initializeData(model);
        } catch (error) {
            logError("controller.ctor", error);
        }
    }

    handleConnectionError(error) {
        logError(`controller.onConnected`, error);
    }
}

new OverlayController(new OverlayModel(), new OverlayView());