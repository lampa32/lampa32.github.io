(function () {
    'use strict';

     Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'main') {
                Lampa.SettingsApi.addComponent({
                    component: 'add_acc',
                    name: 'Аккаунт'
				        });
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
				                       /*onChange: function (value) {
				   
				                           if (value == '') {
					                              $('#REDIRECT').remove()
				                           }
				                           if (!value == '') {
					                             startMe();
				                           }
				                      } */        
     });

})();
