@@ @Center Token
@PROPS@ fontColor=default ; autoExecute=true ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=

[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:map=getStrProp(macro.args,"map")]
[h:settings=getStrProp(macro.args,"settings")]
[h,if(getCurrentMapName()==map):"";setCurrentMap(map)]
[h,if(tokenName==0):goto(5,5);goto(tokenName)]
[h:setZoom(1)]
[h,if(tokenName==0):"";selectTokens(tokenName)]
[h,if(tokenName==0 || settings==1),code:{
	[h:closeDialog("Manage Party")]
	[macro("Manage Party@Lib:Character"):""]
};{}]

!!
@@ @Change Pin Form
@PROPS@ fontColor=default ; autoExecute=false ; fontSize=default ; sortBy= ; color=default ; playerEditable=true ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=

[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:oldName=decode(getStrProp(macro.args,"name"))]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:customName=getStrProp(macro.args,"customName")]
[h:description=replace(description,"\\s*\$","")]
[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[dialog5(tokenName+" - "+name+" - Edit", "width=650; height=550; temporary=1; input=1; noframe=0"): {

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Pins">

[h: processorLink = macroLinkText("Change Pin Form process@Lib:Pins", "")]
<form action="[r:processorLink]" method="json">

<input type="submit" name="button" value="Save">
[r,count(10,""):"&nbsp;"]
<input type="submit" name="cancel" value="Cancel">
[r,count(10,""):"&nbsp;"]
<span title="<html><h1><font size=5># Heading</h1><b>**Bold**</b> | <i>*Italic*</i> | <s>~~striketrough~~</s> | _ <u>underline</u> _ | <u>&#91;link](url)</u></html>">
[r:macroLink("Help","Help@Lib:Pins")]
</span>

<input type="hidden" name="prop" value="[r:group]">
<input type="hidden" name="name" value="[r:name]">
<input type="hidden" name="customName" value="[r:customName]">
<input type="hidden" name="oldName" value="[r:oldName]">
<input type="hidden" name="index" value="[r:index]">
<input type="hidden" name="source" value="[r:source]">
<input type="hidden" name="tokenName" value="[r:tokenName]">
<input type="hidden" name="id" value="[r:id]">

<input type="text" name="title" value="[r:if(name=='new','',name)]" size="59">

<textarea name="value" cols="60" rows="30">[r:if(decode(name)=="new","",decode(description))]</textarea>

<br>

</form>

}]

!!
@@ @Change Pin Form process
@PROPS@ fontColor=default ; autoExecute=false ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=true ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=

[r:cancel=json.get(macro.args,"cancel")]
[r:cancel=if(cancel=="cancel",0,1)]
[h:abort(cancel)]

[r:title=json.get(macro.args,"title")]
[r:oldName=json.get(macro.args,"oldName")]
[r:value=json.get(macro.args,"value")]
[r:group=json.get(macro.args,"prop")]
[r:name=json.get(macro.args,"name")]
[r:index=json.get(macro.args,"index")]
[r:source=json.get(macro.args,"source")]
[r:tokenName=json.get(macro.args,"tokenName")]
[r:id=json.get(macro.args,"id")]
[r:customName=json.get(macro.args,"customName")]

[h:value=replace(value,"\\s*\$","")]
[h:value=replace(value,"^\\s*","")]

[h:title=replace(title,"^\\s*","")]
[h:title=replace(title,"\\s*\$","")]

[r:currentProp=getLibProperty(group,"Lib:Compendium")]

[h:Output=getLibProperty("PC Output", "Lib:Character")]

[r,if(index=="new"),code:{
	[h:object=value]
	[r:newProp=json.set(currentProp,title,object)]
	[h:setLibProperty(group,newProp,"Lib:Compendium")]
};{
	[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):"";object=json.get(currentProp,title)]
	[r:newProp=json.set(currentProp,title,value)]
	[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):"";setLibProperty(group,newProp,"Lib:Compendium")]
}]

[h,if(id==""):"";switchToken(id)]
[r,if(index=="new"),code:{
	[h:ListProperty=getProperty(group)]
	[h:metadata=if(group=="Equipment",json.fromStrProp("Quantity=1;Equiped=1;offHand=0"),if(group=="Feats" || group=="AdditionalFeats","Class",json.fromStrProp("prep=1;Atk=0;DC=0;source=Class")))]
	[h:ListProperty=json.set(ListProperty,title,metadata)]
	[h:setProperty(group,ListProperty)]
};{
	[h:ListProperty=getProperty(group)]
	[h,if(group=="OtherNotes" || group=="Notes" || group=="GMNotes"):metadata=value;metadata=json.get(ListProperty,oldName)]
	[h:ListProperty=json.set(ListProperty,title,metadata)]
	[h,if(oldName==title):"";ListProperty=json.remove(ListProperty,oldName)]
	[h:setProperty(group,ListProperty)]
}]

[h,token(tokenName),if(group=="Notes"):setNotes(value,findToken(tokenName));""]
[h,token(tokenName),if(group=="GMNotes"):setGMNotes(value,findToken(tokenName));""]
[h,if(group=="Notes" && id!=""):setNotes(value);""]
[h,if(group=="GMNotes" && id!=""):setGMNotes(value);""]

[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Pins"):"tokenName="+tokenName]
};{}]

!!
@@ @Create Pin
@PROPS@ fontColor=white ; autoExecute=true ; fontSize=1.00em ; sortBy= ; color=red ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:id=getSelected()]
[h:id=listget(id,0)]
[h:sourceMap="00.DM"]

[h,if(id==""),code:{

	[h:res=input("var|No tokens selected, create new pin?||label|span=true","name|Pin "+1d100+"|Pin Name")]
	[h:abort(res)]

	[h:id=findToken("POI",sourceMap)]
	[h:center=getViewCenter(0,";")]
	[h:xCoord=getStrProp(center,"centerX")]
	[h:yCoord=getStrProp(center,"centerY")]
	[h:id=copyToken(id,1,sourceMap,"{'name':'"+name+"','x':"+xCoord+",'y':"+yCoord+"}")]

	[h:tokenName=getName(id)]
	[h:switchToken(id)]

	[h:setTokenImage("asset://3e15e9fe363983b2568c2355a9633e79")]
	
};{

	[h:tokenName=getName(id)]
	[h:switchToken(id)]

	<!-----------------CONFIRM------------------->
	[h:res=input("var|Set "+tokenName+"'s token as Pin?||label|span=true")]
	[h:abort(res)]

}]

<!----------------- MACROS ------------------->

[h:macroList=getMacros()]

[h,if(listfind(macroList,"Focus")<0):createMacro("Focus","[macro('Set Map@Lib:Campaign'):''][h: xcoord=getTokenX(0)][h: ycoord=getTokenY(0)][h:width=getTokenWidth()][h:height=getTokenHeight()][h:setViewArea(xcoord-5, ycoord-5, xcoord+5, ycoord+5, 0, 1)]", "minWidth=120;fontColor=black;color=lime;sortBy=0;playerEditable=0")]

[h,if(listfind(macroList,"Notes")<0):createMacro("Notes","[macro('Pin Notes@Lib:Pins'):'tokenName='+token.name]", "minWidth=120;fontColor=black;color=yellow;sortBy=0")]

[h,if(listfind(macroList,"Send to Hidden")<0):createMacro("Send to Hidden","[h:setLayer('GM')]", "minWidth=120;sortBy=3")]

[h:setTokenSnapToGrid(0)]
[h:token.visible=0]
[h:setSize("Medium")]
[h:setPC()]
[h:setHasSight(0)]

[h,if(isDialogVisible("Manage")==1),code:{
	[macro("Pin Notes@Lib:Pins"):"tokenName="+tokenName)]
};{}]

!!
@@ @Focus Token
@PROPS@ fontColor=default ; autoExecute=true ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=true ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:map=getStrProp(macro.args,"map")]

[h:setCurrentMap(map)]

[h:id=findToken(tokenName)]

[h,if(id==""),code:{

	[h:maps=getAllMapNames()]
	[h:maps=listsort(maps,"N")]
	[h:visibleMaps=maps]
	[h,count(listcount(maps)),code:{
		[h:map=listget(maps,roll.count)]
		[h,if(getMapVisible(map)==1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]
	}]
	[h,if(isGM()==1):maps=maps;maps=visibleMaps]

	[h:res=input("var|"+tokenName+" not found on current map. Change Map to proceed or cancel to abort.||label|span=true",
	"ChangeMap|"+maps+"|Change Map|list|value=string")]
	[h:abort(res)]

	[h:setCurrentMap(ChangeMap)]
	[h:id=findToken(tokenName)]

}]

[h:switchToken(id)]

[h:selectTokens(id)]

[h: xcoord=getTokenX(0)][h: ycoord=getTokenY(0)][h:width=getTokenWidth()][h:height=getTokenHeight()][h:setViewArea(xcoord-7, ycoord-7, xcoord+7, ycoord+7, 0, 0)]

!!
@@ @GitHub
@PROPS@ fontColor=default ; autoExecute=true ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
@font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src: local('Open Sans Regular'), url('./github/400.woff') format('woff');
}

@font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: normal;
    src: local('Open Sans Italic'), url('./github/400i.woff') format('woff');
}

@font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    src: local('Open Sans Bold'), url('./github/700.woff') format('woff');
}

@font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: bold;
    src: local('Open Sans Bold Italic'), url('./github/700i.woff') format('woff');
}

:root {
    --side-bar-bg-color: #fafafa;
    --control-text-color: #777;
}

body {
    font-family: "Open Sans", "Clear Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: rgb(51, 51, 51);
    line-height: 1.6;
    background-color: #ffffff;
}

p {
    padding: 3px;
    margin: 3px;
    text-indent: 0px;
}

div {
    padding: 5px;
    margin: 10px;
    background-color: #f6f8fa;
    border-top: 1px solid #ABB3A1;
    border-bottom: 1px solid #ABB3A1;
    border-left: 1px solid #ABB3A1;
    border-right: 1px solid #ABB3A1;
}

h1,h2,h3,h4,h5,h6 {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    line-height: 1.4;
    cursor: text;
}

h1:hover a.anchor,
h2:hover a.anchor,
h3:hover a.anchor,
h4:hover a.anchor,
h5:hover a.anchor,
h6:hover a.anchor {
    text-decoration: none;
}

h1 tt, h1 code { font-size: inherit; }
h2 tt, h2 code { font-size: inherit; }
h3 tt, h3 code { font-size: inherit; }
h4 tt, h4 code { font-size: inherit; }
h5 tt, h5 code { font-size: inherit; }
h6 tt, h6 code { font-size: inherit; }

h1 {
    padding-bottom: 8px;
    font-size: 1.6em;
    border-bottom: 1px solid #eaecef;
    margin: 3px;
}

h2 {
    padding-bottom: 8px;
    font-size: 1.5em;
    border-bottom: 1px solid #eaecef;
    margin: 3px;
}

h3 {
    padding-bottom: 8px;
    font-size: 1.4em;
    margin: 3px;
}

h4 {
    font-size: 1.3em;
    margin: 3px;
}

h5 {
    font-size: 1.2em;
    margin: 3px;
}

h6 {
    font-size: 1.1em;
    margin: 3px;
    color: #777;
}

blockquote,
ul,
ol,
dl,
table {
    margin: 0 0;
    padding: 0 0;
}

li>ol,
li>ul {
    margin: 0 0;
}

hr {
    height: 2px;
    padding: 0;
    margin: 16px 0;
    background-color: #e7e7e7;
    border: 0 none;
    overflow: hidden;
    box-sizing: content-box;
}

li p.first {
    display: inline-block;
}

ul,
ol {
    padding-left: 30px;
}

ul:first-child,
ol:first-child {
    margin-top: 5px;
}

ul:last-child,
ol:last-child {
    margin-bottom: 5px;
}

blockquote {
    border-left: 4px solid #dfe2e5;
    padding: 0 15px;
    color: #777777;
}

blockquote blockquote {
    padding-right: 0;
}

table {
    margin: 0px;
    padding: 0px;
    width: 100%;
    font-size: 1em;
    color: #000000
}

a {
    color: #4183C4;
    text-decoration: none;
}

code {
    background-color: #f3f4f4;
    padding: 0 2px 0 2px;
}

.paragraph {
    padding: 0px;
    margin-left: 10px;

}

.chapter {
    margin: 1px;
    margin-top: 8px;
    margin-left: 5px;
    padding: 0px;
    font-weight: bold;
}

.section {
    margin: 1px;
    margin-left: 15px;
    padding: 0px;
}

.div {
    padding: 0px;
    margin: 0px;
    background-color: #ffffff;
    border: 0px;
}

.code {
    padding: 5px;
    margin: 10px;
    background-color: #f3f4f4;
    border-top: 1px solid #f3f4f4;
    border-bottom: 1px solid #f3f4f4;
    border-left: 1px solid #f3f4f4;
    border-right: 1px solid #f3f4f4;
}

.topbar {
    border-bottom: 1px solid gray;
    padding: 0px;
    margin: 0px;
    font-family: sans;
    font-size: 1em;
}

#write {
    max-width: 860px;
    margin: 0 auto;
    padding: 30px;
    padding-bottom: 100px;
}

#write>ul:first-child,
#write>ol:first-child {
    margin-top: 30px;
}

.bg {
    background-color: #f8f8f8;
}

.CodeMirror-lines {
    padding-left: 4px;
}

.code-tooltip {
    box-shadow: 0 1px 1px 0 rgba(0, 28, 36, .3);
    border-top: 1px solid #eef2f2;
}

.md-fences,
code,
tt {
    border: 1px solid #e7eaed;
    background-color: #f8f8f8;
    border-radius: 3px;
    padding: 0;
    padding: 2px 4px 0px 4px;
    font-size: 0.9em;
}

.md-fences {
    margin-bottom: 15px;
    margin-top: 15px;
    padding-top: 8px;
    padding-bottom: 6px;
}

.md-task-list-item>input {
    margin-left: -1.3em;
}

.md-fences {
    background-color: #f8f8f8;
}

#write pre.md-meta-block {
    padding: 1rem;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f7f7f7;
    border: 0;
    border-radius: 3px;
    color: #777777;
    margin-top: 0 !important;
}

.mathjax-block>.code-tooltip {
    bottom: .375rem;
}

.md-mathjax-midline {
    background: #fafafa;
}

#write>h3.md-focus:before {
    left: -1.5625rem;
    top: .375rem;
}

#write>h4.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

#write>h5.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

#write>h6.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

.md-image>.md-meta {
    /*border: 1px solid #ddd;*/
    border-radius: 3px;
    padding: 2px 0px 0px 4px;
    font-size: 0.9em;
    color: inherit;
}

.md-tag {
    color: #a7a7a7;
    opacity: 1;
}

.md-toc {
    margin-top: 20px;
    padding-bottom: 20px;
}

.sidebar-tabs {
    border-bottom: none;
}

#typora-quick-open {
    border: 1px solid #ddd;
    background-color: #f8f8f8;
}

#typora-quick-open-item {
    background-color: #FAFAFA;
    border-color: #FEFEFE #e5e5e5 #e5e5e5 #eee;
    border-style: solid;
    border-width: 1px;
}

/** focus mode */
.on-focus-mode blockquote {
    border-left-color: rgba(85, 85, 85, 0.12);
}

header,
.context-menu,
.megamenu-content,
footer {
    font-family: "Segoe UI", "Arial", sans-serif;
}

.file-node-content:hover .file-node-icon,
.file-node-content:hover .file-node-open-state {
    visibility: visible;
}

.mac-seamless-mode #typora-sidebar {
    background-color: #fafafa;
    background-color: var(--side-bar-bg-color);
}

.md-lang {
    color: #b4654d;
}

.html-for-mac .context-menu {
    --item-hover-bg-color: #E6F0FE;
}

#md-notification .btn {
    border: 0;
}

.dropdown-menu .divider {
    border-color: #e5e5e5;
}

.ty-preferences .window-content {
    background-color: #fafafa;
}

.ty-preferences .nav-group-item.active {
    color: white;
    background: #999;
}

.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 200px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    top: 150%;
    left: -75%;
    margin-left: -60px;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}

!!
@@ @Load Pin Notes
@PROPS@ fontColor=default ; autoExecute=true ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:tokenName=json.get(macro.args,"Pin")]

[h:args=if(tokenName=="Select Pin","","tokenName="+tokenName)]
[macro("Pin Notes@Lib:Pins"):args]

!!
@@ @Pin Add
@PROPS@ fontColor=default ; autoExecute=true ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=true ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:group=getStrProp(macro.args,"prop")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:Output=getLibProperty("PC Output", "Lib:Character")]

[h:inputList=getLibProperty(group,"Lib:Compendium")]

[h:inputList=json.fields(inputList)]

[h:inputList=listSort(inputList,"N")]

[h:Property=getProperty(group)]

[h,if(json.type(Property)=="UNKNOWN"):currentList="";currentList=json.fields(Property)]

[h,count(listcount(currentList)),code:{

	[h:currentItem=listget(currentList,roll.count)]
	[h:delete=listfind(inputList,currentItem)]
	[h:inputList=listdelete(inputList,delete)]

}]

[h:res=input("tab0 | Add Single || TAB","item|Add New,"+inputList+"|"+group+"|list|value=string","tab1 | Add from list || TAB","list|||text|span=true width=30","tab2 | Get List || TAB","var|"+currentList+"|list")]
[h:abort(res)]
	
[h,if(list==0 || list==""),code:{

	[h,if(item=="Add New"),code:{

		[macro("Change Form@Lib:Character"):"prop="+group+";index=new;name=new;description=new;tokenName="+tokenName]
	
	
	};{

		[macro("Get Spell Level@Lib:Character"):"group="+group+";name="+item]
		[h:level=macro.return]
		[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+item]
		[h:equipInfo=macro.return]
	
		[h:Property=json.set(Property,item,json.fromStrProp(equipInfo+";Quantity=1;Equiped=1;offHand=0;identified=1"))]

		[h:setProperty(group,Property)]

	}]

};{

	[h,count(listcount(list)),code:{
	
		[h:currentItem=lower(listget(list,roll.count))]

		[macro("Get Spell Level@Lib:Character"):"group="+group+";name="+currentItem]
		[h:level=macro.return]

		[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+currentItem]
		[h:equipInfo=macro.return]

		[h:Property=json.set(Property,currentItem,json.fromStrProp(equipInfo+";Quantity=1;Equiped=1;offHand=0;identified=1"))]

		[h:setProperty(group,Property)]

		[h,if(item=="Add New"):"";broadcast(tokenName+" added <b><font color=green>"+item+"</font></b>"+if(group=="Equipment"," x1","")+".",Output)]
	
	}]

}]

[h,if(isFrameVisible(tokenName+" - Character Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Character Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Spellcasting Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Spellcasting Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Description Sheet")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Description Sheet;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Statblock")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Statblock;tokenName="+tokenName]
};{}]
[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[h:closeDialog("Manage Party")]
[macro("Manage Party@Lib:Character"):"tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Pins"):"tokenName="+tokenName]
};{}]

!!
@@ @Pin Args Dialog
@PROPS@ fontColor=default ; autoExecute=false ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:customName=getStrProp(macro.args,"customName")]
[h:identified=getStrProp(macro.args,"identified")]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=getStrProp(macro.args,"description")]
[h:share=getStrProp(macro.args,"share")]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=function.Capitalize(name)]

[h,if(description==""),code:{
	[h:compendium=getLibProperty(group,"Lib:Compendium")]
	[h:item=json.get(compendium,lower(name))]
	[h,if(json.type(item)=="UNKNOWN"):description="";description=encode(json.get(item,"description"))]

	[h,if(json.type(item)=="UNKNOWN"):sources="";sources=json.toList(json.get(item,"sources"))]
};{

	[h:compendium=getLibProperty(group,"Lib:Compendium")]
	[h:item=json.get(compendium,name)]
	[h,if(json.type(item)=="UNKNOWN"):sources="";sources=json.toList(json.get(item,"sources"))]

}]

[h:size=length(description)]
[h:height=if(size>1000,650,if(size>400,450,if(size>100,300,200)))]

[h,if(name=="new"),code:{
	[macro("Change Form@Lib:Character"):macro.args]
};{
	[dialog5(if(share==1,"",tokenName+" - ")+CapitalName, "width=450; height="+if(identified==0,200,height)+"; temporary=0; noframe=0; input=1"):{
		<link rel="stylesheet" type="text/css" href="D&D@Lib:Campaign">
		[r,if(identified==0):"<title>"+if(share==1,"",tokenName+" - ")+"Unidentified Item</title>";""]
		[r,if(share==1):"";"<p class='topbar'>"]
			
		[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
		[h:edit=getStrProp(permissions,"edit")]
		[h:sharePlayer=getStrProp(permissions,"share")]
		[h,if(isGM()==1):edit=1]
		[h,if(isGM()==1):sharePlayer=1]
		
		[r,if(share==1 || edit==0):"";macrolink("Edit","Change Form@Lib:Character","",macro.args)+" &nbsp;"]
		[r,if(share==1):"";macrolink("Remove","Pin Delete@Lib:Pins","",macro.args)+" &nbsp;"]
		[r,if(share==1 || tokenName=="Lib:Character"):"";macrolink("Settings","Pin Metadata@Lib:Pins","",macro.args)+" &nbsp;"]
		[r,if(share==1):"";macrolink("Move","Pin Move@Lib:Pins","",macro.args)+" &nbsp;"]
		
		[r,if(share==1 || sharePlayer==0):"";macrolink("Share","Share@Lib:Character","",macro.args+";share=1")+" &nbsp;"]		
		[r,if(share==1):"";"</p>"]
		
		<h1 style="padding-bottom:0px;margin-bottom:0px;">
		
		[r,if(identified==0 && isGM()==0):
		if(customName=="" || customName==0,CapitalName,customName);
		if(customName=="" || customName==0,CapitalName+if(identified==0,"<font size=5> (Unidentified)</font>",""),customName+"<font size=5> ("+CapitalName+if(identified==0," - Unidentified","")+")</font>")]
		
		</h1>

		[h,if(identified==0 && isGM()==0):description="*Unidentified item*";""]
		[macro("Markdown@Lib:Campaign"):"tokenName="+tokenName+";description="+description+";source="+source+";name="+name+";group="+group]
		[r,if(sources==""):"";"<p><b>Sources: </b>"+sources+"</p>"]
	}]
}]

!!
@@ @Pin Change Currency
@PROPS@ fontColor=default ; autoExecute=false ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=true ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:id=findToken(tokenName)]
[h:switchToken(id)]

[h:currency=getProperty("Currency")]
[h:PP=getStrProp(currency,"PP")]
[h:GP=getStrProp(currency,"GP")]
[h:EP=getStrProp(currency,"EP")]
[h:SP=getStrProp(currency,"SP")]
[h:CP=getStrProp(currency,"CP")]

[h:originalPP=if(PP=="",0,PP)]
[h:originalGP=if(GP=="",0,GP)]
[h:originalEP=if(EP=="",0,EP)]
[h:originalSP=if(SP=="",0,SP)]
[h:originalCP=if(CP=="",0,CP)]

[h:res=input("var|Currency||label|span=true",
"PP|"+PP+"|Platinum|text|width=8",
"GP|"+GP+"|Gold|text|width=8",
"EP|"+EP+"|Electrum|text|width=8",
"SP|"+SP+"|Silver|text|width=8",
"CP|"+CP+"|Copper|text|width=8")]
[h:abort(res)]

[h,if(isNumber(PP)==1):"";PP=eval(PP)]
[h,if(isNumber(GP)==1):"";GP=eval(GP)]
[h,if(isNumber(EP)==1):"";EP=eval(EP)]
[h,if(isNumber(SP)==1):"";SP=eval(SP)]
[h,if(isNumber(CP)==1):"";CP=eval(CP)]

[h:currency=setStrProp(currency,"PP",PP)]
[h:currency=setStrProp(currency,"GP",GP)]
[h:currency=setStrProp(currency,"EP",EP)]
[h:currency=setStrProp(currency,"SP",SP)]
[h:currency=setStrProp(currency,"CP",CP)]

[h:setProperty("Currency",currency)]
[h:BroadcastOutput=if(originalPP==PP,"","<br>PP: "+PP+" ("+if(originalPP>PP,"<font color=red><b>"+number(PP-originalPP),"<font color=green><b>+"+number(PP-originalPP))+"</b></font>)")]
[h:BroadcastOutput=BroadcastOutput+if(originalGP==GP,"","<br>GP: "+GP+" ("+if(originalGP>GP,"<font color=red><b>"+number(GP-originalGP),"<font color=green><b>+"+number(GP-originalGP))+"</b></font>)")]
[h:BroadcastOutput=BroadcastOutput+if(originalEP==EP,"","<br>EP: "+EP+" ("+if(originalEP>EP,"<font color=red><b>"+number(EP-originalEP),"<font color=green><b>+"+number(EP-originalEP))+"</b></font>)")]
[h:BroadcastOutput=BroadcastOutput+if(originalSP==SP,"","<br>SP: "+SP+" ("+if(originalSP>SP,"<font color=red><b>"+number(SP-originalSP),"<font color=green><b>+"+number(SP-originalSP))+"</b></font>)")]
[r:BroadcastOutput=BroadcastOutput+if(originalCP==CP,"","<br>CP: "+CP+" ("+if(originalCP>CP,"<font color=red><b>"+number(CP-originalCP),"<font color=green><b>+"+number(CP-originalCP))+"</b></font>)")]

[h:BroadcastOutput=replace(BroadcastOutput,"^<br>","")]

[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[macro("Manage Party@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Pins"):"tokenName="+tokenName]
};{}]

!!
@@ @Pin Change Property
@PROPS@ fontColor=default ; autoExecute=false ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:props=decode(getStrProp(macro.args,"value"))]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:value=getStrProp(string(props),"value")]
[h:text=getStrProp(string(props),"text")]

[h:id=findToken(tokenName)]

[h:switchToken(id)]

[h:res=input("value|"+value+"|"+name,
"text|"+text+"|note")]
[h:abort(res)]

[h:props=setStrProp(string(props),"value",value)]
[h:props=setStrProp(string(props),"text",text)]

[h:setProperty(name,props,tokenName)]

[h,if(isFrameVisible(tokenName+" - Pin Notes")==1),code:{
[macro("Macro Frame@Lib:Character"):"macro=Pin Notes;tokenName="+tokenName]
};{}]
[h,if(isDialogVisible("Manage Party")==1),code:{
[macro("Manage Party@Lib:Character"):""]
};{}]
[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Character"):"tokenName="+tokenName]
};{}]

!!
@@ @Pin Delete
@PROPS@ fontColor=default ; autoExecute=false ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:res=input("var|Delete "+name+" ("+group+") from "+tokenName+"?||label|span=true")]
[h:abort(res)]

[h:id=findToken(tokenName)]

[h:switchToken(id)]

[h:Output=getLibProperty("PC Output", "Lib:Character")]

[h:currentProp=getProperty(group)]
[h:newProp=json.remove(currentProp,name)]
[h:setProperty(group,newProp)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

[h:closeDialog(tokenName+" - "+CapitalName)]

}]

[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Character"):"tokenName="+tokenName]
};{}]

!!
@@ @Pin Metadata
@PROPS@ fontColor=default ; autoExecute=false ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:index=getStrProp(macro.args,"index")]
[h:source=getStrProp(macro.args,"source")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:description=decode(getStrProp(macro.args,"description"))]
[h:originalToken=tokenName]
[h:originalGroup=group]

[h:id=findToken(tokenName)]

[h:switchToken(id)]

<!---------------------EQUIPMENT------------------------>
[h,if(group=="Equipment"),code:{
[h:currentObj=json.get(getProperty("Equipment"),name)]
[h:isProf=json.get(currentObj,"isProf")]
[h:Quantity=json.get(currentObj,"Quantity")]
[h:Equiped=json.get(currentObj,"Equiped")]
[h:offHand=json.get(currentObj,"offHand")]
[h:customName=json.get(currentObj,"customName")]
[h:bonusAtk=json.get(currentObj,"bonusAtk")]
[h:bonusDmg=json.get(currentObj,"bonusDmg")]
[h:identified=json.get(currentObj,"identified")]

[h:originalQuantity=Quantity]

[h:permissions=getLibProperty("PlayerPermission","Lib:Character")]
[h:identify=getStrProp(permissions,"identify")]
[h,if(isGM()==1):identify=1]

[h:res=input("var|<html><h3>Equipment Settings||label|span=true",
"Equiped|"+Equiped+"|Equiped|check",
"offHand|"+offHand+"|Off Hand|check",
"Quantity|"+Quantity+"|Quantity|text|width=6",
"customName|"+customName+"|Custom Name|text|width=12",
"bonusAtk|"+bonusAtk+"|Bonus Attack|text|width=6",
"bonusDmg|"+bonusDmg+"|Bonus Damage|text|width=6",
if(identify==1,"identified|"+identified+"|Identified|check",""))]
[h:abort(res)]

[h,if(isNumber(Quantity)==1):"";Quantity=eval(Quantity)]

[h,if(isNumber(Quantity)==0):res=input("var|Quantity must be a number||label|span=true");""]
[h:abort(res)]

[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+name]
[h:equipInfo=macro.return]

[h:object=json.fromStrProp(equipInfo+";Quantity="+Quantity+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";bonusAtk="+bonusAtk+";bonusDmg="+bonusDmg+";identified="+identified)]

[h:quantityChange=number(Quantity-originalQuantity)]

}]

[h:currentProp=getProperty(group)]
[h:newProp=json.set(currentProp,name,object)]
[h:setProperty(group,newProp)]

[h:id=findToken(originalToken)]
[h,if(id==""):"";switchToken(id)]

[h:currentProp=getProperty(originalGroup)]
[h:newProp=json.remove(currentProp,index)]
[h:setProperty(group,newProp)]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

[h,if(isDialogVisible(tokenName+" - "+CapitalName)==1),code:{
[macro("Pin Args Dialog@Lib:Character"):"prop="+group+";index="+index+";source="+source+";name="+name+";description=;tokenName="+tokenName+";customName="+customName+";identified="+identified]
};{}]

[h,if(isDialogVisible("Manage")==1),code:{
[macro("Pin Notes@Lib:Character"):"tokenName="+originalToken]
};{}]

!!
@@ @Pin Move
@PROPS@ fontColor=default ; autoExecute=false ; fontSize=1.00em ; sortBy= ; color=default ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:group=getStrProp(macro.args,"prop")]
[h:name=getStrProp(macro.args,"name")]
[h:description=getStrProp(macro.args,"description")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:originalToken=tokenName]
[h:originalGroup=group]

[h:name=lower(name)]

[h:Output=getLibProperty("PC Output", "Lib:Character")]

<!-----------------SELF--------------------->
[h:id=findToken(tokenName)]

[h:id=findToken(tokenName)]
[h:switchToken(id)]

<!----------List PC Libs----------->
[h:info=getInfo("client")]
[h:libtokens=json.get(info,"library tokens")]
[h:libList=json.fields(libtokens)]

[h:list=libList]
[h,count(listcount(libList)),code:{
	[h:currentLib=listget(libList,roll.count)]
	[h:settingsProp=getLibProperty("LibName",currentLib)]
	[h,if(settingsProp==""):list=listdelete(list,listfind(list,currentLib));""]
}]
[h:tokenList=""]
[h:maps=getAllMapNames()]
[h,if(isGM()==1),count(listcount(maps)),code:{
[h:tokenList=list]
};{

	[h:map=listget(maps,roll.count)]
	[h:ownedtokens=getOwnedNames(getPlayerName(),",",map)]
	
	[h,count(listcount(ownedtokens)),code:{
	
		[h:currentOwned=listget(ownedtokens,roll.count)]
		[h:find=listfind(list,currentOwned)]
		[h,if(find==-1):"";tokenList=listappend(tokenList,currentOwned)]
	}]
}]
[h:tokenList=listsort(tokenList,"N")]

<!----------End of List PC Libs----------->

[h:find=listFind(tokenList,tokenName)]

[h:moveQuantity=0)]

[h:res=input("tokenName|"+tokenList+"|Token|list|value=string select="+find,
if(group=="Equipment","moveQuantity|1|Quantity|text|width=6",""))]
[h:abort(res)]

[h:originalId=findToken(originalToken)]

[h,if(matches(originalToken,"Lib:Compendium")==1):currentProp=getLibProperty(group,"Lib:Compendium");currentProp=getProperty(group)]

[h:currentObject=json.get(currentProp,name)]

[h:Quantity=1]
[h:Equiped=1]
[h:offHand=0]
[h:customName=0]
[h:identified=1]

[h,if(group=="Equipment"  && matches(originalToken,"Lib:Compendium")!=1),code:{

	[h:Quantity=json.get(currentObject,"Quantity")]
	[h:Equiped=json.get(currentObject,"Equiped")]
	[h:offHand=json.get(currentObject,"offHand")]
	[h:customName=json.get(currentObject,"customName")]
	[h:identified=json.get(currentObject,"identified")]

	[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+name]
	[h:equipInfo=macro.return]
	
	[h:newProp=json.remove(currentProp,name)]
	
	[h:Quantity=if(isNumber(Quantity)==1,Quantity,0)]
	[h:moveQuantity=if(isNumber(moveQuantity)==1,moveQuantity,0)]
	[h:moveQuantity=if(moveQuantity>Quantity,Quantity,moveQuantity)]
	[h:quantityTotal=number(Quantity-moveQuantity)]
	
	[h:object=json.fromStrProp(equipInfo+";Quantity="+quantityTotal+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";identified="+identified)]
	
	
	[h,if(quantityTotal<=0 && group=="Equipment"):"";newProp=json.set(newProp,name,currentObject)]
	[h,if(quantityTotal>0 && group=="Equipment"):newProp=json.set(newProp,name,object);""]
	
	[h:setProperty(group,newProp)]

};{

[h:quantityTotal=moveQuantity]

}]

<!-----------------TARGET--------------------->

[h:tokenName=if(matches(tokenName,"^Lib:.*")==1,tokenName,"Lib:"+tokenName)]
[h:id=findToken(tokenName)]
[h,if(id==""):"";switchToken(id)]

[h:currentProp=getLibProperty(group,tokenName)]

[h,if(json.type(currentProp)=="UNKNOWN"):currentProp="{}";""]

[h:objectList=json.fields(currentProp)]

[h:repeat=listcount(objectList)]

[h:alreadyHave=0]

[h,count(repeat),code:{

	[h:currentName=listget(objectList,roll.count)]

	[h:alreadyHave=matches(name,currentName)]

}]

[h,if(alreadyHave==1 && group=="Equipment"),code:{

	[h:currentObject=json.get(currentProp,currentName)]	
	[h:Quantity=json.get(currentObject,"Quantity")]
	[h:Equiped=json.get(currentObject,"Equiped")]
	[h:offHand=json.get(currentObject,"offHand")]
	[h:prereq=json.get(currentObject,"prereq")]

	[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+name]
	[h:equipInfo=macro.return]

	[h:object=json.fromStrProp(equipInfo+";Quantity="+number(Quantity+moveQuantity)+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";identified="+identified)]

	[h:newProp=json.set(currentProp,name,if(group=="Equipment",object,currentObject))]
	[h:setLibProperty(group,newProp,tokenName)]
	
	
	
};{

	[macro("Get Equipment Info@Lib:Character"):"group="+group+";name="+name]
	[h:equipInfo=macro.return]

	[h,if(group=="Equipment"):object=json.fromStrProp(equipInfo+";Quantity="+moveQuantity+";Equiped="+Equiped+";offHand="+offHand+";customName="+customName+";identified="+identified);object=""]

[h:classes=getLibProperty("Class&Level",tokenName)]
[h:classList=json.fields(classes)]

	[h:newProp=json.set(currentProp,name,object)]

	[h:setLibProperty(group,newProp,tokenName)]

}]

<!---------------------------CAPITALIZE----------------------------->
[h:CapitalName=capitalize(name)]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Of(?=\\s)","of")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)A(?=n?\\s)","a")]
[h:CapitalName=replace(CapitalName,"(?<=\\s)Th(?=(?:e|at|ose)\\s)","th")]
[h:CapitalName=replace(CapitalName,"'S(?=\\s)","'s")]

[h,if(matches(originalToken,"^Lib:.*")==1 && originalToken!="Lib:Compendium"):originalToken=replace(originalToken,"^Lib:","");""]
[h,if(matches(tokenName,"^Lib:.*")==1):tokenName=replace(tokenName,"^Lib:","");""]

[h,if(quantityTotal<=0 && group=="Equipment"),code:{

	[h:closeDialog(originalToken+" - "+CapitalName)]
	
};{}]
[h,if(findToken(originalToken)==""):visible=0;visible=getVisible(originalToken)]

[h:broadcast(tokenName+" got <b><font color=green>"+name+"</b>"+if(moveQuantity==0,""," x"+moveQuantity)+".",Output)]

[h:notes="- **"+tokenName+"** got **"+name+"** x"+moveQuantity+"."]
[h:id=findToken(originalToken)]
[h:CurrentNotes=getNotes(id)]
[h:setNotes(CurrentNotes+"
"+notes,id)]

[h,if(isDialogVisible("Manage")==1),code:{
[macro("Manage Party@Lib:Character"):"tokenName="+originalToken)]
};{}]

!!
@@ @Pin Notes
@PROPS@ fontColor=black ; autoExecute=true ; fontSize=1.00em ; sortBy= ; color=lime ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h,if(tokenName=="Select Pin"):tokenName=""]
[h:id=findToken(tokenName)]
[h,if(tokenName==""),code:{};{
	[h:switchToken(id)]
}]
[h,if(tokenName==""):descriptionGMNotes="";descriptionGMNotes=getGMNotes()]

[dialog5("Manage", "width=580; height=400; temporary=0; noframe=0; input=1"):{

<link rel="stylesheet" type="text/css" href="GitHub@Lib:Pins">

<title>[r:tokenName]</title>

<h3>Pin Notes</h3>
<table>
	<tr>
		<td>
			[r,if(tokenName==""),code:{
				[r:macroLink("Create Pin","Create Pin@Lib:Pins","")]
			};{
				[r:macroLink("Select","Center Token@Lib:Pins","","tokenName="+tokenName+";map="+getCurrentMapName())]
				[r:"| "+macroLink("Focus","Focus@Token","","",tokenName)]
				[r:"| "+macroLink("GM Notes","Change Pin Form@Lib:Pins","","prop=GMNotes;name=GMNotes;description="+descriptionGMNotes+";tokenName="+tokenName)]
			}]
		</td>
		<td>

<!-----------------Load Pin------------------->

	[h: processorLink = macroLinkText("Load Pin Notes@Lib:Pins", "")]
	<form action="[r:processorLink]" method="json">
		[h:Pins=getTokenNames(",","{'pc':1,'owned':'none'}")]
		[h:Pins=listSort(Pins, "A+", ",")]
		[h:repeat=listcount(Pins)]

		<input type="submit" name="load" value="Load">&nbsp;

		<select name="Pin" size="1">
			<option [r:if(tokenName=="","selected='selected'","")]>Select Pin</option>
			[r,count(repeat,""),code:{
				[h:CurrentPin=listget(Pins,roll.count)]
				<option [r:if(tokenName==CurrentPin,"selected='selected'","")]>[r:CurrentPin]</option>	
			}]
		</select>	
	</form>
<!------------------------------------------------------------------->
</table>

<!-----------------NOTES------------------->

[h:key="Notes"]

[h,if(tokenName==""):descriptionNotes="";descriptionNotes=getNotes()]
[r,if(descriptionNotes!=""),code:{
	<b>[r:key]:</b>

	[macro("Markdown@Lib:Campaign"):"tokenName="+tokenName+";description="+encode(descriptionNotes)]
	
};{}]

[r,if(descriptionNotes!="" && descriptionGMNotes!="" && isGM()==1):"<hr noshade><b>GM Notes:</b>";""]

[r,if(tokenName!=""),code:{
	<!-----------------GM NOTES------------------->
	
	[macro("Markdown@Lib:Campaign"):"tokenName="+tokenName+";description="+encode(descriptionGMNotes)]

};{}]

[r,if(tokenName==""):"<table><tr><td align=center><font color=gray size=5>[no pin loaded]</table>";"<div>"]

<!-----------------EXPERIENCE------------------->
<p>
[h,if(tokenName==""):xp="";xp=getProperty("XP")]

[h:value=getStrProp(string(xp),"value")]
[h:text=getStrProp(string(xp),"text")]

<b><i>
[r,if(tokenName==""):"";macroLink("Experience Points.","Pin Change Property@Lib:Pins","","name=XP;value="+encode(xp)+";id="+id+";tokenName="+tokenName)]</b></i>
[r,if(tokenName==""):"";if(value=="","0",value))]
[r,if(tokenName==""):"";if(text=="" || text==0,"","("+text+")")]

</p>
<!-----------------ITEMS------------------->
[h:object="Equipment"]
<p>
<b><i>
[r,if(tokenName==""):"";macrolink("Items.","Pin Add@Lib:Pins","","prop="+object+";tokenName="+tokenName)]
</i></b>

[h:totalWeight=0]

[h,if(tokenName==""):obj="";obj=getProperty(object)]
[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(objList)]

[h:EquipLib=getLibProperty("Equipment", "Lib:Compendium")]
[h:EquipList=json.fields(EquipLib)]

[h,count(repeat,""),code:{
	[h:objName=listGet(objList,roll.count)]
	[h:exists=listFind(EquipList,objName)]
	[h,if(exists==-1):obj=json.remove(obj,objName);""]
		[h,if(exists==-1):obj=setProperty(object,obj);""]

}]

[h,if(json.type(obj)=="UNKNOWN"):objList="";objList=json.fields(obj)]
[h,if(json.type(obj)=="UNKNOWN"):repeat=0;repeat=listcount(objList)]

[r,count(repeat,""),code:{
	[h:objName=listGet(objList,roll.count)]
	[h:currentObj=json.get(obj,objName)]
	[h:Quantity=json.get(currentObj,"Quantity")]
	[h:customName=json.get(currentObj,"customName")]
	[h:identified=json.get(currentObj,"identified")]
	[h:name=if(customName=="" || customName==0,objName,customName)]
	[h:name=if(Quantity==1,name,name+"s")]
	[r:Quantity]
	[r:macrolink(lower(if(name=="","Untitled",name)),"Pin Args Dialog@Lib:Pins","","prop="+object+";index="+roll.count+";name="+objName+";customName="+customName+";description=;tokenName="+tokenName+";identified="+identified)]
	[r:if(repeat==roll.count+2," and ",if(repeat==roll.count+1,".",", "))]
}]
</p>

<p>
<!-----------------CURRENCY------------------->

[h,if(tokenName==""):currency="";currency=getProperty("Currency")]
<i><b>[r,if(tokenName==""):"";macrolink("Treasure.","Pin Change Currency@Lib:Pins","","tokenName="+tokenName)]</b></i>
[h:PP=getStrProp(currency,"PP")]
[h,if(PP==0 || PP==""):currency=deleteStrProp(currency,"PP");""]
[h:GP=getStrProp(currency,"GP")]
[h,if(GP==0 || GP==""):currency=deleteStrProp(currency,"GP");""]
[h:EP=getStrProp(currency,"EP")]
[h,if(EP==0 || EP==""):currency=deleteStrProp(currency,"EP");""]
[h:SP=getStrProp(currency,"SP")]
[h,if(SP==0 || SP==""):currency=deleteStrProp(currency,"SP");""]
[h:CP=getStrProp(currency,"CP")]
[h,if(CP==0 || CP==""):currency=deleteStrProp(currency,"CP");""]

[r,count(countStrProp(currency),""),code:{
	[r:indexValueStrProp(currency, roll.count)]
	[r:lower(indexKeyStrProp(currency,roll.count))][r:if(countStrProp(currency)==roll.count+2," and ",if(countStrProp(currency)==roll.count+1,".",", "))]

}]
</p>
[r,if(tokenName==""):"";"</div>"]
}]

!!
@@ @Help
@PROPS@ fontColor=white ; autoExecute=true ; fontSize=1.00em ; sortBy= ; color=red ; playerEditable=false ; applyToSelected=false ; group=Pin ; tooltip= ; minWidth=
[dialog("Markdown Help", "width=260; height=550; temporary=0; input=1; noframe=0"): {


    <link rel="stylesheet" type="text/css" href="GitHub@Lib:Campaign">
    
    
    <table style="margin: 0px; padding: 0px">
    <tr>
    <td style="margin: 0px; padding: 0px">
    # Heading 1
    <td style="margin: 0px; padding: 0px">
    <h1><font size=6>Heading 1</h1>
    <tr>
    <td style="margin: 0px; padding: 0px">
    ## Heading 2
    <td style="margin: 0px; padding: 0px">
    <h2><font size=5>Heading 2</h2>
    <tr>
    <td style="margin: 0px; padding: 0px">
    ### Heading 3
    <td style="margin: 0px; padding: 0px">
    <h3><font size=4>Heading 3</h3>
    </table>
    
    
    
    <table>
    <tr>
    <td width=0%>
    **Bold**
    <td>
    <b>Bold</b>
    <tr>
    <td>
    *Italic*
    <td>
    <i>Italic</i>
    <tr>
    <td>
    ~~striketrough~~
    <td>
    <s>striketrough</s>
    <tr>
    <td>
    _underline_
    <td>
    <u>underline</u>
    </table>
    
    <table>
    <tr>
    <td>
    [r:"[link](url)"]
    <td>
    <a href="url">link</a>
    <tr>
    <td width=0%>
    [r:'[1d6](roll "1d6")']
    <td>
    [r:macroLink("1d6","Dice Roller@Lib:Notebook","all","text=1d6;value=1d6;tokenName=")]
    <tr>
    <td width=0%>
    [r:'[+1](to hit "1")']
    <td>
    [r:macroLink("+1","d20 Roller@Lib:Notebook","all","text=+1;value=++1;color=Red")]
    <tr>
    <td width=0%>
    [r:'[spell](spell)']
    <td>
    [r:macroLink("spell","Args Dialog@Lib:Notebook","","prop=Spells;source=;name=spell;description=;tokenName=")]
    <tr>
    <td width=0%>
    [r:'[npc](npc)']
    <td>
    [r:macroLink("npc","Viewer Frame@Lib:Bestiary","","npc")]
    <tr>
    <td>
    [r:"![](image url)"]
    <td>
    <img src="image url" width=50>
    <tr>
    <td width=0%>
    [r:'[r:getPlayerName()]']
    <td>
    [r:getPlayerName()]
    </table>
    
    <table>
    <tr>
    <td>
    ---
    <td>
    <hr noshade>
    <tr>
    <td>
    > Blockquote
    <td>
    <blockquote>Blockquote</blockquote>
    <tr>
    <td>
    ```<br>
    Custom Codeblock
    <br>
    ```
    <td>
    <div>Custom Codeblock</div>
    </table>
    
    <table>
    <tr>
    <td width=0%>
    - list 1<br>
    - list 2
    <td>
    <ul>
    <li>list 1</li>
    <li>list 2</li>
    </ul>
    <tr>
    <td width=0%>
    1. ordered list 1<br>
    1. ordered list 2
    <td>
    <ol>
    <li>ordered list</li>
    <li>ordered list 2</li>
    </ol>
    </table>
    
    <table>
    <tr>
    <td width=0%>
    |Table|Header|<br>
    |--------|----------|<br>
    |table |row 1[r,count(4,""):"&nbsp;"]|<br>
    |table |row 2[r,count(4,""):"&nbsp;"]|<br>
    |table |row 3[r,count(4,""):"&nbsp;"]|
    <td>
    
        <table>
        <tr>
        <th>
        Table
        <th>
        Header
        <tr class="bg">
        <td>
        table
        <td>
        row 1
        <tr>
        <td>
        table
        <td>
        row 2
        <tr class="bg">
        <td>
        table
        <td>
        row 3
        </table>
    
    </table>
    }]
!!
