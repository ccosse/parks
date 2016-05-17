var PACMap=function(){
	var me={};
	me.goto=function(path){
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

		document.getElementById('img_controls_top').src=Cfg['photos'][0];
		console.log(Cfg['photos'][0]);

		var h3=document.createElement("h3");
		h3.appendChild(document.createTextNode(path));

		var p=document.getElementById("panel_controls_top");
		p.innerHTML="";
		p.appendChild(h3);


		for(var kidx=0;kidx<Cfg['keys'].length;kidx++){
			var key=Cfg['keys'][kidx];
			var a=document.createElement("a");
			a.id=key;
			a.href="#";
			a.className="btn btn-default btn-lg";
			a.role="button";
			a.text=key;
			p.appendChild(a);
			a.addEventListener('click',function(e){
				console.log(e.target.id);
				me.goto(path+'.'+e.target.id);
			});
			console.log("created link: "+key);
		}

	}	
	return me;
}