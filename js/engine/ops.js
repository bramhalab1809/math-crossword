export const SYM={'+':'+','-':'\u2212','*':'\u00d7','/':'\u00f7','=':'='};
export const CAP=999;
// returns a positive integer result or null (decimals, zero, negatives, overflow rejected)
export function apply(op,a,b){
  let r=null;
  if(op==='+')r=a+b;
  else if(op==='-')r=a-b;
  else if(op==='*')r=a*b;
  else if(op==='/')r=b!==0&&a%b===0?a/b:null;
  return r!==null&&Number.isInteger(r)&&r>=1&&r<=CAP?r:null;
}
