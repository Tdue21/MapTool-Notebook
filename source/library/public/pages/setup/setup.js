"use strict";
try {
    /*
    let testData = "eyJkZWZhdWx0VGhlbWUiOiJFbGVnYW50Iiwic2VhcmNoIjoiaHR0cHM6Ly93d3cuZG5kYmV5b25kLmNvbS9zZWFyY2g/cT0iLCJkaWNlU2l6ZSI6MTAwLCJwY09" +
                   "1dHB1dCI6ImFsbCIsImdtT3V0cHV0Ijoic2VsZiIsImdtQXVkaW8iOiJzZWxmIiwicGNBdWRpbyI6ImFsbCIsImxvYWRPblN0YXJ0IjpmYWxzZSwiYXVkaW9DbG" +
                   "lwcyI6Imh0dHBzOi8vZ2l0aHViLmNvbS9ydGFrZWhhcmEvNWUtRnJhbWV3b3JrL2Jsb2IvbWFzdGVyL1Jlc291cmNlcy9BdWRpbyUyMENsaXBzL0RpY2UlMjAxL" +
                   "ndhdixodHRwczovL2dpdGh1Yi5jb20vcnRha2VoYXJhLzVlLUZyYW1ld29yay9ibG9iL21hc3Rlci9SZXNvdXJjZXMvQXVkaW8lMjBDbGlwcy9EaWNlJTIwMi53" +
                   "YXYsaHR0cHM6Ly9naXRodWIuY29tL3J0YWtlaGFyYS81ZS1GcmFtZXdvcmsvYmxvYi9tYXN0ZXIvUmVzb3VyY2VzL0F1ZGlvJTIwQ2xpcHMvRGljZSUyMDMud2F" +
                   "2LGh0dHBzOi8vZ2l0aHViLmNvbS9ydGFrZWhhcmEvNWUtRnJhbWV3b3JrL2Jsb2IvbWFzdGVyL1Jlc291cmNlcy9BdWRpbyUyMENsaXBzL0RpY2UlMjA0Lndhdi" +
                   "xodHRwczovL2dpdGh1Yi5jb20vcnRha2VoYXJhLzVlLUZyYW1ld29yay9ibG9iL21hc3Rlci9SZXNvdXJjZXMvQXVkaW8lMjBDbGlwcy9EaWNlJTIwNS53YXYsa" +
                   "HR0cHM6Ly9naXRodWIuY29tL3J0YWtlaGFyYS81ZS1GcmFtZXdvcmsvYmxvYi9tYXN0ZXIvUmVzb3VyY2VzL0F1ZGlvJTIwQ2xpcHMvRGljZSUyMDYud2F2LGh0" +
                   "dHBzOi8vZ2l0aHViLmNvbS9ydGFrZWhhcmEvNWUtRnJhbWV3b3JrL2Jsb2IvbWFzdGVyL1Jlc291cmNlcy9BdWRpbyUyMENsaXBzL0RpY2UlMjA3LndhdixodHR" +
                   "wczovL2dpdGh1Yi5jb20vcnRha2VoYXJhLzVlLUZyYW1ld29yay9ibG9iL21hc3Rlci9SZXNvdXJjZXMvQXVkaW8lMjBDbGlwcy9EaWNlJTIwOC53YXYsaHR0cH" +
                   "M6Ly9naXRodWIuY29tL3J0YWtlaGFyYS81ZS1GcmFtZXdvcmsvYmxvYi9tYXN0ZXIvUmVzb3VyY2VzL0F1ZGlvJTIwQ2xpcHMvRGljZSUyMDkud2F2LGh0dHBzO" +
                   "i8vZ2l0aHViLmNvbS9ydGFrZWhhcmEvNWUtRnJhbWV3b3JrL2Jsb2IvbWFzdGVyL1Jlc291cmNlcy9BdWRpbyUyMENsaXBzL0RpY2UlMjEwLndhdixodHRwczov" +
                   "L2dpdGh1Yi5jb20vcnRha2VoYXJhLzVlLUZyYW1ld29yay9ibG9iL21hc3Rlci9SZXNvdXJjZXMvQXVkaW8lMjBDbGlwcy9EaWNlJTIxMS53YXYifQ==";
    let fetch = (uri, options) => {
        if(options.body) { 
            console.log("Saving: " + options.body); 
        } else { 
            return new Promise(r => r(new Response(testData))); 
        }
    }
    */
    /***************************************************************************
     * 
     * @class
     ***************************************************************************/
    class Model {
        constructor() {
            try {
                //let p = MapTool.getUserData();

                let uri = "macro:helpers/GetSetupData@lib:net.dovesoft.notebook";
                let p = fetch(uri, { method: "POST" });

                p.then((r) => {
                    r.text().then(
                        (data) => {
                            this._loadData(data);
                            this._connected(this);
                        }, (e2) => {
                            console.log("Error reading data: " + e2 + "\r\n" + e2.stack);
                            this._connectFailed(e2);
                        })
                }, (e1) => {
                    console.log("Error getting library data: " + e1 + "\r\n" + e1.stack);
                    this._connectFailed(e1);
                });
            } catch (error) {
                console.log("Error: " + error + "\r\n" + error.stack);
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
                console.log("onConnect error: " + error + "\r\n" + error.stack);
            }
        }

        _loadData(r) {
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
                this.audioClips = data.audioClips.replaceAll(",", "\n");
                this.loadOnStart = data.loadOnStart;
            } catch (error) {
                console.log("Error: " + error + "\r\n" + error.stack);
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

                fetch("macro:helpers/SaveSetupData@lib:net.dovesoft.notebook", { method: "POST", body: encoded });
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
                console.log("Error: " + error + "\r\n" + error.stack);
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
            this._saveButton.addEventListener("click", event => {
                handler(true);
            });
        }
        bindCancelButton(handler) {
            this._cancelButton.addEventListener("click", event => {
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
                console.log("Error: " + error);
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
                console.log("Error: " + error + "\r\n" + error.stack);
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
                console.log("Error: " + error + "\r\n" + error.stack);
            }
        }
    }

    /***************************************************************************
     * Entry point. 
     ***************************************************************************/
    const app = new Controller(new Model(), new View());

} catch (error) {
    console.log("Global error: " + e + "\r\n" + e.stack);
}   