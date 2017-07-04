<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<title>报表</title>
<meta name="author" content="luwenbin@live.com" />
<link type="text/css" rel="stylesheet" href="/Public/admin/css/style.css"/>
<style type="text/css">
#canvasDiv{width:820px;height:420px;padding:10px;}
</style>
</head><body>
<div id='canvasDiv'></div>
<script src="/Public/admin/js/jquery.min.js"></script>
<script src="/Public/admin/js/base.js"></script>
<script src="/Public/admin/js/ichart.latest.min.js"></script>
<script type="text/javascript">
$.get("<?php echo U('fanslocal_');?>",function(D){
	var i=0,labels=[],data=[],v1=[],v2=[],max;
	for(i;i<D.length;i++){
		D[i].count1=Number(D[i].count1);
		D[i].count2=Number(D[i].count2);
		D[i].sum=D[i].count1+D[i].count2;
	}
	D.sort(function(a,b){return b.sum-a.sum});
	max=Math.ceil(D[0].sum/100)*100;
	i=0;
	for(i;i<10;i++){
		labels.push(D[i].l?D[i].l:'未填写');
		v1.push(D[i].count1);
		v2.push(D[i].count2);
	}
	data = [{name:'上月',value:v1,color:'#32bdbc'},{name:'本月新增',value:v2,color:'#d75a5e'}];
	var chart = new iChart.ColumnStacked2D({
		render : 'canvasDiv',
		data: data,
		labels:labels,
		title : {
			text:'用户数排名前10的省份',
			color:'#254d70',
			textAlign:'left',
			padding:'0 40',
			font:'微软雅黑',
			border:{
				enable:true,
				width:[0,0,4,0],
				color:'#cccccc'
			},
			height:40
		},
		padding:'8 0',
		width : 800,
		height : 400,
		column_width:70,
		gradient : false,//应用背景渐变
		background_color : '#ffffff',
		sub_option:{
			label:{color:'#f9f9f9',fontsize:12,fontweight:600},
			border : false
		},
		label:{color:'#254d70',font:'微软雅黑',fontsize:12,fontweight:600},
		legend:{
			enable:true,
			background_color : null,
			line_height:25,
			color:'#254d70',
			fontsize:12,
			font:'微软雅黑',
			fontweight:600,
			border : {
				enable : false
			}
		},
		column_width:80,
		coordinate:{
			background_color : 0,
			grid_color:'#f0f0f0',
			axis : {
				color : '#c0d0e0',
				width : 0
			}, 
			scale:[{
				 position:'left',	
				 scale_enable : false,
				 start_scale:0,
				 scale_space:20000,
				 end_scale:max,
				 label:{color:'#254d70',fontsize:11,fontweight:600}
			}],
			width:'80%',
			height:'76%'
		}
	});

	//利用自定义组件构造左上侧单位
	chart.plugin(new iChart.Custom({
		drawFn:function(){
			//计算位置
			var coo = chart.getCoordinate(),
				x = coo.get('originx'),
				y = coo.get('originy');
			//在左上侧的位置，渲染一个单位的文字
			chart.target.textAlign('end')
			.textBaseline('bottom')
			.textFont('600 12px 微软雅黑')
			.fillText('会员数量(个)',x,y-14,false,'#254d70')
		}
	}));
	chart.draw();
});

</script>
</body>
</html>