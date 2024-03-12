(function () {
    'use strict';
function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
}
function create() {
      var html;
      var timer;
      var network = new Lampa.Reguest();
      var loaded = {};
      this.create = function () {
        html = $("<div class=\"new-interface-info\">\n            <div class=\"new-interface-info__body\">\n                <div class=\"new-interface-info__head\"></div>\n                <div class=\"new-interface-info__title\"></div>\n                <div class=\"new-interface-info__details\"></div>\n                <div class=\"new-interface-info__description\"></div>\n            </div>\n        </div>");
      };
      this.update = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
          var titleElement, titleText, textSpan, logoContainer, url, response, foundLogo, i, logoPath, logoImg, words, splitTitle, splitByDot, middle, beforeMiddle, afterMiddle;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                titleElement = html.find('.new-interface-info__title');
                titleText = data.title;
                textSpan = $('<span>'); // РЎРѕР·РґР°РµРј РѕС‚РґРµР»СЊРЅС‹Р№ span РґР»СЏ С‚РµРєСЃС‚Р°
                logoContainer = $('<div>').addClass('logo-container'); // РЎРѕР·РґР°РµРј РєРѕРЅС‚РµР№РЅРµСЂ РґР»СЏ Р»РѕРіРѕС‚РёРїР°
                titleElement.empty().append(logoContainer).append(textSpan); // Р”РѕР±Р°РІР»СЏРµРј РєРѕРЅС‚РµР№РЅРµСЂ Рё span РІ titleElement
                url = Lampa.TMDB.api((data.name ? 'tv' : 'movie') + '/' + data.id + '/images?api_key=' + Lampa.TMDB.key() + '&language=' + Lampa.Storage.get('language'));
                network.clear();
                network.timeout(5000);
                _context.prev = 8;
                _context.next = 11;
                return new Promise(function (resolve) {
                  network.silent(url, resolve);
                });
              case 11:
                response = _context.sent;
                foundLogo = false;
                if (!(response.logos && response.logos.length > 0)) {
                  _context.next = 40;
                  break;
                }
                i = 0;
              case 15:
                if (!(i < response.logos.length)) {
                  _context.next = 25;
                  break;
                }
                if (!response.logos[i].file_path.endsWith('.png')) {
                  _context.next = 22;
                  break;
                }
                logoPath = Lampa.Api.img(response.logos[i].file_path, 'original');
                logoImg = $('<img>').attr('src', logoPath).addClass('movie-logo');
                logoContainer.empty().append(logoImg);
                foundLogo = true;
                return _context.abrupt("break", 25);
              case 22:
                i++;
                _context.next = 15;
                break;
              case 25:
                if (foundLogo) {
                  _context.next = 36;
                  break;
                }
                i = 0;
              case 27:
                if (!(i < response.logos.length)) {
                  _context.next = 36;
                  break;
                }
                if (!response.logos[i].file_path.endsWith('.svg')) {
                  _context.next = 33;
                  break;
                }
                logoPath = Lampa.Api.img(response.logos[i].file_path, 'original');
                logoImg = $('<img>').attr('src', logoPath).addClass('movie-logo');
                logoContainer.empty().append(logoImg);
                return _context.abrupt("break", 36);
              case 33:
                i++;
                _context.next = 27;
                break;
              case 36:
                // РћС‚РѕР±СЂР°Р¶РµРЅРёРµ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РІРјРµСЃС‚Рѕ С‚РµРєСЃС‚Р°
                textSpan.hide();
                logoContainer.show();
                _context.next = 45;
                break;
              case 40:
                // РћС‚РѕР±СЂР°Р¶РµРЅРёРµ С‚РµРєСЃС‚Р°, РµСЃР»Рё РёР·РѕР±СЂР°Р¶РµРЅРёРµ РЅРµ РЅР°Р№РґРµРЅРѕ
                logoContainer.hide();
                textSpan.show();

                // РЈРґР°Р»РµРЅРёРµ РїСЂРµРґС‹РґСѓС‰РµРіРѕ С‚РµРєСЃС‚Р° РїРµСЂРµРґ РґРѕР±Р°РІР»РµРЅРёРµРј РЅРѕРІРѕРіРѕ
                textSpan.empty();
                words = titleText.split(" ");
                if (titleText.includes(":")) {
                  splitTitle = titleText.split(":");
                  textSpan.html(splitTitle[0] + ":<br>" + splitTitle[1]);
                  textSpan.css('font-size', '4em');
                } else if (titleText.length > 10 && titleText.includes(".")) {
                  splitByDot = titleText.split(".");
                  textSpan.html(splitByDot[0] + ".<br>" + splitByDot[1]);
                  textSpan.css('font-size', '4em');
                } else if (words.length === 2 && (words[1].length === 1 || words[1].length === 3)) {
                  textSpan.text(titleText);
                  textSpan.css('font-size', '6em'); // РЈРІРµР»РёС‡РёРІР°РµРј СЂР°Р·РјРµСЂ РґР»СЏ РѕРїСЂРµРґРµР»РµРЅРЅС‹С… РєРѕСЂРѕС‚РєРёС… РґРІСѓСЃР»РѕРІРЅС‹С… РЅР°Р·РІР°РЅРёР№
                } else if (words.length === 2 && words[1].length > 1) {
                  textSpan.html(words[0] + "<br>" + words[1]);
                  textSpan.css('font-size', '4em');
                } else if (words.length === 1 && titleText.length <= 8) {
                  textSpan.text(titleText);
                  textSpan.css('font-size', '6em'); // РЈРІРµР»РёС‡РёРІР°РµРј СЂР°Р·РјРµСЂ РґР»СЏ РєРѕСЂРѕС‚РєРёС… РѕРґРЅРѕСЃР»РѕРІРЅС‹С… РЅР°Р·РІР°РЅРёР№
                } else if (titleText.length > 15) {
                  middle = Math.floor(titleText.length / 2);
                  beforeMiddle = titleText.lastIndexOf(' ', middle);
                  afterMiddle = titleText.indexOf(' ', middle + 1);
                  if (beforeMiddle === -1 || afterMiddle !== -1 && afterMiddle - middle < middle - beforeMiddle) {
                    middle = afterMiddle;
                  } else {
                    middle = beforeMiddle;
                  }
                  textSpan.html(titleText.substring(0, middle) + "<br>" + titleText.substring(middle + 1));
                  textSpan.css('font-size', '4em');
                } else {
                  textSpan.text(titleText);
                  textSpan.css('font-size', '4em');
                }
              case 45:
                _context.next = 50;
                break;
              case 47:
                _context.prev = 47;
                _context.t0 = _context["catch"](8);
                console.error('Error fetching logo:', _context.t0);
              case 50:
                Lampa.Background.change(Lampa.Api.img(data.backdrop_path, 'w200'));
                this.load(data);
              case 52:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[8, 47]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
      this.draw = function (data) {
        if (!html) {
          console.error("РћС€РёР±РєР°: СЌР»РµРјРµРЅС‚ html РЅРµ РёРЅРёС†РёР°Р»РёР·РёСЂРѕРІР°РЅ.");
          return;
        }
        var create = ((data.release_date || data.first_air_date || '0000') + '').slice(0, 4);
        var vote = parseFloat((data.vote_average || 0) + '').toFixed(1);
        var head = [];
        var details = [];
        var countries = Lampa.Api.sources.tmdb.parseCountries(data);
        var pg = Lampa.Api.sources.tmdb.parsePG(data);
        if (create !== '0000') head.push('<span>' + create + '</span>');
        if (countries.length > 0) head.push(countries.join(', '));
        if (vote > 0) {
          details.push('<div class="full-start__rate"><div><p class="tmdb-text">' + vote + '</p></div><div><svg xmlns="http://www.w3.org/2000/svg" width="98" height="13" style=""><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" style="" class=""/><defs><linearGradient id="a" y1="0.49929261207580566" x2="0.9999998211860657" y2="0.49929261207580566" x1="0"><stop offset="0" stop-color="#90cea1"/><stop offset=".56" stop-color="#3cbec9"/><stop offset="1" stop-color="#00b3e5"/></linearGradient></defs><g class="currentLayer" style=""><title>Layer 1</title><g data-name="Layer 2" class="" id="svg_3"><path d="M68.65911377930398,12.658185323825464 h22.86847730256724 a6.3237244747474675,6.3237244747474675 0 0 0 6.3237244747474675,-6.3237244747474675 A6.3237244747474675,6.3237244747474675 0 0 0 91.52759108187124,1.0075579828663792e-11 h-22.86847730256724 a6.3237244747474675,6.3237244747474675 0 0 0 -6.3237244747474675,6.334460849067921 a6.3237244747474675,6.3237244747474675 0 0 0 6.3237244747474675,6.3237244747474675 zm-65.0445344247511,0.017893957200756906 h2.7914573233180673 V2.47652367659482 H10.020616032423828 V1.0075579828663792e-11 H2.5591440184363173e-16 v2.4693660937044446 h3.6145793545528813 zm10.056403946825345,0 H16.46244062469629 V2.9525029381349515 h0.035787914401513736 l3.203018338935474,9.716418760010962 h2.1472748640908206 L25.158903824264108,2.9525029381349515 h0.035787914401513736 V12.668921698145915 h2.7914573233180673 V1.0075579828663792e-11 H23.781069119805842 l-2.9346089809241214,8.26700822674966 h-0.035787914401513736 L17.893957200756837,1.0075579828663792e-11 H13.670983301378225 zM31.901346897509292,0.042945497291891885 h4.1871859849770985 a12.01042407314799,12.01042407314799 0 0 1 2.8916634836423047,0.35787914401513726 a6.6279217471603316,6.6279217471603316 0 0 1 2.387053890580964,1.1022677635666216 a5.400396283188414,5.400396283188414 0 0 1 1.6211925223885708,1.975492874963555 a6.62076416428003,6.62076416428003 0 0 1 0.5976581705052797,2.952502938124878 a6.0517363252959635,6.0517363252959635 0 0 1 -0.5797642133045244,2.712723911634737 a5.83343004744673,5.83343004744673 0 0 1 -1.5675106507862986,1.9683352920832566 a6.885594730851231,6.885594730851231 0 0 1 -2.272532564496119,1.2060527153310123 a8.778775402691306,8.778775402691306 0 0 1 -2.7019875373142828,0.4115610156174093 H31.901346897509292 zm2.7914573233180673,10.092191861226858 h1.4315165760605475 a7.751662259367862,7.751662259367862 0 0 0 1.7893957200756843,-0.19683352920832575 A3.7863613436801464,3.7863613436801464 0 0 0 39.366705841665045,9.304857744403629 a3.1242849272521447,3.1242849272521447 0 0 0 0.9591161059605664,-1.1988951324507091 a4.2587618137801275,4.2587618137801275 0 0 0 0.35787914401513726,-1.8180260515968951 a3.5322671514294006,3.5322671514294006 0 0 0 -0.35787914401513726,-1.6176137309484178 a3.2817517506188043,3.2817517506188043 0 0 0 -0.9412221487598095,-1.1380556779681352 A4.15497686201574,4.15497686201574 0 0 0 38.01392267728783,2.8630331521311674 a6.105418196898233,6.105418196898233 0 0 0 -1.6748743939908408,-0.2254638607295365 h-1.6462440624696297 zM47.63013527697455,0.042945497291891885 h4.724004700999804 a11.763487463777544,11.763487463777544 0 0 1 1.6569804367900856,0.11810011752499526 a4.5307499632316315,4.5307499632316315 0 0 1 1.49235603054312,0.46524288721967877 a2.841560403480186,2.841560403480186 0 0 1 1.0736374320454114,0.9734312717211722 a2.9847120610862397,2.9847120610862397 0 0 1 0.4115610156174093,1.664138019670386 a2.6769359972332234,2.6769359972332234 0 0 1 -0.5976581705052797,1.7893957200756843 a3.267436584858199,3.267436584858199 0 0 1 -1.5854046079870565,1.009219186122686 V6.083945448267402 a3.678997600475606,3.678997600475606 0 0 1 1.1380556779681352,0.35787914401513726 a3.045551515568813,3.045551515568813 0 0 1 0.8768039028370861,0.6620764164280046 a2.7878785318779156,2.7878785318779156 0 0 1 0.5618702561037674,0.9376433573196591 a3.278172959178653,3.278172959178653 0 0 1 0.19683352920832575,1.1452132608484382 a3.0491303070089657,3.0491303070089657 0 0 1 -0.42945497281816436,1.6748743939908408 a3.3354336222210748,3.3354336222210748 0 0 1 -1.1094253464469221,1.0736374320454114 a4.788422946922531,4.788422946922531 0 0 1 -1.5281439449446346,0.5905005876249767 a8.052280740340578,8.052280740340578 0 0 1 -1.6927683511915976,0.17893957200756846 h-5.189247588219484 zm2.7914573233180673,5.063989887814184 h2.0220171636855233 a2.7377754517157964,2.7377754517157964 0 0 0 0.6370248763469438,-0.07157582880302787 a1.710662308392354,1.710662308392354 0 0 0 0.5618702561037674,-0.23262144360984038 a1.2275254639719202,1.2275254639719202 0 0 0 0.404403432737104,-0.42945497281816436 a1.2991012927749477,1.2991012927749477 0 0 0 0.15030924048635827,-0.6441824592272485 A1.1810011752499507,1.1810011752499507 0 0 0 54.039750746285655,3.07776063854025 a1.2239466725317678,1.2239466725317678 0 0 0 -0.4401913471386203,-0.404403432737104 A2.1723264041718804,2.1723264041718804 0 0 0 52.96611331424024,2.4693660937145183 a3.5430035257498544,3.5430035257498544 0 0 0 -0.6620764164280046,-0.06441824592272513 h-1.8967594632802254 zm0,5.242929459821753 h2.5051540081059573 a2.9596605210051807,2.9596605210051807 0 0 0 0.6549188335477018,-0.07157582880302787 a1.6712956025506893,1.6712956025506893 0 0 0 0.5976581705052797,-0.25051540081059726 a1.4064650359794872,1.4064650359794872 0 0 0 0.4401913471386203,-0.46524288721967877 a1.3599407472575191,1.3599407472575191 0 0 0 0.16820319768711534,-0.6978643308295197 a1.1308980950878325,1.1308980950878325 0 0 0 -0.22188506928938595,-0.7157582880302727 a1.4315165760605475,1.4315165760605475 0 0 0 -0.565449047543919,-0.42229738993786237 a2.9453453552445756,2.9453453552445756 0 0 0 -0.7157582880302727,-0.19683352920832575 a5.411132657508867,5.411132657508867 0 0 0 -0.7336522452310308,-0.0536818716022708 h-2.111486949689307 z" fill="url(#a)" data-name="Layer 1" id="svg_4" class=""/></g></g></svg></div></div>');
        } else {
          // Р”РѕР±Р°РІР»РµРЅРёРµ РЅРµРІРёРґРёРјРѕРіРѕ Р·Р°РїРѕР»РЅРёС‚РµР»СЏ, С‡С‚РѕР±С‹ СЃРѕС…СЂР°РЅРёС‚СЊ РјР°РєРµС‚
          details.push('<div class="full-start__rate" style="visibility: hidden;"><div><p class="tmdb-text">' + vote + '</p></div><div><svg xmlns="http://www.w3.org/2000/svg" width="98" height="13" style=""><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" style="" class=""/><defs><linearGradient id="a" y1="0.49929261207580566" x2="0.9999998211860657" y2="0.49929261207580566" x1="0"><stop offset="0" stop-color="#90cea1"/><stop offset=".56" stop-color="#3cbec9"/><stop offset="1" stop-color="#00b3e5"/></linearGradient></defs><g class="currentLayer" style=""><title>Layer 1</title><g data-name="Layer 2" class="" id="svg_3"><path d="M68.65911377930398,12.658185323825464 h22.86847730256724 a6.3237244747474675,6.3237244747474675 0 0 0 6.3237244747474675,-6.3237244747474675 A6.3237244747474675,6.3237244747474675 0 0 0 91.52759108187124,1.0075579828663792e-11 h-22.86847730256724 a6.3237244747474675,6.3237244747474675 0 0 0 -6.3237244747474675,6.334460849067921 a6.3237244747474675,6.3237244747474675 0 0 0 6.3237244747474675,6.3237244747474675 zm-65.0445344247511,0.017893957200756906 h2.7914573233180673 V2.47652367659482 H10.020616032423828 V1.0075579828663792e-11 H2.5591440184363173e-16 v2.4693660937044446 h3.6145793545528813 zm10.056403946825345,0 H16.46244062469629 V2.9525029381349515 h0.035787914401513736 l3.203018338935474,9.716418760010962 h2.1472748640908206 L25.158903824264108,2.9525029381349515 h0.035787914401513736 V12.668921698145915 h2.7914573233180673 V1.0075579828663792e-11 H23.781069119805842 l-2.9346089809241214,8.26700822674966 h-0.035787914401513736 L17.893957200756837,1.0075579828663792e-11 H13.670983301378225 zM31.901346897509292,0.042945497291891885 h4.1871859849770985 a12.01042407314799,12.01042407314799 0 0 1 2.8916634836423047,0.35787914401513726 a6.6279217471603316,6.6279217471603316 0 0 1 2.387053890580964,1.1022677635666216 a5.400396283188414,5.400396283188414 0 0 1 1.6211925223885708,1.975492874963555 a6.62076416428003,6.62076416428003 0 0 1 0.5976581705052797,2.952502938124878 a6.0517363252959635,6.0517363252959635 0 0 1 -0.5797642133045244,2.712723911634737 a5.83343004744673,5.83343004744673 0 0 1 -1.5675106507862986,1.9683352920832566 a6.885594730851231,6.885594730851231 0 0 1 -2.272532564496119,1.2060527153310123 a8.778775402691306,8.778775402691306 0 0 1 -2.7019875373142828,0.4115610156174093 H31.901346897509292 zm2.7914573233180673,10.092191861226858 h1.4315165760605475 a7.751662259367862,7.751662259367862 0 0 0 1.7893957200756843,-0.19683352920832575 A3.7863613436801464,3.7863613436801464 0 0 0 39.366705841665045,9.304857744403629 a3.1242849272521447,3.1242849272521447 0 0 0 0.9591161059605664,-1.1988951324507091 a4.2587618137801275,4.2587618137801275 0 0 0 0.35787914401513726,-1.8180260515968951 a3.5322671514294006,3.5322671514294006 0 0 0 -0.35787914401513726,-1.6176137309484178 a3.2817517506188043,3.2817517506188043 0 0 0 -0.9412221487598095,-1.1380556779681352 A4.15497686201574,4.15497686201574 0 0 0 38.01392267728783,2.8630331521311674 a6.105418196898233,6.105418196898233 0 0 0 -1.6748743939908408,-0.2254638607295365 h-1.6462440624696297 zM47.63013527697455,0.042945497291891885 h4.724004700999804 a11.763487463777544,11.763487463777544 0 0 1 1.6569804367900856,0.11810011752499526 a4.5307499632316315,4.5307499632316315 0 0 1 1.49235603054312,0.46524288721967877 a2.841560403480186,2.841560403480186 0 0 1 1.0736374320454114,0.9734312717211722 a2.9847120610862397,2.9847120610862397 0 0 1 0.4115610156174093,1.664138019670386 a2.6769359972332234,2.6769359972332234 0 0 1 -0.5976581705052797,1.7893957200756843 a3.267436584858199,3.267436584858199 0 0 1 -1.5854046079870565,1.009219186122686 V6.083945448267402 a3.678997600475606,3.678997600475606 0 0 1 1.1380556779681352,0.35787914401513726 a3.045551515568813,3.045551515568813 0 0 1 0.8768039028370861,0.6620764164280046 a2.7878785318779156,2.7878785318779156 0 0 1 0.5618702561037674,0.9376433573196591 a3.278172959178653,3.278172959178653 0 0 1 0.19683352920832575,1.1452132608484382 a3.0491303070089657,3.0491303070089657 0 0 1 -0.42945497281816436,1.6748743939908408 a3.3354336222210748,3.3354336222210748 0 0 1 -1.1094253464469221,1.0736374320454114 a4.788422946922531,4.788422946922531 0 0 1 -1.5281439449446346,0.5905005876249767 a8.052280740340578,8.052280740340578 0 0 1 -1.6927683511915976,0.17893957200756846 h-5.189247588219484 zm2.7914573233180673,5.063989887814184 h2.0220171636855233 a2.7377754517157964,2.7377754517157964 0 0 0 0.6370248763469438,-0.07157582880302787 a1.710662308392354,1.710662308392354 0 0 0 0.5618702561037674,-0.23262144360984038 a1.2275254639719202,1.2275254639719202 0 0 0 0.404403432737104,-0.42945497281816436 a1.2991012927749477,1.2991012927749477 0 0 0 0.15030924048635827,-0.6441824592272485 A1.1810011752499507,1.1810011752499507 0 0 0 54.039750746285655,3.07776063854025 a1.2239466725317678,1.2239466725317678 0 0 0 -0.4401913471386203,-0.404403432737104 A2.1723264041718804,2.1723264041718804 0 0 0 52.96611331424024,2.4693660937145183 a3.5430035257498544,3.5430035257498544 0 0 0 -0.6620764164280046,-0.06441824592272513 h-1.8967594632802254 zm0,5.242929459821753 h2.5051540081059573 a2.9596605210051807,2.9596605210051807 0 0 0 0.6549188335477018,-0.07157582880302787 a1.6712956025506893,1.6712956025506893 0 0 0 0.5976581705052797,-0.25051540081059726 a1.4064650359794872,1.4064650359794872 0 0 0 0.4401913471386203,-0.46524288721967877 a1.3599407472575191,1.3599407472575191 0 0 0 0.16820319768711534,-0.6978643308295197 a1.1308980950878325,1.1308980950878325 0 0 0 -0.22188506928938595,-0.7157582880302727 a1.4315165760605475,1.4315165760605475 0 0 0 -0.565449047543919,-0.42229738993786237 a2.9453453552445756,2.9453453552445756 0 0 0 -0.7157582880302727,-0.19683352920832575 a5.411132657508867,5.411132657508867 0 0 0 -0.7336522452310308,-0.0536818716022708 h-2.111486949689307 z" fill="url(#a)" data-name="Layer 1" id="svg_4" class=""/></g></g></svg></div></div>');
        }
        if (data.genres && data.genres.length > 0) {
          details.push(data.genres.slice(0, 3).map(function (item) {
            return Lampa.Utils.capitalizeFirstLetter(item.name);
          }).join(' | '));
        }
        if (data.runtime) {
          var minutes = data.runtime;
          var hours = Math.floor(minutes / 60);
          var remainingMinutes = minutes % 60;
          var formattedTime = "".concat(hours, " \u0447. ").concat(remainingMinutes, " \u043C\u0438\u043D.");
          details.push(formattedTime);
        }
        if (pg) details.push('<span class="full-start__pg" style="font-size: 0.9em;">' + pg + '</span>');
        html.find('.new-interface-info__head').empty().append(head.join(', '));
        html.find('.new-interface-info__details').html(details.join('<span class="new-interface-info__split">&#9679;</span>'));
      };
      this.load = function (data) {
        var _this = this;
        clearTimeout(timer);
        var url = Lampa.TMDB.api((data.name ? 'tv' : 'movie') + '/' + data.id + '?api_key=' + Lampa.TMDB.key() + '&append_to_response=content_ratings,release_dates&language=' + Lampa.Storage.get('language'));
        timer = setTimeout(function () {
          network.clear();
          network.timeout(5000);
          network.silent(url, function (movie) {
            loaded[url] = movie;
            _this.draw(movie);
          });
        }, 300);
      };
      this.render = function () {
        return html;
      };
      this.empty = function () {};
      this.destroy = function () {
        html.remove();
        loaded = {};
        html = null;
      };
    }
    function component(object) {
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true,
        scroll_by_item: true
      });
      var items = [];
      var html = $('<div class="new-interface"><img class="full-start__background"></div>');
      var active = 0;
      var newlampa = Lampa.Manifest.app_digital >= 0;
      var info;
      var lezydata;
      var viewall = Lampa.Storage.field('card_views_type') == 'view' || Lampa.Storage.field('navigation_type') == 'mouse';
      var background_img = html.find('.full-start__background');
      var background_last = '';
      var background_timer;
      this.create = function () {};
      this.empty = function () {
        var button;
        var empty = new Lampa.Empty();
        html.append(empty.render(button));
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };
      this.loadNext = function () {
        var _this = this;
        if (this.next && !this.next_wait && items.length) {
          this.next_wait = true;
          this.next(function (new_data) {
            _this.next_wait = false;
            new_data.forEach(_this.append.bind(_this));
            Lampa.Layer.visible(items[active + 1].render(true));
          }, function () {
            _this.next_wait = false;
          });
        }
      };
      this.build = function (data) {
        var _this2 = this;
        lezydata = data;
        info = new create(object);
        info.create();
        scroll.minus(info.render());
        data.slice(0, viewall ? data.length : 2).forEach(this.append.bind(this));
        html.append(info.render());
        html.append(scroll.render());
        if (newlampa) {
          Lampa.Layer.update(html);
          Lampa.Layer.visible(scroll.render(true));
          scroll.onEnd = this.loadNext.bind(this);
          scroll.onWheel = function (step) {
            if (!Lampa.Controller.own(_this2)) _this2.start();
            if (step > 0) _this2.down();else if (active > 0) _this2.up();
          };
        }
        this.activity.loader(false);
        this.activity.toggle();
      };
      this.background = function (elem) {
        var new_background = Lampa.Api.img(elem.backdrop_path, 'w1280');
        clearTimeout(background_timer);
        if (new_background == background_last) return;
        background_timer = setTimeout(function () {
          background_img.removeClass('loaded');
          background_img[0].onload = function () {
            background_img.addClass('loaded');
          };
          background_img[0].onerror = function () {
            background_img.removeClass('loaded');
          };
          background_last = new_background;
          setTimeout(function () {
            background_img[0].src = background_last;
          }, 300);
        }, 1000);
      };
      this.append = function (element) {
        var _this3 = this;
        if (element.ready) return;
        element.ready = true;
        var item = new Lampa.InteractionLine(element, {
          url: element.url,
          card_small: true,
          cardClass: element.cardClass,
          genres: object.genres,
          object: object,
          card_wide: true,
          nomore: element.nomore
        });
        item.create();
        item.onDown = this.down.bind(this);
        item.onUp = this.up.bind(this);
        item.onBack = this.back.bind(this);
        item.onToggle = function () {
          active = items.indexOf(item);
        };
        if (this.onMore) item.onMore = this.onMore.bind(this);
        item.onFocus = function (elem) {
          info.update(elem);
          _this3.background(elem);
        };
        item.onHover = function (elem) {
          info.update(elem);
          _this3.background(elem);
        };
        item.onFocusMore = info.empty.bind(info);
        scroll.append(item.render());
        items.push(item);
      };
      this.back = function () {
        Lampa.Activity.backward();
      };
      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        if (!viewall) lezydata.slice(0, active + 2).forEach(this.append.bind(this));
        items[active].toggle();
        scroll.update(items[active].render());
      };
      this.up = function () {
        active--;
        if (active < 0) {
          active = 0;
          Lampa.Controller.toggle('head');
        } else {
          items[active].toggle();
          scroll.update(items[active].render());
        }
      };
      this.start = function () {
        var _this4 = this;
        Lampa.Controller.add('content', {
          link: this,
          toggle: function toggle() {
            if (_this4.activity.canRefresh()) return false;
            if (items.length) {
              items[active].toggle();
            }
          },
          update: function update() {},
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: this.back
        });
        Lampa.Controller.toggle('content');
      };
      this.refresh = function () {
        this.activity.loader(true);
        this.activity.need_refresh = true;
      };
      this.pause = function () {};
      this.stop = function () {};
      this.render = function () {
        return html;
      };
      this.destroy = function () {
        network.clear();
        Lampa.Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        items = null;
        network = null;
        lezydata = null;
      };
    }
    function startPlugin() {
      window.plugin_interface_ready = true;
      Lampa.InteractionMain;
      var new_interface = component;
      Lampa.InteractionMain = function (object) {
        var use = new_interface;
        return new use(object);
      };
      Lampa.Template.add('new_interface_style', "\n        \n    ");
      $('body').append(Lampa.Template.get('new_interface_style', {}, true));
    }
    if (!window.plugin_interface_ready) startPlugin();

})();        
