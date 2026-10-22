import {apply} from './ops.js';
export const LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]];
// state of the 6 equations: true, false, or null (not complete yet)
export function lineStates(vals,ops){
  const o=[ops.r[0],ops.r[1],ops.r[2],ops.c[0],ops.c[1],ops.c[2]];
  return LINES.map(([x,y,z],i)=>{
    const a=vals[x],b=vals[y],c=vals[z];
    if(a==null||b==null||c==null)return null;
    return apply(o[i],a,b)===c;
  });
}
export const solved=(vals,ops)=>lineStates(vals,ops).every(s=>s===true);
