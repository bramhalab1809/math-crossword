const KEY='mathcross.v1';
const def=()=>({level:1,rating:0,settings:{sound:true,volume:0.7,theme:'dark'}});
const num=(v,d)=>Number.isFinite(v)?v:d;
export function load(){
  const d=def();
  try{
    const o=JSON.parse(localStorage.getItem(KEY)||'null')||{};
    d.level=Math.max(1,Math.floor(num(o.level,1)));
    d.rating=Math.max(0,num(o.rating,0));
    const s=o.settings||{};
    d.settings.sound=s.sound!==false;
    d.settings.volume=Math.min(1,Math.max(0,num(s.volume,0.7)));
    d.settings.theme=s.theme==='light'?'light':'dark';
  }catch(e){}
  return d;
}
export function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
export function wipe(){try{localStorage.removeItem(KEY)}catch(e){}return def()}
