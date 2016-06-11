//PATH=/window.STATIC/pacdev/window.DATA/
window.STATIC="/static/pacdev/"
window.DATA="/static/pacdev/data/";
window.DEBUG=true;
window.view=null;
window.rlist=null;
var gpx_style=new ol.style.Style({stroke: new ol.style.Stroke({color: '#FF0000',width: 4}),});
var clear_hilite=new ol.style.Style({stroke: new ol.style.Stroke({color: 'red',width: 2}),});
var clear_pac=new ol.style.Style({stroke: new ol.style.Stroke({color: '#FFad35',width: 2}),});
var hilite_style=new ol.style.Style({stroke: new ol.style.Stroke({color: 'rgba(255,255,0,1)',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,.5)'}),});
var pac_style=new ol.style.Style({stroke: new ol.style.Stroke({color: 'rgba(255,200,0,1)',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.3)'}),});
var river_style=new ol.style.Style({stroke: new ol.style.Stroke({color:'#11A1FF',width: 2}),fill: new ol.style.Fill({color:'#1111FF'})});
var creek_style=new ol.style.Style({stroke: new ol.style.Stroke({color:'rgba(100,200,255,0.5)',width: 2}),});
var boundary2_style=new ol.style.Style({stroke: new ol.style.Stroke({color:'#FFad35',width: 2}),});
var point_style=new ol.style.Style({image:new ol.style.Circle({radius:7,stroke: new ol.style.Stroke({color: 'rgba(0,255,0,1)',width:2}),fill: new ol.style.Fill({color: 'rgba(0,0,255,1)',}),})});
var point_hilite=new ol.style.Style({image:new ol.style.Circle({radius:7,stroke: new ol.style.Stroke({color: 'rgba(255,255,0,1)',width:2}),fill: new ol.style.Fill({color: 'rgba(0,111,255,1)',}),})});

var red_flag = new ol.style.Style({image: new ol.style.Icon(({scale:0.2,src: window.STATIC+'img/flag_red.png'}))});
var red_flag_hilite = new ol.style.Style({image: new ol.style.Icon(({scale:0.25,src: window.STATIC+'img/flag_red_hilite.png'}))});
var green_flag = new ol.style.Style({image: new ol.style.Icon(({scale:0.2,src: window.STATIC+'img/flag_green.png'}))});
var green_flag_hilite = new ol.style.Style({image: new ol.style.Icon(({scale:0.25,src: window.STATIC+'img/flag_green_hilite.png'}))});
var blue_flag = new ol.style.Style({image: new ol.style.Icon(({scale:0.2,src: window.STATIC+'img/flag_blue.png'}))});
var blue_flag_hilite = new ol.style.Style({image: new ol.style.Icon(({scale:0.25,src: window.STATIC+'img/flag_blue_hilite.png'}))});
var orange_flag = new ol.style.Style({image: new ol.style.Icon(({scale:0.2,src: window.STATIC+'img/flag_orange.png'}))});
var orange_flag_hilite = new ol.style.Style({image: new ol.style.Icon(({scale:0.25,src: window.STATIC+'img/flag_orange_hilite.png'}))});

var Config={
	'Protected Areas Commission':{
		'html':"Protected Areas Commission<br><span style='font-size:0.8em'>Georgetown, Guyana</span>",
		'path':'Protected Areas Commission',
		'center':[-58.9,4.81],
		'bbox':[-61.5,1.1,-56.3,8.7],
		'photos':[window.DATA+'guyana/img/pac_hq.jpg',],
		'keys':['Urban Parks','Hinterland Parks','Related Areas'],//
		'layers':{
			'keys':['boundary'],//'boundary'
			'boundary':{'hilite':false,'type':'polygon','src_url':'guyana/guyana_boundary.geojson',},
			'Satellite':{'type':'base','name':'Satellite','layeridx':0,'opacity':0.8},
			'guyana_boundary':{'hilite':false,'type':'polygon','src_url':'guyana/guyana_boundary.geojson',},
		},
		'Hinterland Parks':{
			'html':"Hinterland Parks",
			'path':'Protected Areas Commission.Hinterland Parks',
			'center':[-59.2514,5.5807],
			'bbox':[-60.4036,3.1817,-58.1107,8.6807],
			'photos':[window.DATA+'hinterland_areas/img/hinterland_areas.jpg',],
			'keys':['Kaieteur National Park','Shell Beach','Kanuku Mountains'],
			'layers':{
				'keys':['guyana_boundary'],//'Satellite',
				'Satellite':{'type':'base','name':'Satellite','layeridx':0,'opacity':0.8},
				'boundary':{'type':'polygon','src_url':'hinterland_areas/hinterland_boundaries.geojson','style':pac_style,},//
				'guyana_boundary':{'hilite':false,'type':'polygon','src_url':'guyana/guyana_boundary.geojson',},
			},
			'Kaieteur National Park':{
				'html':"Kaieteur National Park",
				'path':'Protected Areas Commission.Hinterland Parks.Kaieteur National Park',
				'center':[-59.50293, 5.175],
				'bbox':[-59.63383, 5.0468, -59.37203, 5.3032],
				'photos':[window.DATA+'hinterland_areas/kaieteur/img/kaieteur_falls.png',],
				'keys':[],
				'layers':{
					'keys':['boundary2','creeks','rivers','falls3d','kaieteur_pois','kaieteur_orange','kaieteur_blue'],//'guyana_pixelated','satellite','trailmap',
					'guyana_pixelated':{'type':'xyz','src_url':'guyana/guyana_pixelated/','layeridx':0,},
					'kaieteur_pois':{'style':'red_flag','type':'points','src_url':'hinterland_areas/kaieteur/kaieteur_pois.geojson'},
					'kaieteur_orange':{'style':'orange_flag','type':'points','src_url':'hinterland_areas/kaieteur/kaieteur_orange.geojson'},
					'kaieteur_blue':{'style':'blue_flag','type':'points','src_url':'hinterland_areas/kaieteur/kaieteur_blue.geojson'},
					'rivers':{'hilite':false,'type':'polygon','src_url':'hinterland_areas/kaieteur/kaieteur_rivers.geojson','style':river_style},
					'creeks':{'hilite':false,'type':'polygon','src_url':'hinterland_areas/kaieteur/kaieteur_creeks.geojson','style':creek_style},
					'boundary':{'type':'polygon','style':pac_style,'src_url':'hinterland_areas/kaieteur/kaieteur_boundary.geojson',},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'hinterland_areas/kaieteur/kaieteur_boundary.geojson',},
					'satellite':{'type':'xyz','src_url':'hinterland_areas/kaieteur/satellite/'},
					'trailmap':{'bbox':[-59.5025,5.1511,-59.465,5.1914],'type':'xyz','src_url':'hinterland_areas/kaieteur/trailmap/',},
					'falls3d':{'style':'green_flag','tooltip':'Click for 3D viewer','type':'points','src_url':'hinterland_areas/kaieteur/falls.geojson',},
				},
			},
			'Shell Beach':{
				'html':"Shell Beach Protected Area",
				'path':'Protected Areas Commission.Hinterland Parks.Shell Beach',
				'center':[-59.294995, 7.99126],
				'bbox':[-59.78492, 7.59982, -58.80507, 8.3827],
				'photos':[window.DATA+'hinterland_areas/shellbeach/img/shell_beach.jpg',],
				'keys':[],
				'layers':{
					'keys':['boundary2','creeks','rivers','panorama1','panorama2','sinewave'],//'boundary','guyana_pixelated','shellbeach_satellite',
					'guyana_pixelated':{'type':'xyz','src_url':'guyana/guyana_pixelated/','layeridx':0,},
					'rivers':{'hilite':false,'type':'polygon','src_url':'hinterland_areas/shellbeach/shellbeach_rivers.geojson','style':river_style },
					'creeks':{'hilite':false,'type':'polygon','src_url':'hinterland_areas/shellbeach/shellbeach_creeks.geojson','style':creek_style },
					'boundary':{'type':'polygon','style':pac_style,'src_url':'hinterland_areas/shellbeach/shellbeach_boundary.geojson',},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'hinterland_areas/shellbeach/shellbeach_boundary.geojson',},
					'shellbeach_satellite':{'type':'xyz','src_url':'hinterland_areas/shellbeach/shellbeach_satellite/'},
					'panorama1':{'type':'points','src_url':'hinterland_areas/shellbeach/beach.geojson',},
					'panorama2':{'type':'points','src_url':'hinterland_areas/shellbeach/shellbeach_panorama2.geojson',},
					'sinewave':{'type':'points','src_url':'hinterland_areas/shellbeach/wave.geojson',},
				},
			},
			'Kanuku Mountains':{
				'html':"Kanuku Mountains",
				'path':'Protected Areas Commission.Hinterland Parks.Kanuku Mountains',
				'center':[-59.105485, 3.2779],
				'bbox':[-59.62108, 2.89736, -58.58989, 3.65844],
				'photos':[window.DATA+'hinterland_areas/kanuku/img/kanuku_mountains.png',],
				'keys':[],
				'layers':{
					'keys':['boundary2','creeks','rivers','kanuku_panorama','rupununi_panorama'],//'guyana_pixelated','kanuku_satellite',
					'guyana_pixelated':{'type':'xyz','src_url':'guyana/guyana_pixelated/','layeridx':0,},
					'rivers':{'hilite':false,'type':'polygon','src_url':'hinterland_areas/kanuku/kanuku_rivers.geojson','style':river_style },
					'creeks':{'hilite':false,'type':'polygon','src_url':'hinterland_areas/kanuku/kanuku_creeks.geojson','style':creek_style },
					'boundary':{'type':'polygon','style':pac_style,'src_url':'hinterland_areas/kanuku/kanuku_boundary.geojson',},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'hinterland_areas/kanuku/kanuku_boundary.geojson',},
					'kanuku_satellite':{'type':'xyz','src_url':'hinterland_areas/kanuku/kanuku_satellite/'},
					'kanuku_panorama':{'type':'points','src_url':'hinterland_areas/kanuku/kanuku3d.geojson',},
					'rupununi_panorama':{'type':'points','src_url':'hinterland_areas/kanuku/rupununi3d.geojson',},
				},
			}
		},
		'Urban Parks':{
			'html':"Urban Parks",
			'path':'Protected Areas Commission.Urban Parks',
			'center':[-58.17065, 6.79375],
			'bbox':[-58.2153, 6.7706, -58.1166, 6.8398],
			'photos':[window.DATA+'urbanparks/img/urban_parks.jpg',],
			'keys':['Guyana Zoo','Botanical Gardens','National Park','Joe Viera Park'],
			'layers':{
				'keys':['boundary2',],//'boundary','OpenStreetMap2','botanical_satellite',
				'OpenStreetMap2':{'type':'base','name':'OpenStreetMap2','layeridx':0,'opacity':1.0},
				'botanical_satellite':{'type':'xyz','src_url':'urbanparks/botanical/botanical_satellite/'},
				'national_satellite':{'type':'xyz','src_url':'urbanparks/national/national_satellite/'},
				'boundary':{'type':'polygon','src_url':'urbanparks/urbanparks_boundary.geojson','style':pac_style,},
				'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'urbanparks/urbanparks_boundary.geojson',},
			},
			'Guyana Zoo':{
				'html':"Guyana Zoo",
				'path':'Protected Areas Commission.Urban Parks.Guyana Zoo',
				'center':[-58.1463, 6.8073],
				'bbox':[-58.1491, 6.8057, -58.1439, 6.809],
				//'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[window.DATA+'urbanparks/zoo/img/zoo_entrance.jpg',],
				'keys':[],
				'layers':{
					'keys':['boundary2','zoo_pois','zoo_trail',],//'OpenStreetMap2','botanical_satellite',
					'OpenStreetMap2':{'type':'base','name':'OpenStreetMap2','layeridx':2,'opacity':1.0},
					'zoo_pois':{'type':'points','src_url':'urbanparks/zoo/zoo_pois.geojson'},
					'zoo_trail':{'type':'line','src_url':'urbanparks/zoo/zoo_trail.geojson'},
					'botanical_satellite':{'type':'xyz','src_url':'urbanparks/botanical/botanical_satellite/'},
					'boundary':{'type':'polygon','src_url':'urbanparks/zoo/zoo_boundary.geojson','style':pac_style,},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'urbanparks/zoo/zoo_boundary.geojson',},
				},
			},
			'Botanical Gardens':{
				'html':"Botanical Gardens",
				'path':'Protected Areas Commission.Urban Parks.Botanical Gardens',
				'center':[-58.143, 6.8055],
				'bbox':[-58.1512, 6.8018, -58.1374, 6.8094],
				'photos':[window.DATA+'urbanparks/botanical/img/botanical_aerial.jpg',],
				'keys':[],
				'layers':{
					'keys':['boundary2','botanical_satellite','botanical3d'],//'OpenStreetMap2',
					'OpenStreetMap2':{'type':'base','name':'OpenStreetMap2','layeridx':2,'opacity':1.0},
					'botanical_satellite':{'type':'xyz','src_url':'urbanparks/botanical/botanical_satellite/'},
					'boundary':{'type':'polygon','src_url':'urbanparks/botanical/botanical_boundary.geojson','style':pac_style,},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'urbanparks/botanical/botanical_boundary.geojson',},
					'botanical3d':{'type':'points','src_url':'urbanparks/botanical/botanical3d.geojson',},
				},
			},
			'National Park':{
				'html':"National Park<br><span style='font-size:0.8em'>Protected Areas Offices<span>",
				'path':'Protected Areas Commission.Urban Parks.National Park',
				'center':[-58.1509, 6.8215],
				'bbox':[-58.1551, 6.8194, -58.1478, 6.8241],
				'photos':[window.DATA+'urbanparks/national/img/national_park.png',],
				'keys':[],
				'layers':{
					'keys':['national_satellite','boundary2','track'],//'OpenStreetMap2',
					'OpenStreetMap2':{'type':'base','name':'OpenStreetMap2','layeridx':2,'opacity':1.0},
					'track':{'type':'gpx','src_url':'urbanparks/national/national_track.gpx'},
					'national_satellite':{'type':'xyz','src_url':'urbanparks/national/national_satellite/'},
					'boundary':{'type':'polygon','src_url':'urbanparks/national/national_boundary.geojson','style':pac_style,},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'urbanparks/national/national_boundary.geojson',},
				},
			},
			'Joe Viera Park':{
				'html':"Joe Viera Park",
				'path':'Protected Areas Commission.Urban Parks.Joe Viera Park',
				'center':[-58.1947, 6.7769],
				'bbox':[-58.1975, 6.7447, -58.1922, 6.7784],
				'photos':[window.DATA+'urbanparks/joeviera/img/joe_viera.png',],
				'keys':[],
				'layers':{
					'keys':['boundary2'],//'OpenStreetMap2'
					'OpenStreetMap2':{'type':'base','name':'OpenStreetMap2','layeridx':2,'opacity':1.0},
					'boundary':{'type':'polygon','src_url':'urbanparks/joeviera/joeviera_boundary.geojson','style':pac_style,},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'urbanparks/joeviera/joeviera_boundary.geojson',},
				},
			}
		},
		'Related Areas':{
			'html':"Related Areas",
			'path':'Protected Areas Commission.Related Areas',
			'center':[-58.96,2.99],
			'bbox':[-59.56666,1.17728,-58.36804,4.80849],
			//Konashens + Iwokrama (both) in related_boundary.geojson
			'photos':[window.STATIC+'img/place.jpg'],
			'keys':['Konashens','Iwokrama'],
			'layers':{
				'keys':['boundary2','guyana_boundary'],//'Satellite',
				'boundary':{'type':'polygon','src_url':'related_areas/related_boundary.geojson','style':pac_style,},
				'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'related_areas/related_boundary.geojson',},
				'Satellite':{'type':'base','name':'Satellite','layeridx':0,'opacity':0.8},
				'guyana_boundary':{'hilite':false,'type':'polygon','src_url':'guyana/guyana_boundary.geojson',},
			},
			'Konashens':{
				'html':"Konashens<br><span style='font-size:0.9em'>Community Owned & Managed</span>",
				'path':'Protected Areas Commission.Related Areas.Konashens',
				'center':[-58.96735,1.51319],
				'bbox':[-59.56666,1.17728,-58.36804,1.8491],
				'photos':[window.STATIC+'img/place.jpg',],
				'keys':[],
				'layers':{
					'keys':['boundary2','creeks','rivers'],//'guyana_pixelated','konashens_satellite',
					'rivers':{'hilite':false,'type':'polygon','src_url':'related_areas/konashens/konashens_rivers.geojson','style':river_style },
					'creeks':{'hilite':false,'type':'polygon','src_url':'related_areas/konashens/konashens_creeks.geojson','style':creek_style },
					'konashens_satellite':{'type':'xyz','src_url':'related_areas/konashens/konashens_satellite/'},
					'guyana_pixelated':{'type':'xyz','src_url':'guyana/guyana_pixelated/','layeridx':0,},
					'boundary':{'type':'polygon','src_url':'related_areas/konashens/konashens_boundary.geojson','style':pac_style,},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'related_areas/konashens/konashens_boundary.geojson',},
				},
			},
			'Iwokrama':{
				'html':"Iwokrama",
				'path':'Protected Areas Commission.Related Areas.Iwokrama',
				'center':[-58.881185,4.47368],
				'bbox':[-59.2709,4.13887,-58.49147,4.80849],
				'photos':[window.STATIC+'/img/place.jpg',],
				'keys':[],
				'layers':{
					'keys':['boundary','creeks','rivers',],//'guyana_pixelated',
					'rivers':{'hilite':false,'type':'polygon','src_url':'related_areas/iwokrama/iwokrama_rivers.geojson','style':river_style },
					'creeks':{'hilite':false,'type':'polygon','src_url':'related_areas/iwokrama/iwokrama_creeks.geojson','style':creek_style },
					'soil':{'type':'xyz','src_url':'related_areas/iwokrama/soil/'},
					'guyana_pixelated':{'type':'xyz','src_url':'guyana/guyana_pixelated/','layeridx':0,},
					'boundary':{'type':'polygon','src_url':'related_areas/iwokrama/iwokrama_boundary.geojson','style':pac_style,},
					'boundary2':{'hilite':false,'style':clear_pac,'type':'polygon','src_url':'related_areas/iwokrama/iwokrama_boundary.geojson',},
				},
			},

		}
	}
}
