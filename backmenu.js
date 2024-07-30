(function () {
    'use strict';

    
function back_menu(){

    var exit = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></div><div style="font-size:1.3em">Закрыть приложение</div></div>'
    var reboot = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg viewBox="0 0 22 22" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" id="svg4183" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <metadata id="metadata4188"> <rdf:rdf> <cc:work> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> <dc:date>2021</dc:date> <dc:creator> <cc:agent> <dc:title>Timothée Giet</dc:title> </cc:agent> </dc:creator> <cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/"></cc:license> </cc:work> <cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"> <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"></cc:permits> <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"></cc:permits> <cc:requires rdf:resource="http://creativecommons.org/ns#Notice"></cc:requires> <cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"></cc:requires> <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"></cc:permits> <cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike"></cc:requires> </cc:license> </rdf:rdf> </metadata> <g id="layer1" transform="rotate(-90 -504.181 526.181)"> <path style="opacity:1;vector-effect:none;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:4;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:3.20000005;stroke-opacity:.55063291" d="M11 2a9 9 0 0 0-4.676 1.324l1.461 1.461A7 7 0 0 1 11 4a7 7 0 0 1 7 7 7 7 0 0 1-.787 3.213l1.465 1.465A9 9 0 0 0 20 11a9 9 0 0 0-9-9zM3.322 6.322A9 9 0 0 0 2 11a9 9 0 0 0 9 9 9 9 0 0 0 4.676-1.324l-1.461-1.461A7 7 0 0 1 11 18a7 7 0 0 1-7-7 7 7 0 0 1 .787-3.213z" transform="translate(0 1030.362)" id="path840"></path> <path style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m7 1034.362 3 3 1-1-3-3z" id="path850"></path> <path style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m11 1046.362 3 3 1-1-3-3z" id="path850-3"></path> </g> </g></svg></div><div style="font-size:1.3em">Перезагрузить</div></div>'
    var switch_server = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 3.75C10.4142 3.75 10.75 3.41421 10.75 3C10.75 2.58579 10.4142 2.25 10 2.25V3.75ZM14 2.25C13.5858 2.25 13.25 2.58579 13.25 3C13.25 3.41421 13.5858 3.75 14 3.75V2.25ZM13 21.75C13.4142 21.75 13.75 21.4142 13.75 21C13.75 20.5858 13.4142 20.25 13 20.25V21.75ZM3.17157 19.8284L3.7019 19.2981H3.7019L3.17157 19.8284ZM20.8284 4.17157L20.2981 4.7019V4.7019L20.8284 4.17157ZM21.25 13C21.25 13.4142 21.5858 13.75 22 13.75C22.4142 13.75 22.75 13.4142 22.75 13H21.25ZM14 12.75C14.4142 12.75 14.75 12.4142 14.75 12C14.75 11.5858 14.4142 11.25 14 11.25V12.75ZM18 11.25C17.5858 11.25 17.25 11.5858 17.25 12C17.25 12.4142 17.5858 12.75 18 12.75V11.25ZM2.75 13V12H1.25V13H2.75ZM2.75 12V11H1.25V12H2.75ZM13 20.25H10V21.75H13V20.25ZM21.25 11V12H22.75V11H21.25ZM1.25 13C1.25 14.8644 1.24841 16.3382 1.40313 17.489C1.56076 18.6614 1.89288 19.6104 2.64124 20.3588L3.7019 19.2981C3.27869 18.8749 3.02502 18.2952 2.88976 17.2892C2.75159 16.2615 2.75 14.9068 2.75 13H1.25ZM10 20.25C8.09318 20.25 6.73851 20.2484 5.71085 20.1102C4.70476 19.975 4.12511 19.7213 3.7019 19.2981L2.64124 20.3588C3.38961 21.1071 4.33855 21.4392 5.51098 21.5969C6.66182 21.7516 8.13558 21.75 10 21.75V20.25ZM14 3.75C15.9068 3.75 17.2615 3.75159 18.2892 3.88976C19.2952 4.02502 19.8749 4.27869 20.2981 4.7019L21.3588 3.64124C20.6104 2.89288 19.6614 2.56076 18.489 2.40313C17.3382 2.24841 15.8644 2.25 14 2.25V3.75ZM22.75 11C22.75 9.13558 22.7516 7.66182 22.5969 6.51098C22.4392 5.33855 22.1071 4.38961 21.3588 3.64124L20.2981 4.7019C20.7213 5.12511 20.975 5.70476 21.1102 6.71085C21.2484 7.73851 21.25 9.09318 21.25 11H22.75ZM10 2.25C8.13558 2.25 6.66182 2.24841 5.51098 2.40313C4.33856 2.56076 3.38961 2.89288 2.64124 3.64124L3.7019 4.7019C4.12511 4.27869 4.70476 4.02502 5.71085 3.88976C6.73851 3.75159 8.09318 3.75 10 3.75V2.25ZM2.75 11C2.75 9.09318 2.75159 7.73851 2.88976 6.71085C3.02502 5.70476 3.27869 5.12511 3.7019 4.7019L2.64124 3.64124C1.89288 4.38961 1.56076 5.33855 1.40313 6.51098C1.24841 7.66182 1.25 9.13558 1.25 11H2.75ZM21.25 12V13H22.75V12H21.25ZM2 12.75H14V11.25H2V12.75ZM18 12.75H22V11.25H18V12.75Z" fill="#ffffff"></path> <path d="M13.5 7.5L18 7.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 17.5L6 15.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M6 8.5L6 6.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9 17.5L9 15.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M9 8.5L9 6.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15.5841 17.5H14.8341V17.5L15.5841 17.5ZM15.5841 18L15.0964 18.5698C15.3772 18.8101 15.7911 18.8101 16.0718 18.5698L15.5841 18ZM16.656 18.0698C16.9706 17.8004 17.0074 17.327 16.738 17.0123C16.4687 16.6976 15.9952 16.6609 15.6806 16.9302L16.656 18.0698ZM15.4877 16.9302C15.173 16.6609 14.6996 16.6976 14.4302 17.0123C14.1609 17.327 14.1976 17.8004 14.5123 18.0698L15.4877 16.9302ZM20.3892 16.6352C20.6296 16.9726 21.0979 17.0512 21.4352 16.8108C21.7726 16.5704 21.8512 16.1021 21.6108 15.7648L20.3892 16.6352ZM18.5048 14.25C16.5912 14.25 14.8341 15.5999 14.8341 17.5H16.3341C16.3341 16.6387 17.1923 15.75 18.5048 15.75V14.25ZM14.8341 17.5L14.8341 18L16.3341 18L16.3341 17.5L14.8341 17.5ZM16.0718 18.5698L16.656 18.0698L15.6806 16.9302L15.0964 17.4302L16.0718 18.5698ZM16.0718 17.4302L15.4877 16.9302L14.5123 18.0698L15.0964 18.5698L16.0718 17.4302ZM21.6108 15.7648C20.945 14.8304 19.782 14.25 18.5048 14.25V15.75C19.3411 15.75 20.0295 16.1304 20.3892 16.6352L21.6108 15.7648Z" fill="#ffffff"></path> <path d="M18.4952 21V21.75V21ZM21.4159 18.5H22.1659H21.4159ZM21.4159 18L21.9036 17.4302C21.6228 17.1899 21.2089 17.1899 20.9282 17.4302L21.4159 18ZM20.344 17.9302C20.0294 18.1996 19.9926 18.673 20.262 18.9877C20.5313 19.3024 21.0048 19.3391 21.3194 19.0698L20.344 17.9302ZM21.5123 19.0698C21.827 19.3391 22.3004 19.3024 22.5698 18.9877C22.8391 18.673 22.8024 18.1996 22.4877 17.9302L21.5123 19.0698ZM16.6108 19.3648C16.3704 19.0274 15.9021 18.9488 15.5648 19.1892C15.2274 19.4296 15.1488 19.8979 15.3892 20.2352L16.6108 19.3648ZM18.4952 21.75C20.4088 21.75 22.1659 20.4001 22.1659 18.5H20.6659C20.6659 19.3613 19.8077 20.25 18.4952 20.25V21.75ZM22.1659 18.5V18H20.6659V18.5H22.1659ZM20.9282 17.4302L20.344 17.9302L21.3194 19.0698L21.9036 18.5698L20.9282 17.4302ZM20.9282 18.5698L21.5123 19.0698L22.4877 17.9302L21.9036 17.4302L20.9282 18.5698ZM15.3892 20.2352C16.055 21.1696 17.218 21.75 18.4952 21.75V20.25C17.6589 20.25 16.9705 19.8696 16.6108 19.3648L15.3892 20.2352Z" fill="#ffffff"></path> </g></svg></div><div style="font-size:1.3em">Сменить сервер</div></div>'
    var clear_cache = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 48 48" id="b" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="1.968"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.t{fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;}</style></defs><circle id="c" class="t" cx="36.096" cy="22.6536" r="1.3931"></circle><circle id="d" class="t" cx="40.2225" cy="26.8135" r="1.6717"></circle><path id="e" class="t" d="m12.2134,10.4649l11.3032,1.9794"></path><path id="f" class="t" d="m15.5471,14.4757l7.3445,1.3022"></path><path id="g" class="t" d="m13.4115,17.3406l8.9592,1.5627"></path><path id="h" class="t" d="m28.9503,31.9961l-.2768-3.4044c-.6946-4.6049-6.0126-5.7231-7.657-1.2762-1.8215,3.7646-8.3136,7.2818-15.4182,8.1518,2.8623,9.2457,18.1701,7.426,20.2625,4.7401"></path><path id="i" class="t" d="m26.9545,34.7903c-4.9816,2.8272-.2458,7.5687,2.6044,5.7297,2.0714,2.7765,6.4689,2.2491,7.5008.1563,5.8857,2.6255,7.2368-5.5731,2.3961-6.3027-1.076-3.7607-4.9677-4.4122-7.2924-2.1356-1.9877-.4898-4.0291-1.2665-5.2089,2.5524Z"></path><path id="j" class="t" d="m9.2965,17.4072v1.5105"></path><path id="k" class="t" d="m9.2965,21.2702v1.5106"></path><path id="l" class="t" d="m10.5248,20.094l1.5105.0522"></path><path id="m" class="t" d="m6.6618,20.1461h1.5106"></path><path id="n" class="t" d="m14.0712,27.9419l1.0313,1.105m0-3.8734l-1.0682,1.0681m-2.7315-.9945l1.0681,1.0681m0,1.5898l-1.0681,1.0682"></path><path id="o" class="t" d="m21.0164,27.3156c2.3279,1.9405,4.9381,1.9753,7.657,1.2762"></path><path id="p" class="t" d="m10.9776,41.135c5.6948-1.9298,9.2192-4.403,11.1848-7.2823"></path><path id="q" class="t" d="m22.1103,38.4886c-1.116,1.5442-2.4716,2.8254-4.7661,3.8785"></path><path id="r" class="t" d="m7.1015,38.3102c3.2416-.0909,5.7762-1.2165,8.2373-2.4782"></path><path id="s" class="t" d="m23.712,24.6163l3.2165-17.1726c.448-2.9721,3.9476-2.1183,3.2685.573l-3.3643,17.2741"></path></g></svg></div><div style="font-size:1.3em">Очистить кэш</div></div>'
    var youtube = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="1.464"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5949 4.45999C21.5421 4.71353 22.2865 5.45785 22.54 6.40501C22.9982 8.12001 23 11.7004 23 11.7004C23 11.7004 23 15.2807 22.54 16.9957C22.2865 17.9429 21.5421 18.6872 20.5949 18.9407C18.88 19.4007 12 19.4007 12 19.4007C12 19.4007 5.12001 19.4007 3.405 18.9407C2.45785 18.6872 1.71353 17.9429 1.45999 16.9957C1 15.2807 1 11.7004 1 11.7004C1 11.7004 1 8.12001 1.45999 6.40501C1.71353 5.45785 2.45785 4.71353 3.405 4.45999C5.12001 4 12 4 12 4C12 4 18.88 4 20.5949 4.45999ZM15.5134 11.7007L9.79788 15.0003V8.40101L15.5134 11.7007Z" stroke="#ffffff" stroke-linejoin="round"></path> </g></svg></div><div style="font-size:1.3em">YouTube</div></div>'
    var rutube = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M128.689 47.57H20.396v116.843h30.141V126.4h57.756l26.352 38.013h33.75l-29.058-38.188c9.025-1.401 15.522-4.73 19.493-9.985 3.97-5.255 5.956-13.664 5.956-24.875v-8.759c0-6.657-.721-11.912-1.985-15.941-1.264-4.029-3.43-7.533-6.498-10.686-3.249-2.978-6.858-5.08-11.19-6.481-4.332-1.226-9.747-1.927-16.424-1.927zm-4.873 53.08H50.537V73.321h73.279c4.15 0 7.038.7 8.482 1.927 1.444 1.226 2.347 3.503 2.347 6.832v9.81c0 3.503-.903 5.78-2.347 7.006s-4.331 1.752-8.482 1.752z" style="display:inline;fill:none;stroke:#ffffff;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" transform="translate(1.605 -1.99)"></path><path fill="#ffffff" d="M162.324 45.568c5.52 0 9.998-4.477 9.998-10s-4.478-10-9.998-10c-5.524 0-10.002 4.477-10.002 10s4.478 10 10.002 10z" style="display:inline;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:10.6667;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1" transform="translate(1.605 -1.99)"></path></g></svg></div><div style="font-size:1.3em">RuTube</div></div>'
    var drm_play = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg fill="#ffffff" width="256px" height="256px" viewBox="0 -6 46 46" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="2.3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="_24.TV" data-name="24.TV" d="M46,37H2a1,1,0,0,1-1-1V8A1,1,0,0,1,2,7H46a1,1,0,0,1,1,1V36A1,1,0,0,1,46,37ZM45,9H3V35H45ZM21,16a.975.975,0,0,1,.563.2l7.771,4.872a.974.974,0,0,1,.261,1.715l-7.974,4.981A.982.982,0,0,1,21,28a1,1,0,0,1-1-1V17A1,1,0,0,1,21,16ZM15,39H33a1,1,0,0,1,0,2H15a1,1,0,0,1,0-2Z" transform="translate(-1 -7)" fill-rule="evenodd"></path> </g></svg></div><div style="font-size:1.3em">DRM Play</div></div>'
    var tik_tok = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:1.89px;}</style></defs><path class="cls-1" d="M12.94,1.61V15.78a2.83,2.83,0,0,1-2.83,2.83h0a2.83,2.83,0,0,1-2.83-2.83h0a2.84,2.84,0,0,1,2.83-2.84h0V9.17h0A6.61,6.61,0,0,0,3.5,15.78h0a6.61,6.61,0,0,0,6.61,6.61h0a6.61,6.61,0,0,0,6.61-6.61V9.17l.2.1a8.08,8.08,0,0,0,3.58.84h0V6.33l-.11,0a4.84,4.84,0,0,1-3.67-4.7H12.94Z"></path></g></svg></div><div style="font-size:1.3em">TikTok</div></div>'
    var fork_player = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg width="256px" height="256px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path d="m0 0h32v32h-32z"></path> <g fill="#ffffff" fill-rule="nonzero"> <path d="m32 16c0-8.83636363-7.1636364-16-16-16-8.83636362 0-16 7.16363638-16 16 0 8.8363636 7.16363638 16 16 16 8.8363636 0 16-7.1636364 16-16zm-30.54545453 0c0-8.03345453 6.512-14.54545453 14.54545453-14.54545453 8.0334545 0 14.5454545 6.512 14.5454545 14.54545453 0 8.0334545-6.512 14.5454545-14.5454545 14.5454545-8.03345453 0-14.54545453-6.512-14.54545453-14.5454545z"></path> <path d="m16.6138182 25.2349091v-9.2349091h3.0472727l.4814545-3.0603636h-3.5287272v-1.5345455c0-.7985455.2618182-1.56072727 1.408-1.56072727h2.2909091v-3.05454547h-3.2523636c-2.7345455 0-3.4807273 1.80072728-3.4807273 4.29672724v1.8516364h-1.8763637v3.0618182h1.8763636v9.2349091z"></path> </g> </g> </g></svg></div><div style="font-size:1.3em">ForkPlayer</div></div>'
    var speedtest = '<div class="settings-folder" style="padding:0!important"><div style="width:2.2em;height:1.7em;padding-right:.5em"><svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#ffffff" stroke-linecap="round" stroke-width="12" d="M148.326 158.326a74 74 0 1 0-104.652 0"></path><path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="m96 106 32-32"></path></g></svg></div><div style="font-size:1.3em">Speed Test</div></div>'
    
    Lampa.Storage.listener.follow('change', function (e) {});
                Lampa.Settings.listener.follow('open', function (e) {
                   if (e.name == 'main') {
                     Lampa.SettingsApi.addComponent({
                        component: 'back_menu',
                        name: 'BackMenu'
                     });
                     setTimeout(function() {
                         $('div[data-component="back_menu"]').remove();
                     }, 0)
                  }
       });
       
       Lampa.SettingsApi.addParam({
                         component: 'more',
                         param: {
                                 name: 'back_menu',
                                 type: 'static',
                                 default: true
                         },
                         field: {
                                 name: 'Меню Выход',
                                 description: 'Настройки отображения пунктов меню'
                         },
                         onRender: function(item) {
                               item.on('hover:enter', function () {
                                  Lampa.Settings.create('back_menu');
                                  Lampa.Controller.enabled().controller.back = function(){
                                  Lampa.Settings.create('more');
                }
                               });
                         }
        });


        Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'exit',
                                       type: 'select',
                            values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '2',
                                       },
                                       field: {
                                               name: 'Закрыть приложение',
                                               description: 'Нажмите для выбора'
                                       },         
        });
    
        Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'reboot',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '2',
                                       },
                                       field: {
                                               name: 'Перезагрузить',
                                               description: 'Нажмите для выбора'
                               },         
        });

        Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'switch_server',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '2',
                                       },
                                       field: {
                                               name: 'Сменить сервер',
                                               description: 'Нажмите для выбора'
                               },         
        });

	Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'clear_cache',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '2',
                                       },
                                       field: {
                                               name: 'Очистить кэш',
                                               description: 'Нажмите для выбора'
                               },         
        });

        Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'youtube',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '1',
                                       },
                                       field: {
                                               name: 'YouTube',
                                               description: 'Нажмите для выбора'
                               },         
        });

	Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'rutube',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '1',
                                       },
                                       field: {
                                               name: 'RuTube',
                                               description: 'Нажмите для выбора'
                               },         
        });

	Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'drm_play',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '1',
                                       },
                                       field: {
                                               name: 'DRM Play',
                                               description: 'Нажмите для выбора'
                               },         
        });

        Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'tik_tok',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '1',
                                       },
                                       field: {
                                               name: 'TikTok',
                                               description: 'Нажмите для выбора'
                               },         
        });

	Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'fork_player',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '1',
                                       },
                                       field: {
                                               name: 'ForkPlayer',
                                               description: 'Нажмите для выбора'
                               },         
        });

	Lampa.SettingsApi.addParam({
                               component: 'back_menu',
                               param: {
                                       name: 'speedtest',
                                       type: 'select',
                       values: {
                                1:	'Скрыть',
                                2:	'Отобразить',
                            },
                                       default: '1',
                                       },
                                       field: {
                                               name: 'Speed Test',
                                               description: 'Нажмите для выбора'
                               },         
        });
	
	
    var timer = setInterval(function(){
        if(typeof Lampa !== 'undefined'){
            clearInterval(timer);

            if(!Lampa.Storage.get('back_plug', 'false')) start_back();
		 
        }
    },200);
	
    function start_back(){
	     Lampa.Storage.set('back_plug', true);
             Lampa.Storage.set('exit', '2');
             Lampa.Storage.set('reboot', '2');
             Lampa.Storage.set('switch_server', '2');
	     Lampa.Storage.set('clear_cache', '2');
             Lampa.Storage.set('youtube', '1');
	     Lampa.Storage.set('rutube', '1');
	     Lampa.Storage.set('drm_play', '1');
	     Lampa.Storage.set('tik_tok', '1');
	     Lampa.Storage.set('fork_player', '1');
	     Lampa.Storage.set('speedtest', '1');
    } 

    function modal_speedtest() {
	 var modal = $('<div style="text-align:right;"><div style="min-height:360px;"><div style="width:100%;height:0;padding-bottom:50%;position:relative;"><iframe style="border:none;position:absolute;top:0;left:0;width:100%;height:100%;min-height:360px;border:none;background-color: #ffffff;overflow:hidden !important;" src="https://openspeedtest.com/"></iframe></div></div></div>');
	 Lampa.Modal.open({
		title: '',
		html: modal,
		size: 'large',
		mask: true, 
		onBack: function onBack() {
		     Lampa.Modal.close();
		     Lampa.Controller.toggle('content');
		},
		onSelect: function () {}
  	  });
    }
	
    function clearLocalStorage() {
        var need = ['online_view', 'ser_clarifys', 'torrents_view', 'account_bookmarks', 'recomends_list', 'file_view', 'timetable', 'search_history', 'recomends_scan'];
        var more = ['online_', 'file_view_', 'storage_'];

        for (var key in localStorage) {
           if (more.find(function(w) {
              return key.indexOf(w) >= 0;
           })) {
           need.push(key);
           }
        }

        need.forEach(function(a) {
           localStorage.removeItem(a);
        });

        Lampa.Noty.show("Кэш очищен, приложение будет перезапущено!")

        setTimeout(function() {
            window.location.reload();
        }, 3000);
    }
    
    var server_protocol = location.protocol === "https:" ? 'https://' : 'http://'
   
    function showServerInput() {
      Lampa.Input.edit({
          title: "Укажите cервер",
          value: '',
          free: true       
      }, function (value) {
          if (value !== '') {
          window.location.href = server_protocol + value;
           }
          else {
            showMeExitMenu();
          }
      })
    }

    function closeApp() {
        if (Lampa.Platform.is('apple_tv')) window.location.assign('exit://exit');
        if (Lampa.Platform.is("tizen")) tizen.application.getCurrentApplication().exit();
        if (Lampa.Platform.is("webos")) window.close();
        if (Lampa.Platform.is("android")) Lampa.Android.exit();
        if (Lampa.Platform.is("orsay")) Lampa.Orsay.exit();
        if (Lampa.Platform.is("nw")) nw.Window.get().close();
        if (Lampa.Platform.is('netcast')) window.NetCastBack();
        if (Lampa.Platform.is('browser')) window.close();
    }

    function showMeExitMenu() {
      var enabled = Lampa.Controller.enabled().name;
      var menu = [];
    
    if(localStorage.getItem('exit') !== '1') {
      menu.push({
        title: exit
      });
    }
 
    if(localStorage.getItem('reboot') !== '1') {
      menu.push({
        title: reboot
      });
    }
        
    if(localStorage.getItem('switch_server') !== '1') {
      menu.push({
        title: switch_server
      });
    }

    if(localStorage.getItem('clear_cache') !== '1') {
      menu.push({
        title: clear_cache
      });
    }
        
    if(localStorage.getItem('youtube') !== '1') {
      menu.push({
            title: youtube
      });
    }

    if(localStorage.getItem('rutube') !== '1') {
      menu.push({
            title: rutube
      });
    }

    if(localStorage.getItem('drm_play') !== '1') {
      menu.push({
            title: drm_play
      });
    }

    if(localStorage.getItem('tik_tok') !== '1') {
      menu.push({
            title: tik_tok
      });
    }

    if(localStorage.getItem('fork_player') !== '1') {
      menu.push({
            title: fork_player
      });
    }

    if(localStorage.getItem('speedtest') !== '1') {
      menu.push({
            title: speedtest
      });
    }

      
      Lampa.Select.show({
        title: 'Выход ', // пробел обязателен, чтобы отделить событие от оригинального меню
        items: menu,
        onBack: function onBack() { 
         
         Lampa.Controller.toggle('content');
        },
        onSelect: function onSelect(a) {
          
          if (a.title == exit) closeApp();
          if (a.title == reboot) location.reload();
          if (a.title == switch_server) showServerInput();
	  if (a.title == clear_cache) clearLocalStorage();
          if (a.title == youtube) window.location.href = 'https://youtube.com/tv';
	  if (a.title == rutube) window.location.href = 'https://rutube.ru/tv-release/rutube.server-22.0.0/webos/';
	  if (a.title == drm_play) window.location.href = 'https://ott.drm-play.com';
          if (a.title == tik_tok) window.location.href = 'https://tv.tiktok.com/webos';
          if (a.title == fork_player) window.location.href = 'http://browser.appfxml.com';
          if (a.title == speedtest) modal_speedtest();//window.location.href = 'http://st.agtel.net';
          
        }
      })
    }

	
    Lampa.Controller.listener.follow('toggle', function(e) {
      if (e.name == 'select' && $('.selectbox__title').text() == Lampa.Lang.translate('title_out')) {
        Lampa.Select.hide();
        setTimeout(function() {
          showMeExitMenu()
        },100);
      };
    })

  } // завершаем back_menu

    if (window.appready) back_menu();
    else {
        Lampa.Listener.follow('app', function(e) {
          if (e.type == 'ready') back_menu();
        });
    }  
})()
