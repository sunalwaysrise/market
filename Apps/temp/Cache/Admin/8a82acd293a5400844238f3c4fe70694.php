<?php if (!defined('THINK_PATH')) exit();?><h2><span>管理员管理</span><a onclick="wx.My.add()">添加管理员</a></h2>
<ul class="line2">
<?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
	<span><?php echo ($v["username"]); ?></span>
	<a class="btn1" onclick="wx.My.edit(<?php echo ($v["id"]); ?>)">编辑</a>
	<a class="btn1" onclick="wx.My.delete(this,<?php echo ($v["id"]); ?>)">删除</a>
</li><?php endforeach; endif; else: echo "" ;endif; ?>
</ul>