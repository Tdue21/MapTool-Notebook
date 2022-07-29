"use strict";

/**
 * Function for checking whether builtin notebooks, like the user manual is up to date. 
 * If not, they are automatically updated. 
 */
function checkBuiltinUpdates() {
    try {
        MapTool.chat.broadcast("Checking for updates to built-in notebooks.");

        let initialData = getStaticData(ns, "public/data/userguide.json");
        const data = JSON.parse(initialData);
        const newVersion = data.version;
        const oldVersion = Number(getLibProperty("notebookversion"));

        if (newVersion > oldVersion) {
            MapTool.chat.broadcast("Updating built-in notebooks");
            let allData = getLibProperty("notebooks", UDFNameSpace);
            MapTool.chat.broadcast("<pre>" + allData + "</pre>");
            let allNotebooks = JSON.parse(allData);
            
            MapTool.chat.broadcast(JSON.stringify(allNotebooks));


            let keys = Object.keys(data);
            for (let key of keys) {
                if (key == "version") {
                    continue;
                }
                let notebook = data[key];
                MapTool.chat.broadcast(JSON.stringify(notebook));

            }
        }


        /*

        [setLibProperty("notebookversion", 0, "net.dovesoft.notebook")]


        [h:'<!-- -------------------------------------------------------- -->']
        [h:'<!-- Check builtin notebooks for updates.                     -->']
        [h:'<!-- -------------------------------------------------------- -->']
        [h:initialData=data.getStaticData(nameSpace, "data/userguide.json")]
        [h:]
        [h:newversion=number(json.get(initialData, "version"))]
        [h,if(newversion > oldversion),code: {
        [h,if(newversion > oldversion),code: {
            [h:broadcast("Updating builtin notebooks")]
            [h:setLibProperty("notebookversion", newversion)]
            [h:builtin=json.get(initialData, "builtin")]
            [h:setLibProperty("Notebooks", encode(builtin))]
        };{}]*/

    } catch (e) {
        printException(checkBuiltinUpdates.name, e);
    }
}

/**
 * Fetch all notebooks currently in store. 
 * @returns {json} A json object containing all notebooks.
 */
function fetchNotebooks() {
    try {
        let rawData = getLibProperty("Notebooks");
        MapTool.chat.broadcast("Raw Data: " + rawData);
        let decodedData = decodeURI(rawData);
        MapTool.chat.broadcast("Decoded Data: " + decodedData);

        let notebooks = (rawData != "") ? JSON.parse(decodedData) : {};
        return notebooks;
    } catch (e) {
        printException(fetchNotebooks.name, e);
    }
}

//MTScript.registerMacro("fetchNotebooks", fetchNotebooks);
//MTScript.registerMacro("checkBuiltinNotebooks", checkBuiltinUpdates);
