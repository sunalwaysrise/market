<?php if (!defined('THINK_PATH')) exit();?><h2>
	<span>标签管理</span>
</h2>
<ul class="line2">
	<?php if(is_array($l)): $i = 0; $__LIST__ = $l;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
		<span><input value="<?php echo ($v["name"]); ?>" class="input1"></span>
		<a class="btn1" onclick="wx.Tags.edit(this,<?php echo ($v["tid"]); ?>)">修改</a>
		<a class="btn1" onclick="wx.Tags.del(this,<?php echo ($v["tid"]); ?>)">删除</a>
	</li><?php endforeach; endif; else: echo "" ;endif; ?>
	<li>
		<span><input id="newTagName" value="" class="input1"></span>
		<a class="btn1" onclick="wx.Tags.add()">添加</a>
	</li>
</ul>