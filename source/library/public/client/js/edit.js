class EditBookModel {
    constructor() {
        MapTool.getUserData().then(
            (d) => {
                this._dataLoaded(d);
                this._connected(this);
            },
            (e) => this._connectFailed(e));
    }


    onConnect() {
        return new Promise((resolve, reject) => {
            this._connected = resolve;
            this._connectFailed = reject;
        });
    }


    _dataLoaded(data) {
        try {
            this.metaData = transDecode(data);
        } catch (error) {
            logError("model.dataLoad", error);
        }
    }


    addPage() {
        this.metaData.pages.push({"name": "New page", "content":""});
    }


    deletePage(pageName) {

    }
}


class EditBookView {
    constructor() {
        let _vh = new ViewHelpers();

        this.saveBookClicked = new EventManager();
        this.cancelChangesClicked = new EventManager();
        this.addPageClicked = new EventManager();
        this.deletePageClicked = new EventManager();
        this.deleteBookClicked = new EventManager();
        this.selectedPageChanged = new EventManager();

        this._pageCaption = _vh.getElement("#bookCaption");
        
        this._bookTitle = _vh.getElement("#bookTitle");
        this._bookSummary = _vh.getElement("#bookSummary");
        this._private = _vh.getElement("#private");
        this._colorPicker = _vh.getElement("#colorPicker");
        this._pageSelector = _vh.getElement("#pages");

        this._currentPageName = _vh.getElement("#currentPageName");
        this._currentPageText = _vh.getElement("#currentPageText");
        this._oldPageName = this._currentPageName.value;
     
        _vh.setupEventListener("#saveBook",      "click",  this.saveBookClicked);
        _vh.setupEventListener("#cancelChanges", "click",  this.cancelChangesClicked);
        _vh.setupEventListener("#addPage",       "click",  this.addPageClicked);
        _vh.setupEventListener("#deletePage",    "click",  this.deletePageClicked);
        _vh.setupEventListener("#deleteBook",    "click",  this.deleteBookClicked);
        _vh.setupEventListener("#pages",         "change", this.selectedPageChanged);
    }

    initialize(bookData) {
        if (bookData.book.title == "") {
            document.title = "Create notebook";
            this._pageCaption.innerText = "Create notebook";
            this._private.checked = false;
            this._colorPicker.color = "#a7d0ee";
            return;
        }

        document.title = "Edit notebook";
        this._pageCaption.innerText = "Edit notebook";
        this._bookTitle.value = bookData.book.title;
        this._bookSummary.value = bookData.book.summary;
        this._private.checked = bookData.book.private === "true";
        this._colorPicker.color = bookData.book.accent;
    }

    get bookTitle() { return this._bookTitle.value; }
    set bookTitle(value) { this._bookTitle.value = value; }

    get bookSummary() { return this._bookSummary.value; }
    set bookSummary(value) { this._bookSummary.value = value; }

    get isPrivate() { return this._private.value; }
    set isPrivate(value) { this._private.checked = value; }

    get accentColor() { return this._colorPicker.color; }
    set accentColor(value) { this._colorPicker.color = value; }

    get currentPageName() { return this._currentPageName.value; }
    set currentPageName(value) { this._currentPageName.value = value; }

    get currentPageText() { return this._currentPageText.value; }
    set currentPageText(value) { this._currentPageText.value = value; }
}


class EditBookController {
    constructor(model, view) {
        this._model = model;
        this._view = view;
        this._model.onConnect().then(
            (m) => this._onControllerConnected(m),
            (e) => this._handleConnectionError(e));
    }


    _onControllerConnected(model) {
        logMessage(JSON.stringify(model.metaData));
        this._view.initialize(model.metaData);

        this._view.addPageClicked.addListener(() => {
            this._model.AddPage();

        });

        this._view.deletePageClicked.addListener(() => {
            if(confirm("Are you sure you wish to delete this page?")) {
                this._model.deletePage(this._view.se);
            }
        });

        this._view.selectedPageChanged.addListener(() => {

        });

        this._view.saveBookClicked.addListener(() => {
            
        });

        this._view.cancelChangesClicked.addListener(() => {
            
        });

        this._view.deleteBookClicked.addListener(() => {
            
        });
   }

    _handleConnectionError(error) {
        console.log("Error: " + error.message);
    }
}

new EditBookController(new EditBookModel(), new EditBookView());
