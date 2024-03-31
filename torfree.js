(function() {
	'use strict';
	 
/* Функция подбора сервера
		> задаём массив options с серверами
		> проверяем, передан ли функции извне параметр need (если true - возвращаем сервер под номером number)
		> randomIndex - псевдослучайное целое число в пределах длины массива (количества элементов массива)
		> randomOption - сервер выбранный случайно из массива options
		> возвращаем randomOption (случайно выбранный сервер)

	*/
	 var optionsNEW = [];  //новый массив из серверов, которые ответили
	 var options = [       //первоначальный массив
	        '77.85.90.90',
		'77.77.56.13',
		'77.91.84.212',
		'217.196.103.204',
		'212.113.106.25',
		'193.233.233.212',
		'193.233.233.154',
		'185.229.65.212',
		'185.229.65.121',
		'185.229.65.64',
		'176.124.198.211',
		'176.124.198.44',
		'94.228.165.242',
		'94.228.164.140',
		'94.228.163.64',
		'91.103.253.2',
		'89.208.107.216',
		'89.208.106.193',
		'91.103.252.89',
		'89.208.106.136',
		'89.208.104.178',
		'89.208.104.187',
		'85.192.41.41',
		'85.192.40.156',
		'80.85.241.6',
		'80.85.241.245',
		'79.137.207.228',
		'185.80.91.160',
		'5.42.77.194',
		'5.42.78.151',
		'5.42.79.63',
		'5.42.79.208',
		'5.42.80.21',
		'5.42.80.13',
		'5.42.80.209',
		'5.42.80.172',
		'5.42.82.10',
		'5.42.80.184',
		'5.42.80.204',
		'5.42.83.56',
		'5.42.83.90',
		'5.42.83.150',
		'5.42.86.187'
	];

/*  Функция рандомного выбора */
	
function searchRandom(need, number) {
	if (need) return options[number];
	var randomIndex = Math.floor(Math.random() * optionsNEW.length);
	var randomOption = optionsNEW[randomIndex];
	return randomOption
}

/* Функция опроса серверов */
	
function myRequest(i) {
	setTimeout(function() {
		var myLink = 'http://' + options[i] + ':8090';
		var xhr = new XMLHttpRequest();
		xhr.timeout = 2000; //тут сомневаюсь
		xhr.open("GET", myLink, true);
		xhr.send();
		xhr.onload = function() {
			if (xhr.status == 200) {
				optionsNEW.push(options[i]);  //формируем новый массив
			}
			if (xhr.status == 404) {
				console.log("FreeTorr", 'Сервер ' + options[i] + ' умер');
			}
			if (xhr.status == 401) {
				console.log("FreeTorr", 'Сервер ' + options[i] + ' запаролен');
			}
		}
		xhr.ontimeout = function() {
				console.log("FreeTorr", 'Сервер ' + options[i] + ' не ответил');
		}
		xhr.onerror = function() {
                                console.log("FreeTorr", 'Сервер ' + options[i] + ' отверг соединение или не существует');
		}
	}, 1000) // тут тоже, если будет много серверов, достаточно будет?
}

/* Функция чека каждого сервера через опрос на наличие доступности */

function checkAlive() {
	for (var i = 0; i <= options.length - 1; i++) {
		myRequest(i)
	}
}

/* Функция для отображения кнопки смены сервера в верхнем баре */
	
 var icon_switch_server = '<svg version="1.1" id="_x36_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon style="fill:none;" points="275.211,140.527 360.241,140.527 380.083,120.685 275.211,120.685 "></polygon> <polygon style="fill:none;" points="232.234,268.534 219.714,281.054 232.234,281.054 "></polygon> <g> <g> <rect x="232.254" y="69.157" style="fill:#718176;" width="42.982" height="377.465"></rect> <polygon style="fill:#718176;" points="56.146,446.588 76.861,489.564 232.234,489.564 232.234,446.588 "></polygon> <polygon style="fill:#718176;" points="275.21,446.588 275.21,489.564 435.111,489.564 455.826,446.588 "></polygon> <rect x="232.234" y="446.588" style="fill:#979696;" width="42.977" height="42.977"></rect> <path style="fill:#718176;" d="M511.972,7.837v105.05c0,4.315-3.485,7.8-7.8,7.8H7.8c-4.315,0-7.8-3.485-7.8-7.8V7.837 c0-4.315,3.485-7.799,7.8-7.799h496.372C508.487,0.037,511.972,3.522,511.972,7.837z"></path> <path style="fill:#718176;" d="M511.972,148.318v105.05c0,4.315-3.485,7.883-7.8,7.883H7.8c-4.315,0-7.8-3.568-7.8-7.883v-105.05 c0-4.315,3.485-7.8,7.8-7.8h496.372C508.487,140.518,511.972,144.003,511.972,148.318z"></path> <path style="fill:#718176;" d="M511.972,288.882v105.05c0,4.315-3.485,7.799-7.8,7.799H7.8c-4.315,0-7.8-3.484-7.8-7.799v-105.05 c0-4.314,3.485-7.799,7.8-7.799h496.372C508.487,281.082,511.972,284.568,511.972,288.882z"></path> <path style="fill:#FFFFFF;" d="M492.427,6.264H19.545c-7.351,0-13.31,5.959-13.31,13.31v81.539 c0,7.351,5.959,13.309,13.31,13.309h472.882c7.351,0,13.31-5.959,13.31-13.309V19.573 C505.737,12.222,499.778,6.264,492.427,6.264z"></path> <path style="fill:#FFFFFF;" d="M492.427,146.79H19.545c-7.351,0-13.31,5.959-13.31,13.31v81.539c0,7.351,5.959,13.31,13.31,13.31 h472.882c7.351,0,13.31-5.959,13.31-13.31V160.1C505.737,152.749,499.778,146.79,492.427,146.79z"></path> <path style="fill:#FFFFFF;" d="M492.427,287.318H19.545c-7.351,0-13.31,5.959-13.31,13.31v81.539 c0,7.351,5.959,13.31,13.31,13.31h472.882c7.351,0,13.31-5.959,13.31-13.31v-81.539 C505.737,293.276,499.778,287.318,492.427,287.318z"></path> <g> <g> <path style="fill:#718176;" d="M57.355,26.558H43.829c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V28.674C59.471,27.505,58.524,26.558,57.355,26.558z"></path> <path style="fill:#718176;" d="M57.355,52.308H43.829c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V54.424C59.471,53.256,58.524,52.308,57.355,52.308z"></path> <path style="fill:#718176;" d="M57.355,78.059H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V80.175C59.471,79.006,58.524,78.059,57.355,78.059z"></path> </g> <g> <path style="fill:#718176;" d="M89.021,26.558H75.495c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V28.674C91.137,27.505,90.19,26.558,89.021,26.558z"></path> <path style="fill:#718176;" d="M89.021,52.308H75.495c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V54.424C91.137,53.256,90.19,52.308,89.021,52.308z"></path> <path style="fill:#718176;" d="M89.021,78.059H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V80.175C91.137,79.006,90.19,78.059,89.021,78.059z"></path> </g> <g> <path style="fill:#718176;" d="M120.687,26.558h-13.525c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116V28.674 C122.804,27.505,121.856,26.558,120.687,26.558z"></path> <path style="fill:#718176;" d="M120.687,52.308h-13.525c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116V54.424 C122.804,53.256,121.856,52.308,120.687,52.308z"></path> <path style="fill:#718176;" d="M120.687,78.059h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116V80.175 C122.804,79.006,121.856,78.059,120.687,78.059z"></path> </g> <g> <path style="fill:#718176;" d="M152.354,26.558h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V28.674C154.47,27.505,153.522,26.558,152.354,26.558 z"></path> <path style="fill:#718176;" d="M152.354,52.308h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V54.424C154.47,53.256,153.522,52.308,152.354,52.308 z"></path> <path style="fill:#718176;" d="M152.354,78.059h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V80.175C154.47,79.006,153.522,78.059,152.354,78.059 z"></path> </g> <g> <path style="fill:#718176;" d="M184.02,26.558h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V28.674C186.136,27.505,185.188,26.558,184.02,26.558 z"></path> <path style="fill:#718176;" d="M184.02,52.308h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V54.424C186.136,53.256,185.188,52.308,184.02,52.308 z"></path> <path style="fill:#718176;" d="M184.02,78.059h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V80.175C186.136,79.006,185.188,78.059,184.02,78.059 z"></path> </g> </g> <rect x="225.104" y="49.742" style="fill:#979696;" width="100.213" height="21.202"></rect> <circle style="fill:#43B471;" cx="369.338" cy="61.198" r="19.487"></circle> <circle style="fill:#D3D340;" cx="416.663" cy="61.198" r="19.487"></circle> <circle style="fill:#D15075;" cx="463.989" cy="61.198" r="19.487"></circle> <g> <g> <path style="fill:#718176;" d="M57.355,167.084H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,168.032,58.524,167.084,57.355,167.084z"></path> <path style="fill:#718176;" d="M57.355,192.835H43.829c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,193.783,58.524,192.835,57.355,192.835z"></path> <path style="fill:#718176;" d="M57.355,218.585H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,219.533,58.524,218.585,57.355,218.585z"></path> </g> <g> <path style="fill:#718176;" d="M89.021,167.084H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C91.137,168.032,90.19,167.084,89.021,167.084z"></path> <path style="fill:#718176;" d="M89.021,192.835H75.495c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C91.137,193.783,90.19,192.835,89.021,192.835z"></path> <path style="fill:#718176;" d="M89.021,218.585H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C91.137,219.533,90.19,218.585,89.021,218.585z"></path> </g> <g> <path style="fill:#718176;" d="M120.687,167.084h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,168.032,121.856,167.084,120.687,167.084z"></path> <path style="fill:#718176;" d="M120.687,192.835h-13.525c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,193.783,121.856,192.835,120.687,192.835z"></path> <path style="fill:#718176;" d="M120.687,218.585h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,219.533,121.856,218.585,120.687,218.585z"></path> </g> <g> <path style="fill:#718176;" d="M152.354,167.084h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,168.032,153.522,167.084,152.354,167.084z"></path> <path style="fill:#718176;" d="M152.354,192.835h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,193.783,153.522,192.835,152.354,192.835z"></path> <path style="fill:#718176;" d="M152.354,218.585h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,219.533,153.522,218.585,152.354,218.585z"></path> </g> <g> <path style="fill:#718176;" d="M184.02,167.084h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,168.032,185.188,167.084,184.02,167.084z"></path> <path style="fill:#718176;" d="M184.02,192.835h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,193.783,185.188,192.835,184.02,192.835z"></path> <path style="fill:#718176;" d="M184.02,218.585h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,219.533,185.188,218.585,184.02,218.585z"></path> </g> </g> <rect x="225.104" y="190.269" style="fill:#979696;" width="100.213" height="21.202"></rect> <circle style="fill:#43B471;" cx="369.338" cy="201.725" r="19.487"></circle> <circle style="fill:#D3D340;" cx="416.663" cy="201.725" r="19.487"></circle> <circle style="fill:#D15075;" cx="463.989" cy="201.725" r="19.487"></circle> <g> <g> <path style="fill:#718176;" d="M57.355,307.611H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,308.559,58.524,307.611,57.355,307.611z"></path> <path style="fill:#718176;" d="M57.355,333.362H43.829c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.947,2.116-2.116v-13.548 C59.471,334.309,58.524,333.362,57.355,333.362z"></path> <path style="fill:#718176;" d="M57.355,359.112H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,360.06,58.524,359.112,57.355,359.112z"></path> </g> <g> <path style="fill:#718176;" d="M89.021,307.611H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C91.137,308.559,90.19,307.611,89.021,307.611z"></path> <path style="fill:#718176;" d="M89.021,333.362H75.495c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.947,2.116-2.116v-13.548 C91.137,334.309,90.19,333.362,89.021,333.362z"></path> <path style="fill:#718176;" d="M89.021,359.112H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548C91.137,360.06,90.19,359.112,89.021,359.112 z"></path> </g> <g> <path style="fill:#718176;" d="M120.687,307.611h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,308.559,121.856,307.611,120.687,307.611z"></path> <path style="fill:#718176;" d="M120.687,333.362h-13.525c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.947,2.116-2.116v-13.548 C122.804,334.309,121.856,333.362,120.687,333.362z"></path> <path style="fill:#718176;" d="M120.687,359.112h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,360.06,121.856,359.112,120.687,359.112z"></path> </g> <g> <path style="fill:#718176;" d="M152.354,307.611h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,308.559,153.522,307.611,152.354,307.611z"></path> <path style="fill:#718176;" d="M152.354,333.362h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.947,2.116-2.116v-13.548 C154.47,334.309,153.522,333.362,152.354,333.362z"></path> <path style="fill:#718176;" d="M152.354,359.112h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,360.06,153.522,359.112,152.354,359.112z"></path> </g> <g> <path style="fill:#718176;" d="M184.02,307.611h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,308.559,185.188,307.611,184.02,307.611z"></path> <path style="fill:#718176;" d="M184.02,333.362h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.947,2.116-2.116v-13.548 C186.136,334.309,185.188,333.362,184.02,333.362z"></path> <path style="fill:#718176;" d="M184.02,359.112h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,360.06,185.188,359.112,184.02,359.112z"></path> </g> </g> <rect x="225.104" y="330.796" style="fill:#979696;" width="100.213" height="21.202"></rect> <circle style="fill:#43B471;" cx="369.338" cy="342.252" r="19.487"></circle> <circle style="fill:#D3D340;" cx="416.663" cy="342.252" r="19.487"></circle> <circle style="fill:#D15075;" cx="463.989" cy="342.252" r="19.487"></circle> </g> <g style="opacity:0.5;"> <path style="opacity:0.07;fill:#040000;" d="M275.236,261.251v19.832h228.935c4.315,0,7.8,3.486,7.8,7.799v105.05 c0,4.315-3.485,7.799-7.8,7.799H275.236v44.891h180.559l-20.661,42.983H76.837L56.425,447.12l-0.249-0.497h176.078v-44.891 H98.992l55.512-55.512l20.91-20.827l44.31-44.31h12.53v-12.53l57.089-57.089l21.077-21.16l43.48-43.48l4.647-4.647l1.66-1.659 h143.966c4.315,0,7.8,3.485,7.8,7.8v105.05c0,4.315-3.485,7.883-7.8,7.883H275.236z"></path> <path style="opacity:0.07;fill:#040000;" d="M504.171,0h-3.403L380.083,120.685h124.088c4.324,0,7.829-3.505,7.829-7.828V7.829 C512,3.506,508.495,0,504.171,0z"></path> </g> </g> </g> </g></svg>'
 function switch_server() {

	
	var switch_serverSVG = icon_switch_server
	var switch_serverBUTT = '<div id="SWITCH_SERVER" class="head__action selector switch-screen">' + switch_serverSVG + '</div>';
	
	$('#app > div.head > div > div.head__actions').append(switch_serverBUTT);
	$('#SWITCH_SERVER').insertAfter('div[class="head__action selector open--settings"]');
       
	if(Lampa.Storage.get('switch_server_button') == 1) 
		setTimeout(function(){
                                  $('#SWITCH_SERVER').hide()
                                }, 1000);
	if(Lampa.Storage.get('switch_server_button') == 2) hideBut()
	if(Lampa.Storage.get('switch_server_button') == 3) $('#SWITCH_SERVER').show()
	
	
	$('#SWITCH_SERVER').on('hover:enter hover:click hover:touch', function() {
		//start_free(); // если делать через функцию, будет тайм-аут
		Lampa.Storage.set('torrserver_url_two', 'http://' + searchRandom() + ':8090');
		Lampa.Noty.show("Torrserver изменён")
	});
   } 

  function hideBut() {
	  
      setTimeout(function(){
                                  $('#SWITCH_SERVER').hide()
                                }, 1000);
	  
     /* Lampa.Listener.follow('full', function(e) {
            if (e.type == 'complite') {
		    $('.view--torrent').on('hover:enter', function() {
			setTimeout(function() {
                          $('#SWITCH_SERVER').show();
                        }, 10);
		    })
            }*/
	    
	  // else {
		//setTimeout(function() {
	         // $('#RELOAD').hide();
                //}, 1000)
	   // }
    //})   
  Lampa.Storage.listener.follow('change', function (event) {
    if (event.name == 'activity') {
      // условие = раздел Фильмы
      if (Lampa.Activity.active().component !== 'torrents') {
        // твои действия
	      setTimeout(function(){
	      $('#SWITCH_SERVER').hide();
		      }, 1000)
      }
      // условие = любой раздел который не Фильмы
      if (Lampa.Activity.active().component === 'torrents') {
        // твои действия
	      $('#SWITCH_SERVER').show();
      }
    }
  })

  }
	
   var tor_timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(tor_timer);
            start_free();
        }
    },100);

/* Видимо так
	> ставим метку tor_free - автовыбор сервера активен или нет?
	> ставим метку torrserv - вкл для параметра меню с выбором free серверов?
	> ставим по умолчанию дополнительную ссылку торрсервера
	*/
	function start_free(){
		/* Если параметр не существует в localStorage или Автовыбор, выставляем случайный сервер в Дополнительную ссылку*/
		if (localStorage.getItem('torrserv') === null || localStorage.getItem('torrserv') == 1) {
		    setTimeout(function() {  
			Lampa.Storage.set('torrserver_use_link', 'two');
			var myResult = searchRandom();
			if (myResult !== 'undefined') Lampa.Storage.set('torrserver_url_two', 'http://' + myResult + ':8090');
		    }, 3000) // без тайм-аута при старте приложения не успевает сформироваться новый массив
		}
	}

/* Создаем параметр для выбора сервера */
     Lampa.SettingsApi.addParam({
				component: 'server',
				param: {
					name: 'torrserv',
					type: 'select',
					values: {
					   0: 'Свой вариант',
                                           1: 'Автовыбор',
					/* 2: 'Torrserver 1',
                                           3: 'Torrserver 2',
                                           4: 'Torrserver 3',
                                           5: 'Torrserver 4',
                                           6: 'Torrserver 5',
                                           7: 'Torrserver 6',
                                           8: 'Torrserver 7',
                                           9: 'Torrserver 8',*/
					},
					default: 1
				},
				field: {
					name: '<div class="settings-folder" style="padding:0!important"><div style="width:1.3em;height:1.3em;padding-right:.1em"><svg version="1.1" id="_x36_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="256px" height="256px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon style="fill:none;" points="275.211,140.527 360.241,140.527 380.083,120.685 275.211,120.685 "></polygon> <polygon style="fill:none;" points="232.234,268.534 219.714,281.054 232.234,281.054 "></polygon> <g> <g> <rect x="232.254" y="69.157" style="fill:#718176;" width="42.982" height="377.465"></rect> <polygon style="fill:#718176;" points="56.146,446.588 76.861,489.564 232.234,489.564 232.234,446.588 "></polygon> <polygon style="fill:#718176;" points="275.21,446.588 275.21,489.564 435.111,489.564 455.826,446.588 "></polygon> <rect x="232.234" y="446.588" style="fill:#979696;" width="42.977" height="42.977"></rect> <path style="fill:#718176;" d="M511.972,7.837v105.05c0,4.315-3.485,7.8-7.8,7.8H7.8c-4.315,0-7.8-3.485-7.8-7.8V7.837 c0-4.315,3.485-7.799,7.8-7.799h496.372C508.487,0.037,511.972,3.522,511.972,7.837z"></path> <path style="fill:#718176;" d="M511.972,148.318v105.05c0,4.315-3.485,7.883-7.8,7.883H7.8c-4.315,0-7.8-3.568-7.8-7.883v-105.05 c0-4.315,3.485-7.8,7.8-7.8h496.372C508.487,140.518,511.972,144.003,511.972,148.318z"></path> <path style="fill:#718176;" d="M511.972,288.882v105.05c0,4.315-3.485,7.799-7.8,7.799H7.8c-4.315,0-7.8-3.484-7.8-7.799v-105.05 c0-4.314,3.485-7.799,7.8-7.799h496.372C508.487,281.082,511.972,284.568,511.972,288.882z"></path> <path style="fill:#FFFFFF;" d="M492.427,6.264H19.545c-7.351,0-13.31,5.959-13.31,13.31v81.539 c0,7.351,5.959,13.309,13.31,13.309h472.882c7.351,0,13.31-5.959,13.31-13.309V19.573 C505.737,12.222,499.778,6.264,492.427,6.264z"></path> <path style="fill:#FFFFFF;" d="M492.427,146.79H19.545c-7.351,0-13.31,5.959-13.31,13.31v81.539c0,7.351,5.959,13.31,13.31,13.31 h472.882c7.351,0,13.31-5.959,13.31-13.31V160.1C505.737,152.749,499.778,146.79,492.427,146.79z"></path> <path style="fill:#FFFFFF;" d="M492.427,287.318H19.545c-7.351,0-13.31,5.959-13.31,13.31v81.539 c0,7.351,5.959,13.31,13.31,13.31h472.882c7.351,0,13.31-5.959,13.31-13.31v-81.539 C505.737,293.276,499.778,287.318,492.427,287.318z"></path> <g> <g> <path style="fill:#718176;" d="M57.355,26.558H43.829c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V28.674C59.471,27.505,58.524,26.558,57.355,26.558z"></path> <path style="fill:#718176;" d="M57.355,52.308H43.829c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V54.424C59.471,53.256,58.524,52.308,57.355,52.308z"></path> <path style="fill:#718176;" d="M57.355,78.059H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V80.175C59.471,79.006,58.524,78.059,57.355,78.059z"></path> </g> <g> <path style="fill:#718176;" d="M89.021,26.558H75.495c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V28.674C91.137,27.505,90.19,26.558,89.021,26.558z"></path> <path style="fill:#718176;" d="M89.021,52.308H75.495c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V54.424C91.137,53.256,90.19,52.308,89.021,52.308z"></path> <path style="fill:#718176;" d="M89.021,78.059H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V80.175C91.137,79.006,90.19,78.059,89.021,78.059z"></path> </g> <g> <path style="fill:#718176;" d="M120.687,26.558h-13.525c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116V28.674 C122.804,27.505,121.856,26.558,120.687,26.558z"></path> <path style="fill:#718176;" d="M120.687,52.308h-13.525c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116V54.424 C122.804,53.256,121.856,52.308,120.687,52.308z"></path> <path style="fill:#718176;" d="M120.687,78.059h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116V80.175 C122.804,79.006,121.856,78.059,120.687,78.059z"></path> </g> <g> <path style="fill:#718176;" d="M152.354,26.558h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V28.674C154.47,27.505,153.522,26.558,152.354,26.558 z"></path> <path style="fill:#718176;" d="M152.354,52.308h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V54.424C154.47,53.256,153.522,52.308,152.354,52.308 z"></path> <path style="fill:#718176;" d="M152.354,78.059h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V80.175C154.47,79.006,153.522,78.059,152.354,78.059 z"></path> </g> <g> <path style="fill:#718176;" d="M184.02,26.558h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V28.674C186.136,27.505,185.188,26.558,184.02,26.558 z"></path> <path style="fill:#718176;" d="M184.02,52.308h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V54.424C186.136,53.256,185.188,52.308,184.02,52.308 z"></path> <path style="fill:#718176;" d="M184.02,78.059h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116V80.175C186.136,79.006,185.188,78.059,184.02,78.059 z"></path> </g> </g> <rect x="225.104" y="49.742" style="fill:#979696;" width="100.213" height="21.202"></rect> <circle style="fill:#43B471;" cx="369.338" cy="61.198" r="19.487"></circle> <circle style="fill:#D3D340;" cx="416.663" cy="61.198" r="19.487"></circle> <circle style="fill:#D15075;" cx="463.989" cy="61.198" r="19.487"></circle> <g> <g> <path style="fill:#718176;" d="M57.355,167.084H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,168.032,58.524,167.084,57.355,167.084z"></path> <path style="fill:#718176;" d="M57.355,192.835H43.829c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,193.783,58.524,192.835,57.355,192.835z"></path> <path style="fill:#718176;" d="M57.355,218.585H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,219.533,58.524,218.585,57.355,218.585z"></path> </g> <g> <path style="fill:#718176;" d="M89.021,167.084H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C91.137,168.032,90.19,167.084,89.021,167.084z"></path> <path style="fill:#718176;" d="M89.021,192.835H75.495c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C91.137,193.783,90.19,192.835,89.021,192.835z"></path> <path style="fill:#718176;" d="M89.021,218.585H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C91.137,219.533,90.19,218.585,89.021,218.585z"></path> </g> <g> <path style="fill:#718176;" d="M120.687,167.084h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,168.032,121.856,167.084,120.687,167.084z"></path> <path style="fill:#718176;" d="M120.687,192.835h-13.525c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,193.783,121.856,192.835,120.687,192.835z"></path> <path style="fill:#718176;" d="M120.687,218.585h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,219.533,121.856,218.585,120.687,218.585z"></path> </g> <g> <path style="fill:#718176;" d="M152.354,167.084h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,168.032,153.522,167.084,152.354,167.084z"></path> <path style="fill:#718176;" d="M152.354,192.835h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,193.783,153.522,192.835,152.354,192.835z"></path> <path style="fill:#718176;" d="M152.354,218.585h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,219.533,153.522,218.585,152.354,218.585z"></path> </g> <g> <path style="fill:#718176;" d="M184.02,167.084h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,168.032,185.188,167.084,184.02,167.084z"></path> <path style="fill:#718176;" d="M184.02,192.835h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,193.783,185.188,192.835,184.02,192.835z"></path> <path style="fill:#718176;" d="M184.02,218.585h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,219.533,185.188,218.585,184.02,218.585z"></path> </g> </g> <rect x="225.104" y="190.269" style="fill:#979696;" width="100.213" height="21.202"></rect> <circle style="fill:#43B471;" cx="369.338" cy="201.725" r="19.487"></circle> <circle style="fill:#D3D340;" cx="416.663" cy="201.725" r="19.487"></circle> <circle style="fill:#D15075;" cx="463.989" cy="201.725" r="19.487"></circle> <g> <g> <path style="fill:#718176;" d="M57.355,307.611H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,308.559,58.524,307.611,57.355,307.611z"></path> <path style="fill:#718176;" d="M57.355,333.362H43.829c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.947,2.116-2.116v-13.548 C59.471,334.309,58.524,333.362,57.355,333.362z"></path> <path style="fill:#718176;" d="M57.355,359.112H43.829c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C59.471,360.06,58.524,359.112,57.355,359.112z"></path> </g> <g> <path style="fill:#718176;" d="M89.021,307.611H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C91.137,308.559,90.19,307.611,89.021,307.611z"></path> <path style="fill:#718176;" d="M89.021,333.362H75.495c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.947,2.116-2.116v-13.548 C91.137,334.309,90.19,333.362,89.021,333.362z"></path> <path style="fill:#718176;" d="M89.021,359.112H75.495c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548C91.137,360.06,90.19,359.112,89.021,359.112 z"></path> </g> <g> <path style="fill:#718176;" d="M120.687,307.611h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,308.559,121.856,307.611,120.687,307.611z"></path> <path style="fill:#718176;" d="M120.687,333.362h-13.525c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.947,2.116-2.116v-13.548 C122.804,334.309,121.856,333.362,120.687,333.362z"></path> <path style="fill:#718176;" d="M120.687,359.112h-13.525c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.948,2.116,2.116,2.116h13.525c1.169,0,2.116-0.948,2.116-2.116v-13.548 C122.804,360.06,121.856,359.112,120.687,359.112z"></path> </g> <g> <path style="fill:#718176;" d="M152.354,307.611h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,308.559,153.522,307.611,152.354,307.611z"></path> <path style="fill:#718176;" d="M152.354,333.362h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.947,2.116-2.116v-13.548 C154.47,334.309,153.522,333.362,152.354,333.362z"></path> <path style="fill:#718176;" d="M152.354,359.112h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C154.47,360.06,153.522,359.112,152.354,359.112z"></path> </g> <g> <path style="fill:#718176;" d="M184.02,307.611h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,308.559,185.188,307.611,184.02,307.611z"></path> <path style="fill:#718176;" d="M184.02,333.362h-13.526c-1.169,0-2.116,0.947-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.947,2.116-2.116v-13.548 C186.136,334.309,185.188,333.362,184.02,333.362z"></path> <path style="fill:#718176;" d="M184.02,359.112h-13.526c-1.169,0-2.116,0.948-2.116,2.116v13.548 c0,1.169,0.947,2.116,2.116,2.116h13.526c1.169,0,2.116-0.948,2.116-2.116v-13.548 C186.136,360.06,185.188,359.112,184.02,359.112z"></path> </g> </g> <rect x="225.104" y="330.796" style="fill:#979696;" width="100.213" height="21.202"></rect> <circle style="fill:#43B471;" cx="369.338" cy="342.252" r="19.487"></circle> <circle style="fill:#D3D340;" cx="416.663" cy="342.252" r="19.487"></circle> <circle style="fill:#D15075;" cx="463.989" cy="342.252" r="19.487"></circle> </g> <g style="opacity:0.5;"> <path style="opacity:0.07;fill:#040000;" d="M275.236,261.251v19.832h228.935c4.315,0,7.8,3.486,7.8,7.799v105.05 c0,4.315-3.485,7.799-7.8,7.799H275.236v44.891h180.559l-20.661,42.983H76.837L56.425,447.12l-0.249-0.497h176.078v-44.891 H98.992l55.512-55.512l20.91-20.827l44.31-44.31h12.53v-12.53l57.089-57.089l21.077-21.16l43.48-43.48l4.647-4.647l1.66-1.659 h143.966c4.315,0,7.8,3.485,7.8,7.8v105.05c0,4.315-3.485,7.883-7.8,7.883H275.236z"></path> <path style="opacity:0.07;fill:#040000;" d="M504.171,0h-3.403L380.083,120.685h124.088c4.324,0,7.829-3.505,7.829-7.828V7.829 C512,3.506,508.495,0,504.171,0z"></path> </g> </g> </g> </g></svg></div><div style="font-size:1.0em"><div style="padding: 0.3em 0.3em; padding-top: 0;"><div style="background: #d99821; padding: 0.5em; border-radius: 0.4em;"><div style="line-height: 0.3;">Free TorrServer</div></div></div></div></div>',
					description: 'Нажмите для смены сервера'
				},
				onChange: function (value) {
                    /* Если  Не выбран */
					if (value == '0') {
                                                Lampa.Storage.set('torrserver_use_link', 'one');                                               
                                                Lampa.Storage.set('torrserver_url_two', ''); 
                                                Lampa.Settings.update();
                                                return;
                                        }
					/* Если  Автовыбор */
					if (value == '1') {
						Lampa.Storage.set('torrserver_use_link', 'two');
						Lampa.Storage.set('torrserver_url_two', 'http://' + searchRandom() + ':8090');
						Lampa.Settings.update();
						return;
					}
					/* Если  выбран любой сервер */
					/*if (value > 1) {
						Lampa.Storage.set('torrserver_use_link', 'two');
						Lampa.Storage.set('torrserver_url_two', 'http://' + searchRandom(true, value) + ':8090');
						Lampa.Settings.update();
					};*/
				},
				onRender: function (item) {
					setTimeout(function() {
						if($('div[data-name="torrserv"]').length > 1) item.hide();
						$('.settings-param__name', item).css('color','ffffff');
						$('div[data-name="torrserv"]').insertAfter('div[data-name="torrserver_use_link"]');
						if(Lampa.Storage.field('torrserv') == '1') {
						 var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div > div:nth-child(2)")
                                                  Lampa.Controller.focus(M)
                                                  Lampa.Controller.toggle('settings_component')
						  $('div[data-name="torrserver_url_two"]').hide()
	                                          $('div[data-name="torrserver_url"]').hide()
						  $('div[data-name="torrserver_use_link"]').hide()
						  $('div > span:contains("Ссылки")').remove()
						}
						if(Lampa.Storage.field('torrserv') == '0') {
						 var M = document.querySelector("#app > div.settings > div.settings__content.layer--height > div.settings__body > div > div > div > div > div > div:nth-child(2)")
                                                  Lampa.Controller.focus(M)
                                                  Lampa.Controller.toggle('settings_component')
						  $('div[data-name="torrserver_url_two"]').hide()
					          $('div[data-name="torrserver_use_link"]').hide()
						}
					}, 0);
                }
   });

/* Создаем параметр для отображения кнопки смены сервера*/
   Lampa.SettingsApi.addParam({
			component: 'server',
			param: {
				name: 'switch_server_button',
				type: 'select',
				values: {
							1:	'Не показывать',
							2:	'Показывать только в торрентах',
					                3:      'Показывать всегда',
						},
                                   default: '1',
                                   },
			field: {
				name: 'Кнопка для смены сервера',
				description: 'Параметр включает отображение кнопки в верхнем баре для быстрой смены сервера' 
			},
	                onChange: function (value) {

			     if (value == '1') {
                                $('#SWITCH_SERVER').hide();
                              }
                              if (value == '2') {
                                hideBut();
			      }
			      if (value == '3') {
                                $('#SWITCH_SERVER').show();
			      }
				   
			},
	                onRender: function (item) {
					setTimeout(function() {
	                                  $('div[data-name="switch_server_button"]').insertAfter('div[data-name="torrserver_url"]');
			                 }, 0);
			}
   });

   if(window.appready) {switch_server(); checkAlive();}
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				switch_server();
				checkAlive();
			}
		});
	}
})();
