import {state,save} from './state.js';
import {Timer} from './timer.js';
import {show} from './router.js';
import {generate} from '../engine/generator.js';
import {lineStates,solved} from '../engine/validator.js';
import {paramsFor,label,perf,stars,nextRating,afterFail} from '../ai/difficulty.js';
import * as grid from '../ui/grid.js';
import * as hud from '../ui/hud.js';
import * as modals from '../ui/modals.js';
import {play} from '../audio/sound.js';

const HINTS=3;
let S=null;
const timer=new Timer((l)=>S&&hud.setTime(l,S.total),()=>lose());

function paint(){grid.update(S.vals,S.locked,S.sel,lineStates(S.vals,S.puzzle.ops));hud.setHints(S.hints)}

function begin(puzzle){
  const p=paramsFor(state.rating);
  S={puzzle,vals:puzzle.sol.map((v,i)=>puzzle.blanks.includes(i)?null:v),locked:new Set(),
     sel:puzzle.blanks[0],hints:HINTS,wrongs:0,undo:[],total:puzzle.limit*1000,over:false};
  hud.setLevel(state.level,label(state.rating));
  grid.build(puzzle,(i)=>{if(!S||S.over)return;S.sel=i;play('click');paint()});
  show('game');modals.close();paint();
  timer.start(S.total);
}
export function startNew(){
  const p=paramsFor(state.rating);
  const puzzle=generate(p);puzzle.limit=p.limit;
  begin(puzzle);
}
export function retry(){if(S)begin(S.puzzle)}

const running=()=>S&&!S.over&&!modals.current();

export function select(i){if(running()){S.sel=i;paint()}}
function setVal(v){
  if(!running()||S.sel==null||S.locked.has(S.sel))return;
  S.undo.push([S.sel,S.vals[S.sel]]);
  S.vals[S.sel]=v;paint();check();
}
export function digit(d){
  if(!running()||S.sel==null)return;
  const cur=S.vals[S.sel];
  const s=(cur==null?'':String(cur))+d;
  if(s.length>3)return;
  play('click');setVal(+s);
}
export function erase(){
  if(!running()||S.sel==null)return;
  const cur=S.vals[S.sel];if(cur==null)return;
  play('click');const s=String(cur).slice(0,-1);setVal(s?+s:null);
}
export function undo(){
  if(!running()||!S.undo.length)return;
  const [i,v]=S.undo.pop();S.vals[i]=v;S.sel=i;play('click');paint();
}
export function hint(){
  if(!running()||S.hints<=0)return;
  const left=S.puzzle.blanks.filter(i=>!S.locked.has(i)&&S.vals[i]!==S.puzzle.sol[i]);
  if(!left.length)return;
  const i=S.sel!=null&&left.includes(S.sel)?S.sel:left[Math.floor(Math.random()*left.length)];
  S.undo.push([i,S.vals[i]]);
  S.vals[i]=S.puzzle.sol[i];S.locked.add(i);S.hints--;S.sel=i;
  play('hint');paint();check(true);
}
function check(silent){
  if(S.vals.some(v=>v==null))return;
  if(solved(S.vals,S.puzzle.ops))return win();
  if(!silent){S.wrongs++;play('wrong');grid.shake()}
}
function win(){
  S.over=true;timer.stop();
  const used=1-timer.left/S.total;
  const p=perf({usedRatio:used,hints:HINTS-S.hints,wrongs:S.wrongs});
  const st=stars(p);
  state.rating=nextRating(state.rating,p);state.level++;save();
  hud.stars(st);
  document.getElementById('win-info').textContent='Time left '+Math.ceil(timer.left/1000)+'s';
  play('win');modals.open('m-win');
}
function lose(){
  if(!S||S.over)return;
  S.over=true;
  state.rating=afterFail(state.rating);save();
  play('lose');modals.open('m-fail');
}
export function pause(){
  if(!S||S.over||modals.current())return;
  timer.pause();modals.open('m-pause');play('click');
}
export function resume(){modals.close();if(S&&!S.over)timer.resume()}
export function active(){return !!S&&!S.over}
export function stop(){timer.stop();if(S)S.over=true}
