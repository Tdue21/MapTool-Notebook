[dialog5("Markdown Help", "width=350; height=550; temporary=0; input=1; noframe=0"): {
<html>
<head>
	<link rel="stylesheet" type="text/css" href="GitHub@Lib:Notebook">
[r:'
<style type="text/css">
table {
	margin:0px;
	padding:0px;
	width:99%;
}
table caption {
	background-color:#444;
	color:white;
	padding:5px;
	width:99%;
	margin-top:5px;
	font-weight:bold;
}
</style>']
</head>
<body>

<table>
	<caption>Headings</caption>
	<tr>
		<td># Heading 1</td>
		<td><h1><font size=6>Heading 1</h1></td>
	</tr>
	<tr>
		<td>## Heading 2</td>
		<td><h2><font size=5>Heading 2</h2></td>
	</tr>
	<tr>
		<td>### Heading 3</td>
		<td><h3><font size=4>Heading 3</h3></td>
	</tr>
</table>

<table>
	<caption>Styles</caption>
	<tr>
		<td>**Bold**</td>
		<td><b>Bold</b></td>
	</tr>
	<tr>
		<td>*Italic*</td>
		<td><i>Italic</i></td>
	</tr>
	<tr>
		<td>~~striketrough~~</td>
		<td><s>striketrough</s></td>
	</tr>
	<tr>
		<td>_underline_</td>
		<td><u>underline</u></td>
	</tr>
</table>

<table>
	<caption>Links</caption>
	<tr>
		<td>[r:"[link](url)"]</td>
		<td><a href="url">link</a></td>
	</tr>
	<tr>
		<td>[r:'[1d6](roll "1d6")']</td>
		<td>[r:macroLink("1d6","Dice Roller@Lib:Notebook","all","text=1d6;value=1d6;tokenName=")]</td>
	</tr>
	<tr>
		<td>[r:'[+1](to hit "1")']</td>
		<td>[r:macroLink("+1","d20 Roller@Lib:Notebook","all","text=+1;value=++1;color=Red")]</td>
	</tr>
	<tr>
		<td>[r:'[spell](spell)']</td>
		<td><a href=[r:getLibProperty("search","Lib:Notebook")]spell>spell</a></td>
	</tr>
	<tr>
		<td>[r:"![](image url)"]</td>
		<td><img src="image url" width=50></td>
	</tr>
	<tr>
		<td>[r:'[r:getPlayerName()]']</td>
		<td>[r:getPlayerName()]</td>
	</tr>
</table>

<table>
	<caption>Quotes &amp; Blocks</caption>
	<tr>
		<td>---</td>
		<td><hr noshade></td>
	</tr>
	<tr>
		<td>&gt; Blockquote</td>
		<td><blockquote>Blockquote</blockquote></td>
	</tr>
	<tr>
		<td>```<br>Custom Codeblock<br>```</td>
		<td><div>Custom Codeblock</div></td>
	</tr>
</table>

<table>
	<caption>Lists</caption>
	<tr>
		<td width=0%>
			- list 1<br>
			- list 2
		</td>			
		<td>
			<ul>
			<li>list 1</li>
			<li>list 2</li>
			</ul>
		</td>			
	</tr>
	<tr>
		<td width=0%>
			1. ordered list 1<br>
			1. ordered list 2
		</td>			
		<td>
			<ol>
			<li>ordered list</li>
			<li>ordered list 2</li>
			</ol>
		</td>			
	</tr>
</table>

<table>
	<caption>Tables</caption>
	<tr>
		<td width=0%>
			|Table|Header|<br>
			|--------|----------|<br>
			|table |row 1[r,count(4,""):"&nbsp;"]|<br>
			|table |row 2[r,count(4,""):"&nbsp;"]|<br>
			|table |row 3[r,count(4,""):"&nbsp;"]|
		</td>
		<td>
			<table>
				<tr>
					<th>Table
					<th>Header
				<tr class="bg">
					<td>table
					<td>row 1
				<tr>
					<td>table
					<td>row 2
				<tr class="bg">
					<td>table
					<td>row 3
			</table>
		</td>
	</tr>
</table>
}]