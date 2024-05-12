(function () {
    'use strict';
    
function pollParsers() {
    var menu = [
        // элементы меню
    ];

    var promises = [];

    for (var i = 0; i < menu.length; i++) {
        var url = menu[i].url;
        var selector = 'body > div.selectbox > div.selectboxcontent.layer--height > div.selectboxbody.layer--wheight > div > div > div > div:nth-child(' + (i + 2) + ') > div';
        promises.push(myRequest(url, selector, menu[i].title));
    }

    Promise.all(promises)
        .then(function() {
            myMenu(menu);
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}

function myRequest(url, selector, title) {
    return new Promise(function(resolve, reject) {
        var proto = url.startsWith('http') ? 'http://' : 'https://';
        var myLink = proto + url + '/api/v2.0/indexers/status:healthy/results?apikey=';

        $.ajax({
            url: myLink,
            timeout: 3000,
            type: 'GET',
            success: function(data, textStatus, jqXHR) {
                $(selector).html(title + ' <span style="color: #1aff00;">✓</span>');
                resolve();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    $(selector).html(title + ' <span style="color: #ff2e36;">✗</span>');
                } else {
                    $(selector).html(title + ' <span style="color: #ff2e36;">✗</span>');
                }
                resolve();
            }
        });
    });
}

function myMenu(menu) {
    var enabled = Lampa.Controller.enabled().name;

    var menuItems = menu.map(function(item) {
        return {
            title: item.title.replace(/ <span style="color: #1aff00;">✓<\/span>| <span style="color: #ff2e36;">✗<\/span>/g, ''),
            url: item.url,
            jac_key: item.jac_key
        };
    });

    Lampa.Select.show({
        title: 'Меню смены парсера',
        items: menuItems,
        onBack: function onBack() {
            Lampa.Controller.toggle(enabled);
        },
        onSelect: function onSelect(a) {
            Lampa.Storage.set('jackett_url', a.url) & Lampa.Storage.set('jackett_key', a.jac_key) & Lampa.Storage.set('jackett_interview', 'all') & Lampa.Storage.set('parse_in_search', true) & Lampa.Storage.set('parse_lang', 'lg');
            Lampa.Controller.toggle(enabled);
            var activ = Lampa.Storage.get('activity')
            setTimeout(function () {
                window.history.back();
            }, 1000)
            setTimeout(function () {
                Lampa.Activity.push(activ)
            }, 3000)
        }
    })
}

var eLoop = 0, myInterval, myIntervalPlus;
Lampa.Storage.listener.follow('change', function (event) {
    if (event.name == 'activity') {
        if (Lampa.Activity.active().component == 'torrents') {
            myInterval = setInterval(function () {
                if (eLoop = 30) {
                    eLoop = 0;
                    clearInterval(myInterval);
                }
                if ($('.empty__title').length) {
                    eLoop = 0
                    pollParsers();
                    $('.empty__title').remove();
                    clearInterval(myInterval);
                }
                else eLoop++;
            }, 2000)
        }
    }
});
    
    
})();
