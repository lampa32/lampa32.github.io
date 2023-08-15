(function() {
	'use strict';
  	var RuTubeSVG = '<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_923_32857)"><rect width="511.998" height="511.998" rx="108.623" fill="#0B1D38"/><g filter="url(#filter0_d_923_32857)"><circle cx="419.52" cy="110" r="32.3481" fill="#F41240"/></g><g filter="url(#filter1_d_923_32857)"><path d="M323.396 138.772H96.0543V391.5H159.331V309.278H280.58L335.9 391.5H406.755L345.751 308.899C364.696 305.868 378.337 298.669 386.673 287.302C395.009 275.935 399.177 257.747 399.177 233.498V214.552C399.177 200.154 397.661 188.787 395.009 180.072C392.356 171.358 387.809 163.779 381.368 156.959C374.548 150.518 366.97 145.971 357.876 142.94C348.782 140.287 337.415 138.772 323.396 138.772ZM313.166 253.579H159.331V194.471H313.166C321.88 194.471 327.943 195.986 330.974 198.639C334.005 201.291 335.9 206.217 335.9 213.416V234.634C335.9 242.212 334.005 247.138 330.974 249.79C327.943 252.443 321.88 253.579 313.166 253.579Z" fill="white"/></g><g filter="url(#filter2_f_923_32857)"><rect x="13.8589" y="12.9448" width="484.045" height="485.344" rx="96.9086" stroke="black" stroke-opacity="0.65" stroke-width="6.38958"/></g></g><rect x="6.96719" y="6.96719" width="498.064" height="498.064" rx="101.656" stroke="white" stroke-width="13.9344"/><defs><filter id="filter0_d_923_32857" x="378.652" y="77.6523" width="81.7342" height="81.7342" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="8.51943"/><feGaussianBlur stdDeviation="4.25972"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_923_32857"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_923_32857" result="shape"/></filter><filter id="filter1_d_923_32857" x="87.5353" y="138.771" width="327.742" height="269.767" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="8.51943"/><feGaussianBlur stdDeviation="4.25972"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_923_32857"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_923_32857" result="shape"/></filter><filter id="filter2_f_923_32857" x="-6.3748" y="-7.28887" width="524.515" height="525.812" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="8.51943" result="effect1_foregroundBlur_923_32857"/></filter><clipPath id="clip0_923_32857"><rect width="511.998" height="511.998" rx="108.623" fill="white"/></clipPath></defs></svg>'
			var rutubemenu = $('<li id="RuTubeButton"  class="menu__item selector hide"><div class="menu__ico">' + RuTubeSVG + '</div><div class="menu__text" >RuTube</div></li>');
			$('.menu .menu__list').eq(0).append(rutubemenu)
			if(Lampa.Storage.field('RuTube') == true) {
				$('#RuTubeButton').removeClass('hide');
			}
			rutubemenu.on('hover:enter', function() {
				//window.location.href = 'https://youtube.com/tv'
					if (Lampa.Platform.is('webos')) {
						window.location.href = 'https://bit.ly/3DnLr2O'
					}
					if (Lampa.Platform.is('tizen')) {
						var rutubeurl = 'https://bit.ly/3RcgRPq'
						//window.location.href = 'https://bit.ly/3RcgRPq'
						var e = new tizen.ApplicationControl("https://tizen.org/appcontrol/operation/view", rutubeurl);
						tizen.application.launchAppControl(e, null, function () {}, function (e) {
						Lampa.Noty.show(e);})						
						//window.location.href = 'https://bit.ly/3RcgRPq'
					} 
					else window.open(url, '_blank'); //Android.openYoutube(a.id) else YouTube.play(a.id)
			})
})();
