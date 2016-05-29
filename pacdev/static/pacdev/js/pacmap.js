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

	me.goto=function(path){

		if($("#controls").hasClass("portrait")){
			$("#controls").addClass("vhide");
		}

		console.log("removing last layer set ...");
		while(me.layers['keys'].length>0){
			var key=me.layers['keys'].pop();
			window.map.map.removeLayer(me.layers[key]);
			delete me.layers[key];
			console.log("removed: "+key);
		}

		console.log("goto");
		console.log(path);

		var spath=path.split(".");
		console.log(spath);

		window.Cfg=Config;
		for(var sidx=0;sidx<spath.length;sidx++){
			var skey=spath[sidx];
			console.log("sidx="+sidx+" skey="+skey);
			window.Cfg=window.Cfg[skey];
		}
		console.log("PATH:"+window.Cfg['path']);

		pan_zoom(window.Cfg['center'],window.Cfg['bbox']);

		document.getElementById('img_controls_top').src=window.Cfg['photos'][0];
		console.log(window.Cfg['photos'][0]);

		document.getElementById('title_controls_top').innerHTML=spath[spath.length-1];

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
				me.goto(path+'.'+e.target.id);
			});

			//add boundary layer, mouseover button, mouseover feature
			me.layers['keys'].push(key);
			me.layers[key]=window.map.add_layer(window.Cfg[key]);

			s.addEventListener('mouseout',function(e){
				console.log("mouseout");
				window.map.unhilite();
			});

			s.addEventListener('mouseover',function(e){
				console.log('mouseover: '+e.target.id);
				window.map.hilite(e.target.id,me.layers[e.target.id]);
			});

			//remove parent layer assets now for smooth removal
			//also remove points now
		}

		for(var pidx=0;pidx<window.Cfg['points'].length;pidx++){
			var point_filename=window.Cfg['points'][pidx];
			console.log(point_filename);
			me.layers['keys'].push(point_filename);
			me.layers[point_filename]=window.map.add_point(point_filename);
		}
		$('[data-toggle="tooltip"]').tooltip();
	}
	return me;
}
