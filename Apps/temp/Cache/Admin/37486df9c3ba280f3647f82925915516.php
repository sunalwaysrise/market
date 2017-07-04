<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<title>编辑</title>
<meta name="author" content="luwenbin@live.com" />
<link type="text/css" rel="stylesheet" href="/Public/admin/css/style.css"/>
</head><body>
<form action="<?php echo U('updataDetail2');?>" id="saveData" name="save" method="post" enctype="multipart/form-data" >
<ul class="list1">
<li><span>链接</span><div><input type="text" required value="<?php echo ($data['link']); ?>" class="input1" name="link"/></div><i></i></li>
<li><span>缩略图</span><div><input type="file" value="" name="icon2" class="input1" /></div><i>640x200</i></li>
<?php if(!empty($data['image'])): ?></ul>
<div class="editImg editImgB"><img src="/Public/Uploads/<?php echo ($data['image']); ?>" /></div>
<ul class="list1"><?php endif; ?>
<li><span>
<input type="hidden" name="id" value="<?php echo ($data['id']); ?>"/>
<input type="hidden" name="image" value="<?php echo ($data['image']); ?>"/>
</span><div><input class="btn1" type="submit" value="保存" /></div></li>
</ul>
</form>
<script src="/Public/admin/js/jquery.min.js"></script>
<script src="/Public/admin/js/base.js"></script>
</body>
</html>