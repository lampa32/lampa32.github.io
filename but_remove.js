(function() {
    'use strict';

// мы внутри карточки
        Lampa.Listener.follow('full', function(e) {
            if (e.type == 'complite') {
	            	$('.full-person').on('hover:enter', function() {
                      var subBut = setInterval(function() {
                           if($('.button--subscribe').length) {
                               $('.button--subscribe').remove();
                      // Также удаляем кнопку "Subscribe" каждые 10 миллисекунд 
                               clearInterval(subBut);
                           }
                      }, 10);  
                });         
	         }	    
        });


/*****************


Lampa.Storage.listener.follow('change', function(event) {
    if (event.name == 'activity') {
        if (Lampa.Activity.active().component == 'torrents') {
            startObserver();
        } else {
            stopObserver();
        }
    }
});

function startObserver() {
    stopObserver(); // Остановить предыдущего наблюдателя, если он был

    var targetNode = document.body; // Узел, за которым будем наблюдать
    var config = { childList: true, subtree: true }; // Настройки наблюдения

    observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if ($('.empty__title').length) {
                myMenu();
                stopObserver();
            }
        });
    });

    observer.observe(targetNode, config);
}

function stopObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}
  *************/
  
})();
