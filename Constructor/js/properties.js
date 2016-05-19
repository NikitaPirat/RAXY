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
var signProperties = [ { name: 'number', text: 'number' }, { name: 'limit', text: 'value' }];
var lightProperties = [ { name: 'signal', text: 'signal' } ];

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
    for (var i=0;i<signProperties.length;i++){
        result[result.length] = carProperties[i].name;
    }
    
    result[result.length] = 'childs';
    result[result.length] = 'parents';
    
    return result;
}
