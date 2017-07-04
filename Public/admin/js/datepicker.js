var datepicker={
	Y:"",M:"",D:"",O:"",
	init:function(o){
		this.O=o;
		if($("#dateBox").length==0){
			$("body").append('<div id="dateBox"><span id="closeDateBox">X</span><select id="yearList"></select><select id="monthList"></select><div id="xqList"><a>日</a><a>一</a><a>二</a><a>三</a><a>四</a><a>五</a><a>六</a></div><div id="dayList"></div></div>');
		}
		var m=12,_y=[],_m=[],i=2013,l=1,d=new Date(),dateBox=$("#dateBox");
		this.Y=d.getFullYear();
		this.M=Number(d.getMonth())+1<10?"0"+(d.getMonth()+1):d.getMonth()+1;
		this.D=d.getDate();
		for(i;i<this.Y+2;i++){
			_y.push("<option value='"+i+"'>"+i+"</option>");
		}
		for(l;l<13;l++){
			if(l<10){l="0"+l}
			_m.push("<option value='"+l+"'>"+l+"</option>");
		}
		var that=this;
		$("#yearList").html(_y.join("")).val(this.Y).change(function(){
			that.month();
		});
		$("#monthList").html(_m.join("")).val(this.M).change(function(){
			that.day();
		});
		var offset = o.offset();
    if(offset.top + 180 - $(document).scrollTop() > $(window).height()){
        dateBox.css({'left':offset.left,'top':offset.top - dateBox.height()}).fadeIn();
    }else{
        dateBox.css({'left':offset.left,'top':offset.top+o.height()}).fadeIn();
    }
    this.day();
	},
	month:function(m){
		this.day();
	},
	day:function(d){
		var m=$("#monthList").val(),y=$("#yearList").val(),ds,i=1,_d=[],d,xq=new Date(y,(m-1),01),xqq=xq.getDay(),xqqi=0;
		for(xqqi;xqqi<xqq;xqqi++){
			_d.push('<a></a>');
		}
		if(m=="01"||m=="03"||m=="05"||m=="07"||m=="08"||m=="10"||m=="12"){
			ds=31;
		}else if(m=="04"||m=="06"||m=="09"||m=="11"){
			ds=30;
		}else{
			(y%4==0&&y%100!=0||y%400==0)?ds=29:ds=28;
		}
		for(i;i<=ds;i++){
			_d.push('<a>'+i+'</a>');
		}
		$("#dayList").html(_d.join(""));
		var that=this;
		$("#dayList a").click(function(){
			d=$(this).html()<10?"0"+$(this).html():$(this).html();
			if(d!=0){
				that.show(y,m,d);
				$("#dateBox").fadeOut();
			}
		});
		//this.show(y,m,"0"+this.D);
	},
	show:function(y,m,d){
		this.O.val(y+"-"+m+"-"+d);
	}
};
