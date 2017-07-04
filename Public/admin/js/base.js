/**
 * @author luwenbin@live.com
 * http://wenbin.lu
 * Date: 2014-11-19 10:00
 */
var MAP={
	shen:['北京市','天津市','河北省','山西省','内蒙古自治区','辽宁省','吉林省','黑龙江省','上海市','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','广西壮族自治区','海南省','重庆市','四川省','贵州省','云南省','西藏自治区','陕西省','甘肃省','青海省','宁夏回族自治区','新疆维吾尔自治区'],
	shi:{
	  "北京市":["西城区", "东城区", "崇文区", "宣武区", "朝阳区", "海淀区", "丰台区", "石景山区", "门头沟区", "房山区", "通州区", "顺义区", "大兴区", "昌平区", "平谷区", "怀柔区", "密云区", "延庆区"],
	  "天津市":["青羊区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "北辰区", "津南区", "武清区", "宝坻区", "静海区", "宁河县", "蓟县", "开发区","和平区","滨海新区"],
	  "河北省":["石家庄市", "秦皇岛市", "廊坊市", "保定市", "邯郸市", "唐山市", "邢台市", "衡水市", "张家口市", "承德市", "沧州市", "衡水市"],
	  "山西省":["太原市", "大同市", "长治市", "晋中市", "阳泉市", "朔州市", "运城市", "临汾市","晋城市","忻州市","吕梁市"],
	  "内蒙古自治区":["呼和浩特市", "赤峰市", "通辽市", "锡林郭勒盟", "兴安盟","包头市", "乌海市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "阿拉善盟"],
	  "辽宁省":["大连市", "沈阳市", "鞍山市", "抚顺市", "营口市", "锦州市", "丹东市", "朝阳市", "辽阳市", "阜新市", "铁岭市", "盘锦市", "本溪市", "葫芦岛市"],
	  "吉林省":["长春市", "吉林市", "四平市", "辽源市", "通化市", "延吉市", "白城市", "辽源市", "松原市", "临江市", "珲春市","白山市","延边朝鲜族自治区"],
	  "黑龙江省":["哈尔滨市", "齐齐哈尔市", "大庆市", "牡丹江市", "鹤岗市", "佳木斯市", "绥化市","鸡西市", "双鸭山市", "伊春市", "七台河市", "黑河市", "大兴安岭市"],
	  "上海市":["浦东区", "杨浦区", "徐汇区", "静安区", "卢湾区", "黄浦区", "普陀区", "闸北区", "虹口区", "长宁区", "宝山区", "闵行区", "嘉定区", "金山区", "松江区", "青浦区", "崇明区", "奉贤区", "南汇区","川沙区"],
	  "江苏省":["南京市", "苏州市", "无锡市", "常州市", "扬州市", "徐州市", "南通市", "镇江市", "泰州市", "淮安市", "连云港市", "宿迁市", "盐城市", "淮阴市", "沐阳市", "张家港市"],
	  "浙江省":["杭州市", "金华市", "宁波市", "温州市", "嘉兴市", "绍兴市", "丽水市", "湖州市", "台州市", "舟山市", "衢州市"],
	  "安徽省":["合肥市", "马鞍山市", "蚌埠市", "黄山市", "芜湖市", "淮南市", "铜陵市", "阜阳市", "宣城市", "安庆","淮北","滁州","宿州","六安","亳州","池州"],
	  "福建省":["福州市", "厦门市", "泉州市", "漳州市", "南平市", "龙岩市", "莆田市", "三明市", "宁德市"],
	  "江西省":["南昌市", "景德镇市", "上饶市", "萍乡市", "九江市", "吉安市", "宜春市", "鹰潭市", "新余市", "赣州市","抚州市"],
	  "山东省":["青岛市", "济南市", "淄博市", "烟台市", "泰安市", "临沂市", "日照市", "德州市", "威海市", "东营市", "荷泽市", "济宁市", "潍坊市", "枣庄市", "聊城市","莱芜市","滨州市"],
	  "河南省":["郑州市", "洛阳市", "开封市", "平顶山市", "濮阳市", "安阳市", "许昌市", "南阳市", "信阳市", "周口市", "新乡市", "焦作市", "三门峡市", "商丘市","鹤壁市","济源市","漯河市","驻马店市"],
	  "湖北省":["武汉市", "襄樊市", "孝感市", "十堰市", "荆州市", "黄石市", "宜昌市", "黄冈市", "恩施市", "鄂州市", "江汉市", "随枣市", "荆沙市", "咸宁市","襄阳市", "荆门市", "随州市", "仙桃市", "潜江市", "天门市", "神农架林区"],
	  "湖南省":["长沙市", "湘潭市", "岳阳市", "株洲市", "怀化市", "永州市", "益阳市", "张家界市", "常德市", "衡阳市", "湘西市", "邵阳市", "娄底市", "郴州市"],
	  "广东省":["广州市", "深圳市", "东莞市", "佛山市", "珠海市", "汕头市", "韶关市", "江门市", "梅州市", "揭阳市", "中山市", "河源市", "惠州市", "茂名市", "湛江市", "阳江市", "潮州市", "云浮市", "汕尾市", "潮阳市", "肇庆市", "顺德市", "清远市","东沙市"],
	  "广西壮族自治区":["南宁市", "桂林市", "柳州市", "梧州市", "来宾市", "贵港市", "玉林市", "贺州市","北海","防城港","钦州市","百色市","河池市","崇左市"],
	  "海南省":["海口市", "三亚市","三沙市", "五指山市", "琼海市", "儋州市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县", "西沙群岛", "南沙群岛", "中沙群岛的岛礁及其海域"],
	  "重庆市":["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区","綦江区", "潼南县", "铜梁县", "大足区", "荣昌县", "璧山县", "梁平县", "城口县", "丰都县", "垫江县", "武隆县", "忠县", "开县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县", "江津区", "合川区", "永川区", "南川区", "其它区"],
	  "四川省":["成都市", "达州市", "南充市", "乐山市", "绵阳市", "德阳市", "内江市", "遂宁市", "宜宾市", "巴中市", "自贡市", "康定市", "攀枝花市","泸州市", "广元市", "眉山市", "广安市", "雅安市", "资阳市", "阿坝市", "甘孜市", "凉山市"],
	  "贵州省":["贵阳市", "遵义市", "安顺市", "黔西南市", "都匀市","六盘水市", "铜仁市", "毕节市", "黔南市", "黔东南市"],
	  "云南省":["昆明市", "丽江市", "昭通市", "玉溪市", "临沧市", "文山市", "红河市", "楚雄市", "大理市","德宏市", "怒江市", "迪庆市", "曲靖市", "保山市", "普洱市", "西双版纳市"],
	  "西藏自治区":["拉萨市", "林芝市", "日喀则市", "昌都市","山南市", "那曲市", "阿里市"],
	  "陕西省":["西安市", "咸阳市", "延安市", "汉中市", "榆林市", "商南市", "略阳市", "宜君市", "麟游市", "白河市","铜川市", "宝鸡市", "渭南市", "安康市", "商洛市"],
	  "甘肃省":["兰州市", "金昌市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市","嘉峪关市", "白银市", "庆阳市", "定西市", "陇南市", "临夏市", "甘南市"],
	  "青海省":["黄南市", "海南市", "西宁市", "海东市", "海西市", "海北市", "果洛市", "玉树市","海南藏族"],
	  "宁夏回族自治区":["银川市", "吴忠市","石嘴山市", "固原市", "中卫市"],
	  "新疆维吾尔自治区":["乌鲁木齐市", "哈密地区", "喀什地区", "巴音郭楞蒙古自治州", "昌吉回族自治州", "伊犁哈萨克自治州", "阿勒泰地区", "克拉玛依市", "博尔塔拉蒙古自治州","吐鲁番市", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "和田地区", "塔城地区", "石河子市", "阿拉尔市", "图木舒克市", "五家渠市"],
	  "香港":["中西区", "湾仔区", "东区", "南区", "九龙-油尖旺区", "九龙-深水埗区", "九龙-九龙城区", "九龙-黄大仙区", "九龙-观塘区", "新界-北区", "新界-大埔区", "新界-沙田区", "新界-西贡区", "新界-荃湾区", "新界-屯门区", "新界-元朗区", "新界-葵青区", "新界-离岛区"],
	  "澳门":["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路氹城"]
	}
};
var WEB_APP='/Admin',
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
	page:function(f,c,t){
		var h=[],i,len,tmp=[];
		if(t>9){
			h.push('<b>当前'+(c+1)+'页，一共'+t+'页</b><a onclick="'+f+'(0)">第一页</a>');
			if(c<9){
				i=0;
				for(i;i<10;i++){
					if(i==c){
						h.push('<span>'+(c+1)+'</span>');
					}else{
						h.push('<a onclick="'+f+'('+i+')">'+(i+1)+'</a>');
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
						h.push('<a onclick="'+f+'('+i+')">'+(i+1)+'</a>');
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
						h.push('<a onclick="'+f+'('+i+')">'+(i+1)+'</a>');
					}
				}
				h.push('<b>...</b>');
			}
			h.push('<a onclick="'+f+'('+(t-1)+')">最后一页</a>');
		}else{
			i=0;
			for(i;i<t;i++){
				if(i==c){
					h.push('<span>'+(c+1)+'</span>');
				}else{
					h.push('<a onclick="'+f+'('+i+')">'+(i+1)+'</a>');
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
			url:WEB_APP+"/Root/save",
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
	save:function(){
		var d={
			id:$.trim($("#id").val()),
			username:$.trim($("#username").val()),
			password:$.trim($("#password").val()),
			rbac:$.trim($("#rbac").val()),
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

wx.Banner={
	index:function(p){
		wx.util.getContnet('Banner','index',null,p);
	},
	addDetail:function(){
		wx.util.getFrame("Banner","detail",0,'Banner',"index");
	},
	edit:function(id){
		if(!id){return false;}
		wx.util.getFrame("Banner","detail",id,'Banner',"index");
	},
	delDetail:function(that){
    if(confirm("确认删除？")){
			var o=$(that),bid=o.attr("data_pid");
			$.post(WEB_APP+"/Banner/delDetail",{id:bid},function(data){
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

wx.Share={
	index:function(p){
		wx.util.getContnet('Share','index',null,p);
	},
	addDetail:function(){
		wx.util.getFrame("Share","detail",0,'添加分享内容',"index");
	},
	edit:function(id){
		if(!id){return false;}
		wx.util.getFrame("Share","detail",id,'编辑分享内容',"index");
	},
	delDetail:function(that){
    if(confirm("确认删除？")){
			var o=$(that),bid=o.attr("data_id");
			$.post(WEB_APP+"/Share/delDetail",{id:bid},function(data){
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

wx.Notice={
	index:function(p){
		wx.util.getContnet('Notice','index',null,p);
	},
	addDetail:function(){
		wx.util.getFrame("Notice","detail",0,'添加文章',"index");
	},
	edit:function(id){
		if(!id){return false;}
		wx.util.getFrame("Notice","detail",id,'编辑文章内容',"index");
	},
	delDetail:function(that){
    if(confirm("确认删除？")){
			var o=$(that),bid=o.attr("data_id");
			$.post(WEB_APP+"/Notice/delDetail",{id:bid},function(data){
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

wx.Tags={
	edit:function(o,tid){
		var d={tid:tid,name:$(o).prev().children('input').val()};
		$.ajax({
			url:WEB_APP+'/Product/saveTag',
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				Div.loading.hide();
				var a,i;
				if(data.status==1){
					a="alert1";
					i="修改成功";
				}else{
					a="alert2";
					i=data.info;
				}
				wx.dialog.alert(a,i);
			},error:function(){Div.loading.hide();}
		});
	},
	del:function(o,id){
		if(confirm('确认删除？')){
			$.ajax({
				url:WEB_APP+'/Product/delTag',
				data:{id:id},
				beforeSend:function(){Div.loading.show();},
				success:function(data){
					Div.loading.hide();
					var a;
					if(data.status==1){
						a="alert1";
						$(o).parent().hide();
					}else{
						a="alert2";
					}
					wx.dialog.alert(a,data.info);
				},error:function(){Div.loading.hide();}
			});
		}
	},
	add:function(){
		var d={name:$('#newTagName').val()};
		$.ajax({
			url:WEB_APP+'/Product/saveTag',
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				Div.loading.hide();
				var a,i;
				if(data.status==1){
					a="alert1";
					i="添加成功";
					wx.util.getContnet('Product','tags');
				}else{
					a="alert2";
					i=data.info;
				}
				wx.dialog.alert(a,i);
			},error:function(){Div.loading.hide();}
		});
	}
};

wx.Member={
	index:function(p){
		if(!p){p=0;}
		var s='';
		if(this.openid){
			s+='/openid/'+this.openid;
		}
		if(this.nickname){
			s+='/nickname/'+this.nickname;
		}
		wx.util.getContnet("Member","index",null,p,s);
	},
	id:0,
	index2:function(p){
		location.href='/Admin/Seller/member/id/'+this.id+'/p/'+p;
	},
	orderopenid:"",
	index3:function(p){
		location.href='/Admin/member/order/id/'+this.orderopenid+'/p/'+p;
	},
	search:function(){
		this.openid=$('#openid').val();
		this.nickname=$('#nickname').val();
		this.index();
	},
	page:function(c,t){
		wx.util.page('wx.Member.index',c,t);
	},
	page2:function(c,t){
		wx.util.page('wx.Member.index2',c,t);
	},
	page3:function(c,t){
		wx.util.page('wx.Member.index3',c,t);
	},
	change:function(o,id){
		if(confirm('确定设置为代理')){
			var url=WEB_APP+"/Member/changeStatus",d={uid:id};
			$.ajax({
				url:url,
				data:d,
				beforeSend:function(){Div.loading.show();},
				success:function(h){
					Div.loading.hide();
					if(h.status==1){
						alert('修改成功');
						$(o).parent().parent().hide();
					}else{
						alert(h.msg);
					}
				},
				error:function(){Div.loading.hide();alert("alert2","错误，请重试");}
			});
		}
	}
};

wx.Order={
	beginT:'',
	endT:'',
	status:'',
	condition:'',
	tongbuLock:false,
	tongbu:function(){
		if(this.tongbuLock){
			return false;
		}
		if(confirm('此项操作将占有大量系统资源，且耗时较长，亲耐心等待，但在此期间并不会影响您的其他操作，确认同步数据？')){
			this.tongbuLock=true;
			$.ajax({
				url:WEB_APP+"/Order/tongbu",
				success:function(h){
					wx.Order.tongbuLock=false;
					if(h.status==1){
						alert('订单同步成功');
					}else{
						alert(h.msg);
					}
				},
				error:function(){wx.Order.tongbuLock=false;wx.dialog.alert("alert2","错误，请重试");}
			});
		}
	},
	index:function(p){
		if(!p){p=0;}
		var s='';
		if(this.beginT){
			s+='/beginT/'+this.beginT;
		}
		if(this.endT){
			s+='/endT/'+this.endT;
		}
		if(this.status && this.status!=0){
			s+='/status/'+this.status;
		}
		if(this.condition){
			switch ($("#order_con").html().trim()){
				case "订单号":
					s+='/ct/1';
					break;
				case "支付单号":
					s+='/ct/2';
					break;
				case "收货人":
					s+='/ct/3';
					break;
			}
			s+='/condition/'+this.condition;
		}
		wx.util.getContnet("Order","index",null,p,s);
	},
	page:function(c,t){
		wx.util.page('wx.Order.index',c,t);
	},
	search:function(){
		this.beginT=$('#beginT').val();
		// if(this.beginT){
		// 	this.beginT=this.beginT).getTime()/1000;
		// }
		this.endT=$('#endT').val();
		// if(this.endT){
		// 	this.endT=new Date(this.endT).getTime()/1000;
		// 	this.endT=this.endT;
		// }
		this.status=$('#status').val();
		this.condition=$('#condition').val();
		this.index();
	},
	manageTip:function(id,o){
		var d={
			id:id,
			managetip:$.trim($(o).prev().val())
		};
		$.ajax({
			url:WEB_APP+"/Order/managetip",
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(h){
				Div.loading.hide();
				wx.dialog.alert("alert1","备注成功")
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	detail:function(id){
		var url=WEB_APP+"/Order/detail";
		$.ajax({
			url:url,
			data:{id:id},
			beforeSend:function(){Div.loading.show();},
			success:function(h){
				Div.loading.hide();
				wx.dialog.locked=true;
				wx.dialog.lock();
				wx.dialog.open(h,{width:"800px",height:"500px"});
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	change:function(id,status,o){
		var url=WEB_APP+"/Order/changeStatus";
		if(status==4){
			if(!$("#kdcode").val()||!$("#kdname").val()){
				alert('物流信息未更新');
				return false;
			}
		}
		$.ajax({
			url:url,
			data:{oid:id,status:status},
			beforeSend:function(){Div.loading.show();},
			success:function(h){
				Div.loading.hide();
				if(h.status==1){
					var v='';
					switch(status){
						case 2:
							v='已支付';
							break;
						case 4:
							v='已发货';
							break;
						case 6:
							v='已完成';
							break;
					}
					$("#list_status_"+id).html(v);
					alert('修改成功');
					$(o).hide();
				}else{
					alert(h.info);
				}
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	cancel:function(id){
		if(confirm('确认取消么?')){
			wx.Order.change(id,8);
		}
	},
	lock1:false,
	sendKD:function(id,o){
		var url=WEB_APP+"/Order/sendKD",kd=$("#kdname").find("option:selected").text(),kdname=$("#kdname").val().trim(),kdcode=$("#kdcode").val().trim();
		$.ajax({
			url:url,
			data:{oid:id,kd:kd,kdname:kdname,kdcode:kdcode},
			beforeSend:function(){Div.loading.show();},
			success:function(h){
				Div.loading.hide();
				if(h.status==1){
					var v='';
					switch(status){
						case 2:
							v='已支付';
							break;
						case 4:
							v='已发货';
							break;
						case 6:
							v='已完成';
							break;
					}
					alert('修改成功');
				}else{
					alert(h.info);
				}
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	save1:function(id){
		var url=WEB_APP+"/Order/save1";
		var d={
			id:id,
			nickname:$("#nickname").val(),
			phone:$("#phone").val(),
			address:$("#address").val()
		}
		if(!id){alert('缺少ID');return false;}
		if(this.lock1){return false;}
		this.lock1=true;
		$.ajax({
			url:url,
			data:d,
			success:function(h){
				wx.Order.lock1=false;
				alert(h.info);
				if(h.status){
					$('#list_nickname_'+d.id).html(d.nickname);
				}
			},
			error:function(){wx.Order.lock1=false;wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	lock2:false,
	save2:function(id){
		if(this.lock2){return false;}
		this.lock2=true;
		var i=0,D=$('.glist'),h=[],o,
			Dnum=$('.Dnum'),
			Dprice1=$('.Dprice1'),
			Dcustomdetail=$('.Dcustomdetail'),
			Dgift=$('.Dgift'),
			Dcustom=$('.Dcustom');
		for(i;i<D.length;i++){
			o=D.eq(i).attr('data')+','+Dnum.eq(i).val()+','+Dprice1.eq(i).val()+','+Dcustomdetail.eq(i).val()
			if(Dgift.eq(i).attr('checked')){
				o+=',1';
			}else{
				o+=',0';
			}
			if(Dcustom.eq(i).attr('checked')){
				o+=',1';
			}else{
				o+=',0';
			}
			o+=','+D.eq(i).attr('data2');
			h.push(o);
		}
		var d={
			id:id,
			l:h.join('$')
		},url=WEB_APP+"/Order/save2";
		$.ajax({
			url:url,
			data:d,
			success:function(h){
				wx.Order.lock2=false;
				if(h.status==1){
					alert('修改成功');
					$('#total_price_'+id).html(h.msg);
				}else{
					alert(h.msg);
				}
			},
			error:function(){wx.Order.lock2=false;wx.dialog.alert("alert2","错误，请重试");}
		});
	}
};

wx.Seller={
	index:function(p){
		if(!p){p=0;}
		var s='';
		if(this.openid){
			s+='/openid/'+this.openid;
		}
		if(this.nickname){
			s+='/nickname/'+this.nickname;
		}
		wx.util.getContnet("Seller","index",null,p,s);
	},
	page:function(c,t){
		wx.util.page('wx.Seller.index',c,t);
	},
	search:function(){
		this.openid=$('#openid').val();
		this.nickname=$('#nickname').val();
		this.index();
	},
	detail:function(id){
		var url=WEB_APP+"/Seller/detail";
		$.ajax({
			url:url,
			data:{id:id},
			beforeSend:function(){Div.loading.show();},
			success:function(h){
				Div.loading.hide();
				wx.dialog.locked=true;
				wx.dialog.lock();
				wx.dialog.open(h,{width:"800px",height:"500px"});
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	save:function(id){
		var url=WEB_APP+"/Seller/changeStatus",d={
			uid:id,
			username:$('#usernamex').val(),
			category:$('#status2').val(),
			code:$('#codex').val()
		};
		$.ajax({
			url:url,
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(h){
				Div.loading.hide();
				if(h.status==1){
					alert('修改成功');
					$("#usernamex"+id).html(d.username);
				}else{
					alert(h.msg);
				}
			},
			error:function(){Div.loading.hide();alert("alert2","错误，请重试");}
		});
	}
};

wx.Report={
	beginT:'',
	endT:'',
	status:'',
	pid:'',
	index:function(p){
		if(!p){p=0;}
		var s='';
		if(this.beginT){
			s+='/beginT/'+this.beginT;
		}
		if(this.endT){
			s+='/endT/'+this.endT;
		}
		if(this.pid){
			s+='/pid/'+this.pid;
		}
		wx.util.getContnet("Report","index",null,p,s);
	},
	page:function(c,t){
		wx.util.page('wx.Report.index',c,t);
	},
	search:function(){
		this.beginT=$('#beginT').val();
		// if(this.beginT){
		// 	this.beginT=new Date(this.beginT).getTime()/1000;
		// }
		this.endT=$('#endT').val();
		// if(this.endT){
		// 	this.endT=new Date(this.endT).getTime()/1000;
		// 	this.endT=this.endT;
		// }
		this.pid=$('#pid').val();
		this.index();
	},
	down:function(){
		var s='';
		this.beginT=$('#beginT').val();
		// if(this.beginT){
		// 	this.beginT=new Date(this.beginT).getTime()/1000;
		// }
		this.endT=$('#endT').val();
		// if(this.endT){
		// 	this.endT=new Date(this.endT).getTime()/1000;
		// 	this.endT=this.endT;
		// }
		this.pid=$('#pid').val();
		if(this.beginT){
			s+='/beginT/'+this.beginT;
		}
		if(this.endT){
			s+='/endT/'+this.endT;
		}
		if(this.pid){
			s+='/pid/'+this.pid;
		}
		var url='/Admin/Report/search/'+s;
		window.open(url);
	},
	down2:function(){
		var s='mac/1';
		this.beginT=$('#beginT').val();
		// if(this.beginT){
		// 	this.beginT=new Date(this.beginT).getTime()/1000;
		// }
		this.endT=$('#endT').val();
		// if(this.endT){
		// 	this.endT=new Date(this.endT).getTime()/1000;
		// 	this.endT=this.endT;
		// }
		this.pid=$('#pid').val();
		if(this.beginT){
			s+='/beginT/'+this.beginT;
		}
		if(this.endT){
			s+='/endT/'+this.endT;
		}
		if(this.pid){
			s+='/pid/'+this.pid;
		}
		var url='/Admin/Report/search/'+s;
		window.open(url);
	}
};

wx.web={
	addCategory:function(){
		var html=[];
		html.push('<div class="dialogTitle"><span>添加分类</span><a id="closeDialog">X</a></div>');
		html.push('<div class="line"><label>分类名称</label><input id="category" type="text" class="input1"/></div>');
		html.push('<div class="line line0"><a class="btn1" onclick="wx.web.insertCategory()">添加</a></div>');
		var css={width:"300px",height:"150px"}
		wx.dialog.locked=true;
		wx.dialog.lock();
		wx.dialog.open(html.join(''),css);
	},
	insertCategory:function(){
		var name=$.trim($("#category").val());
		if(!name){return false;}
		$.post(WEB_APP+"/Web/updataCategory",{name:name},function(data){
			if(data.status==1){
				wx.dialog.close();
				wx.util.getContnet("Web","index");
			}else{
				wx.dialog.close();
				wx.dialog.alert("alert2",data.info);
			}
		});
	},
	updateCategory:function(e){
		var name=$.trim($(e).prev().val()),cid=$(e).attr("data_cid");
		if(!name){return false;}
		$.post(WEB_APP+"/Web/updataCategory",{name:name,cid:cid},function(data){
			className=data.status==1?"alert1":"alert2";
			wx.dialog.alert(className,data.info);
		});
	},
	delCategory:function(e){
		if(!confirm("确定删除该栏目，以及其下所有的内容？")){return false;}
		var cid=$(e).attr("data_cid");
		if(!cid){return false;}
		$.post(WEB_APP+"/Web/delCategory",{id:cid},function(data){
			if(data.status==1){
				wx.dialog.alert("alert1",data.info);
				$(e).parent().hide();
				$(e).parent().next().hide();
			}else{
				wx.dialog.alert("alert2",data.info);
			}
		});
	},
	addDetail:function(){
		wx.util.getFrame("Web","detail",0,"微网站","index");
	},
	edit:function(id){
		if(!id){return false;}
		wx.util.getFrame("Web","detail",id,"微网站","index");
	},
	delDetail:function(that){
		var o=$(that),aid=o.attr("data_aid");
		$.post(WEB_APP+"/Web/delDetail",{aid:aid},function(data){
			if(data.status==1){
				wx.dialog.alert("alert1",data.info);
				o.parent().hide();
			}else{
				wx.dialog.alert("alert2",data.info);
			}
		});
	}
};

wx.Coupons={
	sn:'',
	index:function(p){
		if(!p){p=0;}
		wx.util.getContnet("Coupons","index",null,p,null);
	},
	un:function(p){
		if(!p){p=0;}
		wx.util.getContnet("Coupons","un",null,p,null);
	},
	page:function(c,t,k){
		if(k==1){
			wx.util.page('wx.Coupons.index',c,t);
		}else{
			wx.util.page('wx.Coupons.un',c,t);
		}
	},
	save:function(){
		var d={
			sn:$('#sn1').val().trim(),
			openid:$('#openid').val().trim(),
			price:$('#price').val().trim(),
			category:$('#category').val().trim(),
			orderprice:$('#orderprice').val().trim(),
			begintime:$('#begintime').val().trim(),
			endtime:$('#endtime').val().trim(),
			productuse:$('#productuse').val(),
			productid:$.trim($('#productid').val()),
			id:$('#id').val()
		};
		if(!d.sn ||!d.openid ||!d.endtime ||!d.price){
			alert('必填信息不能为空');
			return false;
		}
		if(d.productuse=="0"){
			d.productid=0;//删除产品ID
		}else{
			var c=d.productid;
			c=c.split(',');
			if(c.indexOf("0")!=-1){
				var i=c.indexOf("0");
				c.splice(i,1);
				d.productid=c;
			}
		}
		$.ajax({
			url:WEB_APP+"/Coupons/updataDetail",
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				Div.loading.hide();
				if(data.status =="1"){
					wx.dialog.alert('alert1','成功');
					wx.Coupons.edit(data.info);
				}else{
					wx.dialog.alert('alert2',data.info);
				}
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	save2:function(){
		var d={
			sn:$('#sn1').val().trim(),
			channelstip:$('#channelstip').val().trim(),
			price:$('#price').val().trim(),
			category:$('#category').val().trim(),
			orderprice:$('#orderprice').val().trim(),
			begintime:$('#begintime').val().trim(),
			endtime:$('#endtime').val().trim(),
			productuse:$('#productuse').val(),
			productid:$.trim($('#productid').val()),
			id:$('#id').val()
		};
		if(!d.sn ||!d.channelstip ||!d.endtime ||!d.price){
			alert('必填信息不能为空');
			return false;
		}
		if(d.productuse=="0"){
			d.productid=0;//删除产品ID
		}else{
			var c=d.productid;
			c=c.split(',');
			if(c.indexOf("0")!=-1){
				var i=c.indexOf("0");
				c.splice(i,1);
				d.productid=c;
			}
		}
		$.ajax({
			url:WEB_APP+"/Coupons/updataDetail2",
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				Div.loading.hide();
				if(data.status =="1"){
					wx.dialog.alert('alert1','成功');
					wx.Coupons.edit2(data.info);
				}else{
					wx.dialog.alert('alert2',data.info);
				}
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	search:function(t){
		this.sn=$('#sn').val();
		this.ss(t);
	},
	ss:function(t){
		wx.util.getContnet("Coupons","search",null,0,'/s/'+this.sn+'/t/'+t);
	},
	edit:function(id){
		if(!id){id=0;}
		wx.util.getContnet("Coupons","detail",id,null,null);
	},
	edit2:function(id){
		if(!id){id=0;}
		wx.util.getContnet("Coupons","detail2",id,null,null);
	},
	del:function(that){
		var o=$(that),id=o.attr("data_id");
		$.post(WEB_APP+"/Coupons/delDetail",{id:id},function(data){
			if(data.status==1){
				wx.dialog.alert("alert1",data.info);
				o.parent().parent().remove();
			}else{
				wx.dialog.alert("alert2",data.info);
			}
		});
	},
	openProductBox:function(){
		Div.loading.show();
		$.get(WEB_APP+'/Coupons/product',function(d){
			Div.loading.hide();
			wx.dialog.locked=true;
			wx.dialog.lock();
			wx.dialog.open(d,{width:"800px",height:"500px"});
		});
	},
	loadProduct:function(ids){
		if(ids){
			Div.loading.show();
			$.get(WEB_APP+'/Coupons/loadProduct',{ids:ids},function(d){
				Div.loading.hide();
				var i=0,h=[];
				if(d){
					for(i;i<d.length;i++){
						h.push('<li><span></span><a>'+d[i].title+'</a><i onclick="wx.Coupons.delProduct(this,'+d[i].pid+')">删除</i></li>');
					}
					$("#loadProductIds").before(h.join(''));
				}
			});
		}
	},
	delProduct:function(e,id){
		if(confirm('确认删除?')){
			$(e).parent().remove();
			var ids=$("#productid").val();
			ids=ids.split(',');
			var i=ids.indexOf(String(id));
			ids.splice(i,1);
			$("#productid").val(ids.join(','));
		}
	},
	addProduct:function(o,id){
		var ids=$("#productid").val();
		if(ids){
			ids=ids.split(',');
		}else{
			ids=[];
		}
		if(ids.indexOf(String(id))==-1){
			ids.push(id);
			$("#productid").val(ids.join(','));
			$("#loadProductIds").before('<li><span></span><a>'+$(o).attr("data")+'</a><i onclick="wx.Coupons.delProduct(this,'+id+')">删除</i></li>');
		}else{
			alert('您已添加该产品');
		}
	}
};

wx.CouponsEvent={
	index:function(p){
		if(!p){p=0;}
		wx.util.getContnet("Coupons","coupons_event",null,p,null);
	},
	edit:function(id){
		if(!id){id=0;}
		wx.util.getContnet("Coupons","coupons_event_detail",id,null,null);
	},
	save:function(){
		var d={
			id:$('#id').val(),
			title:$.trim($('#title').val()),
			productuse:$.trim($('#productuse').val()),
			productid:$.trim($('#productid').val()),
			count:$.trim($('#count').val()),
			category:$.trim($('#category').val()),
			orderprice:$.trim($('#orderprice').val()),
			price:$.trim($('#price').val()),
			get_begintime:$.trim($('#get_begintime').val()),
			get_endtime:$.trim($('#get_endtime').val()),
			use_endtime:$.trim($('#use_endtime').val()),
			use_begintime:$.trim($('#use_begintime').val()),
			status:$.trim($('#status').val())
		};
		if(!d.title ||!d.price){
			alert('必填信息不能为空');
			return false;
		}
		if(d.productuse=="0"){
			d.productid=0;//删除产品ID
		}else{
			var c=d.productid;
			c=c.split(',');
			if(c.indexOf("0")!=-1){
				var i=c.indexOf("0");
				c.splice(i,1);
				d.productid=c;
			}
		}
		$.ajax({
			url:WEB_APP+"/Coupons/coupons_event_save",
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				Div.loading.hide();
				if(data.status =="1"){
					wx.dialog.alert('alert1','成功');
					wx.CouponsEvent.edit(data.info);
				}else{
					wx.dialog.alert('alert2',data.info);
				}
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	del:function(that){
		if(confirm('确认删除？')){
			var o=$(that),id=o.attr("data_id");
			$.post(WEB_APP+"/Coupons/coupons_event_del",{id:id},function(data){
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
					o.parent().parent().remove();
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			});
		}
	},
	page:function(c,t){
		wx.util.page('wx.CouponsEvent.index',c,t);
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

wx.Location={
	index:function(p){
		if(!p){p=0;}
		wx.util.getContnet("Location","index",null,p,null);
	},
	page:function(c,t){
		wx.util.page('wx.Location.index',c,t);
	},
	report:function(p){
		if(!p){p=0;}
		wx.util.getContnet("Location","report",null,p,null);
	},
	page2:function(c,t){
		wx.util.page('wx.Location.report',c,t);
	},
	search:function(){
		var s='',value=$.trim($("#value").val()),condition=$("#condition").val();
		if( !value || !condition ){
			return wx.dialog.alert('alert2','请输入搜索条件');
		}else{
			s="/condition/"+condition+"/value/"+value;
			wx.util.getContnet("Location","search",null,0,s);
		}
	},
	detail:function(id){
		$.ajax({
			url:WEB_APP+"/Location/detail",
			data:{id:id},
			beforeSend:function(){Div.loading.show();},
			success:function(h){
				Div.loading.hide();
				wx.dialog.locked=true;
				wx.dialog.lock();
				wx.dialog.open(h,{width:"800px",height:"530px"});
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	save:function(){
		var product_name=[];
		$('input[name="product_name"]:checked').each(function(i,v){
			product_name.push($(v).val());
		});
		var d={
			id:$.trim($("#locationId").val()),
			product_name:product_name.join(','),
			product_code:$.trim($("#product_code").val()),
			shop_name:$.trim($("#shop_name").val()),
			shop_code:$.trim($("#shop_code").val()),
			hospital_name:$.trim($("#hospital_name").val()),
			hospital_code:$.trim($("#hospital_code").val()),
			province:$.trim($("#province").val()),
			city:$.trim($("#city").val()),
			part:$.trim($("#part").val()),
			name:$.trim($("#name").val()),
			code:$.trim($("#code").val()),
			degreen:$.trim($("#degreen").val()),
			ME:$.trim($("#ME").val()),
			ASM:$.trim($("#ASM").val()),
			RSM:$.trim($("#RSM").val()),
			location:$.trim($("#location").val()),
			address:$.trim($("#address").val()),
			contact:$.trim($("#contact").val()),
			latitude:$.trim($("#latitude").val()),
			longitude:$.trim($("#longitude").val())
		}
		if(!d.product_name ||!d.shop_name ||!d.province ||!d.city ||!d.location ||!d.latitude ||!d.longitude){
			wx.dialog.alert('alert2','必填信息不能为空');
		}else{
			var locationId=$("#locationId").val();
			if(locationId){
				d.id=locationId;
			}
			$.ajax({
				url:WEB_APP+"/Location/saved",
				type:"post",
				data:d,
				beforeSend:function(){Div.loading.show();},
				success:function(h){
					Div.loading.hide();
					wx.dialog.close();
					wx.Location.detail(h.id);
				},
				error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
			});
		}
	},
	del:function(i,o){
		if(confirm('确认删除?')){
			$.ajax({
				url:WEB_APP+"/Location/del",
				data:{id:i},
				beforeSend:function(){Div.loading.show();},
				success:function(h){
					Div.loading.hide();
					if(h.status==1){
						wx.dialog.close();
						$("#location_detail_"+i).hide();
						wx.dialog.alert('alert1',h.msg);
					}else{
						wx.dialog.alert('alert2',h.msg);
					}
				},
				error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
			});
		}
	},
	delreport:function(i,o){
		if(confirm('确认删除?')){
			$.ajax({
				url:WEB_APP+"/Location/delreport",
				data:{id:i},
				beforeSend:function(){Div.loading.show();},
				success:function(h){
					Div.loading.hide();
					if(h.status==1){
						wx.dialog.close();
						$(o).parent().parent().hide();
						wx.dialog.alert('alert1',h.msg);
					}else{
						wx.dialog.alert('alert2',h.msg);
					}
				},
				error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
			});
		}
	},
	map:{
		init:function(){
			var i=0,S,h=[];
			for(i;i<MAP.shen.length;i++){
				h.push('<option value="'+MAP.shen[i]+'">'+MAP.shen[i]+'</option>');
			}
			$("#province").html(h.join(''));
			if(province){
				$("#province").val(province);
				S=MAP.shi[province];
			}else{
				S=MAP.shi['北京市'];
			}
			i=0;
			h=[];
			for(i;i<S.length;i++){
				h.push('<option value="'+S[i]+'">'+S[i]+'</option>');
			}
			$("#city").html(h.join(''))
			if(city){
				$("#city").val(city);
			}else{
				$("#city").val(S[0]);
			}
		},
		change:function(o){
			var v=$(o).val(),i=0,h=[],S;
			S=MAP.shi[v];
			for(i;i<S.length;i++){
				h.push('<option value="'+S[i]+'">'+S[i]+'</option>');
			}
			$("#city").html(h.join(''));
		}
	}
};

wx.Comment={
	index:function(p){
		if(!p){p=0;}
		wx.util.getContnet("Comment","index",null,p,null);
	},
	page:function(c,t){
		wx.util.page('wx.Comment.index',c,t);
	},
	reply:function(id){
		var h=[];
		h.push('<div class="dialogTitle"><span>评论回复</span><a id="closeDialog">X</a></div>');
		h.push('<div class="line line4"><label>回复内容</label><textarea class="textarea" id="reply">'+$("#comment_detail_"+id).html()+'</textarea></div>');
		h.push('<div class="line line0"><a class="btn1" onclick="wx.Comment.save('+id+')">回复</a></div>');
		wx.dialog.locked=true;
		wx.dialog.lock();
		wx.dialog.open(h.join(''),{width:"500px",height:"300px"});
	},
	save:function(id){
		var d={
			id:id,
			reply:$.trim($("#reply").val())
		}
		if(!d.id ||!d.reply ){
			wx.dialog.alert('alert2','必填信息不能为空');
		}else{
			$.ajax({
				url:WEB_APP+"/Comment/reply",
				type:"post",
				data:d,
				beforeSend:function(){Div.loading.show();},
				success:function(r){
					Div.loading.hide();
					wx.dialog.close();
					if(r.status==1){
						wx.dialog.alert("alert1",d.msg);
						$("#comment_detail_"+id).html(d.reply);
					}else{
						wx.dialog.alert("alert2",d.msg);
					}
				},
				error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
			});
		}
	},
	del:function(i,o){
		if(confirm('确认删除?')){
			$.ajax({
				url:WEB_APP+"/Comment/del",
				data:{id:i},
				beforeSend:function(){Div.loading.show();},
				success:function(h){
					Div.loading.hide();
					if(h.status==1){
						wx.dialog.close();
						$(o).parent().parent().hide();
						wx.dialog.alert('alert1',h.msg);
					}else{
						wx.dialog.alert('alert2',h.msg);
					}
				},
				error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
			});
		}
	}
};

wx.Apply={
	index:function(p){
		wx.util.getContnet('Apply','index',null,p);
	},
	addDetail:function(){
		wx.util.getFrame("Apply","detail",0,'试用活动',"index");
	},
	edit:function(id){
		if(!id){return false;}
		wx.util.getFrame("Apply","detail",id,'试用活动',"index");
	},
	delDetail:function(that){
    if(confirm("确认删除？")){
			var o=$(that),id=o.attr("data_pid");
			$.post(WEB_APP+"/Apply/delDetail",{id:id},function(data){
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
					o.parent().hide();
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			});
    }
	},
	page:function(c,t){
		wx.util.page('wx.Apply.index',c,t);
	}
};

wx.ApplyDetail={
	index:function(p){
		wx.util.getContnet('Apply','home',null,p);
	},
	id:0,
	list:function(p,id){
		if(id){this.id=id;}
		wx.util.getContnet("Apply","lists",this.id,p);
	},
	delDetail:function(that){
    if(confirm("确认删除？")){
			var o=$(that),id=o.attr("data_pid");
			$.post(WEB_APP+"/Apply/delDetail2",{id:id},function(data){
				if(data.status==1){
					wx.dialog.alert("alert1",data.info);
					o.parent().hide();
				}else{
					wx.dialog.alert("alert2",data.info);
				}
			});
    }
	},
	page:function(c,t){
		wx.util.page('wx.ApplyDetail.index',c,t);
	},
	page2:function(c,t){
		wx.util.page('wx.ApplyDetail.list',c,t);
	}
};


wx.Game={};

wx.Game.Goods={
	index:function(i){
		if(!i){i=0;}
		wx.util.getContnet('Game','goodsindex',0,i);
	},
	add:function(){
		wx.util.getContnet('Game','goodsdetail',0,0);
	},
	edit:function(id){
		wx.util.getContnet('Game','goodsdetail',id,0);
	},
	del:function(that){
		if(confirm("确认删除？")){
			var o=$(that),id=o.attr("data_id");
			$.post(WEB_APP+"/Game/goodsdel",{id:id},function(data){
				if(data.flag==1){
					wx.dialog.alert("alert1",data.message);
					o.parent().hide();
				}else{
					wx.dialog.alert("alert2",data.message);
				}
			});
    }
	},
	save:function(){
		var d={
			id:$("#did").val().trim(),
			name:$("#name").val().trim(),
			num:$("#num").val().trim(),
			rate:$("#rate").val().trim(),
			az:$("#az").val().trim()
		};
		$.ajax({
			url:WEB_APP+'/Game/goodssave',
			type:"post",
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				Div.loading.hide();
				if(data.flag==1){
					wx.dialog.alert("alert1","成功");
					wx.Game.Goods.index();
				}else{
					wx.dialog.alert("alert2",data.message);
				}
			},
			error:function(){Div.loading.hide();wx.dialog.alert("alert2","错误，请重试");}
		});
	},
	page:function(c,t){
		wx.util.page('wx.Game.Goods.index',c,t);
	}
};

wx.Game.Member={
	index:function(i){
		if(!i){i=0;}
		wx.util.getContnet('Game','memberindex',0,i);
	},
	del:function(that){
		if(confirm("确认删除？")){
			var o=$(that),id=o.attr("data_id");
			$.post(WEB_APP+"/Game/memberdel",{id:id},function(data){
				if(data.flag==1){
					wx.dialog.alert("alert1",data.message);
					o.parent().hide();
				}else{
					wx.dialog.alert("alert2",data.message);
				}
			});
    }
	},
	page:function(c,t){
		wx.util.page('wx.Game.Member.index',c,t);
	}
};

wx.Game.Result={
	index:function(i){
		if(!i){i=0;}
		wx.util.getContnet('Game','resultindex',0,i);
	},
	search:function(){
		var s=$("#resultsearch").val().trim();
		if(s){
			wx.util.getContnet('Game','resultsearch',0,0,"/s/"+s);
		}
	},
	del:function(that){
		if(confirm("确认删除？")){
			var o=$(that),id=o.attr("data_id");
			$.post(WEB_APP+"/Game/resultdel",{id:id},function(data){
				if(data.flag==1){
					wx.dialog.alert("alert1",data.message);
					o.parent().hide();
				}else{
					wx.dialog.alert("alert2",data.message);
				}
			});
    }
	},
	page:function(c,t){
		wx.util.page('wx.Game.Result.index',c,t);
	},
	change:function(that,id){
		var o=$(that),status=o.val();
		$.ajax({
			url:WEB_APP+"/Game/resultchange",
			data:{id:id,status:status},
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				var cc;
				Div.loading.hide();
				if(data.flag==1){
					wx.dialog.alert("alert1",data.message);
				}else{
					wx.dialog.alert("alert2",data.message);
					if(status==1){
						cc=0;
					}else{
						cc=1;
					}
					o.val(cc);
				}
			}
		});
	}
};

wx.SendPoint=function(o,i){
	var d={t:i,num:$.trim($(o).prev().children().val())},re =/^[0-9]*[1-9][0-9]*$/;
	if(re.test(d.num)){
		$.ajax({
			url:WEB_APP+"/Sendpoint/change",
			data:d,
			beforeSend:function(){Div.loading.show();},
			success:function(data){
				Div.loading.hide();
				wx.dialog.alert("alert2",data.message);
			}
		});
	}else{
		wx.dialog.alert("alert2",'只能为正整数');
	}
};
