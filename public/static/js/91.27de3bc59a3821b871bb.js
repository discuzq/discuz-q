(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{"a/BD":function(t,e,a){"use strict";a.r(e);var n=a("bhVi"),i=a("zXmL");for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);var o=a("KHd+"),s=Object(o.a)(i.default,n.a,n.b,!1,null,null,null);e.default=s.exports},bhVi:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"reward-box my-info-money-header"},[a("RewardHeader",{attrs:{title:"打赏我的"}}),t._v(" "),a("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("main",{staticClass:"reward-main"},t._l(t.rewardList,(function(e,n){return a("div",{key:n,staticClass:"reward-con cell-crossing"},[a("ContHeader",{attrs:{imgUrl:e._data.user_avatar,stateTitle:t.stateTitle,amount:e._data.amount,time:t.$moment(e._data.created_at).startOf("hour").fromNow(),userName:e._data.user_name}}),t._v(" "),a("div",{staticClass:"reference"},[a("div",{staticClass:"reference-cont"},[a("span",[t._v(t._s(e._data.post_content))])])])],1)})),0)])],1),t._v(" "),a("footer",{staticClass:"my-info-money-footer"})],1)},i=[];a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return i}))},jMuB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(a("QbLZ"));a("Cpqr");var i=r(a("piPi"));function r(t){return t&&t.__esModule?t:{default:t}}e.default=(0,n.default)({name:"reward"},i.default)},piPi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=d(a("JZuw")),i=d(a("STKU")),r=d(a("/uo3")),o=d(a("3YLv"));function d(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{rewardList:[],stateTitle:"打赏了我",pageIndex:1,pageLimit:20,loading:!1,finished:!1,offset:100,isLoading:!1}},components:{RewardHeader:n.default,ContHeader:i.default,ContMain:r.default,ContFooter:o.default},created:function(){this.imgUrl="../../../../../../../static/images/mytx.png",this.myRewardList()},methods:{myRewardList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.appFetch({url:"notice",method:"get",data:{"page[number]":this.pageIndex,"page[limit]":this.pageLimit,"filter[type]":3}}).then((function(a){console.log(a),e&&(t.rewardList=[]),t.rewardList=t.rewardList.concat(a.readdata),t.loading=!1,t.finished=a.data.length<t.pageLimit,s})).catch((function(e){t.loading&&1!==t.pageIndex&&t.pageIndex--,t.loading=!1}))},onLoad:function(){this.loading=!0,this.pageIndex++,this.myRewardList()},onRefresh:function(){var t=this;this.pageIndex=1,this.myRewardList(!0).then((function(){t.$toast("刷新成功"),t.isLoading=!1,t.finished=!1})).catch((function(e){t.$toast("刷新失败"),t.isLoading=!1}))}}}},zXmL:function(t,e,a){"use strict";a.r(e);var n=a("jMuB"),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e.default=i.a}}]);