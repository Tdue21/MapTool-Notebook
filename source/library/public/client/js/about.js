/**
 * 
 */
class AboutModel {

    constructor() {
        let p = MapTool.getUserData();
        p.then(
            (data) => {
                this.version = data;
                this._connected(this);
            },
            (e2) => {
                logError("Error reading version", e2);
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


/**
 * 
 */
class AboutView {
    constructor() {
        this.span = document.getElementById("libVersion");
    }

    get version() { return this.span.innerHTML; }
    set version(value) { this.span.innerHTML = value; }
}


/**
 * 
 */
class AboutController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.onConnect().then(
            (m) => { this.view.version = m.version; },
            (e) => { logError("onConnect error: " + e + "\r\n" + e.stack); }
        );
    }
}

try {
    const app = new AboutController(new AboutModel(), new AboutView());
} catch (error) {
    logError("Global error", error);
}