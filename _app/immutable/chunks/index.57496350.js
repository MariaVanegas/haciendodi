function w(){}function Y(t,e){for(const n in e)t[n]=e[n];return t}function J(t){return t()}function G(){return Object.create(null)}function E(t){t.forEach(J)}function O(t){return typeof t=="function"}function gt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Z(t){return Object.keys(t).length===0}function tt(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function xt(t,e,n){t.$$.on_destroy.push(tt(e,n))}function bt(t,e,n,i){if(t){const r=K(t,e,n,i);return t[0](r)}}function K(t,e,n,i){return t[1]&&i?Y(n.ctx.slice(),t[1](i(e))):n.ctx}function $t(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(e.dirty.length,r.length);for(let u=0;u<c;u+=1)o[u]=e.dirty[u]|r[u];return o}return e.dirty|r}return e.dirty}function wt(t,e,n,i,r,o){if(r){const c=K(e,n,i,o);t.p(c,r)}}function vt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Et(t){return t&&O(t.destroy)?t.destroy:w}let C=!1;function et(){C=!0}function nt(){C=!1}function it(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function rt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let l=0;l<e.length;l++){const a=e[l];a.claim_order!==void 0&&s.push(a)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let s=0;s<e.length;s++){const l=e[s].claim_order,a=(r>0&&e[n[r]].claim_order<=l?r+1:it(1,r,d=>e[n[d]].claim_order,l))-1;i[s]=n[a]+1;const _=a+1;n[_]=s,r=Math.max(_,r)}const o=[],c=[];let u=e.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(o.push(e[s-1]);u>=s;u--)c.push(e[u]);u--}for(;u>=0;u--)c.push(e[u]);o.reverse(),c.sort((s,l)=>s.claim_order-l.claim_order);for(let s=0,l=0;s<c.length;s++){for(;l<o.length&&c[s].claim_order>=o[l].claim_order;)l++;const a=l<o.length?o[l]:null;t.insertBefore(c[s],a)}}function ct(t,e){if(C){for(rt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Nt(t,e,n){C&&!n?ct(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function st(t){t.parentNode&&t.parentNode.removeChild(t)}function At(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function lt(t){return document.createElement(t)}function q(t){return document.createTextNode(t)}function St(){return q(" ")}function kt(){return q("")}function Ct(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Mt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ot(t){return Array.from(t.childNodes)}function ut(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Q(t,e,n,i,r=!1){ut(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const u=t[c];if(e(u)){const s=n(u);return s===void 0?t.splice(c,1):t[c]=s,r||(t.claim_info.last_index=c),u}}for(let c=t.claim_info.last_index-1;c>=0;c--){const u=t[c];if(e(u)){const s=n(u);return s===void 0?t.splice(c,1):t[c]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,u}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function ft(t,e,n,i){return Q(t,r=>r.nodeName===e,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const u=r.attributes[c];n[u.name]||o.push(u.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(e))}function jt(t,e,n){return ft(t,e,n,lt)}function at(t,e){return Q(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>q(e),!0)}function Tt(t){return at(t," ")}function Dt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Pt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function dt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function Bt(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(r)):o===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function Ht(t,e){return new t(e)}let v;function $(t){v=t}function z(){if(!v)throw new Error("Function called outside component initialization");return v}function Lt(t){z().$$.on_mount.push(t)}function Ot(t){z().$$.after_update.push(t)}function qt(){const t=z();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const o=dt(e,n,{cancelable:i});return r.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}const b=[],I=[],S=[],B=[],W=Promise.resolve();let H=!1;function U(){H||(H=!0,W.then(V))}function zt(){return U(),W}function L(t){S.push(t)}function Ft(t){B.push(t)}const P=new Set;let x=0;function V(){if(x!==0)return;const t=v;do{try{for(;x<b.length;){const e=b[x];x++,$(e),_t(e.$$)}}catch(e){throw b.length=0,x=0,e}for($(null),b.length=0,x=0;I.length;)I.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];P.has(n)||(P.add(n),n())}S.length=0}while(b.length);for(;B.length;)B.pop()();H=!1,P.clear(),$(t)}function _t(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(L)}}const k=new Set;let g;function Rt(){g={r:0,c:[],p:g}}function Gt(){g.r||E(g.c),g=g.p}function X(t,e){t&&t.i&&(k.delete(t),t.i(e))}function ht(t,e,n,i){if(t&&t.o){if(k.has(t))return;k.add(t),g.c.push(()=>{k.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function It(t,e){ht(t,1,1,()=>{e.delete(t.key)})}function Jt(t,e,n,i,r,o,c,u,s,l,a,_){let d=t.length,m=o.length,h=d;const M={};for(;h--;)M[t[h].key]=h;const N=[],j=new Map,T=new Map;for(h=m;h--;){const f=_(r,o,h),p=n(f);let y=c.get(p);y?i&&y.p(f,e):(y=l(p,f),y.c()),j.set(p,N[h]=y),p in M&&T.set(p,Math.abs(h-M[p]))}const F=new Set,R=new Set;function D(f){X(f,1),f.m(u,a),c.set(f.key,f),a=f.first,m--}for(;d&&m;){const f=N[m-1],p=t[d-1],y=f.key,A=p.key;f===p?(a=f.first,d--,m--):j.has(A)?!c.has(y)||F.has(y)?D(f):R.has(A)?d--:T.get(y)>T.get(A)?(R.add(y),D(f)):(F.add(A),d--):(s(p,c),d--)}for(;d--;){const f=t[d];j.has(f.key)||s(f,c)}for(;m;)D(N[m-1]);return N}function Kt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Qt(t){t&&t.c()}function Wt(t,e){t&&t.l(e)}function mt(t,e,n,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),i||L(()=>{const c=t.$$.on_mount.map(J).filter(O);t.$$.on_destroy?t.$$.on_destroy.push(...c):E(c),t.$$.on_mount=[]}),o.forEach(L)}function pt(t,e){const n=t.$$;n.fragment!==null&&(E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function yt(t,e){t.$$.dirty[0]===-1&&(b.push(t),U(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ut(t,e,n,i,r,o,c,u=[-1]){const s=v;$(t);const l=t.$$={fragment:null,ctx:[],props:o,update:w,not_equal:r,bound:G(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(s?s.$$.context:[])),callbacks:G(),dirty:u,skip_bound:!1,root:e.target||s.$$.root};c&&c(l.root);let a=!1;if(l.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return l.ctx&&r(l.ctx[_],l.ctx[_]=h)&&(!l.skip_bound&&l.bound[_]&&l.bound[_](h),a&&yt(t,_)),d}):[],l.update(),a=!0,E(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){et();const _=ot(e.target);l.fragment&&l.fragment.l(_),_.forEach(st)}else l.fragment&&l.fragment.c();e.intro&&X(t.$$.fragment),mt(t,e.target,e.anchor,e.customElement),nt(),V()}$(s)}class Vt{$destroy(){pt(this,1),this.$destroy=w}$on(e,n){if(!O(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!Z(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{mt as A,pt as B,bt as C,Bt as D,ct as E,wt as F,vt as G,$t as H,w as I,xt as J,Ct as K,Et as L,qt as M,Jt as N,At as O,Kt as P,Ft as Q,It as R,Vt as S,St as a,Nt as b,Tt as c,ht as d,kt as e,Gt as f,X as g,st as h,Ut as i,Ot as j,lt as k,jt as l,ot as m,Mt as n,Lt as o,Pt as p,q,at as r,gt as s,zt as t,Dt as u,Rt as v,I as w,Ht as x,Qt as y,Wt as z};
