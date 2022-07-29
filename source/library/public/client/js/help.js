"use strict";
try {

    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class Model {
        constructor() {
            console.log("Entering model.ctor");
            try {
                let p = MapTool.getUserData();

                p.then(
                    (d) => {
                        try {
                            console.log(d);
                            this.playerName = d;
                            this._connected(this);

                        } catch (error) {
                            logMessage("Error", error);
                        }
                    }, (e1) => {
                        logMessage("Error getting library data", e1);
                        this._connectFailed(e1);
                    });
            } catch (error) {
                logMessage("Error", error);
            }
            finally {
                console.log("Exiting model.ctor");
            }
        }

        onConnect() {
            let p = new Promise((resolve, reject) => {
                this._connected = resolve;
                this._connectFailed = reject;
            });
            return p;
        }
    }

    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class View {
        constructor() {
            this._PlayerName = document.getElementById("playerName");
        }

        get playerName() { return this._PlayerName.innerText; }
        set playerName(value) { this._PlayerName.innerText = value; }
    }

    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class Controller {
        constructor(model, view) {
            console.log("Entering controller.ctor");
            try {

                this.model = model;
                this.view = view;

                this.model.onConnect().then(
                    (m) => {
                        this.view.playerName = m.playerName;
                    },
                    (e) => { console.log("onConnect error: " + e + "\r\n" + e.stack); }
                );

            } catch (error) {
                logMessage("Controller.ctor", error);

            } finally {
                console.log("Exiting controller.ctor");
            }
        }
    }

    /***************************************************************************
     * Entry point. 
     ***************************************************************************/
    const app = new Controller(new Model(), new View());

} catch (error) {
    logMessage("Error", error);
}