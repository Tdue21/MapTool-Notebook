[h:broadcast("OnInitializingLibrary starting")]

[h:staticData=data.getStaticData("net.dovesoft.notebook", "public/data/settings.json")]
[h:base64Data=base64.encode(staticData)]
[h:setLibProperty("Settings", base64Data)]

[h:broadcast("OnInitializingLibrary done")]
