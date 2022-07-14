[h:broadcast("GetSetupData starting")]
[h:fields=getLibPropertyNames()]
[h:broadcast(fields)]
[h:setupData="{}"]
[h,foreach(field, fields,""), code:{
    [h:value=getLibProperty(field)]
    [h:broadcast("Reading '" + field + "' - '" + value + "'")]
    [h:setupData=json.set(setupData, field, value)]
}]

[h:broadcast("<pre>" + json.indent(setupData) + "</pre>")]                
[r:setupData]

[h:broadcast("GetSetupData Done")]