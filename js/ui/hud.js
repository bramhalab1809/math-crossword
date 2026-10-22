const $=(id)=>document.getElementById(id);
export function setLevel(n,label){$('lvl').textContent='Level '+n;$('diff').textContent=label}
export function setHints(n){$('hints').textContent=n;document.querySelector('[data-act=hint]').disabled=n<=0}
export function setTime(left,total){
  const s=Math.ceil(left/1000);
  $('timer').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
  const bar=document.querySelector('#timebar i');
  bar.style.transform='scaleX('+Math.max(0,left/total)+')';
  bar.style.background=left/total<0.2?'var(--bad)':'var(--accent)';
}
export function stars(n){
  $('win-stars').innerHTML=[1,2,3].map(i=>`<svg class="${i<=n?'on':''}"><use href="assets/icons/icons.svg#i-star"/></svg>`).join('');
}
