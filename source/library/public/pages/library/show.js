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

        constructor() {
            try {
                this._title = document.getElementById("title");
                this._summary = document.getElementById("summary");
                this._image = document.getElementById("lock");
                this._pageIndex = document.getElementById("pageIndex");
            } catch (error) {
                logMessage("view ctor", error);
            }
        }

        get title() { return this._title.innerText; }
        set title(value) { this._title.innerText = value; }

        get summary() { return this._summary.innerText; }
        set summary(value) { this._summary.innerText = value; }

        /**
         * 
         * @param {Boolean} value 
         */
        setPrivate(isLocked) {
            this._image.src = (isLocked)
            ? "../../images/locked.png"
            : "../../images/unlocked.png";
        }

        /**
         * 
         * @param {any[]} pages 
         */
        setPages(pages) {
            for(let page of pages) {
                let item = document.createElement("li");
                let link = document.createElement("a");
                link.href = "macro://helpers/ShowPage@lib:net.dovesoft.notebook/none/Impersonated?data%3D" + btoa(JSON.stringify(page));
                link.innerText = page.title;
                item.appendChild(link);
                this._pageIndex.appendChild(item);
            }
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
                    this.view.setPrivate(m.private);
                    this.view.setPages(m.pages);
                },
                (e) => { console.log("onConnect error: " + e + "\r\n" + e.stack); }
            );
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