[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:chapter=getStrProp(macro.args,"key")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]


[h:name=replace(tokenName,"^Lib:","")]

[frame(if(share==1,"Shared",name), "width=500; height=500; temporary=0;"):{

	[h:settingsObject=getLibProperty("Settings",tokenName)]
	[h:theme=json.get(settingsObject,"theme")]

	<link rel="stylesheet" type="text/css" href="[r:theme]@Lib:Notebook">
	
	<body>

[h:permissions=getLibProperty("PlayerPermission","Lib:Notebook")]
[h:closeShared=getStrProp(permissions,"closeShared")]
[h,if(isGM()==1):closeShared=1]
	
	[r,if(share==1),code:{
	[r,if(closeShared==1):"<p class='topbar'>"+macroLink("Close Shared","Close Shared@Lib:Notebook")+"</p>"]
	
	
	};{

	[h:object=getLibProperty("Value",tokenName)]
	[h:fields=json.fields(object)]

	[h:fields=listsort(fields,"N")]
	[h:next=listget(fields,listfind(fields,chapter)+1)]

	[h:prev=listget(fields,listfind(fields,chapter)-1)]

	[h:jsonNext=json.get(object,next)]
	[h:jsonPrev=json.get(object,prev)]
	
		<p class='topbar'>
	
		[r:macroLink("Edit","Change Form@Lib:Notebook","","name="+chapter+";description="+encode(description)+";tokenName="+tokenName)]&nbsp;
		[r:macroLink("Settings","Settings@Lib:Notebook","","name="+chapter+";description="+encode(description)+";tokenName="+tokenName)]&nbsp;

		[h:permissions=getLibProperty("PlayerPermission","Lib:Notebook")]
		[h:sharePlayer=getStrProp(permissions,"share")]
		[h,if(isGM()==1):sharePlayer=1]
		
		[r,if(sharePlayer==1):macroLink("Share","Share@Lib:Notebook","","share=1;key="+chapter+";description="+description+";tokenName="+tokenName)]&nbsp;


[r,count(10,""):"&nbsp;"]
		
		[r,if(listfind(fields,chapter)-1==-1):"<font color=silver>&lt;</font>";macroLink("&lt;","Content@Lib:Notebook","","key="+prev+";description="+encode(jsonPrev)+";tokenName="+tokenName)]&nbsp;

		[r,if(listfind(fields,chapter)+1==listcount(fields)):"<font color=silver>></font>";macroLink(">","Content@Lib:Notebook","","key="+next+";description="+encode(jsonNext)+";tokenName="+tokenName)]
		
		</p>
		



	
	}]

	
	[macro("Markdown@Lib:Notebook"):"tokenName="+tokenName+";description="+description]

}]