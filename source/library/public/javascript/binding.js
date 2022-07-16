/**
 * Sets up databinding for a html element. 
 * @param {string} elementId 
 * @param {string} elementProperty 
 * @param {object} dataObject 
 */
function dataBind(elementId, elementProperty, dataObject) {

    const element = document.getElementById(elementId)

    //console.log(element)

    new Binding({
        object: dataObject,
        property: elementId
    })
    .addBinding(element, elementProperty)
}

/** 
 * Sets up binding for controls
 */
 class Binding {
    constructor(b) {

        let _this = this;
        this.elementBindings = [];
        this.value = b.object[b.property];
        
        this.valueGetter = function () {
            return _this.value;
        };

        this.valueSetter = function (val) {
            _this.value = val;
            for (var i = 0; i < _this.elementBindings.length; i++) {
                var binding = _this.elementBindings[i];
                binding.element[binding.attribute] = val;
            }
        };

        this.addBinding = function (element, attribute, event) {
            var binding = {
                element: element,
                attribute: attribute
            };
            if (event) {
                element.addEventListener(event, function (event) {
                    _this.valueSetter(element[attribute]);
                });
                binding.event = event;
            }
            this.elementBindings.push(binding);
            element[attribute] = _this.value;
            return _this;
        };

        Object.defineProperty(b.object, b.property, {
            get: this.valueGetter,
            set: this.valueSetter
        });

        b.object[b.property] = this.value;
    }
}