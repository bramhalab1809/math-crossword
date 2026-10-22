let cur=null;
export function open(id){close();cur=document.getElementById(id);if(cur)cur.classList.add('open')}
export function close(){if(cur)cur.classList.remove('open');cur=null}
export const current=()=>cur?cur.id:null;
