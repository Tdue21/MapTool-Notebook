try {
    let namespace = "net.dovesoft.notebook";
    let scripts = [
        `server/marked.umd.min.js`,
        `server/MTShims.js`,
        `server/helpers.js`,
        `server/functions.js`,
        `server/markdown.js`
    ];

    for (let script of scripts) {
        MTScript.setVariable("ns", namespace);
        MTScript.setVariable("script", `lib://${namespace}/${script}?cachelib=false`);
        MTScript.evalMacro("[r:js.evalURI(ns, script)]");
    }

    showWelcome();
    showOverlay();
} catch (e) {
    MT.printException("onInit error", e);
}
