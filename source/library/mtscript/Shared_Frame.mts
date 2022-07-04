[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:customName=getStrProp(macro.args,"customName")]
[h:identified=getStrProp(macro.args,"identified")]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]

[h:size=length(description)]
[h:height=if(size>1000,650,if(size>400,450,if(size>100,300,200)))]

[h:permissions=getLibProperty("PlayerPermission","Lib:Notebook")]
[h:edit=getStrProp(permissions,"edit")]
[h:closeShared=getStrProp(permissions,"closeShared")]
[h,if(isGM()==1):closeShared=1]
[h,if(isGM()==1):edit=1]

[token(tokenName),frame5("Shared", "width=750; height=500; temporary=0;"):{
<html>
<head>
	<link rel="stylesheet" type="text/css" href="D&D@Lib:Notebook">
</head>
<body>
	[r,if(share==1 && closeShared==1):"<p class='topbar'>"+ macroLink("Close Shared","Close Shared@Lib:Notebook")+'</p>';""]
	[h,if(identified==0):description="*Unidentified item*";""]
	[macro("Markdown@Lib:Notebook"):"tokenName="+tokenName+";description="+description+";source="+source+";name="+name+";group="+group]
</body>
</html>
}]