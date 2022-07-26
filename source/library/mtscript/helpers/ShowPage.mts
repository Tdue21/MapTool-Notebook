[h:data=base64.decode(json.get(macro.args, "data"))]
[h:broadcast(data)]
[h:'<!-- html.dialog5("Notebook - " + json.get(data, "title"), "lib://net.dovesoft.notebook/pages/library/show.html",  "width=400; height=600; temporary=1; noframe=0; input=1; value="+macro.args) -->']