[h:broadcast("OpenNotebook called")]
[h:broadcast(decode(macro.args))]
[h:html.dialog5("Notebook - " + decode(macro.args), "lib://net.dovesoft.notebook/html/show.html?name="+macro.args, "width=600; height=600; temporary=1; noframe=0; input=1")]