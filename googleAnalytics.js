if(location.host=="ubheilwig.de") {
    document.querySelector('head').innerHtml = document.querySelector('head').innerHtml+`      
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-77717336-3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
    
        gtag('config', 'UA-77717336-3');
    </script>`
}
