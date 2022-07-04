

[h,if(macro.args==""),code:{

	[h:name=replace(token.name,"^Lib:","")]
	[h:tokenName=token.name]

};{

	[h:name=replace(macro.args,"^Lib:","")]
	[h:tokenName=macro.args]

}]

[frame("Index - "+name, "width=150; height=500; temporary=0;"):{


	[h:settingsObject=getLibProperty("Settings",tokenName)]

	[h,if(json.type(settingsObject)=="UNKNOWN"):settingsObject='{"theme":"GitHub"}';""]
	[h:setLibProperty("Settings",settingsObject,tokenName)]
	[h:theme=json.get(settingsObject,"theme")]

	<link rel="stylesheet" type="text/css" href="[r:theme]@Lib:Notebook">
	
	<body>

	<h3 style="margin-bottom:0px;padding:0px"><font size=6>Content</h3>


	[h:object=getLibProperty("Value",tokenName)]
	[h:fields=json.fields(object)]

	[h:fields=listsort(fields,"N")]

	[r,count(listcount(fields),""),code:{


		[h:chapter=listget(fields,roll.count)]
	
		[h:jsonValue=json.get(object,chapter)]
		
		[r:macroLink(if(chapter=="","-",chapter),"Content@Lib:Notebook","","key="+chapter+";description="+encode(jsonValue)+";tokenName="+tokenName)]
		<br>
	
	}]
	
	[r:macroLink("+","Change Form@Lib:Notebook","","name=new;description=;tokenName="+tokenName)]


}]