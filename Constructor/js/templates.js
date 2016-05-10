/*
 * road templates
 */

function getTemplate(name){
    if (name.indexOf('OneLineRoadIntersTwoLinesRoad')){
        return OneLineRoadIntersTwoLinesRoad();
    }
}

// 1 line road intersect 2 lines road
function OneLineRoadIntersTwoLinesRoad() {
    var w = 200; h = 100;
    var line1 = new fabric.Rect({ 
        width: w, height: h/2, 
        fill: 'black',
        name: 'line_' + fCanvas.getObjects().length,
        obj_class: 'line',
        obj_type: 'asphalt'
    });
    var line2 = new fabric.Rect({ 
        left: 0, top: h/2, 
        width: w, height: h/2, 
        fill: 'black',
        name: 'line_' + (fCanvas.getObjects().length+1),
        obj_class: 'line',
        obj_type: 'asphalt'
    });
    var mark = new fabric.Line([0, h/2, w, h/2], { stroke:'white', strokeWidth: 4, strokeDashArray: [20, 5] });
    var roadGroup = new fabric.Group([line1,line2,mark],{ left: 100, top: 100 });
    roadGroup.name = 'road' + fCanvas.getObjects().length;
    roadGroup.obj_type = 'asphalt';
    roadGroup.obj_class = 'road';
    
    return roadGroup;
}