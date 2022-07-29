"use strict";

try {
    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class Model {
        noteBooks = [];

        constructor() {
            try {
                let p = MapTool.getUserData();

                p.then((e) => {
                    console.log("Data: " + e);
                    let data = JSON.parse(e);
                    console.log("Json: " + data);
                    this.isGM = data.isGM;
                    this.playerName = data.playerName;

                    for (let item of data.notebooks) {
                        if (!item.private || (item.private && (this.isGM || this.playerName == item.owner))) {
                            this.noteBooks.push(item);
                        }
                    }
                    console.log("Notebooks: " + this.noteBooks);

                    this._connected(this);
                },
                    (e2) => {
                        logError("Error reading data", e2);
                        this._connectFailed(e1);
                    });
            } catch (error) {
                logError("Model.ctor error", error);
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
                logError("onConnect error", error);
            }
        }

        listTitles() {
            let titles = [];
            this.noteBooks.forEach(element => {
                console.log(element);
                titles.push(element.title);
            });
            return titles;
        };

        getNoteBook = (title) => this.noteBooks.find(element => element.title === title);

        createBook = () => evaluateMacro("[h:js.createNotebook()]");

        openBook(title) {
            let decoded = atob(title);
            let notebook = this.getNoteBook(decoded);
            let data = JSON.stringify(notebook);

            evaluateMacro(`[h:data='${data}'][h:js.showNotebook(data)]`);
        }
    }


    /***************************************************************************
     * 
     ***************************************************************************/
    class View {
        constructor() {
            this._createButton = document.getElementById("newBook");
            this._afterBooks = document.getElementById("afterBooks");
            this._body = document.body;
        }

        initialize(titles, handler) {
            try {

                if (titles == undefined) {
                    console.log("Unable to build view.");
                    return;
                }
                console.log("Titles: " + titles);
                titles.forEach(title => this._createBookButton(title, handler));
            } catch (error) {
                logError("Initialize", error);
            }
        }

        _createBookButton(title, handler) {
            try {
                console.log("Create book button for: " + title);

                let bookDiv = document.createElement("div");
                bookDiv.className = "bookDiv";

                let button = document.createElement("button");
                button.id = btoa(title);
                button.className = "button";
                button.innerText = title;
                button.addEventListener("click", event => {
                    handler(event.target.id);
                });

                bookDiv.appendChild(button);
                this._body.insertBefore(bookDiv, this._afterBooks);
            } catch (error) {
                logError("CreateBookButton", error);

            }
        }

        bindCreateButton(handler) {
            this._createButton.addEventListener("click", event => {
                handler();
            });
        }
    }


    /***************************************************************************
     * 
     ***************************************************************************/
    class Controller {
        constructor(model, view) {
            try {
                this.model = model;
                this.view = view;

                this.model.onConnect().then(
                    (r) => {
                        this.view.initialize(r.listTitles(), this.bookButtonHandler);
                        this.view.bindCreateButton(this.createBookHandler);
                    },
                    (f) => console.log(f));
            } catch (error) {
                logError("Error", error);
            }
        }

        /** Handler for the createBook() method of the model. */
        createBookHandler = () => this.model.createBook();

        /**
         * Handle for the openBook method of the model.
         * @param {*} title - Title of the book to open.
         */
        bookButtonHandler = (title) => this.model.openBook(title);
    }
 
    /***************************************************************************
     * Entry point
     ***************************************************************************/
    console.log("Running library app");
    const app = new Controller(new Model(), new View());
} catch (error) {
    logError("Global error", error);
}