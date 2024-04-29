(function () {
    'use strict';

  /*  Lampa.Storage.listener.follow('change', function (e) {});
                Lampa.Settings.listener.follow('open', function (e) {
                   if (e.name == 'main') {
                     Lampa.SettingsApi.addComponent({
                        component: 'add_management_plugin',
                        name: 'Management'
                     });
                   }
		   
                   Lampa.Settings.main().update();
                   Lampa.Settings.main().render().find('[data-component="add_management_plugin"]').addClass('hide');
       });*/
               Lampa.SettingsApi.addParam({
                        component: 'interface',
                        param: {
                                name: 'col',
                                type: 'static',
                                //default: true
                        },
                        field: {
                                name: '123'
			},
                        onRender: function(item) {
			    setTimeout(function() {
        // Получаем ссылку на элемент, который нужно переместить
const paramName = document.querySelector("#app > div.settings > div.settingscontent.layer--height > div.settingsbody > div > div > div > div > div:nth-child(23) > div");

// Создаем временный контейнер
const tempContainer = document.createElement("div");
tempContainer.style.position = "fixed";
tempContainer.style.top = "50%";
tempContainer.style.left = "50%";
tempContainer.style.transform = "translate(-50%, -50%)";
tempContainer.style.zIndex = "9999";

// Клонируем элемент и помещаем клон в временный контейнер
const paramClone = paramName.cloneNode(true);
tempContainer.appendChild(paramClone);

// Добавляем временный контейнер на страницу
document.body.appendChild(tempContainer);

// Удаляем старый элемент
paramName.parentNode.removeChild(paramName);

// Обработчик события клика на клонированном элементе
paramClone.addEventListener("click", () => {
  console.log("Элемент был нажат");
});

// Ждем полной загрузки страницы
window.addEventListener("load", () => {
  // Получаем ссылку на целевой элемент, в который нужно переместить параметр
  const targetElement = document.querySelector("#target-element");

  // Перемещаем клонированный элемент в целевой элемент
  targetElement.appendChild(paramClone);

  // Удаляем временный контейнер
  tempContainer.parentNode.removeChild(tempContainer);
});
    }, 100);
                              item.on('hover:enter', function () {
                                  Lampa.Extensions.show({ store: 'http://skaztv.online/js/extensions.json',with_installed: true });
                                // Lampa.Settings.create('add_management_plugin');
                                 //Lampa.Controller.enabled().controller.back = function(){
                    // Lampa.Settings.create('interface');
                //}
                              });
			      
                        }
       });

})();
