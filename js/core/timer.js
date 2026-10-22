// Deadline based (Date.now), so tab switch / throttling never skews the time.
export class Timer{
  constructor(tick,end){this.tick=tick;this.end=end;this.left=0;this.dl=0;this.h=null}
  start(ms){this.left=ms;this.resume()}
  resume(){this.stop();this.dl=Date.now()+this.left;this.h=setInterval(()=>this._t(),200);this._t()}
  _t(){this.left=Math.max(0,this.dl-Date.now());this.tick(this.left);if(this.left<=0){this.stop();this.end()}}
  pause(){if(this.h){this.left=Math.max(0,this.dl-Date.now());this.stop()}}
  stop(){clearInterval(this.h);this.h=null}
}
