var WEB={
	res:"",
	img:'/Public/Uploads/',
	data:"/Index/",
	buy:"Home/buy"
};
var touch = {
  tX : [],
  touchStart : function(a) {
    this.tX.push(a.touches[0].pageX);
  },
  touchMove : function(c) {
    this.tX.push(c.touches[0].pageX);
    //c.preventDefault();
  },
  touchEnd : function() {
    if (this.tX[0] - this.tX[this.tX.length - 1] > 20) {
      scroll.right();
    }else if ( this.tX[this.tX.length - 1] - this.tX[0] > 20){
      scroll.left();
    }
    this.tX = [];
  }
},scroll={
	i:0,//loop variable
	n:1,//total banner count
	t:null,
	lock:false,
	fistImg:true,
	lastImg:false,
	ibc:0,//variable used for ratation
  left:function(){
  	if(this.lock){return false;}
  	this.lock=true;
  	if(this.i>0){
  		this.i--;
  	}
    var d=$('#slide li').eq(-1).clone();
    $('#slide').prepend(d).css({'margin-left':'-100%'});
    $('#slide').animate({'margin-left':'0'},300,function(){
      $('#slide li').eq(-1).remove();
      $("#slideBar i").removeClass('cur');
      $("#slideBar i").eq(scroll.i).addClass('cur');
      scroll.lock=false;
    });
  },
  right:function(){
  	if(this.lock){return false;}
  	this.lock=true;
  	if(this.i<this.n-1){
  		this.i++;
  	}else{
  		this.i=0;
  	}
    var d=$('#slide li').eq(0).clone();
    $('#slide li').eq(0).animate({'margin-left':'-100%'},500,function(){
      $('#slide li').eq(0).remove();
      $('#slide').append(d);
      $("#slideBar i").removeClass('cur');
      $("#slideBar i").eq(scroll.i).addClass('cur');
      scroll.lock=false;
    });
    clearTimeout(scroll.t);
    scroll.t=setTimeout('scroll.right()',7000);
  },
  imgRotate:function(){
	  if(this.lock){return false;}
	  //this.lock = true;
	  
	  if(this.lastImg == true)
	  {
		  this.lastImg = false;
		  this.ibc = 0;
		  var d = $('#slide li').eq(this.ibc).clone();
		  $('#slide li').eq(this.ibc).animate({'margin-left':'0%'}, 500, function(){
			$('#slide li').eq(this.ibc).remove();
			$('#slide').append(d);
			$('#slideBar i').eq(this.ibc).addClass('cur');
			});
		 
	  }
	  else
	  {
		  var d = $('#slide li').eq(this.ibc).clone();
		  $('#slide li').eq(this.ibc).animate({'margin-left':'-100%'}, 500, function(){
			$('#slide li').eq(this.ibc).remove();
			$('#slide').append(d);
			$('#slideBar i').removeClass('cur');
			
			$('#slideBar i').eq(this.ibc + 1).addClass('cur');
			
			});
		  
	  }
		scroll.lock = false;
		  this.ibc = this.ibc+1;		
		  if(this.n == this.ibc+1)
		  {
			this.lastImg = true;  
		  }
		  else
		  {
			this.lastImg = false;  
		  } 
		  
		//clearTimeout(this.t);  
		setTimeout("scroll.imgRotate()",7000);
 
  }
},QC={
	util:{
		isMobile:function(i){
      var r = /^\+?[1-9][0-9]*$/;
      return (!r.test(i) || i.length!=11)?false:true;
    }
	},
	coupons:0,
	map:{
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
	},
	load:{
		open:function(){
			$("#loading").show();
		},
		close:function(){
			$("#loading").hide();
		}
	},
	timer:function(i){
		var d=new Date(i);
		return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getHours()+':'+d.getSeconds();
	},
	comment:{
		p:1,
		lock:false,
		end:false,
		list:function(){
			if(this.lock || this.end){
				return false;
			}
			this.lock=true;
			$.ajax({
				url:WEB.data+'Comment/index',
				data:{p:QC.comment.p,pid:pid},
				success:function(D){
					QC.comment.lock=false;
					QC.comment.p++;
					var i=0,len,h=[],data=D.list;
					if(data){
						if(data.list<10 || !data.list){
							QC.comment.end=true;
							$("#nextPage").hide();
							$("#nextNull").show();
						}
						for(i;i<data.length;i++){
							h.push('<li><h3><img src="'+data[i].headimg+'" /><span>'+data[i].nickname+'</span></h3><p>'+data[i].content+'</p>');
							if(data[i].reply){
								h.push('<p>客服回复:'+data[i].reply+'</p>');
							}
							h.push('<time>'+QC.timer(data[i].time*1000)+'</time></li>');
						}
						$('#comments').html(h.join(''));
					}else{
						$("#nextPage").hide();
						$("#nextNull").show().html('暂无评论');
					}
				}
			});
		},
		lock2:false,
		comment:function(){
			if(this.lock2){
				return false;
			}
			this.lock=true;
			var data={
				pid:pid,
				start:5,
				content:$.trim($('#PL').val())
			};
			if(!data.content){return false;}
			$.ajax({
				url:WEB.data+'Comment/add',
				data:data,
				success:function(data){
					QC.comment.lock=false;
					alert(data.msg);
					if(data.status==1){
						QC.comment.p=1;
						QC.comment.end=false;
						QC.comment.list();
					}
					$('#PL').val('');
					$('#openPL').show();
					$('#PLc,#submitPL').hide();
				}
			});
		},
		init:function(){
			this.list();
			$('#openPL').click(function(){
				$('#openPL').hide();
				$('#PLc').show();
				$('#submitPL').show();
			});
			$('#submitPL').click(function(){
				QC.comment.comment();
			});
		}
	},
	car:{
		init:function(){
			QC.car.list();
			$('#toCar').click(function(){
				var o={
					pid:$(this).attr('d_pid'),
					name:$(this).attr('d_name'),
					price:$(this).attr('d_price'),
					num:1,
					img:$(this).attr('d_img')
				};
				QC.car.add(o);
			});
			$('#carBtn').click(function(){
				QC.car.open();
			});
			var d=localStorage.getItem('list'),D=[];
			if(d){
				D=eval('('+d+')');
			}
			$("#close").click(function(){
				QC.car.close();
			});
		},
		list:function(){
			var d=localStorage.getItem('list'),D=[],i=0,h=[],money=0;
			if(d){
				D=eval('('+d+')');
			}
			if(D.length>0){
				for(i;i<D.length;i++){
					money+=D[i].num*D[i].price;
					h.push('<div class="li"><img src="'+WEB.img+D[i].img+'" /><div><section>'+D[i].name+'</section><p><a onclick="QC.car.sub('+i+',this)">-</a><b>'+D[i].num+'</b><a onclick="QC.car.plus('+i+',this)">+</a></p><i onclick="QC.car.del('+i+')">删除</i></div></div>');
				}
				$("#carList").html(h.join(''));
				// $('#carBtn').show().html(D.length);


				// money-=QC.coupons;暂不减优惠价

			}else{
				money=0;
				$("#carList").html('');
				$('#car').removeClass('show');
				// $('#carBtn').hide().html('');
			}
			$("#total,#total2").html("<b>"+D.length+"</b>件，共<b>"+money+"</b>元");
		},
		add:function(o){
			var d=localStorage.getItem('list'),D=[];
			if(d){
				D=eval('('+d+')');
			}
			if(D){
				var i=0,len=D.length,k=false;
				for(i;i<len;i++){
					if(D[i].pid==o.pid){
						D[i].num++;
						k=true;
						break;
					}
				}
				if(!k){
					D.push(o);
				}
			}else{
				D.push(o);
			}
			var list=JSON.stringify(D);
			localStorage.setItem('list',list);
			this.list();
			this.open();
		},
		sub:function(i,o){
			var d=localStorage.getItem('list'),D=[];
			D=eval('('+d+')');
			if(D[i].num>1){
				D[i].num--;
			}
			$(o).next().html(D[i].num);
			var list=JSON.stringify(D);
			localStorage.setItem('list',list);
			this.list();
		},
		plus:function(i,o){
			var d=localStorage.getItem('list'),D=[];
			D=eval('('+d+')');
			D[i].num++;
			$(o).next().html(D[i].num);
			var list=JSON.stringify(D);
			localStorage.setItem('list',list);
			this.list();
		},
		del:function(i){
			var d=localStorage.getItem('list'),D=[];
			D=eval('('+d+')');
			D.splice(i,1);
			var list=JSON.stringify(D);
			localStorage.setItem('list',list);
			this.list();
		},
		open:function(){
			$('#car').addClass('show');
		},
		close:function(){
			$('#car').removeClass('show');
		}
	},
	address:{
		init:function(){
			$("#close2").click(function(){
				QC.address.close();
			});
			var d=localStorage.getItem('map1'),i=0,h=[],S,D={};
			if(d){
				D=eval('('+d+')');
			}
			for(i;i<QC.map.shen.length;i++){
				h.push('<option value="'+QC.map.shen[i]+'">'+QC.map.shen[i]+'</option>');
			}
			$("#shen").html(h.join(''))
			if(D.shen){
				$("#shen").val(D.shen);
				S=QC.map.shi[D.shen];
			}else{
				S=QC.map.shi['北京市'];
			}
			i=0;
			h=[];
			for(i;i<S.length;i++){
				h.push('<option value="'+S[i]+'">'+S[i]+'</option>');
			}
			$("#shi").html(h.join(''))
			if(D.shi){
				$("#shi").val(D.shi);
			}else{
				$("#shi").val(S[0]);
			}
			if(D.nickname){
				$("#nickname").val(D.nickname);
			}
			if(D.phone){
				$("#phone").val(D.phone);
			}
			if(D.address){
				$("#uaddress").val(D.address);
			}
			if(D.code){
				$("#code").val(D.code);
			}
			if(D.piao){
				$("#piao").val(D.piao);
			}
		},
		change:function(o){
			var v=$(o).val(),i=0,h=[],S;
			S=QC.map.shi[v];
			for(i;i<S.length;i++){
				h.push('<option value="'+S[i]+'">'+S[i]+'</option>');
			}
			$("#shi").html(h.join(''))
		},
		save:function(){
			var s1=$("#shen").val().trim()
			,s2=$("#shi").val().trim()
			,nickname=$("#nickname").val().trim()
			,phone=$("#phone").val().trim()
			,address=$("#uaddress").val().trim()
			,code=$("#code").val().trim()
			,piao=$("#piao").val().trim()
			,map={"shen":s1,"shi":s2,"nickname":nickname,"phone":phone,"address":address,"code":code,"piao":piao};
			if(!nickname || !phone || !address ){
				return alert('姓名电话地址均不能为空!');
			}
			if(!QC.util.isMobile(phone)){
				return alert('电话号码非法');
			}
			if(code){
				if(code.length!=6){
					return alert('邮编非法');
				}
			}
			localStorage.setItem('map1',JSON.stringify(map));
			if(QC.buy.isQ){
				QC.buy.quick.submitData(map);
			}else{
				QC.buy.submitData(map);
			}
		},
		open:function(){//加载优惠券
			var ids=[],num=[],tmpo={};
			if(QC.buy.isQ==1){
				tmpo.pid=pid;
				tmpo.num=1;
				tmpo.price=QC.buy.quick.price;
				ids.push(tmpo);
			}else{
				var d=localStorage.getItem('list'),D=[],i=0;
				if(d){
					D=eval('('+d+')');
					for(i;i<D.length;i++){
						tmpo={};
						tmpo.pid=D[i].pid;
						tmpo.num=D[i].num;
						tmpo.price=D[i].price;
						ids.push(tmpo);
					}
				}
			}
			$.ajax({
				url:WEB.data+'index/loadcoupons',
				// data:{ids:ids.join(',')},
				beforeSend:function(){QC.load.open();},
				success:function(D){
					QC.load.close();
					var h=[],i=0,len=0;
					if(D){
						len=D.length;
					}
					h.push('<option value="0" data="0">选择优惠券</option>');
					var category,type;
					for(i;i<len;i++){
						category=D[i].category;
						type=category==1?"元(抵价券)":category==2?"%(折扣券)":"元(满减券)";
						//判断优惠券
						if(D[i].productuse==1){
							if( QC.checkcoupons(ids,D[i]) ){
								h.push('<option value="'+D[i].id+'" data="'+D[i].price+'" data_category="'+category+'">'+D[i].sn+':'+D[i].price+type+'</option>');
							}
						}else{
							h.push('<option value="'+D[i].id+'" data="'+D[i].price+'" data_category="'+category+'">'+D[i].sn+':'+D[i].price+type+'</option>');
						}
					}
					$("#coupons1").html(h.join(''));
					QC.coupons=0;
					$("#coupons li").removeClass("on");
					$("#coupons0").html('选择优惠券');
					QC.car.list();
					if(QC.buy.isQ){
						$("#qqNum").show();
						$("#qqNum2").hide();
					}else{
						$("#qqNum").hide();
						$("#qqNum2").show();
					}
					$('#address').show();
					$('#Warp').hide();
				}
			});
		},
		close:function(){
			$('#address').hide();
			$('#Warp').show();
			QC.buy.isQ=0;
		}
	},
	buy:{
		isQ:0,
		quick:{
			isQN:1,
			name:"",
			img:"",
			sub:function(o){
				if(this.isQN>1){
					this.isQN--;
				}
				$(o).next().html(this.isQN);
			},
			plus:function(o){
				this.isQN++;
				$(o).prev().html(this.isQN);
			},
			submitData:function(map){
				var nums;
				if(isonly){
					nums=$("#onlyBuyNum").val();
				}else{
					nums=this.isQN;
				}
				var goods=[pid+","+this.name+","+nums+","+this.img],d;
				goods=goods.join("$");
				d={
					nickname:map.nickname,
					phone:map.phone,
					shen:map.shen,
					shi:map.shi,
					qu:map.qu,
					address:map.address,
					piao:map.piao,
					code:map.code,
					goods:goods
				};
				if(QC.coupons){
					if(QC.couponsIndex==0){
						d.couponsID=$('#coupons1').val();
					}else{
						d.couponsNumber=$('#coupons2').val();
					}
				}
				$.ajax({
					url:WEB.data+WEB.buy,
					data:d,
					type:"post",
					beforeSend:function(){QC.load.open();},
					success:function(D){
						QC.load.close();
						if(D.status==1){
							// location.href=WEB.data+"Home/pay/oid/"+D.msg;
							location.href=WEB.data+"Home/order/id/"+D.msg;
						}else{
							alert(D.msg);
						}
					},
					error:function(){QC.load.close();}
				});
			}
		},
		submitData:function(map){
			var d=localStorage.getItem('list'),D=[];
			if(d){D=eval('('+d+')');}
			if(D.length>0){
				var goods=[],d,i=0;
				for(i;i<D.length;i++){
					goods.push(D[i].pid+","+D[i].name+","+D[i].num+","+D[i].img);
				}
				goods=goods.join("$");
				d={
					nickname:map.nickname,
					phone:map.phone,
					shen:map.shen,
					shi:map.shi,
					qu:map.qu,
					address:map.address,
					piao:map.piao,
					code:map.code,
					goods:goods
				};
				if(QC.coupons){
					if(QC.couponsIndex==0){
						d.couponsID=$('#coupons1').val();
					}else{
						d.couponsNumber=$('#coupons2').val();
					}
				}
				$.ajax({
					url:WEB.data+WEB.buy,
					data:d,
					type:"post",
					beforeSend:function(){QC.load.open();},
					success:function(D){
						QC.load.close();
						console.log(D)
						if(D.status==1){
							localStorage.setItem("list","[]");
							QC.car.list();
							// location.href=WEB.data+"Home/pay/oid/"+D.msg;
							location.href=WEB.data+"Home/order/id/"+D.msg;
						}else{
							alert(D.msg);
						}
					},
					error:function(){QC.load.close();}
				});
			}else{
				alert('选择产品');
			}
		}
	},
	history:{
		t:1,
		p:0,
		end:false,
		lock:false,
		list:function(){
			if(this.lock || this.end){
		    if(this.end){$('#end').show();}
		    return false;
		  }
		  this.lock=true;
		  QC.load.open();
			$.ajax({
		    url:WEB.data+"Home/lists",
		    data:{_:new Date().getTime(),p:this.p,t:this.t},
		    success:function(d){
		    	QC.load.close();
		    	var D;
		    	if(d.flag){
		    		D=d.list;
		    		if(D){
		    			if(D.length<10){
		    				QC.history.end=true;
		    				$("#end").show();
		    			}else{
		    				QC.history.p++;
		    			}
	    				var i=0,len=D.length,h=[],url;
				      for(i;i<len;i++){
				        url=WEB.data+'Home/order/id/'+D[i].oid+'/t/'+QC.history.t;
				        h.push('<div class="li"><a href="'+url+'"><img src="'+WEB.img+D[i].img+'"><div><section>'+D[i].desc+'</section></div></a></div>');
				      }
				      $("#orderList").append(h.join(''));
		    		}else{
		    			QC.history.end=true;
		    			$("#end").show();
		    		}
		      }else{
		      	QC.history.end=true;
		      	$("#end").show();
		    	}
		      QC.history.lock=false;
		    }
		  });
		},
		check:function(id){
			if(confirm('确认收货么?')){
				var d={id:id};
				$.ajax({
					url:WEB.data+'Index/check',
					data:d,
					beforeSend:function(){QC.load.open();},
					success:function(d){
						QC.load.close();
						if(d.status==1){
							alert('您已确认收货');
							$(".hisCheck").hide();
						}else{
							alert(s.msg);
						}
					},
					error:function(){QC.load.close();}
				});
			}
		},
		cancel:function(id){
			if(confirm('确认取消该订单么?')){
				var d={id:id};
				$.ajax({
					url:WEB.data+'Index/cancelorder',
					data:d,
					beforeSend:function(){QC.load.open();},
					success:function(d){
						QC.load.close();
						if(d.status==1){
							alert('您已取消该订单');
							$(".hisCheck").hide();
							location.reload();
						}else{
							alert(s.msg);
						}
					},
					error:function(){QC.load.close();}
				});
			}
		}
	},
	member:{
		p:0,
		end:false,
		lock:false,
		list:function(){
			if(this.lock || this.end){
		    if(this.end){$('#end').show();}
		    return false;
		  }
		  this.lock=true;
		  QC.load.open();
			$.ajax({
		    url:WEB.data+"Index/members",
		    data:{_:new Date().getTime(),p:this.p},
		    success:function(d){
		    	QC.load.close();
		    	var D;
		    	if(d.flag){
		    		D=d.list;
		    		if(D){
		    			if(D.length<10){
		    				QC.member.end=true;
		    				$("#end").show();
		    			}else{
		    				QC.member.p++;
		    			}
	    				var i=0,len=D.length,h=[],url;
				      for(i;i<len;i++){
				        h.push('<div class="li" data="'+D[i].openid+'"><img src="'+D[i].wxhead+'"><div>'+D[i].wxname+'<br/>当月销量：'+D[i].num+'<br/>当月消费金额：'+D[i].price+'</div></div>');
				      }
				      $("#MY").append(h.join(''));
		    		}else{
		    			QC.member.end=true;
		    			$("#end").show();
		    		}
		      }else{
		      	QC.member.end=true;
		      	$("#end").show();
		    	}
		      QC.member.lock=false;
		    }
		  });
		}
	},
	point:{
		address:{
			init:function(){
				$("#close3").click(function(){
					$('#Warp').show();
					$('#addressPointer').hide();
				});
				var d=localStorage.getItem('map2'),i=0,h=[],S,D={};
				if(d){
					D=eval('('+d+')');
				}
				for(i;i<QC.map.shen.length;i++){
					h.push('<option value="'+QC.map.shen[i]+'">'+QC.map.shen[i]+'</option>');
				}
				$("#shenPointer").html(h.join(''))
				if(D.shen){
					$("#shenPointer").val(D.shen);
					S=QC.map.shi[D.shen];
				}else{
					S=QC.map.shi['北京市'];
				}
				i=0;
				h=[];
				for(i;i<S.length;i++){
					h.push('<option value="'+S[i]+'">'+S[i]+'</option>');
				}
				$("#shiPointer").html(h.join(''))
				if(D.shi){
					$("#shiPointer").val(D.shi);
				}else{
					$("#shiPointer").val(S[0]);
				}
				if(D.nickname){
					$("#nicknamePointer").val(D.nickname);
				}
				if(D.phone){
					$("#phonePointer").val(D.phone);
				}
				if(D.address){
					$("#uaddressPointer").val(D.address);
				}
			},
			change:function(o){
				var v=$(o).val(),i=0,h=[],S;
				S=QC.map.shi[v];
				for(i;i<S.length;i++){
					h.push('<option value="'+S[i]+'">'+S[i]+'</option>');
				}
				$("#shiPointer").html(h.join(''))
			}
		},
		add:function(id){
			this.id=id;
			$('#Warp').hide();
			$('#addressPointer').show();
		},
		save:function(){
			var	d={
				nickname:$.trim($("#nicknamePointer").val()),
				phone:$.trim($("#phonePointer").val()),
				shen:$.trim($("#shenPointer").val()),
				shi:$.trim($("#shiPointer").val()),
				address:$.trim($("#uaddressPointer").val()),
				id:this.id
			},map={"shen":d.shen,"shi":d.shi,"nickname":d.nickname,"phone":d.phone,"address":d.address};
			localStorage.setItem('map2',JSON.stringify(map));
			$.ajax({
				url:WEB.data+'Index/exchangePoint',
				data:d,
				type:"post",
				beforeSend:function(){QC.load.open();},
				success:function(D){
					QC.load.close();
					if(D.status==1){
						location.href=WEB.data+"index/pointMarketHistory.html?_="+new Date().getTime();
					}else{
						alert(D.msg);
					}
				},
				error:function(){QC.load.close();}
			});
		}
	},
	checkIn:function(o){
		$.ajax({
			url:WEB.data+'Home/checkin',
			beforeSend:function(){QC.load.open();},
			success:function(d){
				QC.load.close();
				if(d.status==1){
					$(o).attr({"onclick":"return false"}).html('已签到');
				}else{
					alert(d.msg);
				}
			},
			error:function(){QC.load.close();}
		});
	},
	checkcoupons:function(products,D){
		var r=false,productids=D.productid.split(','),i=0,len=products.length,sum=0;
		for(i;i<len;i++){
			if(productids.indexOf(products[i].pid)!=-1){
				sum+=products[i].num*products[i].price;
			}
		}
		if( sum>Number(D.orderprice) ){
			r=true;
		}
		return r;
	},
	loadCouponsEvent:function(){
		$.ajax({
			url:WEB.data+'index/couponsEvents',
			success:function(d){
				if(d.status==1){
					var D=d.list,len=0,i=0,h=[];
					if(D){
						len=D.length;
					}
					if(len>0){
						for(i;i<len;i++){
							h.push('<li onclick="QC.getCoupons('+D[i].id+')"><div><h2>'+D[i].title+'</h2><p>');
							if(D[i].orderprice){
								h.push('订单满'+D[i].orderprice+'可用<br/>');
							}
							switch(D[i].category){
								case "1":
									h.push('抵价券-价值:'+D[i].price+'元');
									break;
								case "2":
									h.push('折扣券-价值:'+D[i].price+'折');
									break;
								case "3":
									h.push('满减券-价值:'+D[i].price+'元');
									break;
							}
							h.push('</p><a>点击领取</a></div></li>');
						}
						$("#couponsEvents").html(h.join(''))
						$("#couponsEventsW").show();
					}
				}
			}
		});
	},
	getCoupons:function(id){
		$.ajax({
			url:WEB.data+'Index/getsn',
			data:{id:id},
			beforeSend:function(){QC.load.open();},
			success:function(d){
				QC.load.close();
				alert(d.msg);
			},
			error:function(){QC.load.close();}
		});
	}
};
QC.load.close();
$("#step1").click(function(){
	QC.car.close();
	QC.address.open();
});

$("#toPay").click(function(){
	QC.buy.isQ=1;
	QC.address.open();
});
$("#nav li").click(function(){
	$(this).children("p").toggle();
});		  
$("#coupons li").click(function(){
  $("#coupons li").removeClass('on');
  $(this).addClass('on');
  var coupons=$(this).index();
  QC.couponsIndex=coupons;
  if(coupons==0){
  	$("#tt3").html('');
  	$("#coupons2").val('');
  }else{
    $("#coupons0").html('选择优惠券');
    $("#coupons1").val(0);
  }
  QC.coupons=0;
  QC.car.list();
});
$("#coupons1").change(function(){
	var v=$(this).val(),t=$("#coupons1").find("option:selected");
	$("#coupons0").html(t.text());
	QC.coupons=t.attr('data');
	QC.car.list();
});
$("#coupons2").blur(function(){
	var t=$.trim($(this).val());
	if(t){
		$.ajax({
			url:WEB.data+"Home/CkCoupons",
			data:{id:t},
			beforeSend:function(){QC.load.open();},
			success:function(d){
				QC.load.close();
				var h='';
				if(d.status==1){
					if(d.productuse){
						h+='[该券仅使用于:'+d.productnames+'],';
					}
					if(d.orderprice>0){
						h+='[订单满'+d.orderprice+'时可用],';
					}
					switch(d.category){
						case 1:
							h+='[价值:'+d.price+'元]';
							break;
						case 2:
							h+='[价值:'+d.price+'元]';
							break;
						case 3:
							h+='[价值:'+d.price+'元]';
							break;
					}
					$("#tt3").html(h);
					QC.coupons=d.price;
					QC.car.list();
				}else{
					QC.coupons=0;
					QC.car.list();
					alert('此券无效');
					$("#coupons2").val();
					$("#tt3").html('');
				}
			},
			error:function(){QC.load.close();}
		});
	
	}

});
$("#yhq1 span").click(function(){
	var i=$(this).index();
	$("#yhq1 span").removeClass('cur');
	$(this).addClass('cur');
	$("#yhq2 ul").hide();
	$("#yhq2 ul").eq(i).show();
});
$("#notFocus").click(function(){$(this).hide();});
