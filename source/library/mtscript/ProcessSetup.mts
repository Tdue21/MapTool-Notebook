[h:broadcast("ProcessSetup starting")]

[h:'<!--broadcast("<pre>" + json.indent(macro.args) + "</pre>")-->']

[h:submit=json.get(macro.args, "submit")]
[h,if(submit == "ok"),code:{
    [h:setLibProperty("Settings", macro.args)]
};{}]

[h:broadcast("ProcessSetup Done")]