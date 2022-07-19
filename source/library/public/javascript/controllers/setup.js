class Model {
    /**
     * @param {json} data 
     */
    constructor(data) {
        this.theme = data.defaultTheme;
        this.pcOutput = data.pcOutput;
        this.gmOutput = data.gmOutput;
        this.pcAudio = data.pcAudio;
        this.gmAudio = data.gmAudio;
        this.diceSize = data.diceSize;
        this.search = data.search;
        this.audioClips = data.audioClips.split(",");
        this.loadOnStart = data.loadOnStart;
    }   
}

class View {
    constructor() {
        this.defaultTheme = getElement("defaultTheme");
        this.pcOutput     = getElement("pcOutput");
        this.gmOutput     = getElement("gmOutput");
        this.pcAudio      = getElement("pcAudio");
        this.gmAudio      = getElement("gmAudio");
        this.diceSize     = getElement("diceSize");
        this.search       = getElement("search");
        this.audioClips   = getElement("audioClips");
        this.loadOnStart  = getElement("loadOnStart");
    }

    getElement(selector) {
        document.getElementById(selector);
    }
}

class Controller {
    /**
     * @param {Model} model 
     * @param {View} view 
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}






    /*
dataBind("defaultTheme", "value", data);
dataBind("pcOutput    ", "value", data);
dataBind("gmOutput    ", "value", data);
dataBind("pcAudio     ", "value", data);
dataBind("gmAudio     ", "value", data);
dataBind("diceSize    ", "value", data);
dataBind("search      ", "value", data);
dataBind("audioClips  ", "value", data);
dataBind("loadOnStart ", "checked", data);*/
