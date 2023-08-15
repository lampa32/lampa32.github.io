(function () {
    'use strict';
Lampa.Platform.tv(); 
Lampa.SettingsApi.addParam({
	    		component: 'more',
	    		param: {
	    			name: 'OpenSpeedTestParam',
	    			type: 'static', //доступно select,input,trigger,title,static
	    		},
	    		field: {
	    			name: 'OpenSpeedTest',
	    			description: 'Замер скорости интернет-соединения'
	    		},
	    		onRender: function (item) {
	    			item.on('hover:enter', function(){
					var modal = $('<div style="text-align:right;"><div style="min-height:360px;"><div style="width:100%;height:0;padding-bottom:50%;position:relative;"><iframe style="border:none;position:absolute;top:0;left:0;width:100%;height:100%;min-height:360px;border:none;background-color: #ffffff;overflow:hidden !important;" src="http://185.229.66.133:3000?XHR=1&R"></iframe></div></div></div>');
		  			Lampa.Modal.open({
		  				title: '',
		  				html: modal,
		  				size: 'medium',
		  				mask: true, 
		  				onBack: function onBack() {
		  					Lampa.Modal.close();
							Lampa.Controller.toggle('settings_component');
		  				},
		  				onSelect: function () {}
  			});});}
				});
})();
