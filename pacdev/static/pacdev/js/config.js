//PATH=/static/pacdev/data/
var STATIC="./static/pacdev/"
var DATA="./static/pacdev/data/";
var Config={
	'Protected Areas Commission':{
		'path':'Protected Areas Commission',
		'center':[-58.9,4.31],
		'bbox':[-61.5,1.1,-56.3,8.7],
		'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
		'hilite':new ol.style.Style({stroke: new ol.style.Stroke({color: 'gold',width: 4}),}),
		'photos':[STATIC+'img/pac_hq.jpg',],
		'keys':['Urban Parks','Hinterland Parks','Related Areas'],
		'layers':{
			'keys':[],
			'boundary':{'type':'polygon','src_url':'guyana/guyana_boundary.geojson','style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),},
		},

		'Hinterland Parks':{
			'path':'Protected Areas Commission.Hinterland Parks',
			'center':[-59.2514,5.5807],
			'bbox':[-60.4036,3.1817,-58.1107,8.6807],
			//boundary geojson needs 3 areas in 1 file for group hilite
			//according to convention of adding and removing layers based on
			//current navigation in this Config structure
			//'boundary':'/static/pacdev/geojson/hinterland_boundaries.geojson',
			'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),
			'hilite':new ol.style.Style({stroke: new ol.style.Stroke({color: '#FF4',width: 4}),}),
			'photos':[STATIC+'img/hinterland_areas.jpg',],
			'keys':['Kaieteur National Park','Shell Beach','Kanuku Mountains'],
			'layers':{
				'keys':[],
				'boundary':{'type':'polygon','src_url':'hinterland_areas/hinterland_boundaries.geojson','style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),},
			},
			'Kaieteur National Park':{
				'path':'Protected Areas Commission.Hinterland Parks.Kaieteur National Park',
				'center':[-59.50293, 5.175],
				'bbox':[-59.63383, 5.0468, -59.37203, 5.3032],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'img/kaieteur_falls.png',],
				'keys':[],
				'layers':{
					'keys':['satellite','boundary','trailmap','falls3d'],//
					'boundary':{'type':'polygon','src_url':'hinterland_areas/kaieteur/kaieteur_boundary.geojson',},
					'satellite':{'type':'xyz','src_url':'hinterland_areas/kaieteur/satellite/'},
					'trailmap':{'type':'xyz','src_url':'hinterland_areas/kaieteur/trailmap/','bbox':[-59.48,5.127,-59.43,5.21]},
					'falls3d':{'type':'points','src_url':'hinterland_areas/kaieteur/falls.geojson',},
				},
			},
			'Shell Beach':{
				'path':'Protected Areas Commission.Hinterland Parks.Shell Beach',
				'center':[-59.294995, 7.99126],
				'bbox':[-59.78492, 7.59982, -58.80507, 8.3827],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'img/shell_beach.jpg',],
				'keys':[],
				'layers':{
					'keys':['shellbeach_satellite','panorama1','panorama2','sinewave'],
					'boundary':{'type':'polygon','src_url':'hinterland_areas/shellbeach/shellbeach_boundary.geojson',},
					'shellbeach_satellite':{'type':'xyz','src_url':'hinterland_areas/shellbeach/shellbeach_satellite/'},
					'panorama1':{'type':'points','src_url':'hinterland_areas/shellbeach/beach.geojson',},
					'panorama2':{'type':'points','src_url':'hinterland_areas/shellbeach/shellbeach_panorama2.geojson',},
					'sinewave':{'type':'points','src_url':'hinterland_areas/shellbeach/sinewave.geojson',},
				},
			},
			'Kanuku Mountains':{
				'path':'Protected Areas Commission.Hinterland Parks.Kanuku Mountains',
				'center':[-59.105485, 3.2779],
				'bbox':[-59.62108, 2.89736, -58.58989, 3.65844],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'img/kanuku_mountains.png',],
				'keys':[],
				'layers':{
					'keys':['kanuku_satellite','boundary','kanuku_panorama','rupununi_panorama'],
					'boundary':{'type':'polygon','src_url':'hinterland_areas/kanuku/kanuku_boundary.geojson',},
					'kanuku_satellite':{'type':'xyz','src_url':'hinterland_areas/kanuku/kanuku_satellite/'},
					'kanuku_panorama':{'type':'points','src_url':'hinterland_areas/kanuku/kanuku3d.geojson',},
					'rupununi_panorama':{'type':'points','src_url':'hinterland_areas/kanuku/rupununi3d.geojson',},
				},
			}
		},
		'Urban Parks':{
			'path':'Protected Areas Commission.Urban Parks',
			'center':[-58.17065, 6.79375],
			'bbox':[-58.2153, 6.7706, -58.1166, 6.8398],
			'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),
			'hilite':new ol.style.Style({stroke: new ol.style.Stroke({color: 'gold',width: 4}),}),
			'photos':[STATIC+'img/urban_parks.jpg',],
			'keys':['Guyana Zoo','Botanical Gardens','National Park','Joe Viera Park'],
			'layers':{
				'keys':['botanical_satellite','national_satellite'],//'boundary',''
				'botanical_satellite':{'type':'xyz','src_url':'urbanparks/botanical/botanical_satellite/'},
				'national_satellite':{'type':'xyz','src_url':'urbanparks/national/national_satellite/'},
				'boundary':{'type':'polygon','src_url':'urbanparks/urbanparks_boundary.geojson','style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),},
			},
			'Guyana Zoo':{
				'path':'Protected Areas Commission.Urban Parks.Guyana Zoo',
				'center':[-58.1463, 6.8073],
				'bbox':[-58.1491, 6.8057, -58.1439, 6.809],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'img/zoo_entrance.jpg',],
				'keys':[],
				'layers':{
					'keys':['botanical_satellite',],
					'botanical_satellite':{'type':'xyz','src_url':'urbanparks/botanical/botanical_satellite/'},
					'boundary':{'type':'polygon','src_url':'urbanparks/zoo/zoo_boundary.geojson',},
				},
			},
			'Botanical Gardens':{
				'path':'Protected Areas Commission.Urban Parks.Botanical Gardens',
				'center':[-58.143, 6.8055],
				'bbox':[-58.1512, 6.8018, -58.1374, 6.8094],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'img/botanical_aerial.jpg',],
				'keys':[],
				'layers':{
					'keys':['botanical_satellite','botanical3d'],
					'botanical_satellite':{'type':'xyz','src_url':'urbanparks/botanical/botanical_satellite/'},
					'boundary':{'type':'polygon','src_url':'urbanparks/botanical/botanical_boundary.geojson',},
					'botanical3d':{'type':'points','src_url':'urbanparks/botanical/botanical3d.geojson',},
				},
			},
			'National Park':{
				'path':'Protected Areas Commission.Urban Parks.National Park',
				'center':[-58.1509, 6.8215],
				'bbox':[-58.1551, 6.8194, -58.1478, 6.8241],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'img/national_park.png',],
				'keys':[],
				'layers':{
					'keys':['national_satellite',],
					'national_satellite':{'type':'xyz','src_url':'urbanparks/national/national_satellite/'},
					'boundary':{'type':'polygon','src_url':'urbanparks/national/national_boundary.geojson',},
				},
			},
			'Joe Viera Park':{
				'path':'Protected Areas Commission.Urban Parks.Joe Viera Park',
				'center':[-58.1947, 6.7769],
				'bbox':[-58.1975, 6.7447, -58.1922, 6.7784],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'img/joe_viera.png',],
				'keys':[],
				'layers':{
					'keys':[],
					'boundary':{'type':'polygon','src_url':'urbanparks/joeviera/joeviera_boundary.geojson',},
				},
			}
		},
		'Related Areas':{
			'path':'Protected Areas Commission.Related Areas',
			'center':[-58.96,2.99],
			'bbox':[-59.56666,1.17728,-58.36804,4.80849],
			//Konashens + Iwokrama (both) in related_boundary.geojson

			'hilite':new ol.style.Style({stroke: new ol.style.Stroke({color: 'gold',width: 4}),}),
			'photos':[STATIC+'img/place.jpg'],
			'keys':['Konashens','Iwokrama'],
			'layers':{
				'keys':[],
				'boundary':{'type':'polygon','src_url':'related_areas/related_boundary.geojson','style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),fill: new ol.style.Fill({color: 'rgba(0,200,0,0.1)'}),}),},
			},
			'Konashens':{
				'path':'Protected Areas Commission.Related Areas.Konashens',
				'center':[-58.96735,1.51319],
				'bbox':[-59.56666,1.17728,-58.36804,1.8491],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'img/place.jpg',],
				'keys':[],
				'layers':{
					'keys':['konashens_satellite'],
					'konashens_satellite':{'type':'xyz','src_url':'related_areas/konashens/konashens_satellite/'},
					'boundary':{'type':'polygon','src_url':'related_areas/konashens/konashens_boundary.geojson',},
				},
			},
			'Iwokrama':{
				'path':'Protected Areas Commission.Related Areas.Iwokrama',
				'center':[-58.881185,4.47368],
				'bbox':[-59.2709,4.13887,-58.49147,4.80849],
				'style':new ol.style.Style({stroke: new ol.style.Stroke({color: '#83ad35',width: 2}),}),
				'photos':[STATIC+'/img/place.jpg',],
				'keys':[],
				'layers':{
					'keys':['soil'],
					'soil':{'type':'xyz','src_url':'related_areas/iwokrama/soil/'},
					'boundary':{'type':'polygon','src_url':'related_areas/iwokrama/iwokrama_boundary.geojson',},
				},
			},

		}
	}
}
