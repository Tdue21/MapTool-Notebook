/**
 * 
 */
class ShowBookModel {

    constructor() {
        MapTool.getUserData().then(
            (d) => {
                this._parseData(d);
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

    _parseData(rawData) {
        try {
            let decoded = atob(rawData);
            let data = JSON.parse(decoded);

            this.bookData = {
                "title": data.title,
                "summary": data.summary,
                "owner": data.owner,
                "private": data.private,
                "accent": data.accent,
                "pages": data.pages
            };
            this.pages = data.pages;

            for (let page of this.pages) {
                if (page.uri) {
                    const macro = `[h:uri="${page.uri}"]
                    [h:ns="${namespace}"]
                    [r:data.getStaticData(ns, uri)]`;

                    evaluateMacro(macro, data => {
                        page.content = data;
                        page.readOnly = true;
                    });
                } else {
                    page.readOnly = false;
                }
            }
        } catch (error) {
            logError("Error parsing book", error);
        }
    }

    getPageContent(name) {
        let page = this.pages.find(page => page.name === name);
        if (page) {
            return page.content;
        } else {
            return "Undefined page. Something went wrong, sorry :(";
        }
    }

    editBook() {
        const closeData = {
            "kind": MapTool.getKind(),
            "name": MapTool.getName(),
            "book": this.bookData
        };
        evaluateMacro(`[h:js.closeNotebook("${transEncode(closeData)}")]`);
        evaluateMacro(`[h:js.editBook("${transEncode(closeData)}")]`);
    }
}

/**
 * 
 */
class ShowBookView {
    _pages = [];

    constructor() {
        try {
            this._root = document.documentElement;
            this._vh = new ViewHelpers();

            this.editBookClicked = new EventManager();
            this.pageLinkClicked = new EventManager();

            this._bookTitle = this._vh.getElement("#bookTitle");
            this._summaryEntry = this._vh.getElement("#summaryEntry");
            this._ownerSpan = this._vh.getElement("#footerOwner");
            this._indexPanel = this._vh.getElement("#indexPanel");
            this._pageIndex = this._vh.getElement("#pageIndex");
            this._pagePanel = this._vh.getElement("#pagePanel");
            this._editBook = this._vh.getElement("#editBook");
        } catch (error) {
            logMessage("view ctor", error);
        }
    }

    initialize(bookData, pages) {
        try {
            this._bookTitle.innerText = bookData.title;
            this._ownerSpan.innerText = bookData.owner;
            this._summary = bookData.summary;
            this._accent = bookData.accent != "" ? bookData.accent : "#a8a5ca";
            this._pagePanel.innerHTML = this._summary;

            let tc = tinycolor(this._accent);

            let bg = tc.toHexString();
            let fg = tc.isLight() ? 'black' : 'white';
            let hbg = tc.darken(10).toHexString();
            let hfg = tinycolor(hbg).isLight() ? 'black' : 'white';
            let abg = tc.darken(20).toHexString();
            let afg = tinycolor(abg).isLight() ? 'black' : 'white';

            this._root.style.setProperty('--accent-bg', bg);
            this._root.style.setProperty('--accent-hover-bg', hbg);
            this._root.style.setProperty('--accent-active-bg', abg);

            this._root.style.setProperty('--accent-fg', fg);
            this._root.style.setProperty('--accent-hover-fg', hfg);
            this._root.style.setProperty('--accent-active-fg', afg);

            pages.forEach(page => this._createPageLink(page.name));

            this._summaryEntry.addEventListener("click", () => this._pagePanel.innerHTML = this._summary);
            this._editBook.addEventListener("click", () => this.editBookClicked.trigger());

        } catch (error) {
            logError("set accent", error);
        }
    }

    _createPageLink(pageName) {
        try {
            let link = this._vh.createElement("span", {
                id: btoa(pageName),
                innerText: pageName
            });
            link.addEventListener("click", event => this.pageLinkClicked.trigger(event.target.id));
            let div = this._vh.createElement("div", { className: "entry" });
            div.appendChild(link);

            let item = document.createElement("li");
            item.appendChild(div);

            this._pageIndex.appendChild(item);

        } catch (error) {
            logError("createPageLink", error);
        }
    }

    showPage(content) {
        evaluateMacro(`[h:data="${btoa(content)}"][r:js.parseMarkDown(data)]`, (d) => {
            this._pagePanel.innerHTML = d;
        });
    }
}

/**
 * 
 */
class ShowBookController {

    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._model.onConnect().then(
            (d) => this._onControllerConnected(d),
            (e) => logError("controller.onConnect", e)
        );
    }

    _onControllerConnected(model) {
        this._view.initialize(model.bookData, model.pages);
        this._view.pageLinkClicked.addListener(id => this._pageClickHandler(id));
        this._view.editBookClicked.addListener(() => this._model.editBook());
    }

    _pageClickHandler = (data) => {
        try {
            let name = atob(data);
            let content = this._model.getPageContent(name);
            this._view.showPage(content);
        } catch (error) {
            logError("Error onClick", error);
        }
    }
}

try {
    new ShowBookController(new ShowBookModel(), new ShowBookView());
} catch (error) {
    logError("Global error", error);
}