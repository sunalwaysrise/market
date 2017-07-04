/**
 * @author luwenbin@live.com
 * http://wenbin.lu
 * Date: 2014-11-19 10:00
 */

var WEB_APP='/Manage',
	WEB_RES='/Public/admin/',
	wx={},
	Div={
		loading:$("#loading"),
		content:$("#content")
	};
wx.util={
	throttle:function(fn, delay, mustRunDelay) {
		var timer = null;
		var t_start;
		return function() {
			var context = this, args = arguments, t_curr = +new Date();
			clearTimeout(timer);
			if (!t_start) {
				t_start = t_curr;
			}
			if (t_curr - t_start >= mustRunDelay) {
				fn.apply(context, args);
				t_start = t_curr;
			} else {
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			}
		}
	},
	getArgs:function(argName) {
		if (!argName) {return}
		var args = {}, query = location.search.substring(1), pairs = query.split("&");
		for (var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1)
				continue;
			var argname = pairs[i].substring(0, pos), value = pairs[i].substring(pos + 1);
			value = decodeURIComponent(value);
			if (argName == argname) {
				return value;
			}
		}
	},
	setPosition:function(_obj){
		var t = document.documentElement.scrollTop || document.body.scrollTop,
			viewHeight = $(window).height(), 
			viewWidth = $(window).width(), 
			_objHeight = _obj.height(), 
			_objWidth = _obj.width(),
			dialogTop = (viewHeight / 2) - (_objHeight / 2) + t,
			dialogLeft = (viewWidth / 2) - (_objWidth / 2);
		_obj.css({top : dialogTop,left : dialogLeft});
	},
	getContnet:function(m,a,id,p,s){
		var url=WEB_APP+"/"+m+"/"+a;
		if(id){url+='/id/'+id;}
		if(p){url+='/p/'+p;}
		if(s){url+=s;}
		$.ajax({
			url:url,
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				if(typeof data =="object"){
					wx.dialog.alert('alert2',data.info);
				}else{
					Div.content.html(data);
					Div.loading.hide();
				}
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	getFrame:function(m,a,id,t,i){
		var url=WEB_APP+"/"+m+"/"+a,html=[];
		if(t){
			html.push('<h2><span>'+t+'</span>');
			if(i){
				html.push('<a onclick="wx.util.getContnet(\''+m+'\',\''+i+'\')">返回列表</a>');
			}
			html.push('</h2>');
		}
		html.push('<iframe id="frame" src="'+url+'/id/'+id+'" width="100%" height="100%" scrolling="yes" frameborder="0"></iframe>');
		Div.content.html(html.join(''));
		Div.loading.hide();
	},
	getFrame2:function(m,a,id,t,f){
		var url=WEB_APP+"/"+m+"/"+a,html=[];
		if(t){
			html.push('<h2><span>'+t+'</span>');
			if(f){
				html.push('<a onclick="'+f+'">返回列表</a>');
			}
			html.push('</h2>');
		}
		html.push('<iframe id="frame" src="'+url+'/id/'+id+'" width="100%" height="100%" scrolling="yes" frameborder="0"></iframe>');
		Div.content.html(html.join(''));
		Div.loading.hide();
	},
	page:function(f,c,t,category){
		var h=[],i,len,tmp=[];
		if(t>9){
			h.push('<b>当前'+(c+1)+'页，一共'+t+'页</b><a onclick="'+f+'(0,'+category+')">第一页</a>');
			if(c<9){
				i=0;
				for(i;i<10;i++){
					if(i==c){
						h.push('<span>'+(c+1)+'</span>');
					}else{
						h.push('<a onclick="'+f+'('+i+','+category+')">'+(i+1)+'</a>');
					}
				}
				h.push('<b>...</b>');
			}else if((t-c)<9){
				i=t-9;
				h.push('<b>...</b>');
				for(i;i<t;i++){
					if(i==c){
						h.push('<span>'+(c+1)+'</span>');
					}else{
						h.push('<a onclick="'+f+'('+i+','+category+')">'+(i+1)+'</a>');
					}
				}
			}else{
				h.push('<b>...</b>');
				i=c-5;
				len=i+9;
				for(i;i<len;i++){
					if(i==c){
						h.push('<span>'+(c+1)+'</span>');
					}else{
						h.push('<a onclick="'+f+'('+i+','+category+')">'+(i+1)+'</a>');
					}
				}
				h.push('<b>...</b>');
			}
			h.push('<a onclick="'+f+'('+(t-1)+','+category+')">最后一页</a>');
		}else{
			i=0;
			for(i;i<t;i++){
				if(i==c){
					h.push('<span>'+(c+1)+'</span>');
				}else{
					h.push('<a onclick="'+f+'('+i+','+category+')">'+(i+1)+'</a>');
				}
			}
		}
		$('#page').html(h.join(''));
	}
};
wx.dialog={
	locked : false,
	lock : function() {
		if (!this.locked) {
			return false;
		}
		if ($("#lDialogLock").length == 0) {
			$("body").append('<div id="lDialogLock"></div>');
		}
		var lockWidth = $(window).width(), lockHeight = $(document).height();
		$("#lDialogLock").css({"width" : lockWidth,"height" : lockHeight,"position" : "absolute","zIndex" : "999","top" : 0,"left" : 0}).show();
	},
	open : function(o, css) {
		if ($("#lDialogBox").length < 1) {
			$("body").append('<div id="lDialogBox" ></div>');
		}
		if (!css || typeof (css) != "object") {var css = {width : "90%",height : "150px"};}
		$("#lDialogBox").html(o).css({"position" : "absolute","zIndex" : "1000","width" : css.width,"height" : css.height}).show();
		wx.util.setPosition($("#lDialogBox"));
		this.locked = true;
		this.lock();
		$(window).resize(function() {
			wx.util.throttle(wx.dialog.lock(), 50, 100);
			wx.util.throttle(wx.util.setPosition($("#lDialogBox")), 50, 100);
		});
	},
	close : function() {
		$("#lDialogBox").html("");
		$("#lDialogBox,#lDialogLock").hide();
		this.locked = false;
	},
	alert : function(className, text) {
		wx.util.setPosition($("#tip"));
		$("#tip").addClass(className).html(text);
		this.show();
	},
	show : function() {
		$("#tip").show().delay(2000).fadeOut(function() {
			$("#tip").attr({"class" : ""});
		});
	}
};
$.extend($.browser,{
  screen : function(){
    var s = $.browser.msie ?
      {w:document.documentElement.clientWidth,h:document.documentElement.clientHeight} : ($.browser.opera ?
      {w:Math.min(window.innerWidth, document.body.clientWidth),h:Math.min(window.innerHeight, document.body.clientHeight)} :
      {w:Math.min(window.innerWidth, document.documentElement.clientWidth),h:Math.min(window.innerHeight, document.documentElement.clientHeight)});
    s.left = document.documentElement.scrollLeft || document.body.scrollLeft;
    s.top = document.documentElement.scrollTop || document.body.scrollTop;
    s.sw = document.documentElement.scrollWidth || document.body.scrollWidth;
    s.sh = document.documentElement.scrollHeight || document.body.scrollHeight;
    return s;
  }
});
Array.prototype.inArray=function(o){
  var i=0,len=this.length,tf=false;
  for(i;i<len;i++){
    if(this[i]==o){
      tf = true;
      break;
    }
  }
  return tf;
}
$("#aside a").click(function(){
	$(this).siblings("a").removeClass("on").end().addClass("on");
});
$("#signOut").click(function(){
	$.get(WEB_APP+"/Index/signOut",function(){
		location.href=WEB_APP+"/Login/index";
	});
});
$('body').on('click','#order_con',function(){
	$('#order_conc').toggle();
});
$('body').on('click','#order_conc p',function(){
	$('#order_conc').toggle();
	$('#order_con').html($(this).html());
}).on("click",".datepicker",function(){
	datepicker.init($(this));
}).on("click","#closeDateBox",function(){
	$('#dateBox').hide();
});
$(".input1").live("focus",function(){$(this).addClass("on");}).live("blur",function(){$(this).removeClass("on");});
$(".require").live("blur",function(){
	if($(this).val()){
		$(this).removeClass("error");$(this).parent().next().html("√");
	}else{
		$(this).addClass("error");$(this).parent().next().html("该字段不能为空");
	}
});
$("#closeDialog").live("click",function(){wx.dialog.close();});
wx.My={
	save:function(){
		var data={
			password1:$.trim($("#pass").val()),
			password2:$.trim($("#pass2").val()),
			password:""
		};
		if(data.password1){
			if(data.password1 != data.password2){
				return wx.dialog.alert("alert2","两次密码不一致");
			}else{
				data.password=data.password1;
			}
		}
		$.ajax({
			url:WEB_APP+"/My/save",
			type :"post",
			data:data,
			beforeSend:function(){
				Div.loading.show();
			},
			success:function(data){
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
				}else{
					wx.dialog.alert("alert2",data.info);
				}
				Div.loading.hide();
			},
			error:function(){
				Div.loading.hide();
			}
		});
	},
	add:function(){
		wx.util.getContnet('My','detail','0');
	},
	edit:function(id){
		wx.util.getContnet('My','detail',id);
	},
	saved:function(){
		var d={
			id:$.trim($("#id").val()),
			username:$.trim($("#username").val()),
			password:$.trim($("#password").val()),
			status:$.trim($("#status").val())
		};
		if (!d.username ){
			return alert('必填信息不能为空');
		}
		$.ajax({
			url:WEB_APP+'/My/saved',
			beforeSend:function(){Div.loading.show();},
			data:d,
			type:"post",
			success:function(data){
				Div.loading.hide();
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			},
			error:function(){Div.loading.hide();}
		});
	},
	delete:function(o,id){
		if(confirm('确认删除?')){
			$.ajax({
				url:WEB_APP+'/My/deleted',
				beforeSend:function(){Div.loading.show();},
				data:{id:id},
				success:function(data){
					Div.loading.hide();
					if(data.status==1){
						wx.dialog.alert("alert1",data.info);
						$(o).parent().remove();
					}else{
						wx.dialog.alert("alert2",data.info);
					}
				},
				error:function(){Div.loading.hide();}
			});
		}
	},
	tag:function(o,k){
		var t=$("#rbac").val().split(','),h=[];
		if(t.indexOf(String(k))!=-1){
			$(o).removeClass('cur');
		}else{
			$(o).addClass('cur');
		}
		$("#showTag b.cur").each(function(i,v){
			h.push($(v).attr('data'));
		});
		$("#rbac").val(h.join(','));
	}
};

wx.Product={
	index:function(p){
		wx.util.getContnet('Product','index',null,p);
	},
	addDetail:function(){
		wx.util.getFrame("Product","detail",0,'产品',"index");
	},
	edit:function(id){
		if(!id){return false;}
		wx.util.getFrame("Product","detail",id,'产品',"index");
	},
	check:function(){
		var d={
			title:$("#title").val(),
			price:$("#price").val(),
			count:$("#count").val()
		};
		if(!d.title || !d.price ){
			alert('必填信息不能为空');
			return false;
		};
		if(isNaN(d.price)){
			alert('价格类型不符合');
			return false;
		}
		if(d.custom){
			if(isNaN(d.customprice)){
				alert('数量格式不对');
				return false;
			}
		}
    editor1.sync();
		$("#saveData").submit();
	},
	delDetail:function(that){
    if(confirm("确认删除？")){
			var o=$(that),pid=o.attr("data_pid");
			$.post(WEB_APP+"/Product/delDetail",{pid:pid},function(data){
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
					o.parent().hide();
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			});
    }
	},
	getTags2:function(v){
		$("#tags").val(v);
	},
	getTags:function(){
		$.ajax({
			url:WEB_APP+'/Product/tag',
			success:function(data){
				if(data){
					var i=0,html=[],d=$("#tags").val().split(','),c;
					for(i;i<data.length;i++){
						if(d.indexOf(data[i].tid)!=-1){
							c='class="cur"';
						}else{
							c='';
						}
						html.push('<b data="'+data[i].tid+'" '+c+' onclick="wx.Product.tag(this,'+data[i].tid+')">'+data[i].name+'</b>');
					}
					$("#showTag").html(html.join(''));
				}
			},error:function(){

			}
		});
	},
	tag:function(o,k){
		var t=$("#tags").val().split(','),h=[];
		if(t.indexOf(String(k))!=-1){
			$(o).removeClass('cur');
		}else{
			$(o).addClass('cur');
		}
		$("#showTag b.cur").each(function(i,v){
			h.push($(v).attr('data'));
		});
		$("#tags").val(h.join(','));
	},
	page:function(c,t){
		wx.util.page('wx.Product.index',c,t);
	}
};

wx.web={
	addCategory:function(category){
		var html=[];
		html.push('<div class="dialogTitle"><span>添加分类</span><a id="closeDialog">X</a></div>');
		html.push('<div class="line"><label>分类名称</label><input id="category" type="text" class="input1"/></div>');
		html.push('<div class="line line0"><a class="btn1" onclick="wx.web.insertCategory('+category+')">添加</a></div>');
		var css={width:"300px",height:"150px"}
		wx.dialog.locked=true;
		wx.dialog.lock();
		wx.dialog.open(html.join(''),css);
	},
	insertCategory:function(category){
		var name=$.trim($("#category").val());
		if(!name){return false;}
		$.post(WEB_APP+"/Article/addcategory",{category:category,name:name},function(data){
			if(data.status==1){
				wx.dialog.close();
				wx.util.getContnet("Article","category");
			}else{
				wx.dialog.close();
				wx.dialog.alert("alert2",data.msg);
			}
		});
	},
	detailCategory:function(id){
		wx.util.getFrame("Article","detailcategory",id,"栏目设置","category");
	},
	delCategory:function(e,id){
		if(!confirm("确定删除该栏目？")){return false;}
		$.post(WEB_APP+"/Article/delcategory",{id:id},function(data){
			if(data.status==1){
				wx.dialog.alert("alert1",data.msg);
				$(e).parent().hide();
			}else{
				wx.dialog.alert("alert2",data.msg);
			}
		});
	},
	category:0,
	index:function(category,p){
		this.category=category;
		wx.util.getContnet('Article','index',category,p);
	},
	page:function(c,t){
		var category=this.category;
		wx.util.page('wx.web.index',c,t,category);
	},
	add:function(id,name){
		wx.util.getFrame2("Article","adddetail",id,name,"wx.web.index("+id+",0)");
	},
	edit:function(id){
		if(!id){return false;}
		var cid=this.category;
		wx.util.getFrame2("Article","detail",id,"文章","wx.web.index("+cid+",0)");
	},
	del:function(that,id){
		if(confirm('确认删除?')){
			var o=$(that);
			$.post(WEB_APP+"/Article/delDetail",{id:id},function(data){
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
					o.parent().hide();
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			});
		}
	}
};

wx.exam={
	issue:{
		index:function(p){
			if(!p){var p=0;}
			wx.util.getContnet('Exam','issue',null,p);
		},
		add:function(){
			var html=[];
			html.push('<div class="dialogTitle"><span>添加考试</span><a id="closeDialog">X</a></div>');
			html.push('<div class="line"><label>考试名称</label><input id="text_issue_add" type="text" class="input1"/></div>');
			html.push('<div class="line line0"><a class="btn1" onclick="wx.exam.issue.insert()">添加</a></div>');
			var css={width:"300px",height:"150px"}
			wx.dialog.locked=true;
			wx.dialog.lock();
			wx.dialog.open(html.join(''),css);
		},
		insert:function(){
			var d={
				name:$.trim($("#text_issue_add").val()),
				status:1
			}
			if(!d.name){
				return wx.dialog.alert("alert2","标题不能为空");
			}
			$.ajax({
				url:WEB_APP+"/Exam/issueSave",
				data:d,
				beforeSend:function(){Div.loading.show();},
				success:function(data){
					Div.loading.hide();
					wx.dialog.close();
					wx.dialog.alert("alert1",data.info);
					wx.exam.issue.index();
				},
				error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
			});
		},
		edit:function(o,id){
			var d={
				id:id,
				name:$.trim($(o).prev().children().val())
			};
			if(!d.name){
				return wx.dialog.alert("alert2","标题不能为空");
			}
			$.ajax({
				url:WEB_APP+"/Exam/issueSave",
				data:d,
				beforeSend:function(){Div.loading.show();},
				success:function(data){
					Div.loading.hide();
					wx.dialog.alert("alert1",data.info);
				},
				error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
			});
		},
		delete:function(o,id){
			if(confirm('确认删除么，该操作会删除该场考试下的所有题目')){
				var d={id:id};
				$.ajax({
					url:WEB_APP+"/Exam/issueDel",
					data:d,
					beforeSend:function(){Div.loading.show();},
					success:function(data){
						Div.loading.hide();
						$(o).parent().hide();
						wx.dialog.alert("alert1",data.msg);
					},
					error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
				});
			}
		},
		page:function(c,t){
			wx.util.page('wx.exam.issue.index',c,t);
		}
	},
	library:{
		index:function(p){
			if(!p){var p=0;}
			wx.util.getContnet('Exam','index',null,p);
		},
		library:function(id){
			wx.util.getContnet('Exam','library',id);
		},
		add:function(id){
			wx.util.getContnet('Exam','libraryAdd',id);
		},
		detail:function(id){
			wx.util.getContnet('Exam','libraryDetail',id);
		},
		save:function(){
			var d={
				id:$.trim($("#id").val()),
				iid:$.trim($("#iid").val()),
				question:$.trim($("#question").val()),
				options:$.trim($("#options").val()),
				answer:$.trim($("#answer").val())
			}
			if( !d.question || !d.options || !d.answer ){
				return wx.dialog.alert("alert2","信息填写不完整");
			}
			$.ajax({
				url:WEB_APP+"/Exam/librarySave",
				data:d,
				beforeSend:function(){Div.loading.show();},
				success:function(data){
					Div.loading.hide();
					wx.dialog.close();
					wx.dialog.alert("alert1",data.info);
					wx.exam.library.library(d.iid);
				},
				error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
			});
		},
		delete:function(o,id){
			if(confirm('确认删除么')){
				var d={id:id};
				$.ajax({
					url:WEB_APP+"/Exam/libraryDel",
					data:d,
					beforeSend:function(){Div.loading.show();},
					success:function(data){
						Div.loading.hide();
						$(o).parent().hide();
						wx.dialog.alert("alert1",data.msg);
					},
					error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
				});
			}
		},
		page:function(c,t){
			wx.util.page('wx.exam.library.index',c,t);
		}
	}
};

wx.Points={
	index:function(p){
		wx.util.getContnet('Points','index',null,p);
	},
	order:function(p){
		wx.util.getContnet('Points','order',null,p);
	},
	addDetail:function(){
		wx.util.getFrame("Points","detail",0,'产品',"index");
	},
	edit:function(id){
		if(!id){return false;}
		wx.util.getFrame("Points","detail",id,'产品',"index");
	},
	delDetail:function(that){
    if(confirm("确认删除？")){
			var o=$(that),pid=o.attr("data_pid");
			$.post(WEB_APP+"/Points/delDetail",{pid:pid},function(data){
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
					o.parent().hide();
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			});
    }
	},
	delDetail2:function(that){
    if(confirm("确认删除？")){
			var o=$(that),pid=o.attr("data_pid");
			$.post(WEB_APP+"/Points/delDetail2",{pid:pid},function(data){
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
					o.parent().parent().hide();
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			});
    }
	},
	set:function(i,that){
		if(confirm("确认操作?")){
			var o=$(that),pid=o.attr("data_pid");
			$.post(WEB_APP+"/Points/change",{pid:pid,status:i},function(data){
				if(data.status==1){
					var k;
					if(i==2){
						k='已发货';
					}else if(i==4){
						k='已完成';
					}else if(i==5){
						k='已取消';
					}
					$('#list_points_'+pid).html(k);
					wx.dialog.alert("alert1",data.info);
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			});
		}
	},
	page:function(c,t){
		wx.util.page('wx.Points.index',c,t);
	},
	page2:function(c,t){
		wx.util.page('wx.Points.order',c,t);
	}
};
