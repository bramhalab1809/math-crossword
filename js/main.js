import {state} from './core/state.js';
import {show} from './core/router.js';
import * as game from './core/game.js';
import * as modals from './ui/modals.js';
import * as settings from './ui/settings.js';
import * as numpad from './ui/numpad.js';
import {play} from './audio/sound.js';

let settingsFrom='home';
const homeText=()=>{document.getElementById('home-level').textContent='Level '+state.level};

function goHome(){game.stop();modals.close();show('home');homeText()}
function openSettings(){
  settingsFrom=modals.current()==='m-pause'?'m-pause':'home';
  settings.refresh();modals.open('m-settings');
}
function closeSettings(){modals.close();if(settingsFrom==='m-pause')modals.open('m-pause')}

const actions={
  play:()=>{play('click');game.startNew()},
  next:()=>{play('click');game.startNew()},
  retry:()=>{play('click');game.retry()},
  pause:()=>game.pause(),
  resume:()=>{play('click');game.resume()},
  hint:()=>game.hint(),
  home:()=>{play('click');goHome()},
  settings:()=>{play('click');openSettings()},
  'settings-close':()=>{play('click');closeSettings()},
};
document.addEventListener('click',(e)=>{
  const b=e.target.closest('[data-act]');if(!b)return;
  const f=actions[b.dataset.act];if(f)f();
});

numpad.build({digit:game.digit,erase:game.erase,undo:game.undo});
settings.init(()=>{homeText();goHome()});
homeText();

// auto pause when tab hidden
document.addEventListener('visibilitychange',()=>{if(document.hidden)game.pause()});
// keyboard
document.addEventListener('keydown',(e)=>{
  if(/^[0-9]$/.test(e.key))game.digit(+e.key);
  else if(e.key==='Backspace'||e.key==='Delete')game.erase();
  else if(e.key==='z'||e.key==='Z')game.undo();
  else if(e.key==='h'||e.key==='H')game.hint();
  else if(e.key==='Escape'){
    const m=modals.current();
    if(m==='m-settings')closeSettings();
    else if(m==='m-pause')game.resume();
    else game.pause();
  }
});
