/**
 * Show Book model
 * This class is responsible for the current notebook
 * data.
 * @class
 */
class ShowBookModel extends AbstractBaseModel {
    /**
     * Intializes the ShowBookModel object.
     */
    constructor() {
        super();

        MapTool.getUserData().then(
            (d) => this._parseData(d),
            (e) => this._connectFailed(e));
    }


    /**
     * Parse the notebook data and presents it for the controller. 
     * @param {string} rawData - raw data for the notebook. 
     */
    _parseData(rawData) {
        try {
            let decoded = atob(rawData);
            let data = JSON.parse(decoded);

            this.title = data.title;
            this.summary = data.summary;
            this.owner = data.owner;
            this.private = data.private;
            this.accent = data.accent;
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
        this._connected(this);
    }

    /**
     * 
     * @param {*} name 
     * @returns 
     */
    getPageContent(name) {
        let page = this.pages.find(page => page.name === name);
        if (page) {
            return page.content;
        } else {
            return "Undefined :(";
        }
    }
}


/**
 * 
 */
class ShowBookView extends AbstractBaseView {
    _pages = [];
    _root;
    _bookTitle;
    _summaryEntry;
    _indexPanel;
    _pageIndex;
    _pagePanel;
    _accent;
    _summary;
    _ownerSpan;

    constructor() {
        super();

        try {
            this._root = document.documentElement;

            this._bookTitle = document.getElementById("bookTitle");
            this._summaryEntry = document.getElementById("summaryEntry");
            this._ownerSpan = document.getElementById("footerOwner");
            this._indexPanel = document.getElementById("indexPanel");
            this._pageIndex = document.getElementById("pageIndex");
            this._pagePanel = document.getElementById("pagePanel");

            this._goFirst = document.getElementById("go-first");
            this._goPrev = document.getElementById("go-prev");
            this._goNext = document.getElementById("go-next");
            this._goLast = document.getElementById("go-last");
        } catch (error) {
            logMessage("view ctor", error);
        }
    }

    /**
     * 
     * @param {string} title 
     * @param {string} summary 
     * @param {string} owner 
     * @param {string} accent 
     * @param {JSON} pages 
     * @param {Function} clickHandler 
     */
    initialize(title, summary, owner, accent, pages, clickHandler) {
        try {
            this._bookTitle.innerText = title;
            this._ownerSpan.innerText = owner;
            this._summary = summary;
            this._accent = accent != "" ? accent : "#a8a5ca";

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

            pages.forEach(page => this._createPageLink(page.name, clickHandler));

            this._summaryEntry
                .addEventListener("click",
                    () => this._pagePanel.innerHTML = this._summary);

        } catch (error) {
            logError("set accent", error);
        }
    }

    _createPageLink(pageName, clickHandler) {
        try {
            let link = this.createElement("span", {
                id: btoa(pageName),
                innerText: pageName
            });
            link.addEventListener("click", event => clickHandler(event.target.id));

            let div = this.createElement("div", { className: "entry" });
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
class ShowBookController extends AbstractBaseController {

    /**
     * 
     * @param {ShowBookModel} model - The connected model.
     */
    _onControllerConnected(model) {

        this._view.initialize(model.title,
            model.summary,
            model.owner,
            model.accent,
            model.pages,
            this._pageClickHandler);
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

/**
 * 
 */
const app = new ShowBookController(new ShowBookModel(), new ShowBookView());