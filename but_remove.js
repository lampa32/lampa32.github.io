(function() {
    'use strict';

function deleteSubscribeButton(){

        console.log('интервал ожидания кнопки запущен');

       console.log('найдено кнопок: ' + $('.button--subscribe').length)

        var subBut = setInterval(function() {

                  console.log('ждём кнопку');

        if($('.button--subscribe').length > 0) {

                           setTimeout(function(){

                                     console.log('кнопка найдена, удаляем');

                                     for (var i = 0; i < 10; i++){

                                              setTimeout(function(){

                                                        $('.button--subscribe').remove();

                                              },10)

                                              if($('.button--subscribe').length == 0) {

                                                        clearInterval(subBut);

                                                        console.log('стоп интервал: subBut')

                                              }

                                     }

                           },20)

                  }

   }, 20);

}

                 

Lampa.Listener.follow('full', function(e) {

   if (e.type == 'complite') {

                  console.log('интервал ожидания персоны: waitInterval');

                  var waitInterval = setInterval(function() {

                           $('.full-person').on('hover:enter', function() {

                                    console.log('стоп ожидания персоны');

                                    clearInterval(waitInterval);

                                     deleteSubscribeButton();

                           })

                  },50)

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
