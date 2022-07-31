
/**
 * 
 * @param {string} uri 
 * @param {any} options 
 * @returns 
 */
function fetch(uri, options = null) {
        return new Promise(resolve => resolve(new Response(1)));
}

const MapTool = {
    getUserData : function()  {
        const data = 
        {
            "title": "User Guide",
            "summary": "User guide for MapTool notebook add-on.",
            "owner": "net.dovesoft.notebook",
            "private": false,
            "pages": [
                {
                    "name": "0. Introduction",
                    "content": "Welcome to the user guide for MapTool Notebook.\n\nThis add-on library came to as a result of me wanting to learn how to utilize the new add-on functionality in MapTool 1.11.  In addition I could use it to learn javaScript, a script language I have long wanted to learn, but never really had the opportunity to learn. This library is built from scratch, but has been heavily inspired by the excellent [notebook library](https://github.com/rtakehara/5e-Framework/tree/master/Resources) by Rod Takehara."
                },
                {
                    "name": "1. Basic Use",
                    "content": "Basically *MT Notebook* allows any user to create and maintain notebooks. These can be used for personal notes, party notes, game master's notes etc. At it's simplest a notebook is a collection of text pages. Each page is composed of a title, and a text. The text can of course be pure text, but it can also be formatted by using [markdown](https://en.wikipedia.org/wiki/Markdown)."
                },
                {
                    "name": "2. Second section",
                    "content": "content of page 2"
                },
                {
                    "name": "3. Third section",
                    "content": "content of page 3"
                }
            ]
        };
        let testData = btoa(JSON.stringify(data));
        return new Promise(resolve => resolve(testData));
    }
}