### Headings

Headings are easy. Just add a number of `#`s to get the heading level you want. Remember the space between the `#`s and the text.
| Syntax | Result |
| :--- | :--- |
| `# Heading 1` | <h1>Heading 1</h1> |
| `## Heading 2` | <h2>Heading 2</h2> |
| `### Heading 3` | <h3>Heading 3</h3> |
| `#### Heading 4` | <h4>Heading 4</h4> |

### Styles

Text styles are just as easy. 
| Syntax | Result |
| :--- | :--- |
| `**Bold**` | **Bold** |
| `*Italic*` | *Italic* |
| `~~Strikethrough~~` | ~~Strikethrough~~ |
| `_underline_` | _underline_ |

### Links

You can add links in different ways, depending on what kind it is. 

An external link (or internal for that matter) is defined like this: 

```
[RPTools Homepage](https://rptools.net)
```

The result would be this: 
[RPTools Homepage](https://rptools.net)

### Images
Embedding images is much like links,except you add a `!` in front. 

This will embed an image from the notebook library add-on. 

```
![](lib://net.dovesoft.notebook/client/images/quill-paper.png)
```
![](lib://net.dovesoft.notebook/client/images/quill-paper.png)

You can embedded MapTool assets like this: 

```
![](asset://8bd5d42f6f7dca7057a86f790ceecb3c)
```
![](asset://8bd5d42f6f7dca7057a86f790ceecb3c)

You can affect the size of the image by adding a `=xxx` to the end of the uri. 
This will be interpreted as an absolute width in pixels for the image, and it 
will be scaled accordingly. 
```
![](asset://8bd5d42f6f7dca7057a86f790ceecb3c=50)
```
![](asset://8bd5d42f6f7dca7057a86f790ceecb3c=50)

### Embed macros and function calls
You can embed MapTool macros and functions in your text as well. 
This could be something like this: 
<code>&#91;r:getPlayerName()]</code> would result in this: [r:getPlayerName()].   
Or <code>&#91;r:eval("1d6")]</code> = [r:eval("1d6")] (Note that this value will change every time this page is loaded).


### Horizontal ruler

At least three minus characters, `---` but can be more.
```
---
--------
```

---
--------

## Blockquotes

```
> Blockquote
```

> Blockquote

## Codeblocks

\```
`Custom Codeblock`
\```


```div
Custom Codeblock
```


# Lists

```
- item a
- item b
	- item b1
	- item b2
- item c

1. item 1
1. item 2
	1. item a
	1. item b
1. item 3
```
- item a   
- item b
	- item b1
	- item b2
- item c

1. item 1
1. item 2
	1. item a
	1. item b
1. item 3


# Tables

```
|Left aligned|Center aligned| Right aligned |
| :--- | :---: | ---: |
| table | row 1 | row 1 |
| table | row 2 | row 2 |
| table | row 3 | row 3 |
```

|Left aligned|Center aligned| Right aligned |
| :--- | :---: | ---: |
| table | row 1 | row 1 |
| table | row 2 | row 2 |
| table | row 3 | row 3 |
