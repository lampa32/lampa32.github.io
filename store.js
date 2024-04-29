(function () {
    'use strict';

  /*  Lampa.Storage.listener.follow('change', function (e) {});
                Lampa.Settings.listener.follow('open', function (e) {
                   if (e.name == 'main') {
                     Lampa.SettingsApi.addComponent({
                        component: 'add_management_plugin',
                        name: 'Management'
                     });
                   }
		   
                   Lampa.Settings.main().update();
                   Lampa.Settings.main().render().find('[data-component="add_management_plugin"]').addClass('hide');
       });*/
               Lampa.SettingsApi.addParam({
                        component: 'interface',
                        param: {
                                name: 'col',
                                type: 'static',
                                default: true
                        },
                        field: {
                                name: '123'
			},
                        onRender: function(item) {
			     setTimeout(function() {
				   $('div[data-name="col"]').insertAfter('div[data-name="interface_size"]');
			     }, 100);
                              item.on('hover:enter', function () {
                                  Lampa.Extensions.show({ store: 'http://skaztv.online/js/extensions.json',with_installed: true });
                                // Lampa.Settings.create('add_management_plugin');
                                 //Lampa.Controller.enabled().controller.back = function(){
                    // Lampa.Settings.create('interface');
                //}
                              });
			      
                        }
       });

})();
