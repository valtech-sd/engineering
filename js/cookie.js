function setCookie(e) {
	if(e === 'true'){
      var d = new Date();     
      d.setFullYear(d.getFullYear() + 2);
      var expires = "expires="+d.toUTCString();
      document.cookie = "V_Innovation_accept" + "=" + e + "; " + expires;  
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
  var c = getCookie('V_Innovation_accept');
  if(c){	 
	  document.getElementById("cookiewrapper").style.display = "none";
  }
}