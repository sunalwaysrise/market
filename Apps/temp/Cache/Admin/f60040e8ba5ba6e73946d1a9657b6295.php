<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<title>报表</title>
<meta name="author" content="luwenbin@live.com" />
<link type="text/css" rel="stylesheet" href="/Public/admin/css/style.css"/>
<style type="text/css">
#canvasDiv{width:900px;height:420px;padding:10px;}
</style>
</head><body>
<div id='canvasDiv'></div>
<script src="/Public/admin/js/jquery.min.js"></script>
<script src="/Public/admin/js/base.js"></script>
<script src="/Public/admin/js/ichart.latest.min.js"></script>
<script type="text/javascript">
$.get("<?php echo U('monthfans_');?>",function(D){
	console.log(D)
	var i=0,flow=[],labels=[];
	for(i;i<D.length;i++){
		labels.push(D[i].time);
		flow.push(D[i].num);
	}
	var data = [{name : '人',value:flow,color:'#0d8ecf',line_width:1}];
	var line = new iChart.LineBasic2D({
		render : 'canvasDiv',
		data: data,
		align:'center',
		title : '每个月最后一天的会员数',
		width : 900,
		height : 400,
		sub_option:{
			smooth : true,//平滑曲线
			point_size:10
		},
		tip:{
			enable:true,
			shadow:true
		},
		legend : {
			enable : false
		},
		crosshair:{
			enable:true,
			line_color:'#62bce9'
		},
		coordinate:{
			width:800,
			valid_width:800,
			height:320,
			axis:{
				color:'#9f9f9f',
				width:[0,0,2,2]
			},
			grids:{
				vertical:{
					way:'share_alike',
			 		value:10
				}
			},
			scale:[{position:'left'},{position:'bottom',labels:labels}]
		}
	});
	line.draw();
});

</script>
</body>
</html>