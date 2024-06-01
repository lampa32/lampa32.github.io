(function() {
    'use strict';

var observerConfig = { childList: true, subtree: true };

function deleteButtonToDelete() {
  var buttonToDelete = document.querySelector('.button--subscribe');
  if (buttonToDelete) {
    console.log('Кнопка найдена, удаляем');
    buttonToDelete.remove();
    observer.disconnect();
    console.log('Наблюдение остановлено');
  }
}

var observer = new MutationObserver(function(mutationsList) {
  for (var i = 0; i < mutationsList.length; i++) {
    if (mutationsList[i].type === 'childList') {
      deleteButtonToDelete();
    }
  }
});

observer.observe(document.body, observerConfig);
console.log('Ожидание кнопки...');

Lampa.Listener.follow('full', function(e) {
  if (e.type === 'complite') {
    console.log('Ожидание персоны...');
    var fullPerson = document.querySelector('.full-person');
    if (fullPerson) {
      fullPerson.addEventListener('hover:enter', function() {
        console.log('Персона найдена, удаляем кнопку');
        deleteButtonToDelete();
      });
    }
  }
});
    
    
    /*function deleteSubscribeButton() {
  var subscribeButton = document.querySelector('.button--subscribe');
  if (subscribeButton) {
    console.log('Кнопка найдена, удаляем');
    subscribeButton.remove();
    observer.disconnect();
    console.log('Интервал остановлен: observer');
  } else {
    setTimeout(deleteSubscribeButton, 100);
  }
}

var observer = new MutationObserver(function(mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type === 'childList') {
      deleteSubscribeButton();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
console.log('Интервал ожидания кнопки запущен');

Lampa.Listener.follow('full', function(e) {
  if (e.type === 'complite') {
    console.log('Интервал ожидания персоны: waitInterval');
    var waitInterval = setInterval(function() {
      var fullPerson = document.querySelector('.full-person');
      if (fullPerson) {
        fullPerson.addEventListener('hover:enter', function() {
          console.log('Стоп ожидания персоны');
          clearInterval(waitInterval);
          deleteSubscribeButton();
        });
      }
    }, 100);
  }
});*/

    
/*function deleteSubscribeButton(){

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

                                              }, 0)

                                              if($('.button--subscribe').length == 0) {

                                                        clearInterval(subBut);

                                                        console.log('стоп интервал: subBut')

                                              }

                                     }

                           }, 20)

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

                  }, 200)

   }

});*/



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
