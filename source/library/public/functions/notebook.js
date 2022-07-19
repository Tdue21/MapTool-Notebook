import {
    getLibProperty,
    setLibProperty,
    printException
} from "./testshims.js"

/**
 * Class definition of Notebook. This class contains data for a single 
 * notebook and methods to manipulate this. 
 */
export class Notebook {
    #title = undefined;
    #summary = undefined;
    #owner = undefined;
    #private = undefined;
    #pages = {};

    get title() { return this.#title; }
    set title(value) { this.#title = value; }

    get summary() { return this.#summary; }
    set summary(value) { this.#summary = value; }

    get owner() { return this.#owner; }
    set owner(value) { this.#owner = value; }

    get private() { return this.#private; }
    set private(value) { this.#private = value; }

    get pages() { return this.#pages; }

    /**
     * 
     * @param {*} json 
     */
    loadFromJson(json) {
        try {
            let notebook = JSON.parse(json);
            if (notebook != undefined) {
                this.title = notebook.title;
                this.summary = notebook.summary;
                this.owner = notebook.owner;
                this.private = notebook.private;
                
                let keys = Object.keys(notebook.pages);
                for(let key of keys) {
                    const data = notebook.pages[key];
                    this.pages[key] = data;
                }
            }
        } catch (error) {
            printException(this.loadBook.name, error);
        }
    }

    /**
     * Load a notebook from storage and populates the properties with data.
     * @param {String} name - Unique name of notebook to load.
     */
    loadBook(name) {
        try {
            let allData = getLibProperty("notebooks");
            let notebooks = JSON.parse(allData);
            let notebook = notebooks[name];
            this.loadFromJson(JSON.stringify(notebook));
        } catch (error) {
            printException(this.loadBook.name, error);
        }
    }

    /**
     * Saves the current notebook to storage. An existing entry will be overwritten. 
     */
    saveBook() {
        try {
            let allData = getLibProperty("notebooks");
            let notebooks = JSON.parse(allData);
            let notebook = {
                title : this.title,
                summary : this.summary,
                owner : this.owner,
                private : this.private,
                pages : {}
            };
            let keys = Object.keys(this.pages);
            for(let key of keys) {
                let data = this.pages[key];
                notebook.pages[key] = data;
            }
            notebooks[this.title] = notebook;
            setLibProperty("notebooks", JSON.stringify(notebooks));
        } catch (error) {
            printException(this.saveBook.name, error);
        }
    }

    /**
     * 
     * @param {*} title 
     * @param {*} content 
     */
    addPage(title, content) {
        try {
            this.pages[title] = content;
        } catch (error) {
            printException(this.addPage.name, error);
        }
    }

    /**
     * 
     * @param {*} title 
     */
    removePage(title) {
        try {
            if (this.pages[title] != undefined) {
                delete this.pages[title]
            }
        } catch (error) {
            printException(this.removePage.name, error);
        }
    }
}
