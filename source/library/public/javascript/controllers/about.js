class Model {
    constructor() {
        let uri = "macro:helpers/GetLibraryData@lib:net.dovesoft.notebook"
        let p = fetch(uri, { method: "POST" });
        //let p = fetch("../../../library.json");

        p.then((r) => {
            r.json().then((data) => {
                this.version = data.version;
                this._connected(this);
            }, (e2) => {
                console.log("Error getting version: " + e2);
                this._connectFailed(e2);
            });
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
        this.span = document.getElementById("libVersion");
    }

    get version() { return this.span.innerHTML; }
    set version(value) { this.span.innerHTML = value; }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.onConnect()
            .then((m) => {
                this.view.version = m.version;
            }, error => {
                console.log(error);
            });
    }
}

const app = new Controller(new Model(), new View());