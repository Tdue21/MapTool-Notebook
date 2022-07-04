[h:loadAudio=getLibProperty("LoadAudio","Lib:Notebook")]
[h,if(loadAudio==1),code:{
[h:clipList=getLibProperty("Audio","Lib:Notebook")]
	[h,count(listcount(clipList)),code:{
		[h:clip=listget(clipList,roll.count)]
		[h:playClip(clip,1,0)]
	}]
};{}]