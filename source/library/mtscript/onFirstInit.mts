[h:namespace="net.dovesoft.notebook"]
[h:js.createNS(namespace)]
[h:js.evalURI(namespace, "lib://" + namespace + "/server/MTShims.js?cachelib=false")]
[h:js.evalURI(namespace, "lib://" + namespace + "/server/functions.js?cachelib=false")]

[h:js.initLibrary()]
[h:broadcast("onFirstInit loaded")]