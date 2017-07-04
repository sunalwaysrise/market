<?php if (!defined('THINK_PATH')) exit();?><h2>
	<span>Banner管理</span>
	<a onclick="wx.Banner.addDetail()" >添加Banner</a>
</h2>
<ul class="line2">
	<?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
		<span><?php echo ($v["title"]); ?></span>
		<a class="btn1" onclick="wx.Banner.edit(<?php echo ($v["bid"]); ?>)">编辑</a>
		<a class="btn1" onclick="wx.Banner.delDetail(this)" data_pid="<?php echo ($v["bid"]); ?>">删除</a>
	</li><?php endforeach; endif; else: echo "" ;endif; ?>
</ul>
<div class="pages">
<?php $__FOR_START_809466174__=0;$__FOR_END_809466174__=$page;for($i=$__FOR_START_809466174__;$i < $__FOR_END_809466174__;$i+=1){ if($i == $cur): ?><span><?php echo ($i+1); ?></span>
	<?php else: ?>
		<a onclick="wx.Banner.index(<?php echo ($i); ?>)"><?php echo ($i+1); ?></a><?php endif; } ?>
</div>