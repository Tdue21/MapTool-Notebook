"use strict";

try {
    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class Model {
        noteBooks = [];

        /**
         * 
         */
        constructor() {
            try {
                let p = MapTool.getUserData();
                p.then((e) => {
                    let d = JSON.parse(atob(e));
                    this.isGM = d.isGM;
                    this.playerName = d.playerName;

                    for (let item of d.notebooks) {
                        if (!item.private || (item.private && (this.isGM || this.playerName == item.owner))) {
                            this.noteBooks.push(item);
                        }
                    }
                    this._connected(this);
                },
                    (e2) => {
                        logMessage("Error reading data", e2);
                        this._connectFailed(e1);
                    });
            } catch (error) {
                logMessage("Model.ctor error", error);
            }
        }

        /**
         * 
         * @returns 
         */
        onConnect() {
            try {
                let p = new Promise((resolve, reject) => {
                    this._connected = resolve;
                    this._connectFailed = reject;
                });
                return p;

            } catch (error) {
                logMessage("onConnect error", error);
            }
        }

        /**
         * 
         * @returns {string[]} An array of strings containing all the titles in the library.
         */
        listTitles = () => this.noteBooks.map(element => element.title);

        /**
         * 
         * @param {string} title - Title of the notebook to find.
         * @returns {}
         */
        getNoteBook = (title) => this.noteBooks.find(element => element.title === title);

        /**
         * 
         */
        createBook = () => executeMacro("CreateNotebook");

        /**
         * 
         * @param {string} title - Title of the notebook to open.
         */
        openBook(title) {
            let decoded = atob(title);
            let notebook = this.getNoteBook(decoded);
            let data = JSON.stringify(notebook);

            executeMacro("ShowNotebook", btoa(data));
        }
    }


    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class View {
        /**
         * 
         */
        constructor() {
            this._createButton = document.getElementById("newBook");
            this._afterBooks = document.getElementById("afterBooks");
            this._body = document.body;
        }

        /**
         * 
         * @param {string[]} titles 
         */
        initialize(titles, handler) {
            try {

                if (titles == undefined) {
                    console.log("Unable to build view.");
                    return;
                }
                titles.forEach(title => this._createBookButton(title, handler));
            } catch (error) {
                logMessage("Initialize", error);
            }
        }

        /**
         * 
         * @param {*} title 
         * @param {*} handler 
         */
        _createBookButton(title, handler) {
            try {
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
                logMessage("CreateBookButton", error);

            }
        }

        /**
         * 
         * @param {*} handler 
         */
        bindCreateButton(handler) {
            this._createButton.addEventListener("click", event => {
                handler();
            });
        }
    }


    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class Controller {
        /**
         * 
         * @param {*} model 
         * @param {*} view 
         */
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
                logMessage("Error", error);
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
    const app = new Controller(new Model(), new View());

    evaluateMacro(`[r:getLibProperty("DebugOn", "net.dovesoft.notebook")]`, (e) => console.log("Test 1: " + e));
    evaluateMacro(`[r:macroLink("Try me", "helpers/showPage@net.dovesoft.notebook", "none", "data=xyz;test=abc")]`, (e) => console.log("Test 2: " + e));

} catch (error) {
    logMessage("Error", error);
}