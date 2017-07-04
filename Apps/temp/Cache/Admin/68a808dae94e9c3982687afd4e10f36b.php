<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<title>编辑</title>
<meta name="author" content="luwenbin@live.com" />
<link type="text/css" rel="stylesheet" href="/Public/admin/css/style.css"/>
</head><body>
<form action="<?php echo U('updataDetail');?>" id="saveData" name="save" method="post" enctype="multipart/form-data" >
<ul class="list1">
<?php if(!empty($data['pid'])): ?><li><span>产品ID</span><div><?php echo ($data['pid']); ?></div></li>
<li><span>产品地址</span><code>http://m.leadmedia.com.cn/index/index/detail/id/<?php echo ($data['pid']); ?>.html</code></li><?php endif; ?>
<li><span>标题</span><div><input type="text" onblur="check(this)" required value="<?php echo ($data['title']); ?>" class="input1" id="title" name="title"/></div><i></i></li>
<li><span>类别</span>
	<select name="tags" id="tags">
		<?php if(is_array($l)): $i = 0; $__LIST__ = $l;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><option value="<?php echo ($v["tid"]); ?>"><?php echo ($v["name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
	</select>
</li>
<li><span>原价</span><div><input type="number" step="0.01" required min="1" value="<?php echo ($data['price0']); ?>" class="input1 input12" id="price0" name="price0"/></div><i></i></li>
<li><span>价格</span><div><input type="number" step="0.01" required min="1" value="<?php echo ($data['price']); ?>" class="input1 input12" id="price" name="price"/></div><i></i></li>
<li><span>缩略图1</span><div><input type="file" value="" name="icon1" class="input1" /></div><i>400x400</i></li>
<?php if(!empty($data['img1'])): ?></ul>
<div class="editImg editImgZ"><img src="/Public/Uploads/m<?php echo ($data['img1']); ?>" /><i onclick="delPic(this,1)">X</i></div>
<ul class="list1"><?php endif; ?>

<li><span>缩略图2</span><div><input type="file" value="" name="icon2" class="input1" /></div><i>400x400</i></li>
<?php if(!empty($data['img2'])): ?></ul>
<div class="editImg editImgZ"><img src="/Public/Uploads/m<?php echo ($data['img2']); ?>" /><i onclick="delPic(this,2)">X</i></div>
<ul class="list1"><?php endif; ?>

<li><span>缩略图3</span><div><input type="file" value="" name="icon3" class="input1" /></div><i>400x400</i></li>
<?php if(!empty($data['img3'])): ?></ul>
<div class="editImg editImgZ"><img src="/Public/Uploads/m<?php echo ($data['img3']); ?>" /><i onclick="delPic(this,3)">X</i></div>
<ul class="list1"><?php endif; ?>

<li><span>缩略图4</span><div><input type="file" value="" name="icon4" class="input1" /></div><i>400x400</i></li>
<?php if(!empty($data['img4'])): ?></ul>
<div class="editImg editImgZ"><img src="/Public/Uploads/m<?php echo ($data['img4']); ?>" /><i onclick="delPic(this,4)">X</i></div>
<ul class="list1"><?php endif; ?>

<li><span>缩略图5</span><div><input type="file" value="" name="icon5" class="input1" /></div><i>400x400</i></li>
<?php if(!empty($data['img5'])): ?></ul>
<div class="editImg editImgZ"><img src="/Public/Uploads/m<?php echo ($data['img5']); ?>" /><i onclick="delPic(this,5)">X</i></div>
<ul class="list1"><?php endif; ?>

<li><span>描述</span><div><input type="text" required value="<?php echo ($data['desc']); ?>" class="input1 input13" id="desc" name="desc"/></div><i></i></li>
<li><span>库存</span><div><input type="number" required value="<?php echo ($data['count']); ?>" class="input1 input12" id="count" name="count"/></div><i></i></li>
<li><span>是否促销</span><div>
<select name="sales">
  <option value="0" <?php if(($data["sales"]) == "0"): ?>selected<?php endif; ?>>否</option>
  <option value="1" <?php if(($data["sales"]) == "1"): ?>selected<?php endif; ?>>是</option>
</select>
</div></li>
<li><span>促销活动</span><div><input type="number" step="1" min="0" value="<?php echo ($data['salesnum']); ?>" class="input1 input12" id="salesnum" name="salesnum"/>送1</div><i></i></li>
<li><span>下架</span><div>
<select name="status">
  <option value="1" <?php if(($data["status"]) == "1"): ?>selected<?php endif; ?>>否</option>
  <option value="0" <?php if(($data["status"]) == "0"): ?>selected<?php endif; ?>>是</option>
</select>
</div></li>
<li><span>限购</span><div>
<select name="goodsonly" onchange="setOnly(this)">
  <option value="1" <?php if(($data["goodsonly"]) == "1"): ?>selected<?php endif; ?>>否</option>
  <option value="0" <?php if(($data["goodsonly"]) == "0"): ?>selected<?php endif; ?>>是</option>
</select>
</div></li>
<li class="goodonly" <?php if(($data["goodsonly"]) == "1"): ?>style="display:none"<?php endif; ?>><span>限购数量</span><div><input name="onlynum" value="<?php echo ($data['onlynum']); ?>" type="number" step="1" min="0" class="input1 input12" /></div></li>

<li class="goodonly" <?php if(($data["goodsonly"]) == "1"): ?>style="display:none"<?php endif; ?>><span>限购开始时间</span><div><input type="text" value="<?php echo ($data['onlytime']); ?>" class="input1" id="onlytime" name="onlytime"/></div></li>

<li><span>产地</span><div><input type="text" required value="<?php echo ($data['area']); ?>" class="input1" name="area"/></div><i></i></li>
<li><span>净含量</span><div><input type="text" required value="<?php echo ($data['hanliang']); ?>" class="input1" name="hanliang"/></div><i></i></li>
<li><span>有效期</span><div><input type="text" required value="<?php echo ($data['youxiaoqi']); ?>" class="input1" name="youxiaoqi"/></div><i></i></li>
<li><span>运费</span><div><input type="text" required value="<?php echo ($data['yunfei']); ?>" class="input1" name="yunfei"/></div><i></i></li>
</ul>
<div class="edior">
<textarea name="content" id="myEditor"><?php echo ($data['content']); ?></textarea>
</div>
<ul class="list1">
<li><span>
<input type="hidden" name="pid" value="<?php echo ($data['pid']); ?>"/>
<input type="hidden" name="img1" value="<?php echo ($data['img1']); ?>"/>
<input type="hidden" name="img2" value="<?php echo ($data['img2']); ?>"/>
<input type="hidden" name="img3" value="<?php echo ($data['img3']); ?>"/>
<input type="hidden" name="img4" value="<?php echo ($data['img4']); ?>"/>
<input type="hidden" name="img5" value="<?php echo ($data['img5']); ?>"/>
</span><div><a class="btn1" onclick="wx.Product.check()" >保存</a></div></li>
</ul>
</form>
<script src="/Public/admin/js/jquery.min.js"></script>
<script src="/Public/admin/js/base.js"></script>
<script src="/Public/admin/kindeditor/kindeditor.js"></script>
<script src="/Public/admin/kindeditor/lang/zh_CN.js"></script>
<script src="/Public/admin/js/lhgcalendar.min.js"></script>
<script type="text/javascript">
$('#onlytime').calendar({format:'yyyy-MM-dd HH:mm:ss'});
wx.Product.getTags2(<?php echo ($data['tags']); ?>);
var editor1;
KindEditor.ready(function(K) {
  editor1 = K.create('#myEditor', {
		resizeType:0,
		uploadJson : '/Public/admin/kindeditor/php/upload_json.php',
		fileManagerJson : '/Public/admin/kindeditor/php/file_manager_json.php',
		allowFileManager : true,
		afterCreate : function() {
			var self = this;
			K.ctrl(document, 13, function() {
				self.sync();
				K('form[name=save]')[0].submit();
			});
			K.ctrl(self.edit.doc, 13, function() {
				self.sync();
				K('form[name=save]')[0].submit();
			});
		}
	});
});
function check(o){
	v=$(o).val();
	if(v.indexOf(',')!=-1){
		alert('标题不能含有,');
		var d=v.replace(',','-');
		$(o).val(d);
	}
}
var msg="<?php echo ($msg); ?>";
if(msg){
	alert(msg);
}
function delPic(o,i){
	if(confirm('确认删除?')){
		$(o).parent().remove();
		$("input[name='img"+i+"']").val("");
	}
}
function setOnly(o){
	if($(o).val()=="0"){
		$(".goodonly").show();
	}else{
		$(".goodonly").hide();
	}
}
</script>
</body>
</html>