[h:id=getStrProp(macro.args,"id")]
[h:tokenName=getName(id)]
[h:switchToken(id)]

<!-----------------CONFIRM------------------->
[h:res=input("var|Set "+tokenName+"'s token as a notebook?||label|span=true")]
[h:abort(res)]

[h,if(tokenName=="Lib:Notebook"),code:{

	[h:res=input("var|You can't use "+tokenName+", select a blank token and try again.||label|span=true")]
	[h:abort(0)]

};{}]

<!-----------------MACROS------------------->
[h,if(matches(tokenName,"^Lib:.*")==1):"";setName("Lib:"+tokenName)]

[h:macroList=getMacros()]

[h,if(listfind(macroList,"Notebook")<0):createMacro("Notebook","[macro('Index@lib:Notebook'):'Lib:"+tokenName+"']", "minWidth=120;fontColor=white;color=gray50;")]
