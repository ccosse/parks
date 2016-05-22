var PACMap=function(){
	var me={};
	me.layers={};
	me.goto=function(path){
		if($("#controls").hasClass("portrait")){
			$("#controls").addClass("vhide");
		}
		console.log("goto");
		console.log(path);

		var spath=path.split(".");
		console.log(spath);

		var Cfg=Config;
		for(var sidx=0;sidx<spath.length;sidx++){
			var skey=spath[sidx];
			console.log(skey);
			Cfg=Cfg[skey];
		}
		
		pan_zoom(Cfg['center'],Cfg['bbox']);

		document.getElementById('img_controls_top').src=Cfg['photos'][0];
		console.log(Cfg['photos'][0]);

		document.getElementById('title_controls_top').innerHTML=spath[spath.length-1];

		var h3=document.createElement("h3");
		h3.appendChild(document.createTextNode(spath[spath.length-1]));
		var p=document.getElementById("panel_controls_top");
		p.innerHTML="";
//		p.appendChild(h3);


		//BACK=UP
		var back=document.createElement("a");
			back.id="back";
			back.href="#";
			back.className="btn btn-warning btn-sm";
			back.role="button";
			back.text="previous";
			if(spath.length>1)p.appendChild(back);
			back.addEventListener('click',function(e){
				console.log(e.target.id);
				var return_path="";
				for(var sidx=0;sidx<spath.length-1;sidx++){
					return_path+=spath[sidx];
					if(sidx<spath.length-2)return_path+=".";
				}
				me.goto(return_path);
			});

		//NEXT LEVEL DOWN
		for(var kidx=0;kidx<Cfg['keys'].length;kidx++){
			var key=Cfg['keys'][kidx];
			var a=document.createElement("a");
			a.id=key;
			a.href="#";
			a.className="btn btn-success btn-sm";
			a.role="button";
			a.text=key;
			p.appendChild(a);

			a.addEventListener('click',function(e){
				console.log(e.target.id);
				me.goto(path+'.'+e.target.id);
			});
			console.log("created link: "+key);

			//add boundary layer, mouseover button, mouseover feature
			me.layers[key]=window.map.add_layer(Cfg[key]);
			a.addEventListener('mouseout',function(e){
				console.log("mouseout");
				window.map.unhilite();
			});

			a.addEventListener('mouseover',function(e){
				console.log(e.target.id);
				window.map.hilite(e.target.id,me.layers[e.target.id]);
			});

			//remove parent layer assets now for smooth removal

		}

	}
	return me;
}
