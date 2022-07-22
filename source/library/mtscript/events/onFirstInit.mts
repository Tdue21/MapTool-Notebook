[h:broadcast("OnInitializingLibrary starting")]

[h:staticData=data.getStaticData("net.dovesoft.notebook", "public/data/settings.json")]
[h:broadcast("<pre>" + json.indent(staticData) + "</pre>")]
[h:base64Data=base64.encode(staticData)]
[h:broadcast("<pre>" + base64Data + "</pre>")]
[h:setLibProperty("Settings", base64Data)]

[h:broadcast("OnInitializingLibrary done")]
