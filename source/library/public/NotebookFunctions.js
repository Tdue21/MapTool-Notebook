"use strict";

MapTool.chat.broadcast("UDF Prefix:" + UDFPrefix);
MapTool.chat.broadcast("UDF Namespace:" + UDFNameSpace);

function setLibProperty(name, value) {
    MTScript.execMacro(`[h:setLibProperty("${name}", "${value}", "${UDFNameSpace}")]`);
}

function getLibProperty(name) {
    return MTScript.execMacro(`[r:getLibProperty("${name}", "${UDFNameSpace}")]`);
}

function getLibraryInfo(ns) {
    return MTScript.execMacro(`[r:library.getInfo("${ns}")]`);
}

function getDefinedFunctions(delim) {
    return MTScript.execMacro(`[r:getDefinedFunctions("${delim}")]`);
}

function getStaticData(namespace, path) {
    return MTScript.execMacro(`[r:data.getStaticData("${namespace}", "${path}")]`)
}

function fetchNotebooks() {
    try {
        let rawData = getLibProperty("Notebooks");
        MapTool.chat.broadcast("Raw Data: " + rawData);
        let decodedData = decodeURI(rawData);
        MapTool.chat.broadcast("Decoded Data: " + decodedData);

        let notebooks = (rawData != "") ? JSON.parse(decodedData) : {};
        return notebooks;
    } catch (e) {
        MapTool.chat.broadcast("" + e + "\r\n" + e.stack);
    }
}

function printWelcome() {
    try {
        const rawData = getLibraryInfo(UDFNameSpace);
        const libData = (rawData != "") ? JSON.parse(rawData) : { name: "", libVersion: "" };
        const libName = libData.name;
        const libVersion = libData.version;
        const rawUdfs = getDefinedFunctions("json");

        let udfs = rawUdfs != "" ? JSON.parse(rawUdfs) : [];
        let functions = [];
        for (let udf of udfs) {
            if (udf.name.startsWith(UDFPrefix)) {
                functions.push(udf.name)
            }
        }

        const welcome = `
<div style="width:100%;border:1px solid #888;border-right-width:2px;border-bottom-width:2px;background-color:#ccc;padding:5px">
    Loaded <b>${libName}</b> library<br>
    Version: ${libVersion}.<br>
    User-defined functions: <br>
    <ul>
        <li>${functions.join('</li><li>')}</li>
    </ul>
</div>`;
        MapTool.chat.broadcast(welcome);
    } catch (e) {
        MapTool.chat.broadcast("An exception occured: " + e + "\r\n" + e.stack);
    }
}

MTScript.registerMacro("printWelcome", printWelcome);
MTScript.registerMacro("fetchNotebooks", fetchNotebooks);
