var Map=function(mapdiv){
	var me={};
	me.HILIGHTS=[];

	me.xpopup = document.getElementById('xpopup');
	console.log('xpopup found by map.js');
	me.popup_closer = document.getElementById('popup-closer');

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
		opacity:0.85,
		title:'Satellite',
		source: new ol.source.MapQuest({layer: 'sat'})
	});
	var osm=new ol.layer.Tile({
		preload:14,
		opacity:0.4,
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
me.add_point=function(src_url){
		var point_source=new ol.source.Vector({
			url: src_url,
			format: new ol.format.GeoJSON(),
	//		minZoom: mapMinZoom,
	//		maxZoom: mapMaxZoom
		});

		var point_layer= new ol.layer.Vector({
			source: point_source,
			style:point_style
		});
		me.map.addLayer(point_layer);
		return point_layer;
	}

	me.add_layer=function(cfg){
		console.log("map.add_layer: "+cfg['boundary']);
		var boundary_source=new ol.source.Vector({
			url: cfg['boundary'],
			format: new ol.format.GeoJSON()
		});

		var le_style=cfg['style'];
//		console.log(le_style);
		//if(key=="Guyana")le_style=guyana_style;

		var boundary_layer= new ol.layer.Vector({
			source: boundary_source,
			style:le_style,
		});
		me.map.addLayer(boundary_layer);
		return boundary_layer;
	}
	me.map = new ol.Map({
	  layers: [osm,sat],
		controls:[],
		interactions:[],
	  target: mapdiv,
	  view: new ol.View({
    	center:ol.proj.transform([0,0],"EPSG:4326","EPSG:3857"),
	  })
	});
	me.add_layer(window.Cfg);
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
			clicked_layers.push(layer);
		});
		var found=false;
		if(clicked_layers.length>0){
			console.log("layers.length="+clicked_layers.length);
			for(var lidx=0;lidx<clicked_layers.length;lidx++){
				//var layer_type=clicked_layers[lidx].get("layer_type");
				//console.log(layer_type);
				if(false){//}(layer_type=="Launch3D"){
					found=true;
					console.log("Launching 3D Viewer ...");
					if(me.WebGL){me.lib3D.start(clicked_layers[lidx].get("mediapath"));}
					else{console.log("NEED: WebGL Required Message to user");}
				}
			}
		}

		if(clicked_features.length>0 && !found){
			var feature_name=clicked_features[0].getProperties().Name;
			console.log("goto:"+feature_name);
			window.pacmap.goto(window.Cfg['path']+'.'+feature_name);
		}
	});

	var bcr=document.getElementById('mapdiv').getBoundingClientRect();
	var res=compute_resolution(window.Cfg['bbox'],false,bcr.width,bcr.height);
	me.map.setSize([bcr.width,bcr.height]);
	me.map.getView().setResolution(res);

	me.unhilite=function(e){
		for(var hidx=0;hidx<me.HILIGHTS.length;hidx++){
			me.featureOverlay.removeFeature(me.HILIGHTS[hidx]);
		}
		me.overlay.setPosition(undefined);
		me.popup_closer.blur();
	}

	me.hilite=function(feature_name,layer){
		console.log("map.hilite: "+feature_name);
		var fs=layer.getSource().getFeatures();
		for(var fidx=0;fidx<fs.length;fidx++){
			me.featureOverlay.addFeature(fs[fidx]);
			me.HILIGHTS.push(fs[fidx]);
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
			var target_name=target_feature.get("NAME");
			if(!target_name)target_name=target_feature.get("Name");
			if(layer){
				if(target_name!="Guyana")
					me.hilite(target_name,layer);
			}
			if(target_feature){
				console.log("target_feature="+target_feature);
				me.xpopup.innerHTML = '<p>'+target_name+'</p>';//feature.getProperties().Name
				me.xpopup.innerHTML += lon+", "+lat+"<br>";
				me.overlay.setPosition(ol.proj.transform(window.Cfg[target_name]['center'],"EPSG:4326","EPSG:3857"));

				found=true;
			}
		});
		if(!found){
			me.overlay.setPosition(undefined);
			me.popup_closer.blur();
		}

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
