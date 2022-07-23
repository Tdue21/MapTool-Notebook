"use strict";
console.log("pre class");

/***************************************************************************
 * 
 * @class
 ***************************************************************************/
class Model {
    #connected;
    #connectFailed;

    constructor() {
        try {
            console.log("Model.ctor 1");
            //let p = MapTool.getUserData();

            let uri = "macro:helpers/GetSetupData@lib:net.dovesoft.notebook";
            let p = fetch(uri, { method: "POST" });
            console.log("Model.ctor 2. p: " + p);

            p.then((r) => {
                r.text().then(
                    (data) => {
                        console.log("fetch().then");
                        this.#loadData(data);
                        this.#connected(this);
                    }, (e2) => {
                        console.log("Error reading data: " + e2 + "\r\n" + e2.stack);
                        this.#connectFailed(e2);
                    })
            }, (e1) => {
                console.log("Error getting library data: " + e1 + "\r\n" + e1.stack);
                this.#connectFailed(e1);
            });
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }

    onConnect() {
        console.log("onConnect()")
        try {
            let p = new Promise((resolve, reject) => {
                this.#connected = resolve;
                this.#connectFailed = reject;
            });
            return p;

        } catch (error) {
            console.log("onConnect error: " + error + "\r\n" + error.stack);
        }
    }

    #loadData(r) {
        try {
            console.log("r: " + r);
            let decoded = atob(r);
            console.log("d: " + decoded);
            let data = JSON.parse(decoded);
            console.log("j: " + data);

            this.defaultTheme = data.defaultTheme;
            this.pcOutput = data.pcOutput;
            this.gmOutput = data.gmOutput;
            this.pcAudio = data.pcAudio;
            this.gmAudio = data.gmAudio;
            this.diceSize = data.diceSize;
            this.search = data.search;
            this.audioClips = data.audioClips.replaceAll(",", "\n");
            this.loadOnStart = data.loadOnStart;
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }

    saveData() {
        console.log("savedata")
        try {
            let data = {
                "defaultTheme": this.defaultTheme,
                "pcOutput": this.pcOutput,
                "gmOutput": this.gmOutput,
                "pcAudio": this.pcAudio,
                "gmAudio": this.gmAudio,
                "diceSize": this.diceSize,
                "search": this.search,
                "audioClips": this.audioClips.replace("\n", ","),
                "loadOnStart": this.loadOnStart
            };
            let json = JSON.stringify(data);
            let encoded = btoa(json);
            console.log("calling fetch")
            fetch("macro:helpers/SaveSetupData@lib:net.dovesoft.notebook", { method: "POST", body: encoded });
            console.log("called fetch")
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }
}

/***************************************************************************
 * 
 * @class
 ***************************************************************************/
class View {
    #defaultTheme;
    #pcOutput;
    #gmOutput;
    #pcAudio;
    #gmAudio;
    #diceSize;
    #search;
    #audioClips;
    #loadOnStart;
    #saveButton;
    #cancelButton;

    constructor() {
        try {
            this.#defaultTheme = document.getElementById("defaultTheme");
            this.#pcOutput = document.getElementById("pcOutput");
            this.#gmOutput = document.getElementById("gmOutput");
            this.#pcAudio = document.getElementById("pcAudio");
            this.#gmAudio = document.getElementById("gmAudio");
            this.#diceSize = document.getElementById("diceSize");
            this.#search = document.getElementById("search");
            this.#audioClips = document.getElementById("audioClips");
            this.#loadOnStart = document.getElementById("loadOnStart");

            this.#saveButton = document.getElementById("submit");
            this.#cancelButton = document.getElementById("submit");

            this.#loadSelectOptions(this.#pcOutput, "all");
            this.#loadSelectOptions(this.#gmOutput, "self");
            this.#loadSelectOptions(this.#pcAudio, "all");
            this.#loadSelectOptions(this.#gmAudio, "self");
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }

    get defaultTheme() { return this.#defaultTheme.value; }
    set defaultTheme(value) { this.#defaultTheme.value = value; }

    get pcOutput() { return this.#pcOutput.value; }
    set pcOutput(value) { this.#pcOutput.value = value; }

    get gmOutput() { return this.#gmOutput.value; }
    set gmOutput(value) { this.#gmOutput.value = value; }

    get pcAudio() { return this.#pcAudio.value; }
    set pcAudio(value) { this.#pcAudio.value = value; }

    get gmAudio() { return this.#gmAudio.value; }
    set gmAudio(value) { this.#gmAudio.value = value; }

    get diceSize() { return this.#diceSize.value; }
    set diceSize(value) { this.#diceSize.value = value; }

    get search() { return this.#search.value; }
    set search(value) { this.#search.value = value; }

    get audioClips() { return this.#audioClips.value; }
    set audioClips(value) { this.#audioClips.value = value; }

    bindDefaultTheme = (handler) => { this.#addValueEventHandler(this.#defaultTheme, "change", handler); }
    bindPcOutput = (handler) => { this.#addValueEventHandler(this.#pcOutput, "change", handler); }
    bindGmOutput = (handler) => { this.#addValueEventHandler(this.#gmOutput, "change", handler); }
    bindPcAudio = (handler) => { this.#addValueEventHandler(this.#pcAudio, "change", handler); }
    bindGmAudio = (handler) => { this.#addValueEventHandler(this.#gmAudio, "change", handler); }
    bindDiceSize = (handler) => { this.#addValueEventHandler(this.#diceSize, "input", handler); }
    bindSearch = (handler) => { this.#addValueEventHandler(this.#search, "input", handler); }
    bindAudioClips = (handler) => { this.#addValueEventHandler(this.#audioClips, "input", handler); }

    bindLoadOnStart(handler) {
        this.#loadOnStart.addEventListener("change", event => {
            if (event.target.type === "checkbox")
                handler(event.target.checked);
        });
    }

    bindSubmitButton(handler) {
        this.#saveButton.addEventListener("click", event => {
            handler();
        });
    }

    bindCancelButton(handler) {
        this.#cancelButton.addEventListener("click", event => {
            handler();
        });
    }

    #loadSelectOptions(select, defValue) {
        try {
            const targets = ["all", "self", "gm", "gm-self", "not-self", "not-gm", "not-gm-self", "none"];
            let innerHtml = "";
            for (let target of targets) {
                innerHtml += `<option ${target == defValue ? "selected" : ""}>${target}</option>`;
            }
            select.innerHTML = innerHtml;
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    #addValueEventHandler(element, eventName, handler) {
        element.addEventListener(eventName, event => {
            handler(event.target.value);
        });
    }
}

/***************************************************************************
 * 
 * @class
 ***************************************************************************/
class Controller {
    /**
     * @param {Model} model 
     * @param {View} view 
     */
    constructor(model, view) {
        console.log("controller.ctor");
        try {
            this.model = model;
            this.view = view;

            this.model.onConnect().then(
                (m) => { this.setupView(m); }, 
                (e) => { console.log("onConnect error: " + e + "\r\n" + e.stack); }
            );
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }

    setupView(model) {
        try {
            this.view.defaultTheme = model.defaultTheme;
            this.view.pcOutput = model.pcOutput;
            this.view.gmOutput = model.gmOutput;
            this.view.pcAudio = model.pcAudio;
            this.view.gmAudio = model.gmAudio;
            this.view.diceSize = model.diceSize;
            this.view.search = model.search;
            this.view.loadOnStart = model.loadOnStart;
            this.view.audioClips = model.audioClips;

            this.view.bindDefaultTheme(this.#handleThemeChange);
            this.view.bindPcOutput(this.#handlePcOutputChange);
            this.view.bindGmOutput(this.#handleGmOutputChange);
            this.view.bindPcAudio(this.#handlePcAudioChange);
            this.view.bindGmAudio(this.#handleGmAudioChange);
            this.view.bindDiceSize(this.#handleDiceSizeChange);
            this.view.bindSearch(this.#handleSearchChange);
            this.view.bindAudioClips(this.#handleAudioClipsChange);
            this.view.bindLoadOnStart(this.#handleLoadOnStartChange);

            this.view.bindSubmitButton(this.submit);
            this.view.bindCancelButton(this.cancel);
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }

    #handleThemeChange = (value) => { this.model.defaultTheme = value; }
    #handlePcOutputChange = (value) => { this.model.pcOutput = value; }
    #handleGmOutputChange = (value) => { this.model.gmOutput = value; }
    #handlePcAudioChange = (value) => { this.model.pcAudio = value; }
    #handleGmAudioChange = (value) => { this.model.gmAudio = value; }
    #handleDiceSizeChange = (value) => { this.model.diceSize = value; }
    #handleSearchChange = (value) => { this.model.search = value; }
    #handleAudioClipsChange = (value) => { this.model.audioClips = value; }
    #handleLoadOnStartChange = (value) => { this.model.loadOnStart = value; }

    submit = () => {
        try {
            console.log("submit called");
            this.model.saveData();
        } catch (error) {
            console.log("Error: " + error + "\r\n" + error.stack);
        }
    }

    cancel = () => { }
}

/***************************************************************************
 * Entry point. 
 ***************************************************************************/
console.log("pre app");
const app = new Controller(new Model(), new View());                



/*
let fetch = (uri, options) => {
    if(options.body) { console.log("Saving: " + options.body); }
    else { return new Promise(r => r(new Response("eyJkZWZhdWx0VGhlbWUiOiJFbGVnYW50Iiwic2VhcmNoIjoiaHR0cHM6Ly93d3cuZG5kYmV5b25kLmNvbS9zZWFyY2g/cT0iLCJkaWNlU2l6ZSI6MTAwLCJwY091dHB1dCI6ImFsbCIsImdtT3V0cHV0Ijoic2VsZiIsImdtQXVkaW8iOiJzZWxmIiwicGNBdWRpbyI6ImFsbCIsImxvYWRPblN0YXJ0IjpmYWxzZSwiYXVkaW9DbGlwcyI6Imh0dHBzOi8vZ2l0aHViLmNvbS9ydGFrZWhhcmEvNWUtRnJhbWV3b3JrL2Jsb2IvbWFzdGVyL1Jlc291cmNlcy9BdWRpbyUyMENsaXBzL0RpY2UlMjAxLndhdixodHRwczovL2dpdGh1Yi5jb20vcnRha2VoYXJhLzVlLUZyYW1ld29yay9ibG9iL21hc3Rlci9SZXNvdXJjZXMvQXVkaW8lMjBDbGlwcy9EaWNlJTIwMi53YXYsaHR0cHM6Ly9naXRodWIuY29tL3J0YWtlaGFyYS81ZS1GcmFtZXdvcmsvYmxvYi9tYXN0ZXIvUmVzb3VyY2VzL0F1ZGlvJTIwQ2xpcHMvRGljZSUyMDMud2F2LGh0dHBzOi8vZ2l0aHViLmNvbS9ydGFrZWhhcmEvNWUtRnJhbWV3b3JrL2Jsb2IvbWFzdGVyL1Jlc291cmNlcy9BdWRpbyUyMENsaXBzL0RpY2UlMjA0LndhdixodHRwczovL2dpdGh1Yi5jb20vcnRha2VoYXJhLzVlLUZyYW1ld29yay9ibG9iL21hc3Rlci9SZXNvdXJjZXMvQXVkaW8lMjBDbGlwcy9EaWNlJTIwNS53YXYsaHR0cHM6Ly9naXRodWIuY29tL3J0YWtlaGFyYS81ZS1GcmFtZXdvcmsvYmxvYi9tYXN0ZXIvUmVzb3VyY2VzL0F1ZGlvJTIwQ2xpcHMvRGljZSUyMDYud2F2LGh0dHBzOi8vZ2l0aHViLmNvbS9ydGFrZWhhcmEvNWUtRnJhbWV3b3JrL2Jsb2IvbWFzdGVyL1Jlc291cmNlcy9BdWRpbyUyMENsaXBzL0RpY2UlMjA3LndhdixodHRwczovL2dpdGh1Yi5jb20vcnRha2VoYXJhLzVlLUZyYW1ld29yay9ibG9iL21hc3Rlci9SZXNvdXJjZXMvQXVkaW8lMjBDbGlwcy9EaWNlJTIwOC53YXYsaHR0cHM6Ly9naXRodWIuY29tL3J0YWtlaGFyYS81ZS1GcmFtZXdvcmsvYmxvYi9tYXN0ZXIvUmVzb3VyY2VzL0F1ZGlvJTIwQ2xpcHMvRGljZSUyMDkud2F2LGh0dHBzOi8vZ2l0aHViLmNvbS9ydGFrZWhhcmEvNWUtRnJhbWV3b3JrL2Jsb2IvbWFzdGVyL1Jlc291cmNlcy9BdWRpbyUyMENsaXBzL0RpY2UlMjEwLndhdixodHRwczovL2dpdGh1Yi5jb20vcnRha2VoYXJhLzVlLUZyYW1ld29yay9ibG9iL21hc3Rlci9SZXNvdXJjZXMvQXVkaW8lMjBDbGlwcy9EaWNlJTIxMS53YXYifQ=="))); }
}
*/