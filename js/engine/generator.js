import {apply} from './ops.js';
const ri=(n)=>1+Math.floor(Math.random()*n);
const pick=(a)=>a[Math.floor(Math.random()*a.length)];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

// 3x3 numbers: row i: n[i0] op n[i1] = n[i2]; column j: n[0j] op n[1j] = n[2j]
function build(maxNum,ops){
  for(let round=0;round<60;round++){
    const mix=round%2===0;
    const p=pick(ops),q=pick(ops);
    for(let t=0;t<400;t++){
      const a=ri(maxNum),b=ri(maxNum),c=ri(maxNum),d=ri(maxNum);
      const r=mix?[pick(ops),pick(ops),pick(ops)]:[p,p,p];
      const k=mix?[pick(ops),pick(ops),pick(ops)]:[q,q,q];
      const n02=apply(r[0],a,b),n12=apply(r[1],c,d);
      const n20=apply(k[0],a,c),n21=apply(k[1],b,d);
      if(!n02||!n12||!n20||!n21)continue;
      const n22=apply(r[2],n20,n21);
      if(!n22||apply(k[2],n02,n12)!==n22)continue;
      return {sol:[a,b,n02,c,d,n12,n20,n21,n22],ops:{r,c:k}};
    }
  }
  return null;
}
export function generate({maxNum,ops,blanks}){
  const base=build(maxNum,ops)||build(maxNum,['+'])||{sol:[1,1,2,1,1,2,2,2,4],ops:{r:['+','+','+'],c:['+','+','+']}};
  const idx=shuffle([0,1,2,3,4,5,6,7,8]).slice(0,blanks);
  return {...base,blanks:idx.sort((x,y)=>x-y)};
}
