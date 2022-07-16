[h:broadcast("GetSetupData starting")]

[h:setupData=getLibProperty("Settings")]
[r:setupData]

[h:'<!--broadcast("<pre>" + json.indent(setupData) + "</pre>")-->']
[h:broadcast("GetSetupData Done")]