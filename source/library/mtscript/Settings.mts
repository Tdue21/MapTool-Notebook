[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:name=getStrProp(macro.args,"name")]
[h:description=decode(getStrProp(macro.args,"description"))]

[h:LibName=replace(tokenName,"^Lib:","")]

[h:settingsOject=getLibProperty("Settings",tokenName)]

[h:theme=json.get(settingsOject,"theme")]

[r:list="MapTool,GitHub,D&D,MT Dark,Elegant"]
[h:outputList="all,self,gm,gm-self,none"]

[h:diceSize=getLibProperty("diceSize","Lib:Notebook")]

[h:pcOutput=getLibProperty("PC Output","Lib:Notebook")]
[h:gmOutput=getLibProperty("GM Output","Lib:Notebook")]

[h:pcOutput=getLibProperty("PC Audio","Lib:Notebook")]
[h:gmOutput=getLibProperty("GM Audio","Lib:Notebook")]

[h:search=getLibProperty("search","Lib:Notebook")]

[h:clips=getLibProperty("Audio","Lib:Notebook")]
[h:loadAudio=getLibProperty("LoadAudio","Lib:Notebook")]

[h:res=input("theme|"+list+"|Theme|list|value=string select="+listfind(list,theme),
"pcOutput|"+outputList+"|PC Output|list|value=string select="+listfind(outputList,pcOutput),
"gmOutput|"+outputList+"|GM Output|list|value=string select="+listfind(outputList,gmOutput),
"diceSize|"+diceSize+"|Dice Size|text|Width=6",
"search|"+search+"|Search Engine|text|Width=20",
"pcAudio|"+outputList+"|PC Audio Output|list|value=string select="+listfind(outputList,pcOutput),
"gmAudio|"+outputList+"|GM Audio Output|list|value=string select="+listfind(outputList,gmOutput),
"clips|"+clips+"|Audio Clips URL list|text|Width=20",
"loadAudio|"+loadAudio+"|Load on startup|Check")]
[h:abort(res)]

[h:settingsOject=json.set(settingsOject,"theme",theme)]

[h:setLibProperty("Settings",settingsOject,tokenName)]

[h:setLibProperty("PC Audio",pcAudio,"Lib:Notebook")]
[h:setLibProperty("GM Audio",gmAudio,"Lib:Notebook")]

[h:setLibProperty("PC Output",pcOutput,"Lib:Notebook")]
[h:setLibProperty("GM Output",gmOutput,"Lib:Notebook")]

[h:setLibProperty("diceSize",diceSize,"Lib:Notebook")]

[h:setLibProperty("search",search,"Lib:Notebook")]

[h:setLibProperty("Audio",clips,"Lib:Notebook")]
[h:setLibProperty("loadAudio",loadAudio,"Lib:Notebook")]

[h,if(isFrameVisible("Index - "+LibName)==1),code:{
[macro("Index@lib:Notebook"):tokenName]
};{}]
[h,if(isFrameVisible(LibName)==1),code:{
[macro("Content@lib:Notebook"):"key="+name+";description="+description+";tokenName="+tokenName]
};{}]

