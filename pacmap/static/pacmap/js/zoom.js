var pan_zoom=function(center,bbox){
		
		console.log("pan_zoom: "+center);
		
		var this_delay=4000;
		
		var bounce = ol.animation.bounce({
		  resolution:window.map.map.getView().getResolution()*1.2,
		  duration:this_delay
		});
		
		var pan = ol.animation.pan({
		  source: window.map.map.getView().getCenter(),
		  duration:this_delay
		});
		
		var zoom = ol.animation.zoom({
			resolution: window.map.map.getView().getResolution(),
			duration:this_delay
		});
		
		window.map.map.beforeRender(pan);
		window.map.map.beforeRender(zoom);
		
		var res=compute_resolution(bbox,false,window.innerWidth,window.innerHeight);
		res*=1.2;
		if(res==0)res=100;
		
		window.map.map.getView().setResolution(res);
		window.map.map.getView().setCenter(ol.proj.transform(center,"EPSG:4326","EPSG:3857"));
	}
var pan_zoom_home=function(){
	console.log("bounce_home");
	
	var this_delay=1000;
	
	var pan = ol.animation.pan({
	  source: window.map.map.getView().getCenter(),
	  duration:this_delay
	});

	var zoom = ol.animation.zoom({
		resolution: window.map.map.getView().getResolution(),
		duration:this_delay
	});
	
	window.map.map.beforeRender(pan);
	window.map.map.beforeRender(zoom);

	var W=window.innerWidth;
	var H=window.innerHeight;
	var bbox=Config['bbox'];
	var center=Config['center'];
		
	var res=compute_resolution(bbox,false,window.innerWidth,window.innerHeight);
	res*=1.2;
	if(res==0)res=100;
		
	window.map.map.getView().setResolution(res);
	window.map.map.getView().setCenter(ol.proj.transform(center,"EPSG:4326","EPSG:3857"));
	window.map.show_guyana();

}
