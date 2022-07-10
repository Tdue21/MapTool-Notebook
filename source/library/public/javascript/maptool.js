async function fetchFromMacro(uri) {
    let p = fetch(uri, {method: "POST"})
    let r = await p
    let data = await r.json()

    return data;
}
/**
 * Fetches MapTool data to use on the help page.
 */
async function fetchHelpData() {
    return fetchFromMacro("macro:GetHelpData@lib:net.dovesoft.notebook")
}

/**
 * Fetches library info from MapTool
 */
async function fetchLibraryData() {
    return fetchFromMacro("macro:GetLibraryData@lib:net.dovesoft.notebook")
}

/**
 * List of all notebooks
 */
async function fetchNotebookList() {
    return fetchFromMacro("macro:ListNotebooks@lib:net.dovesoft.notebook")
}

/** 
 * Sets up binding for controls
 */
function Binding(b) {
    _this = this
    this.elementBindings = []
    this.value = b.object[b.property]
    this.valueGetter = function(){
        return _this.value;
    }
    
    this.valueSetter = function(val){
        _this.value = val
        for (var i = 0; i < _this.elementBindings.length; i++) {
            var binding=_this.elementBindings[i]
            binding.element[binding.attribute] = val
        }
    }

    this.addBinding = function(element, attribute, event){
        var binding = {
            element: element,
            attribute: attribute
        }
        if (event){
            element.addEventListener(event, function(event){
                _this.valueSetter(element[attribute]);
            })
            binding.event = event
        }       
        this.elementBindings.push(binding)
        element[attribute] = _this.value
        return _this
    }

    Object.defineProperty(b.object, b.property, {
        get: this.valueGetter,
        set: this.valueSetter
    }); 

    b.object[b.property] = this.value;
}