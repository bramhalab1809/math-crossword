import {state} from '../core/state.js';
const names=['click','correct','wrong','win','hint','lose'];
const bank={},last={};
for(const n of names){const a=new Audio('assets/sounds/'+n+'.wav');a.preload='auto';bank[n]=a}
export function play(n){
  if(!state.settings.sound||state.settings.volume<=0)return;
  const now=performance.now();
  if(now-(last[n]||0)<80)return;         // no spam / overlap
  last[n]=now;
  const a=bank[n];if(!a)return;
  a.volume=state.settings.volume;
  try{a.currentTime=0;const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}
}
