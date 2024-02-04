(function () {
    'use strict';

	function hideIT(){
		var myCardInterval = setInterval(function(){
			if (document.querySelector('.card') !== null) {
				$('.card').on('hover:long', function () {
						setTimeout(function(){	
							$('.selectbox-item__lock').parent().css('display', 'none');
							$('.settings-param-title').last().css('display', 'none');
						},50)
				})
				clearInterval(myCardInterval);
			 }
		}, 100);
		var myTextBoxInterval = setInterval(function(){
			if (document.querySelector('.card__textbox') !== null) {
				$('.card__textbox').parent().parent().remove();
				clearInterval(myTextBoxInterval);
			}
		}, 100);
	}
	
function cub_off() {

	 setTimeout(function(){
              $('.open--feed').remove();
              $('.open--premium').remove();
	      $('.open--notice').remove();
          }, 1000);

	  Lampa.Settings.listener.follow('open', function (e) {
             if (e.name == 'account') {
		     $('.register:nth-child(1)').hide();
               e.body.find('[data-name="settings_cub_sync_calendar"]').remove();
             }
          });
	
	  Lampa.Listener.follow('full', function(e) {
                if (e.type == 'complite') {
		  $('.button--book').on('hover:enter', function(){
		    setTimeout(function(){	
			$('.selectbox-item__lock').parent().css('display', 'none');
			$('.settings-param-title').last().css('display', 'none');
		    },10)
		  });	  
                   setTimeout(function(){
			$('.button--subscribe').remove();
		   },10);
                }
          })   
	
	/*  Lampa.Listener.follow('app', function (e) {
              if (e.type == 'ready') {
                    setTimeout(function(){
                        $("[data-action=feed]").eq(0).remove();
                        $("[data-action=subscribes]").eq(0).remove();
                    },10);
               }
          });*/
  
          Lampa.Storage.listener.follow('change', function (event) {
               if (event.name == 'activity') {
	              if (Lampa.Activity.active().component === 'bookmarks') {
					$('.register:nth-child(4)').hide();
					$('.register:nth-child(5)').hide();
					$('.register:nth-child(6)').hide();
					$('.register:nth-child(7)').hide();
					$('.register:nth-child(8)').hide();
		       }
		       setTimeout(function(){
			hideIT();
		       }, 200)
                }
          });

}	
if(window.appready) cub_off();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				cub_off(); hideIT();
				$("[data-action=feed]").eq(0).remove();
                                $("[data-action=subscribes]").eq(0).remove();
				
			}
		});
	}

})();
