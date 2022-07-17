[h:name=decode(macro.args)]
[h:title = if(name == "new", "Create Notebook", "Edit Notebook - " + name)]
[h:setLibProperty("editNotebookArgs", json.set("{}", "name", macro.args))]
[h:html.dialog5(title, "lib://net.dovesoft.notebook/html/edit.html?name="+macro.args, "width=600; height=600; temporary=1; noframe=0; input=1")]