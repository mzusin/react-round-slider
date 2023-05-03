/* 
MZ React Round Slider v1.0.0
https://github.com/mzusin/react-round-slider
MIT License      
Copyright (c) 2023-present, Miriam Zusin          
*/
import{useEffect as D,useRef as I}from"react";import{jsx as M,jsxs as S}from"react/jsx-runtime";var E=(a,n,t,o,u)=>{let s=(u-90)*Math.PI/180;return[a+t*Math.cos(s),n+o*Math.sin(s)]},H=a=>{let n=I(null),{rx:t,ry:o,startAngle:u,endAngle:s,strokeWidth:r,stroke:w,rxHandle:l,ryHandle:d}=a,x=t*2,R=o*2,$=0,L=s-u<=180?0:1,b=1;s%360===0&&(s-=1e-5);let h=Math.max(0,l*2-r),m=Math.max(0,d*2-r),y=x+r+h,T=R+r+m,g=t+r/2+h/2,p=o+r/2+m/2,c=E(g,p,t,o,u),v=E(g,p,t,o,s),i=e=>{if(!n||!n.current)return;console.log("getTotalLength",n.current.getTotalLength(),n.current.getPointAtLength(0));let A=e.type.indexOf("mouse")!==-1?e.clientX:e.touches[0].clientX,P=e.type.indexOf("mouse")!==-1?e.clientY:e.touches[0].clientY;console.log(A,P)},k=e=>{e.preventDefault&&e.preventDefault(),i(e),window.addEventListener("mousemove",i),window.addEventListener("mouseup",f)},f=e=>{window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",i)};return D(()=>{},[]),S("svg",{xmlns:"http://www.w3.org/2000/svg",width:y,height:T,children:[M("path",{d:`M ${c[0]} ${c[1]} A ${t} ${o} ${$} ${L} ${b} ${v[0]} ${v[1]}`,stroke:w,strokeWidth:r,fill:"none",shapeRendering:"geometricPrecision",strokeLinecap:"round",cursor:"pointer"}),M("ellipse",{onMouseDown:k,onMouseUp:f,ref:n,cx:c[0],cy:c[1],rx:l,ry:d,cursor:"pointer",fill:"#000"})]})};export{H as RoundSlider};
//# sourceMappingURL=mz-react-round-slider.esm.js.map
