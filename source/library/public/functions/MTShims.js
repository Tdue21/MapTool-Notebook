"use strict";

const getDefinedFunctions = (delim) => MTScript.execMacro(`[r:getDefinedFunctions("${delim}")]`);

const getLibProperty = (name) => MTScript.execMacro(`[r:getLibProperty("${name}", "${UDFNameSpace}")]`);

const setLibProperty = (name, value) => MTScript.execMacro(`[h:setLibProperty("${name}", "${value}", "${UDFNameSpace}")]`);

const getLibraryInfo = (ns) => MTScript.execMacro(`[r:library.getInfo("${ns}")]`);

const getStaticData = (namespace, path) => MTScript.execMacro(`[r:data.getStaticData("${namespace}", "${path}")]`);

const printException = (caller, error) => MapTool.chat.broadcast(`<pre>Exception in ${caller}: ${error}\r\n${error.stack}</pre>`)

const MTdecode = (data) => MTScript.execMacro(`[r:decode(${data})]`);
