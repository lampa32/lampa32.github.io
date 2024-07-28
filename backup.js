(function () {
    'use strict';

Lampa.SettingsApi.addParam({
          component: 'account',
          param: {
            name: 'account_restore',
            type: 'select',
            values: {
              SAVE: 'Сохранить',
              RESTORE: 'Восстановить',
            },
            default: 'SAVE'
          },
          field: {
            name: 'Резервная копия',
            description: 'Все настройки и плагины'
          },
          onRender: function (item) {
            setTimeout(function(){
              $('div[data-name="account_use"]').after($('div[data-name="account_restore"]'));
              $('.settings-param__name', item).css('color','f3d900');
            },10)
          },
          onChange: function (value) {
            if (value == 'SAVE') initBackup();
            if (value == 'RESTORE') {
              Lampa.Input.edit ({
                  value: 'ключ',
                  free: true,
                  nosave: true
                },   function (t) {
                    Lampa.Storage.set('restore_Key', t);
                    initRestore(t);
                  }
              )              
            }
          }
        });


var API_URL = 'https://hastebin.com/documents';
var API_KEY = 'f1eccec55dcb6618574812f9e0508280cb79def901199d6e9614388d7046bd53e6c39cd95ce2c5bfd46c2a71cbf7aa6db317cb3bbb63b1fb2c531dce755a60be';

function backupLocalStorage() {
    var keys = Object.keys(localStorage);
    var backupData = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        backupData[key] = localStorage.getItem(key);
    }
    var backupString = JSON.stringify(backupData);
    var encoder = new TextEncoder();
    var bytes = encoder.encode(backupString);
    var backupBase64 = btoa(String.fromCharCode.apply(null, bytes));
    //var backupBase64 = btoa(String.fromCharCode(...bytes));
    return backupBase64;
}
var backupData = backupLocalStorage();

function createPaste(title, content, expiration, exposure) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', API_URL, true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.setRequestHeader('Authorization', 'Bearer ' + API_KEY);

        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var pasteKey = response.key;
                var pasteUrl = 'https://hastebin.com/raw/' + pasteKey;
                resolve(pasteKey);
            } else {
                reject(new Error('Не удалось создать пасту: ' + xhr.status + ' - ' + xhr.statusText));
            }
        };

        xhr.onerror = function() {
            reject(new Error('Не удалось создать пасту: ' + xhr.status + ' - ' + xhr.statusText));
        };

        xhr.send(content);
    });
}

function initModal(pasteKey){
    var beginDIV = '<div>';
    var finishDIV = '</div>\n\n\n';
    var diagn_text = $("<div class=\"about\">" + '\n' +
                  '<div id="placeForQR" style="display: flex; justify-content: center;">' + finishDIV +
                  '<div class=\"overhide\">\n' +
                    '<div class=\"about__contacts\">\n' +
                      '<div>\n' +
                        'Запишите <span style="color: #ffca18; font-weight:bold">ключ восстановления: </span><span style="color: #07d106; font-weight:bold">' + pasteKey + '</span>. Ключ нужно будет указать на этапе восстановления.<br>\n' +
                      '</div>\n\n' +
                    '</div>\n' +
                  '</div>\n\n' +
                  '</div>\n\n' +
                  "</div>");

    Lampa.Modal.open({
            title: 'Информация для Восстановления',
            html: diagn_text,
            size: 'medium',
      onBack: function onBack() {
        Lampa.Modal.close();
        Lampa.Controller.toggle('settings');
      }
    });
    
    var modalTitle = document.querySelector('.modal__title');
    modalTitle.style.display = 'flex';
    modalTitle.style.justifyContent = 'center';
}


function initBackup(){
  var pasteTitle = 'BackUp';
  var pasteContent = backupData;
  createPaste(pasteTitle, pasteContent)
    .then(function(pasteKey) {
      console.log('Ключ: ', pasteKey);
      initModal(pasteKey);
    })
    .then(function(pasteContent) {
    })
    .catch(function(error) {
    });
}



/************************************/

function getPaste(pasteKey) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
    var pasteUrl = 'https://hastebin.com/raw/' + pasteKey;
        xhr.open('GET', pasteUrl, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + API_KEY);
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error('Не удалось получить резервную копию: ' + xhr.status + ' - ' + xhr.statusText));
            }
        };
        xhr.onerror = function() {
            reject(new Error('Не удалось получить резервную копию: ' + xhr.status + ' - ' + xhr.statusText));
        };
        xhr.send();
    });
}

function initRestore(pasteKey){
  getPaste(pasteKey)
    .then(function(backupBase64) {
      return restoreLocalStorage(backupBase64);
    })
    .then(function() {
      Lampa.Noty.show('Данные из резервной копии восстановлены!');
    })
    .catch(function(error) {
    });
}

function restoreLocalStorage(backupBase64) {
    var bytes = atob(backupBase64).split('').map(function(char) { return char.charCodeAt(0); });
    var decoder = new TextDecoder();
    var backupString = decoder.decode(new Uint8Array(bytes));
    var backupData = JSON.parse(backupString);
    for (var key in backupData) {
        localStorage.setItem(key, backupData[key]);
    }
}

})();
