[h:len   = json.length(macro.args)]
[h:assert(len >= 1, "At least property name must be passed.", 1)]
[h:prop  = json.get(macro.args, 0)]

[h,if(len == 2),code:{
    [h:ns=json.get(macro.args, 1)]
    [h:data=getLibProperty(prop, ns)]
};{
    [h:data=getLibProperty(prop)]
}]
[r:data]