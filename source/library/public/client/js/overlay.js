"use strict";

try {
    /*************************************************************************
     * Overlay model. 
     * 
     * @class
     *************************************************************************/
    class Model {

        constructor() {
            evaluateMacro("[r:isGM()]", d => {
                console.log("Received 2: " + d);
                this._isGM = d == 1;
                this._connected(this);
            });
        }

        onConnect() {
            try {
                let p = new Promise((resolve, reject) => {
                    this._connected = resolve;
                    this._connectFailed = reject;
                });
                return p;

            } catch (error) {
                logError("onConnect error", error);
            }
        }

        get isGM() {
            return this._isGM;
        }

        openLibrary() {
            try {
                evaluateMacro("[h:js.showLibrary()]");
            } catch (error) {
                logError("model.openLibrary", error);
            }
        }

        openSettings() {
            try {
                evaluateMacro("[h:js.showSetup()]");
            } catch (error) {
                logError("model.openSettings", error);
            }
        }

        openAbout() {
            try {
                evaluateMacro("[h:js.showAbout()]");
            } catch (error) {
                logError("model.openAbout", error);
            }
        }
    }

    /*************************************************************************
     * 
     *************************************************************************/
    class View {
        constructor() {
            this._library = document.getElementById("quill");
            this._settings = document.getElementById("settings");
            this._about = document.getElementById("about");
        }

        isGm(isgm) {
            // if (isgm) {
            //     this._settings.style.visibility = "hidden";
            // }
        }

        bindLibraryClick = (handler) => this._library.addEventListener("click", () => handler());

        bindSettingsClick = (handler) => this._settings.addEventListener("click", () => handler());

        bindAboutClick = (handler) => this._about.addEventListener("click", () => handler());
    }

    /*************************************************************************
     * 
     *************************************************************************/
    class Controller {
        constructor(model, view) {
            try {
                this.model = model;
                this.view = view;

                this.model.onConnect().then(
                    (m) => {
                        try {
                            this.view.bindLibraryClick(this.openLibraryHandler);
                            this.view.bindSettingsClick(this.openSettingsHandler);
                            this.view.bindAboutClick(this.openAboutHandler);
                        
                            this.view.setGM(this.model.isGM);
                        } catch (error) {
                            logError("controller.ctor", e);
                        }
                    },
                    (e) => {
                        logError("controller.ctor -> model.onConnect", e);
                    });
            } catch (error) {
                logError("Controller ctor", error);
            }
        }

        openLibraryHandler = () => {
            try {
                this.model.openLibrary();
            } catch (error) {
                logError("Controller openLibraryHandler", error);
            }
        }

        openSettingsHandler = () => {
            try {
                this.model.openSettings();
            } catch (error) {
                logError("Controller openSettingsHandler", error);
            }
        }

        openAboutHandler = () => {
            try {
                this.model.openAbout();
            } catch (error) {
                logError("Controller openAboutHandler", error);
            }
        }
    }

    /*************************************************************************
     * Entry point. 
     *************************************************************************/
    console.log("running overlay app");
    const app = new Controller(new Model(), new View());

} catch (error) {
    logError("Global error", error);
}