
			  	var activeObject = e.target;
			  	var delta = 10;
			  	var A1x = activeObject.get('left'); var A1y = activeObject.get('top');
			  	var B1x = activeObject.get('left') + activeObject.get('width'); var B1y = activeObject.get('top') + activeObject.get('height');
			  	if (activeObject.name.indexOf('road') > -1){
				  	fCanvas.forEachObject(function(obj){				  		
					    if (obj != activeObject){
					    	var objCorners = obj.get('oCoords');
					    	var actCorners = activeObject.get('oCoords');
					  		/*if (isPointInLocation (actCorners.tl.x, actCorners.tl.y,
					  			[{x: objCorners.tl.x, y: objCorners.tl.y},
					  			 {x: objCorners.tr.x, y: objCorners.tr.y},
					  			 {x: objCorners.bl.x, y: objCorners.bl.y},
					  			 {x: objCorners.br.x, y: objCorners.br.y}])){
					  			console.log(activeObject.name + ';' + obj.name);
					  		}*/
					    	console.log(activeObject.name + ': [' + actCorners.tl.x + ';' + actCorners.tl.y + ']' + ';' + obj.name + ': [' + objCorners.tl.x + ';' + objCorners.tl.y + ']');					    	 
					    }
					});			  	
			  	}

var A2x = obj.get('left'); var A2y = obj.get('top');
			  				var B2x = obj.get('left') + obj.get('width'); var B2y = obj.get('top') + obj.get('height');
			  				// how do this for rotated objects???
			  				// X
					    	if (Math.abs(B1x - A2x) < delta && 
					    		(B1y > A2y - delta) &&
					    		(A1y < B2y + delta)){
					    		activeObject.set('left', A2x - activeObject.get('width'));
					    	}
					    	if (Math.abs(A1x - B2x) < delta && 
					    		(A1y > A2y - delta) &&
					    		(B1y < B2y + delta)){
					    		activeObject.set('left', B2x);
					    	} 
					    	// Y
					    	if (Math.abs(B1y - A2y) < delta && 
					    		(A1x < B2x + delta) &&
					    		(B1x > A2x - delta)){
					    		activeObject.set('top', A2y - activeObject.get('height'));
					    	}
					    	if (Math.abs(A1y - B2y) < delta && 
					    		(A1x < B2x + delta) &&
					    		(B1x > A2x - delta)){
					    		activeObject.set('top', B2y);
					    	}

					    	if (isPointInLocation (actCorners.tl.x, actCorners.tl.y,
					  			[{x: objCorners.tl.x, y: objCorners.tl.y},
					  			 {x: objCorners.tr.x, y: objCorners.tr.y},
					  			 {x: objCorners.bl.x, y: objCorners.bl.y},
					  			 {x: objCorners.br.x, y: objCorners.br.y}])){
					  			console.log(activeObject.name + ': [' + actCorners.tl.x + ';' + actCorners.tl.y + ']' + ';' + obj.name + ': [' + objCorners.tl.x + ';' + objCorners.tl.y + ']');
					  		}





					  			var intersect = new fabric.Rect({ left: intersTB.x-3, top: intersTB.y-3, width: 6, height: 6, fill: 'red'});
					  			var obj = new fabric.Rect({ left: objPoint.x-3, top: objPoint.y-3, width: 6, height: 6, fill: 'green'}); 
					  			var act = new fabric.Rect({ left: actPoint.x-3, top: actPoint.y-3, width: 6, height: 6, fill: 'blue'}); 
					  			var cir = new fabric.Circle ({
					  				radius: delta,
					  				fill: '',
					  				stroke: 'red',
					  				strokeWidth: 2,
					  				left: intersTB.x - delta,
					  				top: intersTB.y - delta
					  			});
					  			fCanvas.add(intersect);
					  			fCanvas.add(cir);
					  			fCanvas.add(obj);
					  			fCanvas.add(act);					  			
					  			var mline1 = new fabric.Rect({ left: median.x-3, top: median.y-3, width: 6, height: 6, fill: 'yellow'}); 
					  			fCanvas.add(mline1);
					  			 

					  			 var intersTT = intersection(
					  			{x: actCorners.tl.x, y: actCorners.tl.y},
					  			{x: actCorners.tr.x, y: actCorners.tr.y},
					  			{x: objCorners.tl.x, y: objCorners.tl.y},
					  			{x: objCorners.tr.x, y: objCorners.tr.y});
					  		if(intersTT)
					  		{
					  			delta = 50;
					  			var objPoints = intersectionCircle2 (intersTT.x, intersTT.y, delta, objCorners.tl.x, objCorners.tl.y, objCorners.tr.x, objCorners.tr.y);
					  			var actPoints = intersectionCircle2 (intersTT.x, intersTT.y, delta, actCorners.tl.x, actCorners.tl.y, actCorners.tr.x, actCorners.tr.y);
					  			var objPoint,actPoint;
					  			if (getK(objCorners.bl.x, objCorners.bl.y, objCorners.br.x, objCorners.br.y) > 0){
					  				objPoint = objPoints[0];
					  			}else{
					  				objPoint = objPoints[1];
					  			}
					  			if (getK(actCorners.tl.x, actCorners.tl.y, actCorners.tr.x, actCorners.tr.y) > 0){
					  				actPoint = actPoints[0];
					  			}else{
					  				actPoint = actPoints[1];
					  			}
					  			var half1 = {x : (objPoint.x + actPoint.x)/2, y: (objPoint.y + actPoint.y)/2 };
					  			var half2 = {x : (objPoint.x + intersTT.x)/2, y: (objPoint.y + intersTT.y)/2 };
					  			var median = intersection(intersTT, half1, actPoint, half2);

					  			var intersect = new fabric.Rect({ left: intersTT.x-3, top: intersTT.y-3, width: 6, height: 6, fill: 'red'});
					  			var obj = new fabric.Rect({ left: objPoint.x-3, top: objPoint.y-3, width: 6, height: 6, fill: 'green'}); 
					  			var act = new fabric.Rect({ left: actPoint.x-3, top: actPoint.y-3, width: 6, height: 6, fill: 'blue'}); 
					  			var cir = new fabric.Circle ({
					  				radius: delta,
					  				fill: '',
					  				stroke: 'red',
					  				strokeWidth: 2,
					  				left: intersTT.x - delta,
					  				top: intersTT.y - delta
					  			});
					  			fCanvas.add(intersect);
					  			fCanvas.add(cir);
					  			fCanvas.add(obj);
					  			fCanvas.add(act);
					  			var strPath = 'M ' + objPoint.x + ' ' + objPoint.y + 
					  				' Q ' + median.x + ' ' + median.y + ' ' + 
					  				actPoint.x + ' ' + actPoint.y + 
					  				' L ' + intersTT.x + ' ' + intersTT.y;
					  			var minPoint;
					  			if (intersTT.x < objPoint.x){
					  				if (intersTT.x < actPoint.x){
					  					minPoint = intersTT;
					  					minPoint.y = intersTT.y - Math.abs(actPoint.y - objPoint.y);
					  				}else{
					  					minPoint = actPoint;
					  				}
					  			}else{
					  				if (objPoint.x < actPoint.x){
					  					minPoint = objPoint;
					  				}else{
					  					minPoint = actPoint;
					  				}
					  			}
					  			var corner = new fabric.Path(strPath, {
					  				left: minPoint.x,
								    top: minPoint.y,
								    fill: 'black'
					  			});
					  			fCanvas.add(corner);					  			
					  			var mline1 = new fabric.Rect({ left: median.x-3, top: median.y-3, width: 6, height: 6, fill: 'yellow'}); 
					  			fCanvas.add(mline1);
					  		} 


function createCorner(actStart, actEnd, objStart, objEnd, objF, actF){
			var inters = intersection(
				{x: actStart.x, y: actStart.y},
				{x: actEnd.x, y: actEnd.y},
				{x: objStart.x, y: objStart.y},
				{x: objEnd.x, y: objEnd.y});
			if(inters)
			{
				delta = 50;
				var objPoints = intersectionCircle2 (inters.x, inters.y, delta, objStart.x, objStart.y, objEnd.x, objEnd.y);
				var actPoints = intersectionCircle2 (inters.x, inters.y, delta, actStart.x, actStart.y, actEnd.x, actEnd.y);
				var objPoint,actPoint;
				var objK = getK(objStart.x, objStart.y, objEnd.x, objEnd.y) * objF;
				var actK = getK(actStart.x, actStart.y, actEnd.x, actEnd.y) * actF;
				if (objK > 0){// || objK == 0 && (objF == -1 && actF == 1 || objF == -1 && actF == -1)) {
					objPoint = objPoints[0];
				}else{
					objPoint = objPoints[1];
				}
				if (actK > 0){// || actK == 0 && (objF == 1 && actF == -1 || objF == -1 && actF == -1) ){
					actPoint = actPoints[0];
				}else{
					actPoint = actPoints[1];
				}

				var intersect = new fabric.Rect({ left: inters.x-3, top: inters.y-3, width: 6, height: 6, fill: 'red'});
				var obj = new fabric.Rect({ left: objPoint.x-3, top: objPoint.y-3, width: 6, height: 6, fill: 'green'}); 
				var act = new fabric.Rect({ left: actPoint.x-3, top: actPoint.y-3, width: 6, height: 6, fill: 'blue'}); 
				var cir = new fabric.Circle ({
					radius: delta,
					fill: '',
					stroke: 'red',
					strokeWidth: 2,
					left: inters.x - delta,
					top: inters.y - delta
				});
				fCanvas.add(intersect);
				fCanvas.add(cir);
				fCanvas.add(obj);
				fCanvas.add(act);

				var half1 = {x : (objPoint.x + actPoint.x)/2, y: (objPoint.y + actPoint.y)/2 };
				var half2 = {x : (objPoint.x + inters.x)/2, y: (objPoint.y + inters.y)/2 };
				var median = intersection(inters, half1, actPoint, half2);	  			

				var strPath = 'M ' + objPoint.x + ' ' + objPoint.y + 
					' Q ' + median.x + ' ' + median.y + ' ' + 
					actPoint.x + ' ' + actPoint.y + 
	  				' L ' + inters.x + ' ' + inters.y;
  				var minPoint = {x:0,y:0};
  				minPoint.x = Math.min(inters.x, objPoint.x, actPoint.x);
  				minPoint.y = Math.min(inters.y, objPoint.y, actPoint.y);
  				var corner = new fabric.Path(strPath, {
  					left: minPoint.x,// + 4*actF,
  					top: minPoint.y,// + 2*objF,
  					fill: 'black'
  				});
  				fCanvas.add(corner);
  				var mline1 = new fabric.Rect({ left: median.x-3, top: median.y-3, width: 6, height: 6, fill: 'yellow'}); 
  				fCanvas.add(mline1);
  			} 
  		}


  		function createCorner(actStart, actEnd, objStart, objEnd, type){
			var inters = intersection(
				{x: actStart.x, y: actStart.y},
				{x: actEnd.x, y: actEnd.y},
				{x: objStart.x, y: objStart.y},
				{x: objEnd.x, y: objEnd.y});
			if(inters)
			{
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

				var intersect = new fabric.Rect({ left: inters.x-3, top: inters.y-3, width: 6, height: 6, fill: 'red'});
				var obj = new fabric.Rect({ left: objPoint.x-3, top: objPoint.y-3, width: 6, height: 6, fill: 'green'}); 
				var act = new fabric.Rect({ left: actPoint.x-3, top: actPoint.y-3, width: 6, height: 6, fill: 'blue'}); 
				var cir = new fabric.Circle ({
					radius: delta,
					fill: '',
					stroke: 'red',
					strokeWidth: 2,
					left: inters.x - delta,
					top: inters.y - delta
				});
				fCanvas.add(intersect);
				fCanvas.add(cir);
				fCanvas.add(obj);
				fCanvas.add(act);

				var half1 = {x : (objPoint.x + actPoint.x)/2, y: (objPoint.y + actPoint.y)/2 };
				var half2 = {x : (objPoint.x + inters.x)/2, y: (objPoint.y + inters.y)/2 };
				var median = intersection(inters, half1, actPoint, half2);	  			

				var strPath = 'M ' + objPoint.x + ' ' + objPoint.y + 
					' Q ' + median.x + ' ' + median.y + ' ' + 
					actPoint.x + ' ' + actPoint.y + 
	  				' L ' + inters.x + ' ' + inters.y;
  				var minPoint = {x:0,y:0};
  				minPoint.x = Math.min(inters.x, objPoint.x, actPoint.x);
  				minPoint.y = Math.min(inters.y, objPoint.y, actPoint.y);
  				var corner = new fabric.Path(strPath, {
  					left: minPoint.x,// + 4*actF,
  					top: minPoint.y,// + 2*objF,
  					fill: 'black'
  				});
  				fCanvas.add(corner);
  				var mline1 = new fabric.Rect({ left: median.x-3, top: median.y-3, width: 6, height: 6, fill: 'yellow'}); 
  				fCanvas.add(mline1);
  			} 
  		}


  		createCorner(actPrepared.topLine.start, actPrepared.topLine.end, objPrepared.topLine.start, objPrepared.topLine.end, 'aToT');
    	createCorner(actPrepared.topLine.start, actPrepared.topLine.end, objPrepared.bottomLine.start, objPrepared.bottomLine.end, 'aToB');
    	createCorner(actPrepared.bottomLine.start, actPrepared.bottomLine.end, objPrepared.topLine.start, objPrepared.topLine.end, 'aBoT');
    	createCorner(actPrepared.bottomLine.start, actPrepared.bottomLine.end, objPrepared.bottomLine.start, objPrepared.bottomLine.end, 'aBoB');

    	path = 'M ' + corner1.p1.x + ' ' + corner1.p1.y + ' Q ' + corner1.p2.x + ' ' + corner1.p2.y + ' ' + corner1.p3.x + ' ' + corner1.p3.y + ' ' +
    			'L ' + corner3.p3.x + ' ' + corner3.p3.y + ' Q ' + corner3.p2.x + ' ' + corner3.p2.y + ' ' + corner3.p1.x + ' ' + corner3.p1.y + ' ' +
    			'L ' + corner4.p1.x + ' ' + corner4.p1.y + ' Q ' + corner4.p2.x + ' ' + corner4.p2.y + ' ' + corner4.p3.x + ' ' + corner4.p3.y + ' ' +
    			'L ' + corner2.p3.x + ' ' + corner2.p3.y + ' Q ' + corner2.p2.x + ' ' + corner2.p2.y + ' ' + corner2.p1.x + ' ' + corner2.p1.y;

var minPoint = 
    		{
    			x: minX,//Math.min(corner1.p1.x,corner1.p2.x,corner1.p3.x,corner2.p1.x,corner2.p2.x,corner2.p3.x,corner3.p1.x,corner3.p2.x,corner3.p3.x,corner4.p1.x,corner4.p2.x,corner4.p3.x),
    			y: minY//Math.min(corner1.p1.y,corner1.p2.y,corner1.p3.y,corner2.p1.y,corner2.p2.y,corner2.p3.y,corner3.p1.y,corner3.p2.y,corner3.p3.y,corner4.p1.y,corner4.p2.y,corner4.p3.y)
    		}