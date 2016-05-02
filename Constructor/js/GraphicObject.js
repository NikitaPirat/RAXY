function GraphicObject(name){
	this.name = name;
	this.posX = 0;
	this.posY = 0;
}

GraphicObject.prototype.addGraphicObject = function (type){
	
	alert (this.name);
}

// returns true or false depending on whether point belongs to the field
// params:
// x,y - position of the point
// pointsArray - array of points which is describing the field (polygon) 
// f.e. pointsArray = [{x:45, y:64}, {x:56, y:98}, {x:23, y:44}, {x:35, y:50}];
function isPointInLocation(x,y,pointsArray){
	var a = pointsArray[0]; var b = pointsArray[0]; 
	var c = pointsArray[0]; var d = pointsArray[0]; 

	for (var i = 1; i < pointsArray.length; i++){
		if (a.x > pointsArray[i].x){
			a = pointsArray[i];
		}
		else{
			if (a.x == pointsArray[i].x && a.y > pointsArray[i].y){
				a = pointsArray[i];
			}	
		}
		if (b.y > pointsArray[i].y){
			b = pointsArray[i];
		}else{
			if (b.y == pointsArray[i].y && b.x < pointsArray[i].x){
				b = pointsArray[i];
			}
		}
		if (c.y < pointsArray[i].y){
			c = pointsArray[i];
		}else{
			if (c.y == pointsArray[i].y && c.x > pointsArray[i].x){
				c = pointsArray[i];
			}
		}
		if (d.x < pointsArray[i].x){
			d = pointsArray[i];
		}else{
			if (d.x == pointsArray[i].x && d.y < pointsArray[i].y){
				d = pointsArray[i];
			}
		}
	}

	var Kab = getK(a.x, a.y, b.x, b.y);
    var Kbd, Kac, isBDnull, isACnull;
    if (Math.abs(b.x - d.x) > 0){
        Kbd = getK(b.x, b.y, d.x, d.y);
    }
    else{
        isBDnull = true;
    }
    var Kcd = getK(c.x, c.y, d.x, d.y);
    if (Math.abs(a.x - c.x) > 0){
        Kac = getK(a.x, a.y, c.x, c.y);  
    }
    else{
        isACnull = true;
    }

	var Mab = getM(a.x, a.y, b.x, b.y);
    var Mbd = getM(b.x, b.y, d.x, d.y);
    var Mcd = getM(c.x, c.y, d.x, d.y);
    var Mac = getM(a.x, a.y, c.x, c.y); 

    if (isBDnull && isACnull){
            if (
                (y > yFunc2(Kab, Mab, x)) &&
                (x < b.x) &&
                (y < yFunc2(Kcd, Mcd, x)) &&
                (x > a.x)
                ){
                    return true;
            }else{
                return false;
            }
        }
        if (isBDnull){
            if (Kac > 0){
                if (
                    (y > yFunc2(Kab, Mab, x)) &&
                    (x < b.x) &&
                    (y < yFunc2(Kcd, Mcd, x)) &&
                    (y < yFunc2(Kac, Mac, x))
                    ){
                        return true;
                }else{
                    return false;
                }
            }
            else{
                if (
                    (y > yFunc2(Kab, Mab, x)) &&
                    (x < b.x) &&
                    (y < yFunc2(Kcd, Mcd, x)) &&
                    (y > yFunc2(Kac, Mac, x))
                    ){
                        return true;
                }else{
                    return false;
                }
            }
        }
        if (isACnull){
            if (Kbd > 0){
                if (
                    (y > yFunc2(Kab, Mab, x)) &&
                    (y > yFunc2(Kbd, Mbd, x)) &&
                    (y < yFunc2(Kcd, Mcd, x)) &&
                    (x > a.x)
                    ){
                        return true;
                }else{
                    return false;
                }
            }
            else{
                if (
                    (y > yFunc2(Kab, Mab, x)) &&
                    (y < yFunc2(Kbd, Mbd, x)) &&
                    (y < yFunc2(Kcd, Mcd, x)) &&
                    (x > a.x)
                    ){
                        return true;
                }else{
                    return false;
                }
            }
        }
        if (Kbd < 0 && Kac < 0){
            if (
                (y > yFunc2(Kab, Mab, x)) &&
                (y < yFunc2(Kbd, Mbd, x)) &&
                (y < yFunc2(Kcd, Mcd, x)) &&
                (y > yFunc2(Kac, Mac, x))
           ){
            return true;
        }
        else{
            return false;
        }
        }
        if (Kbd > 0 && Kac < 0){
            if (
                (y > yFunc2(Kab, Mab, x)) &&
                (y > yFunc2(Kbd, Mbd, x)) &&
                (y < yFunc2(Kcd, Mcd, x)) &&
                (y > yFunc2(Kac, Mac, x))
                ){
                 return true;
             }
             else{
                 return false;
             }
        }
        if (Kbd < 0 && Kac > 0){
            if (
                (y > yFunc2(Kab, Mab, x)) &&
                (y < yFunc2(Kbd, Mbd, x)) &&
                (y < yFunc2(Kcd, Mcd, x)) &&
                (y < yFunc2(Kac, Mac, x))
                ){
                 return true;
             }
             else{
                 return false;
             }
        }
        if (Kbd > 0 && Kac > 0){
            if (
                (y > yFunc2(Kab, Mab, x)) &&
                (y > yFunc2(Kbd, Mbd, x)) &&
                (y < yFunc2(Kcd, Mcd, x)) &&
                (y < yFunc2(Kac, Mac, x))
                ){
                 return true;
             }
             else{
                 return false;
             }
        }
        else{
            return false;
        }
}

function getM (x1, y1, x2, y2){
	return (y1 - getK(x1, y1, x2, y2)*x1);
}

function getK(x1, y1, x2, y2){
    return ((y2-y1)/(x2-x1));
}

function yFunc2(k, m, x){
    return (k * x + m);
}

function yFunc1(x1, y1, x2, y2, x){
    return getK(x1, y1, x2, y2) * x + getM(x1, y1, x2, y2);
}

function Point2f(start, type, end) {
    if(type == '-') {
        return {x: start.x - end.x, y: start.y - end.y}
    }
    else if(type == '*') {
        return {x: start.x * end.x, y: start.y * end.y}
    }
    else if(type == '+') {
        return {x: start.x + end.x, y: start.y + end.y}
    }
    else if(type == '/') {
        return {x: start.x / end.x, y: start.y / end.y}
    }
}


function intersection(start1, end1, start2, end2) {
    var dir1 = Point2f(end1, '-', start1)
    , dir2 = Point2f(end2, '-', start2);
    
    //считаем уравнения прямых проходящих через отрезки
    var a1 = -dir1.y;
    var b1 = +dir1.x;
    var d1 = -(a1*start1.x + b1*start1.y);
    
    var a2 = -dir2.y;
    var b2 = +dir2.x;
    var d2 = -(a2*start2.x + b2*start2.y);
    
    //подставляем концы отрезков, для выяснения в каких полуплоскотях они
    var seg1_line2_start = a2*start1.x + b2*start1.y + d2;
    var seg1_line2_end = a2*end1.x + b2*end1.y + d2;
    
    var seg2_line1_start = a1*start2.x + b1*start2.y + d1;
    var seg2_line1_end = a1*end2.x + b1*end2.y + d1;
    
    //если концы одного отрезка имеют один знак, значит он в одной полуплоскости и пересечения нет.
    if (seg1_line2_start * seg1_line2_end >= 0 || seg2_line1_start * seg2_line1_end >= 0) 
    return false;
    

    var u = seg1_line2_start / (seg1_line2_start - seg1_line2_end);
    
    var pin_out = Point2f({x: u, y: u}, '*', dir1);
  
    return Point2f(start1, '+', pin_out);
}

// intersection of line defined by y=k*x+m and circle defined by x,y - center, r - radius
function intersectionCircle1(x,y,r,k,m){
    var d = (Math.pow((2*k*m-2*x-2*y*k),2)-(4+4*k*k)*(m*m-r*r+x*x+y*y-2*y*m));

    if (d<0) { return false; }

    var x1 = ((-(2*k*m-2*x-2*y*k)-Math.sqrt(d))/(2+2*k*k));
    var x2 = ((-(2*k*m-2*x-2*y*k)+Math.sqrt(d))/(2+2*k*k));
    if (x1==x2){
        return {x: x1, y: yFunc2(k,m,x1)};
    }
    if (x1<x2){
        return [{x: x1, y: yFunc2(k,m,x1)}, {x: x2, y: yFunc2(k,m,x2)}];
    }else{
        return [{x: x2, y: yFunc2(k,m,x2)}, {x: x1, y: yFunc2(k,m,x1)}];
    }    
}

// intersection of line defined by points (x1,y1), (x2,y2) and circle defined by (x,y) - center, r - radius
function intersectionCircle2(x,y,r,x1,y1,x2,y2){
    var k = getK(x1, y1, x2, y2);
    var m = getM(x1, y1, x2, y2);
    return intersectionCircle1(x,y,r,k,m);
}

// defines which line is above and which is below
//line = {start: {x: x1, y: y1}, end: {x: x2, y: y2}}
function prepareIntersection(line11,line12){
    var testX = 100;
    if (yFunc1(line11.start.x, line11.start.y, line11.end.x, line11.end.y, testX) > 
        yFunc1(line12.start.x, line12.start.y, line12.end.x, line12.end.y, testX)){
        return { topLine: line11, bottomLine: line12};
    }else{
        return result1 = { topLine: line12, bottomLine: line11 };
    }
}

// returns Corner Points: start, vertex, end of curve line, intersection point.
// params: 
// actStart - start point of first (active) line.
// actEnd - end point  of first (active) line.
// objStart - start point of second (not active) line.
// objEnd - end point  of second (not active) line.
// type - type of lines: 
// aToT - intersection of active top and object top lines.
// aToB - intersection of active top and object bottom lines.
// aBoT - intersection of active bottom and object top lines.
// aBoB - intersection of active bottom and object bottom lines.
// this parameter defines which circle sector will be returned.
function getCornerPoints(actStart, actEnd, objStart, objEnd, type){
    var inters = intersection(
        {x: actStart.x, y: actStart.y},
        {x: actEnd.x, y: actEnd.y},
        {x: objStart.x, y: objStart.y},
        {x: objEnd.x, y: objEnd.y});
    if (!inters) { return false; }
    
    delta = 50;             
    var objK = getK(objStart.x, objStart.y, objEnd.x, objEnd.y);
    var actK = getK(actStart.x, actStart.y, actEnd.x, actEnd.y);
    var objPoints, actPoints;
    objPoints = intersectionCircle2 (inters.x, inters.y, delta, objStart.x, objStart.y, objEnd.x, objEnd.y);
    actPoints = intersectionCircle2 (inters.x, inters.y, delta, actStart.x, actStart.y, actEnd.x, actEnd.y);
    var objPoint,actPoint;

    switch(type){
        case "aToT":{
            if (actK < 0 && objK < 0){
                if (objK < actK){
                    objPoint = objPoints[0];
                    actPoint = actPoints[1];
                }else{
                    objPoint = objPoints[1];
                    actPoint = actPoints[0];
                }
            }
            if (actK < 0 && objK > 0){
                objPoint = objPoints[1];
                actPoint = actPoints[0];
            }
            if (actK > 0 && objK < 0){
                objPoint = objPoints[0];
                actPoint = actPoints[1];
            }
            if (actK > 0 && objK > 0){
                if (objK > actK){
                    objPoint = objPoints[1];
                    actPoint = actPoints[0];
                }else{
                    objPoint = objPoints[0];
                    actPoint = actPoints[1];
                }
            }
            if (actK == 0 && objK < 0){
                objPoint = objPoints[0];
                actPoint = actPoints[1];
            }
            if (actK == 0 && objK > 0){
                objPoint = objPoints[1];
                actPoint = actPoints[0];
            }
            if (actK < 0 && objK == 0){
                objPoint = objPoints[1];
                actPoint = actPoints[0];
            }
            if (actK > 0 && objK == 0){
                objPoint = objPoints[0];
                actPoint = actPoints[1];
            }
            break;
        }
        case "aToB":{
            if (actK < 0 && objK < 0){
                if (objK < actK){
                    objPoint = objPoints[0];
                    actPoint = actPoints[0];
                }else{
                    objPoint = objPoints[1];
                    actPoint = actPoints[1];
                }
            }
            if (actK < 0 && objK > 0){
                objPoint = objPoints[1];
                actPoint = actPoints[1];
            }
            if (actK > 0 && objK < 0){
                objPoint = objPoints[0];
                actPoint = actPoints[0];
            }
            if (actK > 0 && objK > 0){
                if (objK > actK){
                    objPoint = objPoints[1];
                    actPoint = actPoints[1];
                }else{
                    objPoint = objPoints[0];
                    actPoint = actPoints[0];
                }
            }
            if (actK == 0 && objK < 0){
                objPoint = objPoints[0];
                actPoint = actPoints[0];
            }
            if (actK == 0 && objK > 0){
                objPoint = objPoints[1];
                actPoint = actPoints[1];
            }
            if (actK < 0 && objK == 0){
                objPoint = objPoints[1];
                actPoint = actPoints[1];
            }
            if (actK > 0 && objK == 0){
                objPoint = objPoints[0];
                actPoint = actPoints[0];
            }
            break;
        }
        case "aBoT":{
            if (actK < 0 && objK < 0){
                if (objK < actK){
                    objPoint = objPoints[1];
                    actPoint = actPoints[1];
                }else{
                    objPoint = objPoints[0];
                    actPoint = actPoints[0];
                }
            }
            if (actK < 0 && objK > 0){
                objPoint = objPoints[0];
                actPoint = actPoints[0];
            }
            if (actK > 0 && objK < 0){
                objPoint = objPoints[1];
                actPoint = actPoints[1];
            }
            if (actK > 0 && objK > 0){
                if (objK > actK){
                    objPoint = objPoints[0];
                    actPoint = actPoints[0];
                }else{
                    objPoint = objPoints[1];
                    actPoint = actPoints[1];
                }
            }
            if (actK == 0 && objK < 0){
                objPoint = objPoints[1];
                actPoint = actPoints[1];
            }
            if (actK == 0 && objK > 0){
                objPoint = objPoints[0];
                actPoint = actPoints[0];
            }
            if (actK < 0 && objK == 0){
                objPoint = objPoints[0];
                actPoint = actPoints[0];
            }
            if (actK > 0 && objK == 0){
                objPoint = objPoints[1];
                actPoint = actPoints[1];
            }
            break;
        }
        case "aBoB":{
            if (actK < 0 && objK < 0){
                if (objK < actK){
                    objPoint = objPoints[1];
                    actPoint = actPoints[0];
                }else{
                    objPoint = objPoints[0];
                    actPoint = actPoints[1];
                }
            }
            if (actK < 0 && objK > 0){
                objPoint = objPoints[0];
                actPoint = actPoints[1];
            }
            if (actK > 0 && objK < 0){
                objPoint = objPoints[1];
                actPoint = actPoints[0];
            }
            if (actK > 0 && objK > 0){
                if (objK > actK){
                    objPoint = objPoints[0];
                    actPoint = actPoints[1];
                }else{
                    objPoint = objPoints[1];
                    actPoint = actPoints[0];
                }
            }
            if (actK == 0 && objK < 0){
                objPoint = objPoints[1];
                actPoint = actPoints[0];
            }
            if (actK == 0 && objK > 0){
                objPoint = objPoints[0];
                actPoint = actPoints[1];
            }
            if (actK < 0 && objK == 0){
                objPoint = objPoints[0];
                actPoint = actPoints[1];
            }
            if (actK > 0 && objK == 0){
                objPoint = objPoints[1];
                actPoint = actPoints[0];
            }
            break;
        }
    }

    var half1 = {x : (objPoint.x + actPoint.x)/2, y: (objPoint.y + actPoint.y)/2 };
    var half2 = {x : (objPoint.x + inters.x)/2, y: (objPoint.y + inters.y)/2 };
    var median = intersection(inters, half1, actPoint, half2);   

    return {p1: objPoint, p2: median, p3: actPoint, p4: inters};      
}