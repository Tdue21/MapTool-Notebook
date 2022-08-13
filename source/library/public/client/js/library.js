/**
 * Library Model
 * This class handles business logic for the library of notebooks. 
 */
class LibraryModel {
    _noteBooks = [];
    _asFrame = {};

    constructor() {
        MapTool.getUserData().then(
            (d) => {
                this._dataLoaded(d);
                this._connected(this);
            },
            (e) => this._connectFailed(e));
    }


    /**
     * Must be called immediately after creating the model object. It will 
     * resolve the asynchronous data look up needed for the overlay logic.
     * @returns {Promise} - A Promise object that will be resolved when 
     * the model is finished loading data.
     */
    onConnect() {
        return new Promise((resolve, reject) => {
            this._connected = resolve;
            this._connectFailed = reject;
        });
    }


    /**
     * Initialization callback for model contructor.
     * @param {JSON} data - Data object for model initialization.
     */
    _dataLoaded(d) {
        try {
            const data = transDecode(d);

            this._playerName = data.playerName;
            this._asFrame = data.asFrame === "true";

            for (let item of data.notebooks) {
                if (!item.private || (item.private && (data.isGM || this._playerName === item.owner))) {
                    if (!item.accent) {
                        item.accent = `transparent`;
                    }
                    this._noteBooks.push(item);
                }
            }
            this._connected(this);
        } catch (error) {
            logError("Error parsing data", error);
        }
    }

    get asFrame() { return this._asFrame; }
    set asFrame(value) { 
        this._asFrame = !!(value); 
        setUserPreference(this._playerName, "asFrame", this._asFrame);
    }

    /**
     * 
     * @returns 
     */
    listTitles() {
        let titles = [];
        for (let item of this._noteBooks) {
            let title = {
                "title": item.title,
                "summary": item.summary,
                "private": !!(item.private),
                "owner": item.owner,
                "accent": item.accent
            };
            titles.push(title);
        }
        return titles;
    };


    /**
     * 
     * @param {*} title 
     * @returns 
     */
    getNoteBook = (title) => {
        return this._noteBooks.find(element => element.title === title);
    };


    /**
     * 
     * @param {string} item 
     * @param {number} asFrame
     */
    openBook(item, asFrame) {
        try {
            let decoded = atob(item);
            let notebook = this.getNoteBook(decoded);
            let data = btoa(JSON.stringify(notebook));

            const macro = `[h:data='${data}'][h:asFrame=${asFrame}][h:js.showNotebook(data, asFrame)]`
            evaluateMacro(macro);
        } catch (error) {
            logError("openBook error", error);
        }
    }
}



/*
 * description of view's purpose.
 */
class LibraryView {
    constructor() {
        try {

            this._vh = new ViewHelpers();
            this.bookClicked = new EventManager();
            this.asFrameClicked = new EventManager();

            this._booksList = this._vh.getElement("#booksList");
            this._asFrame = this._vh.getElement("#frame");

            this._asFrame.addEventListener("change", event => {
                this.asFrameClicked.trigger(event.target.checked);
            });
        } catch (error) {
            logError("view.ctor", error);
        }
    }

    get asFrame() { 
        return this._asFrame.checked; 
    }
    set asFrame(value) {
        this._asFrame.checked = value;
    }

    /**
     * Initializes the view from a list of book items and a click handler
     * @param {JSON[]} items - List of json objects representing books.
     */
    initializeBooksList(items) {
        try {
            if (items == undefined) {
                logError("Unable to build view.");
                return;
            }

            for (let item of items) {
                this._createBookButton(item);
            }
        } catch (error) {
            logError("initializeBooksList", error);
        }
    }

    setAsFrame(isChecked) {
        try {
            this._asFrame.checked = isChecked;
        } catch (error) {
            logError("setAsFrame", error);
        }
    }



    /**
     * Creates a book button based on the supplied json object and onClick event handler.
     * @param {JSON} item - A book object with necessary data.
     */
    _createBookButton(item) {
        try {
            // Create the button
            let button = this._vh.createElement("button", {
                id: btoa(item.title),
                className: "button",
                title: decodeURIComponent(item.summary)
            });

            button.addEventListener("click", event => {
                this.bookClicked.trigger({
                    "id": event.currentTarget.id,
                    "asFrame": this._asFrame.checked ? 1 : 0
                });
            });


            // Create the text for button
            let content = this._vh.createElement("p", {
                style: `--accent-bg:${item.accent}`,
                className: "accent",
                innerText: decodeURIComponent(item.title)
            });
            button.appendChild(content);


            // Lock image if book is private
            if (item.private == "true") {
                let image = this._vh.createElement("img", {
                    src: "./images/key.png",
                    title: `Owner: ${item.owner}`,
                    width: "16px",
                });
                button.appendChild(image);
            }


            // Create list item and add button.
            let listItem = this._vh.createElement("li");
            listItem.appendChild(button);
            this._booksList.appendChild(listItem);

        } catch (error) {
            logError("CreateBookButton", error);
        }
    }
}


/**
 * 
 */
class LibraryController {

    constructor(model, view) {
        try {
            this._model = model;
            this._view = view;

            this._model.onConnect().then(
                (d) => this._onControllerConnected(d),
                (e) => this._handleConnectionError(e));
        } catch (error) {
            logError("baseCtrl.ctor", error);
        }
    }


    /**
     * 
     * @param {LibraryModel} model - The library model object
     */
    _onControllerConnected(model) {
        try {
            this._view.asFrame = model.asFrame;
            this._view.initializeBooksList(model.listTitles());

            this._view.bookClicked.addListener(args => {
                this._model.openBook(args.id, args.asFrame);
            });

            this._view.asFrameClicked.addListener(isChecked => {
                this._model.asFrame = isChecked;
            });
        } catch (error) {
            logError("controller.ctor", error);
        }
    }

    _handleConnectionError(error) {
        logError(`${this.constructor.name}.onConnected`, error);
    }
}

new LibraryController(new LibraryModel(), new LibraryView());