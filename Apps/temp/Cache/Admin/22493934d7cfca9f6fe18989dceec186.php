<?php if (!defined('THINK_PATH')) exit();?><h2><span>评论管理</span></h2>
<table class="table1">
	<thead class="tableHead1">
		<tr>
			<td width="120px">评论商品</td>
			<td width="80px">头像</td>
			<td width="120px">昵称</td>
      <td>评论内容</td>
      <td>回复内容</td>
			<td width="110px">评论时间</td>
			<td width="80px"></td>
			<td width="80px"></td>
		</tr>
	</thead>
	<tbody>
		<?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><tr>
			<td><?php echo ($v["p"]["title"]); ?></td>
			<td><img src="<?php echo ($v["headimg"]); ?>" style='width:75px;height:75px;'></td>
			<td><?php echo ($v["nickname"]); ?></td>
			<td><?php echo ($v["content"]); ?></td>
			<td id="comment_detail_<?php echo ($v["id"]); ?>"><?php echo ($v["reply"]); ?></td>
			<td><?php echo (date('Y-m-d H:i:s',$v["time"])); ?></td>
			<td><a onclick='wx.Comment.reply(<?php echo ($v["id"]); ?>,this)'>回复</a></td>
			<td><a onclick='wx.Comment.del(<?php echo ($v["id"]); ?>,this)'>删除</a></td>
		</tr><?php endforeach; endif; else: echo "" ;endif; ?>
	</tbody>
</table>
<div class="pages" id="page"></div>
<script>wx.Comment.page(<?php echo ($p); ?>,<?php echo ($count); ?>);</script>