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
<li><span>标题</span><div><input type="text" name="title" class="input1" value="<?php echo ($data['title']); ?>"/></div><i></i></li>
<li><span>链接</span><div><input type="text" required value="<?php echo ($data['link']); ?>" class="input1" name="link"/></div><i></i></li>
<li><span>缩略图</span><div><input type="file" value="" name="icon2" class="input1" /></div><i>640x280</i></li>
<?php if(!empty($data['image'])): ?></ul>
<div class="editImg editImgB"><img src="/Public/Uploads/<?php echo ($data['image']); ?>" /></div>
<ul class="list1"><?php endif; ?>

<li><span>展示中</span><div>
<select name="status">
  <option value="1" <?php if(($data["status"]) == "1"): ?>selected<?php endif; ?>>是</option>
  <option value="0" <?php if(($data["status"]) == "0"): ?>selected<?php endif; ?>>否</option>
</select>
</div></li>
<li><span>
<input type="hidden" name="bid" value="<?php echo ($data['bid']); ?>"/>
<input type="hidden" name="image" value="<?php echo ($data['image']); ?>"/>
</span><div><input class="btn1" type="submit" value="保存" /></div></li>
</ul>
</form>
<script src="/Public/admin/js/jquery.min.js"></script>
<script src="/Public/admin/js/base.js"></script>
</body>
</html>