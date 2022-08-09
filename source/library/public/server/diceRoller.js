function diceRoll(text, value, tokenName = undefined) {
    try {
        const diceReg = /(?:(?<no>\d+)d(?<sides>\d+)|(?<op>[-+]?)(?<mod>[0-9A-Za-z|]+))/gi;
        let matches = [...value.matchAll(diceReg)];
        let roll = {};

        for (let match of matches) {
            if (match.groups.no) roll.no = match.groups.no;
            if (match.groups.sides) roll.sides = match.groups.sides;
            if (match.groups.op) roll.op = match.groups.op;
            if (match.groups.mod) roll.mod = match.groups.mod;
        }

        let options = {
            isCrit: text == "Critical Hit!",
            text: text,
            diceResult: ""
        }

        for(let idx = 0; idx < roll.no; idx++){
            if(idx != 0 && idx % 5 == 0){
                options.diceResult += "</tr><tr>";
            }

            options.diceResult += `<td style="background: #dddddd url(lib://${ns}/client/images/d8.png) no-repeat left top; width:40px; height: 40px; vertical-align:middle; text-align: center; color:white;font-weight:bold;padding:3px">${roll.sides}</td>`;
        }

        let data = MT.getStaticData(ns, "/public/server/data/diceRoll.html");
        let final = evalTemplate(data, options);
        MT.broadcast(final);
    } catch (error) {
        MT.printException("showWelcome", error);
    }
}
//MTScript.registerMacro("diceRoll", diceRoll);

/******************************  Mocks  ******************************/
const ns = "net.dovesoft.notebook";

function evalTemplate(template, options) {
    let wrapper = "";
    try {
        wrapper = `"use strict";\r\n`;
        wrapper += `let options=${JSON.stringify(options)};\r\n`;
        wrapper += `let html=\`${template}\`;\r\n\r\nreturn html`;

        return Function(wrapper)();
    } catch (error) {
        MT.printException("evalTemplate: " + wrapper, error);
    }
}

class MT {
    static getStaticData(namespace, uri) {
        return "<table cellspacing=\"0px\" cellpadding=\"0px\" style=\"margin: 0px; padding: 0px; width:200px; border:1px solid ${options.isCrit ? '#cca300' : 'black'}\">" +
        "<tr><td style=\"margin: 0px; padding: 0px; text-align: left; color: white; background-color: ${options.isCrit ? '#cca300' : 'black'};\"> " +
        "${options.text}</td></tr><tr><td style=\"margin: 0px; padding: 0px; text-align: left;\"><table style=\"margin: 0px; padding: 0px\"> " +
        "<tr>${options.diceResult}</tr></table></td></tr></table>";
    }
     
    static broadcast(text) {
        console.log(text);
    }

    static printException(caller, error) {
        console.log(`<div style="width:200px;overflow:auto"><pre>Exception in ${caller}: ${error}\r\n${error.stack}</pre></div>`);
    }
}

diceRoll("Critical Hit!", "2d8+str", "Manfred");


/* -- Aeon Continuum Dice Roller

[h:dicePool  = arg(0)]
[h:dice      = arg(1)]
[h:results   = ""]
[h:success   = 0]
[h:botches   = 0]
[h:text      = ""]
[h:degree    = ""]
[h:index     = 0]
[h:img       = tableImage("Images",2,36)]

[h:tokenName = getSelectedNames()]
[h,if(tokenName == ""):tokenName=if(isGM(), "GM", getPlayerName())]

[h:cell="border:2px solid #444;border-right-color:#ccc;border-bottom-color:#ccc;padding:4px;padding-bottom:3px;background-color:#eee"]
[h:style=strformat("vertical-align:middle;display:inline-block;background:transparent url(%{img}) no-repeat center;" + 
		"width:32px; height:32px;font-weight:bold; text-align:center; border:0px solid gray;padding:5px")]         
[h:tableStyle="width:250px;border: 4px solid #ccc;border-right-color: #444; border-bottom-color: #444; background-color:#888"]
[h:resultStyle="border:2px solid black;text-align:center;padding:5px;font-weight:bold;background-color:"]

[h:output = strformat('
<table style="%{tableStyle}">
	<tr>
		<td style="%{cell}">
			<b>%{tokenName}</b> rolls <b>%{dicePool}:</b>
		</td>
	</tr>
	<tr>
		<td style="%{cell}">
			<table>
				<tr>
')];

[r,count(dice),code:{
	[h:roll=eval("1d10")]
	[h:results = json.append(results, roll)]
	[h,if(roll >= 7):success = success + 1]
	[h,if(roll == 1):botches = botches + 1]

	[h:color = json.get(getTableEntry("rollColor", roll), "value")]
	[h:output=output+strformat('
		<td style="%{style}">
			<span style="margin:auto"><font color="%{color}">%{roll}</font></span>
		</td>
	')];
	
	[h:index = index + 1]
	[if(index > 5),code:{
		[h:output=output+'</tr><tr>'];
		[h:index = 0]
	}]	
}]
[h:output=output+'</tr></table></td></tr><tr><td><span>Which is a</span>&nbsp;']

[if(success == 0),code:{
	[if(botches >= 1),code:{
		[h:'<!-- Roll was a botch -->']
		[h:resultStyle=resultStyle+"red;color:black"]
		[h:entry=if(botches > 5, 5, botches)]
		[h:degree=json.get(getTableEntry("RollDegrees", entry), "value")]
		[h:degree=json.get(degree,"botch")]
		[h:text=degree + " botch (" + botches + ")!"]
	};{
		[h:'<!-- Roll was a failure -->']
		[h:resultStyle=resultStyle+"gray;color:white"]	
		[h:text="failure..."]
	}]
};{
	[h:'<!-- Roll was a success -->']
	[h:resultStyle=resultStyle+"green;color:white"]			
	[h:text="success" + getTableEntry("RollDegrees", success)]
	[h:entry=if(success > 5, 5, success)]
	[h:degree=json.get(getTableEntry("RollDegrees", entry), "value")]
	[h:degree=json.get(degree,"success")]
	[h:text=degree + " success (" + success + ")!"]
}]
[h:output=output+strformat('<span style="%{resultStyle}">%{text}</span></td></tr></table>')];

[h:broadcast(output)]
[h:playClip("https://raw.githubusercontent.com/rtakehara/5e-Framework/master/Resources/Audio%20Clips/Dice%209.wav", 1, 1)]


*/


/* -- Rod Takehara's 5e Framework dice roller

[h:text=getStrProp(macro.args,"text")]
[h:diceRoll=getStrProp(macro.args,"value")]
[h:tokenName=getStrProp(macro.args,"tokenName")]
[h:iscrit=if(text=="Critical Hit!",1,0)]
[h:outputPC=getLibProperty("PC Output", "Lib:Character")]
[h:outputGM=getLibProperty("GM Output", "Lib:Character")]
[h:output=if(isGM()==1,outputGM,outputPC)]

<table style="border:1px solid [r:if(iscrit==1,'cca300','Black')];margin: 0px; padding: 0px" width=200>
    <tr>
        <td align=left style="margin: 0px; padding: 0px" bgcolor=[r:if(iscrit==1,"cca300","Black")]>
            <font color=White size=[r:if(length(text)>=35,2,3)]>
                <b>[r,if(length(text)>=35):substring(text,0,35)+"...";text]
    <tr>
        <td align=left style="margin: 0px; padding: 0px">
            <table style="margin: 0px; padding: 0px">
                <tr>

[h:HigherLevel=matches(diceRoll,".*slot\\d.*")]
[h,if(HigherLevel==1),code:{
    [h:baseLevel=replace(diceRoll,".*slot","")]
    [h:baseLevel=replace(baseLevel,"\\D.*\$","")]
    [h:Slots=""]
    [h:Slots=if(baseLevel<=1,listappend(Slots,1),Slots)]
    [h:Slots=if(baseLevel<=2,listappend(Slots,2),Slots)]
    [h:Slots=if(baseLevel<=3,listappend(Slots,3),Slots)]
    [h:Slots=if(baseLevel<=4,listappend(Slots,4),Slots)]
    [h:Slots=if(baseLevel<=5,listappend(Slots,5),Slots)]
    [h:Slots=if(baseLevel<=6,listappend(Slots,6),Slots)]
    [h:Slots=if(baseLevel<=7,listappend(Slots,7),Slots)]
    [h:Slots=if(baseLevel<=8,listappend(Slots,8),Slots)]
    [h:Slots=if(baseLevel<=9,listappend(Slots,9),Slots)]
    [h:res=input("slot|"+Slots+"|Select Higher Level|list|value=string")]
    [h:abort(res)]
    [h:UsedSlot=slot-baseLevel]
	
    [h:slotId=strfind(diceRoll,"(\\d+)d(\\d+).?[Ss]lot\\d")]
    [h,count(getFindCount(slotId)),code:{	
        [h:dices=getGroup(slotId,roll.count+1,1)]
        [h:sides=getGroup(slotId,roll.count+1,2)]
        [h:dices=number(dices*UsedSlot)]
        [h,if(dices==0):diceRoll=replace(diceRoll,"(\\d+)d(\\d+).?[Ss]lot\\d","",1);diceRoll=replace(diceRoll,"(\\d+)d(\\d+).?[Ss]lot\\d",dices+"d"+sides,1)]
        [h:diceRoll=replace(diceRoll,"\\+\\+","+")]
        [h:diceRoll=replace(diceRoll,"\\+\$","")]
        [h,if(diceRoll==""):abort(0),""]
    }]
};{}]

[h:formula=""]
[h:row=0]
[h:critFormula=""]
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
        [r:if(roll.count==0,"","")]
        [h:dice=roll(1,group3)]
        [h:dice=if(group1=="-",dice*-1,if(firstRoll==0,"","+")+dice)]
        [h:formula=add(formula,dice)]
        [r:if(row>=5,"<tr>","")]
        [h:row=if(row>=5,0,row)]
        [h:row=row+1]

        <td style="padding-top: 5px; margin: 0px; padding: 0px" align=center valign=middle width=35>
            [h,if(group3==100):img=tableImage("BlankDice",10);img=tableImage("BlankDice",group3)]
            <table>
                <tr>
                    <td width=32 height=32 align=center valign=middle background=[r:img] style="background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px;">
                        <font color=[r:if(dice==group3,"3cff00",if(dice==1,"ff5b5b","white"))] size=4>
                        <b>[r,if(group3==100):if(floor(dice/10)==10,"00",floor(dice/10));if(group3==10,if(dice==10,0,dice),dice)]
            </table>

        [r,if(group3==100):"<td>
            <table>
                <tr>
                    <td width=32 height=32 align=center valign=middle background="+img+" style='background-repeat: no-repeat;background-position: center; padding-left:4px; padding-bottom:5px;'>
                        <font color="+if(dice==group3,"3cff00",if(dice==1,"ff5b5b","white"))+" size=4>
                            <b>"+substring(dice,length(dice)-1,length(dice))+"</table>";""]
        [h,if(group3==100):row=row+1;""]
    };{}]

    [h,if(isNumber(group3)==1):critFormula=critFormula+"+"+group2+"d"+group3]
    [r,if(isNumber(group4)==1),code:{
        <td align=center valign=middle style="margin: 0px; padding: 0px">
        <font size=4 color=gray><b>[r:group1+group4]
        [h:lvl=0]
        [h:formula=add(formula,number(group1+group4))]
    };{
        [h:lvl=0]
    }]

    [h,if(lvl==""):lvl=0;""]
    [h:lvl=if(group1=="-",lvl*-1,lvl)]
    [h:formula=add(formula,lvl)]

    [r:if(lvl<0,"",
        if(lvl==0,"",
            if(firstRoll==0,"","")))+
            if(lvl==0,"","
                <td align=center valign=middle width=0% style='margin: 0px; padding: 0px'>
                    <font size=4 color=gray>
                    <b>"+if(lvl<0,lvl,"+"+lvl))]

    [h:countMax=listcount(group4,"|")]
    [h:countMax=if(countMax==0,1,countMax)]
    [h:maxValue=""]
    [h:atrValue=listget(listsort(maxValue,"N-"),0)]
    [h,if(atrValue==""):"";atrValue=eval(string(atrValue))]
}]

	
</table>


<table width=100% style="margin: 0px; padding: 0px; border-style: solid ; border-width:1px 0px 0px 0px; border-color:[r:if(iscrit==1,'cca300','Black')]">	
<tr>
<td style="margin: 0px; padding: 0px">
<font size=4 color=red style="text-decoration:none"><b>

[r:macroLink(formula,"Take Damage@Lib:Character","",formula)]

</b>
<font size=3 color=gray>

([r:diceRoll])

[h:macro.return=formula]
    	
</table>

</table>
[h:crit=critFormula+"+"+formula]
<font color=gray size=2 style="text-decoration:none">
[r,if(iscrit!=1):macroLink("[roll crit]","Dice Roller@Lib:Notebook",output,"text=Critical Hit!;value="+crit+";tokenName="+tokenName),1)]

[r,if(output!="all"):macroLink("[Share Result]","ShareRoll@Lib:Character","all",formula)]*/