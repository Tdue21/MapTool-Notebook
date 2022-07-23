"use strict";

class Model {
    constructor() {
        try {
            let p = MapTool.getUserData();

            p.then((r) => {
                // do something with 'r'
                this._connected(this);
            }, (e1) => {
                console.log("Error getting library data: " + e1 + "\r\n" + e1.stack);
                this._connectFailed(e1);
            });
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }

    onConnect() {
        try {
            let p = new Promise((resolve, reject) => {
                this._connected = resolve;
                this._connectFailed = reject;
            });
            return p;

        } catch (error) {
            console.log("onConnect error: " + error + "\r\n" + error.stack);
        }
    }
}

class View {
    constructor() {

    }
}

class Controller {
    constructor(model, view) {
        try {
            this.model = model;
            this.view = view;

            this.model
                .onConnect()
                .then(r => { /* do something with r */}, 
                      f => console.log(f));
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }
}

const app = new Controller(new Model(), new View());                



(async () => {
    try {
        let data = await fetchNotebookList();
        let list = document.getElementById("list");

        for (let notebook in data) {
            let item = `<li><button class="button" onclick="executeMacro('editNotebook', '${encodeURI(notebook)}');">${notebook}</button></li>`;
            list.innerHTML += item;
        }

    } catch (error) {
        console.log("Error: " + error + "\r\n" + error.stack)
    }
})();
