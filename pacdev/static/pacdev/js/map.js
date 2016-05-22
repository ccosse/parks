var Map=function(mapdiv){
	var me={};
	me.HILIGHTS=[];

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
	me.add_layer=function(cfg){
		console.log("map.add_layer: "+cfg['boundary']);
		var boundary_source=new ol.source.Vector({
			url: cfg['boundary'],
			format: new ol.format.GeoJSON()
		});

		var le_style=cfg['style'];
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
	  target: mapdiv,
	  view: new ol.View({
    	center:ol.proj.transform(Config['center'],"EPSG:4326","EPSG:3857"),
	  })
	});
	me.add_layer(Config['Protected Areas Commission']);

	me.map.on('pointermove',function(evt) {
		var latpanel=document.getElementById("lat");
		var lonpanel=document.getElementById("lon");
		var lonlat=ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
		var lon=parseFloat(parseInt(lonlat[0]*1E4)/1E4);
		var lat=parseFloat(parseInt(lonlat[1]*1E4)/1E4);
		latpanel.innerHTML=lat;
		lonpanel.innerHTML=lon;
	});

	var bcr=document.getElementById('mapdiv').getBoundingClientRect();
	var res=compute_resolution(Config['bbox'],false,bcr.width,bcr.height);
	me.map.setSize([bcr.width,bcr.height]);
	me.map.getView().setResolution(res);

	me.unhilite=function(e){
		for(var hidx=0;hidx<me.HILIGHTS.length;hidx++){
			me.featureOverlay.removeFeature(me.HILIGHTS[hidx]);
		}
	}

	me.hilite=function(feature_name,layer){
		console.log("map.hilite: "+feature_name);
		var fs=layer.getSource().getFeatures();
		for(var fidx=0;fidx<fs.length;fidx++){
			me.featureOverlay.addFeature(fs[fidx]);
			me.HILIGHTS.push(fs[fidx]);
		}
	}

	me.map.on('pointermove',function(evt){
		me.unhilite();
		if(evt.dragging){return;}
		dummmy=me.map.forEachFeatureAtPixel(evt.pixel,function(target_feature,layer){
			var target_name=target_feature.get("NAME");
			if(!target_name)target_name=target_feature.get("Name");
			if(layer){
				me.hilite(target_name,layer);
				//if(DEBUG)console.log(target_name);
			};
		});
	});

	me.featureOverlay = new ol.FeatureOverlay({
		map: me.map,
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: '#0F0',
				width: 2
			}),
		}),
	});
	return me;
}
