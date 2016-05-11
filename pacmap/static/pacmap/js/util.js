function decode(str) {
  var div 	= document.createElement('div'); 
  div.innerHTML	= str ;
  
  var decoded=str;
  try{
  	decoded = div.firstChild.nodeValue; 
  }
  catch(e){;}
  return decoded;
}
get_basename=function(path){
	return path.split('/').reverse()[0];
}