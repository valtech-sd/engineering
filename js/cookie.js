function setCookie(e) {
	if(e === 'true'){
    createMarketoGAScript();
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
    createMarketoGAScript();
    document.getElementById("cookiewrapper").style.display = "none";
  }
}

function createMarketoGAScript(){
    var script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=UA-97923818-10";
    script.async=true;
    document.head.appendChild(script);

    var gtm = "window.dataLayer = window.dataLayer || [];function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'UA-97923818-10');";
    var script = document.createElement('script');
    script.innerHTML = gtm;
    document.head.appendChild(script);

    var marketo ="(function(){var didInit=false;function initMunchkin(){if(didInit === false){didInit=true;Munchkin.init('353-SAE-487');}}var s=document.createElement('script');s.type='text/javascript';s.async=true;s.src='//munchkin.marketo.net/munchkin.js';s.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){initMunchkin();}};s.onload=initMunchkin;document.getElementsByTagName('head')[0].appendChild(s);})();";
    var script = document.createElement('script');
    script.innerHTML = marketo;
    document.head.appendChild(script);
}