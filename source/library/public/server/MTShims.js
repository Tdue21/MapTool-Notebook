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
     * Returns information about the library associated with the supplied namespace.
     * @param {string} ns - Namespace of the library.
     * @returns {json} Object with library info.
     */
     static getLibraryInfo(ns) {
        MTScript.setVariable("ns", ns);
        let value = MTScript.evalMacro("[r:library.getInfo(ns)]");
        return JSON.parse(value);
    }
    

    /**
     * Returns the value of a property from a library property. 
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
     * Sets the supplied library property of the associated namespace to 
     * the supplied value.
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
     * Reads the static data from the supplied path in the supplied namespace.
     * @param {string} ns - Name of the library to use.
     * @param {string} path - Path of the resource to get.
     * @returns {string} - Content of the resource. If it's an image, an asset id is returned.
     */
    static getStaticData(ns, path) {
        MTScript.setVariable("ns", ns);
        MTScript.setVariable("path", path);
        return MTScript.evalMacro("[r:data.getStaticData(ns, path)]");
    }


    /**
     * Formats and prints a message with an error and stack trace to the chat window.
     * @param {string} message - The message to print.
     * @param {Error} error - The error to print.
     */
    static printException = (message, error) => MapTool.chat.broadcast(`<div style="border: 2px solid red; background: #ccc"><h4>${message}</h4><pre>${error}\n${error.stack}</pre></div>`);


    /**
     * Formats and prints a message to the chat window.
     * @param {string} message - The message to print.
     */
    static printMessage = (message) => MapTool.chat.broadcast(`<div style="border: 2px solid #444; background: #ccc">${message}</div>`);


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
     * Encodes the supplied text to base64.
     * @param {string} data - The plain string text.
     * @returns {string} The encoded base64 string.
     */
    static btoa(data) {
        MTScript.setVariable("jsData", data);
        return MTScript.evalMacro("[r:base64.encode(jsData)]");
    }


    /**
     * Decodes a base64 encode string to plain text.
     * @param {string} data - The encoded string.
     * @returns {string} The decoded text.
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
     * @param {string} name 
     * @param {string} uri 
     * @param {string} options 
     */
    static showOverlay(name, uri, options){
        MTScript.setVariable("name", name);
        MTScript.setVariable("uri", uri);
        MTScript.setVariable("options", options);

        MTScript.evalMacro("[h:html.overlay(name, uri, options)]");
    }


    /**
     * 
     * @param {string} name 
     */
    static closeOverlay(name) {
        MTScript.setVariable("name", name);
        MTScript.evalMacro("[h:closeOverlay(name)]");
    }


    /**
     * 
     * @param {string} name 
     * @returns  {boolean}
     */
    static isOverlayRegistered(name) {
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:isOverlayRegistered(name)]") === 1;
    }


    /**
     * 
     * @param {string} name 
     * @returns  {boolean}
     */
     static isOverlayVisible(name) {
        MTScript.setVariable("name", name);
        return MTScript.evalMacro("[r:isOverlayVisible(name)]") === 1;
    }


    /**
     * 
     * @param {string} name 
     * @param {boolean} visible
     */
     static setOverlayVisible(name, visible) {
        MTScript.setVariable("name", name);
        MTScript.setVariable("visible", visible ? 1 : 0);
        MTScript.evalMacro("[r:setOverlayVisible(name, visible)]");
    }
}