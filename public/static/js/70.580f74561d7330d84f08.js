(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{"8ss3":function(t,e,a){"use strict";a.r(e);var i=a("peli"),r=a("cabW");for(var n in r)"default"!==n&&function(t){a.d(e,t,(function(){return r[t]}))}(n);var s=a("KHd+"),u=Object(s.a)(r.default,i.a,i.b,!1,null,null,null);e.default=u.exports},Bouk:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(a("4gYi")),r=n(a("pNQN"));function n(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{picture:"",fileExtension:"",maximumSize:""}},created:function(){this.annexSet()},methods:{annexSet:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(e){e.errors?t.$message.error(e.errors[0].code):(t.picture=e.readdata._data.supportImgExt,t.fileExtension=e.readdata._data.supportFileExt,t.maximumSize=e.readdata._data.supportMaxSize,console.log(e))}))},submi:function(){var t=this,e=this.picture,a=this.fileExtension,i=this.maximumSize;e?a?i?/^\d+$|^\d+[.]?\d+$/.test(i)?/^[0-9]*$/.test(i)?this.appFetch({url:"settings",method:"post",data:{data:[{attributes:{key:"support_img_ext",value:this.picture,tag:"default"}},{attributes:{key:"support_file_ext",value:this.fileExtension,tag:"default"}},{attributes:{key:"support_max_size",value:this.maximumSize,tag:"default"}}]}}).then((function(e){e.errors?t.$message.error(e.errors[0].code):t.$message({message:"提交成功",type:"success"})})).catch((function(t){})):this.this.$toast("请输入正确的支持最大尺寸格式"):this.$toast("请输入正确的支持最大尺寸格式"):this.$toast("请您输入支持的最大尺寸"):this.$toast("请您输入文件扩展名"):this.$toast("请您输入图片扩展名")}},components:{Card:i.default,CardRow:r.default}}},cabW:function(t,e,a){"use strict";a.r(e);var i=a("uflW"),r=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e.default=r.a},peli:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"annex-set-box"},[a("Card",{attrs:{header:"支持的图片扩展名："}},[a("CardRow",{attrs:{description:"多个请用,隔开，例如 png,gif,jpg"}},[a("el-input",{model:{value:t.picture,callback:function(e){t.picture=e},expression:"picture"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"支持的文件扩展名："}},[a("CardRow",{attrs:{description:"多个请用,隔开，例如 doc,docx,pdf,zip"}},[a("el-input",{model:{value:t.fileExtension,callback:function(e){t.fileExtension=e},expression:"fileExtension"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"支持的最大尺寸："}},[a("CardRow",{attrs:{description:"单位：MB"}},[a("el-input",{attrs:{type:"number"},model:{value:t.maximumSize,callback:function(e){t.maximumSize=e},expression:"maximumSize"}})],1)],1),t._v(" "),a("Card",{staticClass:"footer-btn"},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.submi}},[t._v("提交")])],1)],1)},r=[];a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return r}))},uflW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(a("QbLZ")),r=n(a("Bouk"));function n(t){return t&&t.__esModule?t:{default:t}}a("zt69"),e.default=(0,i.default)({name:"annex-set-view"},r.default)}}]);