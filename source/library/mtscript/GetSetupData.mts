[h:broadcast("GetSetupData starting")]

[h:setupData = json.set("{}",
                    "defaultTheme", getLibProperty("defaultTheme"),
                    "search",       getLibProperty("search"),
                    "diceSize",     getLibProperty("diceSize"),
                    "pcOutput",     getLibProperty("pcOutput"),
                    "gmOutput",     getLibProperty("gmOutput"),
                    "gmAudio",      getLibProperty("gmAudio"),
                    "pcAudio",      getLibProperty("pcAudio"),
                    "audioClips",   json.toList(getLibProperty("audioClips")),
                    "loadOnStart",  getLibProperty("loadOnStart")
                )]
[h:broadcast("<pre>" + json.indent(setupData) + "</pre>")]                
[r:setupData]

[h:broadcast("GetSetupData Done")]