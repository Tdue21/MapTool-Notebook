export const printException = (caller, error) => console.log(`Exception in ${caller}: ${error}\r\n${error.stack}`);

export const setLibProperty = (name, value) => console.log(value);

export const getLibProperty = (name) => {
    if (name == "notebooks") {
        return JSON.stringify({
            "User Guide": {
                "title": "User Guide", "summary": "User guide for MapTool notebook add-on.", "owner": "gm", "private": false, "pages": {
                    "0. Introduction": "content of page 0",
                    "1. First section": "content of page 1",
                    "2. second section": "content of page 2",
                    "3. third section": "content of page 3"
                }
            },
            "notebook 1": {
                "title": "notebook 1", "summary": "This is the first notebook.", "owner": "", "private": true, "pages": {
                    "page 1": "content of page 1",
                    "page 2": "content of page 2"
                }
            },
            "notebook 2": {
                "title": "notebook 2", "summary": "This is the second notebook.", "owner": "", "private": true, "pages": {
                    "page 1": "content of page 1",
                    "page 2": "content of page 2"
                }
            }
        });
    }
};
