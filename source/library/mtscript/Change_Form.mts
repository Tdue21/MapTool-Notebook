[h:macro.args=replace(macro.args,"\\n","%0A")]
[h:name=getStrProp(macro.args,"name")]
[h:tokenName=getStrProp(macro.args,"tokenName")]

[h:object=getLibProperty("Value",tokenName)]
[h:broadcast("Object: " + object)]
[if(object == ""):object="{}"]
[h:broadcast("Object: " + object)]
[h:description=json.get(object,name)]

[h: processorLink = macroLinkText("Change Form process@Lib:Notebook", "")]

[dialog5(tokenName+" - "+name+" - Edit", "width=650; height=550; temporary=1; input=1; noframe=0"): {
<html>
<head>
	<link rel="stylesheet" type="text/css" href="GitHub5@Lib:Notebook">
</head>
<body>
	<form action="[r:processorLink]" method="json">
		<input type="hidden" name="name" value="[r:name]">
		<input type="hidden" name="tokenName" value="[r:tokenName]">
		<table style="height:98%">
			<tr style="height:25px">
				<td><input type="submit" name="button" value="Save"></td>
				<td><input type="submit" name="cancel" value="Cancel"></td>
				<td><input type="submit" name="delete" value="Delete"></td>
				<td><p class="tooltip">[r:macroLink("Help","Help@Lib:Notebook")]
					<span class="tooltiptext">
						<span style="font-size:1.6em"># Heading</span><br>
						<span style="font-weight:bold">**Bold**</span><br>
						<span style="font-style:italic">*Italic*</span><br>
						<span style="text-decoration:underline">_underline_</span><br>
						<span style="text-decoration:line-through">~~strikethrough~~</span><br>
						<span style="text-decoration:underline">&#91;link&#93;(url)</span><br>
					</span>
				<p></td>
			</tr>
			<tr style="height:25px">
				<td colspan="4">
					<input type="text" name="title" value="[r:if(name=='new','',name)]" 
					       style="width:100%;box-sizing:border-box">
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<textarea name="value" style="width:100%;height:100%;box-sizing:border-box">
						[r:if(decode(name)=="new","",description)]
					</textarea>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>

}]