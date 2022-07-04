[h:share=macroLinkText("Shared Frame@Lib:Notebook", "none", macro.args)]

[h:playerlist=getAllPlayerNames()]

[h:res=input("target|all,GM,"+playerlist+"|Share to|List|value=string",
"self|1|Copy to self|Check")]
[h:abort(res)]

[h,if(self==1):target=listappend(target,"self")]

[h:execLink(share,0,target)]