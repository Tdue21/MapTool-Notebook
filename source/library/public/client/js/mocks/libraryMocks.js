let data = JSON.parse(`{"isGM":true,"playerName":"Thomas","userPrefs":{"asFrame":"false"},"notebooks":[{"title":"User Guide","summary":"THis is the summary of the most awesome user guide in the multiverse. Actually, it is so awesome that even AO is in awe of it","owner":"net.dovesoft.notebook","private":false,"accent":"#61003E","readonly":true,"pages":[{"name":"0. Introduction","uri":"/public/docs/userguide_intro.md"},{"name":"1. Basic Use","uri":"/public/docs/userguide_basics.md"},{"name":"2. Syntax","uri":"/public/docs/userguide_syntax.md"},{"name":"3. Changelog","uri":"/public/docs/userguide_changelog.md"}]}]}`);





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