(function() {
	'use strict';
Lampa.Platform.tv();
  setTimeout(function (){
    if(Lampa.Controller.enabled().name == 'full_start' && !Lampa.Activity.active().activity.render().find('.view--lampac--button').length) {
    		    if(Lampa.Activity.active().activity.render().find('.button--priority').length){
    		      Lampa.Activity.active().activity.render().find('.full-start-new__buttons').prepend(btn);	
    		      Lampa.Controller.toggle('full_start');
    		      Navigator.focus(btn[0]);
    		    } else if(Lampa.Storage.field('online_but_first') && Lampa.Activity.active().activity.render().find('.button--play').length){
    		      Lampa.Activity.active().activity.render().find('.button--play').before(btn);		
    		      Lampa.Controller.toggle('full_start');
    		      Navigator.focus(btn[0]);
  		      } else {
    		      Lampa.Activity.active().activity.render().find('.view--torrent').before(btn);		
    		      Lampa.Controller.toggle('full_start');
            }
    }
    }, 100);
        btn.unbind('hover:enter hover.click').on('hover:enter hover.click', function () {
  		    inf();
          Lampa.Activity.active().activity.render().find('.view--lampac--button').html(Lampa.Lang.translate(ico + '<span>'+_this.title+'</span>'));
  		    if(_this.is_continue && Lampa.Storage.field('online_continued')) shows(_this.last_s);
  		    else openOnline();
  			});
})();  
