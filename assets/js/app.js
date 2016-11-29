"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function setInputSelection(e,t,a){if(e.focus(),"undefined"!=typeof e.selectionStart)e.selectionStart=t,e.selectionEnd=a;else if(document.selection&&document.selection.createRange){e.select();var o=document.selection.createRange();o.collapse(!0),o.moveEnd("character",a),o.moveStart("character",t),o.select()}}function makeSafePath(e){var t=_.split(_.trim(e),"/");return t=_.map(t,function(e){return _.kebabCase(_.deburr(_.trim(e)))}),_.join(_.filter(t,function(e){return!_.isEmpty(e)}),"/")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}();jQuery(document).ready(function(e){var t=this;e("a").smoothScroll({speed:400,offset:-70});new Sticky(".stickyscroll");e(window).bind("beforeunload",function(){e("#notifload").addClass("active")}),e(document).ajaxSend(function(){e("#notifload").addClass("active")}).ajaxComplete(function(){e("#notifload").removeClass("active")});var a=new Alerts;alertsData&&_.forEach(alertsData,function(e){a.push(e)});var o=io(window.location.origin);if(e("#search-input").length){e("#search-input").focus(),e(".searchresults").css("display","block");var n=new Vue({el:"#header-container",data:{searchq:"",searchres:[],searchsuggest:[],searchload:0,searchactive:!1,searchmoveidx:0,searchmovekey:"",searchmovearr:[]},watch:{searchq:function(e,t){n.searchmoveidx=0,e.length>=3?(n.searchactive=!0,n.searchload++,o.emit("search",{terms:e},function(e){n.searchres=e.match,n.searchsuggest=e.suggest,n.searchmovearr=_.concat([],n.searchres,n.searchsuggest),n.searchload>0&&n.searchload--})):(n.searchactive=!1,n.searchres=[],n.searchsuggest=[],n.searchmovearr=[],n.searchload=0)},searchmoveidx:function(e,t){e>0?n.searchmovekey=n.searchmovearr[e-1]?"res."+n.searchmovearr[e-1]._id:"sug."+n.searchmovearr[e-1]:n.searchmovekey=""}},methods:{useSuggestion:function(e){n.searchq=e},closeSearch:function(){n.searchq=""},moveSelectSearch:function(){if(!(n.searchmoveidx<1)){var e=n.searchmoveidx-1;n.searchmovearr[e]?window.location.assign("/"+n.searchmovearr[e]._id):n.searchq=n.searchmovearr[e]}},moveDownSearch:function(){n.searchmoveidx<n.searchmovearr.length&&n.searchmoveidx++},moveUpSearch:function(){n.searchmoveidx>0&&n.searchmoveidx--}}});e("main").on("click",n.closeSearch)}if(e("#page-type-view").length&&!function(){var t="home"!==e("#page-type-view").data("entrypath")?e("#page-type-view").data("entrypath"):"",o=t+"/new-page";e(".btn-create-prompt").on("click",function(a){e("#txt-create-prompt").val(o),e("#modal-create-prompt").toggleClass("is-active"),setInputSelection(e("#txt-create-prompt").get(0),t.length+1,o.length),e("#txt-create-prompt").removeClass("is-danger").next().addClass("is-hidden")}),e("#txt-create-prompt").on("keypress",function(t){13===t.which&&e(".btn-create-go").trigger("click")}),e(".btn-create-go").on("click",function(t){var a=makeSafePath(e("#txt-create-prompt").val());_.isEmpty(a)?e("#txt-create-prompt").addClass("is-danger").next().removeClass("is-hidden"):(e("#txt-create-prompt").parent().addClass("is-loading"),window.location.assign("/create/"+a))}),""!==t&&e(".btn-move-prompt").removeClass("is-hidden");var n=_.lastIndexOf(t,"/")+1;e(".btn-move-prompt").on("click",function(a){e("#txt-move-prompt").val(t),e("#modal-move-prompt").toggleClass("is-active"),setInputSelection(e("#txt-move-prompt").get(0),n,t.length),e("#txt-move-prompt").removeClass("is-danger").next().addClass("is-hidden")}),e("#txt-move-prompt").on("keypress",function(t){13===t.which&&e(".btn-move-go").trigger("click")}),e(".btn-move-go").on("click",function(o){var n=makeSafePath(e("#txt-move-prompt").val());_.isEmpty(n)||n===t||"home"===n?e("#txt-move-prompt").addClass("is-danger").next().removeClass("is-hidden"):(e("#txt-move-prompt").parent().addClass("is-loading"),e.ajax(window.location.href,{data:{move:n},dataType:"json",method:"PUT"}).then(function(e,t,o){e.ok?window.location.assign("/"+n):a.pushError("Something went wrong",e.error)},function(e,t,o){a.pushError("Something went wrong","Save operation failed.")}))})}(),e("#page-type-create").length){var i;!function(){var n=e("#page-type-create").data("entrypath");e(".btn-create-discard").on("click",function(t){e("#modal-create-discard").toggleClass("is-active")}),1===e("#mk-editor").length&&!function(){var r=!1;Vue.filter("filesize",function(e){return _.toUpper(filesize(e))});var l=new Vue({el:"#modal-editor-image",data:{isLoading:!1,isLoadingText:"",newFolderName:"",newFolderShow:!1,newFolderError:!1,fetchFromUrlURL:"",fetchFromUrlShow:!1,folders:[],currentFolder:"",currentImage:"",currentAlign:"left",images:[],uploadSucceeded:!1,postUploadChecks:0,renameImageShow:!1,renameImageId:"",renameImageFilename:"",deleteImageShow:!1,deleteImageId:"",deleteImageFilename:""},methods:{open:function(){r=!0,e("#modal-editor-image").slideDown(),l.refreshFolders()},cancel:function(t){r=!1,e("#modal-editor-image").slideUp()},selectImage:function(e){l.currentImage=e},selectAlignment:function(e){l.currentAlign=e},insertImage:function(e){i.codemirror.doc.somethingSelected()&&i.codemirror.execCommand("singleSelection");var t=_.find(l.images,["_id",l.currentImage]);t.normalizedPath="f:"===t.folder?t.filename:t.folder.slice(2)+"/"+t.filename,t.titleGuess=_.startCase(t.basename);var a="!["+t.titleGuess+"](/uploads/"+t.normalizedPath+' "'+t.titleGuess+'")';switch(l.currentAlign){case"center":a+="{.align-center}";break;case"right":a+="{.align-right}";break;case"logo":a+="{.pagelogo}"}i.codemirror.doc.replaceSelection(a),l.cancel()},newFolder:function(t){l.newFolderName="",l.newFolderError=!1,l.newFolderShow=!0,_.delay(function(){e("#txt-editor-newfoldername").focus()},400)},newFolderDiscard:function(e){l.newFolderShow=!1},newFolderCreate:function(e){var t=new RegExp("^[a-z0-9][a-z0-9-]*[a-z0-9]$");return l.newFolderName=_.kebabCase(_.trim(l.newFolderName)),_.isEmpty(l.newFolderName)||!t.test(l.newFolderName)?void(l.newFolderError=!0):(l.newFolderDiscard(),l.isLoadingText="Creating new folder...",l.isLoading=!0,void Vue.nextTick(function(){o.emit("uploadsCreateFolder",{foldername:l.newFolderName},function(e){l.folders=e,l.currentFolder=l.newFolderName,l.images=[],l.isLoading=!1})}))},fetchFromUrl:function(t){l.fetchFromUrlURL="",l.fetchFromUrlShow=!0,_.delay(function(){e("#txt-editor-fetchimgurl").focus()},400)},fetchFromUrlDiscard:function(e){l.fetchFromUrlShow=!1},fetchFromUrlGo:function(e){l.fetchFromUrlDiscard(),l.isLoadingText="Fetching image...",l.isLoading=!0,Vue.nextTick(function(){o.emit("uploadsFetchFileFromURL",{folder:l.currentFolder,fetchUrl:l.fetchFromUrlURL},function(e){e.ok?l.waitChangeComplete(l.images.length,!0):(l.isLoading=!1,a.pushError("Upload error",e.msg))})})},renameImage:function(){var t=_.find(l.images,["_id",l.renameImageId]);l.renameImageFilename=t.basename||"",l.renameImageShow=!0,_.delay(function(){e("#txt-editor-renameimage").focus(),_.defer(function(){e("#txt-editor-renameimage").select()})},400)},renameImageDiscard:function(){l.renameImageShow=!1},renameImageGo:function(){l.renameImageDiscard(),l.isLoadingText="Renaming image...",l.isLoading=!0,Vue.nextTick(function(){o.emit("uploadsRenameFile",{uid:l.renameImageId,folder:l.currentFolder,filename:l.renameImageFilename},function(e){e.ok?l.waitChangeComplete(l.images.length,!1):(l.isLoading=!1,a.pushError("Rename error",e.msg))})})},moveImage:function(e,t){l.isLoadingText="Moving image...",l.isLoading=!0,Vue.nextTick(function(){o.emit("uploadsMoveFile",{uid:e,folder:t},function(e){e.ok?l.loadImages():(l.isLoading=!1,a.pushError("Rename error",e.msg))})})},deleteImageWarn:function(e){if(e){var t=_.find(l.images,["_id",l.deleteImageId]);l.deleteImageFilename=t.filename||"this image"}l.deleteImageShow=e},deleteImageGo:function(){l.deleteImageWarn(!1),l.isLoadingText="Deleting image...",l.isLoading=!0,Vue.nextTick(function(){o.emit("uploadsDeleteFile",{uid:l.deleteImageId},function(e){l.loadImages()})})},selectFolder:function(e){l.currentFolder=e,l.loadImages()},refreshFolders:function(){l.isLoadingText="Fetching folders list...",l.isLoading=!0,l.currentFolder="",l.currentImage="",Vue.nextTick(function(){o.emit("uploadsGetFolders",{},function(e){l.folders=e,l.loadImages()})})},loadImages:function(e){return e||(l.isLoadingText="Fetching images...",l.isLoading=!0),new Promise(function(t,a){Vue.nextTick(function(){o.emit("uploadsGetImages",{folder:l.currentFolder},function(a){l.images=a,e||(l.isLoading=!1),l.attachContextMenus(),t(!0)})})})},waitChangeComplete:function(e,t){t=!_.isBoolean(t)||t,l.postUploadChecks++,l.isLoadingText="Processing...",Vue.nextTick(function(){l.loadImages(!0).then(function(){l.images.length!==e===t?(l.postUploadChecks=0,l.isLoading=!1):l.postUploadChecks>5?(l.postUploadChecks=0,l.isLoading=!1,a.pushError("Unable to fetch updated listing","Try again later")):_.delay(function(){l.waitChangeComplete(e,t)},1500)})})},attachContextMenus:function(){var t=_.map(l.folders,function(t){return{name:""!==t?t:"/ (root)",icon:"fa-folder",callback:function(t,a){var o=_.toString(e(a.$trigger).data("uid")),n=_.nth(l.folders,t);l.moveImage(o,n)}}});e.contextMenu("destroy",".editor-modal-imagechoices > figure"),e.contextMenu({selector:".editor-modal-imagechoices > figure",appendTo:".editor-modal-imagechoices",position:function(t,a,o){e(t.$trigger).addClass("is-contextopen");var n=e(t.$trigger).position(),i={w:e(t.$trigger).width()/2,h:e(t.$trigger).height()/2};t.$menu.css({top:n.top+i.h,left:n.left+i.w})},events:{hide:function(t){e(t.$trigger).removeClass("is-contextopen")}},items:{rename:{name:"Rename",icon:"fa-edit",callback:function(e,t){l.renameImageId=_.toString(t.$trigger[0].dataset.uid),l.renameImage()}},move:{name:"Move to...",icon:"fa-folder-open-o",items:t},delete:{name:"Delete",icon:"fa-trash",callback:function(e,t){l.deleteImageId=_.toString(t.$trigger[0].dataset.uid),l.deleteImageWarn(!0)}}}})}}});e("#btn-editor-uploadimage input").on("change",function(o){var n=l.images.length;e(o.currentTarget).simpleUpload("/uploads/img",{name:"imgfile",data:{folder:l.currentFolder},limit:20,expect:"json",allowedExts:["jpg","jpeg","gif","png","webp"],allowedTypes:["image/png","image/jpeg","image/gif","image/webp"],maxFileSize:3145728,init:function(e){l.uploadSucceeded=!1,l.isLoadingText="Preparing to upload...",l.isLoading=!0},progress:function(e){l.isLoadingText="Uploading..."+Math.round(e)+"%"},success:function(e){if(e.ok){var t=_.filter(e.results,["ok",!1]);t.length?(_.forEach(t,function(e){a.pushError("Upload error",e.msg)}),t.length<e.results.length&&(a.push({title:"Some uploads succeeded",message:"Files that are not mentionned in the errors above were uploaded successfully."}),l.uploadSucceeded=!0)):l.uploadSucceeded=!0}else a.pushError("Upload error",e.msg)},error:function(e){a.pushError(e.message,t.upload.file.name)},finish:function(){l.uploadSucceeded?l.waitChangeComplete(n,!0):l.isLoading=!1}})});var c=ace.edit("codeblock-editor");c.setTheme("ace/theme/tomorrow_night"),c.getSession().setMode("ace/mode/markdown"),c.setOption("fontSize","14px"),c.setOption("hScrollBarAlwaysVisible",!1),c.setOption("wrap",!0);var s=ace.require("ace/ext/modelist"),d=[],m=function(t){return e.ajax({url:"/js/ace/mode-"+t+".js",dataType:"script",cache:!0,beforeSend:function(){if(_.includes(d,t))return!1},success:function(){d.push(t)}})},g=new Vue({el:"#modal-editor-codeblock",data:{modes:s.modesByName,modeSelected:"text"},watch:{modeSelected:function(e,t){m(e).done(function(){ace.require("ace/mode/"+e),c.getSession().setMode("ace/mode/"+e)})}},methods:{cancel:function(t){r=!1,e("#modal-editor-codeblock").slideUp()},insertCode:function(e){i.codemirror.doc.somethingSelected()&&i.codemirror.execCommand("singleSelection");var t="\n```"+g.modeSelected+"\n"+c.getValue()+"\n```\n";i.codemirror.doc.replaceSelection(t),g.cancel()}}});i=new SimpleMDE({autofocus:!0,autoDownloadFontAwesome:!1,element:e("#mk-editor").get(0),placeholder:"Enter Markdown formatted content here...",spellChecker:!1,status:!1,toolbar:[{name:"bold",action:SimpleMDE.toggleBold,className:"fa fa-bold",title:"Bold"},{name:"italic",action:SimpleMDE.toggleItalic,className:"fa fa-italic",title:"Italic"},{name:"strikethrough",action:SimpleMDE.toggleStrikethrough,className:"fa fa-strikethrough",title:"Strikethrough"},"|",{name:"heading-1",action:SimpleMDE.toggleHeading1,className:"fa fa-header fa-header-x fa-header-1",title:"Big Heading"},{name:"heading-2",action:SimpleMDE.toggleHeading2,className:"fa fa-header fa-header-x fa-header-2",title:"Medium Heading"},{name:"heading-3",action:SimpleMDE.toggleHeading3,className:"fa fa-header fa-header-x fa-header-3",title:"Small Heading"},{name:"quote",action:SimpleMDE.toggleBlockquote,className:"fa fa-quote-left",title:"Quote"},"|",{name:"unordered-list",action:SimpleMDE.toggleUnorderedList,className:"fa fa-list-ul",title:"Bullet List"},{name:"ordered-list",action:SimpleMDE.toggleOrderedList,className:"fa fa-list-ol",title:"Numbered List"},"|",{name:"link",action:function(e){},className:"fa fa-link",title:"Insert Link"},{name:"image",action:function(e){r||l.open()},className:"fa fa-image",title:"Insert Image"},{name:"file",action:function(e){},className:"fa fa-file-text-o",title:"Insert File"},"|",{name:"inline-code",action:function(e){if(!e.codemirror.doc.somethingSelected())return a.pushError("Invalid selection","You must select at least 1 character first.");var t=e.codemirror.doc.getSelections();t=_.map(t,function(e){return"`"+e+"`"}),e.codemirror.doc.replaceSelections(t)},className:"fa fa-terminal",title:"Inline Code"},{name:"code-block",action:function(t){r||(r=!0,i.codemirror.doc.somethingSelected()?c.setValue(i.codemirror.doc.getSelection()):c.setValue(""),e("#modal-editor-codeblock").slideDown(400,function(){c.resize(),c.focus()}))},className:"fa fa-code",title:"Code Block"},"|",{name:"table",action:function(e){},className:"fa fa-table",title:"Insert Table"},{name:"horizontal-rule",action:SimpleMDE.drawHorizontalRule,className:"fa fa-minus",title:"Horizontal Rule"}],shortcuts:{toggleBlockquote:null,toggleFullScreen:null}}),e(".btn-edit-save, .btn-create-save").on("click",function(t){e.ajax(window.location.href,{data:{markdown:i.value()},dataType:"json",method:"PUT"}).then(function(e,t,o){e.ok?window.location.assign("/"+n):a.pushError("Something went wrong",e.error)},function(e,t,o){a.pushError("Something went wrong","Save operation failed.")})})}()}()}if(e("#page-type-edit").length){var i;!function(){var n=e("#page-type-edit").data("entrypath");e(".btn-edit-discard").on("click",function(t){e("#modal-edit-discard").toggleClass("is-active")}),1===e("#mk-editor").length&&!function(){var r=!1;Vue.filter("filesize",function(e){return _.toUpper(filesize(e))});var l=new Vue({el:"#modal-editor-image",data:{isLoading:!1,isLoadingText:"",newFolderName:"",newFolderShow:!1,newFolderError:!1,fetchFromUrlURL:"",fetchFromUrlShow:!1,folders:[],currentFolder:"",currentImage:"",currentAlign:"left",images:[],uploadSucceeded:!1,postUploadChecks:0,renameImageShow:!1,renameImageId:"",renameImageFilename:"",deleteImageShow:!1,deleteImageId:"",deleteImageFilename:""},methods:{open:function(){r=!0,e("#modal-editor-image").slideDown(),l.refreshFolders()},cancel:function(t){r=!1,e("#modal-editor-image").slideUp()},selectImage:function(e){l.currentImage=e},selectAlignment:function(e){l.currentAlign=e},insertImage:function(e){i.codemirror.doc.somethingSelected()&&i.codemirror.execCommand("singleSelection");var t=_.find(l.images,["_id",l.currentImage]);t.normalizedPath="f:"===t.folder?t.filename:t.folder.slice(2)+"/"+t.filename,t.titleGuess=_.startCase(t.basename);var a="!["+t.titleGuess+"](/uploads/"+t.normalizedPath+' "'+t.titleGuess+'")';switch(l.currentAlign){case"center":a+="{.align-center}";break;case"right":a+="{.align-right}";break;case"logo":a+="{.pagelogo}"}i.codemirror.doc.replaceSelection(a),l.cancel()},newFolder:function(t){l.newFolderName="",l.newFolderError=!1,l.newFolderShow=!0,_.delay(function(){e("#txt-editor-newfoldername").focus()},400)},newFolderDiscard:function(e){l.newFolderShow=!1},newFolderCreate:function(e){var t=new RegExp("^[a-z0-9][a-z0-9-]*[a-z0-9]$");return l.newFolderName=_.kebabCase(_.trim(l.newFolderName)),_.isEmpty(l.newFolderName)||!t.test(l.newFolderName)?void(l.newFolderError=!0):(l.newFolderDiscard(),l.isLoadingText="Creating new folder...",l.isLoading=!0,void Vue.nextTick(function(){o.emit("uploadsCreateFolder",{foldername:l.newFolderName},function(e){l.folders=e,l.currentFolder=l.newFolderName,l.images=[],l.isLoading=!1})}))},fetchFromUrl:function(t){l.fetchFromUrlURL="",l.fetchFromUrlShow=!0,_.delay(function(){e("#txt-editor-fetchimgurl").focus()},400)},fetchFromUrlDiscard:function(e){l.fetchFromUrlShow=!1},fetchFromUrlGo:function(e){l.fetchFromUrlDiscard(),l.isLoadingText="Fetching image...",l.isLoading=!0,Vue.nextTick(function(){o.emit("uploadsFetchFileFromURL",{folder:l.currentFolder,fetchUrl:l.fetchFromUrlURL},function(e){e.ok?l.waitChangeComplete(l.images.length,!0):(l.isLoading=!1,a.pushError("Upload error",e.msg))})})},renameImage:function(){var t=_.find(l.images,["_id",l.renameImageId]);l.renameImageFilename=t.basename||"",l.renameImageShow=!0,_.delay(function(){e("#txt-editor-renameimage").focus(),_.defer(function(){e("#txt-editor-renameimage").select()})},400)},renameImageDiscard:function(){l.renameImageShow=!1},renameImageGo:function(){l.renameImageDiscard(),l.isLoadingText="Renaming image...",l.isLoading=!0,Vue.nextTick(function(){o.emit("uploadsRenameFile",{uid:l.renameImageId,folder:l.currentFolder,filename:l.renameImageFilename},function(e){e.ok?l.waitChangeComplete(l.images.length,!1):(l.isLoading=!1,a.pushError("Rename error",e.msg))})})},moveImage:function(e,t){l.isLoadingText="Moving image...",l.isLoading=!0,Vue.nextTick(function(){o.emit("uploadsMoveFile",{uid:e,folder:t},function(e){e.ok?l.loadImages():(l.isLoading=!1,a.pushError("Rename error",e.msg))})})},deleteImageWarn:function(e){if(e){var t=_.find(l.images,["_id",l.deleteImageId]);l.deleteImageFilename=t.filename||"this image"}l.deleteImageShow=e},deleteImageGo:function(){l.deleteImageWarn(!1),l.isLoadingText="Deleting image...",l.isLoading=!0,Vue.nextTick(function(){o.emit("uploadsDeleteFile",{uid:l.deleteImageId},function(e){l.loadImages()})})},selectFolder:function(e){l.currentFolder=e,l.loadImages()},refreshFolders:function(){l.isLoadingText="Fetching folders list...",l.isLoading=!0,l.currentFolder="",l.currentImage="",Vue.nextTick(function(){o.emit("uploadsGetFolders",{},function(e){l.folders=e,l.loadImages()})})},loadImages:function(e){return e||(l.isLoadingText="Fetching images...",l.isLoading=!0),new Promise(function(t,a){Vue.nextTick(function(){o.emit("uploadsGetImages",{folder:l.currentFolder},function(a){l.images=a,e||(l.isLoading=!1),l.attachContextMenus(),t(!0)})})})},waitChangeComplete:function(e,t){t=!_.isBoolean(t)||t,l.postUploadChecks++,l.isLoadingText="Processing...",Vue.nextTick(function(){l.loadImages(!0).then(function(){l.images.length!==e===t?(l.postUploadChecks=0,l.isLoading=!1):l.postUploadChecks>5?(l.postUploadChecks=0,l.isLoading=!1,a.pushError("Unable to fetch updated listing","Try again later")):_.delay(function(){l.waitChangeComplete(e,t)},1500)})})},attachContextMenus:function(){var t=_.map(l.folders,function(t){return{name:""!==t?t:"/ (root)",icon:"fa-folder",callback:function(t,a){var o=_.toString(e(a.$trigger).data("uid")),n=_.nth(l.folders,t);l.moveImage(o,n)}}});e.contextMenu("destroy",".editor-modal-imagechoices > figure"),e.contextMenu({selector:".editor-modal-imagechoices > figure",appendTo:".editor-modal-imagechoices",position:function(t,a,o){e(t.$trigger).addClass("is-contextopen");var n=e(t.$trigger).position(),i={w:e(t.$trigger).width()/2,h:e(t.$trigger).height()/2};t.$menu.css({top:n.top+i.h,left:n.left+i.w})},events:{hide:function(t){e(t.$trigger).removeClass("is-contextopen")}},items:{rename:{name:"Rename",icon:"fa-edit",callback:function(e,t){l.renameImageId=_.toString(t.$trigger[0].dataset.uid),l.renameImage()}},move:{name:"Move to...",icon:"fa-folder-open-o",items:t},delete:{name:"Delete",icon:"fa-trash",callback:function(e,t){l.deleteImageId=_.toString(t.$trigger[0].dataset.uid),l.deleteImageWarn(!0)}}}})}}});e("#btn-editor-uploadimage input").on("change",function(o){var n=l.images.length;e(o.currentTarget).simpleUpload("/uploads/img",{name:"imgfile",data:{folder:l.currentFolder},limit:20,expect:"json",allowedExts:["jpg","jpeg","gif","png","webp"],allowedTypes:["image/png","image/jpeg","image/gif","image/webp"],maxFileSize:3145728,init:function(e){l.uploadSucceeded=!1,l.isLoadingText="Preparing to upload...",l.isLoading=!0},progress:function(e){l.isLoadingText="Uploading..."+Math.round(e)+"%"},success:function(e){if(e.ok){var t=_.filter(e.results,["ok",!1]);t.length?(_.forEach(t,function(e){a.pushError("Upload error",e.msg)}),t.length<e.results.length&&(a.push({title:"Some uploads succeeded",message:"Files that are not mentionned in the errors above were uploaded successfully."}),l.uploadSucceeded=!0)):l.uploadSucceeded=!0}else a.pushError("Upload error",e.msg)},error:function(e){a.pushError(e.message,t.upload.file.name)},finish:function(){l.uploadSucceeded?l.waitChangeComplete(n,!0):l.isLoading=!1}})});var c=ace.edit("codeblock-editor");c.setTheme("ace/theme/tomorrow_night"),c.getSession().setMode("ace/mode/markdown"),c.setOption("fontSize","14px"),c.setOption("hScrollBarAlwaysVisible",!1),c.setOption("wrap",!0);var s=ace.require("ace/ext/modelist"),d=[],m=function(t){return e.ajax({url:"/js/ace/mode-"+t+".js",dataType:"script",cache:!0,beforeSend:function(){if(_.includes(d,t))return!1},success:function(){d.push(t)}})},g=new Vue({el:"#modal-editor-codeblock",data:{modes:s.modesByName,modeSelected:"text"},watch:{modeSelected:function(e,t){m(e).done(function(){ace.require("ace/mode/"+e),c.getSession().setMode("ace/mode/"+e)})}},methods:{cancel:function(t){r=!1,e("#modal-editor-codeblock").slideUp()},insertCode:function(e){i.codemirror.doc.somethingSelected()&&i.codemirror.execCommand("singleSelection");var t="\n```"+g.modeSelected+"\n"+c.getValue()+"\n```\n";i.codemirror.doc.replaceSelection(t),g.cancel()}}});i=new SimpleMDE({autofocus:!0,autoDownloadFontAwesome:!1,element:e("#mk-editor").get(0),placeholder:"Enter Markdown formatted content here...",spellChecker:!1,status:!1,toolbar:[{name:"bold",action:SimpleMDE.toggleBold,className:"fa fa-bold",title:"Bold"},{name:"italic",action:SimpleMDE.toggleItalic,className:"fa fa-italic",title:"Italic"},{name:"strikethrough",action:SimpleMDE.toggleStrikethrough,className:"fa fa-strikethrough",title:"Strikethrough"},"|",{name:"heading-1",action:SimpleMDE.toggleHeading1,className:"fa fa-header fa-header-x fa-header-1",title:"Big Heading"},{name:"heading-2",action:SimpleMDE.toggleHeading2,className:"fa fa-header fa-header-x fa-header-2",title:"Medium Heading"},{name:"heading-3",action:SimpleMDE.toggleHeading3,className:"fa fa-header fa-header-x fa-header-3",title:"Small Heading"},{name:"quote",action:SimpleMDE.toggleBlockquote,className:"fa fa-quote-left",title:"Quote"},"|",{name:"unordered-list",action:SimpleMDE.toggleUnorderedList,className:"fa fa-list-ul",title:"Bullet List"},{name:"ordered-list",action:SimpleMDE.toggleOrderedList,className:"fa fa-list-ol",title:"Numbered List"},"|",{name:"link",action:function(e){},className:"fa fa-link",title:"Insert Link"},{name:"image",action:function(e){r||l.open()},className:"fa fa-image",title:"Insert Image"},{name:"file",action:function(e){},className:"fa fa-file-text-o",title:"Insert File"},"|",{name:"inline-code",action:function(e){if(!e.codemirror.doc.somethingSelected())return a.pushError("Invalid selection","You must select at least 1 character first.");var t=e.codemirror.doc.getSelections();t=_.map(t,function(e){return"`"+e+"`"}),e.codemirror.doc.replaceSelections(t)},className:"fa fa-terminal",title:"Inline Code"},{name:"code-block",action:function(t){r||(r=!0,i.codemirror.doc.somethingSelected()?c.setValue(i.codemirror.doc.getSelection()):c.setValue(""),e("#modal-editor-codeblock").slideDown(400,function(){c.resize(),c.focus()}))},className:"fa fa-code",title:"Code Block"},"|",{name:"table",action:function(e){},className:"fa fa-table",title:"Insert Table"},{name:"horizontal-rule",action:SimpleMDE.drawHorizontalRule,className:"fa fa-minus",title:"Horizontal Rule"}],shortcuts:{toggleBlockquote:null,toggleFullScreen:null}}),e(".btn-edit-save, .btn-create-save").on("click",function(t){e.ajax(window.location.href,{data:{markdown:i.value()},dataType:"json",method:"PUT"}).then(function(e,t,o){e.ok?window.location.assign("/"+n):a.pushError("Something went wrong",e.error)},function(e,t,o){a.pushError("Something went wrong","Save operation failed.")})})}()}()}if(e("#page-type-source").length){var r;!function(){r=ace.edit("source-display"),r.setTheme("ace/theme/tomorrow_night"),r.getSession().setMode("ace/mode/markdown"),r.setReadOnly(!0),r.renderer.updateFull();var t="home"!==e("#page-type-source").data("entrypath")?e("#page-type-source").data("entrypath"):"",o=t+"/new-page";e(".btn-create-prompt").on("click",function(a){e("#txt-create-prompt").val(o),e("#modal-create-prompt").toggleClass("is-active"),setInputSelection(e("#txt-create-prompt").get(0),t.length+1,o.length),e("#txt-create-prompt").removeClass("is-danger").next().addClass("is-hidden")}),e("#txt-create-prompt").on("keypress",function(t){13===t.which&&e(".btn-create-go").trigger("click")}),e(".btn-create-go").on("click",function(t){var a=makeSafePath(e("#txt-create-prompt").val());_.isEmpty(a)?e("#txt-create-prompt").addClass("is-danger").next().removeClass("is-hidden"):(e("#txt-create-prompt").parent().addClass("is-loading"),window.location.assign("/create/"+a))}),""!==t&&e(".btn-move-prompt").removeClass("is-hidden");var n=_.lastIndexOf(t,"/")+1;e(".btn-move-prompt").on("click",function(a){e("#txt-move-prompt").val(t),e("#modal-move-prompt").toggleClass("is-active"),setInputSelection(e("#txt-move-prompt").get(0),n,t.length),e("#txt-move-prompt").removeClass("is-danger").next().addClass("is-hidden")}),e("#txt-move-prompt").on("keypress",function(t){13===t.which&&e(".btn-move-go").trigger("click")}),e(".btn-move-go").on("click",function(o){var n=makeSafePath(e("#txt-move-prompt").val());_.isEmpty(n)||n===t||"home"===n?e("#txt-move-prompt").addClass("is-danger").next().removeClass("is-hidden"):(e("#txt-move-prompt").parent().addClass("is-loading"),e.ajax(window.location.href,{data:{move:n},dataType:"json",method:"PUT"}).then(function(e,t,o){e.ok?window.location.assign("/"+n):a.pushError("Something went wrong",e.error)},function(e,t,o){a.pushError("Something went wrong","Save operation failed.")}))})}()}});var Alerts=function(){function e(){_classCallCheck(this,e);var t=this;t.mdl=new Vue({el:"#alerts",data:{children:[]},methods:{acknowledge:function(e){t.close(e)}}}),t.uidNext=1}return _createClass(e,[{key:"push",value:function(e){var t=this,a=_.defaults(e,{_uid:t.uidNext,class:"is-info",message:"---",sticky:!1,title:"---"});t.mdl.children.push(a),a.sticky||_.delay(function(){t.close(a._uid)},5e3),t.uidNext++}},{key:"pushError",value:function(e,t){this.push({class:"is-danger",message:t,sticky:!1,title:e})}},{key:"pushSuccess",value:function(e,t){this.push({class:"is-success",message:t,sticky:!1,title:e})}},{key:"close",value:function(e){var t=this,a=_.findIndex(t.mdl.children,["_uid",e]),o=_.nth(t.mdl.children,a);a>=0&&o&&(o.class+=" exit",Vue.set(t.mdl.children,a,o),_.delay(function(){t.mdl.children.splice(a,1)},500))}}]),e}();