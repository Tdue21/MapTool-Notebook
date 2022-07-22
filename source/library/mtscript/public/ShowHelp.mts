[h:data = json.set("{}", "playerName", getPlayerName(), 
                         "rollD6", macroLink("1d6","Dice_Roller@this","all","text=1d6;value=1d6;tokenName="), 
                         "toHit", macroLink("+1","D20_Roller@this","all","text=+1;value=++1;color=Red"))]
[r:encoded=base64.encode(data)]                         

[h:html.dialog5("Markdown Help", "Lib://net.dovesoft.Notebook/html/help.html", "width=350; height=550; temporary=0; input=1; noframe=0; value=" + encoded)]
