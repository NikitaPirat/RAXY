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

// intersection of 2 lines defined by y=k1*x+m1 and y=k2*x+m2.
// returns point of intersection or false if lines are parallel.
function intersection2(k1,m1,k2,m2){
    if (k1==k2) { return false; }
    var x0 = (m2-m1)/(k1-k2);
    return { x : x0, y : k1*x0+m1 };
}

// intersection of 2 lines.
//
// returns point of intersection or false if lines are parallel.
function intersection3(line1Points, line2Points){
    var k1 = getK(line1Points[0].x, line1Points[0].y, line1Points[1].x, line1Points[1].y);
    var m1 = getM(line1Points[0].x, line1Points[0].y, line1Points[1].x, line1Points[1].y);
    var k2 = getK(line2Points[0].x, line2Points[0].y, line2Points[1].x, line2Points[1].y);
    var m2 = getM(line2Points[0].x, line2Points[0].y, line2Points[1].x, line2Points[1].y);
    return intersection2 (k1,m1,k2,m2);  
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
// line = {start: {x: x1, y: y1}, end: {x: x2, y: y2}}
function prepareIntersection(line11,line12){
    var testX = 100;
    var start, end;
    if (yFunc1(line11.start.x, line11.start.y, line11.end.x, line11.end.y, line11.start.x) > 
        yFunc1(line11.start.x, line11.start.y, line11.end.x, line11.end.y, line11.end.x)){
        start = line11.end; end = line11.start;
    }else{
        start = line11.start; end = line11.end;
    }
    line11.start = start; line11.end = end;  
    if (yFunc1(line12.start.x, line12.start.y, line12.end.x, line12.end.y, line12.start.x) > 
        yFunc1(line12.start.x, line12.start.y, line12.end.x, line12.end.y, line12.end.x)){
        start = line12.end; end = line12.start;
    }else{
        start = line12.start; end = line12.end;
    }
    line12.start = start; line12.end = end; 
    
    if (yFunc1(line11.start.x, line11.start.y, line11.end.x, line11.end.y, testX) > 
        yFunc1(line12.start.x, line12.start.y, line12.end.x, line12.end.y, testX)){
        return { topLine: line11, bottomLine: line12, k: getK (line11.start.x, line11.start.y, line11.end.x, line11.end.y)};
    }else{
        return result1 = { topLine: line12, bottomLine: line11, k: getK(line11.start.x, line11.start.y, line11.end.x, line11.end.y) };
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

function createCrossRoad(objCorners, actCorners, names){
  			var actPrepared = prepareIntersection({start: {x: actCorners.tl.x, y: actCorners.tl.y}, end: {x: actCorners.tr.x, y: actCorners.tr.y}}, {start: {x: actCorners.bl.x, y: actCorners.bl.y}, end: {x: actCorners.br.x, y: actCorners.br.y}});
    		var objPrepared = prepareIntersection({start: {x: objCorners.tl.x, y: objCorners.tl.y}, end: {x: objCorners.tr.x, y: objCorners.tr.y}}, {start: {x: objCorners.bl.x, y: objCorners.bl.y}, end: {x: objCorners.br.x, y: objCorners.br.y}});
    		
    		var corner1 = getCornerPoints(actPrepared.topLine.start, actPrepared.topLine.end, objPrepared.topLine.start, objPrepared.topLine.end, 'aToT');
    		var corner2 = getCornerPoints(actPrepared.topLine.start, actPrepared.topLine.end, objPrepared.bottomLine.start, objPrepared.bottomLine.end, 'aToB');
    		var corner3 = getCornerPoints(actPrepared.bottomLine.start, actPrepared.bottomLine.end, objPrepared.topLine.start, objPrepared.topLine.end, 'aBoT');
    		var corner4 = getCornerPoints(actPrepared.bottomLine.start, actPrepared.bottomLine.end, objPrepared.bottomLine.start, objPrepared.bottomLine.end, 'aBoB');

    		var minX = fCanvas.width, minY = fCanvas.height;
    		var path ='';
    		if (corner1){
    			path += 'M ' + corner1.p1.x + ' ' + corner1.p1.y + ' Q ' + corner1.p2.x + ' ' + corner1.p2.y + ' ' + corner1.p3.x + ' ' + corner1.p3.y + ' ';
    			minX = Math.min(corner1.p1.x,corner1.p2.x,corner1.p3.x, minX);
    			minY = Math.min(corner1.p1.y,corner1.p2.y,corner1.p3.y, minY);
    		}
    		if (corner3){
				var c;
				if (path.indexOf('M ') < 0){
					c = 'M ';
				}else{
					c = ' L ';
				}
    			path += c + corner3.p3.x + ' ' + corner3.p3.y + ' Q ' + corner3.p2.x + ' ' + corner3.p2.y + ' ' + corner3.p1.x + ' ' + corner3.p1.y + ' ';

    			minX = Math.min(corner3.p1.x,corner3.p2.x,corner3.p3.x, minX);
    			minY = Math.min(corner3.p1.y,corner3.p2.y,corner3.p3.y, minY);
    		}						
    		if (corner4){
				var c;
				if (path.indexOf('M ') < 0){
					c = 'M ';
				}else{
					c = ' L ';
				}    			
    			path += c + corner4.p1.x + ' ' + corner4.p1.y + ' Q ' + corner4.p2.x + ' ' + corner4.p2.y + ' ' + corner4.p3.x + ' ' + corner4.p3.y + ' ';

    			minX = Math.min(corner4.p1.x,corner4.p2.x,corner4.p3.x, minX);
    			minY = Math.min(corner4.p1.y,corner4.p2.y,corner4.p3.y, minY);
    		}	
    		if (corner2){
				var c;
				if (path.indexOf('M ') < 0){
					c = 'M ';
				}else{
					c = ' L ';
				}
    			path += c + corner2.p3.x + ' ' + corner2.p3.y + ' Q ' + corner2.p2.x + ' ' + corner2.p2.y + ' ' + corner2.p1.x + ' ' + corner2.p1.y;

    			minX = Math.min(corner2.p1.x,corner2.p2.x,corner2.p3.x, minX);
    			minY = Math.min(corner2.p1.y,corner2.p2.y,corner2.p3.y, minY);
    		}

    		if (path == '' || path.indexOf('L ') < 0 || (path.match(/L /g) || []).length == 2) { return; }
			
			var tCross = false;
			if ((path.match(/L /g) || []).length == 1){
				tCross = true;
				if (corner1 && corner3){
					var corner2 //interaToB 
						= {p4: intersection3([ actPrepared.topLine.start, actPrepared.topLine.end], 
						[objPrepared.bottomLine.start, objPrepared.bottomLine.end])};
					var corner4 //interaBoB 
						= {p4: intersection3([ actPrepared.bottomLine.start, actPrepared.bottomLine.end], 
						[objPrepared.bottomLine.start, objPrepared.bottomLine.end])};
					path += ' L ' + corner4.p4.x + ' ' + corner4.p4.y + ' L ' + corner2.p4.x + ' ' + corner2.p4.y;
					minX = Math.min(minX, corner2.p4.x, corner4.p4.x);
					minY = Math.min(minY, corner2.p4.y, corner4.p4.y);
				}else{
					if (corner2 && corner4){
						var corner3 //interaBoT
							= {p4: intersection3([ actPrepared.bottomLine.start, actPrepared.bottomLine.end], 
							[objPrepared.topLine.start, objPrepared.topLine.end])};
						var corner1 //interaToT
							= {p4: intersection3([ actPrepared.topLine.start, actPrepared.topLine.end], 
							[objPrepared.topLine.start, objPrepared.topLine.end])};
						path += ' L ' + corner1.p4.x + ' ' + corner1.p4.y + ' L ' + corner3.p4.x + ' ' + corner3.p4.y;
						minX = Math.min(minX, corner1.p4.x, corner3.p4.x);
						minY = Math.min(minY, corner1.p4.y, corner3.p4.y);
					}else{
						if (corner1 && corner2){
							var corner3 //interaBoT
								= {p4: intersection3([ actPrepared.bottomLine.start, actPrepared.bottomLine.end], 
								[objPrepared.topLine.start, objPrepared.topLine.end])};
							var corner4 //interaBoB
								= {p4: intersection3([ actPrepared.bottomLine.start, actPrepared.bottomLine.end], 
								[objPrepared.bottomLine.start, objPrepared.bottomLine.end])};
							var pathParts = path.split('L');
							path = pathParts[0] + ' L ' + corner3.p4.x + ' ' + corner3.p4.y + ' L ' + corner4.p4.x + ' ' + corner4.p4.y + ' ' + pathParts[1];
							minX = Math.min(minX, corner3.p4.x, corner4.p4.x);
							minY = Math.min(minY, corner3.p4.y, corner4.p4.y);
						}else{
							if (corner3 && corner4){
								var corner1 //interaToT
									= {p4: intersection3([ actPrepared.topLine.start, actPrepared.topLine.end], 
									[objPrepared.topLine.start, objPrepared.topLine.end])};
								var corner2 //interaToB
									= {p4: intersection3([ actPrepared.topLine.start, actPrepared.topLine.end], 
									[objPrepared.bottomLine.start, objPrepared.bottomLine.end])};
								path += ' L ' + corner2.p4.x + ' ' + corner2.p4.y + ' L ' + corner1.p4.x + ' ' + corner1.p4.y;
								minX = Math.min(minX, corner1.p4.x, corner2.p4.x);
								minY = Math.min(minY, corner1.p4.y, corner2.p4.y);
							}
						}
					}
				}
			}
    		var minPoint = 
    		{
    			x: minX,
    			y: minY
    		}    		

    		var crossRoad = new fabric.Path(path, {
  					left: minPoint.x,
  					top: minPoint.y,
  					fill: 'black',
					name: 'cross_' + names.aName + '_' + names.oName,
					perPixelTargetFind: true,
					obj_class: 'cross_road',
					obj_type: 'asphalt',
					childs: []  //,
					//hasControls: false,
					//hasBorders: false
  				});
    		var crossObjects = [];
    		//fCanvas.add(crossRoad);
			crossObjects[0] = crossRoad;
			var partName = 'road';
			// aToT aBoT
			if (corner1.hasOwnProperty('p1') || corner3.hasOwnProperty('p1')){
				var dirPoint;
				dirPoint1 = {x: actPrepared.bottomLine.end.x, y: actPrepared.bottomLine.end.y};
				dirPoint2 = {x: actPrepared.topLine.end.x, y: actPrepared.topLine.end.y};
				var actRoadPartStr1 = 'M ' + corner1.p4.x + ' ' + corner1.p4.y +
					' L ' + corner3.p4.x + ' ' + corner3.p4.y +
					' L ' + dirPoint1.x + ' ' + dirPoint1.y +
					' L ' + dirPoint2.x + ' ' + dirPoint2.y;
				var actRoadPartObj1 = new fabric.Path(actRoadPartStr1, {
						left: Math.min(corner1.p4.x, corner3.p4.x, dirPoint1.x, dirPoint2.x),
						top: Math.min(corner1.p4.y, corner3.p4.y, dirPoint1.y, dirPoint2.y),
						fill: 'black',
						name: partName + '_actRoadPartObj1',
						perPixelTargetFind: true,
						obj_class: 'road',
						obj_type: 'asphalt',
						childs: [] //,
						//hasControls: false,
						//hasBorders: false
					});
				crossObjects[crossObjects.length] = actRoadPartObj1;
				//fCanvas.add(actRoadPartObj1);
			}
			// aToB aBoB
			if (corner2.hasOwnProperty('p1') || corner4.hasOwnProperty('p1')){
				var dirPoint;
				dirPoint1 = {x: actPrepared.bottomLine.start.x, y: actPrepared.bottomLine.start.y};
				dirPoint2 = {x: actPrepared.topLine.start.x, y: actPrepared.topLine.start.y};
				var actRoadPartStr2 = 'M ' + corner2.p4.x + ' ' + corner2.p4.y +
					' L ' + corner4.p4.x + ' ' + corner4.p4.y +
					' L ' + dirPoint1.x + ' ' + dirPoint1.y +
					' L ' + dirPoint2.x + ' ' + dirPoint2.y;
				var actRoadPartObj2 = new fabric.Path(actRoadPartStr2, {
						left: Math.min(corner2.p4.x, corner4.p4.x,  dirPoint1.x, dirPoint2.x),
						top: Math.min(corner2.p4.y, corner4.p4.y, dirPoint1.y, dirPoint2.y),
						fill: 'black',
						name: partName + '_actRoadPartObj2',
						perPixelTargetFind: true,
						obj_class: 'road',
						obj_type: 'asphalt',
						childs: [] //,
						//hasControls: false,
						//hasBorders: false
					});
				//fCanvas.add(actRoadPartObj2);
				crossObjects[crossObjects.length] = actRoadPartObj2;
			}
			// aToT aToB
			if (corner1.hasOwnProperty('p1') || corner2.hasOwnProperty('p1')){
				var dirPoint;
				dirPoint1 = {x: objPrepared.bottomLine.end.x, y: objPrepared.bottomLine.end.y};
				dirPoint2 = {x: objPrepared.topLine.end.x, y: objPrepared.topLine.end.y};
				var actRoadPartStr3 = 'M ' + corner1.p4.x + ' ' + corner1.p4.y +
					' L ' + corner2.p4.x + ' ' + corner2.p4.y +
					' L ' + dirPoint1.x + ' ' + dirPoint1.y +
					' L ' + dirPoint2.x + ' ' + dirPoint2.y;
				var actRoadPartObj3 = new fabric.Path(actRoadPartStr3, {
						left: Math.min(corner1.p4.x, corner2.p4.x, dirPoint1.x, dirPoint2.x),
						top: Math.min(corner1.p4.y, corner2.p4.y, dirPoint1.y, dirPoint2.y),
						fill: 'black',
						name: partName + '_actRoadPartObj3',
						perPixelTargetFind: true,
						obj_class: 'road',
						obj_type: 'asphalt',
						childs: [] //,
						//hasControls: false,
						//hasBorders: false
					});
				//fCanvas.add(actRoadPartObj3);
				crossObjects[crossObjects.length] = actRoadPartObj3;
			}
			// aBoT aBoB
			if (corner3.hasOwnProperty('p1') || corner4.hasOwnProperty('p1')){
				var dirPoint;
				dirPoint1 = {x: objPrepared.bottomLine.start.x, y: objPrepared.bottomLine.start.y};
				dirPoint2 = {x: objPrepared.topLine.start.x, y: objPrepared.topLine.start.y};
				var actRoadPartStr4 = 'M ' + corner3.p4.x + ' ' + corner3.p4.y +
					' L ' + corner4.p4.x + ' ' + corner4.p4.y +
					' L ' + dirPoint1.x + ' ' + dirPoint1.y +
					' L ' + dirPoint2.x + ' ' + dirPoint2.y;
				var actRoadPartObj4 = new fabric.Path(actRoadPartStr4, {
						left: Math.min(corner3.p4.x, corner4.p4.x, dirPoint1.x, dirPoint2.x),
						top: Math.min(corner3.p4.y, corner4.p4.y, dirPoint1.y, dirPoint2.y),
						fill: 'black',
						name: partName + '_actRoadPartObj4',
						perPixelTargetFind: true,
						obj_class: 'road',
						obj_type: 'asphalt',
						childs: [] //,
						//hasControls: false,
						//hasBorders: false
					});
				//fCanvas.add(actRoadPartObj4);
				crossObjects[crossObjects.length] = actRoadPartObj4;
			}
			removeObjectByName(names.aName); removeObjectByName(names.oName);			
			var roadGroup = new fabric.Group(crossObjects, 
				{
					name: 'cross_' + fCanvas.getObjects().length,
					originX: 'center',
    				originY: 'center',
					perPixelTargetFind: true,
					obj_class: 'cross_road',
					obj_type: 'asphalt',
					childs: crossObjects,
					parent: ''
					//hasControls: false,
					//hasBorders: false
				});			
			crossObjects.forEach(function(obj){
				obj.parent = roadGroup;
			});
			fCanvas.add(roadGroup);
  		}
          

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
    result[result.length] = 'relations';
    result[result.length] = 'processes';
    
    return result;
}