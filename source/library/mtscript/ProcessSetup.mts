[h:broadcast("ProcessSetup starting")]

[h:broadcast("<pre>" + json.indent(macro.args) + "</pre>")]
[h:submit=json.get(macro.args, "submit")]
[h,if(submit == "ok"),code:{

    [h:setLibProperty("defaultTheme", json.get(macro.args, "defaultTheme"))]
    [h:setLibProperty("search",       json.get(macro.args, "search"))]
    [h:setLibProperty("diceSize",     json.get(macro.args, "diceSize"))]
    [h:setLibProperty("pcOutput",     json.get(macro.args, "pcOutput"))]
    [h:setLibProperty("gmOutput",     json.get(macro.args, "gmOutput"))]
    [h:setLibProperty("gmAudio",      json.get(macro.args, "gmAudio"))]
    [h:setLibProperty("pcAudio",      json.get(macro.args, "pcAudio"))]
    [h:setLibProperty("audioClips",   json.get(macro.args, "audioClips"))]
    [h:setLibProperty("loadOnStart",  json.get(macro.args, "loadOnStart"))]
};{}]

[h:broadcast("ProcessSetup Done")]