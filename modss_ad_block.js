(function () {
    'use strict';
    Lampa.Platform.tv();
Lampa.Controller.listener.follow('toggle', function(e) {
   		if(e.name == 'select') {
   			setTimeout(function() {
   				if($('.selectbox .selectbox-item__icon svg').length && Lampa.Activity.active().component == 'full') $('div.selectbox__body > div > div > div > div:contains("@modssmy_bot")').css('display', 'none');
				$('div > span:contains("VIP")').parent().parent().parent().css('display', 'none')
			}, 10);
   		}
   	});
    
})();
