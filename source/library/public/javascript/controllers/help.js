class Model {
    constructor() {
        let p = MapTool.getUserData();

        p.then((r) => {
            let decoded = atob(r);
            let data = JSON.parse(decoded);

            this.playerName = data.playerName;
            this.toHitRoll = data.toHit;
            this.d6Roll = data.rollD6;

            this._connected(this);
        }, (e1) => {
            console.log("Error getting library data: " + e1);
            this._connectFailed(e1);
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

class View {
    constructor() {
        this.htmlPlayerName = document.getElementById("getPlayerName");
        this.htmlToHitRoll = document.getElementById("toHit");
        this.htmlD6Roll = document.getElementById("rollD6");
    }

    get playerName() { return this.htmlPlayerName.innerHTML; }
    set playerName(value) { this.htmlPlayerName.innerHTML = value; }

    get toHitRoll() { return this.htmlToHitRoll.innerHTML; }
    set toHitRoll(value) { this.htmlToHitRoll.innerHTML = value; }

    get d6Roll() { return this.htmlD6Roll.innerHTML; }
    set d6Roll(value) { this.htmlD6Roll.innerHTML = value; }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;


        this.model.onConnect()
            .then((m) => {
                this.view.version = m.version;
                this.view.playerName = m.playerName;
                this.view.toHitRoll = m.toHitRoll;
                this.view.d6Roll = m.d6Roll;
            }, error => {
                console.log(error);
            });
    }
}

const app = new Controller(new Model(), new View());