(function () {
    'use strict';
    Lampa.Platform.tv();

    function start() {

	  Lampa.Controller.listener.follow('toggle', function(e) {
    if(e.name == 'select') {
      setTimeout(function() {
        if (document.querySelector("body > div.selectbox > div.selectbox__content.layer--height > div.selectbox__head > div").innerText == Lampa.Lang.translate('title_out')) {
          document.querySelector("body > div.selectbox > div.selectbox__content.layer--height > div.selectbox__body.layer--wheight > div > div > div > div:nth-child(3) > div").text('Перезагрузить')
          $('.selectbox-item')[1].on('hover:enter hover:click hover:touch', function() {
            location.reload();
          });
        }
      }, 100);
    }
  });
	
	Lampa.Listener.follow('full', function(e) {
	    if (e.type == 'complite') {
		setTimeout(function(){
		    if ($('.view--online').length > 1) $('.view--online')[1].remove();
		    $('.view--online').insertBefore($('.button--play'))
		    $(".view--online", Lampa.Activity.active().activity.render()).empty().append('<svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32"><path d="m17 14.5 4.2-4.5L4.9 1.2c-.1-.1-.3-.1-.6-.2L17 14.5zM23 21l5.9-3.2c.7-.4 1.1-1 1.1-1.8s-.4-1.5-1.1-1.8L23 11l-4.7 5 4.7 5zM2.4 1.9c-.3.3-.4.7-.4 1.1v26c0 .4.1.8.4 1.2L15.6 16 2.4 1.9zM17 17.5 4.3 31c.2 0 .4-.1.6-.2L21.2 22 17 17.5z" fill="currentColor" fill="#ffffff" class="fill-000000"></path></svg>ON');
		},50)
	    }
	})

	var reloadSVG = '<svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.4800000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" fill="currentColor"></path></g></svg></div>';;
	var reloadBUTT = '<div id="RELOAD" class="head__action selector redirect-screen">' + reloadSVG + '</div>';
	
	$('#app > div.head > div > div.head__actions').append(reloadBUTT);
	$('#RELOAD').on('hover:enter hover:click hover:touch', function() {
	    location.reload();
	});

    } 
  
if(window.appready) start();
else Lampa.Listener.follow('app', function(e) {	if(e.type == 'ready') start(); });

})();
