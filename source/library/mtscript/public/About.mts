[h:dialogName="About"]
[h:info=getInfo("client")]
[h:appVersion=json.get(info,"version")]
[h:libVersion=getLibProperty("libversion","Lib:Notebook")]
[h:author=getLibProperty("Author","Lib:Notebook")]

[h,if(isDialogVisible(dialogName) == 1):closeDialog(dialogName)]

[dialog5(dialogName, "width=400; height=350; temporary=1; noframe=0; input=1"):{
<html>
<head>
	<link rel="stylesheet" type="text/css" href="GitHub5@Lib:Notebook">
</head>

<body style="background-color:white;padding:0px">
<h2>About</h2>

<div style="float:left;background-color:transparent;">
	<img src="[r:getTokenImage(100)]">
</div>

<p>
This library is heavily based on the <a href="https://github.com/rtakehara/5e-Framework/tree/master/Resources">Notebook library</a> from Rod Takehara. </p>

<p>
I have mainly polished the code and updated the use of frames and dialogs to use <code>frame5()</code> and <code>dialog5()</code>.
</p>

<p>
<table>
<tr><td><b>Version:</b> [r:libVersion]</td></tr>
<tr><td><b>By:</b> [r:author].</td></tr>
</table>
</p>

</body>
</html>
}]