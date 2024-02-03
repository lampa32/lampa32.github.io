(function () {
    'use strict';
  
Lampa.Storage.listener.follow('change', function (event) {
    if (event.name == 'activity') {
				if (Lampa.Activity.active().component === 'bookmarks') {
					//if ((Lampa.Storage.field('book')&&(Lampa.Sto {$('.register:nth-child(1)').hide()} else {$('.register:nth-child(1)').show()};
					//if ((Lampa.Storage.field('like')&&(Lampa.Storage.get('like') == true))) {$('.register:nth-child(2)').hide()} else {$('.register:nth-child(2)').show()};
					//if ((Lampa.Storage.field('wath')&&(Lampa.Storage.get('wath') == true))) {$('.register:nth-child(3)').hide()} else {$('.register:nth-child(3)').show()};
				//	if ((Lampa.Storage.field('look')&&(Lampa.Storage.get('look') == true))) {$('.register:nth-child(4)').hide()} else {$('.register:nth-child(4)').show()};
					//if ((Lampa.Storage.field('viewed')&&(Lampa.Storage.get('viewed') == true))) {$('.register:nth-child(5)').hide()} else {$('.register:nth-child(5)').show()};
				//	if ((Lampa.Storage.field('scheduled')&&(Lampa.Storage.get('scheduled') == true))) {$('.register:nth-child(6)').hide()} else {$('.register:nth-child(6)').show()};
					$('.register:nth-child(7)').hide();
					//if ((Lampa.Storage.field('thrown')&&(Lampa.Storage.get('thrown') == true))) {$('.register:nth-child(8)').hide()} else {$('.register:nth-child(8)').show()};
				}
    }
  });
})();
