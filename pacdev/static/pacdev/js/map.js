var Map=function(mapdiv){
	var me={};
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

	me.map = new ol.Map({
	  layers: [osm,sat],
	  target: mapdiv,
	  view: new ol.View({
    	center:ol.proj.transform(Config['center'],"EPSG:4326","EPSG:3857"),
	  })
	});

	me.hilite=function(f){
		console.log("map.hilite: "+f);
	}

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

	return me;
}
