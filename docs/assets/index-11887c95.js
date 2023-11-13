(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(e){if(e.ep)return;e.ep=!0;const l=r(e);fetch(e.href,l)}})();const g=n=>{const t=n.length,r=n[0].length;let o=new Array(r);for(let e=0;e<r;e++){o[e]=new Array(t);for(let l=0;l<t;l++)o[e][l]=n[l][e]}return o},m=n=>{const t=n.length;let r=new Array(t),o=new Array(t);for(let e=0;e<t;e++)r[e]=n[e][e],o[e]=n[e][t-1-e];return[r,o]},u="X",L="O",w=" ",f="player-1";let c=f,a;const T=n=>{let t=c==="player-1"?u:L;const r=n.target;if(r instanceof HTMLTableCellElement){if(r.innerHTML.trim().length)return;r.innerHTML=t,setTimeout(()=>E(),0)}c=c==="player-1"?"player-2":"player-1"},y=()=>[...a.children.item(0).children],p=n=>{n&&n.preventDefault(),y().forEach(r=>{[...r.children].forEach(e=>{e.innerHTML=w})}),c=f},v=n=>{let t="";return n.every(r=>r.every(e=>e===r[0]&&e.trim().length>0)?(t=r[0]===u?"Player #1":"Player #2",!1):!0),{winner:t}},E=()=>{let n=!1,t="";const r=[];y().forEach((i,s)=>{const h=[...i.children],d=[];h.forEach(b=>{d.push(b.innerHTML)}),r[s]=d});const e=g(r),l=m(r);[r,e,l].every(i=>{const{winner:s}=v(i);return s!==""?(n=!0,t=s,!1):!0}),n&&(alert(`${t} won!`),p())},P=n=>{a=n,a.addEventListener("click",t=>{T(t)}),document.querySelector("#reset-button").addEventListener("click",p)};document.querySelector("#app").innerHTML=`
  <div>
    <div id="player-computer">
      <div>
        <p id="player-1-turn"></p>
        <h2 id="player-1-label">Player #1 (x) </h2>
      </div>
      <div>
        <p id="player-2-turn"></p>
        <h2 id="player-2-label">Player #2 (o) </h2>
      </div>
    </div>

    <table>
      <tbody>
        <tr id="r1">
          <td id="r1c1"> </td>
          <td id="r1c2"> </td>
          <td id="r1c3"> </td>
        </tr>
        <tr id="r2">
          <td id="r2c1"> </td>
          <td id="r2c2"> </td>
          <td id="r2c3"> </td>
        </tr>
        <tr id="r3">
          <td id="r3c1"> </td>
          <td id="r3c2"> </td>
          <td id="r3c3"> </td>
        </tr>
      </tbody>
    </table>

    <button id="reset-button" style="margin-top: 30px">Reset game</button>
  </div>
`;P(document.querySelector("table"));
