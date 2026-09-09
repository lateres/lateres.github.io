(function(){'use strict';var STORAGE_KEY='lateres_youtube_consent';var GRANTED='granted';var DENIED='denied';var UNDECIDED='undecided';function readState(){var stored;try{stored=window.localStorage.getItem(STORAGE_KEY);}catch(e){return UNDECIDED;}
return stored===GRANTED||stored===DENIED?stored:UNDECIDED;}
function writeState(value){try{window.localStorage.setItem(STORAGE_KEY,value);}catch(e){}}
function privacyEnhanced(src){return src.replace(/^(https?:)?\/\/(www\.)?youtube\.com\//,'https://www.youtube-nocookie.com/');}
function buildPlayer(container){var src=container.getAttribute('data-youtube-src');if(!src){return;}
var iframe=document.createElement('iframe');iframe.src=privacyEnhanced(src);iframe.title=container.getAttribute('data-youtube-title')||'YouTube-video';iframe.setAttribute('allow','accelerometer; encrypted-media; gyroscope; picture-in-picture');iframe.setAttribute('allowfullscreen','');iframe.setAttribute('referrerpolicy','strict-origin-when-cross-origin');iframe.setAttribute('loading','lazy');container.textContent='';container.appendChild(iframe);}
function loadAllPlayers(){var containers=document.querySelectorAll('[data-youtube-src]');for(var i=0;i<containers.length;i++){if(!containers[i].querySelector('iframe')){buildPlayer(containers[i]);}}}
function syncStateElements(state){var nodes=document.querySelectorAll('[data-youtube-consent-when]');for(var i=0;i<nodes.length;i++){var states=nodes[i].getAttribute('data-youtube-consent-when').split(/\s+/);nodes[i].hidden=states.indexOf(state)===-1;}}
function apply(state){writeState(state);if(state===GRANTED){loadAllPlayers();syncStateElements(GRANTED);}else{if(document.querySelector('[data-youtube-src] iframe')){window.location.reload();return;}
syncStateElements(state);}}
document.addEventListener('click',function(event){if(!event.target.closest){return;}
if(event.target.closest('[data-youtube-consent-grant]')){event.preventDefault();apply(GRANTED);return;}
if(event.target.closest('[data-youtube-consent-deny]')){event.preventDefault();apply(DENIED);}});var state=readState();if(state===GRANTED){loadAllPlayers();}
syncStateElements(state);window.lateresYoutubeConsent={state:readState,grant:function(){apply(GRANTED);},revoke:function(){apply(DENIED);}};})();