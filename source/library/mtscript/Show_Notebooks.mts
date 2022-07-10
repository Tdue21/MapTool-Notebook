[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]
[h:list=libList]

[h,foreach(currentLib, libList, ""),code:{
	[h:settingsProp=getLibProperty("Settings",currentLib)]
	[h,if(json.type(settingsProp)=="UNKNOWN"):fields="";fields=json.fields(settingsProp)]
	[h,if(listfind(fields, "theme") >= 0):"";list=listdelete(list,listfind(list,currentLib))]
}]

[h:ListNotes=""]
[h:maps=getAllMapNames()]
[h,if(isGM()==1),count(listcount(maps)),code:{
	[h:ListNotes=list]
};{
	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]

	[h,foreach(currentOwned, ownedtokens, ""),code:{	
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";ListNotes=listappend(ListNotes,currentOwned)]
	}]
}]

[h:ListNotes=listsort(ListNotes,"N")]
[h:height=150+listcount(ListNotes)*35]
[h:height=if(height>600,600,height)]

[dialog5("Notebooks", "width=220; height="+height+"; temporary=1; noframe=0; input=1"):{
<html>
<head>
	<link rel="stylesheet" type="text/css" href="../public/css/Github5.css">
	
[r:'<style type="text/css">
	h1 {
		font-size:12pt;		
	}
	
	input[type=submit] {
		width:95%;
		border:1px solid black;
		background-color:#dedede;
		color:black;
		padding:2px;
		margin:0px;
		margin-left:5px;
		margin-bottom:5px;
		height:25px;			
	}
	</style>']
</head>
<body>
	[h:processorLink=macroLinkText("Menu process@Lib:net.dovesoft.notebook","")]
	<form action="[r:processorLink]" method="json">
		<h1>Create</h1>
		<input type="submit" name="NewNotebook" value="New Notebook">
		<h1>Read</h1>
		
		[r,foreach(currentNote, ListNotes, ""),code:{
			[h:CurrentName=replace(currentNote,"^Lib:","")]
			<input type="submit" name="[r:currentNote]" value="[r:CurrentName]">
			<br>
		}]
		
		<input type="hidden" name="NoteList" value="[r:encode(ListNotes)]">
	</form>
</body>
</html>
}]