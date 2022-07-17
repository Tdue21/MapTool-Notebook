[h:broadcast("OnInitializingLibrary starting")]

[h:staticData=data.getStaticData("net.dovesoft.notebook", "data/settings.json")]
[h:initialData=json.get(staticData, "settings")]
[h:setLibProperty("Settings", initialData)]

[h:broadcast("OnInitializingLibrary done")]
