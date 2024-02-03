(function () {
    'use strict';

//function cub_off() {

	 setTimeout(function(){
              $('.open--feed').remove();
              $('.open--premium').remove();
	      $('.open--notice').remove();
          }, 1000);

	  Lampa.Settings.listener.follow('open', function (e) {
             if (e.name == 'account') {
               e.body.find('[data-name="account_use"]').remove();
             }
          });
	
	  Lampa.Listener.follow('full', function(e) {
                if (e.type == 'complite') {
                   setTimeout(function(){
			$('.button--subscribe').remove();
		   },10);
                }
          })   
	
	  Lampa.Listener.follow('app', function (e) {
              if (e.type == 'ready') {
                    setTimeout(function(){
                        $("[data-action=feed]").eq(0).remove();
                        $("[data-action=subscribes]").eq(0).remove();
                    },10);
               }
          });
  
          Lampa.Storage.listener.follow('change', function (event) {
               if (event.name == 'activity') {
	              if (Lampa.Activity.active().component === 'bookmarks') {
					$('.register:nth-child(4)').hide();
					$('.register:nth-child(5)').hide();
					$('.register:nth-child(6)').hide();
					$('.register:nth-child(7)').hide();
					$('.register:nth-child(8)').hide();
		       }
                }
          });

/*}	
if(window.appready) cub_off();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				cub_off();
			}
		});
	}
*/
})();
