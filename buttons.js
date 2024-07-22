(function() {
    'use strict';

function log() {
  console.log.apply(console, arguments);
}

log('TVkeys', 'TVkeys keys 001 loaded');

var homeBtn = document.createElement('div');
homeBtn.className = 'simple-button simple-button--filter selector filter--home';
homeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/></svg><span>Home</span><div class="hide"></div>';

var searchBtn = document.createElement('div');
searchBtn.className = 'simple-button simple-button--filter selector filter--search';
searchBtn.innerHTML = '<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9.9964" cy="9.63489" r="8.43556" stroke="currentColor" stroke-width="2.4"/><path d="M20.7768 20.4334L18.2135 17.8701" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg><div class="hide"></div>';

var sortBtn = document.createElement('div');
sortBtn.className = 'simple-button simple-button--filter selector filter--sort';
sortBtn.innerHTML = '<span>#{filter_sorted}</span><div class="hide"></div>';

var filterBtn = document.createElement('div');
filterBtn.className = 'simple-button simple-button--filter selector filter--filter';
filterBtn.innerHTML = '<span>#{filter_filtred}</span><div class="hide"></div>';

var tfilter = document.createElement('div');
tfilter.className = 'torrent-filter';
tfilter.appendChild(homeBtn);
tfilter.appendChild(searchBtn);
tfilter.appendChild(sortBtn);
tfilter.appendChild(filterBtn);

var styles = '.tfilter_btn_wr { border: solid, 0.1em; border-radius: 0.7em; flex-basis: 24%; } .simple-button.simple-button--filter { margin: 0; padding: 1em; font-size: 1em !important; border-radius 0; } .torrent-filter { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 0px 10px; grid-auto-flow: row; justify-content: space-between; align-content: stretch; justify-items: stretch; align-items: stretch; }';

var styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

var clCodes = ["ColorF0Red", "ColorF1Green", "ColorF2Yellow", "ColorF3Blue"];

function wrapEach(tfilter) {
  var toWrap = Array.prototype.slice.call(tfilter.children).slice(1);
  var clrs = ['red', 'green', 'yellow', 'blue'];
  toWrap.forEach(function(el, indx) {
    var wrapperx = document.createElement('div');
    wrapperx.classList.add('tfilter_btn_wr');
    wrapperx.style.borderColor = clrs[indx];
    el.parentNode.insertBefore(wrapperx, el);
    wrapperx.appendChild(el);
  });
}

function listenTVkeys(e) {
  var tpanel = tfilter.children;
  var opt = clCodes.indexOf(e.key)+1;
  if (opt > 0 && opt <= tpanel.length-1 && tpanel[opt].firstChild.checkVisibility()) {
    tpanel[opt].firstChild.click();
  }
}

function plugTVkeys(e) {
  if(e.type == 'start') {
    tfilter = document.getElementsByClassName("torrent-filter")[0] || tfilter;
    if (!tfilter.classList.contains('TVbuttons')) {
      tfilter.children[1].addEventListener('click', function() {
        Lampa.Activity.push({'component':'main'});
      });
      wrapEach(tfilter);
      tfilter.classList.add('TVbuttons');
    }
    if (document.getElementsByClassName('activity--active')[0].contains(tfilter)) {
      
      document.addEventListener("keyup", listenTVkeys);
    } else {
      document.removeEventListener("keyup", listenTVkeys);
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.body.appendChild(tfilter);
  plugTVkeys({type: 'start'});
});
  
})();
