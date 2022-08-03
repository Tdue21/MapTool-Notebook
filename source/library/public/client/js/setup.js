"use strict";
try {
    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class Model {
        constructor() {
            try {
                let p = MapTool.getUserData();
                p.then(
                    (data) => {
                        this._loadData(data);
                        this._connected(this);
                    }, (e1) => {
                        logError("Error getting library data", e1);
                        this._connectFailed(e1);
                    });
            } catch (error) {
                logError("Model ctor error", error);
            }
        }

        onConnect() {
            try {
                let p = new Promise((resolve, reject) => {
                    this._connected = resolve;
                    this._connectFailed = reject;
                });
                return p;

            } catch (error) {
                logError("onConnect error", error);
            }
        }

        _loadData(encoded) {
            try {
                let decoded = atob(encoded);
                let data = JSON.parse(decoded);

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
                logError("loadData error", error);
            }
        }

        /**
         * 
         * @param {Boolean} doSave 
         */
        saveData(doSave) {
            try {
                let encoded = "";
                if (doSave) {
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
                    encoded = btoa(json);
                }
                evaluateMacro(`[h:data="${encoded}"][h:js.saveSetup(data)]`);
                //evaluateMacro(`[h:data="${encoded}"][h:broadcast("Settings: " + data)][h:js.saveSetup(data)]`);
            } catch (error) {
                logError("saveData error", error);
            }
        }
    }

    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
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

                this._saveButton = document.getElementById("submit");
                this._cancelButton = document.getElementById("cancel");

                this.loadSelectOptions(this._pcOutput, "all");
                this.loadSelectOptions(this._gmOutput, "self");
                this.loadSelectOptions(this._pcAudio, "all");
                this.loadSelectOptions(this._gmAudio, "self");
            } catch (error) {
                logError("View ctor error", error);
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

        get audioClips() { return this._audioClips.value; }
        set audioClips(value) { this._audioClips.value = value; }

        get loadOnStart() { return this._loadOnStart.checked; }
        set loadOnStart(value) { this._loadOnStart.checked = value; }

        bindDefaultTheme = (handler) => { this.addValueEventHandler(this._defaultTheme, "change", handler); }
        bindPcOutput = (handler) => { this.addValueEventHandler(this._pcOutput, "change", handler); }
        bindGmOutput = (handler) => { this.addValueEventHandler(this._gmOutput, "change", handler); }
        bindPcAudio = (handler) => { this.addValueEventHandler(this._pcAudio, "change", handler); }
        bindGmAudio = (handler) => { this.addValueEventHandler(this._gmAudio, "change", handler); }
        bindDiceSize = (handler) => { this.addValueEventHandler(this._diceSize, "input", handler); }
        bindSearch = (handler) => { this.addValueEventHandler(this._search, "input", handler); }
        bindAudioClips = (handler) => { this.addValueEventHandler(this._audioClips, "input", handler); }

        bindLoadOnStart(handler) {
            this._loadOnStart.addEventListener("change", event => {
                if (event.target.type === "checkbox")
                    handler(event.target.checked);
            });
        }

        bindSubmitButton(handler) {
            this._saveButton.addEventListener("click", () => {
                handler(true);
            });
        }
        bindCancelButton(handler) {
            this._cancelButton.addEventListener("click", () => {
                handler(false);
            });
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
                logError("loadSelectOptions error", error);
            }
        }

        addValueEventHandler(element, eventName, handler) {
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
            try {
                this.model = model;
                this.view = view;

                this.model.onConnect().then(
                    (m) => { this.setupView(m); },
                    (e) => { logError("Controller onConnect error", e); }
                );
            } catch (error) {
                logError("Controller ctor error", error);
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

                this.view.bindDefaultTheme(this.handleThemeChange);
                this.view.bindPcOutput(this.handlePcOutputChange);
                this.view.bindGmOutput(this.handleGmOutputChange);
                this.view.bindPcAudio(this.handlePcAudioChange);
                this.view.bindGmAudio(this.handleGmAudioChange);
                this.view.bindDiceSize(this.handleDiceSizeChange);
                this.view.bindSearch(this.handleSearchChange);
                this.view.bindAudioClips(this.handleAudioClipsChange);
                this.view.bindLoadOnStart(this.handleLoadOnStartChange);

                this.view.bindSubmitButton(this.doSubmit);
                this.view.bindCancelButton(this.doSubmit);
            } catch (error) {
                logError("setupView error", error);
            }
        }

        handleThemeChange = (value) => { this.model.defaultTheme = value; }
        handlePcOutputChange = (value) => { this.model.pcOutput = value; }
        handleGmOutputChange = (value) => { this.model.gmOutput = value; }
        handlePcAudioChange = (value) => { this.model.pcAudio = value; }
        handleGmAudioChange = (value) => { this.model.gmAudio = value; }
        handleDiceSizeChange = (value) => { this.model.diceSize = value; }
        handleSearchChange = (value) => { this.model.search = value; }
        handleAudioClipsChange = (value) => { this.model.audioClips = value; }
        handleLoadOnStartChange = (value) => { this.model.loadOnStart = value; }

        /**
         * 
         * @param {Boolean} doSave -- Indicates which button was clicked.
         */
        doSubmit = (doSave) => {
            try {
                this.model.saveData(doSave);
            } catch (error) {
                logError(`doSubmit(${doSave}) error`, error);
            }
        }
    }

    /***************************************************************************
     * Entry point. 
     ***************************************************************************/
    const app = new Controller(new Model(), new View());
} catch (error) {
    logError("Global error", e);
}   