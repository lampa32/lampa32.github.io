(function () {
    'use strict';
               
Lampa.SettingsApi.addParam({
                        component: 'interface',
                        param: {
                                name: 'col',
                                type: 'static',
                        },
                        field: {
                                name: '123'
                        },
                        onRender: function(item) {
                           setTimeout(function() {
                               $('.settings-param__name', item).after($('div[data-name="interface_size"]'));
                            }, 100);
                            item.on('hover:enter', function () {
                                  Lampa.Extensions.show({ 
					store: 'http://skaztv.online/js/extensions.json',
					with_installed: true
				  });
                             });
			}
});

})();
