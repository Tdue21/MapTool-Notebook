"use strict";

/**
 * Checks if an object is json.
 * @param {*} obj - any object.
 * @returns true if the object is json, and false otherwise.
 */
 function isJson(obj) { try { JSON.parse(obj); } catch { return false; } return true; }


 /**
  * Helper function for building option string for dialogs. 
  * @param {number} width - width of the window.
  * @param {number} height - height of the window.
  * @param {string} data - user data to pass to the window.
  * @returns {string} - A complete options string to pass to a dialog.
  */
 function getDialogOptions(width, height, data) {
     return `width=${width}; height=${height}; temporary=1; noframe=0; input=1; value=${data}`;
 }
 
 
 /**
  * Helper function for reading the latest version of the library from github.
  * @returns A string containing the latest version.
  */
 function getLatestVersion() {
     const updateLink = "https://raw.githubusercontent.com/Tdue21/MapTool-Notebook/master/build/latest.txt";
     const latest = MTScript.evalMacro(`[r:REST.get("${updateLink}")]`);
     return latest;
 }
 

/**
 * Input a string containing a template, which can be anything really, but 
 * usually html and a json object containing options for the template. 
 * @param {string} template - string with the template.
 * @param {json} options - json object with options.
 * @returns {string} - returns the finished string.
 */
function evalTemplate(template, options) {
    let wrapper = "";
    try {
        wrapper = `"use strict";\r\n`;
        wrapper += `let options=${JSON.stringify(options)};\r\n`;
        wrapper += `let html=\`${template}\`;\r\n\r\nreturn html`;

        return Function(wrapper)();
    } catch (error) {
        MT.printException("evalTemplate: " + wrapper, error);
    }
}