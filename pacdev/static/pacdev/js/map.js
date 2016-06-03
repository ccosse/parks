var Map=function(mapdiv){
	var me={};
	me.HILIGHTS=[];
	me.POINT_HILIGHTS=[];

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

	var sat=new ol.layer.Tile({
		minResolution:500,
		preload:14,
		opacity:1.0,
		title:'Satellite',
		source: new ol.source.MapQuest({layer: 'sat'})
	});
	var osm=new ol.layer.Tile({
		preload:14,
		opacity:1.0,
		title:'OpenStreetMap2',
		source:new ol.source.OSM()
	});

	var hilite_style=new ol.style.Style({
		stroke: new ol.style.Stroke({color: '#FF0',width: 3}),
	//	fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),
	});
	var guyana_style=new ol.style.Style({
		stroke: new ol.style.Stroke({color: '#0A0',width: 2}),
	//	fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),
	});
	var pac_style=new ol.style.Style({
		stroke: new ol.style.Stroke({color: '#FF0',width: 2}),
	//	fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),
	});
	var hidden_style=new ol.style.Style({
		stroke: new ol.style.Stroke({color:'rgba(0,0,0,0)',width: 2}),
	//	fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),
	});

	var point_style=new ol.style.Style({
	image:new ol.style.Circle({
		radius:10,
		stroke: new ol.style.Stroke({
			color: 'rgba(0,255,0,1)',
			width:5
		}),
		fill: new ol.style.Fill({
			color: 'rgba(255,255,0,1)',
		}),
	})
});
/*
var hidden_point_style=new ol.style.Style({
	image:new ol.style.Circle({
		radius:0,
		stroke: new ol.style.Stroke({
			color: 'rgba(0,255,0,0)',
			width:0
		}),
		fill: new ol.style.Fill({
			color: 'rgba(255,255,0,0)',
		}),
	})
});
*/
me.add_point_layer=function(cfg){
		var point_source=new ol.source.Vector({
			url: DATA+cfg['src_url'],
			format: new ol.format.GeoJSON(),
	//		minZoom: mapMinZoom,
	//		maxZoom: mapMaxZoom
		});

		var point_layer= new ol.layer.Vector({
			source: point_source,
			style:point_style
		});
		point_layer.set("layer_type","Launch3D");
		point_layer.set("title",DATA+cfg['src_url']);
//		console.log("trying to get mediapath: "+cfg["mediapath"]);
//		point_layer.set("mediapath",cfg["mediapath"]);
		me.map.addLayer(point_layer);
		return point_layer;
	}
	me.add_xyz_layer=function(cfg){
					var iurl=DATA+cfg['src_url']+"/{z}/{x}/{y}.png";
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
					image_layer.set("layer_type","xyz");
					image_layer.set("title",DATA+cfg['src_url'])
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
	me.add_polygon_layer=function(cfg){
		console.log("map.add_polygon_layer: "+DATA+cfg['src_url']);
		var polygon_source=new ol.source.Vector({
			url: DATA+cfg['src_url'],
			format: new ol.format.GeoJSON()
		});

		var le_style=cfg['style'];
		if(!le_style)
			le_style=new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),});
//		console.log(le_style);
		//if(key=="Guyana")le_style=guyana_style;

		var polygon_layer= new ol.layer.Vector({
			source: polygon_source,
			style:le_style,
		});
		polygon_layer.set("layer_type","polygon");
		polygon_layer.set("title",DATA+cfg['src_url'])
		me.map.addLayer(polygon_layer);
		return polygon_layer;
	}


	me.map = new ol.Map({
	  layers: [],//osm,sat
		controls:[],
		interactions:[],
	  target: mapdiv,
		loadTilesWhileAnimating:true,
		loadTilesWhileInteracting:true,
	  view: new ol.View({
    	center:ol.proj.transform([-58.9,4.31],"EPSG:4326","EPSG:3857"),
	  })
	});

	me.add_xyz_layer({'layeridx':0,'type':'xyz','src_url':'guyana/guyana_pixelated/'});
//	me.map.addLayer(sat);
	me.add_polygon_layer(window.Cfg['layers']['boundary']);

	me.xpopup.innerHTML="WHERE IS THIS POPUP?"
	me.overlay.setMap(me.map);
//	me.overlay.setPosition(ol.proj.transform([-58.95,4.7],"EPSG:4326","EPSG:3857"));

	me.map.on('click',function(evt){
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
					console.log(lidx+" "+clicked_layers[lidx].get("layer_type")+" "+clicked_layers[lidx].get("title"));
					if(clicked_layers[lidx].get("bbox")){
						var bbox=clicked_layers[lidx].get("bbox");
						console.log("GOT BBOX! "+bbox);//via cfg->add_*_layer
						var center=[(bbox[0]+bbox[2])/2.,(bbox[1]+bbox[3])/2.];
						pan_zoom(center,bbox);
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

	var bcr=document.getElementById('mapdiv').getBoundingClientRect();
	var res=compute_resolution(window.Cfg['bbox'],false,bcr.width,bcr.height);
	me.map.setSize([bcr.width,bcr.height]);
	me.map.getView().setResolution(res);

	me.unhilite=function(e){
		for(var hidx=0;hidx<me.POINT_HILIGHTS.length;hidx++){
			me.pointOverlay.removeFeature(me.POINT_HILIGHTS[hidx]);
		}
		for(var hidx=0;hidx<me.HILIGHTS.length;hidx++){
			me.featureOverlay.removeFeature(me.HILIGHTS[hidx]);
		}
		me.overlay.setPosition(undefined);
		me.popup_closer.blur();
	}

	me.hilite=function(feature_name,layer){
//		console.log("map.hilite: "+feature_name);
//		console.log("layer_type: "+layer.get("layer_type"));
		var fs=layer.getSource().getFeatures();
		for(var fidx=0;fidx<fs.length;fidx++){
			if(layer.get("layer_type")=="Launch3D"){
				me.pointOverlay.addFeature(fs[fidx]);
				me.POINT_HILIGHTS.push(fs[fidx]);
			}
			else{
				me.featureOverlay.addFeature(fs[fidx]);
				me.HILIGHTS.push(fs[fidx]);
			}
		}
		try{
			me.xpopup.innerHTML = '<p>'+feature_name+'</p>';//feature.getProperties().Name
			me.overlay.setPosition(ol.proj.transform(window.Cfg[feature_name]['center'],"EPSG:4326","EPSG:3857"));
		}catch(e){}

	}

	me.map.on('pointermove',function(evt){

		var latpanel=document.getElementById("lat");
		var lonpanel=document.getElementById("lon");
		var lonlat=ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
		var lon=parseFloat(parseInt(lonlat[0]*1E4)/1E4);
		var lat=parseFloat(parseInt(lonlat[1]*1E4)/1E4);
//		latpanel.innerHTML=lat;
//		lonpanel.innerHTML=lon;

		me.unhilite();

		if(evt.dragging){return;}
		var found=false;
		dummmy=me.map.forEachFeatureAtPixel(evt.pixel,function(target_feature,layer){

//			if(layer)console.log("title="+layer.get("title"));

			var target_name=target_feature.get("NAME");
			if(!target_name)target_name=target_feature.get("Name");
			if(layer){
				if(layer.get("title")!="/static/pacdev/data/guyana/guyana_boundary.geojson"){
//					console.log("target_name = "+target_name);
					me.hilite(target_name,layer);

				if(target_feature && target_name){
					//console.log("target_feature="+target_feature);
					me.xpopup.innerHTML = '<p>'+target_name+'</p>';//feature.getProperties().Name
					me.xpopup.innerHTML += lon+", "+lat+"<br>";
					var keystr="keystr: ";
					for(var kidx=0;kidx<window.Cfg.keys.length;kidx++)
					keystr+=window.Cfg.keys[kidx]+",";
//					console.log(keystr);
					try{
						me.overlay.setPosition(ol.proj.transform(window.Cfg[target_name]['center'],"EPSG:4326","EPSG:3857"));
					}
					catch(e){
						me.overlay.setPosition(ol.proj.transform(evt.coordinate,"EPSG:4326","EPSG:3857"));
					}
					found=true;
				}
			}}
		});
		if(!found){
			me.overlay.setPosition(undefined);
			me.popup_closer.blur();
		}

	});

	me.pointOverlay = new ol.FeatureOverlay({
		map: me.map,
		style: new ol.style.Style({
		image:new ol.style.Circle({
			radius:10,
			stroke: new ol.style.Stroke({
				color: 'rgba(222,255,0,1)',
				width:6
			}),
			fill: new ol.style.Fill({
				color: 'rgba(255,0,0,1)',
			}),
			})
		}),
	});
	me.featureOverlay = new ol.FeatureOverlay({
		map: me.map,
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: 'gold',
				width: 2
			}),
		}),
	});
	return me;
}
