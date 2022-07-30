try {
    const ns = "net.dovesoft.notebook";

    let data = MT.getStaticData(ns, "/public/server/data/settings.json");
    let encoded = MT.btoa(data);
    MT.setLibProperty("Settings", encoded, ns);
    
} catch (error) {
    MapTool.chat.broadcast("OnFirstInit Error: " + error + "\r\n" + error.stack);
}
