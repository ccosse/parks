var My3DStuff=function(){
	var me={};
	me.camera=null;
	me.scene=null;
	me.renderer=null;
	me.geometry=null;
	me.material=null;
	me.mesh=null;
	me.target = new THREE.Vector3();

	me.lon = 90;
	me.lat = 0;
	me.phi = 0;
	me.theta = 0;

	me.touchX=null;
	me.touchY=null;

	me.RUNNING=false;
	var NOSERVER=false;

	me.hires_div=document.createElement("div");
	me.hires_div.id="hires_div";
	me.hires_div.className="hires_div";
	var xB=new Image();
	if(NOSERVER)xB.src="./static/pacmap/img/close.png";
	else xB.src="/static/pacmap/img/close.png";
	xB.className="xBicon";
	xB.id="xB";
	me.xB=xB;
	var xBdiv=document.createElement("div");
	xBdiv.className="xBdiv";
	xBdiv.appendChild(xB);
	me.hires_div.appendChild(xBdiv);

	me.start=function(mediapath){

		console.log("Starting 3D viewer:" + mediapath);

		me.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

		me.scene = new THREE.Scene();

		var sides = [
			{
				url: '/static/pacmap/data/'+mediapath[1]+'/'+mediapath[2]+'/negx.png',
				position: [ -512, 0, 0 ],
				rotation: [ 0, Math.PI / 2, 0 ]
			},
			{
				url: '/static/pacmap/data/'+mediapath[1]+'/'+mediapath[2]+'/posx.png',
				position: [ 512, 0, 0 ],
				rotation: [ 0, -Math.PI / 2, 0 ]
			},
			{
				url: '/static/pacmap/data/'+mediapath[1]+'/'+mediapath[2]+'/posy.png',
				position: [ 0,  512, 0 ],
				rotation: [ Math.PI / 2, 0, Math.PI ]
			},
			{
				url: '/static/pacmap/data/'+mediapath[1]+'/'+mediapath[2]+'/negy.png',
				position: [ 0, -512, 0 ],
				rotation: [ - Math.PI / 2, 0, Math.PI ]
			},
			{
				url: '/static/pacmap/data/'+mediapath[1]+'/'+mediapath[2]+'/posz.png',
				position: [ 0, 0,  512 ],
				rotation: [ 0, Math.PI, 0 ]
			},
			{
				url: '/static/pacmap/data/'+mediapath[1]+'/'+mediapath[2]+'/negz.png',
				position: [ 0, 0, -512 ],
				rotation: [ 0, 0, 0 ]
			}
		];

		for ( var i = 0; i < sides.length; i ++ ) {

			var side = sides[ i ];

			var element = document.createElement( 'img' );
			element.width = 1026; // 2 pixels extra to close the gap.
			element.src = side.url;

			var object = new THREE.CSS3DObject( element );
			object.position.fromArray( side.position );
			object.rotation.fromArray( side.rotation );
			me.scene.add( object );

		}





		var nav_bcr=document.getElementById("le_nav").getBoundingClientRect();
		me.renderer.setSize( window.innerWidth, (window.innerHeight-nav_bcr.height) );

		document.body.appendChild(me.hires_div);

		$("#hires_div").css("top",window.innerHeight/2);
		$("#hires_div").css("left",window.innerWidth/2);
		$("#hires_div").animate(
			{
				left:0,
				width:window.innerWidth,
				top:nav_bcr.height,
				height:(window.innerHeight-nav_bcr.height),
				opacity:1.,
			},1000
		);

		me.RUNNING=true;
		me.animate3d();

		console.log("done with start");

	}

	me.closeCB=function(){
		console.log("stopping 3D viewer");

		$("#hires_div").animate(
			{
				left:window.innerWidth/2,
				width:0,
				top:window.innerHeight/2,
				height:0,
				opacity:0.,
			},1000,function(){
				document.body.removeChild(me.hires_div);
				me.RUNNING=false;
			}
		);
	}

	me.init3d=function(){
		console.log("init3d");
/*
		me.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

		me.scene = new THREE.Scene();

		var sides = [
			{
				url: './static/pacmap/data/kaieteur/falls3d/negx.png',
				position: [ -512, 0, 0 ],
				rotation: [ 0, Math.PI / 2, 0 ]
			},
			{
				url: './static/pacmap/data/kaieteur/falls3d/posx.png',
				position: [ 512, 0, 0 ],
				rotation: [ 0, -Math.PI / 2, 0 ]
			},
			{
				url: './static/pacmap/data/kaieteur/falls3d/posy.png',
				position: [ 0,  512, 0 ],
				rotation: [ Math.PI / 2, 0, Math.PI ]
			},
			{
				url: './static/pacmap/data/kaieteur/falls3d/negy.png',
				position: [ 0, -512, 0 ],
				rotation: [ - Math.PI / 2, 0, Math.PI ]
			},
			{
				url: './static/pacmap/data/kaieteur/falls3d/posz.png',
				position: [ 0, 0,  512 ],
				rotation: [ 0, Math.PI, 0 ]
			},
			{
				url: './static/pacmap/data/kaieteur/falls3d/negz.png',
				position: [ 0, 0, -512 ],
				rotation: [ 0, 0, 0 ]
			}
		];

		for ( var i = 0; i < sides.length; i ++ ) {

			var side = sides[ i ];

			var element = document.createElement( 'img' );
			element.width = 1026; // 2 pixels extra to close the gap.
			element.src = side.url;

			var object = new THREE.CSS3DObject( element );
			object.position.fromArray( side.position );
			object.rotation.fromArray( side.rotation );
			me.scene.add( object );

		}
*/
		me.renderer = new THREE.CSS3DRenderer();
		me.hires_div.appendChild(me.renderer.domElement);
		me.addListeners();

	}
	me.removeListeners=function(){
		/*
		document.removeEventListener( 'mousedown', me.onDocumentMouseDown, false );
		document.removeEventListener( 'mousewheel', me.onDocumentMouseWheel, false );

		document.removeEventListener( 'touchstart', me.onDocumentTouchStart, false );
		document.removeEventListener( 'touchmove', me.onDocumentTouchMove, false );

		window.removeEventListener( 'resize', me.onWindowResize, false );
		*/
	}
	me.addListeners=function(){

		me.hires_div.addEventListener( 'mousedown', me.onDocumentMouseDown, false );
		me.hires_div.addEventListener( 'mousewheel', me.onDocumentMouseWheel, false );

		//me.hires_div.addEventListener( 'click', me.closeCB, false );
		me.xB.addEventListener( 'click', me.closeCB, false );

		/*
		me.hires_div.addEventListener( 'touchstart', me.onDocumentTouchStart, false );
		me.hires_div.addEventListener( 'touchmove', me.onDocumentTouchMove, false );
		*/
		//window.addEventListener( 'resize', me.onWindowResize, false );
		/*

		*/
	}

	me.onWindowResize=function(){

		me.camera.aspect = window.innerWidth / window.innerHeight;
		me.camera.updateProjectionMatrix();

		//me.renderer.setSize( window.innerWidth, window.innerHeight );
		var nav_bcr=document.getElementById("navbar_div").getBoundingClientRect();
		me.renderer.setSize( window.innerWidth, (window.innerHeight-nav_bcr.height) );

	}

	me.onDocumentMouseDown=function( event ){

		event.preventDefault();

		document.addEventListener( 'mousemove', me.onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', me.onDocumentMouseUp, false );

	}

	me.onDocumentMouseMove=function( event ){

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		me.lon -= movementX * 0.1;
		me.lat += movementY * 0.1;

	}

	me.onDocumentMouseUp=function( event ){

		document.removeEventListener( 'mousemove', me.onDocumentMouseMove );
		document.removeEventListener( 'mouseup', me.onDocumentMouseUp );

	}

	me.onDocumentMouseWheel=function( event ){

		me.camera.fov -= event.wheelDeltaY * 0.05;
		me.camera.updateProjectionMatrix();

	}

	me.onDocumentTouchStart=function( event ){

		event.preventDefault();

		var touch = event.touches[ 0 ];

		me.touchX = touch.screenX;
		me.touchY = touch.screenY;

	}

	me.onDocumentTouchMove=function( event ){

		event.preventDefault();

		var touch = event.touches[ 0 ];

		me.lon -= ( touch.screenX - touchX ) * 0.1;
		me.lat += ( touch.screenY - touchY ) * 0.1;

		me.touchX = touch.screenX;
		me.touchY = touch.screenY;

	}

	me.animate3d=function(){

		if(me.RUNNING==false)return;

		requestAnimationFrame( me.animate3d );

		me.lon +=  0.1;
		me.lat = Math.max( - 85, Math.min( 85, me.lat ) );
		me.phi = THREE.Math.degToRad( 90 - me.lat );
		me.theta = THREE.Math.degToRad( me.lon );

		me.target.x = Math.sin( me.phi ) * Math.cos( me.theta );
		me.target.y = Math.cos( me.phi );
		me.target.z = Math.sin( me.phi ) * Math.sin( me.theta );

		me.camera.lookAt( me.target );

		me.renderer.render( me.scene, me.camera );

	}

	return me;

}
