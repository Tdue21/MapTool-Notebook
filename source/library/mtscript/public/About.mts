[h:libData=library.getInfo("net.dovesoft.notebook")]
[h:version=json.get(libData, "version")]
[h:encoded=base64.encode(version)]

[h:html.dialog5("About", "lib://net.dovesoft.notebook/html/about.html", "width=400; height=380; temporary=1; noframe=0; input=1; value=" + encoded)]