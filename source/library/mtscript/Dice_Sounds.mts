[h:outputPC=getLibProperty("PC Audio", "Lib:Notebook")]
[h:outputGM=getLibProperty("GM Audio", "Lib:Notebook")]

[h:output=if(isGM()==1,outputGM,outputPC)]


[h,if(output=="none"),code:{};{
	<!--------------------------------DICE SOUNDS---------------------------------->
	[h:clipList=getLibProperty("Audio","Lib:Notebook")]
	[h:clipCount=listcount(clipList)]
	[h:songUrl=listget(clipList,roll(1,clipCount)-1)]
	[h:audioByte=macroLinkText("playClip@Lib:Notebook","none",songUrl)]
	[h:execLink(audioByte,0,output)]
}]