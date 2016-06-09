var get_offset=function(res){
	if(!res){
		res=compute_resolution(window.Cfg['bbox'],false,window.innerWidth,window.innerHeight);
		res*=1.2;
		if(res==0)res=100;
	}

	var n=0.;
	if($("#controls").hasClass("small") && !$("#controls").hasClass("hhide_small")){
		n=.5;
	}
	else if($("#controls").hasClass("medium") && !$("#controls").hasClass("hhide_medium")){
		n=0.4;
	}
	else if($("#controls").hasClass("wide") && !$("#controls").hasClass("hhide_wide")){
		n=0.3;
	}
	var factor=n+(1.-n)/2.-0.5;
	lon_offset=(factor*window.innerWidth*res);//units of meters b/c [res]=[m/pixel]
	return lon_offset;
}
var pan_zoom=function(center,bbox){
		console.log("pan_zoom");
		var this_delay=100;

		var bounce = ol.animation.bounce({
		  resolution:window.view.getResolution(),
		  duration:this_delay
		});

		var pan = ol.animation.pan({
		  source: window.view.getCenter(),
		  duration:this_delay
		});

		var zoom = ol.animation.zoom({
			resolution: window.view.getResolution(),
			duration:this_delay
		});

		window.map.map.beforeRender(pan);
		window.map.map.beforeRender(zoom);

		var res=compute_resolution(bbox,false,window.innerWidth,window.innerHeight);
		res*=1.2;
		if(res==0)res=100;

		//we need to setCenter at offset point (b/c landscape sidebar reduces available window space)
		//3857 is in meters, 4326 in degrees.  convert center to 3857, then add offset, then setCenter:
		var lon_offset=0;
		if($("#controls").hasClass("landscape") && !$("#controls").hasClass("hhide")){
				lon_offset=get_offset(res);
		}
		var c0=ol.proj.transform(center,"EPSG:4326","EPSG:3857");
		var c1=[c0[0]-lon_offset,c0[1]];
		console.log("res:"+res);
		console.log("ctr:"+c1);

		window.view.setCenter(c1);
		window.view.setZoom(window.res2zoom(res));
/*
		window.map.gmap.setCenter(new google.maps.LatLng(c1[1], c1[0]));
		var zoom=window.res2zoom(res);
		var resolution=window.view.getResolution();
		console.log("zoom,resolution="+zoom+","+resolution);
		window.map.gmap.setZoom(zoom);
		var center = ol.proj.transform(window.view.getCenter(), 'EPSG:3857', 'EPSG:4326');

		console.log("calling resize");
		window.onresize();
*/
	}
var pan_zoom_home=function(){
	console.log("pan_zoom_home");

	var this_delay=1000;

	var pan = ol.animation.pan({
	  source: window.view.getCenter(),
	  duration:this_delay
	});

	var zoom = ol.animation.zoom({
		resolution: window.view.getResolution(),
		duration:this_delay
	});

	window.map.map.beforeRender(pan);
	window.map.map.beforeRender(zoom);

	var W=window.innerWidth;
	var H=window.innerHeight;
	var bbox=Config['Protected Areas Commission']['bbox'];
	var center=Config['Protected Areas Commission']['center'];

	var res=compute_resolution(bbox,false,window.innerWidth,window.innerHeight);
	res*=1.2;
	if(res==0)res=100;

	var offset=get_offset(res);
	var c0=ol.proj.transform(center,"EPSG:4326","EPSG:3857");
	var c1=[c0[0]-offset,c0[1]];
	window.view.setZoom(window.res2zoom(res));
	window.view.setCenter(c1);

	console.log("no call to resize");

	var center = ol.proj.transform(window.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
	window.map.gmap.setCenter(new google.maps.LatLng(c1[1], c1[0]));
	window.map.gmap.setZoom(window.res2zoom(res));
}
