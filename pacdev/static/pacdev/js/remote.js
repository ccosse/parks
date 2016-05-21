/*
var RemotePanel = function(){
    var element           = document.getElementById('remotecontroldiv');

    var options_div       = createDIV();
    options_div.className = "options";

    var options = [ {} ];

    options.forEach(function(){
      var item        = createDIV();
      item.className  = "option";
      item.onclick    = function(){ window.ControlPanel.setActivePanel() };

      // icon
      var icon        = createSPAN();
      icon.style      = "background-image: url(./static/pacmap/img/layer.png);";

      // tooltip
      var tooltip       = createDIV();
      tooltip.className = 'tooltip';
      tooltip.innerText = 'Layers';

      item.appendChild(icon);
      item.appendChild(tooltip);

      options_div.appendChild(item);
    });

    element.appendChild(options_div);

    // API
    return {};
}
*/

var RemotePanel=function(static_path){

	var me={};
	me.static_path=static_path
	me.buttons=[];
	me.media_showing=true;
	
	me.show_media=function(e){
		if(me.media_showing){
			console.log("show_media hiding");
			$("#mediapaneldiv").css("left",(window.innerWidth));
			me.media_showing=false;
		}
		else{
			console.log("show_media showing");
			$("#mediapaneldiv").css("left",(window.innerWidth-250));
			me.media_showing=true;
		}
	}
	
	var buttons_div=document.createElement("div");
	var element=document.getElementById('remotecontroldiv');
	for(var idx=0;idx<5;idx++){
		var icondiv=document.createElement("div");
		icondiv.className="remoteicondiv";
		var icon=new Image();
		icon.src=me.static_path+'/lanwatch/img/layer.png';
		icon.className='remoteicon';
		icondiv.appendChild(icon);
		buttons_div.appendChild(icondiv);
		if(idx==0){
			icondiv.addEventListener("click",function(e){
				console.log("click");
				$("#controlpaneldiv").toggleClass("show");
			});
		}
		/*
		else if(idx==1)
			icondiv.addEventListener("click",me.show_media);
		else if(idx==3)
			icondiv.addEventListener("click",PACMap.show_hide_guyana);
		else if(idx==4){
			icondiv.addEventListener("click",pan_zoom_home);
		}
		*/
	}
	element.appendChild(buttons_div);
	console.log("RemotePanel Done");
	return me;
}
