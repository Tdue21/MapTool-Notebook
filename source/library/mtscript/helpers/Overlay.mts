[h:toggle=getStrProp(macro.args,"toggle")]
[h:visibility=if(toggle==0 || toggle=="","inline","none")]

[h:outputPC=aeon.readSetting("outputPC")]
[h:outputGM=aeon.readSetting("outputGM")]
[h:output=if(isGM()==1,outputGM,outputPC)]

[h:info=getInfo("client")]

[overlay("Framework Macros","zorder=4;"):{
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="overlay.css@Lib:Core">
	<style>[r:strformat("#hide {display: %{visibility};}")]</style>
</head>
<body>

<!-------------------Toggle------------------->
	<div class="menu">
		[h:rotate=if(toggle==0 || toggle=="","180deg","0deg")]
		[h:doToggle=if(toggle==0 || toggle=="",1,0)]
		[h:chevron=tableImage("Images", 4, 22)]
		[h:link=strformat("<img style='transform: rotate(%{rotate});' src='%{chevron}'>")]
		
		[r:macrolink(link,"Mini Menu@Lib:Core","","toggle="+doToggle)]
	</div>

	<div id="hide">
		<!-------------------Map------------------->
		<div class="menu">
			[h:maps=getAllMapNames()]
			[h:maps=listsort(maps,"N")]
			[h:visibleMaps=maps]
			[h,foreach(map,maps,""),code:{
				[h,if(getMapVisible(map) == 1):"";visibleMaps=listdelete(visibleMaps,listfind(visibleMaps,map))]				
			}]
			[h,if(isGM()==1):maps=maps;maps=visibleMaps]			
			[h:maps=listsort(maps,"N")]
			[h:image=tableImage("Images", 5, 32)]
			[h:hidden=tableimage("Images", 6, 16)]

			[r:macroLink(strformat("<img src='%{image}'>"),"function.selectMap@Lib:Core")]
			<div class="submenu">
				<table class="border">
					<tr>
					[r,foreach(map, maps,"</tr><tr>"),code:{
						<td>
							[r,if(map == getCurrentMapName()):"<b>";""]
							<span>
							[r:macroLink(map, "function.selectMap@Lib:Core", "", json.fromStrProp(map+"=overlay"))]
							[r,if(getMapVisible(map) == 0):"<img src="+hidden+">"; ""]
							</span>	
							[r,if(map == getCurrentMapName()):"</b>";""]
						</td>
					}]
				</tr>
				</table>
			</div>
		</div>


</div>

}]