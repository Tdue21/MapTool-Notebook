// @ ts-check

/**
 * Setup Model
 */
class SetupModel extends AbstractBaseModel {

    /**
     * 
     * @param {JSON} userData
     */
    dataLoaded(userData) {
        try {
            const data = JSON.parse(JSON.stringify(userData));

            this.defaultTheme = data.defaultTheme;
            this.pcOutput = data.pcOutput;
            this.gmOutput = data.gmOutput;
            this.pcAudio = data.pcAudio;
            this.gmAudio = data.gmAudio;
            this.diceSize = data.diceSize;
            this.search = data.search;
            this.loadOnStart = data.loadOnStart;
            this.audioClips = data.audioClips.replaceAll(",", "\n");
        } catch (error) {
            logError("loadData error", error);
        }
    }


    /**
     * 
     * @returns {*} - 
     */
    getData() {
        return {
            "defaultTheme": this.defaultTheme,
            "pcOutput": this.pcOutput,
            "gmOutput": this.gmOutput,
            "pcAudio": this.pcAudio,
            "gmAudio": this.gmAudio,
            "diceSize": this.diceSize,
            "search": this.search,
            "loadOnStart": this.loadOnStart,
            "audioClip": this.audioClips
        };
    }
    /**
     * 
     */
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
                "audioClips": this.audioClips.replace("\n", ","),
                "loadOnStart": this.loadOnStart
            };
            evaluateMacro(`[h:data="${data}"][h:js.saveSetup(data)]`);
            this.closeSetup();
        } catch (error) {
            logError("saveData error", error);
        }
    }

    closeSetup() {
        try {
            evaluateMacro(`[h:js.closeSetup()]`);
        } catch (error) {
            logError("closeSetup error", error);
        }
    }
}


class SetupView extends AbstractBaseView {

    viewInitialization() {
        try {
            this._defaultTheme = this._getElement("#defaultTheme");
            this._pcOutput = this._getElement("#pcOutput");
            this._gmOutput = this._getElement("#gmOutput");
            this._pcAudio = this._getElement("#pcAudio");
            this._gmAudio = this._getElement("#gmAudio");
            this._diceSize = this._getElement("#diceSize");
            this._search = this._getElement("#search");
            this._loadOnStart = this._getElement("#loadOnStart");
            this._audioClips = this._getElement("#audioClips");

            this._saveButton = this._getElement("#submit");
            this._cancelButton = this._getElement("#cancel");

            this.loadSelectOptions(this._pcOutput, "all");
            this.loadSelectOptions(this._gmOutput, "self");
            this.loadSelectOptions(this._pcAudio, "all");
            this.loadSelectOptions(this._gmAudio, "self");

            this.onChangeEvent = new EventManager();
        } catch (error) {
            logError("View ctor", error);
        }
    }


    /**
     * 
     * @param {JSON} modelData - 
     */
    initializeData(modelData) {
        try {

            this._defaultTheme.value = modelData.defaultTheme;
            this._pcOutput.value = modelData.pcOutput;
            this._gmOutput.value = modelData.gmOutput;
            this._pcAudio.value = modelData.pcAudio;
            this._gmAudio.value = modelData.gmAudio;
            this._diceSize.value = modelData.diceSize;
            this._search.value = modelData.search;
            this._loadOnStart.checked = modelData.loadOnStart;
            this._audioClips.value = modelData.audioClips;
        } catch (error) {
            logError("view.initialize", error);
        }
    }

    // bindDefaultTheme = (handler) => { this.addValueEventHandler(this._defaultTheme, "change", handler); }
    // bindPcOutput = (handler) => { this.addValueEventHandler(this._pcOutput, "change", handler); }
    // bindGmOutput = (handler) => { this.addValueEventHandler(this._gmOutput, "change", handler); }
    // bindPcAudio = (handler) => { this.addValueEventHandler(this._pcAudio, "change", handler); }
    // bindGmAudio = (handler) => { this.addValueEventHandler(this._gmAudio, "change", handler); }
    // bindDiceSize = (handler) => { this.addValueEventHandler(this._diceSize, "input", handler); }
    // bindSearch = (handler) => { this.addValueEventHandler(this._search, "input", handler); }
    // bindAudioClips = (handler) => { this.addValueEventHandler(this._audioClips, "input", handler); }

    // bindLoadOnStart = (handler) => {
    //     this._loadOnStart.addEventListener("change", event => {
    //         if (event.target.type === "checkbox")
    //             handler(event.target.checked);
    //     });
    // }

    // bindSubmitButton = (handler) => {
    //     this._saveButton.addEventListener("click", () => {
    //         handler(true);
    //     });
    // }
    // bindCancelButton = (handler) => {
    //     this._cancelButton.addEventListener("click", () => {
    //         handler(false);
    //     });
    // }

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

    _addValueEventHandler(element, eventName, handler) {
        element.addEventListener(eventName, event => {
            handler(event.target.value);
        });
    }
}


/**
 * 
 */
class SetupController {

    /**
     * 
     * @param {SetupModel} model 
     * @param {SetupView} view 
     */
    constructor(model, view) {
        try {
            this._model = model;
            this._view = view;
            this.self = this;

            this._model.onConnect().then(
                (model) => this.onControllerConnected(model),
                (error) => this.handleConnectionError(error));
        } catch (error) {
            logError("baseCtrl.ctor", error);
        }
    }

    /**
     * 
     * @param {Error} error 
     */
    handleConnectionError(error) {
        logError(`${self.constructor.name}.onConnected`, error);
    }
    /**
     * 
     * @param {SetupModel} model - 
     */
    onControllerConnected = (model) => {
        try {

            let data = JSON.parse(JSON.stringify(model.getData()));
            this._view.initializeData(data);


            // this._view.bindDefaultTheme(this.handleThemeChange);
            // this._view.bindPcOutput(this.handlePcOutputChange);
            // this._view.bindGmOutput(this.handleGmOutputChange);
            // this._view.bindPcAudio(this.handlePcAudioChange);
            // this._view.bindGmAudio(this.handleGmAudioChange);
            // this._view.bindDiceSize(this.handleDiceSizeChange);
            // this._view.bindSearch(this.handleSearchChange);
            // this._view.bindAudioClips(this.handleAudioClipsChange);
            // this._view.bindLoadOnStart(this.handleLoadOnStartChange);

            // this._view.bindSubmitButton(this.doSubmit);
            // this._view.bindCancelButton(this.doSubmit);
        } catch (error) {
            logError("setupView error", error);
        }
    }

    // handleThemeChange = (value) => { this._model.defaultTheme = value; }
    // handlePcOutputChange = (value) => { this._model.pcOutput = value; }
    // handleGmOutputChange = (value) => { this._model.gmOutput = value; }
    // handlePcAudioChange = (value) => { this._model.pcAudio = value; }
    // handleGmAudioChange = (value) => { this._model.gmAudio = value; }
    // handleDiceSizeChange = (value) => { this._model.diceSize = value; }
    // handleSearchChange = (value) => { this._model.search = value; }
    // handleAudioClipsChange = (value) => { this._model.audioClips = value; }
    // handleLoadOnStartChange = (value) => { this._model.loadOnStart = value; }

    // /**
    //  * 
    //  * @param {Boolean} doSave -- Indicates which button was clicked.
    //  */
    // doSubmit = (doSave) => {
    //     try {
    //         this._model.saveData(doSave);
    //     } catch (error) {
    //         logError(`doSubmit(${doSave}) error`, error);
    //     }
    // }
}


try {
    const app = new SetupController(new SetupModel(), new SetupView());
} catch (error) {
    logError("App", error);
}