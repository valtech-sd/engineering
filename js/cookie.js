function setCookie(e) {
	if(e === 'true'){
     // var d = new Date();
      //d.setTime(d.getTime() + (exdays*24000*60*60*1000));
      //var expires = "expires="+d.toUTCString();
      document.cookie = "valtech_accept" + "=" + e + "; " + "expires= 03 Dec 2099 23:59:00";  
	}
	 document.getElementById("cookiewrapper").style.display = "none";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookies() {  
  var c = getCookie('valtech_accept');
  if(c){	 
	  document.getElementById("cookiewrapper").style.display = "none";
  }
}