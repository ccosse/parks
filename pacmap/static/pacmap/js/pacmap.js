var compute_resolution=function(bbox,is3857,W,H){
	
	var xmax=bbox[2];
	var xmin=bbox[0];
	var ymin=bbox[1];
	var ymax=bbox[3];
	
	var p1,p2;
	if(is3857){
		p2=[xmax,ymax];
		p1=[xmin,ymin];
	}
	else{
		p2=ol.proj.transform([xmax,ymax],"EPSG:4326","EPSG:3857");
		p1=ol.proj.transform([xmin,ymin],"EPSG:4326","EPSG:3857");
	}
	
	console.log(p1+", "+p2);
	
	var dx=p2[0]-p1[0];
	var dy=p2[1]-p1[1];
	
	
	var AR_win=W/H;
	var AR_shp=dx/dy;
	
	var res;
	if(AR_win>1){
		if(AR_shp<1){
			res=dy/H;
		}
		else if(AR_shp>AR_win){
			res=dx/W;
		}
		else{
			res=dy/H;
		}
	}
	else{//AR_win<1
		if(AR_shp>1){
			res=dx/W;
		}
		else if(AR_shp<AR_win){
			res=dy/H;
		}
		else{
			res=dx/W;
		}
	}
	console.log("res="+res);
	return res;
}
var PACMap=function(mapdiv){
	var me={};
	me.mapdiv=mapdiv;
	me.last_timeout=null;
	me.RUNNING=true;
	me.toggle=function(){
		if(me.RUNNING==true){
			me.RUNNING=false;
			try{window.clearTimeout(me.last_timeout);}
			catch(e){}	
		}
		else{
			me.RUNNING=true;
			me.update();
		}
	}
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
	me.map = new ol.Map({
	  layers: [osm,sat],
	  target: me.mapdiv,
	  view: new ol.View({
    	center:ol.proj.transform(CONFIG['pac_location'],"EPSG:4326","EPSG:3857"),
	  })
	});
	
	var bcr=document.getElementById('mapdiv').getBoundingClientRect();
	var res=compute_resolution(CONFIG['Guyana']['bbox'],false,bcr.width,bcr.height);
	me.map.setSize([bcr.width,bcr.height]);
	me.map.getView().setResolution(res);
			
	return me;
}