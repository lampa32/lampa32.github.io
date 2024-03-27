(function () {
    'use strict';
    Lampa.Platform.tv();

	var Protocol = function Protocol() {
		return window.location.protocol == 'https:' ? 'https://' : 'http://';
	}

	/*Lampa.Storage.set('guide', '');
			setTimeout(function () {
				if (window.innerHeight > 700 && Lampa.Storage.field('guide') == 'undefined') guide();
			}, 3000);*/

function guide() {
			var guide = '<div class="setorrent-checklist"><div class="torrent-checklist__descr">Вас приветствует Guide по использованию и настройке приложения Lampa.<br> Мы пройдём с Вами краткую инструкцию по основным этапам приложения.</div><div class="torrent-checklist__progress-steps">Пройдено 0 из 0</div><div class="torrent-checklist__progress-bar"><div style="width:0"></div></div><div class="torrent-checklist__content"><div class="torrent-checklist__steps hide"><ul class="torrent-checklist__list"><li>Парсер</li><li>Включение парсера</li><li>Плагины</li><li>Добавление плагина</li><li>Установка плагина</li><li>Балансер</li><li>Смена балансера</li><li>Фильтр</li><li>Применение фильтра</li></ul></div><div class="torrent-checklist__infoS"><div class="hide">Откройте Настройки, после перейдите в раздел "Парсер".<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_parser.jpg"></div><div class="hide">В пункте "Использовать парсер" переведите функцию в положение "Да", после чего в карточке фильма или сериала появится кнопка "Торренты".<hr><img src="'+ Protocol() +'lampa.stream/img/guide/add_parser.jpg"></div><div class="hide">Установка плагинов<hr><img src="'+ Protocol() +'lampa.stream/img/guide/add_plugin.jpg"></div><div class="hide">Для добавления плагинов воспользуйтесь следующими вариантами.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/options_install.jpg"></div><div class="hide">Для добавления плагина, воспользуйтесь списком плагинов<hr><img src="'+ Protocol() +'lampa.stream/img/guide/install_plugin.jpg"></div><div class="hide">Для смены "Онлайн" источника, воспользуйтесь кнопкой Балансер.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_balanser.jpg"></div><div class="hide">В случае, если источник не работает (нет подключения к сети) выберете в разделе "Балансер" другой источник.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/balansers_change.jpg"></div><div class="hide">Используйте "Фильтры" для смены перевода и сезона.<hr><img src="'+ Protocol() +'lampa.stream/img/guide/open_filter.jpg"></div><div class="hide">Для смены сезона или озвучки воспользуйтесь пунктами<br>1. Перевод<br>2. Сезон<hr><img src="'+Protocol() +'lampa.stream/img/guide/filters.jpg"></div><div class="hide">Поздравляем! После прохождения краткого гайда, Вы знаете как пользоваться приложением и у Вас должно возникать меньше вопросов</div></div></div><div class="torrent-checklist__footer"><div class="simple-button selector hide back">Назад</div><div class="simple-button selector next">Начать</div><div class="torrent-checklist__next-step"></div></div></div>';
			Lampa.Template.add('guide', guide);
			var temp = Lampa.Template.get('guide');
			var descr = temp.find('.torrent-checklist__descr');
			var list = temp.find('.torrent-checklist__list > li');
			var info = temp.find('.torrent-checklist__infoS > div');
			var next = temp.find('.torrent-checklist__next-step');
			var prog = temp.find('.torrent-checklist__progress-bar > div');
			var comp = temp.find('.torrent-checklist__progress-steps');
			var btn = temp.find('.next');
			var btn_back = temp.find('.back');
			var position = -2;

			function makeStep(step) {
				step ? position-- : position++;
				var total = list.length;
				comp.text('Пройдено ' + Math.max(0, position) + ' из ' + total);
				if (position > list.length) {
					Lampa.Modal.close();
					Lampa.Controller.toggle('content');
					Lampa.Storage.set('guide', true);
				} else if (position >= 0) {
					Lampa.Storage.set('guide', '');
					info.addClass('hide');
					descr.addClass('hide');
					info.eq(position).removeClass('hide');
					var next_step = list.eq(position + 1);
					prog.css('width', Math.round(position / total * 100) + '%');
					btn.text(position < total ? 'Далее' : 'Завершить');
					if (position > 0) btn_back.removeClass('hide');
					next.text(next_step.length ? '- ' + next_step.text() : '');
				}
			}
			makeStep();
			btn.on('hover:enter', function () {
				makeStep();
			});
			btn_back.on('hover:enter', function () {
				if (position == 1) {
						btn_back.removeClass('focus')//.addClass('hide');
						btn.addClass('focus');
					Lampa.Controller.collectionSet() ;
				        Lampa.Controller.collectionFocus(btn);
				}
				if (position > 0) makeStep(true);
			});
			Lampa.Modal.open({
				title: 'Гайд по использованию',
				html: temp,
				size: 'medium',
				mask: true
			});
}
  guide();
})();
