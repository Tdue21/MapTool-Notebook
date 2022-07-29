"use strict";

const ns = "net.dovesoft.notebook";

class MT {
    static getPlayerName() {
        return MTScript.evalMacro("[r:getPlayerName()]");
    }
    
    static getLibProperty(name, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:getLibProperty(name, ns)]");
    };

    static setLibProperty(name, value, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        MTScript.setVariable("value", value);
        return MTScript.evalMacro("[h:setLibProperty(name, value, ns)]");
    };

    static getLibraryInfo(ns) {
        MTScript.setVariable("ns", ns);
        let value = MTScript.evalMacro("[r:library.getInfo(ns)]");
        return JSON.parse(value);
    };

    static getStaticData(ns, path) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("path", path);
        return MTScript.evalMacro("[r:data.getStaticData(ns, path)]");
    }

    static printException = (caller, error) => {
        MapTool.chat.broadcast(`<pre>Exception in ${caller}: ${error}\r\n${error.stack}</pre>`);
    }

    static encode(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:encode(jsData)]");
    };

    static decode(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:decode(jsData)]");
    };

    static btoa(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.encode(jsData)]");
    };

    static atob(data) {
        MTScript.setVariable("_data", data);
        return MTScript.evalMacro("[r:base64.decode(_data)]");
    };

    static showDialog(title, uri, options) {
        // MapTool.chat.broadcast("title: " + title);
        // MapTool.chat.broadcast("uri: " + uri);
        // MapTool.chat.broadcast("options: " + options);

        MTScript.setVariable("title", title);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.dialog5(title, uri, options)]");
    }

    static closeDialog(dialogName) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.evalMacro("[h:closeDialog(dialogName)]");
    }
}