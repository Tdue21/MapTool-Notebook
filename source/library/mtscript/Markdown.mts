[h:entry=decode(getStrProp(macro.args,"description"))]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:source=getStrProp(macro.args,"source")]
[h:name=getStrProp(macro.args,"name")]
[h:jsonGroup=getStrProp(macro.args,"group")]

[h:outputPC=getLibProperty("PC Output", "Lib:Notebook")]
[h:outputGM=getLibProperty("GM Output", "Lib:Notebook")]


[h:output=if(isGM()==1,outputGM,outputPC)]



<!-------------- FUNCTION ---------------->
[h:id=strfind(entry,"\\[(\\w*?):(.*?)\\]")]
[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group2=eval(group2)]
	[h:entry=replace(entry,"\\[\\w*?:(.*?)\\]",if(group1=="r",group2,""),1)]
}]



[h:entry=replace(entry,"&#91;","\\[")]
[h:entry=replace(entry,"&#93;","\\]")]

<!-------------- CHARACTERS ---------------->


[h:entry=replace(entry,"\\\\\\*","&#42;")]
[h:entry=replace(entry,"(?!-)\\s*-\\s*?(?=\\|)(?!-)","&mdash;")]

[h:entry=replace(entry,"\\\\\\_","&#95;")]
[h:entry=replace(entry,"\\\\\\#","&#35;")]
[h:entry=replace(entry,"\\\\\\\\","&#92;")]
[h:entry=replace(entry,"\\\\\\{","&#123;")]
[h:entry=replace(entry,"\\\\\\}","&#125;")]
[h:entry=replace(entry,"\\\\\\[","&#91;")]
[h:entry=replace(entry,"\\\\\\]","&#93;")]
[h:entry=replace(entry,"\\\\\\(","&#40;")]
[h:entry=replace(entry,"\\\\\\)","&#41;")]
[h:entry=replace(entry,"\\\\\\.","&#46;")]
[h:entry=replace(entry,"\\\\\\!","&#33;")]
[h:entry=replace(entry,"\\\\\\|","&#124;")]
[h:entry=replace(entry,"\\\\\\+","&#43;")]
[h:entry=replace(entry,"\\\\\\-","&#45;")]


<!---------Fenced Code Block---------->
[h:CodeId=strfind(entry,"(?<=\\n\\n)```code([\\s\\S]*?)```(?=\\n\\n)")]
[h,count(getFindCount(CodeId)),code:{
	[h:group=getGroup(CodeId,roll.count+1,1)]
	[h:entry=replace(entry,"(?<=\\n\\n)```code([\\s\\S]*?)```(?=\\n\\n)","CODEBLOCKPLACEHOLDER"+roll.count+1,1)]
}]
<!---------Headeaing---------->
[h:id=strfind(entry,"(?<!#)#\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(?<!#)#\\s(.*)","<h1>"+group+"</h1>",1)]
}]
[h:id=strfind(entry,"(?<!#)##\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(?<!#)##\\s(.*)","<h2>"+group+"</h2>",1)]
}]
[h:id=strfind(entry,"(?<!#)###\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(?<!#)###\\s(.*)","<h3>"+group+"</h3>",1)]
}]
[h:id=strfind(entry,"(?<!#)####\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(?<!#)####\\s(.*)","<h4>"+group+"</h4>",1)]
}]
[h:id=strfind(entry,"(?<!#)#####\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(?<!#)#####\\s(.*)","<h5>"+group+"</h5>",1)]
}]
[h:id=strfind(entry,"(?<!#)######\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(?<!#)######\\s(.*)","<h6>"+group+"</h6>",1)]
}]
[h:id=strfind(entry,"(.+)\\n=+\\n\\n")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(.+)\\n=+\\n\\n","<h1>"+group+"</h1>",1)]
}]
[h:id=strfind(entry,"(.+)\\n-+\\n\\n")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(.+)\\n-+\\n\\n","<h2>"+group+"</h2>",1)]
}]


<!---------Bold---------->
[h:id=strfind(entry,"\\*\\*(.*?)\\*\\*")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"\\*\\*(.*?)\\*\\*","<b>"+group+"</b>",1)]
}]
<!---------Italic---------->
[h:id=strfind(entry,"\\*(.*?)\\*")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"\\*(.*?)\\*","<i>"+group+"</i>",1)]
}]
<!---------Underline---------->
[h:id=strfind(entry,"_(.*?)_")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"_(.*?)_","<u>"+group+"</u>",1)]
}]
<!---------Striketrough---------->
[h:id=strfind(entry,"~~(.*?)~~")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"~~(.*?)~~","<s>"+group+"</s>",1)]
}]
<!---------in line code---------->
[h:id=strfind(entry,"`(?!`)(.*?)`")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"`(?!`)(.*?)`","<code>"+group+"</code>",1)]
}]
<!---------horizontal ruler---------->
[h:entry=replace(entry,"(?<=\\n|^)([-_*]{3,})(?=\\n|\$)","<hr noshade>")]
<!---------Page Break---------->
[h:entry=replace(entry,"\\s\\s\\n","<br>")]
<!---------Blockquote---------->
[h:id=strfind(entry,"(?<=\\n\\n|^)>\\s([\\s\\S]*?>*.*)(?=\\n\\n|\$)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:qid=strfind(group,"(?<=\\n)(>>\\s[\\s\\S]*?)(?=(?<!>)>\\s)")]
	[h,count(getFindCount(qid)),code:{
		[h:group1=getGroup(qid,roll.count+1,1)]
		[h:group1=replace(group1,"\\n>>","<br>")]
		[h:group1=replace(group1,">>","")]
		[h:group=replace(group,"(?<=\\n)(>>\\s[\\s\\S]*?)(?=(?<!>)>\\s)","<blockquote>"+group1+"</blockquote>",1)]
}]
	[h:group=replace(group,"\\n>","<br>")]
	[h:group=replace(group,">>",">")]
	[h:entry=replace(entry,"(?<=\\n\\n|^)>\\s([\\s\\S]*?>*.*)(?=\\n\\n|\$)","<blockquote>"+group+"</blockquote>",1)]
}]


<!---------Code Block---------->
[h:id=strfind(entry,"(?<=\\n\\n|^)```([\\s\\S]*?)```(?=\\n\\n|\$)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"(?<=\\n\\n|^)```([\\s\\S]*?)```(?=\\n\\n|\$)","<div>"+group+"</div>",1)]
}]


<!-------------- TABLE---------------->
[h:id=strfind(entry,"(\\|{1}[\\s\\S]*?\\|{1})(?=\\n{2}|\$)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,1)]
	
	[h:find=replace(find,"\\[","OPENBRACKETPLACEHOLDER")]
	[h:find=replace(find,"\\]","CLOSEBRACKETPLACEHOLDER")]
	
	[h:ColCount=strfind(find,"(\\|[\\s:]*-{3,}[\\s:]*)")]
	[h:Col=getFindCount(ColCount)]
	
	[h:alignStr=""]
	[h,count(Col),code:{
		[h:alignMD=getGroup(ColCount,roll.count+1,1)]
		[h:left=matches(alignMD,"\\|:.*")]
		[h:right=matches(alignMD,".*:")]
		[h:align=if(right==1,if(left==1,"center","right"),"left")]
		[h:alignStr=listAppend(alignStr,align)]
	}]


	[h:RowCount=strfind(find,"(\\|\\n\\s*\\|)")]
	
	[h:find=replace(find,"(\\|.*-{3,}:*)","")]
	[h,count(Col):find=replace(find,"(\\|)","<th align="+listget(alignStr,roll.count)+">",1)]
	[h:find=replace(find,"(\\|)","",1)]
	
	
	
	
	[h:class="odd"]
	[h:colalign=0]
	[h,count(getFindCount(RowCount),"<br><br>"),code:{
	
		[h:find=replace(find,"(\\|\\n\\s*\\|)","<tr"+if(class=="even",""," class=bg")+">
	<td align="+listget(alignStr,0)+">"
		,1)]
		[h:class=if(class=="odd","even","odd")]
	
		[h,count(Col-1):find=replace(find,"(\\|)","<td align="+listget(alignStr,roll.count+1)+">
",
		1)]
	}]
	

	
	[h:find="<table><tr>
"+find+"</table>"]
	[h:find=replace(find,"<td align=\\w*?>
</table>","</table>")]
	
	[h:find=replace(find,"OPENBRACKETPLACEHOLDER","&#91;")]
	[h:find=replace(find,"CLOSEBRACKETPLACEHOLDER","&#93;")]
	
	[h:entry=replace(entry,"(\\|{1}[\\s\\S]*?\\|{1})(?=\\n{2}|\$)",find,1)]
}]

[h:entry=replace(entry,"&#91;","[")]
[h:entry=replace(entry,"&#93;","]")]
[h:entry=replace(entry,"&#40;","\\(")]
[h:entry=replace(entry,"&#41;","\\)")]
<!---------Roll---------->
[h:rollId=strfind(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+'\\([Rr][Oo][Ll]{2}\\s"(.*?)"\\)')]
[h,count(getFindCount(rollId)),code:{
	
	[h:entry=replace(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+'\\([Rr][Oo][Ll]{2}\\s"(.*?)"\\)',"ROLLPLACEHOLDER"+roll.count+1,1)]
}]


[h:entry=replace(entry,"\\+","PLUSPLACEHOLDER")]
<!---------To Hit---------->	
[h:hitId=strfind(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+'\\([Tt][Oo]\\s*[Hh][Ii][Tt]\\s"(.*?)"\\)')]
[h,count(getFindCount(hitId)),code:{
	
	[h:entry=replace(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+'\\([Tt][Oo]\\s*[Hh][Ii][Tt]\\s"(.*?)"\\)',"TOHITPLACEHOLDER"+roll.count+1,1)]
}]

<!---------Internal Links---------->
[h:id=strfind(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+"\\(([Ss]earch|[Tt]oken|[Nn]ote|[Nn]otebook)"+'\\s?("?.*?"?)\\)')]
[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group3=replace(group3,'"',"")]

	[h,if(group2=="token"),code:{

<!---------TOKEN ON MAP---------->
		[h:map=replace(group3,".*@","")]
		[h:tokenFocus=replace(group3,"@.*","")]
		[h,if(group2=="token"):objLink="<span title='token: "+group3+"'>"+macroLink(group1,"Focus Token@Lib:Character","","map="+map+";tokenName="+tokenFocus)+"</span>"]

	};{

<!---------CONTENT SEARCH---------->
		[h:search=getLibProperty("search","Lib:Notebook")]
		[h:ContentName=if(group3=="",group1,group3)]
		[h:objLink="<span title='Search: "+lower(ContentName)+"'><a href='"+search+encode(ContentName)+"'>"+group1+"</a></span>"]

	}]

<!---------NOTEBOOK---------->
	[h,if(group2=="note"),code:{
	
		[h:note=replace(group3,".*@","")]
		[h:chapter=replace(group3,"@.*","")]

		[h:note=if(matches(note,"^Lib:.*")==1,note,"Lib:"+note)]
		
		[h:object=getLibProperty("Value",note)]
[h:jsonValue=json.get(object,chapter)]
[h:objLink="<span title='note: "+group3+"'>"+macroLink(group1,"Content@Lib:Notebook","","key="+chapter+";description="+encode(jsonValue)+";tokenName="+note)+"</span>"]

	};{}]
	
	[h:entry=replace(entry,"(?<!!)\\[([\\s\\w\\d'-/\\(\\)\\.,;]*?)\\]"+"\\(([Ss]earch|[Tt]oken|[Nn]ote|[Nn]otebook)"+'\\s?("?.*?"?)\\)',objLink,1)]
}]


<!---------Image---------->

[h:id=strfind(entry,"!\\[(.*?)\\]\\((.*?)=?(\\d*)\\)")]
[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group2=if(matches(group2,"image:.*")==0,group2,getImage(group2))]
	
	[h:entry=replace(entry,"!\\[(.*?)\\]\\((.*?)=?(\\d*)\\)","<img src='"+group2+"' "+if(group1=="","","alt='"+group1+"'")+" width='"+group3+"'>",1)]
}]
<!---------Link---------->

[h:id=strfind(entry,"(?<!!)\\[(.*?)\\]\\((.*?)\\)")]
[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group2=replace(group2,"<u>","_")]
	[h:group2=replace(group2,"</u>","_")]

	[h,if(matches(group2,".*share=?\\d*\$")==1),code:{
		[h:size=replace(group2,"share","")]
		[h:imgSize=replace(group1,"width='?\\d*'","width"+size)]
		[h:group2=macroLinkText("ShareImg@Lib:Notebook","","share=1;description="+imgSize)]
	}]
	
	[h:entry=replace(entry,"(?<!!)\\[(.*?)\\]\\((.*?)\\)","<a href='"+group2+"' >"+group1+"</a>",1)]
}]


<!-------------- Task List ---------------->
[h:id=strfind(entry,"-\\s\\[([\\sx])\\]\\s(.*)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	
	[h:checked=if(matches(group1,".*x.*")==1," checked","")]
	
	[h:entry=replace(entry,"-\\s\\[([\\sx])\\]\\s(.*)","<br><input type=checkbox"+checked+"> "+group2,1)]
}]


[h:entry=replace(entry,"\\(","&#40;")]
[h:entry=replace(entry,"\\)","&#41;")]

[h:entry=replace(entry,"\\[","&#91;")]
[h:entry=replace(entry,"\\]","&#93;")]



<!---------Unordered List---------->
[h:id=strfind(entry,"(?<=\\n|\^)([-+*]\\s[\\s\\S]*?(?:[-+*]\\s.*|))(?=\\n\\n|\$)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]

	[h:ulid=strfind(group,"(\\t[-+*]\\s[\\s\\S]*?(?<!\\t))(?=[-+*]|\\n\\n|\$)")]
	[h,count(getFindCount(ulid)),code:{
		[h:group1=getGroup(ulid,roll.count+1,1)]
		[h:group1=replace(group1,"[-+*]\\s","<li>")]
		[h:group=replace(group,"(\\t[-+*]\\s[\\s\\S]*?(?<!\\t))(?=[-+*]|\\n\\n|\$)","<ul>"+group1+"</ul>",1)]
	}]
	
	[h:group=replace(group,"[-+*]\\s","<li>")]
	[h:entry=replace(entry,"(?<=\\n|\^)([-+*]\\s[\\s\\S]*?(?:[-+*]\\s.*|))(?=\\n\\n|\$)","<ul>"+group+"</ul>",1)]
}]
<!---------Ordered List---------->
[h:id=strfind(entry,"(?<=\\n|\^)(\\d+\\.\\s[\\s\\S]*?(?:\\d+\\.\\s.*|))(?=\\n\\n|\$)")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]

	[h:olid=strfind(group,"(\\t\\d+\\.\\s[\\s\\S]*?(?<!\\t))(?=\\d+\\.|\\n\\n|\$)")]
	[h,count(getFindCount(olid)),code:{
		[h:group1=getGroup(olid,roll.count+1,1)]
		[h:group1=replace(group1,"\\d+\\.\\s","<li>")]
		[h:group=replace(group,"(\\t\\d+\\.\\s[\\s\\S]*?(?<!\\t))(?=\\d+\\.|\\n\\n|\$)","<ol>"+group1+"</ol>",1)]
	}]
	
	[h:group=replace(group,"\\d+\\.\\s","<li>")]
	[h:entry=replace(entry,"(?<=\\n|\^)(\\d+\\.\\s[\\s\\S]*?(?:\\d+\\.\\s.*|))(?=\\n\\n|\$)","<ol>"+group+"</ol>",1)]
}]

<!---------Paragraph---------->
[h:entry=replace(entry,"\\?","&#63;")]
[h:entry=replace(entry,"\\*","&#42;")]
[h:entry=replace(entry,"\\+","&#43;")]


[h:id=strfind(entry,"((?:\\n\\n|^|(?<=\\n)>\\n)(?!<h\\d>|<[ou]l>|<div|<hr|<blockquote|<table|CODEBLOCKPLACEHOLDER)[\\s\\S]*?)(?=\\n\\n|\$|\\n>)")]
[h,count(getFindCount(id),"<hr>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	
	[h:entry=replace(entry,find,"<p>"+group+"</p>",1)]
}]
[h:entry=replace(entry,"<p>\\s*</p>","")]
[h:entry=replace(entry,"<p>\\s*<p>","<p>")]
[h:entry=replace(entry,"</p>\\s*</p>","</p>")]
<!---------Fenced Code Block---------->
[h:id=strfind(entry,"CODEBLOCKPLACEHOLDER\\d+")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(CodeId,roll.count+1,1)]
	[h:entry=replace(entry,"CODEBLOCKPLACEHOLDER\\d+","<pre><code>"+group+"</code></pre>",1)]
}]


<!---------Replace Roll---------->


[h:bonusDmg=""]

[h:id=strfind(entry,"ROLLPLACEHOLDER\\d+")]

[h:levelId=strfind(entry,"(?<=[Aa]t [Hh]igher [Ll]evels.*)ROLLPLACEHOLDER\\d+")]
[h:allRolls=getFindCount(id)]
[h:levelRolls=getFindCount(levelId)]
[h:levelRolls=allRolls-levelRolls]

[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(rollId,roll.count+1,1)]
	[h:group2=getGroup(rollId,roll.count+1,2)]

	[h:group2=replace(group2,"\\s","")]

[h:bonusDmg=if(levelRolls-roll.count>0,bonusDmg,0)]
	
	[h:entry=replace(entry,"ROLLPLACEHOLDER\\d+","<span title='roll: "+group2+"'>"+macroLink(group1,"Dice Roller@Lib:Notebook",output,"text="+group1+";value="+group2+";tokenName="+tokenName)+"</span>",1)]
}]


<!---------Replace To Hit---------->

[h:id=strfind(entry,"TOHITPLACEHOLDER\\d+")]

[h,count(getFindCount(id)),code:{
	[h:group1=getGroup(hitId,roll.count+1,1)]
	[h:group2=getGroup(hitId,roll.count+1,2)]

	[h:group2=replace(group2,"\\s","")]

	[h:text=group1]

	[h:entry=replace(entry,"TOHITPLACEHOLDER\\d+","<span title='to hit: "+group2+"'>"+macroLink(group1,"d20 Roller@Lib:Notebook",output,"text="+text+";value=("+if(group2<0,group2,"+"+group2)+");tokenName="+tokenName+";color=red")+"</span>",1)]
}]
[h:entry=replace(entry,"PLUSPLACEHOLDER","+")]



[r:entry]
