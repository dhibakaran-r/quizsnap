"use strict";(self.webpackChunkquizsnap=self.webpackChunkquizsnap||[]).push([[919],{7919:(e,s,t)=>{t.r(s),t.d(s,{default:()=>z});var l=t(5043),a=t(3216),i=(t(6064),t(2186)),n=t(9526),r=t(4163),c=t(9783),d=t(9367),x=t(579);const m=function(){const[e,s]=(0,l.useState)(!1);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.mg,{children:(0,x.jsx)("title",{children:"QuizSnap Dashboard"})}),(0,x.jsx)(i.A,{}),(0,x.jsx)("div",{className:"flex justify-center items-center",children:(0,x.jsx)(r.A,{})}),(0,x.jsx)(c.A,{})]})};var o=t(638),h=t(4423),u=t(1355),p=(t(8169),t(5475)),j=t(397),f=t(7196),g=t(3156),N=t(9698),b=t(3002),y=t(7391),v=t(9660),w=t(8929),k=t(6956);const q=function(){const[e,s]=(0,l.useState)(!1),t=()=>s(!e),i=(0,a.Zp)(),[r,c]=(0,l.useState)(!1),[d,m]=(0,l.useState)({name:"",email:"",uid:""});(0,l.useEffect)((()=>{(0,v.wR)()&&(0,y.Wl)().then((e=>{m({name:e.data.users[0].displayName,email:e.data.users[0].email,uid:e.data.users[0].localId})})).catch((e=>{})).finally((()=>{}))}),[]);const o=(0,v.Ms)()?w.p:w.X,h=(0,v.Ms)()?"/qsadmin/userprofile":"/qsuser/userprofile";return(0,x.jsxs)("div",{className:"w-full bg-bluebg border-b-2 border-b-graylg flex justify-between items-center h-16 fixed z-50",children:[(0,x.jsxs)("div",{className:"flex justify-center items-center gap-20 md:gap-40 ms-8",children:[(0,x.jsx)(p.N_,{to:"#",className:"lg:hidden w-full text-primary text-xl",children:e?(0,x.jsx)(f.Z6D,{onClick:t}):(0,x.jsx)(g.OXb,{onClick:t})}),(0,x.jsx)(p.N_,{to:"/",className:"hidden md:block text-secondary text-2xl font-semibold ",children:"QuizSnap"}),(0,x.jsx)("nav",{className:`bg-primary w-[16.1rem] h-dvh flex flex-col fixed top-16 ${e?"left-0":"-left-96"} duration-500 z-10 lg:hidden`,children:(0,x.jsx)("ul",{className:"nav-items",children:o.map(((e,t)=>(0,x.jsx)("li",{className:"item-name",children:(0,x.jsxs)(p.N_,{to:e.path,className:"flex flex-row justify-center items-center gap-4 text-xl",onClick:()=>{s(!1)},children:[(0,x.jsx)("span",{className:"text-xl",children:e.icon}),(0,x.jsx)("span",{className:"w-40 !text-[1rem] inline",children:e.title})]})},t)))})}),(0,x.jsx)("nav",{className:"hidden lg:block",children:(0,x.jsx)("ul",{className:"flex justify-center items-center gap-16",children:w.X.map(((e,s)=>(0,x.jsx)(p.N_,{to:e.path,className:"tline",children:(0,x.jsxs)("li",{className:" flex flex-row justify-center items-center gap-2 text-[1rem]",children:[e.icon,e.title]},s)})))})})]}),(0,x.jsx)(k.A,{}),(0,x.jsxs)("div",{className:"relative inline-block text-left right-4 md:right-8",children:[d.name&&d.email&&d.uid?(0,x.jsxs)("button",{type:"button",className:"inline-flex justify-center items-center gap-2 w-full rounded-md border-2 border-graylg shadow-sm px-0 py-0 md:px-4 md:py-2 bg-bgwhite text-sm font-medium text-bluetext",onClick:()=>c(!r),children:[(0,x.jsx)("img",{src:n,className:"w-12 md:w-8 rounded-3xl"}),(0,x.jsx)(g.BNo,{className:`hidden md:block ${r?"rotate-180":"rotate-0"} duration-300`})]}):(0,x.jsxs)("div",{children:[" ",(0,x.jsxs)("p",{className:"w-96 flex justify-center items-center gap-2 text-bluetext animate-pulse",children:[(0,x.jsx)(j.KeG,{className:"animate-spin"})," Loading data..."]})," "]}),r&&(0,x.jsx)("div",{className:"origin-top-right absolute right-4 md:right-4 mt-2 w-48 md:w-64 rounded-md shadow-lg bg-primary ring-1 ring-black ring-opacity-5 focus:outline-none z-10",children:(0,x.jsxs)("div",{className:"py-1 text-bgwhite",role:"menu","aria-orientation":"vertical","aria-labelledby":"options-menu",children:[(0,x.jsxs)("p",{role:"menuitem",className:"px-4 py-2 flex gap-2 items-center",children:["Signed in as ",d.email]}),(0,x.jsxs)(p.N_,{role:"menuitem",to:h,className:"px-4 py-2 flex gap-2 items-center duration-200 hover:translate-x-2",onClick:()=>c(!1),children:[(0,x.jsx)(b.h5H,{})," Profile"]}),(0,x.jsxs)(p.N_,{role:"menuitem",className:"flex px-4 py-2 gap-2 items-center duration-200 hover:translate-x-2",onClick:e=>{e.preventDefault(),(0,v.ri)(),i("/")},children:[(0,x.jsx)(N.ueG,{})," Logout"]})]})})]})]})};const z=function(){return(0,x.jsxs)("div",{children:[(0,x.jsx)(d.mg,{children:(0,x.jsx)("title",{children:"QuizSnap User"})}),(0,x.jsx)(q,{}),(0,x.jsx)("section",{className:"flex flex-col gap-24 mx-4 relative top-24",children:(0,x.jsxs)(a.BV,{children:[(0,x.jsx)(a.qh,{path:"/dashboard",element:(0,x.jsx)(m,{})}),(0,x.jsx)(a.qh,{path:"/mcqs",element:(0,x.jsx)(o.A,{})}),(0,x.jsx)(a.qh,{path:"/testpage",element:(0,x.jsx)(u.A,{})}),(0,x.jsx)(a.qh,{path:"/userprofile",element:(0,x.jsx)(h.A,{})})]})})]})}}}]);
//# sourceMappingURL=919.772c0b1a.chunk.js.map