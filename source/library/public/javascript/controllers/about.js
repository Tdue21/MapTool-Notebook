class Model {
    constructor() {
        let p = MapTool.getUserData();

        p.then((r) => {
            this.version = atob(r);
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