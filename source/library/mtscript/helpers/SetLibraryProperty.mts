[h:len   = json.length(macro.args)]
[h:assert(len >= 2, "At least property name and value must be passed.", 1)]

[h:prop  = json.get(macro.args, 0)]
[h:value = json.get(macro.args, 1)]
[h,if(len == 3),code:{
    [h:setLibProperty(property, value, json.get(macro.args, 2))]
};{
    [h:setLibProperty(property, value)]
}]