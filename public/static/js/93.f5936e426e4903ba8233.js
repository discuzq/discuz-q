(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{"5ZCp":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(a("JZuw")),r=i(a("VVfg"));function i(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{value:"",valueFrozen:"",user_id:"1",isLoading:!1}},components:{myWalletHeader:n.default},created:function(){this.wallet()},mounted:function(){this.wallet()},methods:{myWallet:function(t){switch(t){case"withdraw":this.$router.push("/withdraw");break;case"frozen-amount":this.$router.push("/frozen-amount");break;case"withdrawals-record":this.$router.push("/withdrawals-record");break;case"wallet-details":this.$router.push("/wallet-details");break;case"order-details":this.$router.push("/order-details");break;default:this.$router.push("/")}},wallet:function(){var t=this,e=r.default.getLItem("tokenId");this.appFetch({url:"wallet",method:"get",splice:e,data:{}}).then((function(e){e.errors?t.$toast.fail(e.errors[0].code):(t.value=e.data.attributes.available_amount,t.valueFrozen=e.data.attributes.freeze_amount)}))},onRefresh:function(){var t=this;this.wallet().then((function(e){t.$toast("刷新成功"),t.finished=!1,t.isLoading=!1})).catch((function(e){t.$toast("刷新失败"),t.isLoading=!1}))}}}},OLtm:function(t,e,a){"use strict";a.r(e);var n=a("fq1a"),r=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e.default=r.a},fq1a:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(a("QbLZ"));a("E2jd");var r=i(a("5ZCp"));function i(t){return t&&t.__esModule?t:{default:t}}e.default=(0,n.default)({name:"myWallet-view"},r.default)},iQh1:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bgEd"},[a("myWalletHeader",{attrs:{title:"我的钱包"}}),t._v(" "),a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("div",{staticClass:"content"},[a("main",{staticClass:"like-main"},[a("van-cell",{attrs:{title:"可用余额","is-link":"",value:t.value+"元"},on:{click:function(e){return t.myWallet("withdraw")}}}),t._v(" "),a("van-cell",{attrs:{title:"冻结金额","is-link":"",value:t.valueFrozen+"元"},on:{click:function(e){return t.myWallet("frozen-amount")}}}),t._v(" "),a("van-cell",{attrs:{title:"提现记录","is-link":""},on:{click:function(e){return t.myWallet("withdrawals-record")}}}),t._v(" "),a("van-cell",{attrs:{title:"钱包明细","is-link":""},on:{click:function(e){return t.myWallet("wallet-details")}}}),t._v(" "),a("van-cell",{attrs:{title:"订单明细","is-link":""},on:{click:function(e){return t.myWallet("order-details")}}})],1),t._v(" "),a("footer",{staticClass:"my-info-money-footer"})])])],1)},r=[];a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r}))},v99R:function(t,e,a){"use strict";a.r(e);var n=a("iQh1"),r=a("OLtm");for(var i in r)"default"!==i&&function(t){a.d(e,t,(function(){return r[t]}))}(i);var l=a("KHd+"),u=Object(l.a)(r.default,n.a,n.b,!1,null,null,null);e.default=u.exports}}]);