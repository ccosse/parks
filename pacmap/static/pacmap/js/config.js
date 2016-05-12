var CONFIG={
	'pac_location':[-57.7215, 6.7938],
	'timeout':5000,

	"keys":["Guyana","Shell Beach","Urban Parks","Kaieteur National Park","Iwokrama Protected Area","Kanuku Mountains","Konashens"],
	"Shell Beach":{
		"path":"./static/pacmap/data/shellbeach/",
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
		"path":"./static/pacmap/data/urbanparks/",
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
		"path":"./static/pacmap/data/kaieteur/",
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
		"path":"./static/pacmap/data/iwokrama/",
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
		"path":"./static/pacmap/data/kanuku/",
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
		"path":"./static/pacmap/data/konashens/",
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
		"path":"./static/pacmap/data/guyana/",
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
	
