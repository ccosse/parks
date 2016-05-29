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

		//we need to setCenter at offset point (b/c landscape sidebar reduces available window space)
		//3857 is in meters, 4326 in degrees.  convert center to 3857, then add offset, then setCenter:
		var lon_offset=0;
		var msg="";
		if($("#controls").hasClass("landscape") && !$("#controls").hasClass("hhide")){

				var n;
				if($("#controls").hasClass("small")){
					n=.5;
				}
				else if($("#controls").hasClass("medium")){
					n=0.4;
				}
				else if($("#controls").hasClass("wide")){
					n=0.3;
				}
				else{
					console.log("unknown width");
				}
				var factor=n+(1.-n)/2.-0.5;

				console.log( $("#controls").css("width") );
				console.log("innerWidth: "+window.innerWidth);
				console.log("factor: "+factor);

				msg+="#controls:"+$("#controls").css("width")+"<br>";
				msg+="innerWidth:"+window.innerWidth+"<br>";
				window.debug(msg);

//			Following 0.16 for 4-column bootstrap layout;0.125 for 3-columns. .2083=5 column
//			lon_offset=(0.16*window.innerWidth*res);//units of meters b/c [res]=[m/pixel]
			lon_offset=(factor*window.innerWidth*res);//units of meters b/c [res]=[m/pixel]
		}
		else{
			console.log("landscape: "+$("#controls").hasClass("landscape"));
			console.log("hhide: "+$("#controls").hasClass("hhide"));
		}
		console.log("lon_offset: "+lon_offset);

		var c0=ol.proj.transform(center,"EPSG:4326","EPSG:3857");
		var c1=[c0[0]-lon_offset,c0[1]];
		window.map.map.getView().setResolution(res);
		window.map.map.getView().setCenter(c1);
		window.onresize();
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
