var PACMap=function(){
	var me={};
	me.WebGL=false;
	me.lib3D=null;
	try{
		me.lib3D=new My3DStuff();
		me.lib3D.init3d();
		me.WebGL=true;
	}
	catch(e){}

	me.layers={'keys':[],};
	me.old_layers=null;

	me.goto=function(path){

		window.map.unhilite(null);

		if($("#controls").hasClass("portrait")){
			$("#controls").addClass("vhide");
		}

		me.old_layers=me.layers;
		console.log("removing last layer set: "+me.old_layers['keys'].length);
		while(me.old_layers['keys'].length>0){
			var key=me.old_layers['keys'].pop();
			window.map.map.removeLayer(me.old_layers[key]);
			delete me.old_layers[key];
			console.log("removed: "+key);
		}

		window.map.map.getLayers().forEach(function(a,b,c){
			window.map.map.removeLayer(a);
		});

		console.log("layers.keys: "+window.map.map.getLayerGroup().getKeys());
		console.log("layers.length: "+window.map.map.getLayers().getLength());
		window.map.map.getLayers().forEach(function(a,b,c){
			console.log(b+": "+a.get("title"));
		});


		me.old_layers=null;

		me.layers={'keys':[],};

		console.log("goto: "+path);

		var spath=path.split(".");

		window.Cfg=Config;
		for(var sidx=0;sidx<spath.length;sidx++){
			var skey=spath[sidx];
			console.log("sidx="+sidx+" skey="+skey);
			window.Cfg=window.Cfg[skey];
		}
/*
		console.log("ALWAYS CURRENT BOUNDARY:"+window.Cfg['path']);
		me.layers['keys'].push(window.Cfg['path']);
		me.layers[window.Cfg['path']]=window.map.add_polygon_layer(window.Cfg['layers']['boundary']);
*/
		pan_zoom(window.Cfg['center'],window.Cfg['bbox']);

		document.getElementById('img_controls_top').src=window.Cfg['photos'][0];
		console.log(window.Cfg['photos'][0]);

//		document.getElementById('title_controls_top').innerHTML=spath[spath.length-1];
		document.getElementById('title_controls_top').innerHTML=window.Cfg['html'];

		var h3=document.createElement("h3");
		h3.appendChild(document.createTextNode(spath[spath.length-1]));
		var p=document.getElementById("panel_controls_top");
		p.innerHTML="";
//		p.appendChild(h3);//NEED: show if in phone mode

		var t=document.createElement("table");
		t.className="nav_button_table";
		t.align="center";
		t.cellpadding="10";
		p.appendChild(t);
		var r0=t.insertRow(-1);
//		var r1=t.insertRow(-1);


		//BACK=UP
		if(spath.length>1){
			var d,l,s;

			d=document.createElement("div");
			d.className="ring";
			d.setAttribute("data-toggle","tooltip");
			d.setAttribute("data-placement","bottom");
			d.setAttribute("data-original-title","Previous");

			s=document.createElement("span");
			s.className="glyphicon glyphicon-arrow-left";
			d.appendChild(s);

			l=document.createElement("span");
			l.className="label label-default";
//			l.appendChild(document.createTextNode("Previous"));

			r0.insertCell(-1).appendChild(d);
//			r1.insertCell(-1).appendChild(l);

			d.addEventListener('click',function(e){
				console.log(e.target.id);
				var return_path="";
				for(var sidx=0;sidx<spath.length-1;sidx++){
					return_path+=spath[sidx];
					if(sidx<spath.length-2)return_path+=".";
				}
				try{me.lib3D.closeCB();}
				catch(e){console.log(e);}
				console.log("return_path: "+return_path);
				me.goto(return_path);
			});
		}


		//NEXT LEVEL DOWN
		for(var kidx=0;kidx<window.Cfg['keys'].length;kidx++){
			var key=Cfg['keys'][kidx];
			var d,l,s;

			d=document.createElement("div");
			d.className="ring";
			d.setAttribute("data-toggle","tooltip");
			d.setAttribute("data-placement","bottom");
			d.setAttribute("data-original-title",key);

			s=document.createElement("span");
			s.className="glyphicon glyphicon-arrow-right";
			s.id=key;
			d.appendChild(s);

			l=document.createElement("span");
			l.className="label label-default";
//			l.appendChild(document.createTextNode(key));

			r0.insertCell(-1).appendChild(d);
//			r1.insertCell(-1).appendChild(l);
//			p.appendChild(t);

			s.addEventListener('click',function(e){
				console.log(e.target.id);
				try{me.lib3D.closeCB();}
				catch(e){console.log(e);}
				me.goto(path+'.'+e.target.id);
			});


			//add boundary layer, mouseover button, mouseover feature
			console.log("HARD-CODED ADD BOUNDARY: "+key);
			me.layers['keys'].push(key);
			me.layers[key]=window.map.add_polygon_layer(window.Cfg[key]['layers']['boundary']);
			console.log(me.layers[key].getSource().getFeatures());


			s.addEventListener('mouseout',function(e){
				console.log("mouseout");
				window.map.unhilite();
			});

			s.addEventListener('mouseover',function(e){
				console.log('mouseover: '+e.target.id);
				console.log(me.layers['keys']);
				for(var kidx=0;kidx<me.layers['keys'].length;kidx++){
					var key=me.layers['keys'][kidx];
					console.log(key+": "+me.layers[key]);
				}
				console.log("e.target.id: "+e.target.id);
				window.map.hilite(e.target.id,me.layers[e.target.id]);
			});

			//remove parent layer assets now for smooth removal
			//also remove points now
		}

		try{

			console.log("adding layers");
			for(var lidx=0;lidx<window.Cfg['layers']['keys'].length;lidx++){
				var xkey=window.Cfg['layers']['keys'][lidx];
				var obj=window.Cfg['layers'][xkey];
				if(false){;}
				else if(obj.type=='base'){
						me.layers['keys'].push(obj['name']);
						var base_layer=window.map.add_base_layer(obj);
						me.layers[xkey]=base_layer;
				}
				else if(obj.type=='xyz'){
						var key=window.DATA+obj['src_url'];
						me.layers['keys'].push(xkey);
						me.layers[xkey]=window.map.add_xyz_layer(obj);
				}
				else if(obj.type=='polygon'){
						var key=window.DATA+obj['src_url'];
						me.layers['keys'].push(xkey);
						me.layers[xkey]=window.map.add_polygon_layer(obj);
				}
				else if(obj.type=='line'){
						console.log("loading line layer");
						var key=window.DATA+obj['src_url'];
						me.layers['keys'].push(xkey);
						me.layers[xkey]=window.map.add_line_layer(obj);
				}
				else if(obj.type=='points'){
						var key=window.DATA+obj['src_url'];
						me.layers['keys'].push(xkey);
						me.layers[xkey]=window.map.add_point_layer(obj);
				}
				else if(obj.type=='gpx'){
						console.log("GPX GPX GPX");
						var key=window.DATA+obj['src_url'];
						me.layers['keys'].push(xkey);
						me.layers[xkey]=window.map.add_gpx_layer(obj);
				}
			}


			console.log("layers.keys: "+window.map.map.getLayerGroup().getKeys());
			console.log("layers.length: "+window.map.map.getLayers().getLength());
			window.map.map.getLayers().forEach(function(a,b,c){
				console.log(b+": "+a.get("title"));
			});

			//Toggles:
			var tt=document.createElement("table");
			tt.className="toggle_table";
			tt.align="center";
			tt.cellpadding="10";
			p.appendChild(tt);
			var r1=tt.insertRow(-1);

			var toggles=window.Cfg['layers']['toggles'];
			for(var tidx=0;tidx<toggles.length;tidx++){
				console.log("TOGGLE "+toggles[tidx]['title']+": "+toggles[tidx]['layers']);
				var b=document.createElement("input");
				b.type="checkbox";
				b.title=toggles[tidx]['title'];
				b.checked=true;

				var img=new Image();
				img.src=window.STATIC+"img/checkbox-1.png";
				img.title=toggles[tidx]['title'];
				img.className="checkbox";
				img.value=true;
				var pyld=document.createElement("input");
				pyld.type="hidden";
				pyld.value=toggles[tidx]['layers'];
				img.appendChild(pyld);
				var c=r1.insertCell(-1);
				c.appendChild(img);
				img.addEventListener("click",me.toggleCB);
			}

		}catch(e){console.log(e);}

		$('[data-toggle="tooltip"]').tooltip();

	}
	me.toggleCB=function(e){

		console.log(me.layers['keys']);
		console.log(e.target.firstChild.value);

		var layers=e.target.firstChild.value.split(",");
		for(var lidx=0;lidx<layers.length;lidx++){
			console.log(lidx+": "+layers[lidx]+" "+me.layers[layers[lidx]]);

			if(e.target.value==true){
				me.layers[layers[lidx]].setOpacity(0);
			}
			else{
				me.layers[layers[lidx]].setOpacity(1);
			}
		}

		if(e.target.value==true){
			e.target.src=window.STATIC+"img/checkbox-0.png";
			e.target.value=false;
		}
		else{
			e.target.src=window.STATIC+"img/checkbox-1.png";
			e.target.value=true;
		}

	}
	return me;
}
