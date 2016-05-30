var Config={
	'Protected Areas Commission':{
		'path':'Protected Areas Commission',
		'center':[-58.9,4.31],
		'bbox':[-61.5,1.1,-56.3,8.7],
		'boundary':'/static/pacdev/geojson/guyana_boundary.geojson',
		'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
		'hilite':new ol.style.Style({stroke: new ol.style.Stroke({color: 'gold',width: 4}),}),
		'photos':['/static/pacdev/img/pac_hq.jpg',],
		'keys':['Urban Parks','Hinterland Parks','Related Areas'],
		'layers':{
			'keys':['boundary',],
			'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/guyana_boundary.geojson',},
		},

		'Hinterland Parks':{
			'path':'Protected Areas Commission.Hinterland Parks',
			'center':[-59.2514,5.5807],
			'bbox':[-60.4036,3.1817,-58.1107,8.6807],
			//boundary geojson needs 3 areas in 1 file for group hilite
			//according to convention of adding and removing layers based on
			//current navigation in this Config structure
			'boundary':'/static/pacdev/geojson/hinterland_boundaries.geojson',
			'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),
			'hilite':new ol.style.Style({stroke: new ol.style.Stroke({color: '#FF4',width: 4}),}),
			'photos':['/static/pacdev/img/hinterland_areas.jpg',],
			'keys':['Kaieteur National Park','Shell Beach','Kanuku Mountains'],
			'layers':{
				'keys':['boundary',],
				'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/hinterland_boundaries.geojson',},
			},
			'Kaieteur National Park':{
				'path':'Protected Areas Commission.Hinterland Parks.Kaieteur National Park',
				'center':[-59.50293, 5.175],
				'bbox':[-59.63383, 5.0468, -59.37203, 5.3032],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/kaieteur_falls.png',],
				'keys':[],
				'layers':{
					'keys':['guyana_pixelated','satellite','boundary','trailmap','falls3d',],
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/kaieteur_boundary.geojson',},
					'guyana_pixelated':{'type':'xyz','src_url':'/static/pacdev/data/guyana/guyana_pixelated/',},
					'satellite':{'type':'xyz','src_url':'/static/pacdev/data/kaieteur/satellite/'},
					'trailmap':{'type':'xyz','src_url':'/static/pacdev/data/kaieteur/trailmap/'},
					'falls3d':{'type':'points','src_url':'/static/pacdev/geojson/falls.geojson'},
				},
			},
			'Shell Beach':{
				'path':'Protected Areas Commission.Hinterland Parks.Shell Beach',
				'center':[-59.294995, 7.99126],
				'bbox':[-59.78492, 7.59982, -58.80507, 8.3827],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/shell_beach.jpg',],
				'keys':[],
				'layers':{
					'keys':['guyana_pixelated','shellbeach_satellite','boundary','panorama1','panorama2'],
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/shellbeach_boundary.geojson',},
					'guyana_pixelated':{'type':'xyz','src_url':'/static/pacdev/data/guyana/guyana_pixelated/',},
					'shellbeach_satellite':{'type':'xyz','src_url':'/static/pacdev/data/shellbeach/shellbeach_satellite/'},
					'panorama1':{'type':'points','src_url':'/static/pacdev/data/shellbeach/beach.geojson'},
					'panorama2':{'type':'points','src_url':'/static/pacdev/data/shellbeach/shellbeach_panorama2.geojson'},
				},
			},
			'Kanuku Mountains':{
				'path':'Protected Areas Commission.Hinterland Parks.Kanuku Mountains',
				'center':[-59.105485, 3.2779],
				'bbox':[-59.62108, 2.89736, -58.58989, 3.65844],
				'boundary':'/static/pacdev/geojson/kanuku_boundary.geojson',
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/kanuku_mountains.png',],
				'keys':[],
				'layers':{
					'keys':['guyana_pixelated','kanuku_satellite','boundary','kanuku_panorama'],
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/kanuku_boundary.geojson',},
					'guyana_pixelated':{'type':'xyz','src_url':'/static/pacdev/data/guyana/guyana_pixelated/',},
					'kanuku_satellite':{'type':'xyz','src_url':'/static/pacdev/data/kanuku/kanuku_satellite/'},
					'kanuku_panorama':{'type':'points','src_url':'/static/pacdev/data/kanuku3d.geojson'},
				},
			}
		},
		'Urban Parks':{
			'path':'Protected Areas Commission.Urban Parks',
			'center':[-58.17065, 6.79375],
			'bbox':[-58.2153, 6.7706, -58.1166, 6.8398],
			'boundary':'/static/pacdev/geojson/urbanparks_boundary.geojson',
			'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),
			'hilite':new ol.style.Style({stroke: new ol.style.Stroke({color: 'gold',width: 4}),}),
			'photos':['/static/pacdev/img/urban_parks.jpg',],
			'keys':['Guyana Zoo','Botanical Gardens','National Park','Joe Viera Park'],
			'layers':{
				'keys':['boundary',],
				'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/urbanparks_boundary.geojson',},
			},
			'Guyana Zoo':{
				'path':'Protected Areas Commission.Urban Parks.Guyana Zoo',
				'center':[-58.1463, 6.8073],
				'bbox':[-58.1491, 6.8057, -58.1439, 6.809],
				'boundary':'/static/pacdev/geojson/zoo_boundary.geojson',
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/zoo_entrance.jpg',],
				'keys':[],
				'layers':{
					'keys':['botanical_satellite','boundary',],
					'botanical_satellite':{'type':'xyz','src_url':'/static/pacdev/data/urbanparks/botanical_satellite/'},
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/zoo_boundary.geojson',},
				},
			},
			'Botanical Gardens':{
				'path':'Protected Areas Commission.Urban Parks.Botanical Gardens',
				'center':[-58.143, 6.8055],
				'bbox':[-58.1512, 6.8018, -58.1374, 6.8094],
				'boundary':'/static/pacdev/geojson/botanical_boundary.geojson',
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/botanical_aerial.jpg',],
				'keys':[],
				'layers':{
					'keys':['botanical_satellite','boundary','botanical3d'],
					'botanical_satellite':{'type':'xyz','src_url':'/static/pacdev/data/urbanparks/botanical_satellite/'},
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/botanical_boundary.geojson',},
					'botanical3d':{'type':'points','src_url':'/static/pacdev/data/urbanparks/botanical.geojson'},
				},
			},
			'National Park':{
				'path':'Protected Areas Commission.Urban Parks.National Park',
				'center':[-58.1509, 6.8215],
				'bbox':[-58.1551, 6.8194, -58.1478, 6.8241],
				'boundary':'/static/pacdev/geojson/national_boundary.geojson',
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/national_park.png',],
				'keys':[],
				'layers':{
					'keys':['national_satellite','boundary',],
					'national_satellite':{'type':'xyz','src_url':'/static/pacdev/data/urbanparks/national_satellite/'},
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/national_boundary.geojson',},
				},
			},
			'Joe Viera Park':{
				'path':'Protected Areas Commission.Urban Parks.Joe Viera Park',
				'center':[-58.1947, 6.7769],
				'bbox':[-58.1975, 6.7447, -58.1922, 6.7784],
				'boundary':'/static/pacdev/geojson/joeviera_boundary.geojson',
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/joe_viera.png',],
				'keys':[],
				'layers':{
					'keys':['boundary',],
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/joeviera_boundary.geojson',},
				},
			}
		},
		'Related Areas':{
			'path':'Protected Areas Commission.Related Areas',
			'center':[-58.96,2.99],
			'bbox':[-59.56666,1.17728,-58.36804,4.80849],
			//Konashens + Iwokrama (both) in related_boundary.geojson
			'boundary':'/static/pacdev/geojson/related_boundary.geojson',
			'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),
			'hilite':new ol.style.Style({stroke: new ol.style.Stroke({color: 'gold',width: 4}),}),
			'photos':['/static/pacdev/img/place.jpg'],
			'keys':['Konashens','Iwokrama'],
			'layers':{
				'keys':['boundary',],
				'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/related_boundary.geojson',},
			},
			'Konashens':{
				'path':'Protected Areas Commission.Related Areas.Konashens',
				'center':[-58.96735,1.51319],
				'bbox':[-59.56666,1.17728,-58.36804,1.8491],
				'boundary':'/static/pacdev/geojson/konashens_boundary.geojson',
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/place.jpg',],
				'keys':[],
				'layers':{
					'keys':['konashens_satellite','boundary',],
					'konashens_satellite':{'type':'xyz','src_url':'/static/pacdev/data/konashens/konashens_satellite/'},
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/konashens_boundary.geojson',},
				},
			},
			'Iwokrama':{
				'path':'Protected Areas Commission.Related Areas.Iwokrama',
				'center':[-58.881185,4.47368],
				'bbox':[-59.2709,4.13887,-58.49147,4.80849],
				'boundary':'/static/pacdev/geojson/iwokrama_boundary.geojson',
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':['/static/pacdev/img/place.jpg',],
				'keys':[],
				'layers':{
					'keys':['soil','boundary',],
					'soil':{'type':'xyz','src_url':'/static/pacdev/data/iwokrama/soil/'},
					'boundary':{'type':'polygon','src_url':'/static/pacdev/geojson/iwokrama_boundary.geojson',},
				},
			},

		}
	}
}


/*

				'photos':{},
				'videos':{},
				'threeD':{},
				'point_sources':[],
				'polygon_sources':[],
				'xyz_sources':[],
				'gpx_sources':[],


var CONFIG={
	'pac_location':[-57.7215, 6.7938],
	'timeout':5000,

	"keys":["Guyana","Shell Beach","Urban Parks","Kaieteur National Park","Iwokrama Protected Area","Kanuku Mountains","Konashens"],
	"Shell Beach":{
		"path":"./static/pacdev/data/shellbeach/",
		"filename":"shellbeach.geojson",
		"bbox":[-59.78492, 7.59982, -58.80507, 8.3827],
		"center":[-59.294995, 7.99126],
		"color":"#0a0",
		"fill":"rgba(0,200,0,0.1)",
		"width":2,
		"polygon_sources":[],
		"point_sources":[
			{"filename":"shellbeach_panorama2.geojson","layer_type":"Launch3D","mediapath":['shellbeach','shellbeach_panorama2'],"color":"rgba(255,0,0,1)","fill":'rgba(255,255,255,1)','width':2,'radius':3,"category":"Shell Beach", "layer_name":'Shell Beach Panorama2'},
			{"filename":"beach.geojson","layer_type":"Launch3D","mediapath":['shellbeach','shellbeach_panorama'],"color":"rgba(255,0,0,1)","fill":'rgba(255,255,255,1)','width':2,'radius':3,"category":"Shell Beach", "layer_name":'Beach 3D'}
		],
		"line_sources":[],
		"xyz_layers":{
			'keys':['shellbeach_satellite'],//'shellbeach_pixelated',
		}
	},
	"Urban Parks":{
		"path":"./static/pacdev/data/urbanparks/",
		"filename":"urbanparks.geojson",
//		"bbox":[-58.6198, 6.3446, -57.7215, 7.2429],
		"bbox":[-58.2153, 6.7706, -58.1166, 6.8398],
		"center":[-58.17065, 6.79375],
		"color":"#0a0",
		"fill":"rgba(0,200,0,0.1)",
		"width":2,
		"polygon_sources":[],
		"point_sources":[
			{"filename":"botanical.geojson","layer_type":"Launch3D","mediapath":['urbanparks','botanical3d'],"color":"rgba(255,0,0,1)","fill":'rgba(255,255,255,1)','width':2,'radius':3,"category":"Botanical Gardens", "layer_name":'Botanical Gardens 3D'},
		],
		"line_sources":[],
		"xyz_layers":{
			'keys':['national_satellite','botanical_satellite'],
		}
	},
	"Kaieteur National Park":{
		"path":"./static/pacdev/data/kaieteur/",
		"filename":"kaieteur.geojson",
		"bbox":[-59.63383, 5.0468, -59.37203, 5.3032],
		"center":[-59.50293, 5.175],
		"color":"#0a0",
		"fill":"rgba(0,200,0,0.1)",
		"width":2,
		"polygon_sources":[],
		"point_sources":[
			{"filename":"falls.geojson","layer_type":"Launch3D","mediapath":['kaieteur','falls3d'],"color":"rgba(255,0,0,1)","fill":'rgba(255,255,255,1)','width':2,'radius':3,"category":"Kaieteur National Park", "layer_name":'Falls 3D'},
		],
		"line_sources":[],
		"xyz_layers":{
			'keys':['satellite','trailmap'],//'satellite2','kaieteur_pixelated',
		}
	},
	"Iwokrama Protected Area":{
		"path":"./static/pacdev/data/iwokrama/",
		"filename":"iwokrama.geojson",
		"bbox":[-59.2709, 4.13887, -58.49147, 4.80849],
		"center":[-58.881185, 4.47368],
		"color":"#0a0",
		"fill":"rgba(0,200,0,0.1)",
		"width":2,
		"polygon_sources":[],
		"point_sources":[],
		"line_sources":[],
		"xyz_layers":{
			'keys':['soil'],//'iwokrama_pixelated',
		}
	},
	"Kanuku Mountains":{
		"path":"./static/pacdev/data/kanuku/",
		"filename":"kanuku.geojson",
		"bbox":[-59.62108, 2.89736, -58.58989, 3.65844],
		//"bbox":[-60.62108, 1.89736, -57.58989, 4.65844],
		"center":[-59.105485, 3.2779],
		"color":"#0a0",
		"fill":"rgba(0,200,0,0.1)",
		"width":2,
		"polygon_sources":[],
		"point_sources":[
			{"filename":"kanuku3d.geojson","layer_type":"Launch3D","mediapath":['kanuku','kanuku_panorama'],"color":"rgba(255,0,0,1)","fill":'rgba(255,255,255,1)','width':2,'radius':3,"category":"Kanuku Mountains", "layer_name":'Kanuku 3D'},
			{"filename":"rupununi3d.geojson","layer_type":"Launch3D","mediapath":['kanuku','rupununi_panorama'],"color":"rgba(255,0,0,1)","fill":'rgba(255,255,255,1)','width':2,'radius':3,"category":"Rupununi Savanah", "layer_name":'Rupununi 3D'},
		],
		"line_sources":[],
		"xyz_layers":{
			'keys':['kanuku_satellite'],//'kanuku_pixelated',
		}
	},
	"Konashens":{
		"path":"./static/pacdev/data/konashens/",
		"filename":"konashens.geojson",
		"bbox":[-59.56666, 1.17728, -58.36804, 1.8491],
		"center":[-58.96735, 1.51319],
		"color":"#0a0",
		"fill":"rgba(0,200,0,0.1)",
		"width":2,
		"polygon_sources":[],
		"point_sources":[],
		"line_sources":[],
		"xyz_layers":{
			'keys':['konashens_satellite'],//'konashens_pixelated',
		}
	},
	"Guyana":{
		"path":"./static/pacdev/data/guyana/",
		"filename":"guyana.geojson",
		"bbox":[-61.5,1.1,-56.3,8.7],
		"center":[-58.9,4.9],
		"color":"rgba(255,255,0,1)",
		"fill":"rgba(0,0,0,0)",
		"width":2,
		"polygon_sources":[],
		"point_sources":[],
		"line_sources":[],
		"xyz_layers":{
			'keys':['guyana_pixelated'],
		}
	},
}

*/
