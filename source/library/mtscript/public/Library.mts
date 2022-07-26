[h:data=evalMacro('[r,Macro("helpers/GetLibraryData@lib:net.dovesoft.notebook"):""]')]
[h:encoded=base64.encode(decode(data))]
[h:html.dialog5("Notebook Library", 
                "lib://net.dovesoft.notebook/pages/library/library.html", 
                "width=200; height=500; temporary=1; noframe=0; input=1; value=" + encoded)]
