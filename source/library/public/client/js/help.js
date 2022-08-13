class Model {
    constructor() {
        try {
            MapTool.getUserData().then(
                (d) => {
                    this.playerName = d;
                    this._connected(this);
                },
                (e1) => {
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

class Controller {
    constructor(model, view) {
        try {

            this.model = model;
            this.view = view;

            this.model.onConnect().then(
                (m) => { this.view.playerName = m.playerName; },
                (e) => { logError("onConnect error", e); }
            );

        } catch (error) {
            logError("Controller.ctor", error);
        }
    }
}

try {
    const app = new Controller(new Model(), new View());
} catch (error) {
    logError("Global error", error);
}