const KEYS=['1','2','3','4','5','6','7','8','9','0','erase','undo'];
const ico=(n)=>`<svg><use href="assets/icons/icons.svg#i-${n}"/></svg>`;
export function build(h){
  const el=document.getElementById('numpad');el.innerHTML='';
  for(const k of KEYS){
    const b=document.createElement('button');b.type='button';b.className='key';
    if(k==='erase'||k==='undo'){b.innerHTML=ico(k);b.setAttribute('aria-label',k);b.onclick=()=>h[k]()}
    else{b.textContent=k;b.onclick=()=>h.digit(+k)}
    el.appendChild(b);
  }
}
