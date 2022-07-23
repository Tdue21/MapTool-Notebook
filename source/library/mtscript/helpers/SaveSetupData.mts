[h:broadcast(macro.args)]
[h:broadcast("<pre>" + json.indent(base64.decode(macro.args)) + "</pre>")]
[h:setLibProperty("Settings", macro.args)]