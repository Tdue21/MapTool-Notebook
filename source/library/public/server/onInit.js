try {
    const updateLink = "https://raw.githubusercontent.com/Tdue21/MapTool-Notebook/master/build/latest.txt";
    const latest = MTScript.evalMacro(`[r:REST.get("${updateLink}")]`);
    //const latest = "0.1.0";
    const downloadLink = `https://github.com/Tdue21/MapTool-Notebook/releases/download/v${latest}/Notebook-${latest}.mtlib`;

    const libData = MT.getLibraryInfo(ns);
    let welcome = `<div 
style="width:100%;border:1px solid #888;border-right-width:2px;border-bottom-width:2px;background-color:#ccc;padding:5px">
Loaded <b>${libData.name}</b> library<br>
Installed version: ${libData.version}.<br>
Latest version: ${latest}.<br>`;

    if(latest > libData.version){
        welcome += `<b>An upload is available. Download <font color="blue"><a href="${downloadLink}">now</a>!</font></b><br>`;
    }
    welcome += `</div>`;

    MapTool.chat.broadcast(welcome);

    showOverlay();
} catch (e) {
    MT.printException(printWelcome.name, e);
}
