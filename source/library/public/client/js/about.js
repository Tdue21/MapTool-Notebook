"use strict";

try {
    /*************************************************************************
     * About model. Responsible for getting the library info displayed 
     * in the about box.
     * @class
     *************************************************************************/
    class Model {

        constructor() {
            let p = MapTool.getUserData();
            p.then(
                (data) => {
                    this.version = atob(data);
                    this._connected(this);
                },
                (e2) => {
                    logMessage("Error reading version", e2);
                    this._connectFailed(e2);
                });
        }

        onConnect() {
            let p = new Promise((resolve, reject) => {
                this._connected = resolve;
                this._connectFailed = reject;
            });
            return p;
        }
    }

    /*************************************************************************
     * About view. Responsible for displaying the library data on the about page.
     * @class
     *************************************************************************/
    class View {
        constructor() {
            this.span = document.getElementById("libVersion");
        }

        get version() { return this.span.innerHTML; }
        set version(value) { this.span.innerHTML = value; }
    }

    /*************************************************************************
     * About controller. Responsible for tying everything together. 
     * @class
     *************************************************************************/
    class Controller {
        constructor(model, view) {
            this.model = model;
            this.view = view;

            this.model.onConnect().then(
                (m) => { this.view.version = m.version; },
                (e) => { console.log("onConnect error: " + e + "\r\n" + e.stack); }
            );
        }
    }

    /*************************************************************************
     * Entry point. 
     *************************************************************************/
    const app = new Controller(new Model(), new View());

    console.log("running about app");

} catch (error) {
    logMessage("Error", error);
}