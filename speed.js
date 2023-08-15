// Main Menu Exit
(function() {
	'use strict';
Lampa.SettingsApi.addParam({
    		component: 'add_plugin',
    		param: {
    			name: 'pub_speed',
    			type: 'static', //доступно select,input,trigger,title,static
    		},
    		field: {
    			name: 'SpeedTest',
    			description: 'Выбор лучшего сервера Pub'
    		},
    		onRender: function (item) {
    			item.on('hover:enter', function(){
    			  Lampa.Iframe.show({
              url: 'http://zamerka.com/',
              onBack: function onBack() {
                Lampa.Controller.toggle('settings_component');
              }
            });
	

})();
