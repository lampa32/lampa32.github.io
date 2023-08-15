(function () {
    'use strict';
Lampa.Platform.tv(); 
Lampa.SettingsApi.addParam({
	    		component: 'add_plugin',
	    		param: {
	    			name: 'SpeedTest',
	    			type: 'static', //доступно select,input,trigger,title,static
	    		},
	    		field: {
	    			name: 'SpeedTest',
	    			description: 'Замер скорости интернет-соединения'
	    		},
	    		onRender: function (item) {
	    			item.on('hover:enter', function(){
	    			Lampa.Iframe.show({url: 'http://zamerka.com/',
	              					onBack: function onBack() {Lampa.Controller.toggle('settings_component');}
	            		});});}
				});
})();
