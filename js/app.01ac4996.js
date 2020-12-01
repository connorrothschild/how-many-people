(function(t){function e(e){for(var a,i,l=e[0],o=e[1],c=e[2],h=0,d=[];h<l.length;h++)i=l[h],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&d.push(n[i][0]),n[i]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(t[a]=o[a]);u&&u(e);while(d.length)d.shift()();return r.push.apply(r,c||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],a=!0,l=1;l<s.length;l++){var o=s[l];0!==n[o]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=s[0]))}return t}var a={},n={app:0},r=[];function i(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=a,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(s,a,function(e){return t[e]}.bind(null,a));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/how-many-people/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=o;r.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"01f7":function(t,e,s){},"034f":function(t,e,s){"use strict";s("85ec")},2732:function(t,e,s){"use strict";s("ed1d")},"53d7":function(t,e,s){"use strict";s("01f7")},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[t.usCases&t.globalCases?s("div",[t.states.length>0?s("Map",{attrs:{states:t.states,usCases:t.usCases,globalCases:t.globalCases}}):t._e(),s("Footer")],1):t._e()])},r=[],i=(s("96cf"),s("1da1")),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",[s("div",{staticClass:"py-5 has-background-light"},[s("div",{staticClass:"max-width-950"},[s("p",{staticClass:"title is-spaced high-line-height px-1"},[s("span",{staticClass:"highlight-underline",on:{click:function(e){return t.toggleSelected()}}},[t._v(t._s(this.usSelected?"In the US":"Globally"))]),t._v(", "+t._s(this.millionsFormat(this.totalCases))+" people have tested positive for COVID-19. ")]),s("p",{staticClass:"subtitle mb-2 px-1"},[t._v(" Just how many people is that? That's equivalent to the combined populations of: ")]),0==t.selectedStates.length?s("p",{staticClass:"is-inline-flex state-text-block"},[t._v(" Select a state below ")]):t._e(),s("div",{staticClass:"max-width-700"},t._l(t.selectedStates,(function(e,a){return s("span",{key:a,staticClass:"is-inline-flex state-text-block"},[s("p",[t._v(t._s(e))])])})),0)])]),s("div",{staticClass:"is-inline-flex place-center mt-3"},[s("p",{staticClass:"heading is-size-6 mr-2 mb-0"},[t._v(" "+t._s(this.millionsFormat(this.remainingCases))+" remaining ")]),s("button",{staticClass:"button is-small ml-2",on:{click:function(e){t.selectedStates=[],t.userTotal=0}}},[t._v(" Reset ")])]),s("div",{attrs:{id:"viz"}},[s("svg",{attrs:{width:this.width,height:this.height}},[s("g",{staticClass:"canvas",attrs:{transform:"translate("+t.margin/2+", "+t.margin/2+")"}},t._l(t.states,(function(e,a){return s("State",{key:a,staticClass:"state",attrs:{state:e,cellSize:t.cellSize,selectedStates:t.selectedStates,userTotal:t.userTotal,totalCases:t.totalCases},nativeOn:{click:function(s){return t.addToTotal(e)}}})})),1)])])])},o=[],c=(s("4de4"),s("caad"),s("b0c0"),s("a9e3"),s("2532"),s("5698")),u=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("g",{class:{disabled:t.userTotal+t.state.population>t.totalCases&&!t.selectedStates.includes(t.state.name),selected:t.selectedStates.includes(t.state.name)},attrs:{transform:"translate("+t.state.grid.x*t.cellSize+", "+(t.state.grid.y-1)*t.cellSize+")"}},[s("rect",{attrs:{width:t.cellSize-2,height:t.cellSize-2}}),s("text",{attrs:{x:t.cellSize/2,y:t.cellSize/3.5,dy:".55em"}},[t._v(" "+t._s(t.state.id)+" ")]),s("text",{staticClass:"population",attrs:{x:t.cellSize/2,y:t.cellSize/4*3}},[t._v(" "+t._s(t.thousandsFormat(t.state.population))+" ")])])},h=[],d={name:"Map",props:{state:Object,selectedStates:Array,cellSize:Number,userTotal:Number,totalCases:Number},methods:{millionsFormat:c["b"](".3s"),thousandsFormat:c["b"](".2s")},mounted:function(){}},p=d,f=(s("2732"),s("2877")),m=Object(f["a"])(p,u,h,!1,null,null,null),v=m.exports,b={name:"Map",components:{State:v},props:{states:Array,usCases:Number,globalCases:Number},data:function(){return{margin:4,mapWidth:12,mapHeight:8,cellSize:55,userTotal:0,selectedStates:[],usSelected:!1}},methods:{responsivefy:function(t){var e=c["d"](t.node().parentNode),s=parseInt(t.style("width")),a=parseInt(t.style("height")),n=s/a;function r(){var s=parseInt(e.style("width"));t.attr("width",s),t.attr("height",Math.round(s/n))}t.attr("viewBox","0 0 "+s+" "+a).attr("perserveAspectRatio","xMinYMid").call(r),c["d"](window).on("resize."+e.attr("id"),r)},addToTotal:function(t){var e=t.name,s=t.population;this.selectedStates.includes(e)?(this.userTotal-=s,this.selectedStates=this.selectedStates.filter((function(t){return e!=t}))):this.userTotal+s>this.totalCases?console.log("This state would put us over the total!"):(this.userTotal+=s,this.selectedStates.push(e))},toggleSelected:function(){this.usSelected=!this.usSelected,this.userTotal>this.totalCases&&(this.userTotal=0,this.selectedStates=[])},millionsFormat:c["b"](".3s"),thousandsFormat:c["b"](".1s")},computed:{remainingCases:function(){return this.totalCases-this.userTotal},width:function(){return this.mapWidth*this.cellSize+this.margin},height:function(){return this.mapHeight*this.cellSize+this.margin},totalCases:function(){return this.usSelected?this.usCases:this.globalCases}},mounted:function(){var t=this.responsivefy;c["d"]("#viz svg").call(t)}},g=b,_=(s("894b"),Object(f["a"])(g,l,o,!1,null,null,null)),S=_.exports,C=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},y=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",{staticClass:"footer"},[s("div",{staticClass:"content has-text-centered"},[s("p",[t._v(" Built by "),s("a",{attrs:{href:"https://twitter.com/CL_Rothschild",target:"_blank",rel:"noopener"}},[t._v("Connor Rothschild")]),t._v(". The source code is available "),s("a",{attrs:{href:"https://github.com/connorrothschild/how-many-people/",target:"_blank",rel:"noopener"}},[t._v("here")]),t._v(". The map design is attributable to "),s("a",{attrs:{href:"https://brendansudol.com/electoral-map-viz/#",target:"_blank",rel:"noopener"}},[t._v("Presidential Pick'em")]),t._v(" by "),s("a",{attrs:{href:"https://twitter.com/brensudol?lang=en",target:"_blank",rel:"noopener"}},[t._v("Brendan Sudol")]),t._v(". ")])])])}],w={name:"Footer"},x=w,T=(s("53d7"),Object(f["a"])(x,C,y,!1,null,null,null)),z=T.exports,O={name:"App",components:{Map:S,Footer:z},data:function(){return{states:[],usCases:null,globalCases:null}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var s,a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c["c"]("https://raw.githubusercontent.com/connorrothschild/how-many-people/master/public/data/states.json");case 2:return s=e.sent,t.states=s,e.next=6,c["a"]("https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv");case 6:return a=e.sent,e.next=9,c["c"]("https://coronavirus-19-api.herokuapp.com/all");case 9:n=e.sent,t.globalCases=+n.cases,t.usCases=+a[0].cases;case 12:case"end":return e.stop()}}),e)})))()}},k=O,j=(s("034f"),Object(f["a"])(k,n,r,!1,null,null,null)),M=j.exports,F=s("289d");s("5abe");a["a"].use(F["a"]),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(M)}}).$mount("#app")},"85ec":function(t,e,s){},"894b":function(t,e,s){"use strict";s("a8f9")},a8f9:function(t,e,s){},ed1d:function(t,e,s){}});
//# sourceMappingURL=app.01ac4996.js.map