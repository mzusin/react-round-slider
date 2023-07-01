/* 
MZ React Round Slider v1.0.0
https://github.com/mzusin/react-round-slider
MIT License      
Copyright (c) 2023-present, Miriam Zusin          
*/
var Ct=Object.defineProperty;var Pe=Object.getOwnPropertySymbols;var It=Object.prototype.hasOwnProperty,Rt=Object.prototype.propertyIsEnumerable;var Ee=(e,n,t)=>n in e?Ct(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,B=(e,n)=>{for(var t in n||(n={}))It.call(n,t)&&Ee(e,t,n[t]);if(Pe)for(var t of Pe(n))Rt.call(n,t)&&Ee(e,t,n[t]);return e};import{useEffect as b,useRef as fe,useState as f}from"react";var At=Math.pow,v=(e,n=1/0)=>{if(n===1/0)return e;n<0&&(n=0);let t=At(10,n);return Math.round(e*t)/t},y=(e,n)=>(e%n+n)%n,K=(e,n,t,r,o)=>(o-r)*(e-n)/(t-n)+r;var j=e=>!isNaN(parseFloat(e))&&isFinite(e),ae=(e,n,t,r=1/0)=>{let[o,i]=e,[a,l]=n;return[v(o+a*Math.cos(t),r),v(i+l*Math.sin(t),r)]};var Te=(e,n=1/0)=>{let t=e*(180/Math.PI);return v(t,n)},q=(e,n=1/0)=>{let t=e*(Math.PI/180);return v(t,n)};var J=(e,n,t=1/0)=>{let r=Math.abs(y(e,360)-y(n,360));return v(r<=180?r:360-r,t)};var Dt=(e,n,t=1/0)=>{let r=[];for(let o=0;o<e.length;o++)r.push(v(e[o]-n[o],t));return r},Ce=(e,n,t=1/0)=>Dt(e,n,t);var wt=(e,n,t=1/0)=>{let r=[];for(let o=0;o<e.length;o++)r.push(v(e[o]*n,t));return r},Ie=(e,n,t=1/0)=>wt(e,n,t);var yt=(e,n=1/0)=>{let t=0;for(let r=0;r<e.length;r++)t+=e[r]*e[r];return v(Math.sqrt(t),n)};var Lt=(e,n=1/0)=>{let t=yt(e),r=[];for(let o=0;o<e.length;o++)r.push(t===0?0:v(e[o]/t,n));return r},Re=(e,n=1/0)=>Lt(e,n);var Ae=(e,n,t,r)=>(n=n%Math.PI*2,[e[0]+Math.cos(n)*t,e[1]+Math.sin(n)*r]);var ie=()=>Math.random().toString(36).substring(2)+new Date().getTime().toString(36);var S=(e,n)=>j(e)?Number(e):n,ee=(e,n)=>e==null?n:e,G=(e,n)=>e==null?n:e;var se="#efefef",le="#5daed2",U="#333";var De={filter:"opacity(0.7) grayscale(100%)"},we={outline:"none"},ye={outline:"none"},ue=2;var Le=(e,n,t)=>t>=e&&t<=n||t+360>=e&&t+360<=n,Ve=(e,n)=>{let t=S(e,0),r=S(n,359.999);return t=y(t,360),r=y(r,360),t<0&&(t+=360),r<0&&(r+=360),r<t&&(r+=360),t===r&&(r+=359.999),[t,r]};var ke=e=>{if(e.length<=0)return[0,0];let n=-1/0,t=-1/0;for(let r of e){let[o,i]=r.pointerRadii;n=Math.max(n,Math.max(0,o)),t=Math.max(t,Math.max(0,i))}return[n,t]},Oe=(e,n,t)=>{if(t&&t.length>0){let i=t.findIndex(u=>u===e),a=t.findIndex(u=>u===n),l=i===-1?0:i,s=a===-1?t.length-1:a;return[l,s]}let r=S(e,0),o=S(n,100);return r>o&&(o=r+100),[r,o]},Bt=(e,n,t,r)=>{if(r&&r.length>0){let i=r.findIndex(a=>a===e);return i===-1?0:i}let o=S(e,n);return o<n&&(o=n),o>t&&(o=t),o};var te=(e,n,t,r,o)=>{let i=n===t?0:K(e,0,100,n,t);return o&&o.length>0?o[Math.round(i)]:v(i,r)},kt=(e,n)=>n===0?0:Math.round(e/n)*n,ce=(e,n,t,r)=>{if(r===void 0&&t&&(r=1),r===void 0)return;let o=n-e;return o===0?0:r*100/o},$e=(e,n,t,r,o,i)=>{let a=[],l=e||[];for(let s=0;s<l.length;s++){let u=l[s];if(u.rx<=0||u.ry<=0)continue;let d=Bt(u.value,n,t,r),x=n===t?0:K(n,t,0,100,d),c={pointerRadii:[S(u.rx,10),S(u.ry,10)],percent:x,id:ie(),index:0,bgColor:u.bgColor||o||U,pointerSVG:i||u.pointerSVG,disabled:u.disabled===!0,keyboardDisabled:!1,mousewheelDisabled:!1,ariaLabel:u.ariaLabel};a.push(c)}if(a.length>1){a.sort((s,u)=>s.percent-u.percent);for(let s=0;s<a.length;s++)a[s].index=s}return!a||a.length<=0?[{pointerRadii:[10,10],percent:0,id:ie(),index:0,bgColor:U,disabled:!1,keyboardDisabled:!1,mousewheelDisabled:!1}]:a},z=(e,n,t,r,o)=>{let i=Math.abs(t-n),a=e*i/100,l=y(n+a,360),s=q(l);return s=K(s,0,Math.PI*2,0,Math.PI),{position:Ae(o,s,r[0],r[1]),angleDegrees:l}},Fe=e=>{if(!e||e.length<2)return null;let n=1/0,t=null,r=-1/0,o=null;for(let i=0;i<e.length;i++){let a=e[i];a.percent<n&&(n=a.percent,t=a),a.percent>r&&(r=a.percent,o=a)}return t===null||o===null?null:[t,o]},He=(e,n,t,r,o,i,a,l,s,u)=>{let[d,x]=n,{left:c,top:h}=e.getBoundingClientRect(),g=[d-c,x-h],E=Ce(g,t),[A,M]=r,p=Math.atan2(E[1]/M,E[0]/A);p<0&&(p+=2*Math.PI);let P=Te(p);if(!Le(o,i,P)){let D=J(P,o),O=J(P,i);return D<=O?a:l}let k=Math.abs(i-o),C=P*100/k,L=ce(a,l,s,u);return L===void 0?C:kt(C,L)},X=(e,n)=>!e||!n?-1:e.findIndex(t=>t.id===n),Ot=e=>e.getAttribute("data-type")==="panel",$t=e=>e.getAttribute("data-type")==="panel-fill",Ft=(e,n)=>e.getAttribute("data-type")==="pointer"&&e.getAttribute("data-id")===n||e.querySelector(`[data-type="pointer"][data-index="${n}"]`)!==null,Ge=(e,n,t,r,o,i,a)=>{if(n.length<=0)return null;if(n.length===1)return n[0].id;if(a==="drag")return r;if(Ot(e)||$t(e)){let l=Math.abs(i-o),s=t*l/100,u=1/0,d=null;for(let x=0;x<n.length;x++){let c=n[x],h=c.percent*l/100,g=J(h,s);g<u&&(u=g,d=c.id)}return d}for(let l=0;l<n.length;l++){let s=n[l];if(Ft(e,s.id))return s.id}return r};var Ht=(e,n)=>{let t=e.find(l=>l.id===n);if(!t)return null;let r=y(t.index+1,e.length),o=e.find(l=>l.index===r);if(!o)return null;let i=y(t.index-1,e.length),a=e.find(l=>l.index===i);return[t,o,a]},Ue=(e,n)=>{if(e[0].disabled)return e;let t=[...e],r=t[0];return r.percent=n,t[0]=r,t},ze=(e,n,t)=>{if(!t)return e;let r=e.findIndex(a=>a.id===t);if(r===-1||e[r].disabled)return e;let o=[...e],i=B({},o[r]);return i.percent=n,o[r]=i,o},Ye=(e,n,t,r,o)=>{let[i,a,l]=Ht(n,t),s=e-i.percent,u=Math.abs(o-r)/2;if(s!==0&&i.percent!==0&&e!==0){let d=Math.abs(s)>u?s<0:s>=0;d&&a.percent>=i.percent&&(e=Math.min(e,a.percent)),!d&&l.percent<=i.percent&&(e=Math.max(e,l.percent))}return e};var me=(e,n,t)=>{let[r,o]=e,[i,a]=n,l=Math.max(0,i*2-t),s=Math.max(0,a*2-t),u=r*2+t+l,d=o*2+t+s;return[u,d]},de=(e,n,t)=>{let[r,o]=me(e,n,t);return[v(r/2,2),v(o/2,2)]},qe=(e,n,t,r,o)=>{let i=n,a=i-e<=180?0:1;e>i&&(i+=360);let l=de(t,r,o),s=ae(l,t,q(e)),u=ae(l,t,q(i));return{start:s,end:u,largeArcFlag:a}};import{forwardRef as Gt}from"react";import{jsx as zt}from"react/jsx-runtime";var Ut=(e,n)=>{let{ellipse:t,strokeWidth:r,svgRadii:o,bgColor:i}=e,{start:a,end:l,largeArcFlag:s}=t;return zt("path",{"data-type":"panel",ref:n,d:`M ${a[0]} ${a[1]} A ${o[0]} ${o[1]} 0 ${s} 1 ${l[0]} ${l[1]}`,stroke:i,strokeWidth:r,fill:"none",shapeRendering:"geometricPrecision",strokeLinecap:"round",cursor:"pointer"})},Xe=Gt(Ut);import{useEffect as Yt,useState as he}from"react";import{Fragment as Xt,jsx as We}from"react/jsx-runtime";var qt=e=>{let{pointers:n,ellipse:t,strokeWidth:r,svgCenter:o,svgRadii:i,connectionBgColor:a,startEndAngle:l}=e,{start:s}=t,[u,d]=l,[x,c]=he(null),[h,g]=he(null),[E,A]=he(0);return Yt(()=>{if(!n||n.length<=0)return;if(n.length<=1){let D=n[0],{position:O,angleDegrees:re}=z(D.percent,u,d,i,o);c(s),g(O),A(Math.abs(re-u)<=180?0:1);return}let M=Fe(n);if(M===null)return;let p=M[0],P=M[1],{position:T,angleDegrees:k}=z(p.percent,u,d,i,o),{position:C,angleDegrees:L}=z(P.percent,u,d,i,o);c(T),g(C),A(Math.abs(L-k)<=180?0:1)},[d,n,s,u,o,i]),We(Xt,{children:x!==null&&h!==null&&We("path",{"data-type":"panel-fill",d:`M ${x[0]} ${x[1]} A ${i[0]} ${i[1]} 0 ${E} 1 ${h[0]} ${h[1]}`,stroke:a,strokeWidth:r+1,fill:"none",shapeRendering:"geometricPrecision",strokeLinecap:"round",cursor:"pointer",pointerEvents:"none"})})},Qe=qt;import{useEffect as Ze,useState as Ke}from"react";import{Fragment as je,jsx as ne,jsxs as Qt}from"react/jsx-runtime";var Wt=e=>{let{id:n,pointer:t,startEndAngle:r,svgRadii:o,svgCenter:i,pointerBgColor:a,pointerSVG:l,disabledPointerStyle:s,min:u,max:d,round:x,data:c,ariaLabel:h}=e,{percent:g,pointerRadii:E}=t,[A,M]=E,[p,P]=r,[T,k]=Ke(null),[C,L]=Ke("");Ze(()=>{let{position:O}=z(g,p,P,o,i);k(O)},[g,o,i,p,P]),Ze(()=>{L(te(g,u,d,x,c))},[u,d,x,c,g]);let D=B({},ye);return t.disabled&&(D=B(B({},D),s)),T?Qt(je,{children:[!l&&ne("ellipse",{className:t.disabled?"disabled":void 0,style:D,"aria-disabled":t.disabled?!0:void 0,"aria-valuenow":C,"aria-valuetext":C.toString(),"aria-label":h,"data-type":"pointer","data-index":t.index,"data-id":n,"data-percent":t.percent,cx:T[0],cy:T[1],rx:A,ry:M,cursor:"pointer",tabIndex:0,role:"slider",fill:a}),l&&ne("g",{className:t.disabled?"disabled":void 0,style:D,"aria-disabled":t.disabled?!0:void 0,"aria-valuenow":C,"aria-valuetext":C.toString(),"aria-label":h,"data-type":"pointer","data-index":t.index,"data-id":n,"data-percent":t.percent,cursor:"pointer",transform:`translate(${T[0]-A/2}, ${T[1]-M/2})`,tabIndex:0,role:"slider",children:ne("g",{pointerEvents:"none",children:l})})]}):ne(je,{})},Je=Wt;import{useEffect as Zt,useState as Kt}from"react";import{jsx as Jt}from"react/jsx-runtime";var jt=e=>{let{svgCenter:n,round:t,min:r,max:o,pointers:i,data:a,textPrefix:l,textSuffix:s}=e,[u,d]=n,[x,c]=Kt("");return Zt(()=>{let h=[];for(let g of i){let E=te(g.percent,r,o,t,a);h.push(`${l||""}${E}${s||""}`)}c(h.join(" "))},[a,o,r,i,t,l,s]),Jt("text",{x:u,y:d,style:{userSelect:"none"},textAnchor:"middle",children:x})},et=jt;import{useEffect as en,useState as tn}from"react";import{jsx as tt}from"react/jsx-runtime";var nn=(e,n,t)=>{var i;let r=[],o=e===0?0:n/e;for(let a=0;a<e;a++){let l=a*o,s=(i=t==null?void 0:t.current)==null?void 0:i.getPointAtLength(l),u=s?s.x:0,d=s?s.y:0;r.push({distance:l,x:u,y:d})}return r},rn=e=>{let{ticksColor:n,ticsCount:t,totalLength:r,sliderRef:o,svgCenter:i}=e,[a,l]=tn([]);en(()=>{l(nn(t,r,o))},[t,r]);let[s,u]=i;return tt("g",{children:a.map((d,x)=>{let{x:c,y:h}=d,E=Math.sqrt(Math.pow(s-c,2)+Math.pow(u-h,2))*.1,A=Re([s-c,u-h]),M=Ie(A,E),p=c+M[0],P=h+M[1];return tt("line",{x1:c,y1:h,x2:p,y2:P,strokeWidth:3,stroke:n},x)})})},nt=rn;import{jsx as W,jsxs as un}from"react/jsx-runtime";var Mr=e=>{var Me;let n=fe(null),t=fe(null),r=fe("click"),[o,i]=f(null),[a,l]=f([0,0]),[s,u]=f(0),[d,x]=f([0,0]),[c,h]=f([]),[g,E]=f([0,0]),[A,M]=f([0,0]),[p,P]=f([0,0]),[T,k]=f([0,0]),[C,L]=f({start:[0,0],end:[0,0],largeArcFlag:0}),[D,O]=f(se),[re,rt]=f(le),[ge,ot]=f(U),[at,it]=f(!1),[$,st]=f(!1),[lt,ut]=f(void 0),[xe,ct]=f(!1),[mt,dt]=f(!1),[pe,ht]=f(ue),[V,_]=d,[ft,gt]=A,[Q,Z]=T,[xt,pt]=f(!1),[bt,vt]=f(""),[St,Mt]=f(""),[Pt,Et]=f(!1);b(()=>{Et(G(e.disableTicks,!1))},[e.disableTicks]),b(()=>{O(ee(e.bgColor,se)),rt(ee(e.connectionBgColor,le)),ot(ee(e.pointerBgColor,U))},[e.bgColor,e.connectionBgColor,e.pointerBgColor]),b(()=>{it(G(e.pointersOverlap,!1))},[e.pointersOverlap]),b(()=>{st(G(e.disabled,!1)),ut(e.disabledPointerStyle||De),ct(G(e.keyboardDisabled,!1)),dt(G(e.mousewheelDisabled,!1))},[e.disabled,e.disabledPointerStyle,e.keyboardDisabled,e.mousewheelDisabled]),b(()=>{l([S(e.rx,150),S(e.ry,150)])},[e.rx,e.ry]),b(()=>{u(S(e.strokeWidth,5))},[e.strokeWidth]),b(()=>{x(Oe(e.min,e.max,e.data))},[e.min,e.max,e.data]),b(()=>{h($e(e.pointers,V,_,e.data,ge,e.pointerSVG))},[e.pointers,e.data,V,_,ge,e.pointerSVG]),b(()=>{E(ke(c))},[c]),b(()=>{M(me(a,g,s))},[a,g,s]),b(()=>{P(de(a,g,s))},[a,g,s]),b(()=>{k(Ve(e.startAngleDegrees,e.endAngleDegrees))},[e.startAngleDegrees,e.endAngleDegrees]),b(()=>{L(qe(Q,Z,a,g,s))},[Q,Z,a,g,s]),b(()=>{ht(S(e.round,ue))},[e.round]),b(()=>{pt(e.hideText),vt(e.textPrefix),Mt(e.textSuffix)},[e.hideText,e.textPrefix,e.textSuffix]);let F=m=>{var Y;if($||!n||!n.current)return;let I=m.type.indexOf("mouse")!==-1?m.clientX:m.touches[0].clientX,N=m.type.indexOf("mouse")!==-1?m.clientY:m.touches[0].clientY,R=He(n.current,[I,N],p,a,Q,Z,V,_,e.data,e.step);if(c.length<=1){i(((Y=c[0])==null?void 0:Y.id)||null),h(H=>Ue(H,R));return}let w=o;i(H=>(w=Ge(m.target,c,R,H,Q,Z,r.current),w)),w!==null&&h(H=>(at||_===V||(R=Ye(R,H,w,V,_)),ze(H,R,w)))},Tt=m=>{if($)return;let I=m.target;!I||!(I===t.current||I.getAttribute("data-type")==="pointer")||(F(m),window.addEventListener("mousemove",F),window.addEventListener("mouseup",be),r.current="drag")},be=m=>{window.removeEventListener("mousemove",F),window.removeEventListener("mouseup",F),r.current="click"},oe=m=>{let I=X(c,o);if(I===-1)return;let N=B({},c[I]),R=N.percent;if(!j(R))return;let w=ce(V,_,e.data,e.step);w===void 0&&(w=1),m?R-=w:R+=w,R>100&&(R=100),N.percent=R;let Y=[...c];Y[I]=N,h(Y)},ve=()=>{if($||xe)return;let m=X(c,o);m===-1||c[m].disabled||oe(!1)},Se=()=>{if($||xe)return;let m=X(c,o);m===-1||c[m].disabled||oe(!0)};return un("svg",{"data-type":"bg",xmlns:"http://www.w3.org/2000/svg",ref:n,width:ft,height:gt,onMouseDown:Tt,onMouseUp:be,onTouchMove:F,onTouchStart:F,onKeyDown:m=>{switch(m.key){case"ArrowLeft":{m.preventDefault(),ve();break}case"ArrowRight":{m.preventDefault(),Se();break}case"ArrowUp":{m.preventDefault(),ve();break}case"ArrowDown":{m.preventDefault(),Se();break}}},className:$?"disabled":void 0,"aria-disabled":$?!0:void 0,tabIndex:0,focusable:!0,onWheel:m=>{if($||mt)return;let I=X(c,o);if(I===-1||c[I].disabled)return;m.stopPropagation();let N=m.deltaY<0;oe(!N)},style:we,children:[W(Xe,{ref:t,ellipse:C,strokeWidth:s,svgRadii:a,bgColor:D}),!Pt&&W(nt,{sliderRef:t,ticksColor:D,ticsCount:100,totalLength:((Me=t==null?void 0:t.current)==null?void 0:Me.getTotalLength())||0,svgCenter:p}),W(Qe,{pointers:c,ellipse:C,svgRadii:a,strokeWidth:s,connectionBgColor:re,startEndAngle:T,svgCenter:p}),c.map(m=>W(Je,{pointer:m,id:m.id,startEndAngle:T,svgRadii:a,svgCenter:p,pointerBgColor:m.bgColor,pointerSVG:e.pointerSVG||m.pointerSVG,disabledPointerStyle:lt,min:V,max:_,round:pe,data:e.data,ariaLabel:m.ariaLabel},m.id)),!xt&&W(et,{svgCenter:p,round:pe,min:V,max:_,pointers:c,data:e.data,textPrefix:bt,textSuffix:St})]})};export{Mr as RoundSlider};
//# sourceMappingURL=mz-react-round-slider.esm.js.map
