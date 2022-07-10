[h:broadcast("OnInitializingLibrary starting")]

[h:initialData=data.getStaticData("net.dovesoft.notebook", "data/settings.json")]
[h:broadcast("<pre>" + json.indent(initialData) + "</pre>")]

[h:fields=json.fields(initialData)]
[h,foreach(field,fields,""),code:{
    [h:value=json.get(initialData, field)]
    [h:setLibProperty(field, value)]

    [h:broadcast("Writing '" + field + "' with value: " + value)]
}]

[h:broadcast("OnInitializingLibrary done")]
