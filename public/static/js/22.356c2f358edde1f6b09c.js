(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"4gYi":function(t,e,a){"use strict";a.r(e);var i=a("ji+i"),s=a("gxDo");for(var r in s)"default"!==r&&function(t){a.d(e,t,(function(){return s[t]}))}(r);var o=a("KHd+"),n=Object(o.a)(s.default,i.a,i.b,!1,null,null,null);e.default=n.exports},"6Akm":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),a("CmEe"),e.default={name:"card"}},ARSS:function(t,e,a){},CmEe:function(t,e,a){},Lomd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(a("QbLZ"));a("zt69");var s=r(a("vx/2"));function r(t){return t&&t.__esModule?t:{default:t}}e.default=(0,i.default)({name:"site-set-view"},s.default)},Nn0y:function(t,e,a){"use strict";a.r(e);var i=a("XMfV"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e.default=s.a},PUmH:function(t,e,a){"use strict";a.r(e);var i=a("ZLqJ"),s=a("xoSE");for(var r in s)"default"!==r&&function(t){a.d(e,t,(function(){return s[t]}))}(r);var o=a("KHd+"),n=Object(o.a)(s.default,i.a,i.b,!1,null,null,null);e.default=n.exports},XMfV:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),a("ARSS"),e.default={name:"form-row"}},ZLqJ:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"site-set-box"},[a("Card",{attrs:{header:"站点名称："}},[a("CardRow",{attrs:{description:"你的Discuz!Q 站点的名称"}},[a("el-input",{attrs:{placeholder:"站点名称"},model:{value:t.siteName,callback:function(e){t.siteName=e},expression:"siteName"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"站点介绍："}},[a("CardRow",{attrs:{description:"你的Discuz!Q 站点的介绍"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:4},placeholder:"站点介绍"},model:{value:t.siteIntroduction,callback:function(e){t.siteIntroduction=e},expression:"siteIntroduction"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"站点LOGO："}},[a("CardRow",{attrs:{description:"你的Discuz!Q 站点的LOGO"}},[a("el-upload",{attrs:{action:"","http-request":t.uploaderLogo,"list-type":"picture-card",limit:1,"on-error":t.errorFile,"file-list":t.fileList,"on-preview":t.handlePictureCardPreview,"before-upload":t.beforeAvatarUpload,"on-remove":t.handleRemove}},[a("i",{staticClass:"el-icon-plus"})]),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible,size:"tiny"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)],1),t._v(" "),a("Card",{attrs:{header:"站点模式："}},[a("CardRow",{attrs:{description:"你的Discuz!Q 站点的运行模式"}},[a("el-radio",{attrs:{label:"1"},on:{change:function(e){return t.radioChange("public")}},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("公开模式")]),t._v(" "),a("el-radio",{attrs:{label:"2"},on:{change:function(e){return t.radioChange("pay")}},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("付费模式")])],1)],1),t._v(" "),a("el-collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:"2"===t.radio,expression:"radio === '2'"}]},[a("Card",{attrs:{header:"加入价格（元）："}},[a("CardRow",{attrs:{description:"付费模式下，付费成为站点默认角色，需支付的金额"}},[a("el-input",{attrs:{placeholder:"加入价格"},model:{value:t.sitePrice,callback:function(e){t.sitePrice=e},expression:"sitePrice"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"到期时间："}},[a("CardRow",{attrs:{description:"付费模式下，付费成为站点默认角色，可维持的时间,不填或为0时不限制"}},[t._v("\n           加入起\n              "),a("el-input",{staticStyle:{height:"36PX",width:"80PX"},attrs:{clearable:"",placeholder:"天数"},model:{value:t.siteExpire,callback:function(e){t.siteExpire=e},expression:"siteExpire"}}),t._v("\n              天后\n\n        ")],1)],1)],1)]),t._v(" "),a("Card",{attrs:{header:"主题打赏金额分成比例："}},[a("CardRow",{attrs:{description:"主题打赏的分成比例设置"}},[a("div",{staticClass:"proportion-box"},[a("span",[t._v("作者")]),t._v(" "),a("el-input",{attrs:{size:"small"},model:{value:t.siteAuthorScale,callback:function(e){t.siteAuthorScale=e},expression:"siteAuthorScale"}})],1),t._v(" "),a("div",{staticClass:"proportion-box"},[a("span",[t._v("平台(站长)")]),t._v(" "),a("el-input",{attrs:{size:"small"},model:{value:t.siteMasterScale,callback:function(e){t.siteMasterScale=e},expression:"siteMasterScale"}})],1)])],1),t._v(" "),a("Card",{attrs:{header:"网站备案信息："}},[a("CardRow",{attrs:{description:"你的Discuz!Q 站点的 ICP 备案编号"}},[a("el-input",{model:{value:t.siteRecord,callback:function(e){t.siteRecord=e},expression:"siteRecord"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"第三方统计："}},[a("CardRow",{attrs:{description:"你的Discuz!Q 网站的第三方统计代码"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:4}},model:{value:t.siteStat,callback:function(e){t.siteStat=e},expression:"siteStat"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"关闭站点："}},[a("CardRow",{attrs:{description:"暂时将网站关闭，其他人无法访问，但不影响管理员访问"}},[a("el-radio",{attrs:{label:"1"},on:{change:function(e){return t.radioChangeClose("1")}},model:{value:t.radio2,callback:function(e){t.radio2=e},expression:"radio2"}},[t._v("是")]),t._v(" "),a("el-radio",{attrs:{label:"2"},on:{change:function(e){return t.radioChangeClose("2")}},model:{value:t.radio2,callback:function(e){t.radio2=e},expression:"radio2"}},[t._v("否")])],1)],1),t._v(" "),a("el-collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:"1"===t.radio2,expression:"radio2 === '1'"}]},[a("Card",{attrs:{header:"关闭提示信息："}},[a("CardRow",{attrs:{description:"站点关闭时出现的提示信息"}},[a("el-input",{model:{value:t.siteCloseMsg,callback:function(e){t.siteCloseMsg=e},expression:"siteCloseMsg"}})],1)],1)],1)]),t._v(" "),a("Card",{staticClass:"footer-btn"},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.siteSetPost}},[t._v("提交")])],1)],1)},s=[];a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return s}))},gxDo:function(t,e,a){"use strict";a.r(e);var i=a("6Akm"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e.default=s.a},"ji+i":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-box"},[t.$attrs.header?a("div",{staticClass:"card-box__header",class:t.$slots.default?"":"not-main"},[a("header",{staticClass:"card-title",class:t.$attrs.intercept?"card-intercept-title":""},[t._v(t._s(t.$attrs.header))]),t._v(" "),t._t("header")],2):t._e(),t._v(" "),a("main",{staticClass:"card-box__main"},[t._t("default")],2)])},s=[];a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return s}))},pNQN:function(t,e,a){"use strict";a.r(e);var i=a("rbp7"),s=a("Nn0y");for(var r in s)"default"!==r&&function(t){a.d(e,t,(function(){return s[t]}))}(r);var o=a("KHd+"),n=Object(o.a)(s.default,i.a,i.b,!1,null,null,null);e.default=n.exports},rbp7:function(t,e,a){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-row-box"},[e("div",{staticClass:"card-row-lf"},[this._t("default")],2),this._v(" "),e("div",{staticClass:"card-row-rf"},[e("span",[this._v(this._s(this.$attrs.description))]),this._v(" "),this._t("tail")],2)])},s=[];a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return s}))},"vx/2":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o(a("YEIV")),s=o(a("4gYi")),r=o(a("pNQN"));function o(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){var t;return t={radio:"1",radio2:"2",imageUrl:"",loading:!0,fullscreenLoading:!1,siteName:"",siteIntroduction:"",siteMode:"1",sitePrice:"",siteExpire:"",siteAuthorScale:"",siteMasterScale:"",siteClose:"1",siteLogoFile:{}},(0,i.default)(t,"siteLogoFile",[]),(0,i.default)(t,"siteRecord",""),(0,i.default)(t,"siteStat",""),(0,i.default)(t,"siteCloseMsg",""),(0,i.default)(t,"dialogImageUrl",""),(0,i.default)(t,"dialogVisible",!1),(0,i.default)(t,"fileList",[]),t},created:function(){this.loadStatus()},methods:{loadStatus:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(e){t.siteName=e.readdata._data.siteName,t.siteIntroduction=e.readdata._data.siteIntroduction,t.siteMode=e.readdata._data.siteMode,"pay"==t.siteMode?t.radio="2":t.radio="1",t.sitePrice=e.readdata._data.sitePrice,t.siteExpire=e.readdata._data.siteExpire,t.siteAuthorScale=e.readdata._data.siteAuthorScale,t.siteMasterScale=e.readdata._data.siteMasterScale,t.siteLogoFile=e.readdata._data.siteLogoFile,t.siteRecord=e.readdata._data.siteRecord,t.siteStat=e.readdata._data.siteStat,t.siteClose=e.readdata._data.siteClose,1==t.siteClose?t.radio2="1":t.radio2="2",t.siteCloseMsg=e.readdata._data.siteCloseMsg})).catch((function(t){}))},handleRemove:function(t,e){var a=this,i=new FormData;i.append("logo",t.raw),this.appFetch({url:"logo",method:"delete",data:i}).then((function(t){a.$message("删除成功")})).catch((function(t){console.log("上传失败")}))},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},radioChange:function(t){this.siteMode=t},radioChangeClose:function(t){this.siteClose="1"==t},beforeAvatarUpload:function(t){var e="image/jpeg"==t.type||"image/png"==t.type||"image/gif"==t.type,a=t.size/1024/1024<2;return e?a?(this.multfileImg=t,e&&a):(this.$message.warning("上传头像图片大小不能超过 2MB!"),a):(this.$message.warning("上传头像图片只能是 JPG/PNG/GIF 格式!"),e)},uploaderLogo:function(t){console.log(t);var e=new FormData;e.append("logo",t.file),console.log(e),this.appFetch({url:"logo",method:"post",data:e}).then((function(t){})).catch((function(t){console.log("上传失败")}))},errorFile:function(){console.log(this.fileList)},siteSetPost:function(){var t=this;this.appFetch({url:"settings",method:"post",data:{data:[{attributes:{key:"site_name",value:this.siteName,tag:"default"}},{attributes:{key:"site_introduction",value:this.siteIntroduction,tag:"default"}},{attributes:{key:"site_mode",value:this.siteMode,tag:"default"}},{attributes:{key:"site_price",value:this.sitePrice,tag:"default"}},{attributes:{key:"site_expire",value:this.siteExpire,tag:"default"}},{attributes:{key:"site_author_scale",value:this.siteAuthorScale,tag:"default"}},{attributes:{key:"site_master_scale",value:this.siteMasterScale,tag:"default"}},{attributes:{key:"site_record",value:this.siteRecord,tag:"default"}},{attributes:{key:"site_stat",value:this.siteStat,tag:"default"}},{attributes:{key:"site_close",value:this.siteClose,tag:"default"}},{attributes:{key:"site_close_msg",value:this.siteCloseMsg,tag:"default"}}]}}).then((function(e){console.log(e),t.$message({message:"提交成功",type:"success"})})).catch((function(t){console.log("失败")}))}},components:{Card:s.default,CardRow:r.default}}},xoSE:function(t,e,a){"use strict";a.r(e);var i=a("Lomd"),s=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e.default=s.a},zt69:function(t,e,a){}}]);