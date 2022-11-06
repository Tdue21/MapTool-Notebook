[r:namespace="net.dovesoft.notebook"]
[r:js.createNS(namespace)]
[r:js.evalURI(namespace, "lib://" + namespace + "/server/marked.umd.min.js?cachelib=false")]
[r:js.evalURI(namespace, "lib://" + namespace + "/server/MTShims.js?cachelib=false")]
[r:js.evalURI(namespace, "lib://" + namespace + "/server/helpers.js?cachelib=false")]
[r:js.evalURI(namespace, "lib://" + namespace + "/server/functions.js?cachelib=false")]
[r:js.evalURI(namespace, "lib://" + namespace + "/server/markdown.js?cachelib=false")]

[js.showWelcome()]
[js.showOverlay()]

[h:broadcast("onInit loaded")]
