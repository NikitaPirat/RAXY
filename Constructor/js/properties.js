var sharedProperties = [ 
    { name: 'name', text: 'name' }, 
    { name: 'obj_class', text: 'class'}, 
    { name: 'obj_type', text: 'type'}
];
var roadProperties = [ { name: 'lines', text: 'lines' }, { name: 'markup', text: 'markup'} ];
var lineProperties = [ { name: 'uleft', text: 'left' }, { name: 'uright', text: 'right' }];
var carProperties = [ 
    { name: 'number', text: 'number' }, 
    { name: 'rd_indicator', text: 'right direction indicator' }, 
    { name: 'ld_indicator', text: 'left direction indicator' }
];

function createJsonProperties(){
    var result = [];
    for (var i=0;i<sharedProperties.length;i++){
        result[result.length] = sharedProperties[i].name;
    }
    for (var i=0;i<roadProperties.length;i++){
        result[result.length] = roadProperties[i].name;
    }
    for (var i=0;i<lineProperties.length;i++){
        result[result.length] = lineProperties[i].name;
    }
    for (var i=0;i<carProperties.length;i++){
        result[result.length] = carProperties[i].name;
    }
    
    return result;
}
