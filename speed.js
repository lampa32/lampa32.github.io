(function() {
	'use strict';
  function add() {
		var ico = '<svg version="1.1" id="exit" color="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">\n<g>\n	<path fill="currentColor" d="M256,5.1c138.6,0,250.9,112.3,250.9,250.9S394.6,506.9,256,506.9S5.1,394.6,5.1,256S117.4,5.1,256,5.1z\n		 M256,40.1C136.7,40.1,40.1,136.7,40.1,256S136.7,471.9,256,471.9S471.9,375.3,471.9,256S375.3,40.1,256,40.1z M311.4,176.6\n		c6.7-6.7,17.5-6.7,24.2,0c6.7,6.7,6.7,17.5,0,24.2l-55.1,55.1l55.1,55c6.7,6.7,6.7,17.5,0,24.2c-6.7,6.7-17.5,6.7-24.2,0L256.3,280\n		l-55.1,55.1c-6,6-15.4,6.6-22.1,1.8l-2.2-1.8c-6.7-6.7-6.7-17.5,0-24.2l55.1-55l-55.1-55c-6.7-6.7-6.7-17.5,0-24.2s17.5-6.7,24.2,0\n		l55.1,55.1L311.4,176.6z"/>\n</g>\n</svg>';
		var menu_items = $('<li class="menu__item selector" data-action="exit_r"><div class="menu__ico">' + ico + '</div><div class="menu__text">' + Lampa.Lang.translate('exit_menu') + '</div></li>');
			menu_items.on('hover:enter', function() {
				Lampa.Activity.push({
						url: 'http://185.229.66.133:3000?XHR=1&R',
						title: 'Р¤РµРґРµСЂР°Р»СЊРЅС‹Рµ',
						component: 'add',
						page: 1
			});
			$('.menu .menu__list').eq(1).append(menu_items);
	}
	
	function createExitMenu() {
		window.plugin_exit_m_ready = true;
		Lampa.Component.add('exit_m', exit_m);
		if (window.appready) add(); else {
			Lampa.Listener.follow('app', function (e) {
				if (e.type == 'ready') add();
			});
		}
	}
	if (!window.plugin_exit_m_ready) createExitMenu();
  }
})();
