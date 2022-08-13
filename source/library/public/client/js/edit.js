/*
 * description of model's purpose.
 */
class EditBookModel {
    constructor() {
        MapTool.getUserData().then(
            (d) => {
                this._dataLoaded(d);
                this._connected(this);
            },
            (e) => this._connectFailed(e));
    }

    /*
     * onConnected must be called first to ensure model has loaded its data.
     */
    onConnect() {
        return new Promise((resolve, reject) => {
            this._connected = resolve;
            this._connectFailed = reject;
        });
    }

    /*
     * Implement this method to handle the userData received in the constructor.
     */
    _dataLoaded(data) {
        this.bookData = transDecode(data);
    }
}


/*
 * description of view's purpose.
 */
class EditBookView {
    constructor() {
        this._vh = new ViewHelpers();

        this._bookTitle = this._vh.getElement("#bookTitle");
        this._bookSummary = this._vh.getElement("#bookSummary");
        this._private = this._vh.getElement("#private");
        this._colorPicker = this._vh.getElement("#colorPicker");
    }

    /*
     * Implement this method for view initialization.
     */
    initialize(bookData) {
        this._bookTitle.value = bookData.title;
        this._bookSummary.value = bookData.summary;
        this._private.checked = bookData.private === "true";
        this._colorPicker.color = bookData.accent;

    }
}


/*
 * description of controller's purpose.
 */
class EditBookController {
    constructor(model, view) {
        this._model = model;
        this._view = view;
        this._model.onConnect().then(
            (m) => this._onControllerConnected(m),
            (e) => this._handleConnectionError(e));
    }

    /*
     * Implement this method for controller initialization.
     */
    _onControllerConnected(model) {
        this._view.initialize(model.bookData);
    }

    _handleConnectionError(error) {
        console.log("Error: " + error.message);
    }
}

new EditBookController(new EditBookModel(), new EditBookView());

/*
(async () => {
    try {
        let data = await getEditNotebookArgs();
        let noteName = decodeURI(data.name);
        let caption = document.getElementById("caption");
        if (noteName == "new") {
            caption.innerText = "Create Notebook";
            return;
        }

        caption.innerText = "Edit Notebook - " + noteName;
        data = await getNotebookData(noteName);

        let bookData = {
            name: noteName,
            summary: data.summary,
            owner: data.owner,
            private: data.private
        };

        dataBind("name", "value", bookData)
        dataBind("summary", "value", bookData)
        dataBind("private", "checked", bookData)

        const table = document.getElementById("pageList");
        let pageList = table.innerHTML;

        let keys = Object.keys(data.pages);

        for(let key of keys) {
            let page = data.pages[key];
            console.log(`${key} == ${page}`);
            let pageData = `<tr><td>${key}</td>
                <td><img src="../images/edit.png"></td>
                <td><img src="../images/delete.png"></td>
                </tr>`;
            pageList += pageData;
        }
        table.innerHTML = pageList;

    } catch (error) {
        console.log("Error: " + error + "\r\n" + error.stack)
    }
})();
*/