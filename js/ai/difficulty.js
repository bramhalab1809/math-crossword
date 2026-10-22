// Performance tracker: rating goes up on good runs, down on failures. Levels are endless.
export function paramsFor(r){
  const blanks=Math.min(8,3+Math.floor(r*0.7));
  const maxNum=Math.min(60,9+Math.floor(r*1.8));
  const ops=['+','-'];
  if(r>=2.5)ops.push('*');
  if(r>=5)ops.push('/');
  const floor=15+blanks*9;                 // time can never go below this
  const base=30+blanks*20;
  const limit=Math.max(floor,Math.round(base-r*3));
  return {blanks,maxNum,ops,limit};
}
export const label=(r)=>r<2.5?'Easy':r<5?'Medium':r<8?'Hard':'Expert';
export function perf({usedRatio,hints,wrongs}){
  return Math.max(0,Math.min(1,1-0.6*usedRatio-0.12*hints-0.05*wrongs));
}
export const stars=(p)=>p>0.7?3:p>0.4?2:1;
export const nextRating=(r,p)=>Math.max(0,r+(p-0.45)*1.5);   // fast+clean = harder, slow/hints = gentler
export const afterFail=(r)=>Math.max(0,r-0.6);
