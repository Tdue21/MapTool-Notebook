/**
 * Library Model
 * This class handles business logic for the library of notebooks. 
 */
class LibraryModel extends AbstractBaseModel {
    _noteBooks = [];
    _userPrefs = {};
    _macro = `[r:json.set("{}", "isGM", isGM(), 
                                "playerName", getPlayerName(), 
                                "userPrefs", js.getUserPreferences(getPlayerName()), 
                                "notebooks", getLibProperty("notebooks"))]`;

    /**
     * Handles instantiation logic for the model. 
     */
    constructor() {
        super();
        evaluateMacro(this._macro, (data) => this._performInitialization(JSON.parse(data)));
    }


    /**
     * Initialization callback for model contructor.
     * @param {JSON} data - Data object for model initialization.
     */
    _performInitialization(data) {
        try {
            this._playerName = data.playerName;
            this._userPrefs = data.userPrefs;

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

    getUserPreference(name) {
        try {
            let value = this._userPrefs[name];
            return value;
        } catch (error) {
            logError("getUserPreference", error);
        }
    }

    setUserPreference(name, value) {
        try {
            this._userPrefs[name] = value;
            let userPrefs = JSON.stringify(this._userPrefs);
            const macro = `[h:userName='${encodeURIComponent(this._playerName)}']
            [h:userPrefs='${encodeURIComponent(userPrefs)}']
            [h:js.setUserPreferences(userName, userPrefs)]`;
            evaluateMacro(macro);

        } catch (error) {
            logError("setUserPreference", error);
        }
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
                "private": item.private,
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
    getNoteBook = (title) => this._noteBooks.find(element => element.title === title);


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



/**
 * Library View
 */
class LibraryView extends AbstractBaseView {
    
    /**
     * Constructor of the library view class.
     */
    constructor() {
        super();

        this._asFrameCheckBox = document.getElementById("frame");
        this._booksList = document.getElementById("booksList");
    }


    /**
     * Initializes the view from a list of book items and a click handler
     * @param {JSON[]} items - List of json objects representing books.
     * @param {Function} handler - Button click handler.
     */
    initialize(items, handler) {
        try {
            if (items == undefined) {
                logError("Unable to build view.");
                return;
            }

            for (let item of items) {
                this._createBookButton(item, handler);
            }
        } catch (error) {
            logError("Initialize", error);
        }
    }


    /**
     * 
     * @param {boolean} doSet - True if the notebook should open in a frame, otherwise a dialog. 
     */
    setAsFrame(doSet) {
        try {
            this._asFrameCheckBox.checked = doSet;
        } catch (error) {
            logError("setAsFrame", error);
        }
    }

    /**
     * Defines the onChange event listener on the asFrame cbeckbox.
     * @param {Function} handler - onChange handler for the asFrame checkbox.
     */
    bindAsFrameChecked(handler) {
        this._asFrameCheckBox.addEventListener('change', event => {
            handler(event.target.checked);
        });
    }

    /**
     * Creates a book button based on the supplied json object and onClick event handler.
     * @param {JSON} item - A book object with necessary data.
     * @param {Function} handler - onClick handler for the book button.
     */
    _createBookButton(item, handler) {
        try {
            // Create the button
            let button = this.createElement("button", {
                id: btoa(item.title),
                className: "button",
                title: decodeURIComponent(item.summary)
            });
            button.addEventListener("click", event => {
                handler(event.currentTarget.id, this._asFrameCheckBox.checked ? 1 : 0);
            });


            // Create the text for button
            let content = this.createElement("p", {
                style: `--accent-bg:${item.accent}`,
                className: "accent",
                innerText: decodeURIComponent(item.title)
            });
            button.appendChild(content);


            // Lock image if book is private
            if (item.private == "true") {
                let image = this.createElement("img", {
                    src: "./images/key.png",
                    title: `Owner: ${item.owner}`,
                    width: "16px",
                });
                button.appendChild(image);
            }


            // Create list item and add button.
            let listItem = document.createElement("li");
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
class LibraryController extends AbstractBaseController {
    /**
     * 
     * @param {LibraryModel} model - The library model object
     */
    _onControllerConnected(model) {

        let asFrame = model.getUserPreference("asFrame") == "true";
        let titles = model.listTitles();

        this._view.setAsFrame(asFrame);
        this._view.initialize(titles, this._openBookHandler);
        this._view.bindAsFrameChecked(this._openAsFrameHandler);
    }


    /**
     * openBook handler connecting view and model.
     * @param {string} id - Id of the book being opened.
     * @param {Boolean} asFrame - Whether the book should opened in a frame or dialog.
     */
    _openBookHandler = (id, asFrame) => { this._model.openBook(id, asFrame); }


    /**
     * Saves the user's 'asFrame' preference
     * @param {boolean} isChecked - Value of the asFrame reference
     */
    _openAsFrameHandler = (isChecked) => { this._model.setUserPreference("asFrame", isChecked); }
}


/**
 * 
 */
try {
    new LibraryController(new LibraryModel(), new LibraryView());
} catch (error) {
    logError("Library initialization error", error);
}