(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"4gYi":function(t,e,a){"use strict";a.r(e);var n=a("ji+i"),r=a("gxDo");for(var s in r)"default"!==s&&function(t){a.d(e,t,(function(){return r[t]}))}(s);var i=a("KHd+"),u=Object(i.a)(r.default,n.a,n.b,!1,null,null,null);e.default=u.exports},"6Akm":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),a("CmEe"),e.default={name:"card"}},CmEe:function(t,e,a){},Gj3Q:function(t,e,a){"use strict";a.r(e);var n=a("URMd"),r=a("cn2k");for(var s in r)"default"!==s&&function(t){a.d(e,t,(function(){return r[t]}))}(s);var i=a("KHd+"),u=Object(i.a)(r.default,n.a,n.b,!1,null,null,null);e.default=u.exports},URMd:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-box"},[a("Card",{staticClass:"home-card-box",attrs:{header:"待处理事项",intercept:"true"}},[a("p",[t._v("\n      等待审核的主题数\n      "),a("span",{staticStyle:{color:"#336699"}},[t._v("( 1 )")])])]),t._v(" "),a("Card",{staticClass:"home-card-box",attrs:{header:"系统信息",intercept:"true"}},[a("p",[a("span",[t._v("Discuz!程序版本")]),t._v(" "),a("span",[t._v(t._s(this.siteInfo.version))])]),t._v(" "),a("p",[a("span",[t._v("服务器系统及PHP")]),t._v(" "),a("span",[t._v(t._s(this.siteInfo.php_version))])]),t._v(" "),a("p",[a("span",[t._v("服务器软件")]),t._v(" "),a("span",[t._v(t._s(this.siteInfo.server_software))])]),t._v(" "),a("p",[a("span",[t._v("服务器MySQL版本")]),t._v(" "),a("span")]),t._v(" "),a("p",[a("span",[t._v("上传许可")]),t._v(" "),a("span",[t._v(t._s(this.siteInfo.upload_size))])]),t._v(" "),a("p",[a("span",[t._v("当前数据库尺寸")]),t._v(" "),a("span",[t._v(t._s(this.siteInfo.db_size))])])]),t._v(" "),a("Card",{staticClass:"home-card-box home-card__footer",attrs:{header:"相关链接"}},[a("a",{attrs:{href:"https://www.discuz.net/",target:"_blank"}},[t._v("Discuz! 支持论坛")]),t._v(" "),a("a",{attrs:{href:"https://cloud.tencent.com/",target:"_blank"}},[t._v("腾讯云")]),t._v(" "),a("a",{attrs:{href:"http://www.dnspod.cn/",target:"_blank"}},[t._v("DNSPod")])])],1)},r=[];a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r}))},c1W9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,r=a("4gYi"),s=(n=r)&&n.__esModule?n:{default:n};e.default={data:function(){return{siteInfo:{}}},created:function(){var t=this;this.appFetch({url:"siteinfo",method:"get",data:{}}).then((function(e){t.siteInfo=e.data.attributes}))},components:{Card:s.default}}},cn2k:function(t,e,a){"use strict";a.r(e);var n=a("ul1k"),r=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e.default=r.a},gxDo:function(t,e,a){"use strict";a.r(e);var n=a("6Akm"),r=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e.default=r.a},"ji+i":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-box"},[t.$attrs.header?a("div",{staticClass:"card-box__header",class:t.$slots.default?"":"not-main"},[a("header",{staticClass:"card-title",class:t.$attrs.intercept?"card-intercept-title":""},[t._v(t._s(t.$attrs.header))]),t._v(" "),t._t("header")],2):t._e(),t._v(" "),a("main",{staticClass:"card-box__main"},[t._t("default")],2)])},r=[];a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r}))},ul1k:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(a("QbLZ"));a("zt69");var r=s(a("c1W9"));function s(t){return t&&t.__esModule?t:{default:t}}e.default=(0,n.default)({name:"home-view"},r.default)},zt69:function(t,e,a){}}]);