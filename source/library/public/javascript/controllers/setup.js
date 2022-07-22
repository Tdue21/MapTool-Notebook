"use strict";

class Model {
    constructor() {
        try {
            let p = MapTool.getUserData();

            p.then((r) => {
                try {
                    let decoded = atob(r);
                    let data = JSON.parse(decoded);

                    this.defaultTheme = data.defaultTheme;
                    this.pcOutput = data.pcOutput;
                    this.gmOutput = data.gmOutput;
                    this.pcAudio = data.pcAudio;
                    this.gmAudio = data.gmAudio;
                    this.diceSize = data.diceSize;
                    this.search = data.search;
                    this.audioClips = data.audioClips.split(",");
                    this.loadOnStart = data.loadOnStart;
                } catch (error) {
                    console.log("Error: " + error);
                }
                this._connected(this);
            }, (e1) => {
                console.log("Error getting library data: " + e1);
                this._connectFailed(e1);
            });
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    onConnect() {
        let p = new Promise((resolve, reject) => {
            this._connected = resolve;
            this._connectFailed = reject;
        });
        return p;
    }

    saveData() {
        try {
            let data = {
                "defaultTheme": this.defaultTheme,
                "pcOutput": this.pcOutput,
                "gmOutput": this.gmOutput,
                "pcAudio": this.pcAudio,
                "gmAudio": this.gmAudio,
                "diceSize": this.diceSize,
                "search": this.search,
                "audioClips": this.audioClips.join(),
                "loadOnStart": this.loadOnStart
            };
            let json = JSON.stringify(data);
            let encoded = btoa(json);
            fetch("macro:helpers/ProcessSetup@lib:net.dovesoft.notebook", { method: "POST", body: encoded });
        } catch (error) {
            console.log("Error: " + error);
        }
    }
}

class View {
    constructor() {
        try {
            this._defaultTheme = document.getElementById("defaultTheme");
            this._pcOutput = document.getElementById("pcOutput");
            this._gmOutput = document.getElementById("gmOutput");
            this._pcAudio = document.getElementById("pcAudio");
            this._gmAudio = document.getElementById("gmAudio");
            this._diceSize = document.getElementById("diceSize");
            this._search = document.getElementById("search");
            this._audioClips = document.getElementById("audioClips");
            this._loadOnStart = document.getElementById("loadOnStart");

            this.loadSelectOptions(this._pcOutput, "all");
            this.loadSelectOptions(this._gmOutput, "self");
            this.loadSelectOptions(this._pcAudio, "all");
            this.loadSelectOptions(this._gmAudio, "self");
            
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    loadSelectOptions(select, defValue) {
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

    get defaultTheme() { return this._defaultTheme.value; }
    set defaultTheme(value) { this._defaultTheme.value = value; }

    get pcOutput() { return this._pcOutput.value; }
    set pcOutput(value) { this._pcOutput.value = value; }

    get gmOutput() { return this._gmOutput.value; }
    set gmOutput(value) { this._gmOutput.value = value; }

    get pcAudio() { return this._pcAudio.value; }
    set pcAudio(value) { this._pcAudio.value = value; }

    get gmAudio() { return this._gmAudio.value; }
    set gmAudio(value) { this._gmAudio.value = value; }

    get diceSize() { return this._diceSize.value; }
    set diceSize(value) { this._diceSize.value = value; }

    get search() { return this._search.value; }
    set search(value) { this._search.value = value; }

    get loadOnStart() { return this._loadOnStart.checked; }
    set loadOnStart(value) { this._loadOnStart.checked = value; }

    get audioClips() { return this._audioClips.value; }
    set audioClips(value) { this._audioClips.checked = value; }
}

class Controller {
    /**
     * @param {Model} model 
     * @param {View} view 
     */
    constructor(model, view) {
        try {
            this.model = model;
            this.view = view;

            this.model
                .onConnect()
                .then(m => { setupView(m); },
                    error => { console.log(error); }
                );
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    setupView(model) {
        this.view.defaultTheme = model.defaultTheme;
        this.view.pcOutput = model.pcOutput;
        this.view.gmOutput = model.gmOutput;
        this.view.pcAudio = model.pcAudio;
        this.view.gmAudio = model.gmAudio;
        this.view.diceSize = model.diceSize;
        this.view.search = model.search;
        this.view.loadOnStart = model.loadOnStart ? 1 : 0;
        this.view.audioClips = model.audioClips.join("\n");
    }

    submit() {
        this.model.saveData();
    }

    cancel() {
    }
}

const app = new Controller(new Model(), new View());                
