
/*jshint multistr: true*/
pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        //prevent zooming on desktop
        window.addEventListener('wheel', e=>{
            e.preventDefault();
        }, {passive: false});
        
        var wrapper = document.createElement('div');
        wrapper.id = 'splash__wrapper';
        wrapper.innerHTML = '\
        <div class="splash__inner">\
            <div class="splash__inner2">\
                <div class="splash__inner3">\
                    <div class="splash__col-r" id="myId">\
                        <img class="splash__img-diesel" src="https://d148xrjotn7dtb.cloudfront.net/titleSplash.png" alt="" />\
                        <div class="splash__progress-bar-container">\
                            <div class="splash__progress-bar" id="splash__progress-bar">\
                            </div>\
                        </div>\
                        <img class="splash__img-text" src="https://d148xrjotn7dtb.cloudfront.net/texteSplash.png" alt="" />\
                    </div>\
                </div>\
            </div>\
        </div>';
        
        document.body.appendChild(wrapper);
    };

    //<button type="button">Click Me!</button>>\
    var hideSplash = function () {
        var splash = document.getElementById('splash__wrapper');
        splash.parentElement.removeChild(splash);
    };
    
    var showButton = function () {
        var item = document.getElementById('myId');
        var button = document.createElement("BUTTON");
        
        button.id = 'myButton';
        button.innerHTML = "Enter";
        button.style.width = '80%';
        button.style.height = '5vh';
        button.style.background = 'white';
        button.style.color = 'black';
        button.style.fontSize = '16px';

        item.appendChild(button);
        console.log(item);
        
        button.onclick = function(event) {
            hideSplash();
        };
    };

    var setProgress = function (value) {
        var bar = document.getElementById('splash__progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        
        var fontUrl = 'https://d148xrjotn7dtb.cloudfront.net/Gotham-Bold.otf';
        var index = fontUrl.lastIndexOf('/');
        var index2 = fontUrl.lastIndexOf('.');
        var fontName = fontUrl.substr(index+1, (index2 - index)-1);
        console.log(fontName);
        
        var css = [
            //prevent zooming on mobile
            'html {',
            '    -webkit-text-size-adjust: none;',
            '    touch-action: pan-y;',
            '}',
            
            'body {',
            '    background-color: #283538;',
            '}',

            '#splash__wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #000000;',
            '    display: flex;',
            '    align-items: center;',
            '    text-align: center;',
            '    justify-content: center;',
            '}',

            '#splash__wrapper img {',
            '    max-width: 100%;',
            '}',

            '.splash__inner {',
            '    width: 100%;',
            '    max-width: 90vh;',
            '    margin: 0 20px;',
            '}',

            '.splash__inner2 {',
            '    padding-top: 65%;',
            '    position: relative;',
            '}',

            '.splash__inner3 {',
            '    position: absolute;',
            '    top: 0;',
            '    right: 0;',
            '    bottom: 0;',
            '    left: 0;',
            '    display: flex;',
            '    justify-content: center;',
            '    align-items: center;',
            '}',

            '.splash__col-l {',
            '    text-align: left;',
            '}',

            '.splash__col-r {',
            '    margin-left: 6%;',
            '    text-align: left;',
            '}',

            '.splash__progress-bar-container {',
            '    margin: 0.5% 0 15px 6px;',
            '    height: 7px;',
            '    width: 100%;',
            '    margin-left: 1vw;',
            '    max-width: 240px;',
            '    background-color: #1d292c;',
            '}',

            '.splash__progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #FFFFFF;',
            '}',
            
            '@media (max-width: 900px) {',
            '    .splash__progress-bar-container {',
            '        margin: 0.5% 0 15px 4%;',
            '        height: 5px;',
            '        width: calc(100% - 7px);',
            '    }',
            '   .splash__inner {',
            '   }',
            '   .splash__img-text{',
            '       margin-left: 2px;',
            '   }',
            '}',
            
            '#myButton {',
            '    font-family: ' + fontName + ';',
            '    font-weight: Bold;',
            '    border-radius: 4px;',
            '    margin-left: 15px;',
            '}',
            
            '@media screen and (min-width: 320px) {',
            '#myButton {',
                'font-size: calc(16px + 6 * ((100vw - 320px) / 680));',
            '}',
            '}',
           '@media screen and (min-width: 1000px) {',
            '#myButton {',
                'font-size: 22px;',
           ' }',
            
            '@font-face {',
            '    font-family: ' + fontName + ';',
            '    src: url(' + fontUrl + ');',
            '}'
        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();
        
    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    
    app.on("initialize", function () {
        app.fire('customload:start');
    });
    
    app.on('customload:end', function () {
        app.off('customload:progress');
        showButton();
    });
    
    app.on('preload:progress', setProgress);
});