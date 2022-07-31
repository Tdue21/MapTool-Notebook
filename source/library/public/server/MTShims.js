"use strict";

const ns = "net.dovesoft.notebook";

/**
 * Wrapper class containing shims for MapTool functions.
 */
class MT {
    /**
     * Returns the name of the current player.
     * @returns {string} Playername.
     */
    static getPlayerName() {
        return MTScript.evalMacro("[r:getPlayerName()]");
    }
    

    /**
     * Invokes the MTScript getLibProperty. 
     * @param {string} name - Name of the property to get.
     * @param {string} ns - Name(space) of the library to use.
     * @returns {string} The value of the property.
     */
    static getLibProperty(name, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:getLibProperty(name, ns)]");
    }


    /**
     * Invokes the MTScript setLibProperty. 
     * @param {string} name - Name of the property to set.
     * @param {string} value - Value of property.
     * @param {string} ns - Name(space) of the library to use.
     */
    static setLibProperty(name, value, ns) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("name", name);
        MTScript.setVariable("value", value);
        MTScript.evalMacro("[h:setLibProperty(name, value, ns)]");
    }


    /**
     * Invokes the MTScript library.getInfo.
     * @param {string} ns - Namespace of the library.
     * @returns {json} Object with library info.
     */
    static getLibraryInfo(ns) {
        MTScript.setVariable("ns", ns);
        let value = MTScript.evalMacro("[r:library.getInfo(ns)]");
        return JSON.parse(value);
    }


    /**
     * 
     * @param {*} ns 
     * @param {*} path 
     * @returns {string}
     */
    static getStaticData(ns, path) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("path", path);
        return MTScript.evalMacro("[r:data.getStaticData(ns, path)]");
    }


    /**
     * 
     * @param {string} caller 
     * @param {string} error 
     */
    static printException (caller, error) {
        MapTool.chat.broadcast(`<pre>Exception in ${caller}: ${error}\r\n${error.stack}</pre>`);
    }


    /**
     * 
     * @param {string} caller 
     * @param {string} message 
     */
    static printMessage(caller, message) {
        MapTool.chat.broadcast(`<pre>Message from ${caller}: ${message}</pre>`);
    }


    /**
     * 
     * @param {string} data 
     * @returns {string}
     */
    static encode(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:encode(jsData)]");
    }


    /**
     * 
     * @param {string} data 
     * @returns {string}
     */
    static decode(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:decode(jsData)]");
    }


    /**
     * 
     * @param {string} data 
     * @returns {string}
     */
    static btoa(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.encode(jsData)]");
    }


    /**
     * 
     * @param {string} data 
     * @returns {string}
     */
    static atob(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.decode(jsData)]");
    }


    /**
     * 
     * @param {*} title 
     * @param {*} uri 
     * @param {*} options 
     */
    static showDialog(title, uri, options) {
        MTScript.setVariable("title", title);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.dialog5(title, uri, options)]");
    }


    /**
     * 
     * @param {*} dialogName 
     */
    static closeDialog(dialogName) {
        MTScript.setVariable("dialogName", dialogName);
        MTScript.evalMacro("[h:closeDialog(dialogName)]");
    }


    /**
     * 
     * @param {*} title 
     * @param {*} uri 
     * @param {*} options 
     */
     static showFrame(title, uri, options) {
        MTScript.setVariable("title", title);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.frame5(title, uri, options)]");
    }


    /**
     * 
     * @param {*} frameName 
     */
    static closeFrame(frameName) {
        MTScript.setVariable("dialogName", frameName);
        MTScript.evalMacro("[h:closeFrame(dialogName)]");
    }


    /**
     * 
     * @param {*} name 
     * @param {*} uri 
     * @param {*} options 
     */
    static showOverlay(name, uri, options){
        MTScript.setVariable("name", name);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.overlay(name, uri, options)]");
    }


    /**
     * 
     * @param {*} name 
     */
    static closeOverlay(name) {
        MTScript.setVariable("name", name);
        MTScript.evalMacro("[h:closeOverlay(name)]");
    }
}