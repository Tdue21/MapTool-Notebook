try {
    let namespace = "net.dovesoft.notebook";
    let scripts = [
        `server/MTShims.js`,
        `server/functions.js`
    ];

    for (let script of scripts) {
        MTScript.setVariable("ns", namespace);
        MTScript.setVariable("script", `lib://${namespace}/${script}?cachelib=false`);
        MTScript.evalMacro("[r:js.evalURI(ns, script)]");
    }

    resetSettings();
} catch (error) {
    MT.printException("OnFirstInit Error", error);
}
