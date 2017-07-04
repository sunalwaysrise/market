<?php if (!defined('THINK_PATH')) exit();?><h2>
	<span>产品中心</span>
	<a onclick="wx.Product.addDetail()" >添加产品</a>
</h2>
<ul class="line2">
	<?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li>
		<span>[库存:<?php echo ($v["count"]); ?>]
			<?php if(($v["status"]) == "1"): ?>[在售]<?php else: ?>[下架]<?php endif; ?>
			<?php echo ($v["title"]); ?></span>
		<a class="btn1" onclick="wx.Product.edit(<?php echo ($v["pid"]); ?>)">编辑</a>
		<a class="btn1" onclick="wx.Product.delDetail(this)" data_pid="<?php echo ($v["pid"]); ?>">删除</a>
	</li><?php endforeach; endif; else: echo "" ;endif; ?>
</ul>
<div class="pages" id="page"></div>
<script>wx.Product.page(<?php echo ($cur); ?>,<?php echo ($page); ?>);</script>