import type { CSSProperties } from "react";

/** Delays an entrance or scroll reveal (see "Motion" in globals.css) by `ms`. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/*
 * Runs before first paint (inlined in the root layout's <head>).
 * 1. `.js` turns on the hidden starting states of scroll reveals.
 * 2. Normalizes ViewTransition abort errors when the browser tab is hidden.
 *    Chromium appends ". Document hidden" to InvalidStateError messages, which
 *    bypasses React 19's check and triggers a spurious dev overlay. We normalize
 *    the message and suppress unhandled transition abort rejections.
 */
export const revealBootScript = `
document.documentElement.classList.add('js');
setTimeout(function(){
  if(!document.documentElement.hasAttribute('data-reveal-ready')){
    document.documentElement.classList.remove('js');
  }
},4000);

(function(){
  if(typeof window==='undefined')return;

  if(typeof ViewTransition!=='undefined'&&ViewTransition.prototype){
    try{
      var proto=ViewTransition.prototype;

      var readyDesc=Object.getOwnPropertyDescriptor(proto,'ready');
      if(readyDesc&&readyDesc.get){
        var origGetReady=readyDesc.get;
        Object.defineProperty(proto,'ready',{
          configurable:true,
          enumerable:true,
          get:function(){
            var promise=origGetReady.call(this);
            return promise.catch(function(err){
              if(
                err&&
                err.name==='InvalidStateError'&&
                typeof err.message==='string'&&
                err.message.indexOf('Transition was aborted')!==-1
              ){
                try{
                  Object.defineProperty(err,'message',{
                    value:'Transition was aborted because of invalid state',
                    configurable:true,
                    writable:true
                  });
                }catch(_){}
              }
              return Promise.reject(err);
            });
          }
        });
      }

      var finishedDesc=Object.getOwnPropertyDescriptor(proto,'finished');
      if(finishedDesc&&finishedDesc.get){
        var origGetFinished=finishedDesc.get;
        Object.defineProperty(proto,'finished',{
          configurable:true,
          enumerable:true,
          get:function(){
            var promise=origGetFinished.call(this);
            return promise.catch(function(err){
              if(
                err&&
                err.name==='InvalidStateError'&&
                typeof err.message==='string'&&
                err.message.indexOf('Transition was aborted')!==-1
              ){
                return;
              }
              return Promise.reject(err);
            });
          }
        });
      }
    }catch(_){}
  }

  window.addEventListener('unhandledrejection',function(e){
    var reason=e&&e.reason;
    if(
      reason&&
      (reason.name==='InvalidStateError'||
        (''+(reason.message||reason)).indexOf('Transition was aborted')!==-1)
    ){
      e.preventDefault();
    }
  });

  window.addEventListener('error',function(e){
    var error=e&&e.error;
    if(
      error&&
      (error.name==='InvalidStateError'||
        (''+(error.message||error)).indexOf('Transition was aborted')!==-1)
    ){
      e.preventDefault();
    }
  });
})();
`.trim();
