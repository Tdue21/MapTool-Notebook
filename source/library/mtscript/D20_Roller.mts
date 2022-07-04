[h:text=getStrProp(macro.args,"text")]
[h:color=getStrProp(macro.args,"color")]
[h:diceRoll=getStrProp(macro.args,"value")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:outputPC=getLibProperty("PC Output", "Lib:Notebook")]
[h:outputGM=getLibProperty("GM Output", "Lib:Notebook")]
[h:output=if(isGM()==1,outputGM,outputPC)]

[h:atrList=""]
[h:roll1=1d20]
[h:roll2=1d20]

<!--------------------------------DICE SOUNDS---------------------------------->
[macro("Dice Sounds@Lib:Notebook"):""]
[macro("Dice Sounds@Lib:Notebook"):""]

[h:img=tableImage("BlankDice",20)]
[h:color=if(color=="death",if(roll1>=10,"green","red"),color)]
[h:diceSize=getLibProperty("diceSize","Lib:Notebook")]

<table style="border:1px solid [r:color];" width="150px">
	<tr>
		<td colspan=4 bgcolor=[r:color]>
			<font color=white><b>[r:text]:</b> ([r:roll1]/[r:roll2])
		</td>
	</tr>
	<tr>
		<td style="padding: 0px" align=center valign=middle width=25%>
			<table>
				<tr>
					<td align=center valign=middle background= style="padding:0px; padding:0px">
						<img src=[r:img+"-"+diceSize]>
					</td>
				</tr>
			</table>
		</td>		
		<td align=center valign=middle width=25%>
			<font size=4 color=gray><b>
				[h:formula=""]
				[h:advRoll=if(roll1>roll2,roll1,roll2)]
				[h:disadvRoll=if(roll1<roll2,roll1,roll2)]

[h:id=strfind(diceRoll,"([-+]?)(?:(\\d+)d(\\d+)|([0-9A-Za-z|]+))")]
[r,count(getFindCount(id),""),code:{
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group4=getGroup(id,roll.count+1,4)]

	[h:dices=if(group2=="",1,group2)]
	[h:group2=if(isNumber(group2)==1,group2,0)]

	[h:firstRoll=roll.count]
	[r,if(isNumber(group3)==1),count(dices,""),code:{

		[r:if(roll.count==0,"","+")]
		[h:dice=roll(1,group3)]
		[r:dice=if(group1=="-",dice*-1,if(firstRoll==0,"","+")+dice)]
		[h:formula=add(formula,dice)]
		
	};{}]

	[r,if(isNumber(group4)==1),code:{
		
		[h:lvl=0]
		[r:group1+group4]
		[h:formula=add(formula,number(group1+group4))]
	
	};{
		[h:lvl=getStrProp(classProps,group4)]
		
	}]
	[h:formula=add(formula,lvl)]

	[h,if(lvl==""):lvl=0;""]
	[r:if(lvl<0,"",if(lvl==0,"",if(firstRoll==0,"","+")))+if(lvl==0,"",lvl)]


[h:countMax=listcount(group4,"|")]
[h:countMax=if(countMax==0,1,countMax)]
[h,count(countMax):index=listfind(atrList,listget(group4,roll.count,"|"))]
[h:maxValue=""]
[h:atrValue=listget(listsort(maxValue,"N-"),0)]
[h,if(atrValue==""):"";atrValue=eval(string(atrValue))]
[h,if(index==-1):mod=0;mod=floor(number(atrValue)/2)-5]

	[h:formula=add(formula,mod)]

	[r:if(mod<0,"",if(mod==0,"","+"))+if(mod==0,"",mod)]
}]


[h:formulaNormal=add(formula,roll1)]



		<td align=center valign=middle width=25%>
		<font size=4 color=[r:color]><b>


		[r:formulaNormal]
		
		<td valign=middle width=25%>
		<font size=2 color=gray>Adv:
		
		[r:adv=add(formula,advRoll)]

		
		<br>
		<font size=2 color=gray>Dis:
		
		[r:dis=add(formula,disadvRoll)]
		

		
</table>

[h:macro.return="normal="+formulaNormal+";adv="+adv+";dis="+dis]

<font color=gray size=2 style="text-decoration:none">


[r,if(output!="all"):macroLink(if(output=="all","","[Share Result]"),"ShareRoll@Lib:Notebook","all",formulaNormal)]
[r,if(output!="all"):macroLink(if(output=="all","","[Adv]"),"ShareRoll@Lib:Notebook","all",adv)]
[r,if(output!="all"):macroLink(if(output=="all","","[Dis]"),"ShareRoll@Lib:Notebook","all",dis)]
