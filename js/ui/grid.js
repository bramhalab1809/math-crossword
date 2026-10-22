import {SYM} from '../engine/ops.js';
import {LINES} from '../engine/validator.js';
const el=document.getElementById('board');
let cells=[],P=null;
const numPos=(i)=>[2*Math.floor(i/3),2*(i%3)];
export function build(puzzle,onSelect){
  P=puzzle;
  el.innerHTML='';
  const g=document.createElement('div');g.id='grid';
  cells=[];
  for(let r=0;r<5;r++)for(let c=0;c<5;c++){
    const d=document.createElement('button');d.className='cell';d.type='button';
    let t='';
    if(r%2===0&&c%2===0){d.classList.add('num');const i=(r/2)*3+c/2;d.dataset.i=i;
      if(puzzle.blanks.includes(i))d.classList.add('blank');else d.classList.add('given');
      d.onclick=()=>puzzle.blanks.includes(i)&&onSelect(i);
    }else if(r%2===0&&c===1)t=SYM[puzzle.ops.r[r/2]],d.classList.add('opc');
    else if(r%2===0&&c===3)t=SYM['='];
    else if(r===1&&c%2===0)t=SYM[puzzle.ops.c[c/2]],d.classList.add('opc');
    else if(r===3&&c%2===0)t=SYM['='];
    else d.style.visibility='hidden';
    if(t)d.textContent=t;
    g.appendChild(d);cells.push(d);
  }
  el.appendChild(g);
}
export function update(vals,locked,sel,states){
  const bad=new Set();
  states.forEach((s,k)=>{if(s===false)LINES[k].forEach(i=>bad.add(i))});
  for(let i=0;i<9;i++){
    const [r,c]=numPos(i),d=cells[r*5+c];
    d.textContent=vals[i]==null?'':vals[i];
    d.classList.toggle('sel',i===sel);
    d.classList.toggle('hinted',locked.has(i));
    d.classList.toggle('bad',bad.has(i)&&P.blanks.includes(i));
  }
}
export function shake(){const g=document.getElementById('grid');if(!g)return;g.classList.remove('shake');void g.offsetWidth;g.classList.add('shake')}
