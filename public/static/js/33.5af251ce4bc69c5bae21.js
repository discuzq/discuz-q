(window.webpackJsonp=window.webpackJsonp||[]).push([[33,80],{"+1ub":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.autoTextarea=function(t,e,o,n){e=e||0;var a=!!document.getBoxObjectFor||"mozInnerScreenX"in window,i=!!window.opera&&!!window.opera.toString().indexOf("Opera"),s=function(e,o){t.addEventListener?t.addEventListener(e,o,!1):t.attachEvent("on"+e,o)},c=t.currentStyle?function(e){var o=t.currentStyle[e];if("height"===e&&1!==o.search(/px/i)){var n=t.getBoundingClientRect();return n.bottom-n.top-parseFloat(c("paddingTop"))-parseFloat(c("paddingBottom"))+"px"}return o}:function(e){return getComputedStyle(t,null)[e]},r=parseFloat(c("height"));t.style.resize="none";var l=function(){var s,l,d=0,u=t.style;t._length!==t.value.length&&(t._length=t.value.length,a||i||(d=parseInt(c("paddingTop"))+parseInt(c("paddingBottom"))),s=document.body.scrollTop||document.documentElement.scrollTop,t.style.height=r+"px",t.scrollHeight>r&&(o&&t.scrollHeight>o?(l=o-d,u.overflowY="auto"):(l=t.scrollHeight-d,u.overflowY="hidden"),u.height=l+e+"px",s+=parseInt(u.height)-t.currHeight,document.body.scrollTop=s,document.documentElement.scrollTop=s,t.currHeight=parseInt(u.height),n(parseInt(u.height))))};s("propertychange",l),s("input",l),s("focus",l),l()},e.debounce=function(t,e){var o=void 0;return function(){for(var n=this,a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];o&&clearTimeout(o),o=setTimeout((function(){t.apply(n,i)}),e||500)}}},"1m/t":function(t,e,o){"use strict";o.r(e);var n=o("9jAL"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e.default=a.a},"1nxv":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("+1ub"),a=(i(o("edxw")),i(o("UgcE")),i(o("6NK7")));function i(t){return t&&t.__esModule?t:{default:t}}var s=parseFloat(document.documentElement.style.fontSize);e.default={data:function(){return{headerTitle:"发布主题",selectSort:"选择分类",showPopup:!1,categories:[],categoriesId:[],cateId:"",content:"",showFacePanel:!1,keyboard:!1,keywordsMax:1e3,list:[],footMove:!1,faceData:[],fileList:[],fileListOne:[],uploadShow:!1,enclosureList:[],avatar:"",themeId:"",postsId:"",files:{name:"",type:""},headerImage:null,picValue:null,upImgUrl:"",enclosureShow:!1,isWeixin:!1,isPhone:!1,themeCon:!1,attriAttachment:!1}},mounted:function(){var t=this;this.$nextTick((function(){var e=t.$refs.textarea;e.focus();var o=300;e&&(0,n.autoTextarea)(e,5,0,(function(t){if((t+=20)!==o){o=t}}))})),1!=this.isWeixin&&1!=this.isPhone&&this.limitWidth()},created:function(){if(this.isWeixin=a.default.isWeixin().isWeixin,this.isPhone=a.default.isWeixin().isPhone,this.$route.params.themeId){var t=this.$route.params.themeId,e=this.$route.params.postsId,o=this.$route.params.themeContent;this.themeId=t,this.postsId=e,this.content=o}this.loadCategories(),this.detailsLoad()},watch:{},methods:{detailsLoad:function(){var t=this;if(this.postsId&&this.content){var e="threads/"+this.themeId;this.appFetch({url:e,method:"get",data:{include:["firstPost","firstPost.images","firstPost.attachments","category"]}}).then((function(e){if(e.errors)throw t.$toast.fail(e.errors[0].code),new Error(e.error);console.log(e),console.log("1234"),console.log(t.cateId);var o=e.readdata.category._data.id;t.selectSort=e.readdata.category._data.description,console.log(t.selectSort),t.cateId!=o&&(t.cateId=o)}))}},publish:function(){var t=this;if(this.postsId&&this.content){console.log("回复");var e="posts/"+this.postsId;this.appFetch({url:e,method:"patch",data:{data:{type:"posts",attributes:{content:this.content}}}}).then((function(e){if(e.errors)throw t.$toast.fail(e.errors[0].code),new Error(e.error);t.apiStore.pushPayload(e);t.$router.push({path:"details/"+t.themeId})}))}else{this.attriAttachment=this.fileList.concat(this.enclosureList);for(var o=0;o<this.attriAttachment.length;o++)this.attriAttachment[o]={type:"attachments",id:this.attriAttachment[o].id};console.log(this.attriAttachment),this.appFetch({url:"threads",method:"post",data:{data:{type:"threads",attributes:{content:this.content},relationships:{category:{data:{type:"categories",id:this.cateId}},attachments:{data:this.attriAttachment}}}}}).then((function(e){if(e.errors)throw t.$toast.fail(e.errors[0].code+"\n"+e.errors[0].detail[0]),new Error(e.error);var o=e.readdata._data.id;t.$router.push({path:"details/"+o})}))}},limitWidth:function(){document.getElementById("post-topic-footer").style.width="640px";var t=window.innerWidth;document.getElementById("post-topic-footer").style.marginLeft=(t-640)/2+"px"},handleFile:function(t){var e=new FormData;e.append("file",t.file),e.append("isGallery",1),console.log(this.fileList),this.uploaderEnclosure(e,!1,!0),this.loading=!1},handleFileUp:function(t){var e=t.target.files[0],o=new FormData;o.append("file",e),o.append("isGallery",1),this.uploaderEnclosure(o,!0,!0),this.uploadShow=!0,this.loading=!1},deleteEnclosure:function(t,e){console.log(t,e),this.fileList.length<1&&(this.uploadShow=!1)},handleEnclosure:function(t){var e=t.target.files[0],o=new FormData;o.append("file",e),o.append("isGallery",0),this.loading=!0,this.uploaderEnclosure(o,!1,!1,!0)},uploaderEnclosure:function(t,e,o,n){var a=this;console.log(t,e,n),this.appFetch({url:"attachment",method:"post",data:t}).then((function(t){if(t.errors)throw a.$toast.fail(t.errors[0].code),new Error(t.error);console.log(t),o&&a.fileList.push({url:t.readdata._data.url,id:t.readdata._data.id}),e&&(console.log("图片"),a.fileListOne.push({url:t.readdata._data.url,id:t.readdata._data.id})),n&&(console.log("fujian"),a.enclosureShow=!0,a.enclosureList.push({type:t.readdata._data.extension,name:t.readdata._data.fileName,id:t.readdata._data.id}),console.log(a.enclosureList)),a.loading=!1})),console.log(this.fileList)},clearKeywords:function(){this.keywords="",this.list=[];var t=this.$refs.textarea,e=40/s;t.style.height=e+"rem",e=60/s,t.focus()},searchChange:(0,n.debounce)((function(){if(this.keywords&&this.keywords.trim())this.keywords;else this.list=[]})),handleFaceChoose:function(t){var e=this.content,o=this.$refs.textarea,n=o.selectionStart,a=o.selectionEnd,i=e.substring(0,n)+t+e.substring(a,e.length);this.content=i,o.setSelectionRange&&setTimeout((function(){var e=n+t.length;o.setSelectionRange(e,e)}),0)},addExpression:function(){var t=this;this.keyboard=!this.keyboard,this.appFetch({url:"emojis",method:"get",data:{include:""}}).then((function(e){t.faceData=e.readdata})),this.showFacePanel=!this.showFacePanel,this.footMove=!this.footMove},backClick:function(){this.$router.go(-1)},dClick:function(){this.showPopup=!0},onConfirm:function(t,e){console.log(t);var o=t.id;this.cateId=o,console.log(this.cateId);t.text;this.showPopup=!1,this.selectSort=t.text},loadCategories:function(){var t=this;this.appFetch({url:"categories",method:"get",data:{include:""}}).then((function(e){if(e.errors)throw t.$toast.fail(e.errors[0].code),new Error(e.error);console.log(e,"res1111");var o;o=e.readdata,console.log(e.readdata);for(var n=0,a=o.length;n<a;n++)t.categories.push({text:o[n]._data.name,id:o[n]._data.id}),t.categoriesId.push(o[n]._data.id)}))},onCancel:function(){this.showPopup=!1}}}},"6GI9":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{active:0,faceIndex:0}},props:{faceData:{type:Array}},computed:{faces:function(){for(var t=this.faceData,e=(this.faceIndex,t),o=0,n=[];28*o<e.length;)n.push(e.slice(28*o,28*(o+1))),o+=1;return n},scrollWidth:function(){return this.faces.length*document.body.clientWidth},scrollPosition:function(){return this.active*document.body.clientWidth}},mounted:function(){var t=this,e=this.$refs.faceContent,o=0,n=0;e.ontouchstart=function(t){o=t.targetTouches[0].pageX},e.ontouchend=function(e){(n=e.changedTouches[0].pageX)-o>50?0!==t.active&&t.active--:n-o<-50&&t.active!==t.faces.length-1&&t.active++}},created:function(){},methods:{getUrlCode:function(){var t=this;this.code=this.$utils.getUrlKey("code"),alert(code),this.appFetch({url:"weixin",method:"get",data:{code:this.code}}).then((function(t){alert(65756765)}),(function(e){100004==e.errors[0].status&&t.$router.go(-1)}))},loginWxClick:function(){this.$router.push({path:"/wx-login-bd"})},loginPhoneClick:function(){this.$router.push({path:"/login-phone"})},onFaceClick:function(t){this.$emit("onFaceChoose",t)}}}},"9jAL":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(o("QbLZ"));o("E2jd");var a=s(o("1nxv")),i=(o("+1ub"),s(o("SDcr")));function s(t){return t&&t.__esModule?t:{default:t}}e.default=(0,n.default)({name:"post-topic",components:{Expression:i.default}},a.default)},FI70:function(t,e,o){"use strict";o.r(e);var n=o("cM0s"),a=o("1m/t");for(var i in a)"default"!==i&&function(t){o.d(e,t,(function(){return a[t]}))}(i);var s=o("KHd+"),c=Object(s.a)(a.default,n.a,n.b,!1,null,null,null);e.default=c.exports},SDcr:function(t,e,o){"use strict";o.r(e);var n=o("j2JY"),a=o("uwTP");for(var i in a)"default"!==i&&function(t){o.d(e,t,(function(){return a[t]}))}(i);var s=o("KHd+"),c=Object(s.a)(a.default,n.a,n.b,!1,null,null,null);e.default=c.exports},cM0s:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"post-topic-box"},[o("header",{staticClass:"post-topic-header"},[o("span",{staticClass:"icon iconfont icon-back post-topic-header-icon",on:{click:t.backClick}}),t._v(" "),o("h2",{staticClass:"postHeadTit"},[t._v(t._s(t.headerTitle))]),t._v(" "),o("van-button",{attrs:{type:"primary",size:"mini"},on:{click:t.publish}},[t._v("发布")])],1),t._v(" "),o("div",{staticClass:"post-topic-form"},[o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],ref:"textarea",staticClass:"reply-box",attrs:{id:"post-topic-form-text",name:"post-topic",placeholder:"请输入内容",maxlength:t.keywordsMax},domProps:{value:t.content},on:{change:t.searchChange,focus:function(e){t.showFacePanel=!1,t.footMove=!1,t.keyboard=!1},input:function(e){e.target.composing||(t.content=e.target.value)}}}),t._v(" "),t.uploadShow?o("div",{staticClass:"uploadBox"},[o("van-uploader",{attrs:{"max-count":12,"after-read":t.handleFile,accept:"image/*",multiple:""},on:{delete:function(e){return t.deleteEnclosure(e,"img")}},model:{value:t.fileList,callback:function(e){t.fileList=e},expression:"fileList"}})],1):t._e(),t._v(" "),t.enclosureShow?o("div",{staticClass:"enclosure"},t._l(t.enclosureList,(function(e,n){return o("div",{key:n,staticClass:"enclosureChi"},["rar"===e.type?o("span",{staticClass:"icon iconfont icon-rar"}):"word"===e.type?o("span",{staticClass:"icon iconfont icon-word"}):"pdf"===e.type?o("span",{staticClass:"icon iconfont icon-pdf"}):"jpg"===e.type?o("span",{staticClass:"icon iconfont icon-jpg"}):"mp"===e.type?o("span",{staticClass:"icon iconfont icon-mp3"}):"mp1"===e.type?o("span",{staticClass:"icon iconfont icon-mp4"}):"png"===e.type?o("span",{staticClass:"icon iconfont icon-PNG"}):"ppt"===e.type?o("span",{staticClass:"icon iconfont icon-ppt"}):"swf"===e.type?o("span",{staticClass:"icon iconfont icon-swf"}):"TIFF"===e.type?o("span",{staticClass:"icon iconfont icon-TIFF"}):"txt"===e.type?o("span",{staticClass:"icon iconfont icon-txt"}):"xls"===e.type?o("span",{staticClass:"icon iconfont icon-xls"}):o("span",{staticClass:"icon iconfont icon-doubt"}),t._v(" "),o("span",{staticClass:"encName"},[t._v(t._s(e.name))]),t._v(" "),o("van-icon",{staticClass:"encDelete",attrs:{name:"clear"},on:{click:function(o){return t.deleteEnclosure(e.id,"enclosure")}}})],1)})),0):t._e()]),t._v(" "),o("footer",{staticClass:"post-topic-footer",class:{footMove:t.footMove},attrs:{id:"post-topic-footer"}},[o("div",{staticClass:"post-topic-footer-left"},[o("span",{staticClass:"icon iconfont icon-label post-topic-header-icon",class:{"icon-keyboard":t.keyboard},on:{click:t.addExpression}}),t._v(" "),o("span",{staticClass:"icon iconfont icon-picture post-topic-header-icon uploadIcon"},[o("input",{staticClass:"hiddenInput",attrs:{type:"file",accept:"image/*"},on:{change:t.handleFileUp}})]),t._v(" "),o("span",{staticClass:"icon iconfont icon-enclosure post-topic-header-icon uploadIcon"},[o("input",{staticClass:"hiddenInput",attrs:{type:"file",accept:"image/*"},on:{change:t.handleEnclosure}})])]),t._v(" "),o("div",{staticClass:"post-topic-footer-right",on:{click:t.dClick}},[o("span",{staticClass:"post-topic-footer-right-sort"},[t._v(t._s(t.selectSort))]),t._v(" "),o("span",{staticClass:"icon iconfont icon-down-menu post-topic-header-icon",staticStyle:{color:"#888888"}})])]),t._v(" "),t.showFacePanel?o("Expression",{staticClass:"expressionBox",attrs:{faceData:t.faceData},on:{onFaceChoose:t.handleFaceChoose}}):t._e(),t._v(" "),o("div",{staticClass:"popup"},[o("van-popup",{style:{height:"50%"},attrs:{position:"bottom",round:""},model:{value:t.showPopup,callback:function(e){t.showPopup=e},expression:"showPopup"}},[o("van-picker",{attrs:{columns:t.categories,"show-toolbar":"",title:"选择分类"},on:{cancel:t.onCancel,confirm:t.onConfirm}})],1)],1)],1)},a=[];o.d(e,"a",(function(){return n})),o.d(e,"b",(function(){return a}))},j2JY:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"face-container"},[o("div",{staticClass:"scroll-wrapper"},[o("div",{ref:"faceContent",staticClass:"face-content",style:{width:t.scrollWidth+"px",marginLeft:-t.scrollPosition+"px"},on:{touchmove:function(t){t.preventDefault()}}},t._l(t.faces,(function(e,n){return o("div",{key:n,staticClass:"face-page"},t._l(e,(function(e,n){return o("a",{key:n},[o("img",{staticClass:"emoji",attrs:{src:e._data.url},on:{click:function(o){return t.onFaceClick(" "+e._data.code+" ")}}})])})),0)})),0),t._v(" "),o("div",{staticClass:"page-dot"},t._l(t.faces.length,(function(e){return o("div",{key:e,staticClass:"dot-item",class:e===t.active+1?"active":"",on:{click:function(o){t.active=e-1}}})})),0)])])},a=[];o.d(e,"a",(function(){return n})),o.d(e,"b",(function(){return a}))},uwTP:function(t,e,o){"use strict";o.r(e);var n=o("yaIx"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e.default=a.a},yaIx:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(o("QbLZ")),a=i(o("6GI9"));function i(t){return t&&t.__esModule?t:{default:t}}o("E2jd"),e.default=(0,n.default)({name:"expressionView"},a.default)}}]);