[h:libData=library.getInfo("net.dovesoft.notebook")]
[h:version=json.get(libData, "version")]
[h:encoded=base64.encode(version)]
[r:encoded]