(function() {
	'use strict';
	 var proto = location.protocol === "https:" ? 'https://' : 'http://'
/* Функция подбора сервера
		> задаём массив options с серверами
		> проверяем, передан ли функции извне параметр need (если true - возвращаем сервер под номером number)
		> randomIndex - псевдослучайное целое число в пределах длины массива (количества элементов массива)
		> randomOption - сервер выбранный случайно из массива options
		> возвращаем randomOption (случайно выбранный сервер)

	*/
function searchRandom(need, number){
	var options = [
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
	if (need) return options[number];
	var randomIndex = Math.floor(Math.random() * options.length);
	var randomOption = options[randomIndex];
	return randomOption
}
   function myRequest(i){
			setTimeout(function(){
				var myLink = proto + options[i] + ':8090';
				var xhr = new XMLHttpRequest();
				xhr.timeout = 3000;
				xhr.open("GET", myLink, true);
				xhr.send();
				xhr.ontimeout = function() {
					if (xhr.status == 401) {
						console.log ('TorrFree', options[i]);
					}
				}
			}, 1000)
}
function checkAlive(){
		for (var i = 0; i <= options.length - 1; i++) {	
			myRequest(i)
		}
}
	//checkAlive();

 var icon_server_redirect = '<svg width="256px" height="256px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 21.75C13.4142 21.75 13.75 21.4142 13.75 21C13.75 20.5858 13.4142 20.25 13 20.25V21.75ZM3.17157 19.8284L3.7019 19.2981H3.7019L3.17157 19.8284ZM20.8284 4.17157L20.2981 4.7019V4.7019L20.8284 4.17157ZM21.25 13C21.25 13.4142 21.5858 13.75 22 13.75C22.4142 13.75 22.75 13.4142 22.75 13H21.25ZM10 3.75H14V2.25H10V3.75ZM2.75 13V12H1.25V13H2.75ZM2.75 12V11H1.25V12H2.75ZM13 20.25H10V21.75H13V20.25ZM21.25 11V12H22.75V11H21.25ZM1.25 13C1.25 14.8644 1.24841 16.3382 1.40313 17.489C1.56076 18.6614 1.89288 19.6104 2.64124 20.3588L3.7019 19.2981C3.27869 18.8749 3.02502 18.2952 2.88976 17.2892C2.75159 16.2615 2.75 14.9068 2.75 13H1.25ZM10 20.25C8.09318 20.25 6.73851 20.2484 5.71085 20.1102C4.70476 19.975 4.12511 19.7213 3.7019 19.2981L2.64124 20.3588C3.38961 21.1071 4.33855 21.4392 5.51098 21.5969C6.66182 21.7516 8.13558 21.75 10 21.75V20.25ZM14 3.75C15.9068 3.75 17.2615 3.75159 18.2892 3.88976C19.2952 4.02502 19.8749 4.27869 20.2981 4.7019L21.3588 3.64124C20.6104 2.89288 19.6614 2.56076 18.489 2.40313C17.3382 2.24841 15.8644 2.25 14 2.25V3.75ZM22.75 11C22.75 9.13558 22.7516 7.66182 22.5969 6.51098C22.4392 5.33855 22.1071 4.38961 21.3588 3.64124L20.2981 4.7019C20.7213 5.12511 20.975 5.70476 21.1102 6.71085C21.2484 7.73851 21.25 9.09318 21.25 11H22.75ZM10 2.25C8.13558 2.25 6.66182 2.24841 5.51098 2.40313C4.33856 2.56076 3.38961 2.89288 2.64124 3.64124L3.7019 4.7019C4.12511 4.27869 4.70476 4.02502 5.71085 3.88976C6.73851 3.75159 8.09318 3.75 10 3.75V2.25ZM2.75 11C2.75 9.09318 2.75159 7.73851 2.88976 6.71085C3.02502 5.70476 3.27869 5.12511 3.7019 4.7019L2.64124 3.64124C1.89288 4.38961 1.56076 5.33855 1.40313 6.51098C1.24841 7.66182 1.25 9.13558 1.25 11H2.75ZM2 12.75H22V11.25H2V12.75ZM21.25 12V13H22.75V12H21.25Z" fill="currentColor"></path> <path d="M13.5 7.5L18 7.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 17.5L6 15.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 8.5L6 6.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9 17.5L9 15.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9 8.5L9 6.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15.5841 17.5H14.8341V17.5L15.5841 17.5ZM15.5841 18L15.0964 18.5698C15.3772 18.8101 15.7911 18.8101 16.0718 18.5698L15.5841 18ZM16.656 18.0698C16.9706 17.8004 17.0074 17.327 16.738 17.0123C16.4687 16.6976 15.9952 16.6609 15.6806 16.9302L16.656 18.0698ZM15.4877 16.9302C15.173 16.6609 14.6996 16.6976 14.4302 17.0123C14.1609 17.327 14.1976 17.8004 14.5123 18.0698L15.4877 16.9302ZM20.3892 16.6352C20.6296 16.9726 21.0979 17.0512 21.4352 16.8108C21.7726 16.5704 21.8512 16.1021 21.6108 15.7648L20.3892 16.6352ZM18.5048 14.25C16.5912 14.25 14.8341 15.5999 14.8341 17.5H16.3341C16.3341 16.6387 17.1923 15.75 18.5048 15.75V14.25ZM14.8341 17.5L14.8341 18L16.3341 18L16.3341 17.5L14.8341 17.5ZM16.0718 18.5698L16.656 18.0698L15.6806 16.9302L15.0964 17.4302L16.0718 18.5698ZM16.0718 17.4302L15.4877 16.9302L14.5123 18.0698L15.0964 18.5698L16.0718 17.4302ZM21.6108 15.7648C20.945 14.8304 19.782 14.25 18.5048 14.25V15.75C19.3411 15.75 20.0295 16.1304 20.3892 16.6352L21.6108 15.7648Z" fill="currentColor"></path> <path d="M18.4952 21V21.75V21ZM21.4159 18.5H22.1659H21.4159ZM21.4159 18L21.9036 17.4302C21.6228 17.1899 21.2089 17.1899 20.9282 17.4302L21.4159 18ZM20.344 17.9302C20.0294 18.1996 19.9926 18.673 20.262 18.9877C20.5313 19.3024 21.0048 19.3391 21.3194 19.0698L20.344 17.9302ZM21.5123 19.0698C21.827 19.3391 22.3004 19.3024 22.5698 18.9877C22.8391 18.673 22.8024 18.1996 22.4877 17.9302L21.5123 19.0698ZM16.6108 19.3648C16.3704 19.0274 15.9021 18.9488 15.5648 19.1892C15.2274 19.4296 15.1488 19.8979 15.3892 20.2352L16.6108 19.3648ZM18.4952 21.75C20.4088 21.75 22.1659 20.4001 22.1659 18.5H20.6659C20.6659 19.3613 19.8077 20.25 18.4952 20.25V21.75ZM22.1659 18.5V18H20.6659V18.5H22.1659ZM20.9282 17.4302L20.344 17.9302L21.3194 19.0698L21.9036 18.5698L20.9282 17.4302ZM20.9282 18.5698L21.5123 19.0698L22.4877 17.9302L21.9036 17.4302L20.9282 18.5698ZM15.3892 20.2352C16.055 21.1696 17.218 21.75 18.4952 21.75V20.25C17.6589 20.25 16.9705 19.8696 16.6108 19.3648L15.3892 20.2352Z" fill="currentColor"></path> </g></svg>'

 function switch_server() {
	
	$('#SWITCH_SERVER').remove()
	
	var domainSVG = icon_server_redirect
	var domainBUTT = '<div id="SWITCH_SERVER" class="head__action selector switch-screen">' + domainSVG + '</div>';
	
	$('#app > div.head > div > div.head__actions').append(domainBUTT);
	$('#SWITCH_SERVER').insertAfter('div[class="head__action selector open--settings"]');
       
	if(Lampa.Storage.get('switch_server_button') == false)
				setTimeout(function(){
                                  $('#SWITCH_SERVER').remove()
                                }, 10);
	}
	
	$('#SWITCH_SERVER').on('hover:enter hover:click hover:touch', function() {
		searchRandom();
	});
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
			Lampa.Storage.set('torrserver_use_link', 'two');
			var myResult = searchRandom();
			if (myResult !== 'undefined') Lampa.Storage.set('torrserver_url_two', 'http://' + myResult + ':8090');
		}
	}

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
						  $('div[data-name="torrserver_url_two"]').hide()
	                                          $('div[data-name="torrserver_url"]').hide()
						  $('div[data-name="torrserver_use_link"]').hide()
						  $('div > span:contains("Ссылки")').remove()
						  Lampa.Controller.toggle('settings_component');
						}
						if(Lampa.Storage.field('torrserv') == '0') {
						  $('div[data-name="torrserver_url_two"]').hide()
					          $('div[data-name="torrserver_use_link"]').hide()
						  Lampa.Controller.toggle('settings_component');
						}
					}, 0);
                }
   });
   Lampa.SettingsApi.addParam({
			component: 'server',
			param: {
				name: 'switch_server_button',
				type: 'trigger',
				default: false
			},
			field: {
				name: 'Кнопка для смены сервера',
				description: 'Параметр включает отображение кнопки в верхнем баре для быстрой смены сервера' 
			},
	                onChange: function (value) {
				   $('div[data-name="switch_server_button"]').insertAfter('div[data-name="torrserv"]');
				   if(Lampa.Storage.field('switch_server_button') == false) $('#SWITCH_SERVER').remove();
				   if(Lampa.Storage.field('switch_server_button') == true) switch_server();
				   
			}
	   
   });
   if(window.appready) switch_server();
	else {
		Lampa.Listener.follow('app', function(e) {
			if(e.type == 'ready') {
				switch_server();
			}
		});
	}
})();
