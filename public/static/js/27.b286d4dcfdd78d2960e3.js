(window.webpackJsonp=window.webpackJsonp||[]).push([[27,110,111],{"/Zpk":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(i("6NK7")),s=n(i("VVfg"));function n(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{id:1,checked:!0,result:[],checkBoxres:[],imageShow:!1,index:1,themeListResult:[],firstpostImageListResult:[],priview:[],showScreen:[],length:0,indexlist:-1,menuStatus:!1,isWeixin:!1,isPhone:!1,viewportWidth:"",currentUserName:"",userId:""}},props:{themeList:{type:Array},replyTag:{replyTag:!1},isTopShow:{isTopShow:!1},isMoreShow:{isMoreShow:!1},ischeckShow:{ischeckShow:!1}},created:function(){var t=this;this.userId=s.default.getLItem("tokenId"),this.currentUserName=s.default.getLItem("foregroundUser"),this.viewportWidth=window.innerWidth,this.isWeixin=a.default.isWeixin().isWeixin,this.isPhone=a.default.isWeixin().isPhone,this.loadPriviewImgList(),this.forList(),document.addEventListener("click",(function(e){t.$refs.screenDiv;document.contains(e.target)&&(t.indexlist=-1)}))},watch:{themeList:function(t,e){this.themeList=t,this.themeListResult=t,this.loadPriviewImgList(),this.$forceUpdate()},deep:!0},methods:{userArr:function(t){var e=[];return t.forEach((function(t){e.push('<a  href="/home-page/'+t._data.id+'">'+t._data.username+"</a>")})),e.join(",")},forList:function(){},bindScreen:function(t,e){t==this.indexlist?this.indexlist=-1:this.indexlist=t},themeOpera:function(t,e,i,a){var s=new Object;3==e?(s.isEssence=!i,this.themeOpeRequest(t,s,"3",a)):4==e?(s.isSticky=!i,this.themeOpeRequest(t,s,"4",a)):5==e?(s.isDeleted=!0,this.themeOpeRequest(t,s,"5",a)):6==e?this.$router.push({path:"/edit-topic/"+t}):7==e&&this.$router.push({path:"/reply-to-topic/"+t+"/0"})},themeOpeRequest:function(t,e,i,a){var s=this;this.appFetch({url:"threads",method:"patch",splice:"/"+t,data:{data:{type:"threads",attributes:e}}}).then((function(t){if(t.errors)throw s.$toast.fail(t.errors[0].code),new Error(t.error);"3"==i?(s.essenceStatus=t.readdata._data.isEssence,s.themeList[a]._data.isEssence=s.essenceStatus):"4"==i?(s.stickyStatus=t.readdata._data.isSticky,s.themeList[a]._data.isSticky=s.stickyStatus):"5"==i&&(s.deletedStatus=t.readdata._data.isDeleted,s.themeList.splice(a,1),s.$toast.success("删除成功"))}))},replyOpera:function(t,e,i,a){var s=this,n=new Object;n.isLiked=!i,this.appFetch({url:"posts",method:"patch",splice:"/"+t,data:{data:{type:"posts",attributes:n}}}).then((function(t){if(t.errors)throw s.$toast.fail(t.errors[0].code),new Error(t.error);i?(s.likedStatus=t.readdata._data.isLiked,s.themeList[a].firstPost._data.isLiked=s.likedStatus,s.themeList[a].firstPost.likedUsers.map((function(t,e,i){t._data.id===s.userId&&i.splice(e,1)}))):(s.likedStatus=t.readdata._data.isLiked,s.themeList[a].firstPost._data.isLiked=s.likedStatus,s.themeList[a].firstPost.likedUsers.unshift({_data:{username:s.currentUserName,id:s.userId}}))}))},loadPriviewImgList:function(){if(""==this.themeListResult||null==this.themeListResult)return!1;for(var t=this.themeListResult.length,e=0;e<t;e++){var i=[];if(this.themeListResult[e].firstPost.images)for(var a=0;a<this.themeListResult[e].firstPost.images.length;a++)i.push(this.themeListResult[e].firstPost.images[a]._data.thumbUrl);this.themeListResult[e].firstPost.imageList=i}},imageSwiper:function(t){this.loadPriviewImgList(),this.imageShow=!0},onChange:function(t){this.index=t+1},checkAll:function(){this.$refs.checkboxGroup.toggleAll(!0)},signOutDele:function(){this.$refs.checkboxGroup.toggleAll()},deleteAllClick:function(){this.$emit("deleteAll",this.result)},jumpThemeDet:function(t,e){e?this.$router.push({path:"/details/"+t}):this.$toast.fail("没有权限，请联系站点管理员")},jumpPerDet:function(t){this.$router.push({path:"/home-page/"+t})}},mounted:function(){document.addEventListener("click",this.disappear,!1)},destroyed:function(){document.addEventListener("click",this.disappear,!1)},beforeRouteLeave:function(t,e,i){i()}}},"8WVt":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",[i("div",[i("van-checkbox-group",{ref:"checkboxGroup",model:{value:t.result,callback:function(e){t.result=e},expression:"result"}},[t._l(t.themeList,(function(e,a){return i("div",{key:a},[i("div",{staticClass:"cirPostCon"},[i("div",{},[i("div",{staticClass:"postTop"},[i("div",{staticClass:"postPer"},[e.user&&e.user._data.avatarUrl?i("img",{staticClass:"postHead",attrs:{src:e.user._data.avatarUrl},on:{click:function(i){return t.jumpPerDet(e.user._data.id)}}}):i("img",{staticClass:"postHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"},on:{click:function(i){return t.jumpPerDet(e.user._data.id)}}}),t._v(" "),i("div",{staticClass:"perDet"},[e.user?i("div",{staticClass:"perName",on:{click:function(i){return t.jumpPerDet(e.user._data.id)}}},[t._v(t._s(e.user._data.username))]):i("div",{staticClass:"perName"},[t._v("该用户已被删除")]),t._v(" "),i("div",{staticClass:"postTime"},[t._v(t._s(t.$moment(e._data.createdAt).format("YYYY-MM-DD HH:mm")))])])]),t._v(" "),i("div",{staticClass:"postOpera"},[e._data.isSticky?i("span",{directives:[{name:"show",rawName:"v-show",value:t.isTopShow,expression:"isTopShow"}],staticClass:"icon iconfont icon-top"}):t._e(),t._v(" "),t.isMoreShow&&(e._data.canEssence||e._data.canSticky||e._data.canDelete||e._data.canEdit||e.firstPost._data.canLike)?i("div",{ref:"screenDiv",refInFor:!0,staticClass:"screen",on:{click:function(e){return e.stopPropagation(),t.bindScreen(a,e)}}},[i("div",{staticClass:"moreCli"},[i("span",{staticClass:"icon iconfont icon-more"})]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.indexlist==a,expression:"indexlist==index"}],staticClass:"themeList"},[e.firstPost._data.canLike&&e.firstPost._data.isLiked?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.replyOpera(e.firstPost._data.id,2,e.firstPost._data.isLiked,a)}}},[t._v("取消点赞")]):t._e(),t._v(" "),e.firstPost._data.canLike&&!e.firstPost._data.isLiked?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.replyOpera(e.firstPost._data.id,2,e.firstPost._data.isLiked,a)}}},[t._v("点赞")]):t._e(),t._v(" "),e._data.canEssence&&e._data.isEssence?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.themeOpera(e._data.id,3,e._data.isEssence,a)}}},[t._v("取消加精")]):t._e(),t._v(" "),e._data.canEssence&&!e._data.isEssence?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.themeOpera(e._data.id,3,e._data.isEssence,a)}}},[t._v("加精")]):t._e(),t._v(" "),e._data.canSticky&&e._data.isSticky?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.themeOpera(e._data.id,4,e._data.isSticky,a)}}},[t._v("取消置顶")]):t._e(),t._v(" "),e._data.canSticky&&!e._data.isSticky?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.themeOpera(e._data.id,4,e._data.isSticky,a)}}},[t._v("置顶")]):t._e(),t._v(" "),e.firstPost._data.canEdit?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.themeOpera(e._data.id,6)}}},[t._v("编辑")]):t._e(),t._v(" "),e._data.canReply?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.themeOpera(e._data.id,7)}}},[t._v("回复")]):t._e(),t._v(" "),e._data.canDelete?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.themeOpera(e._data.id,5,"",a)}}},[t._v("删除")]):t._e()])]):t._e()])]),t._v(" "),e.firstPost&&e._data.isLongArticle?i("div",{staticClass:"postContent listPostCon",on:{click:function(i){return t.jumpThemeDet(e._data.id,e._data.canViewPosts)}}},[i("a",{domProps:{innerHTML:t._s(e._data.title)}}),t._v(" "),e._data.isLongArticle&&e._data.price<=0?i("span",{staticClass:"icon iconfont icon-longtext"}):e._data.price>0?i("span",{staticClass:"icon iconfont icon-money1"}):t._e()]):e.firstPost&&!e._data.isLongArticle?i("div",{staticClass:"postContent",on:{click:function(i){return t.jumpThemeDet(e._data.id,e._data.canViewPosts)}}},[i("a",{domProps:{innerHTML:t._s(e.firstPost._data.contentHtml)}})]):t._e(),t._v(" "),e.firstPost.imageList&&e.firstPost.imageList.length>0?i("div",{staticClass:"themeImgBox",on:{click:function(i){return t.jumpThemeDet(e._data.id,e._data.canViewPosts)}}},[i("div",{staticClass:"themeImgList moreImg"},t._l(e.firstPost.imageList,(function(e,a){return a<9?i("van-image",{key:a,staticClass:"themeImgChild",attrs:{fit:"cover","lazy-load":"",src:e}}):t._e()})),1)]):t._e()]),t._v(" "),i("div",{staticClass:"operaBox"},[e.firstPost.likedUsers.length>0||e.rewardedUsers.length>0?i("div",{staticClass:"isrelationGap"}):t._e(),t._v(" "),e.firstPost.likedUsers.length>0?i("div",{staticClass:"likeBox"},[i("span",{staticClass:"icon iconfont icon-praise-after"}),t._v(" "),i("span",{domProps:{innerHTML:t._s(t.userArr(e.firstPost.likedUsers))}}),t._v(" "),e.firstPost._data.likeCount>10?i("i",[t._v(" 等"),i("span",[t._v(t._s(e.firstPost._data.likeCount))]),t._v("个人觉得很赞")]):t._e()]):t._e(),t._v(" "),e.rewardedUsers.length>0?i("div",{staticClass:"reward"},[i("span",{staticClass:"icon iconfont icon-money"}),t._v(" "),i("span",{domProps:{innerHTML:t._s(t.userArr(e.rewardedUsers))}})]):t._e(),t._v(" "),e.lastThreePosts.length>0&&e.firstPost.likedUsers.length>0||e.lastThreePosts.length>0&&e.rewardedUsers.length>0?i("div",{staticClass:"isrelationLine"}):t._e(),t._v(" "),e.lastThreePosts.length>0?i("div",{staticClass:"replyBox"},[t._l(e.lastThreePosts,(function(e,a){return i("div",{key:a,staticClass:"replyCon"},[e.user?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.jumpPerDet(e.user._data.id)}}},[t._v(t._s(e.user._data.username))]):i("a",{attrs:{href:"javascript:;"}},[t._v("该用户已被删除")]),t._v(" "),e._data.replyUserId?i("span",{staticClass:"font9",on:{click:function(i){return t.jumpPerDet(e.user._data.id)}}},[t._v("回复")]):t._e(),t._v(" "),e._data.replyUserId&&e.replyUser?i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return t.jumpPerDet(e.user._data.id)}}},[t._v(t._s(e.replyUser._data.username))]):e._data.replyUserId&&!e.replyUser?i("a",{attrs:{href:"javascript:;"}},[t._v("该用户已被删除")]):t._e(),t._v(" "),i("span",{domProps:{innerHTML:t._s(e._data.contentHtml)}})])})),t._v(" "),e._data.postCount>4?i("a",{staticClass:"allReply",on:{click:function(i){return t.jumpThemeDet(e._data.id,e._data.canViewPosts)}}},[t._v("全部"+t._s(e._data.postCount-1)+"条回复"),i("span",{staticClass:"icon iconfont icon-right-arrow"})]):t._e()],2):t._e()]),t._v(" "),t.ischeckShow?i("van-checkbox",{ref:"checkboxes",refInFor:!0,staticClass:"memberCheck",attrs:{name:e._data.id}}):t._e()],1),t._v(" "),i("div",{staticClass:"gap"})])})),t._v(" "),t.ischeckShow?i("div",{staticClass:"manageFootFixed choFixed",style:{width:t.isPhone||t.isWeixin?"100%":"640px",left:t.isPhone||t.isWeixin?"0":(t.viewportWidth-640)/2+"px"}},[i("a",{attrs:{href:"javascript:;"},on:{click:t.checkAll}},[t._v("全选")]),t._v(" "),i("a",{attrs:{href:"javascript:;"},on:{click:t.signOutDele}},[t._v("取消全选")]),t._v(" "),i("button",{staticClass:"checkSubmit",on:{click:t.deleteAllClick}},[t._v("删除选中")])]):t._e()],2)],1),t._v(" "),i("van-image-preview",{attrs:{images:t.priview},on:{change:t.onChange},scopedSlots:t._u([{key:"index",fn:function(){return[t._v("第"+t._s(t.index)+"页")]},proxy:!0}]),model:{value:t.imageShow,callback:function(e){t.imageShow=e},expression:"imageShow"}})],1)},s=[];i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return s}))},AC1L:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=c(i("QbLZ")),s=c(i("AoGw")),n=c(i("QiNT")),o=c(i("omtG")),r=c(i("/Zpk")),d=c(i("CFQY"));function c(t){return t&&t.__esModule?t:{default:t}}i("iUmJ"),i("N960"),e.default=(0,a.default)({name:"circleView",components:{Header:o.default,ThemeDet:d.default}},n.default,r.default,s.default)},AoGw:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(i("14Xm")),s=o(i("D3Ub")),n=i("ULRk");function o(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{result:[],showScreen:!1,themeListCon:[],checked:null,pageIndex:1,pageLimit:20,loading:!1,finished:!1,offset:100,isLoading:!1}},created:function(){this.deleteList()},mounted:function(){n.Bus.$emit("setHeader",["标题标题3443453454ee","fasle","false"])},methods:{deleteAllClick:function(t){var e=this;return(0,s.default)(a.default.mark((function i(){var s,n;return a.default.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:for(s=[],n=0;n<t.length;n++)s.push({type:"threads",id:t[n],attributes:{isDeleted:!0}});return i.next=5,e.appFetch({url:"threadsBatch",method:"patch",data:{data:s}}).then((function(t){t.errors?e.$toast.fail(t.errors[0].code):(e.$toast.success("删除成功"),e.pageIndex=1,e.deleteList(!0))}));case 5:case"end":return i.stop()}}),i,e)})))()},deleteList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.appFetch({url:"threads",method:"get",data:{include:["user,firstPost,lastThreePosts,lastThreePosts.user,firstPost.likedUsers,rewardedUsers"],"filter[isDeleted]":"no","filter[categoryId]":"","page[number]":this.pageIndex,"page[limit]":this.pageLimit}}).then((function(i){if(i.errors)throw t.$toast.fail(i.errors[0].code),new Error(i.error);e&&(t.themeListCon=[]),t.themeListCon=t.themeListCon.concat(i.readdata),t.loading=!1,t.finished=i.readdata.length<t.pageLimit})).catch((function(e){t.loading&&1!==t.pageIndex&&t.pageIndex--,t.loading=!1}))},checkAll:function(t){this.$refs.checkboxGroup.toggleAll(!0)},toggleAll:function(){this.$refs.checkboxGroup.toggleAll()},signOutDele:function(){},addClass:function(t,e){this.current=t;e.currentTarget},bindScreen:function(){this.showScreen=!this.showScreen},hideScreen:function(){this.showScreen=!1},onLoad:function(){this.loading=!0,this.pageIndex++,this.deleteList()},onRefresh:function(){var t=this;this.pageIndex=1,this.deleteList(!0).then((function(e){t.$toast("刷新成功"),t.finished=!1,t.isLoading=!1})).catch((function(e){t.$toast("刷新失败"),t.isLoading=!1}))},headerBack:function(){this.$router.go(-1)}},beforeRouteLeave:function(t,e,i){i()}}},CFQY:function(t,e,i){"use strict";i.r(e);var a=i("8WVt"),s=i("DhNJ");for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);var o=i("KHd+"),r=Object(o.a)(s.default,a.a,a.b,!1,null,null,null);e.default=r.exports},Cc9l:function(t,e,i){"use strict";i.r(e);var a=i("ItKR"),s=i("LrES");for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);var o=i("KHd+"),r=Object(o.a)(s.default,a.a,a.b,!1,null,null,null);e.default=r.exports},DhNJ:function(t,e,i){"use strict";i.r(e);var a=i("xry+"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e.default=s.a},I0Z1:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",[i("van-popup",{staticClass:"sidebarWrap",style:{height:"100%",right:t.isPhone||t.isWeixin?"0":(t.viewportWidth-640)/2+"px"},attrs:{position:"right"},model:{value:t.popupShow,callback:function(e){t.popupShow=e},expression:"popupShow"}},[i("sidebar",{attrs:{isPayVal:t.isPayVal}})],1),t._v(" "),t.$route.meta.oneHeader?i("div",{staticClass:"headerBox"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.invitePerDet,expression:"invitePerDet"}],staticClass:"invitePerDet aaa"},[t.userInfoAvatarUrl?i("img",{staticClass:"inviteHead",attrs:{src:t.userInfoAvatarUrl,alt:""}}):i("img",{staticClass:"inviteHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif",alt:"ssss"}}),t._v(" "),t.invitePerDet&&t.userInfoName?i("div",{staticClass:"inviteName",model:{value:t.userInfoName,callback:function(e){t.userInfoName=e},expression:"userInfoName"}},[t._v(t._s(t.userInfoName))]):i("div",{staticClass:"inviteName"},[t._v("该用户已被删除")]),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:t.invitationShow,expression:"invitationShow"}],staticClass:"inviteWo"},[t._v("邀请您加入")]),t._v(" "),t.followShow?i("div",{staticClass:"followBox"},[i("span",[t._v("关注："+t._s(t.followDet._data.followCount))]),t._v(" "),i("span",[t._v("被关注："+t._s(t.followDet._data.fansCount))]),t._v(" "),t.equalId?t._e():i("div",{staticClass:"followStatus",attrs:{href:"javascript:;"}},["0"==t.intiFollowVal?i("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.followCli(t.intiFollowVal)}}},[t._v("关注TA")]):"2"==t.intiFollowVal?i("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.followCli(t.intiFollowVal)}}},[t._v("相互关注")]):"1"==t.intiFollowVal?i("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.followCli(t.intiFollowVal)}}},[t._v("已关注")]):t._e()])]):t._e()]),t._v(" "),t.searchIconShow||t.menuIconShow?t._e():i("div",{staticClass:"headeGap"}),t._v(" "),t.searchIconShow||t.menuIconShow?i("div",{staticClass:"headOpe"},[i("span",{directives:[{name:"show",rawName:"v-show",value:t.searchIconShow,expression:"searchIconShow"}],staticClass:"icon iconfont icon-search",on:{click:t.searchJump}}),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:t.menuIconShow,expression:"menuIconShow"}],staticClass:"icon iconfont icon-Shape relative",attrs:{"is-link":""},on:{click:t.showPopup}},[t.noticeSum>0?i("i",{staticClass:"noticeNew"}):t._e()])]):t._e(),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.logoShow,expression:"logoShow"}],staticClass:"logoBox"},[t.logo?i("img",{staticClass:"logo",attrs:{src:t.logo}}):i("img",{staticClass:"logo",attrs:{src:t.appConfig.staticBaseUrl+"/images/logo.png"}})]),t._v(" "),t.siteInfo?i("div",{directives:[{name:"show",rawName:"v-show",value:t.perDetShow,expression:"perDetShow"}],staticClass:"circleDet"},[i("span",[t._v("主题："+t._s(t.siteInfo._data.other.count_threads))]),t._v(" "),i("span",[t._v("成员："+t._s(t.siteInfo._data.other.count_users))]),t._v(" "),t.siteInfo._data.set_site.site_author?i("span",[t._v("站长："+t._s(t.siteInfo._data.set_site.site_author.username))]):i("span",[t._v("站长：无")])]):t._e(),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.navShow,expression:"navShow"}],staticClass:"navBox",class:{fixedNavBar:t.isfixNav},attrs:{id:"testNavBar"}},[i("van-tabs",{model:{value:t.navActi,callback:function(e){t.navActi=e},expression:"navActi"}},[i("van-tab",[i("span",{attrs:{slot:"title"},on:{click:function(e){return t.categoriesCho(0)}},slot:"title"},[t._v("\n              全部\n          ")])]),t._v(" "),t._l(t.categories,(function(e,a){return i("van-tab",{key:a},[i("span",{attrs:{slot:"title"},on:{click:function(i){return t.categoriesCho(e._data.id)}},slot:"title"},[t._v("\n              "+t._s(e._data.name)+"\n          ")])])}))],2)],1)]):t._e()],1)},s=[];i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return s}))},ItKR:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"circleCon"},[i("van-list",{attrs:{finished:t.finished,offset:t.offset,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[i("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[i("Header",{attrs:{searchIconShow:!0,perDetShow:!0,logoShow:!0,menuIconShow:!0,navShow:"true",headFixed:"true"},on:{click:t.headerBack}}),t._v(" "),i("div",{staticClass:"gap"}),t._v(" "),i("div",{staticClass:"themeTitBox"},[i("span",{staticClass:"themeTit"},[t._v("全部主题")]),t._v(" "),i("div",{staticClass:"screen",on:{click:t.bindScreen}},[i("span",[t._v("筛选")]),t._v(" "),i("span",{staticClass:"icon iconfont icon-down-menu jtGrayB"})])]),t._v(" "),i("div",{staticClass:"memberCheckList"},[i("ThemeDet",{attrs:{themeList:t.themeListCon,isTopShow:!0,isMoreShow:!0,ischeckShow:!0},on:{deleteAll:t.deleteAllClick}}),t._v(" "),i("div",{staticClass:"gap"})],1)],1)],1)],1)},s=[];i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return s}))},Jgvg:function(t,e,i){"use strict";i.r(e);var a=i("pvnC"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e.default=s.a},LrES:function(t,e,i){"use strict";i.r(e);var a=i("AC1L"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e.default=s.a},QiNT:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,s=r(i("YEIV")),n=(i("ULRk"),r(i("VVfg"))),o=r(i("6NK7"));function r(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){var t;return t={headBackShow:!1,oneHeader:!1,twoHeader:!1,threeHeader:!1,fourHeader:!1,isfixNav:!1,isShow:!1,isHeadShow:!1,showHeader:!1,showMask:!1,title:"",navActi:0,perDet:{themeNum:"1222",memberNum:"1222",circleLeader:"站长名称"},avatarUrl:"",mobile:""},(0,s.default)(t,"isfixNav",!1),(0,s.default)(t,"popupShow",!1),(0,s.default)(t,"current",0),(0,s.default)(t,"userDet",[]),(0,s.default)(t,"categories",[]),(0,s.default)(t,"siteInfo",!1),(0,s.default)(t,"username",""),(0,s.default)(t,"isPayVal",""),(0,s.default)(t,"isWeixin",!1),(0,s.default)(t,"isPhone",!1),(0,s.default)(t,"firstCategoriesId",""),(0,s.default)(t,"logo",!1),(0,s.default)(t,"viewportWidth",""),(0,s.default)(t,"userId",""),(0,s.default)(t,"followDet",""),(0,s.default)(t,"followFlag",""),(0,s.default)(t,"intiFollowVal","0"),(0,s.default)(t,"noticeSum",0),(0,s.default)(t,"intiFollowChangeVal","0"),(0,s.default)(t,"oldFollow",!1),(0,s.default)(t,"equalId",!1),t},props:{userInfoAvatarUrl:{type:String},userInfoName:{type:String},headFixed:{headFixed:!1},invitePerDet:{invitePerDet:!1},searchIconShow:{searchIconShow:!1},menuIconShow:{menuIconShow:!1},navShow:{navShow:!1},invitationShow:{invitationShow:!1},perDetShow:{perDet:!1},logoShow:{logoShow:!1},followShow:{logoShow:!1}},computed:{personUserId:function(){return this.$route.params.userId}},created:function(){this.userId=n.default.getLItem("tokenId"),this.userId==this.personUserId?this.equalId=!0:this.equalId=!1,this.viewportWidth=window.innerWidth,this.isWeixin=o.default.isWeixin().isWeixin,this.isPhone=o.default.isWeixin().isPhone,this.loadCategories(),this.followShow&&this.userId&&this.loadUserFollowInfo(),this.userId&&this.loadUserInfo()},watch:{isfixNav:function(t,e){this.isfixNav=t}},methods:(a={limitWidth:function(){document.getElementById("testNavBar").style.width="640px";var t=window.innerWidth;document.getElementById("testNavBar").style.marginLeft=(t-640)/2+"px"},loadCategories:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(e){t.siteInfo=e.readdata,e.readdata._data.set_site.site_logo&&(t.logo=e.readdata._data.set_site.site_logo),t.isPayVal=e.readdata._data.set_site.site_mode})),this.navShow&&this.appFetch({url:"categories",method:"get",data:{include:[]}}).then((function(e){t.categories=e.readdata,t.firstCategoriesId=e.readdata[0]._data.id,t.$emit("update",t.firstCategoriesId)}))},loadUserFollowInfo:function(){var t=this;if(!this.userId)return!1;this.appFetch({url:"users",method:"get",splice:"/"+this.personUserId,data:{}}).then((function(e){t.followDet=e.readdata,"1"==e.readdata._data.follow?t.followFlag="已关注":"0"==e.readdata._data.follow?t.followFlag="关注TA":t.followFlag="相互关注",t.intiFollowVal=e.readdata._data.follow}))},loadUserInfo:function(){var t=this;if(!this.userId)return!1;this.appFetch({url:"users",method:"get",splice:"/"+this.userId,data:{}}).then((function(e){e.data.attributes.typeUnreadNotifications.liked||(e.data.attributes.typeUnreadNotifications.liked=0),e.data.attributes.typeUnreadNotifications.replied||(e.data.attributes.typeUnreadNotifications.replied=0),e.data.attributes.typeUnreadNotifications.rewarded||(e.data.attributes.typeUnreadNotifications.rewarded=0),e.data.attributes.typeUnreadNotifications.system||(e.data.attributes.typeUnreadNotifications.system=0),t.noticeSum=e.data.attributes.typeUnreadNotifications.liked+e.data.attributes.typeUnreadNotifications.replied+e.data.attributes.typeUnreadNotifications.rewarded+e.data.attributes.typeUnreadNotifications.system}))},followCli:function(t){if(n.default.getLItem("Authorization")){var e=new Object,i="";"1"==t||"2"==t?(e.to_user_id=this.personUserId,i="delete",this.oldFollow=t):(e.to_user_id=this.personUserId,i="post"),this.followRequest(i,e,t)}else n.default.setSItem("beforeVisiting",this.$route.path),this.$router.push({path:"/login-user"})},followRequest:function(t,e,i){var a=this;this.appFetch({url:"follow",method:t,data:{data:{type:"user_follow",attributes:e}}}).then((function(e){if(e.errors)throw a.$toast.fail(e.errors[0].code),new Error(e.error);"delete"==t?a.intiFollowVal="0":"1"==a.oldFollow||"0"==a.oldFollow?a.intiFollowVal="1":a.intiFollowVal="2"}))},backUrl:function(){window.history.go(-1)},showPopup:function(){this.popupShow=!0},categoriesCho:function(t){this.$emit("categoriesChoice",t)},searchJump:function(){this.$router.push({path:"/search"})},handleTabFix:function(){if(this.headFixed)if((window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)>document.querySelector("#testNavBar").offsetTop)this.showHeader=!0,this.isfixNav=!0,1!=this.isWeixin&&1!=this.isPhone&&this.limitWidth();else{this.showHeader=!1,this.isfixNav=!1;window.innerWidth;document.getElementById("testNavBar").style.marginLeft="0px"}}},(0,s.default)(a,"backUrl",(function(){window.history.go(-1)})),(0,s.default)(a,"LogOut",(function(){})),(0,s.default)(a,"bindEvent",(function(t){1==t&&this.LogOut()})),a),mounted:function(){window.addEventListener("scroll",this.handleTabFix,!0)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleTabFix)},destroyed:function(){window.removeEventListener("scroll",this.handleTabFix)},beforeRouteLeave:function(t,e,i){window.removeEventListener("scroll",this.handleTabFix),i()}}},omtG:function(t,e,i){"use strict";i.r(e);var a=i("I0Z1"),s=i("Jgvg");for(var n in s)"default"!==n&&function(t){i.d(e,t,(function(){return s[t]}))}(n);var o=i("KHd+"),r=Object(o.a)(s.default,a.a,a.b,!1,null,null,null);e.default=r.exports},pvnC:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=o(i("QbLZ")),s=o(i("QiNT")),n=o(i("IsPG"));function o(t){return t&&t.__esModule?t:{default:t}}i("iUmJ"),e.default=(0,a.default)({name:"headerView",components:{Sidebar:n.default}},s.default)},"xry+":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(i("QbLZ")),s=n(i("/Zpk"));function n(t){return t&&t.__esModule?t:{default:t}}i("iUmJ"),i("N960"),e.default=(0,a.default)({name:"themeDetView"},s.default)}}]);