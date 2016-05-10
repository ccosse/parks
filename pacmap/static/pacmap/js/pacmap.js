var PACMap=function(){
	var me={};
	me.toggle=function(){
		console.log("PACMap.toggle");
	}
	var sat=new ol.layer.Tile({
		minResolution:500,
		preload:14,
		opacity:0.8,
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
	  target: 'mapdiv',
	  view: new ol.View({
    	center: [0, 0],
	    zoom: 2
	  })
	});
	
	return me;
}