(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"3JVg":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l(s("4gYi")),i=l(s("Dt3C")),r=l(s("rWG0")),n=l(s("VVfg")),o=l(s("wd/R"));function l(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{searchUserName:"",keyWords:"",operator:"",categoriesList:[],categoriesListSelect:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,s=new Date;s.setTime(s.getTime()-6048e5),t.$emit("pick",[s,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,s=new Date;s.setTime(s.getTime()-2592e6),t.$emit("pick",[s,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,s=new Date;s.setTime(s.getTime()-7776e6),t.$emit("pick",[s,e])}}]},releaseTime:["",""],deleteTime:["",""],radioList:"",deleteStatusList:[],appleAll:!1,themeList:[],currentPaga:1,total:0,pageCount:1,submitForm:[]}},methods:{radioChange:function(t,e){switch(t){case"还原":this.submitForm[e].attributes.isDeleted=!1,this.submitForm[e].hardDelete=!1;break;case"删除":this.submitForm[e].hardDelete=!0;break;default:console.log("左侧操作错误，请刷新页面!")}},searchClick:function(){console.log(this.releaseTime),this.getPostsList(1)},handleCurrentChange:function(t){this.getPostsList(t)},submitClick:function(){var t=this;console.log(this.submitForm),this.deleteStatusList=[];var e=[];this.submitForm.forEach((function(s,a){s.hardDelete&&t.deleteStatusList.push(s.id),s.attributes.isDeleted||e.push(s.id)})),this.deleteStatusList.length>0&&this.deleteThreadsBatch("".join(",")),e.length>0&&this.patchPostsBatch(this.submitForm)},allOperationsSubmit:function(t){var e=this,s="";switch(t){case 1:this.submitForm.forEach((function(t,s){e.submitForm[s].attributes.isDeleted=!1})),this.patchPostsBatch(this.submitForm);break;case 2:this.submitForm.forEach((function(t,a){a<e.submitForm.length-1?s=s+t.id+",":s+=t.id})),this.deleteThreadsBatch(s);break;default:console.log("全部还原或全部删除操作错误,请刷新页面!")}},formatDate:function(t){return(0,o.default)(t).format("YYYY-MM-DD HH:mm")},getPostsList:function(t){var e=this;this.appFetch({url:"posts",method:"get",data:{include:["user","replyUser","thread","thread.category","thread.firstPost","deletedUser","lastDeletedLog"],"filter[isDeleted]":"yes","filter[username]":this.searchUserName,"page[number]":t,"page[size]":10,"filter[q]":this.keyWords,"filter[categoryId]":this.categoriesListSelect,"filter[deletedUsername]":this.operator,"filter[createdAtBegin]":this.releaseTime[0],"filter[createdAtEnd]":this.releaseTime[1],"filter[deletedAtBegin]":this.deleteTime[0],"filter[deletedAtEnd]":this.deleteTime[1]}}).then((function(t){console.log(t),e.themeList=[],e.submitForm=[],e.themeList=t.readdata,e.total=t.meta.postCount,e.pageCount=t.meta.pageCount,e.themeList.forEach((function(t,s){e.submitForm.push({Select:"无",radio:"",type:"posts",id:t._data.id,attributes:{isApproved:0,isDeleted:!0,message:""}})}))})).catch((function(t){console.log(t)}))},getCategories:function(){var t=this;this.appFetch({url:"categories",method:"get",data:{}}).then((function(e){t.categoriesList=[],e.data.forEach((function(e,s){t.categoriesList.push({name:e.attributes.name,id:e.id})}))})).catch((function(t){console.log(t)}))},patchPostsBatch:function(t){var e=this;this.appFetch({url:"postsBatch",method:"patch",data:{data:t}}).then((function(t){t.meta&&t.data?e.$message.error("操作失败！"):(e.getPostsList(Number(n.default.getLItem("currentPag"))||1),e.$message({message:"操作成功",type:"success"})),console.log(t)})).catch((function(t){}))},patchPosts:function(t,e){var s=this;this.appFetch({url:"threads",method:"patch",splice:"/"+e,data:{data:t}}).then((function(t){t.meta&&t.data?(s.checkedTheme=[],s.$message.error("操作失败！")):(s.getPostsList(Number(n.default.getLItem("currentPag"))||1),s.$message({message:"操作成功",type:"success"}))})).catch((function(t){console.log(t)}))}},created:function(){this.getCategories(),this.getPostsList(Number(n.default.getLItem("currentPag"))||1)},components:{Card:a.default,ContArrange:i.default,Page:r.default}}},"4qU5":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cont-arrange-box"},[s("div",{staticClass:"cont-arrange-main"},[s("div",{staticClass:"cont-arrange__lf-side"},[t._t("side")],2),t._v(" "),s("main",{staticClass:"cont-arrange__rt-main"},[s("div",{staticClass:"cont-arrange__rt-main-header"},[s("div",{staticClass:"cont-arrange__rt-main-header__release"},[t.$attrs.author?s("p",{ref:"userName"},[t._v(t._s(t.$attrs.author))]):t._e(),t._v(" "),t.$attrs.replyBy?s("p",{ref:"userName"},[t._v(t._s(t.$attrs.replyBy))]):t._e(),t._v(" "),t.$attrs.author?s("span",[t._v("发布于")]):t._e(),t._v(" "),t.$attrs.replyBy?s("span",[t._v("回复主题")]):t._e(),t._v(" "),t.$attrs.theme?s("p",[t._v(t._s(t.$attrs.theme))]):t._e(),t._v(" "),t.$attrs.themeName?s("p",{ref:"themeName",class:t.$attrs.themeName?"themeName":"",style:t.themeNameStyle},[t._v("123"+t._s(t.$attrs.themeName))]):t._e()]),t._v(" "),t.$attrs.prply>=0&&t.$attrs.browse>=0?s("div",{staticClass:"cont-arrange__rt-main-header__reply-view rt-box"},[s("span",[t._v("回复/查看：")]),t._v(" "),s("span",[t._v(t._s(t.$attrs.prply)+"/"+t._s(t.$attrs.browse))])]):t._e(),t._v(" "),t.$attrs.last?s("div",{staticClass:"cont-arrange__rt-main-header__last-reply rt-box"},[s("span",[t._v("最后回复：")]),t._v(" "),s("span",[t._v(t._s(t.$attrs.last))])]):t._e(),t._v(" "),t.$attrs.ip?s("div",{staticClass:" rt-box"},[s("span",[t._v("IP：")]),t._v(" "),s("span",[t._v(t._s(t.$attrs.ip))])]):t._e(),t._v(" "),t.$attrs.finalPost?s("div",{staticClass:"cont-arrange__rt-main-header__release-time rt-box"},[s("span",[t._v("发布时间：")]),t._v(" "),s("span",[t._v(t._s(t.$attrs.finalPost))])]):t._e(),t._v(" "),t.$attrs.deleTime?s("div",{staticClass:" rt-box"},[s("span",[t._v("删除时间：")]),t._v(" "),s("span",[t._v(t._s(t.$attrs.deleTime))])]):t._e(),t._v(" "),t._t("header")],2),t._v(" "),s("div",{ref:"contMain",staticClass:"cont-arrange__rt-main-box",style:{height:t.showContStatus?t.mainHeight+30+"px":t.mainHeight>78?"78PX":""}},[t._t("main")],2),t._v(" "),t.mainHeight>78?s("div",{ref:"contControl",staticClass:"cont-block-control",class:t.showBottomStatus?"is-bottom-out":"",on:{click:t.showCont}},[s("p",[s("span",{staticClass:"iconfont icondown-menu",class:t.showContStatus?"show-down":""}),t._v("\n          "+t._s(t.showContStatus?"收起详情":"展开详情")+"\n        ")])]):t._e(),t._v(" "),t.$slots.footer?s("div",{staticClass:"cont-arrange__rt-main-footer"},[t._t("footer")],2):t._e()])])])},i=[];s.d(e,"a",(function(){return a})),s.d(e,"b",(function(){return i}))},"6cHu":function(t,e,s){"use strict";s.r(e);var a=s("tYfD"),i=s.n(a);for(var r in a)"default"!==r&&function(t){s.d(e,t,(function(){return a[t]}))}(r);e.default=i.a},Dt3C:function(t,e,s){"use strict";s.r(e);var a=s("4qU5"),i=s("aoOm");for(var r in i)"default"!==r&&function(t){s.d(e,t,(function(){return i[t]}))}(r);var n=s("KHd+"),o=Object(n.a)(i.default,a.a,a.b,!1,null,null,null);e.default=o.exports},Q86h:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(s("QbLZ"));s("uwep");var i=r(s("u8Dz"));function r(t){return t&&t.__esModule?t:{default:t}}e.default=(0,a.default)({name:"cont-arrange-view"},i.default)},Rw97:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"recycle-bin-reply-box"},[s("Card",{attrs:{header:"搜索"}}),t._v(" "),s("div",{staticClass:"recycle-bin-reply-header"},[s("div",{staticClass:"recycle-bin-reply-header__section"},[s("div",{staticClass:"section-top"},[s("span",{staticClass:"cont-review-header__lf-title"},[t._v("作者：")]),t._v(" "),s("el-input",{attrs:{size:"medium",clearable:"",placeholder:"搜索作者"},model:{value:t.searchUserName,callback:function(e){t.searchUserName=e},expression:"searchUserName"}})],1),t._v(" "),s("div",[s("span",{staticClass:"cont-review-header__lf-title"},[t._v("搜索范围：")]),t._v(" "),s("el-select",{attrs:{clearable:"",size:"medium",placeholder:"选择主题分类"},model:{value:t.categoriesListSelect,callback:function(e){t.categoriesListSelect=e},expression:"categoriesListSelect"}},t._l(t.categoriesList,(function(t){return s("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)]),t._v(" "),s("div",{staticClass:"recycle-bin-reply-header__section"},[s("div",{staticClass:"section-top"},[s("span",{staticClass:"cont-review-header__lf-title"},[t._v("内容包含：")]),t._v(" "),s("el-input",{attrs:{size:"medium",clearable:"",placeholder:"搜索内容包含"},model:{value:t.keyWords,callback:function(e){t.keyWords=e},expression:"keyWords"}})],1),t._v(" "),s("div",[s("span",{staticClass:"cont-review-header__lf-title"},[t._v("操作人：")]),t._v(" "),s("el-input",{attrs:{size:"medium",clearable:"",placeholder:"搜索操作人"},model:{value:t.operator,callback:function(e){t.operator=e},expression:"operator"}})],1)]),t._v(" "),s("div",{staticClass:"recycle-bin-reply-header__section"},[s("div",{staticClass:"section-top"},[s("span",{staticClass:"cont-review-header__lf-title time-title"},[t._v("发布时间范围：")]),t._v(" "),s("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"",size:"medium","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.releaseTime,callback:function(e){t.releaseTime=e},expression:"releaseTime"}})],1),t._v(" "),s("div",[s("span",{staticClass:"cont-review-header__lf-title time-title"},[t._v("删除时间范围：")]),t._v(" "),s("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"",size:"medium","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.deleteTime,callback:function(e){t.deleteTime=e},expression:"deleteTime"}})],1)]),t._v(" "),s("div",{staticClass:"recycle-bin-reply-header__section"},[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.searchClick}},[t._v("搜索")])],1)]),t._v(" "),s("div",{staticClass:"recycle-bin-reply-table"},[t._l(t.themeList,(function(e,a){return s("ContArrange",{key:e._data.id,attrs:{replyBy:e.user?e.user._data.username:"该用户被删除",themeName:e.thread.firstPost._data.content,finalPost:t.formatDate(e._data.createdAt),ip:e._data.ip}},[s("div",{staticClass:"recycle-bin-reply-table__side",attrs:{slot:"side"},slot:"side"},[s("el-radio-group",{on:{change:function(e){return t.radioChange(e,a)}},model:{value:t.submitForm[a].radio,callback:function(e){t.$set(t.submitForm[a],"radio",e)},expression:"submitForm[index].radio"}},[s("el-radio",{attrs:{label:"还原"}}),t._v(" "),s("el-radio",{attrs:{label:"删除"}})],1)],1),t._v(" "),s("div",{staticClass:"recycle-bin-reply-table__main",attrs:{slot:"main"},slot:"main"},[t._v("\n        "+t._s(e._data.content)+"\n      ")]),t._v(" "),s("div",{staticClass:"recycle-bin-reply-table__footer",attrs:{slot:"footer"},slot:"footer"},[s("div",{staticClass:"recycle-bin-reply-table__footer-operator"},[s("span",[t._v("操作者：")]),t._v(" "),s("span",[t._v(t._s(e.deletedUser?e.deletedUser._data.name:"操作者被禁止或删除"))])]),t._v(" "),s("div",{staticClass:"recycle-bin-reply-table__footer-reason"},[s("span",[t._v("原因：")]),t._v(" "),s("span",[t._v(t._s(e.deletedUser?e.deletedUser._data.message:"操作者被禁止或删除"))])])])])})),t._v(" "),t.pageCount>1?s("Page",{attrs:{"current-page":t.currentPaga,"page-size":10,total:t.total},on:{"current-change":t.handleCurrentChange}}):t._e()],2),t._v(" "),s("div",{staticClass:"recycle-bin-reply-footer footer-btn"},[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.submitClick}},[t._v("提交")]),t._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(e){return t.allOperationsSubmit(1)}}},[t._v("全部还原")]),t._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(e){return t.allOperationsSubmit(2)}}},[t._v("全部删除")]),t._v(" "),s("el-checkbox",{model:{value:t.appleAll,callback:function(e){t.appleAll=e},expression:"appleAll"}},[t._v("将操作应用到其他所有页面")])],1)],1)},i=[];s.d(e,"a",(function(){return a})),s.d(e,"b",(function(){return i}))},aoOm:function(t,e,s){"use strict";s.r(e);var a=s("Q86h"),i=s.n(a);for(var r in a)"default"!==r&&function(t){s.d(e,t,(function(){return a[t]}))}(r);e.default=i.a},cj54:function(t,e,s){"use strict";s.r(e);var a=s("Rw97"),i=s("6cHu");for(var r in i)"default"!==r&&function(t){s.d(e,t,(function(){return i[t]}))}(r);var n=s("KHd+"),o=Object(n.a)(i.default,a.a,a.b,!1,null,null,null);e.default=o.exports},tYfD:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(s("QbLZ"));s("cajz");var i=r(s("3JVg"));function r(t){return t&&t.__esModule?t:{default:t}}e.default=(0,a.default)({name:"recycle-bin-reply-view"},i.default)},u8Dz:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{showContStatus:!1,showBottomStatus:!1,mainHeight:0,windowWidth:0,themeNameLeft:70,themeNameStyle:{left:"70",width:"calc(100% - "},styleobj:{color:"red",background:"red"}}},props:{},methods:{showCont:function(){this.mainHeight=this.$slots.main[0].elm.offsetHeight,this.showContStatus=!this.showContStatus;var t=this.$slots.main[0].elm.getBoundingClientRect().width;this.$slots.main[0].elm.offsetHeight+this.$slots.main[0].elm.getBoundingClientRect().top>window.innerHeight&&(this.showBottomStatus=!0,this.$refs.contControl.style.width=t+40+"PX"),this.showContStatus||(this.showBottomStatus=!1,this.$refs.contControl.style.width="100%")},handleScroll:function(){this.$refs.contControl&&(this.$refs.contControl.style.width=this.$slots.main[0].elm.getBoundingClientRect().width+40+"PX"),this.$slots.main[0].elm.offsetHeight+this.$slots.main[0].elm.getBoundingClientRect().top<window.innerHeight?this.showBottomStatus=!1:this.showContStatus&&(this.showBottomStatus=!0)},browserSize:function(){if(this.$refs.contControl){var t=this.$slots.main[0].elm.getBoundingClientRect(),e=t.width,s=t.top,a=this.$refs.contControl.style;this.showContStatus?(this.$slots.main[0].elm.offsetHeight+s>window.innerHeight?a.width=e+40+"PX":a.width="100%",this.$refs.contMain.style.height=this.$slots.main[0].elm.offsetHeight+30+"PX"):a.width="100%"}},removeScrollHandler:function(){window.removeEventListener("scroll",this.handleScroll,!0),window.removeEventListener("resize",this.browserSize,!0)},themeStyle:function(){this.themeNameStyle.left="70",this.themeNameStyle.width="calc(100% - ",this.themeNameStyle.left=70+this.$refs.userName.clientWidth+"px",this.themeNameStyle.width=this.themeNameStyle.width+(100+this.$refs.userName.clientWidth)+"px)"}},mounted:function(){this.mainHeight=this.$slots.main[0].elm.offsetHeight,window.addEventListener("scroll",this.handleScroll,!0),window.addEventListener("resize",this.browserSize,!0),this.windowWidth=window.innerWidth,this.themeStyle()},beforeDestroy:function(){this.removeScrollHandler()}}},uwep:function(t,e,s){}}]);