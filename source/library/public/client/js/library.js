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
                    try {
                        let text = atob(e);
                        let data = JSON.parse(text);

                        this.isGM = data.isGM;
                        this.playerName = data.playerName;

                        for (let item of data.notebooks) {
                            if (!item.private || (item.private && (this.isGM || this.playerName == item.owner))) {
                                this.noteBooks.push(item);
                            }
                        }

                        this._connected(this);
                    } catch (error) {
                        logError("Error parsing data", error);
                    }
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
            for(let item of this.noteBooks) {
                let title = {
                    "title": item.title,
                    "summary": item.summary
                };
                titles.push(title);
            }
            
            return titles;
        };

        getNoteBook = (title) => this.noteBooks.find(element => element.title === title);

        createBook = () => evaluateMacro("[h:js.createNotebook()]");

        openBook(item) {
            try {
            let decoded = atob(item);
            let json = JSON.parse(decoded);
            let notebook = this.getNoteBook(json.title);
            let data = btoa(JSON.stringify(notebook));

            evaluateMacro(`[h:data='${data}'][h:js.showNotebook(data)]`);
            } catch(error) {
                logError("openBook error", error);
            }
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

        initialize(items, handler) {
            try {

                if (items == undefined) {
                    console.log("Unable to build view.");
                    return;
                }
                items.forEach(item => this._createBookButton(item, handler));
            } catch (error) {
                logError("Initialize", error);
            }
        }

        _createBookButton(item, handler) {
            try {
                let bookDiv = document.createElement("div");
                bookDiv.className = "bookDiv";

                let button = document.createElement("button");
                button.id = btoa(JSON.stringify(item));
                button.className = "button";
                button.innerText = decodeURIComponent(item.title);
                button.title = decodeURIComponent(item.summary);
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