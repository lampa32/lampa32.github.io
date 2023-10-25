(function () {
    'use strict';
    Lampa.Platform.tv();
    Lampa.Utils.putScriptAsync(['http://lampa32.ru/blacktv.js','http://cub.watch/plugin/tmdb-proxy','http://45.67.228.34:9118/online.js'], function () {});
  window.lampa_settings.torrents_use = false;
  window.lampa_settings.plugins_use = false;
  window.lampa_settings.account_use = false;
  Lampa.Storage.set('source', 'cub');
  Lampa.Listener.follow('app', function (e) {
     if (e.type == 'ready') {
             setTimeout(function(){
                        $("[data-action=anime]").eq(0).remove();
                        $("[data-action=relise]").eq(0).remove();
                        $("[data-action=mytorrents]").eq(0).remove();
                        $("[data-action=about]").eq(0).remove();
                        $("[data-action=console]").eq(0).remove();
                        $("[data-action=feed]").eq(0).remove();
             },10);
     }
  });
  function multstart() {
           var ico = '<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="256px" height="256px" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .flatshadows_een{fill:#ffffff;} .flatshadows_twee{fill:#ffffff;} .flatshadows_drie{fill:#ffffff;} .flatshadows_vier{fill:#ffffff;} .flatshadows_vijf{fill:#000000;} .st0{fill:none;} .st1{fill:#000000;} .st2{fill:#ffffff;} .st3{fill:#ffffff;} .st4{fill:#ffffff;} .st5{fill:#ffffff;} .st6{fill:#FFFFFF;} </style> <g> <path class="flatshadows_vier" d="M7,23v6h20v-7.683l0,0c2.363-1.124,4-3.527,4-6.317c0-1.906-0.764-3.632-2-4.894V3 c0-1.105-0.895-2-2-2s-2,0.895-2,2v5.08C24.673,8.033,24.34,8,24,8s-0.673,0.033-1,0.08V3c0-1.105-0.895-2-2-2s-2,0.895-2,2v7.106 c-0.785,0.802-1.378,1.792-1.707,2.896l0-0.001H17C11.477,13,7,17.477,7,23z"></path> <path class="flatshadows_twee" d="M15,15h-0.293l0,0.001c-0.329-1.104-0.922-2.094-1.707-2.896V5c0-1.105-0.895-2-2-2S9,3.895,9,5 v5.08C8.673,10.033,8.34,10,8,10s-0.673,0.033-1,0.08V5c0-1.105-0.895-2-2-2S3,3.895,3,5v7.106C1.764,13.368,1,15.094,1,17 c0,2.791,1.637,5.193,4,6.317l0,0V31h20v-6C25,19.477,20.523,15,15,15z"></path> <path class="flatshadows_een" d="M25,25v6c1.657,0,3-1.343,3-3S26.657,25,25,25z"></path> <path class="flatshadows_drie" d="M25,31v-5.707L14.707,15c0.316,1.056,0.394,2.215,0.149,3.421 c-0.552,2.715-2.745,4.898-5.462,5.44C7.802,24.178,6.295,23.934,5,23.317L12.683,31H25z"></path> <path class="flatshadows_vijf" d="M6,16c0,0.552-0.448,1-1,1s-1-0.448-1-1c0-0.552,0.448-1,1-1S6,15.448,6,16z M11,15 c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1s1-0.448,1-1C12,15.448,11.552,15,11,15z M21,13c-0.552,0-1,0.448-1,1 c0,0.552,0.448,1,1,1s1-0.448,1-1C22,13.448,21.552,13,21,13z M27,13c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1s1-0.448,1-1 C28,13.448,27.552,13,27,13z"></path> </g> </g></svg>'
           var mult = $('<li class="menu__item selector" data-action="mult"><div class="menu__ico">' + ico + '</div><div class="menu__text">Мультфильмы</div></li>');
           mult.on('hover:enter', function() { Lampa.Activity.push({"url":"","title":"Мультфильмы - CUB","component":"category","genres":16,"id":16,"source":"cub","card_type":true,"page":1}) });
                $('.menu .menu__list').eq(0).append(mult);
                  setTimeout(function() {$("[data-action=mult]").insertBefore($("[data-action=catalogl]"));}, 2000)
  }
  setTimeout(function() { multstart() }, 2000)
})();
