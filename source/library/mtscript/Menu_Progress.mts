[h:NewNotebook=json.get(macro.args,"NewNotebook")]
[h:NoteList=decode(json.get(macro.args,"NoteList"))]

[h,foreach(currentNote, NoteList, ""),code:{
	[h:Note=json.get(macro.args,currentNote)]
	[h,if(Note==""),code:{};{
		[macro("Notebook@"+currentNote):""]
	}]
}]

[h:selectedToken=getSelected()]
[h,foreach(currentId, selectedToken, ""),code:{
	[h,if(NewNotebook==""),code:{};{
		[macro("Set Notebook@Lib:Notebook"):"id="+currentId]
	}]
}]
