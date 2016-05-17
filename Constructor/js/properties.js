var sharedProperties = [ 'name', 'obj_class', 'obj_type']
var roadProperties = [ 'lines', 'marking'];
var lineProperties = ['left', 'right'];
var carProperties = ['number', 'right direction indicator', 'left direction indicator'];

function createJsonProperties(){
    var result = [];
    Array.prototype.push.apply(result, sharedProperties);
    Array.prototype.push.apply(result, roadProperties);
    Array.prototype.push.apply(result, lineProperties);
    Array.prototype.push.apply(result, carProperties);
    
    return result;
}
