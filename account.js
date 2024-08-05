(function () {
    'use strict';


//var adad = $("\n                    <div class=\"ad-server\">\n                        <div class=\"ad-server__text\">\n                            \u0410\u0440\u0435\u043D\u0434\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440 \u0431\u0435\u0437 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A.\n                        </div>\n                        <img src=\"https://i.ibb.co/MRLKBBf/qr-code-2.png\" class=\"ad-server__qr\">\n                        <div class=\"ad-server__label\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430 - https://tsarea.us</div>\n                    </div>\n                ");
          
    Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'main') {
                Lampa.SettingsApi.addComponent({
                    component: 'add_acc',
                    name: 'Аккаунт'
                });
            }
            
      });


    /* console.log('Attempting to add parameter...');

Lampa.SettingsApi.addParam({
  component: 'add_acc',
  param: {
    name: 'adad',
  },
  field: {
    name: function() {
      console.log('getAdBlock() called');
      console.log(getAdBlock);
      return getAdBlock;
    }
  }
});

console.log('Parameter added');
    
    function getAdBlock() {
  return $(`
    <div class="ad-server">
      <div class="ad-servertext">
        Арендовать ссылку на сервер без установки и настроек.
      </div>
      <img src="https://i.ibb.co/MRLKBBf/qr-code-2.png" class="ad-serverqr">
      <div class="ad-server__label">Реклама - https://tsarea.us</div>
    </div>
  `);
    }


    console.log(getAdBlock());*/

Lampa.SettingsApi.addParam({
  component: 'add_acc',
  param: {
    name: 'adad',
    field: {
      name: 'https://i.ibb.co/MRLKBBf/qr-code-2.png',
     // type: 'image',
      //value: 'https://i.ibb.co/MRLKBBf/qr-code-2.png'
    }
  }
});

    
    Lampa.SettingsApi.addParam({
  component: 'add_acc',
  param: {
    name: 'auth',
    type: 'input',
    values: '',
    placeholder: 'Введите token',
    default: ''
  },
  field: {
    name: 'Выполнить вход',
    description: ''
  },
  onChange: function(value) {
    console.log('Введенный токен:', value);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://212.113.103.137:3001/checkToken', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log('Ответ сервера:', response);
        if (response.userId) {
          console.log('Токен действителен');
          localStorage.setItem('token', value);
        } else {
          console.log('Токен недействителен');
          localStorage.removeItem('token');
        }
      }
    };
    xhr.send(JSON.stringify({ token: value }));
  }
        
});

})();
