(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{"19Nx":function(t,e,a){"use strict";a.r(e);var s=a("qWM9"),i=a("mfst");for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);var o=a("KHd+"),r=Object(o.a)(i.default,s.a,s.b,!1,null,null,null);e.default=r.exports},"Qo/1":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(a("QbLZ")),i=o(a("JZuw")),n=o(a("dWbn"));function o(t){return t&&t.__esModule?t:{default:t}}a("E2jd"),e.default=(0,s.default)({name:"detailsView",components:{comHeader:i.default}},n.default)},dWbn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(a("y0A3"));var s=n(a("VVfg")),i=n(a("6NK7"));function n(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{headBackShow:!0,rewardShow:!1,themeCon:!1,themeShow:!1,examineNum:"qqqq",rewardNumList:[{rewardNum:"0.01"},{rewardNum:"2"},{rewardNum:"5"},{rewardNum:"10"},{rewardNum:"20"},{rewardNum:"50"},{rewardNum:"88"},{rewardNum:"128"},{rewardNum:"666"}],qrcodeShow:!1,amountNum:"",codeUrl:"",showScreen:!1,request:!1,isliked:"",likedClass:"",imageShow:!1,index:1,firstpostImageList:[],siteMode:"",isPaid:"",situation1:!1,loginBtnFix:!1,loginHide:!1,siteInfo:!1,siteUsername:"",joinedAt:"",sitePrice:"",username:"",roleList:[],loading:!1,finished:!1,isLoading:!1,pageIndex:1,pageLimit:20,offset:100,groupId:"",menuStatus:!1,collectStatus:!1,collectFlag:"",postCount:0,token:!1,isWeixin:!1,isPhone:!1,isAndroid:!1,isiOS:!1}},created:function(){var t=navigator.userAgent;this.isAndroid=t.indexOf("Android")>-1||t.indexOf("Adr")>-1,this.isiOS=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),this.isWeixin=i.default.isWeixin().isWeixin,this.isPhone=i.default.isWeixin().isPhone,this.getInfo(),this.detailsLoad(!0),this.themeCon?this.themeShow=!0:this.themeShow=!1,this.collectStatus?this.collectFlag="已收藏":this.collectFlag="收藏"},computed:{themeId:function(){return this.$route.params.themeId}},updated:function(){1!=this.isWeixin&&1!=this.isPhone&&this.limitWidth("detailsFooter")},methods:{downAttachment:function(t){this.isiOS&&this.$message("因iphone系统限制，您的手机无法下载文件。请使用安卓手机或电脑访问下载")},userArr:function(t){var e=[];return t.forEach((function(t){e.push(t._data.username)})),e.join(",")},limitWidth:function(t){console.log(t);var e=window.innerWidth;document.getElementById(t).style.width="640px",document.getElementById(t).style.marginLeft=(e-640)/2+"px"},getInfo:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(e){console.log(e),t.siteInfo=e.readdata,t.isPayVal=e.readdata._data.siteMode,null!=t.isPayVal&&""!=t.isPayVal&&(t.isPayVal=e.readdata._data.siteMode,t.detailIf(t.isPayVal,!1))}))},getUser:function(){var t=this,e=s.default.getLItem("tokenId");this.appFetch({url:"users",method:"get",splice:"/"+e,data:{include:"groups"}}).then((function(e){t.groupId=e.readdata.groups[0]._data.id,console.log(t.groupId)}))},detailIf:function(t){var e=s.default.getLItem("Authorization",e);this.token=e,"public"==t&&(console.log("公开"),e?(console.log("公开，已登录2222s"),this.loginBtnFix=!1,this.loginHide=!0,this.menuStatus=!0):(console.log("公开，未登录"),this.loginBtnFix=!0,this.loginHide=!1))},footFix:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;1==this.loginBtnFix&&(this.loginHide=!0,this.loginHide=t>80)},detailsLoad:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a="threads/"+this.themeId;return this.appFetch({url:a,method:"get",data:{"filter[isDeleted]":"no",include:["user","posts","posts.user","posts.likedUsers","posts.images","firstPost","firstPost.likedUsers","firstPost.images","firstPost.attachments","rewardedUsers","category"],"page[number]":this.pageIndex,"page[limit]":this.pageLimit}}).then((function(a){if(a.error)throw new Error(a.error);if(console.log(a.readdata),console.log("1234"),t.finished=a.readdata.posts.length<t.pageLimit,e){t.collectStatus=a.readdata._data.isFavorite,t.themeShow=!0,t.themeCon=a.readdata;var s=t.themeCon.firstPost.images.length;if(0===s)return;for(var i=[],n=0;n<s;n++)i.push(t.themeCon.firstPost.images[n]._data.thumbUrl);t.firstpostImageList=i;var o=t.themeCon.length;if(""==t.themeCon||null==t.themeCon)return!1;for(var r=0;r<o;r++){var c=[];if(t.themeCon[r].firstPost.images)for(var d=0;d<t.themeCon[r].posts.images.length;d++)c.push(t.themeCon[r].posts.images[d]._data.thumbUrl);t.themeCon[r].posts.imageList=c,console.log(c)}if(""==t.themeCon||null==t.themeCon)return console.log("null"),!1;console.log("循环");for(var l=0;l<o;l++){var u=[];if(t.themeCon[l].firstPost.images)for(var h=0;h<t.themeCon[l].posts.images.length;h++)u.push(t.themeCon[l].posts.images[h]._data.thumbUrl);t.themeCon[l].posts.imageList=u,console.log("898989"),console.log(u)}}else t.themeCon.posts=t.themeCon.posts.concat(a.readdata.posts)})).catch((function(e){t.loading&&1!==t.pageIndex&&t.pageIndex--})).finally((function(){console.log("22222222222222"),t.loading=!1}))},imageSwiper:function(){},onChange:function(t){this.index=t+1},shareTheme:function(){var t="http://10.0.10.210:8883/pay-circle-con/"+this.themeId+"/"+this.groupId;console.log(t);var e=document.createElement("input");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("Copy"),e.className="oInput",e.style.display="none",this.$toast.success("分享链接已复制成功")},signOut:function(){s.default.removeLItem("tokenId"),s.default.removeLItem("Authorization"),this.$router.push({path:"/login-user"})},loginJump:function(){this.$router.push({path:"/login-user"}),s.default.setLItem("themeId",this.themeId)},registerJump:function(){this.$router.push({path:"/sign-up"}),s.default.setLItem("themeId",this.themeId)},jumpPerDet:function(t){this.token?this.$router.push({path:"/home-page/"+t}):this.$router.push({path:"/login-user",name:"login-user"})},sitePayClick:function(t){var e=this;this.appFetch({url:"orderList",method:"post",data:{type:"1",thread_id:this.themeId,amount:t}}).then((function(a){var s=a.data.attributes.order_sn;e.orderPay(s,t)}))},bindScreen:function(){this.showScreen=!this.showScreen},themeOpera:function(t,e,a,s){if(this.token){var i=new Object;1==e?(this.collectStatus=!this.collectStatus,1==this.collectStatus?this.collectFlag="已收藏":0==this.collectStatus&&(this.collectFlag="收藏"),i.isFavorite=!0,"",this.themeOpeRequest(i,a)):2==e?("",this.themeOpeRequest(i,a),i.isEssence=!0):3==e?("",i.isSticky=!0,this.themeOpeRequest(i,a)):4==e?(i.isDeleted=!0,"",this.themeOpeRequest(i,a),this.$router.push({path:"/circle",name:"circle"})):this.$router.push({path:"/edit-topic/"+this.themeId})}else this.$router.push({path:"/login-user",name:"login-user"})},themeOpeRequest:function(t,e){var a="threads/"+this.themeId;this.appFetch({url:a,method:"patch",data:{data:{type:"threads",attributes:t},relationships:{category:{data:{type:"categories",id:e}}}}}).then((function(t){}))},replyOpera:function(t,e,a){var s=this;if(this.token){var i=new Object;1==e?i.isDeleted=!0:2==e&&(i.isLiked=!a);var n="posts/"+t;this.appFetch({url:n,method:"patch",data:{data:{type:"posts",attributes:i}}}).then((function(t){s.$message("修改成功"),s.pageIndex=1,s.detailsLoad(!0)}))}else this.$router.push({path:"/login-user",name:"login-user"})},showRewardPopup:function(){this.token?(this.rewardShow=!0,1!=this.isWeixin&&1!=this.isPhone&&this.rewardShow):this.$router.push({path:"/login-user",name:"login-user"})},replyToJump:function(t,e,a){this.token?this.$router.push({path:"/reply-to-topic",name:"reply-to-topic",params:{themeId:t,replyQuote:a,replyId:e}}):this.$router.push({path:"/login-user",name:"login-user"})},rewardPay:function(t){var e=this;this.appFetch({url:"orderList",method:"post",data:{type:"2",thread_id:this.themeId,amount:t}}).then((function(a){var s=a.data.attributes.order_sn;e.orderPay(s,t)}))},orderPay:function(t,e){var a=this,s=this.appCommonH.isWeixin().isWeixin,i=this.appCommonH.isWeixin().isPhone,n="";1==s?(alert("微信支付"),n="12"):n=1==i?"11":"10";var o="trade/pay/order/"+t;this.appFetch({url:o,method:"post",data:{payment_type:n}}).then((function(t){s||(i?window.location.href=t.data.attributes.wechat_h5_link:(a.qrcodeShow=!0,a.amountNum=e,a.codeUrl=t.data.attributes.wechat_qrcode))}))},onLoad:function(){this.loading=!0,this.pageIndex++,this.detailsLoad()},onRefresh:function(){var t=this;this.pageIndex=1,this.detailsLoad(!0).then((function(){t.$toast("刷新成功")})).catch((function(e){t.$toast("刷新失败")}))}},mounted:function(){},beforeRouteLeave:function(t,e,a){a()}}},mfst:function(t,e,a){"use strict";a.r(e);var s=a("Qo/1"),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);e.default=i.a},qWM9:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"circleCon"},[a("comHeader",{attrs:{title:"详情",menuIconShow:t.menuStatus}}),t._v(" "),a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[t.themeShow?a("div",{staticClass:"content marBfixed"},[a("div",{staticClass:"cirPostCon"},[a("div",{staticClass:"postTop"},[a("div",{staticClass:"postPer"},[t.themeCon.user._data.avatarUrl?a("img",{staticClass:"postHead",attrs:{src:t.themeCon.user._data.avatarUrl,alt:""}}):a("img",{staticClass:"postHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"}}),t._v(" "),a("div",{staticClass:"perDet"},[t.themeCon.user?a("div",{staticClass:"perName"},[t._v(t._s(t.themeCon.user._data.username))]):a("div",{staticClass:"perName"},[t._v("该用户已被删除")]),t._v(" "),a("div",{staticClass:"postTime"},[t._v(t._s(t.$moment(t.themeCon._data.createdAt).format("YYYY-MM-DD HH:mm")))])])]),t._v(" "),a("div",{staticClass:"postOpera"},[t.themeCon._data.isSticky?a("span",{staticClass:"icon iconfont icon-top"}):t._e()])]),t._v(" "),a("div",{staticClass:"postContent"},[a("a",{domProps:{innerHTML:t._s(t.themeCon.firstPost._data.contentHtml)}})]),t._v(" "),a("div",{staticClass:"postImgBox"},[a("div",{staticClass:"postImgList"},t._l(t.firstpostImageList,(function(e,s){return a("van-image",{key:s,attrs:{fit:"none","lazy-load":"",src:e},on:{click:t.imageSwiper}})})),1)]),t._v(" "),t.isiOS?a("div",{staticClass:"uploadFileList"},t._l(t.themeCon.firstPost.attachments,(function(e,s){return a("a",{key:s,staticClass:"fileChi",on:{click:function(a){return t.downAttachment(e._data.url)}}},["rar"===e._data.extension?a("span",{staticClass:"icon iconfont icon-rar"}):"word"===e._data.extension?a("span",{staticClass:"icon iconfont icon-word"}):"pdf"===e._data.extension?a("span",{staticClass:"icon iconfont icon-pdf"}):"jpg"===e._data.extension?a("span",{staticClass:"icon iconfont icon-jpg"}):"mp"===e._data.extension?a("span",{staticClass:"icon iconfont icon-mp3"}):"mp1"===e._data.extension?a("span",{staticClass:"icon iconfont icon-mp4"}):"png"===e._data.extension?a("span",{staticClass:"icon iconfont icon-PNG"}):"ppt"===e._data.extension?a("span",{staticClass:"icon iconfont icon-ppt"}):"swf"===e._data.extension?a("span",{staticClass:"icon iconfont icon-swf"}):"TIFF"===e._data.extension?a("span",{staticClass:"icon iconfont icon-TIFF"}):"txt"===e._data.extension?a("span",{staticClass:"icon iconfont icon-txt"}):"xls"===e._data.extension?a("span",{staticClass:"icon iconfont icon-xls"}):a("span",{staticClass:"icon iconfont icon-doubt"}),t._v(" "),a("span",{staticClass:"fileName"},[t._v(t._s(e._data.fileName))])])})),0):a("div",{staticClass:"uploadFileList"},t._l(t.themeCon.firstPost.attachments,(function(e,s){return a("a",{key:s,staticClass:"fileChi",attrs:{href:e._data.url,download:""}},["rar"===e._data.extension?a("span",{staticClass:"icon iconfont icon-rar"}):"word"===e._data.extension?a("span",{staticClass:"icon iconfont icon-word"}):"pdf"===e._data.extension?a("span",{staticClass:"icon iconfont icon-pdf"}):"jpg"===e._data.extension?a("span",{staticClass:"icon iconfont icon-jpg"}):"mp"===e._data.extension?a("span",{staticClass:"icon iconfont icon-mp3"}):"mp1"===e._data.extension?a("span",{staticClass:"icon iconfont icon-mp4"}):"png"===e._data.extension?a("span",{staticClass:"icon iconfont icon-PNG"}):"ppt"===e._data.extension?a("span",{staticClass:"icon iconfont icon-ppt"}):"swf"===e._data.extension?a("span",{staticClass:"icon iconfont icon-swf"}):"TIFF"===e._data.extension?a("span",{staticClass:"icon iconfont icon-TIFF"}):"txt"===e._data.extension?a("span",{staticClass:"icon iconfont icon-txt"}):"xls"===e._data.extension?a("span",{staticClass:"icon iconfont icon-xls"}):a("span",{staticClass:"icon iconfont icon-doubt"}),t._v(" "),a("span",{staticClass:"fileName"},[t._v(t._s(e._data.fileName))])])})),0),t._v(" "),a("div",{staticClass:"postDetBot"},[a("span",{staticClass:"readNum"},[t._v(t._s(t.themeCon._data.viewCount)+" 阅读")]),t._v(" "),t.themeCon._data.canEssence||t.themeCon._data.canSticky||t.themeCon._data.canDelete||t.themeCon._data.canEdit?a("div",{staticClass:"screen",on:{click:t.bindScreen}},[a("span",[t._v("管理")]),t._v(" "),a("span",{staticClass:"icon iconfont icon-down-menu jtGrayB"}),t._v(" "),t.showScreen?a("div",{staticClass:"themeList"},[t.themeCon._data.canEssence?a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.themeOpera(t.themeCon.firstPost._data.id,2,t.themeCon.category._data.id,t.themeCon.firstPost._data.content)}}},[t._v("加精")]):t._e(),t._v(" "),t.themeCon._data.canSticky?a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.themeOpera(t.themeCon.firstPost._data.id,3,t.themeCon.category._data.id,t.themeCon.firstPost._data.content)}}},[t._v("置顶")]):t._e(),t._v(" "),t.themeCon._data.canDelete?a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.themeOpera(t.themeCon.firstPost._data.id,4,t.themeCon.category._data.id,t.themeCon.firstPost._data.content)}}},[t._v("删除")]):t._e(),t._v(" "),t.themeCon.firstPost._data.canEdit?a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.themeOpera(t.themeCon.firstPost._data.id,5,t.themeCon.category._data.id,t.themeCon.firstPost._data.content)}}},[t._v("编辑")]):t._e()]):t._e()]):t._e(),t._v(" "),a("a",{staticClass:"postDetR",attrs:{href:"javascript:;"},on:{click:function(e){return t.themeOpera(t.themeCon.firstPost._data.id,1,t.themeCon.category._data.id,t.themeCon.firstPost._data.content)}}},[t._v(t._s(t.collectFlag))]),t._v(" "),a("a",{staticClass:"postDetR",attrs:{href:"javascript:;"},on:{click:t.shareTheme}},[t._v("分享")]),t._v(" "),a("input",{attrs:{type:"button",hidden:"",value:"点击复制代码"}})])]),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),a("div",{staticClass:"commentBox"},[t.themeCon.firstPost.likedUsers.length>0?a("div",{staticClass:"likeBox"},[a("span",{staticClass:"icon iconfont icon-praise-after"}),t._v(" "),t._l(t.themeCon.firstPost.likedUsers,(function(e){return a("a",{on:{click:function(a){return t.jumpPerDet(e._data.id)}}},[t._v(t._s(t.userArr(t.themeCon.firstPost.likedUsers)))])}))],2):t._e(),t._v(" "),t.themeCon.rewardedUsers.length>0?a("div",{staticClass:"payPer"},[a("span",{staticClass:"icon iconfont icon-money"}),t._v(" "),t._l(t.themeCon.rewardedUsers,(function(e){return e.avatarUrl?a("img",{staticClass:"payPerHead",attrs:{src:e._data.avatarUrl},on:{click:function(a){return t.jumpPerDet(e._data.id)}}}):a("img",{staticClass:"payPerHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"},on:{click:function(a){return t.jumpPerDet(e._data.id)}}})}))],2):t._e(),t._v(" "),a("van-list",{attrs:{finished:t.finished,offset:t.offset,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.themeCon.posts,(function(e){return a("div",[a("div",{staticClass:"commentPostDet"},[a("div",{staticClass:"postTop"},[a("div",{staticClass:"postPer"},[e.user&&e.user._data.avatarUrl?a("img",{staticClass:"postHead",attrs:{src:e.user._data.avatarUrl}}):a("img",{staticClass:"postHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"}}),t._v(" "),a("div",{staticClass:"perDet"},[e.user&&e.user._data.username?a("div",{staticClass:"perName"},[t._v(t._s(e.user._data.username))]):a("div",{staticClass:"perName"},[t._v("该用户已被删除")]),t._v(" "),a("div",{staticClass:"postTime"},[t._v(t._s(t.$moment(e._data.updatedAt).format("YYYY-MM-DD HH:mm")))])]),t._v(" "),a("div",{staticClass:"postImgBox"},[a("div",{staticClass:"postImgList"},t._l(e.imageList,(function(e,s){return a("van-image",{attrs:{fit:"none","lazy-load":"",src:e},on:{click:t.imageSwiper}})})),1)]),t._v(" "),a("div",{staticClass:"postImgBox"})])]),t._v(" "),a("div",{staticClass:"postContent"},[a("a",{attrs:{href:"javascript:;"},domProps:{innerHTML:t._s(e._data.contentHtml)}})])]),t._v(" "),a("div",{staticClass:"commentOpera padT22"},[a("a",{on:{click:function(a){return t.replyOpera(e._data.id,"1")}}},[t._v("删除")]),t._v(" "),e._data.isLiked?a("a",{on:{click:function(a){return t.replyOpera(e._data.id,"2",e._data.isLiked)}}},[a("span",{staticClass:"icon iconfont icon-praise-after",class:{"icon-like":t.likedClass}}),t._v(t._s(e._data.likeCount))]):a("a",{on:{click:function(a){return t.replyOpera(e._data.id,"2",e._data.isLiked)}}},[a("span",{staticClass:"icon iconfont icon-like",class:{"icon-praise-after":t.likedClass}}),t._v(t._s(e._data.likeCount))]),t._v(" "),a("a",{staticClass:"icon iconfont icon-review",on:{click:function(a){return t.replyToJump(t.themeCon._data.id,e._data.id,e._data.content)}}})])])})),0)],1)]):t._e()]),t._v(" "),a("div",{staticClass:"detailsFooter",attrs:{id:"detailsFooter"}},[a("div",{staticClass:"footChi",on:{click:function(e){return t.replyToJump(t.themeCon._data.id,!1,!1)}}},[a("span",{staticClass:"icon iconfont icon-review"}),t._v("\n            回复\n          ")]),t._v(" "),a("div",{staticClass:"footChi",on:{click:function(e){return t.replyOpera(t.themeCon.firstPost._data.id,"2",t.themeCon.firstPost._data.isLiked)}}},[t.themeCon.firstPost._data.isLiked?a("span",{staticClass:"icon iconfont icon-praise-after"}):a("span",{staticClass:"icon iconfont icon-like"}),t._v("\n            赞\n          ")]),t._v(" "),a("div",{staticClass:"footChi",on:{click:t.showRewardPopup}},[a("span",{staticClass:"icon iconfont icon-reward"}),t._v("\n            打赏\n          ")])]),t._v(" "),a("van-popup",{staticClass:"rewardPopup",style:{width:"100%"},attrs:{id:"rewardPopup",closeable:"","close-icon-position":"top-right",position:"bottom"},model:{value:t.rewardShow,callback:function(e){t.rewardShow=e},expression:"rewardShow"}},[a("span",{staticClass:"support"},[t._v("支持作者继续创作")]),t._v(" "),a("div",{staticClass:"rewardMonBox"},t._l(t.rewardNumList,(function(e,s){return a("div",{key:s,staticClass:"moneyChi",on:{click:function(a){return t.rewardPay(e.rewardNum)}}},[a("span",[t._v(t._s(e.rewardNum))]),t._v("元\n            ")])})),0)]),t._v(" "),a("van-popup",{staticClass:"qrCodeBox",attrs:{round:"","close-icon-position":"top-right",closeable:"","get-container":"body"},model:{value:t.qrcodeShow,callback:function(e){t.qrcodeShow=e},expression:"qrcodeShow"}},[a("span",{staticClass:"popupTit"},[t._v("立即支付")]),t._v(" "),a("div",{staticClass:"payNum"},[t._v("￥"),a("span",[t._v(t._s(t.amountNum))])]),t._v(" "),a("div",{staticClass:"payType"},[a("span",{staticClass:"typeLeft"},[t._v("支付方式")]),t._v(" "),a("span",{staticClass:"typeRight"},[a("i",{staticClass:"icon iconfont icon-wepay"}),t._v("微信支付")])]),t._v(" "),a("img",{staticClass:"qrCode",attrs:{src:t.codeUrl,alt:""}}),t._v(" "),a("p",{staticClass:"payTip"},[t._v("微信识别二维码支付")])]),t._v(" "),a("van-image-preview",{attrs:{images:t.firstpostImageList},on:{change:t.onChange},scopedSlots:t._u([{key:"index",fn:function(){return[t._v("第"+t._s(t.index)+"页")]},proxy:!0}]),model:{value:t.imageShow,callback:function(e){t.imageShow=e},expression:"imageShow"}}),t._v(" "),t.loginBtnFix?a("van-button",{staticClass:"loginBtnFix",class:{hide:t.loginHide},attrs:{type:"primary"},on:{click:function(e){return t.loginJump(1)}}},[t._v("登录 / 注册")]):t._e()],1)},i=[];a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}))}}]);