!function(e){function t(t){for(var a,u,c=t[0],o=t[1],i=t[2],f=0,s=[];f<c.length;f++)u=c[f],Object.prototype.hasOwnProperty.call(n,u)&&n[u]&&s.push(n[u][0]),n[u]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);for(d&&d(t);s.length;)s.shift()();return r.push.apply(r,i||[]),l()}function l(){for(var e,t=0;t<r.length;t++){for(var l=r[t],a=!0,c=1;c<l.length;c++){var o=l[c];0!==n[o]&&(a=!1)}a&&(r.splice(t--,1),e=u(u.s=l[0]))}return e}var a={},n={0:0},r=[];function u(t){if(a[t])return a[t].exports;var l=a[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,u),l.l=!0,l.exports}u.m=e,u.c=a,u.d=function(e,t,l){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(u.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(l,a,function(t){return e[t]}.bind(null,a));return l},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="";var c=window.webpackJsonp=window.webpackJsonp||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var i=0;i<c.length;i++)t(c[i]);var d=o;r.push([20,1]),l()}({11:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.monthMapping=t.churchesMapping=void 0;var a=new Map([["molyavka","Молявковская Михайловская церковь"],["sloveny","Словенинская Петропавловская церковь"],["bobr","Бобрская святителя Николая церковь"],["nizgolovo","Низголовская Иоанно-Предчетинская церковь"],["usaya","Усайская Покрова Пресвятой Богородицы церковь"],["hotino","Хотинская Святого Иосифа Обручника церковь"]]);t.churchesMapping=a;var n=new Map([["JAN","Январь"],["FEB","Февраль"],["MAR","Март"],["APR","Апрель"],["MAY","Май"],["JUN","Июнь"],["JUL","Июль"],["AUG","Август"],["SEP","Сентябрь"],["OCT","Октябрь"],["NOV","Ноябрь"],["DEC","Декабрь"]]);t.monthMapping=n},12:function(e,t,l){"use strict";l.r(t),t.default=l.p+"6bf7218d9613f3b06b50745912c1826e.svg"},20:function(e,t,l){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(l(9)),r=a(l(1)),u=a(l(25)),c=document.getElementById("root");n.default.render(r.default.createElement(u.default,null),c)},25:function(e,t,l){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(l(1)),r=a(l(26)),u={apiKey:"AIzaSyDqC198eemhv7skBlnZ5_5-Qdn2miXgcHw",authDomain:"shappo-auth.firebaseapp.com",projectId:"shappo-auth",storageBucket:"shappo-auth.appspot.com",messagingSenderId:"763157880265",appId:"1:763157880265:web:be0c9b0568571d312b9c18"},c=a(l(37));r.default.initializeApp(u);t.default=function(){var e=n.default.useState(!1),t=e[0],l=e[1];return t?n.default.createElement(c.default,null):n.default.createElement("button",{className:"btn btn-primary type-table",onClick:function(){var e=new r.default.auth.GoogleAuthProvider;r.default.auth().signInWithPopup(e).then((function(e){e.additionalUserInfo.isNewUser?(e.user.delete(),console.info("There no access!")):l(!0)})).catch((function(e){console.error(e)}))}},"Google")}},37:function(e,t,l){"use strict";var a=this&&this.__spreadArray||function(e,t,l){if(l||2===arguments.length)for(var a,n=0,r=t.length;n<r;n++)!a&&n in t||(a||(a=Array.prototype.slice.call(t,0,n)),a[n]=t[n]);return e.concat(a||Array.prototype.slice.call(t))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.groupedOptions=t.lepelskiyUezd=t.sennenskiyUezd=void 0;var r=n(l(1)),u=n(l(67)),c=n(l(63)),o=n(l(64)),i=n(l(65)),d=l(66)("1SQITOMPJN","2f1a6c924bc9f33235bb98e570053a79");t.sennenskiyUezd=[{value:"molyavka",label:"Молявковская Михайловская церковь"},{value:"sloveny",label:"Словенинская Петропавловская церковь"},{value:"bobr",label:"Бобрская святителя Николая церковь"}],t.lepelskiyUezd=[{value:"nizgolovo",label:"Низголовская Иоанно-Предчетинская церковь"},{value:"usaya",label:"Усайская Покрова Пресвятой Богородицы церковь"},{value:"hotino",label:"Хотинская Святого Иосифа Обручника церковь"}],t.groupedOptions=[{label:"Сенненский уезд",options:t.sennenskiyUezd},{label:"Лепельский уезд",options:t.lepelskiyUezd}];var f={display:"flex",alignItems:"center",justifyContent:"space-between"},s={backgroundColor:"#EBECF0",borderRadius:"2em",color:"#172B4D",display:"inline-block",fontSize:12,fontWeight:"normal",lineHeight:"1",minWidth:1,padding:"0.16666666666667em 0.5em",textAlign:"center"},m=function(e){return r.default.createElement("div",{style:f},r.default.createElement("span",null,e.label),r.default.createElement("span",{style:s},e.options.length))};t.default=function(){var e=r.default.useState(""),l=e[0],n=e[1],f=r.default.useState([]),s=f[0],h=f[1],p=r.default.useState(["molyavka"]),g=p[0],v=p[1],b=r.default.useState("born"),E=b[0],y=b[1],_=r.default.useState([]),k=_[0],M=_[1],N=r.default.useState({}),w=N[0],S=N[1],O=r.default.useState(d.initIndex("born")),T=O[0],F=O[1];r.default.useEffect((function(){F(d.initIndex(E))}),[E]);var C=function(e){var t=e.currentTarget;M([]),y(t.value)};r.default.useEffect((function(){T.search("",{hitsPerPage:0,facets:["*"],facetFilters:[a([],g.map((function(e){return"church:".concat(e)})),!0)]}).then((function(e){var t=e.facets;h(Object.keys(t.year)),S(t)}))}),[g]),r.default.useEffect((function(){l.length&&T.search(l,{facetFilters:[a([],g.map((function(e){return"church:".concat(e)})),!0),a([],s.map((function(e){return"year:".concat(e)})),!0)]}).then((function(e){var t=e.hits;e.facets;M(t)}))}),[T,s,l]);var P=function(e){e.target.checked?h(a(a([],s,!0),[e.target.value],!1)):h(s.filter((function(t){return t!==e.target.value})))};return r.default.createElement(r.default.Fragment,null,r.default.createElement(u.default,{defaultValue:t.sennenskiyUezd[0],isMulti:!0,options:t.groupedOptions,formatGroupLabel:m,onChange:function(e){M([]),v(e.map((function(e){return e.value})))}}),r.default.createElement("div",{className:"type-table"},r.default.createElement("div",{className:"form-check form-check-inline"},r.default.createElement("input",{className:"form-check-input",defaultChecked:!0,type:"radio",name:"type",id:"born",value:"born",onChange:C}),r.default.createElement("label",{className:"form-check-label",htmlFor:"born"},"О рождении")),r.default.createElement("div",{className:"form-check form-check-inline"},r.default.createElement("input",{className:"form-check-input",type:"radio",name:"type",id:"marriage",value:"marriage",onChange:C}),r.default.createElement("label",{className:"form-check-label",htmlFor:"marriage"},"О бракосочетавшихся")),r.default.createElement("div",{className:"form-check form-check-inline"},r.default.createElement("input",{className:"form-check-input",type:"radio",name:"type",id:"died",value:"died",onChange:C}),r.default.createElement("label",{className:"form-check-label",htmlFor:"died"},"О умерших"))),r.default.createElement("div",{className:"years-facets"},w&&w.year&&Object.keys(w.year).map((function(e,t){return r.default.createElement("div",{key:t+"facet",className:"form-check form-check-inline"},r.default.createElement("input",{defaultChecked:!0,onChange:P,value:e,id:t+"",className:"form-check-input",type:"checkbox"}),r.default.createElement("label",{className:"form-check-label",htmlFor:t+""},e))}))),r.default.createElement("input",{autoFocus:!0,onInput:function(e){var t=e.target;n(t.value)},onChange:function(e){27==e.which&&(n(""),M([]))},type:"text",value:l,id:"input"}),k.length&&"born"===E?r.default.createElement(c.default,{hits:k,churches:g,yearsFilter:s}):"",k.length&&"marriage"===E?r.default.createElement(o.default,{hits:k,churches:g,yearsFilter:s}):"",k.length&&"died"===E?r.default.createElement(i.default,{hits:k,churches:g,yearsFilter:s}):"")}},63:function(e,t,l){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(l(1)),r=l(11),u=a(l(12));t.default=function(e){var t=e.hits,l=e.churches,a=e.yearsFilter;return n.default.useEffect((function(){[].forEach.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'),(function(e){return new bootstrap.Tooltip(e)}))}),[t.length]),n.default.createElement(n.default.Fragment,null,n.default.createElement("table",{className:"table table-striped"},n.default.createElement("thead",null,n.default.createElement("tr",null,n.default.createElement("th",null),l.length>1&&n.default.createElement("th",null,"Церковь"),1!==a.length&&n.default.createElement("th",null,"Год"),n.default.createElement("th",null,"Дата"),n.default.createElement("th",{className:"born-name-tr"},"Родился"),n.default.createElement("th",null,"Родители"),n.default.createElement("th",null,"Восприемники"),n.default.createElement("th",null,"Заметки"))),n.default.createElement("tbody",{id:"list-of-res"},t.map((function(e,t){var c,o,i,d=e.church,f=e.year,s=e.month,m=e.born,h=e.notes,p=e._highlightResult;return n.default.createElement("tr",{key:t},n.default.createElement("td",null,n.default.createElement("button",{className:"btn btn-light",onClick:function(t){return function(e,t){var l=t.year,a=t.month,n=t.born,u=t.church,c=t.name,o=t.parants,i=t.godparents;try{navigator.clipboard.writeText("\n".concat(r.churchesMapping.get(u),"\nДата: ").concat(l," ").concat(a," ").concat(n,"\nИмя родившегося: ").concat(c,"\nРодители: ").concat(o,"\nКрестные: ").concat(i,"\n            ").trim());var d=new bootstrap.Tooltip(e,{title:"Скопировано",placement:"right"});d.show(),setTimeout((function(){return d.dispose()}),300)}catch(e){console.error("Failed to copy: ",e)}}(t.target,e)}},"Copy")),l.length>1&&n.default.createElement("td",{className:"church-td"},r.churchesMapping.get(d)),1!==a.length&&n.default.createElement("td",null,f),n.default.createElement("td",null,m," ",s),n.default.createElement("td",{className:"born-name-tr",dangerouslySetInnerHTML:{__html:null===(c=null==p?void 0:p.name)||void 0===c?void 0:c.value}}),n.default.createElement("td",{dangerouslySetInnerHTML:{__html:null===(o=null==p?void 0:p.parants)||void 0===o?void 0:o.value}}),n.default.createElement("td",{dangerouslySetInnerHTML:{__html:null===(i=null==p?void 0:p.godparents)||void 0===i?void 0:i.value}}),n.default.createElement("td",{className:"note-info"},h?n.default.createElement("img",{src:u.default,alt:h,title:h,"data-bs-toggle":"tooltip"}):null))})))))}},64:function(e,t,l){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(l(1)),r=l(11),u=a(l(12));t.default=function(e){var t=e.hits,l=e.churches,a=e.yearsFilter;return n.default.useEffect((function(){[].forEach.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'),(function(e){return new bootstrap.Tooltip(e)}))}),[t.length]),n.default.createElement(n.default.Fragment,null,n.default.createElement("table",{className:"table table-striped"},n.default.createElement("thead",null,n.default.createElement("tr",null,n.default.createElement("th",null),l.length>1&&n.default.createElement("th",null,"Церковь"),1!==a.length&&n.default.createElement("th",null,"Год"),n.default.createElement("th",null,"Дата"),n.default.createElement("th",null,"Жених"),n.default.createElement("th",{className:"age-tr"},"Его возраст"),n.default.createElement("th",null,"Невеста"),n.default.createElement("th",{className:"age-tr"},"Ее возраст"),n.default.createElement("th",null,"Кто были попечители"),n.default.createElement("th",null,"Заметки"))),n.default.createElement("tbody",{id:"list-of-res"},t.map((function(e,t){var c,o,i,d=e.church,f=e.year,s=e.month,m=e.day,h=e.husband_age,p=e.wife_age,g=e.notes,v=e._highlightResult;return n.default.createElement("tr",{key:t},n.default.createElement("td",null,n.default.createElement("button",{className:"btn btn-light",onClick:function(t){return function(e,t){var l=t.church,a=t.year,n=t.month,u=t.day,c=t.husband,o=t.husband_age,i=t.wife,d=t.wife_age,f=t.trustees;try{navigator.clipboard.writeText("\n".concat(r.churchesMapping.get(l),"\nДата: ").concat(a," ").concat(n," ").concat(u,"\nЖених: ").concat(c,"\nВозраст жениха: ").concat(o,"\nНевеста: ").concat(i,"\nВозраст невесты: ").concat(d,"\nПопечители: \n").concat(f,"\n            ").trim());var s=new bootstrap.Tooltip(e,{title:"Скопировано",placement:"right"});s.show(),setTimeout((function(){return s.dispose()}),300)}catch(e){console.error("Failed to copy: ",e)}}(t.target,e)}},"Copy")),l.length>1&&n.default.createElement("td",{className:"church-td"},r.churchesMapping.get(d)),1!==a.length&&n.default.createElement("td",null,f),n.default.createElement("td",null,m," ",s),n.default.createElement("td",{dangerouslySetInnerHTML:{__html:null===(c=null==v?void 0:v.husband)||void 0===c?void 0:c.value}}),n.default.createElement("td",{className:"age-tr"},h),n.default.createElement("td",{dangerouslySetInnerHTML:{__html:null===(o=null==v?void 0:v.wife)||void 0===o?void 0:o.value}}),n.default.createElement("td",{className:"age-tr"},p),n.default.createElement("td",{dangerouslySetInnerHTML:{__html:null===(i=null==v?void 0:v.trustees)||void 0===i?void 0:i.value}}),n.default.createElement("td",{className:"note-info"},g?n.default.createElement("img",{src:u.default,alt:g,title:g,"data-bs-toggle":"tooltip"}):null))})))))}},65:function(e,t,l){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=a(l(1)),r=l(11),u=a(l(12));t.default=function(e){var t=e.hits,l=e.churches,a=e.yearsFilter;return n.default.useEffect((function(){[].forEach.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'),(function(e){return new bootstrap.Tooltip(e)}))}),[t.length]),n.default.createElement(n.default.Fragment,null,n.default.createElement("table",{className:"table table-striped"},n.default.createElement("thead",null,n.default.createElement("tr",null,n.default.createElement("th",null),l.length>1&&n.default.createElement("th",null,"Церковь"),1!==a.length&&n.default.createElement("th",null,"Год"),n.default.createElement("th",null,"Дата"),n.default.createElement("th",null,"Умер"),n.default.createElement("th",null,"Возраст"),n.default.createElement("th",null,"От чего умер"),n.default.createElement("th",null,"Заметки"))),n.default.createElement("tbody",{id:"list-of-res"},t.map((function(e,t){var c,o=e.church,i=e.year,d=e.month,f=e.died,s=e.age,m=e.reason,h=e.notes,p=e._highlightResult;return n.default.createElement("tr",{key:t},n.default.createElement("td",null,n.default.createElement("button",{className:"btn btn-light",onClick:function(t){return function(e,t){var l=t.year,a=t.month,n=t.died,u=t.name,c=t.age,o=t.reason,i=t.church;try{navigator.clipboard.writeText("\n".concat(r.churchesMapping.get(i),"\nДата: ").concat(l," ").concat(a," ").concat(n,"\nКто умер: ").concat(u,"\nВозраст: ").concat(c,"\n").concat(o?"Причина смерти: ".concat(o):"","\n").trim());var d=new bootstrap.Tooltip(e,{title:"Скопировано",placement:"right"});d.show(),setTimeout((function(){return d.dispose()}),300)}catch(e){console.error("Failed to copy: ",e)}}(t.target,e)}},"Copy")),l.length>1&&n.default.createElement("td",{className:"church-td"},r.churchesMapping.get(o)),1!==a.length&&n.default.createElement("td",null,i),n.default.createElement("td",null,f," ",d),n.default.createElement("td",{dangerouslySetInnerHTML:{__html:null===(c=null==p?void 0:p.name)||void 0===c?void 0:c.value}}),n.default.createElement("td",null,s),n.default.createElement("td",null,m),n.default.createElement("td",{className:"note-info"},h?n.default.createElement("img",{src:u.default,alt:h,title:h,"data-bs-toggle":"tooltip"}):null))})))))}}});