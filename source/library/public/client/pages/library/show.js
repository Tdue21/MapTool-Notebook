"use strict";
try {

    /*************************************************************************
     * About model. Responsible for getting the library info displayed 
     * in the about box.
     * @class
     *************************************************************************/
    class Model {
        constructor() {
            let p = MapTool.getUserData();
            p.then(
                (d) => {
                    this._parseData(d);
                    this._connected(this);
                }, (e1) => {
                    console.log("Error getting library data: " + e1);
                    this._connectFailed(e1);
                });
        }

        onConnect() {
            let p = new Promise((resolve, reject) => {
                this._connected = resolve;
                this._connectFailed = reject;
            });
            return p;
        }

        _parseData(d) {
            try {

                let decoded = atob(d);
                let data = JSON.parse(decoded);
                this.title = data.title;
                this.summary = data.summary;
                this.owner = data.owner;
                this.private = data.private;
                this.accent = data.accent;
                this.pages = data.pages;
            } catch (error) {
                console.log("Error parsing book: " + error);
            }
        }
    }

    /*************************************************************************
     * About view. Responsible for displaying the library data on the about page.
     * @class
     *************************************************************************/
    class View {

        _accent;
        _pages = [];

        constructor() {
            try {
                this._root = document.documentElement;
                this._title = document.getElementById("bookTitle");
                this._summary = document.getElementById("summaryText");
                this._summaryTooltip = document.getElementById("summaryTooltip");
                this._image = document.getElementById("lock");
                this._indexPanel = document.getElementById("indexPanel");
                this._pagePanel = document.getElementById("pagePanel");
                this._pageIndex = document.getElementById("pageIndex");
            } catch (error) {
                logMessage("view ctor", error);
            }
        }

        get title() { return this._title.innerText; }
        set title(value) { this._title.innerText = value; }

        get summary() { return this._summary.innerText; }
        set summary(value) {
            this._summary.innerText = value;
            this._summaryTooltip.innerText = value;
        }

        get accent() { return this._accent; }
        set accent(value) {
            try {
                this._accent = value;

                let tc = tinycolor(value);

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
            } catch (error) {
                logMessage("set accent", error);
            }
        }

        /**
         * 
         * @param {any[]} pages 
         */
        setPages(pages, clickHandler) {
            for (let page of pages) {
                let link = document.createElement("span");
                link.innerText = page.title;
                link.id = btoa(JSON.stringify(page));
                link.addEventListener("click", event => {
                    clickHandler(event.target.id);
                });

                let div = document.createElement("div");
                div.className = "entry";
                div.appendChild(link);

                let item = document.createElement("li");
                item.appendChild(div);

                this._pageIndex.appendChild(item);
            }
        }

        showPage(content) {
            this._pagePanel.innerText = content;
        }
    }

    /*************************************************************************
     * About controller. Responsible for tying everything together. 
     * @class
     *************************************************************************/
    class Controller {
        constructor(model, view) {
            this.model = model;
            this.view = view;

            this.model.onConnect().then(
                (m) => {
                    this.view.title = m.title;
                    this.view.summary = m.summary;
                    this.view.accent = m.accent;
                    this.view.setPages(m.pages, this.indexClickedHandler);
                },
                (e) => { console.log("onConnect error: " + e + "\r\n" + e.stack); }
            );
        }

        indexClickedHandler = (data) => {
            if (debugOn) {
                console.log("clicked: " + data);
            }
            let page = JSON.parse(atob(data));
            this.view.showPage(page.content);
        }
    }

    /*************************************************************************
     * Entry point. 
     *************************************************************************/
    const app = new Controller(new Model(), new View());


} catch (error) {
    console.log("Error: " + error + "\r\n" + error.stack);
}


/*

        (async () => {
            const isgm = (await isGM()) == 1;
            const playerName = await getPlayerName();
            const image = document.getElementById("lock");
            const pageIndex = document.getElementById("pageIndex");

            let locked = false;

            let data = {
                "title": "User Guide",
                "summary": "User guide for MapTool notebook add-on.",
                "owner": "Gert",
                "private": false,
                "pages": {
                    "0. Introduction": "content of page 1",
                    "1. First section": "content of page 2",
                    "2. second section": "content of page 3",
                    "3. third section": "content of page 4"
                }
            };

            function setLocked(isLocked) {
                image.src = (isLocked)
                    ? "../images/locked.png"
                    : "../images/unlocked.png";
            }

            function toggleLocked() {
                if (isgm || data.owner == playerName) {
                    setLocked(locked);
                    locked = !locked;
                }
            }
            image.addEventListener("click", toggleLocked);

            locked = data.private;
            setLocked(locked);

            dataBind("title", "innerText", data);
            dataBind("summary", "innerText", data);

            let indexContent = "";
            let keys = Object.keys(data.pages);            
            for(let key of keys) {
                indexContent += `<li>
                    <a href="lib://net.dovesoft.notebook/showPage?title=${encodeURI(key)}&content=${encodeURI(data.pages[key])}">${key}</a>
                </li>`;
            }
            pageIndex.innerHTML = indexContent;
        })();

*/