var Map=function(mapdiv){
	var me={};

	me.map=null;
	me.gmap=null;

	me.HILIGHTS=[];
	me.POINT_HILIGHTS=[];
	me.hiliteMgr=null;

	me.xpopup = document.getElementById('xpopup');
	console.log('xpopup found by map.js');
	me.popup_closer = document.getElementById('popup-closer');

	me.WebGL=false;
	me.lib3D=null;
	try{
		console.log("initializing 3D");
		me.lib3D=new My3DStuff();
		me.lib3D.init3d();
		me.WebGL=true;
		console.log("3D initialized");
	}
	catch(e){console.log(e);}

	me.overlay = new ol.Overlay({
		element: document.getElementById('popup'),
		autoPan: false,
		autoPanAnimation: {
			duration: 250
		}
	});
	me.popup_closer.onclick = function() {
		me.overlay.setPosition(undefined);
		me.popup_closer.blur();
		return false;
	};


	me.add_point_layer=function(cfg){
		var point_source=new ol.source.Vector({
			url: window.DATA+cfg['src_url'],
			format: new ol.format.GeoJSON(),
		});

		var le_style=point_style;
		if(false){;}
		else if(cfg['style']=='red_flag')
			le_style=red_flag;
		else if(cfg['style']=='green_flag')
			le_style=green_flag;
		else if(cfg['style']=='blue_flag')
			le_style=blue_flag;
		else if(cfg['style']=='orange_flag')
			le_style=orange_flag;
		else {
				le_style=point_style;
				cfg['style']='point_style';
		}
		var point_layer= new ol.layer.Vector({
			source: point_source,
			style:le_style
		});

		point_layer.set("title",window.DATA+cfg['src_url']);
		point_layer.set("hilite",true);
		point_layer.set("style",cfg['style']);//maintain as string so can decide which overlay list to remove from! (the whole point of carrying a string along)

		me.map.addLayer(point_layer);

		return point_layer;
	}
	me.add_xyz_layer=function(cfg){
					var iurl=window.DATA+cfg['src_url']+"/{z}/{x}/{y}.png";
					console.log("add_xyz_layer: "+iurl);

					var image_layer=new ol.layer.Tile({
			  			//extent: layerExtent,
			  			preload:10,
						source: new ol.source.XYZ({
//			    			attributions: [new ol.Attribution({html: basename+": "+ikey})],
			    			url: iurl,
//			    			minZoom: mapMinZoom,
//			    			maxZoom: mapMaxZoom
			  			})
					});
					image_layer.set("title",window.DATA+cfg['src_url'])
					image_layer.set("hilite",false);

					if(cfg['bbox']){
						image_layer.set("bbox",cfg["bbox"]);
					}
					if(cfg['layeridx']){//hack to control layer position of guyana_pixelated
						me.map.getLayers().insertAt(cfg['layeridx'], image_layer);
						console.log("added "+cfg['src_url']+" at "+cfg['layeridx']);
					}
					else{
						me.map.addLayer(image_layer);
						console.log("appended layer: "+cfg['src_url']);
					}

					return image_layer;
	}
	me.add_base_layer=function(obj){
		var base;
		if(obj['name']=='Satellite'){
			base=new ol.layer.Tile({
				minResolution:500,
				preload:14,
				opacity:obj['opacity'],
				title:'Satellite',
				source: new ol.source.MapQuest({layer: 'sat'})
			});
		}
		else if(obj['name']=='OpenStreetMap2'){
			base=new ol.layer.Tile({
				preload:14,
				opacity:obj['opacity'],
				title:'OpenStreetMap2',
				source:new ol.source.OSM()
			});
		}
		else return null;

		me.map.getLayers().insertAt(obj['layeridx'],base);
		base.set("hilite",false);
		console.log("added base layer: "+obj['name']);
		return base;
	}
	me.add_line_layer=function(cfg){
		console.log("add_line_layer");
		var line_source=new ol.source.Vector({
			url: window.DATA+cfg['src_url'],
			format: new ol.format.GeoJSON()
		});

		var line_layer= new ol.layer.Vector({
			source: line_source,
			style:new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'red',
					width: 3
				})
			})
		});
		line_layer.set("hilite",false);
		line_layer.set("title",window.DATA+cfg['src_url'])

		console.log("line_layer="+line_layer);
		me.map.addLayer(line_layer);
		return line_layer;
	}
	me.add_gpx_layer=function(cfg){
		var gpx_source=new ol.source.Vector({
			url:window.DATA+cfg['src_url'],
			format: new ol.format.GPX()
		});
		var gpx_layer= new ol.layer.Vector({
			source: gpx_source,
			style:gpx_style,
		});
		gpx_layer.set("type","gpx");
		gpx_layer.set("title",window.DATA+cfg['src_url']);
		gpx_layer.set("hilite",true);
		me.map.addLayer(gpx_layer);
		return gpx_layer;
	}

	me.add_polygon_layer=function(cfg){
		console.log("map.add_polygon_layer: "+window.DATA+cfg['src_url']);
		var polygon_source=new ol.source.Vector({
			url: window.DATA+cfg['src_url'],
			format: new ol.format.GeoJSON()
		});

		var le_style=cfg['style'];
		if(le_style)console.log(le_style);
		else{console.log("le_style not defined in this cfg");}

		if(!le_style)
			le_style=clear_pac;//#83ad35

		var polygon_layer= new ol.layer.Vector({
			source: polygon_source,
			style:le_style,
		});
		polygon_layer.set("title",window.DATA+cfg['src_url'])
		var hilite=true;
		try{hilite=cfg['hilite'];}
		catch(e){hilite=true;}
		console.log("allow hilite="+hilite);
		polygon_layer.set("hilite",hilite);

		me.map.addLayer(polygon_layer);
		return polygon_layer;
	}
	me.setup=function(){
/*
	me.gmap = new google.maps.Map(document.getElementById('gmap'), {
	  disableDefaultUI: true,
	  keyboardShortcuts: false,
	  draggable: false,
	  disableDoubleClickZoom: true,
	  scrollwheel: false,
	  streetViewControl: false,
	  mapTypeId: google.maps.MapTypeId.SATELLITE
	});
	console.log(me.gmap);
*/
	window.view = new ol.View({
	  maxZoom: 21,
		center:ol.proj.transform([-58.9,4.31],"EPSG:4326","EPSG:3857"),
	});
	window.view.on('change:center', function(evt) {
		//console.log("GMAP setCenter: "+evt.type);
	  var center = ol.proj.transform(window.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
//		me.gmap.panTo(new google.maps.LatLng(center[1], center[0]));
	});
	window.view.on('change:resolution', function(evt) {
		//console.log("GMAP setZoom: "+evt.type);
//		me.gmap.setZoom(window.view.getZoom());
	});

	me.map = new ol.Map({
	  layers: [],//osm,sat
		controls:[],
	  target: mapdiv,
		loadTilesWhileAnimating:true,
		loadTilesWhileInteracting:true,
	  view:window.view,
		interactions: ol.interaction.defaults({
			altShiftDragRotate: false,
			dragPan: false,
			rotate: false
		}).extend([new ol.interaction.DragPan({kinetic: null})]),
	});
	console.log(me.map);
	me.pointOverlay = new ol.FeatureOverlay({
		map: me.map,
		style: red_flag_hilite,
	});
	me.featureOverlay = new ol.FeatureOverlay({
		map: me.map,
		style: hilite_style,
	});
	me.hiliteMgr={
		'keys':['red_flag','green_flag','blue_flag','orange_flag','point_style'],
		'red_flag':new ol.FeatureOverlay({map:me.map,style:red_flag_hilite,}),
		'green_flag':new ol.FeatureOverlay({map:me.map,style:green_flag_hilite,}),
		'blue_flag':new ol.FeatureOverlay({map:me.map,style:blue_flag_hilite,}),
		'orange_flag':new ol.FeatureOverlay({map:me.map,style:orange_flag_hilite,}),
		'point_style':new ol.FeatureOverlay({map:me.map,style:point_hilite,}),
	};
	me.map.on('postrender',function(evt){
		//console.log('postrender: '+evt.type);
		var center = ol.proj.transform(window.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
//		me.gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
//		me.gmap.setZoom(window.view.getZoom());
	});
	me.map.on('moveend',function(evt){
		//console.log("moveend: "+evt.type);
		var center = ol.proj.transform(window.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
//		me.gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
//		me.gmap.setZoom(window.view.getZoom());
	});
	me.map.on('click',function(evt){
		var debugpanel=document.getElementById("debug");
		var lonlat=ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
		var lon=parseFloat(parseInt(lonlat[0]*1E4)/1E4);
		var lat=parseFloat(parseInt(lonlat[1]*1E4)/1E4);
		debugpanel.innerHTML+="["+lon+","+lat+"],";

		/*This feature info comes from inside the geojson
		file, so Name in Geojson needs to match name in Cfg
		structure; So Name="Hinterland Parks" for Kaieteur
		at Hinterland Parks.geojson.
		*/
		var clicked_features=[];
		var clicked_layers=[];
		var pixel = me.map.getEventPixel(evt.originalEvent);
		var dummy = me.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
			clicked_features.push(feature);
//			if(layer)clicked_layers.push(layer);
		});
		var dummy2=me.map.forEachLayerAtPixel(pixel,function(layer){
			clicked_layers.push(layer);
		});
		var found=false;

		console.log("clicked_features.length="+clicked_features.length);
		console.log("clicked_layers.length="+clicked_layers.length);

		for(var fidx=0;fidx<clicked_features.length;fidx++){
			var name=clicked_features[fidx].get("Name");
			console.log(fidx+" Name "+name);
			var mediapath=clicked_features[fidx].get("mediapath");
			console.log(fidx+" mediapath "+mediapath);
			var feature_type=clicked_features[fidx].get("feature_type");
			console.log(fidx+" feature_type "+feature_type);
			if(feature_type=="Launch3D"){
				found=true;
				console.log("Launching 3D Viewer ...");
				if(me.WebGL){me.lib3D.start(mediapath);}
				else{console.log("NEED: WebGL Required Message to user");}
				return;
			}
		}

		if(clicked_layers.length>0){
			for(var lidx=0;lidx<clicked_layers.length;lidx++){
				try{
					console.log(lidx+" "+clicked_layers[lidx].get("title"));
					if(clicked_layers[lidx].get("bbox")){
						var bbox=clicked_layers[lidx].get("bbox");
						console.log("GOT BBOX! "+bbox);//via cfg->add_*_layer
						var center=[(bbox[0]+bbox[2])/2.,(bbox[1]+bbox[3])/2.];
						pan_zoom(center,bbox);
						//NEED: navigation way back to previous
					}
					else{
						console.log("no bbox this layer");
					}
				}catch(e){console.log("ERROR");}
			}
		}

		if(clicked_features.length>0 && !found){
			var feature_name=clicked_features[0].getProperties().Name;

			if(window.Cfg['keys'].indexOf(feature_name)>-1){
				console.log("goto:"+feature_name);
				window.pacmap.goto(window.Cfg['path']+'.'+feature_name);
			}
			else {
				console.log("What do we want to do for this layer?");
				//embed instructions in file ... trailmap xyz
			}
		}
	});
	me.map.on('pointermove',function(evt){

		var latpanel=document.getElementById("lat");
		var lonpanel=document.getElementById("lon");
		var lonlat=ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
		var lon=parseFloat(parseInt(lonlat[0]*1E4)/1E4);
		var lat=parseFloat(parseInt(lonlat[1]*1E4)/1E4);
		latpanel.innerHTML=lat;
		lonpanel.innerHTML=lon;

		me.unhilite();

		if(evt.dragging){return;}
		var found=false;
		dummmy=me.map.forEachFeatureAtPixel(evt.pixel,function(target_feature,layer){

//			if(layer)console.log("title="+layer.get("title"));

			var target_name=target_feature.get("NAME");
			if(!target_name)target_name=target_feature.get("Name");
			if(layer){
//				console.log("layer_title="+layer.get("title"));
				var hilite=true;
				try{hilite=layer.get("hilite");}
				catch(e){hilite=true;}
				if(hilite!=false){
					me.hilite(target_name,layer);
					if(target_feature && target_name){
						me.xpopup.innerHTML +=lon+", "+lat;
						found=true;
					}
				}
			}
		});
		if(!found){
			me.overlay.setPosition(undefined);
			me.popup_closer.blur();
		}

	});

	//END OF SETUP STUFF:
	//	me.add_xyz_layer({'layeridx':0,'type':'xyz','src_url':'guyana/guyana_pixelated/'});
	//	me.map.addLayer(sat);
	//	me.add_polygon_layer(window.Cfg['layers']['boundary']);
		me.xpopup.innerHTML="WHERE IS THIS POPUP?"
		me.overlay.setMap(me.map);
	//	me.overlay.setPosition(ol.proj.transform([-58.95,4.7],"EPSG:4326","EPSG:3857"));
/*
	var gmap=document.getElementById('gmap');
	$("#gmap").css("height",window.innerHeight-51);
	var bcr=gmap.getBoundingClientRect();
	var res=compute_resolution(window.Cfg['bbox'],false,bcr.width,bcr.height);
	me.map.setSize([bcr.width,bcr.height]);
	window.view.setResolution(res);
*/
	window.view.setCenter(ol.proj.transform([-58.9,4.31],"EPSG:4326","EPSG:3857"));
	var olMapDiv=document.getElementById('mapdiv');
	olMapDiv=olMapDiv.parentNode.removeChild(olMapDiv);
//	me.gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);

}//end:setup



	me.unhilite=function(e){

		if(me.POINT_HILIGHTS.length||me.HILIGHTS.length)
			console.log("map.unhilite removing "+me.POINT_HILIGHTS.length+" points, "+me.HILIGHTS.length+" features");

		var x=null;
		for(var kidx=0;kidx<me.hiliteMgr['keys'].length;kidx++){
			var key=me.hiliteMgr['keys'][kidx];
			me.hiliteMgr[key].getFeatures().clear();
		}
		while(me.POINT_HILIGHTS.length>0){
			x=me.POINT_HILIGHTS.pop();
			me.pointOverlay.removeFeature(x);
		}

		while(me.HILIGHTS.length>0){
			try{
					x=me.HILIGHTS.pop();
					me.featureOverlay.removeFeature(x);
					console.log("trying to unhilite: "+x[1]);
					//x.setStyle(pac_style);
			}
			catch(e){"ERROR WHILE HILITING: "+console.log(e);}
		}

		me.overlay.setPosition(undefined);
		me.popup_closer.blur();
		//me.HILIGHTS=[];
		//me.POINT_HILIGHTS=[];
		console.log("unhilite done: "+me.POINT_HILIGHTS.length+", "+me.HILIGHTS.length);
	}

	me.hilite=function(feature_name,layer){
		var fs=layer.getSource().getFeatures();
		for(var fidx=0;fidx<fs.length;fidx++){
			if(fs[fidx].get("Name")!=feature_name)continue;//hinterland_boundaries have 3 features same name!
			console.log(fs[fidx].get("Name")+", "+feature_name);

			var ftype=fs[fidx].get("feature_type");

			if(ftype=="youtube"||ftype=="Launch3D"||ftype=="poi"){
				var le_style=layer.get("style");
				me.hiliteMgr[le_style].addFeature(fs[fidx]);
				//me.pointOverlay.addFeature(fs[fidx]);
				//me.POINT_HILIGHTS.push(fs[fidx]);
				me.xpopup.innerHTML = '<p>'+feature_name+'</p>';
				me.xpopup.innerHTML+=fs[fidx].get("media_html");
				var center=ol.proj.transform(fs[fidx].get("coordinates"),"EPSG:4326","EPSG:3857");
				var dy=window.map.map.getView().getResolution()*parseInt(80);
				var dx=window.map.map.getView().getResolution()*parseInt(30);
				center[1]+=dy;
				if(ftype=='youtube')center[0]-=dx;
				else center[0]+=dx;
				me.overlay.setPosition(center);
				break;
			}
			else{
				try{
					me.featureOverlay.addFeature(fs[fidx]);
					me.HILIGHTS.push(fs[fidx]);
					console.log("added to HILIGHTS");
				}
				catch(e){
						console.log(window.Cfg['path']);
						console.log("feature_name="+feature_name);console.log(e);
					}

				try{
					var src=window.Cfg[feature_name]['photos'][0];

					me.xpopup.innerHTML="<img width='120px' src='"+src+"'/>";
					me.xpopup.innerHTML += '<p>'+feature_name+'</p>';

					var center=ol.proj.transform(window.Cfg[feature_name]['center'],"EPSG:4326","EPSG:3857");
					var bcr=document.getElementById("popup").getBoundingClientRect();
					//me.xpopup.innerHTML+="<br>"+parseInt(bcr.width)+","+parseInt(bcr.height);
					var dy=window.view.getResolution()*parseInt(80);
					var dx=window.view.getResolution()*parseInt(50);
					center[1]+=dy;
					center[0]+=dx;
					me.overlay.setPosition(center);
				}catch(e){
					console.log(window.Cfg['path']);
					console.log("feature_name="+feature_name);console.log(e);}
			}
			console.log("fidx="+fidx+"/"+fs.length+" done");
		}
		console.log("hilite done");
	}



	return me;
}
