let data = {};

function fetch(uri, options = null) {
    return new Promise(resolve => resolve(new Response(options?.body)));
}

const MapTool = {
    getUserData: function () {
        try {
            let testData = btoa(JSON.stringify(data));
            return new Promise(resolve => resolve(testData));

        } catch (error) {
            console.log(error);
        }
    }
}

let req = new XMLHttpRequest();
req.open("GET", "../server/data/userguide.json", false);
req.onload = function () {
    let rawdata = this.response;
    data = JSON.parse(rawdata).find(item => item.title == "User Guide");
};
req.send();