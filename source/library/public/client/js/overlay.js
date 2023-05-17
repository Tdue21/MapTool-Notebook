/**
 * 
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

    onConnect() {
        return new Promise((resolve, reject) => {
            this.connected = resolve;
            this.connectFailed = reject;
        });
    }

    get isGM() { 
        return this._isGM; 
    }
    
    get playerName() { 
        return this._player; 
    }

    openLibrary() { 
        evaluateMacro("[h:js.showLibrary()]"); 
    }

    addBook() { 
        evaluateMacro(`[h:js.editBook("")]`); 
    }

    openAbout() { 
        evaluateMacro("[h:js.showAbout()]"); 
    }
}

/**
 * 
 */
class OverlayView {

    constructor() {
        try {
            this.libraryClicked = new EventManager();
            this.addBookClicked = new EventManager();
            this.aboutClicked = new EventManager();

            let _vh = new ViewHelpers();
            _vh. setupEventListener("#quill", "click", this.libraryClicked);
            _vh.setupEventListener("#add", "click", this.addBookClicked);
            _vh.setupEventListener("#about", "click", this.aboutClicked);

        } catch (error) {
            logError(`${this.constructor.name}.ctor`, error);
        };
    }
}

/**
 * 
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

    onControllerConnected = (model) => {
        try {
            this.view.libraryClicked.addListener(() => this.model.openLibrary());
            this.view.addBookClicked.addListener(() => this.model.addBook());
            this.view.aboutClicked.addListener(() => this.model.openAbout());
        } catch (error) {
            logError("controller.ctor", error);
        }
    }

    handleConnectionError(error) { 
        logError(`controller.onConnected`, error); 
    }
}

try {
    new OverlayController(new OverlayModel(), new OverlayView());
} catch (error) {
    logError("Global error", error);
}