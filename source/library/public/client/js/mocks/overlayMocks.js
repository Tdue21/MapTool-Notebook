let data = {
    isGM: 1,
    playerName:"Gertrud"
};

function fetch(uri, options = null) {
    return new Promise(resolve => resolve(new Response(options?.body)));
}

const MapTool = {
    getUserData: function () {
        try {
            return new Promise(resolve => resolve(data));
        } catch (error) {
            console.log(error);
        }
    }
}

/*
let req = new XMLHttpRequest();
req.open("GET", "../server/data/settings.json", false);
req.onload = function () {
    let rawdata = this.response;
    data = JSON.parse(rawdata);
};
req.send();
*/