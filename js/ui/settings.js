import {state,save,reset} from '../core/state.js';
import {play} from '../audio/sound.js';
const $=(id)=>document.getElementById(id);
let armed=false;
export function applyTheme(){document.body.dataset.theme=state.settings.theme}
export function refresh(){
  $('set-sound').textContent=state.settings.sound?'On':'Off';
  $('set-vol').value=Math.round(state.settings.volume*100);
  $('set-theme').textContent=state.settings.theme==='dark'?'Dark':'Light';
  $('set-reset').textContent='Reset';armed=false;
}
export function init(onReset){
  $('set-sound').onclick=()=>{state.settings.sound=!state.settings.sound;save();refresh();play('click')};
  $('set-vol').oninput=(e)=>{state.settings.volume=e.target.value/100;save()};
  $('set-vol').onchange=()=>play('click');
  $('set-theme').onclick=()=>{state.settings.theme=state.settings.theme==='dark'?'light':'dark';save();applyTheme();refresh()};
  $('set-reset').onclick=()=>{
    if(!armed){armed=true;$('set-reset').textContent='Tap again';return}
    reset();applyTheme();refresh();onReset();
  };
  applyTheme();refresh();
}
