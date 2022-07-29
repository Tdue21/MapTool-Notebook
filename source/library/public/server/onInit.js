try {
    const libData = MT.getLibraryInfo(ns);
    const welcome = `<div 
style="width:100%;border:1px solid #888;border-right-width:2px;border-bottom-width:2px;background-color:#ccc;padding:5px">
Loaded <b>${libData.name}</b> library<br>
Version: ${libData.version}.<br>
</div>`;

    MapTool.chat.broadcast(welcome);
} catch (e) {
    MT.printException(printWelcome.name, e);
}
