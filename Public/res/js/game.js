Array.prototype.random=function(num){
  var s=this,a=[],no;
  var r = function(){return s[Math.round(Math.random()*(s.length-1))];};
  while(a.length!=num){
    no = r();
    if(a.indexOf(no)!=-1)continue;
    a.push(no);
  }
  return a;
};
var X={
	E:10,
	url:'/Index/Game/',
	//url:'/YX/index.php/Index/index/',
	error:{
		ajaxError:'通讯失败,请重试'
	},
	load:function(){$("#load").show();},
	unload:function(){$("#load").hide();},
	unlock:false,
	ready:function(){
		$("#rula").fadeOut();
		$("#start").addClass("s1").show();
		setTimeout('X.go()',2000);
	},
	go:function(){
		$("#start").removeClass("s1").addClass("s2");
		setTimeout(function(){
			if($("#start").hasClass("s2")){
				X.unlock=true;
				if(X.unlock){
					X.game();
				}
			}
		},2000);
	},
	game:function(){
		$("#start").removeClass().hide();
		this.stop=false;/*关闭停止标记*/
		this.count();/*设置倒计时*/
		this.set();/*开始游戏*/
	},
	count:function(){
		this.E--;
		if(this.E<1){
			this.stop=true;/*停止所有计时器;*/
		}else{
			$("#count").html(this.E);
			setTimeout('X.count();',1000);
		}
	},
	stop:true,
	set:function(){
		if(!this.stop){
			var b=[0,1,2,3,4,5,6,7,8],i=0,h=[],k,y=[2,3,4,5],z=y.random(1),x=[1,2,3,4,5,6,7];
			k=b.random(z[0]);
			for(i;i<9;i++){
				if(k.indexOf(i)!=-1){
					h.push('<a class="on on'+x.random(1)[0]+'"></a>');
				}else{
					h.push('<span></span>');
				}
			}
			$("#map").html(h.join(''));
			Math.random();
			setTimeout("X.set()",1000);/*重置*/
		}else{
			$("#map").html("");
			//this.result();/*展示结果*/
			this.detail();
		}
	},
	num:0,
	get:function(o){
		$(o).append('<em>+1</em>').removeClass('on');
		this.num++;
		this.calc($(o).attr('class'));
		$("#tip").html("得分:"+this.num);
		this.move($(o),$(o).children('em'));
	},
	_calc:{},
	calc:function(x){
		if(this._calc[x]){
			this._calc[x]++;
		}else{
			this._calc[x]=1;
		}
	},
	move:function(p,o){
		o.css({"left":p.position().left+20,"top":p.position().top,"display":"block"}).animate({left:'80vw',top:"-5vw"},100,function(){
			$(this).remove();
		});
	},
	rula:function(){
		$("#rula").show();
	},
	detail:function(){
		//$("#rula").hide();
		$("#detail").show();
		//setTimeout('X.ready()',3000);
	},
	result:function(){
		var d={num:this.num};
		$.ajax({
			url:X.url+'sendResult',
			data:d,
			beforeSend:function(){X.load();},
			success:function(data){
				X.unload();
				var tip='';
				$("#resultNum").html(d.num);
				$("#result").show();
				if(data.info){
					tip=data.info+'等奖,'+data.info2;
				}else{
					tip='未中奖';
				}
				$("#result em").html(tip);
				$("#tip,#count").html('');
				$("#detail").hide();
			},
			error:function(){X.unload();alert(X.error.ajaxError);}
		})
	},
	reset:function(){
		$("#resultNum").html("");
		$("#result").hide();
		this.ready();
		this.E=20;
		this.num=0;
	},
	showResult:function(){
		$("#resultBtn b").hide();
		$("#resultBtn em").show();
	}
};
$("#start").click(function(){
	// if($(this).hasClass("s2")){
	// 	X.unlock=true;
	// 	if(X.unlock){
	// 		X.game();
	// 	}
	// }
});
$("#rula a").click(function(){
	X.ready();
});
$("#signInBtn").click(function(){
	// var d={
	// 	"username":$("#username").val().trim(),
	// 	"mobile":$("#mobile").val().trim()
	// };
	// if(!d.username || !d.mobile){
	// 	return alert('信息不完整');
	// }
	$.ajax({
		url:X.url+'signIn',
		// data:d,
		beforeSend:function(){X.load();},
		success:function(data){
			X.unload();
			if(data.flag==1){
				$("#signIn").hide();
				X.rula();
			}else if(data.flag==2){
				if(data.info==0){
					alert('你已经参与过了,未中奖');
				}else{
					alert('你已经参与过了,中 '+data.info+' 等奖');
				}
			}else{
				alert(data.message);
			}
		},
		error:function(){X.unload();alert(X.error.ajaxError);}
	});
});
$("#resultBtn b").click(function(){
	X.showResult();
});
X.unload();
$("#map").on("touchstart","a.on",function(e){
	X.get($(this));
});
$("#detail a").click(function(){
	X.result();
});



// $("#signIn").hide();
// X.stop=false,
// X.set();
