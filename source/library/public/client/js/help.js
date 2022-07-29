"use strict";
try {

    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class Model {
        constructor() {
            try {
                let p = MapTool.getUserData();

                p.then(
                    (d) => {
                        try {
                            this.playerName = d;
                            this._connected(this);

                        } catch (error) {
                            logError("Error", error);
                        }
                    }, (e1) => {
                        logError("Error getting library data", e1);
                        this._connectFailed(e1);
                    });
            } catch (error) {
                logError("Error", error);
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
                logError("Controller.ctor", error);
            }
        }
    }

    /***************************************************************************
     * Entry point. 
     ***************************************************************************/
     console.log("running help app");
     const app = new Controller(new Model(), new View());
} catch (error) {
    logError("Global error", error);
}