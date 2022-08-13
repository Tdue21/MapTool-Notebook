const data="eyJ0aXRsZSI6IlVzZXIgR3VpZGUiLCJzdW1tYXJ5IjoiVEhpcyBpcyB0aGUgc3VtbWFyeSBvZiB0aGUgbW9zdCBhd2Vzb21lIHVzZXIgZ3VpZGU" + 
           "gaW4gdGhlIG11bHRpdmVyc2UuIEFjdHVhbGx5LCBpdCBpcyBzbyBhd2Vzb21lIHRoYXQgZXZlbiBBTyBpcyBpbiBhd2Ugb2YgaXQiLCJvd25lci" + 
           "I6Im5ldC5kb3Zlc29mdC5ub3RlYm9vayIsInByaXZhdGUiOmZhbHNlLCJhY2NlbnQiOiIjNjEwMDNFIiwicmVhZG9ubHkiOnRydWUsInBhZ2VzI" + 
           "jpbeyJuYW1lIjoiMC4gSW50cm9kdWN0aW9uIiwidXJpIjoiL3B1YmxpYy9kb2NzL3VzZXJndWlkZV9pbnRyby5tZCJ9LHsibmFtZSI6IjEuIEJh" + 
           "c2ljIFVzZSIsInVyaSI6Ii9wdWJsaWMvZG9jcy91c2VyZ3VpZGVfYmFzaWNzLm1kIn0seyJuYW1lIjoiMi4gU3ludGF4IiwidXJpIjoiL3B1Ymx" + 
           "pYy9kb2NzL3VzZXJndWlkZV9zeW50YXgubWQifSx7Im5hbWUiOiIzLiBDaGFuZ2Vsb2ciLCJ1cmkiOiIvcHVibGljL2RvY3MvdXNlcmd1aWRlX2" + 
           "NoYW5nZWxvZy5tZCJ9XX0=";

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