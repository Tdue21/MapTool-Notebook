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
[r:ListNotes]