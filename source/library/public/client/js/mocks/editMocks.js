const data={
    "name":"Notebook - A book",
    "kind":"dialog5",
    "book": {
        "title": "A book",
        "summary": "The is the summary",
        "owner": "Gertrude",
        "private": false,
        "accent": "#cccccc",
        "readonly": false,
        "pages":[
            {
                "name":"The first page",
                "content":"Content of the first page."
            }
        ]
    }
};

function fetch(uri, options = null) {
    return new Promise(resolve => resolve(new Response(options?.body)));
}

const MapTool = {
    getUserData: function () {
        try {
            let encoded = transEncode(data);
            return new Promise(resolve => resolve(encoded));
        } catch (error) {
            console.log(error);
        }
    },

    log: function(message) {
        console.log(message);
    }
}

// let req = new XMLHttpRequest();
// req.open("GET", "../server/data/userguide.json", false);
// req.onload = function () {
//     let rawdata = this.response;
//     data = JSON.parse(rawdata).find(item => item.title == "User Guide");
// };
// req.send();