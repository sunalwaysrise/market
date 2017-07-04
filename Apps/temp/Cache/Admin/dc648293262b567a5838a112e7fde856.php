<?php if (!defined('THINK_PATH')) exit();?><h2><span>微会员</span></h2>
<div class="toolBar">
	<div class="input_4 input4 input6">
		<input value='<?php echo ($openid); ?>' placeholder='openid' id='openid'/>
	</div>
	<div class='input_4 input4'>
		<input value='<?php echo ($nickname); ?>' placeholder='微信昵称' id='nickname'/>
	</div>
	<a class="btn1" onclick='wx.Member.search()'>搜索</a>
		<a class="btn1" style="float:right" href='/Admin/Member/down' target="_blank">下载</a>

</div>
<table class="table1">
	<thead class="tableHead1">
		<tr>
			<td>头像</td>
			<td>属于</td>
			<td width="100px;">openid</td>
			<td>微信昵称</td>
			<td width="20%">注册时间</td>
			<td width="100px">购次</td>
			<td width="100px">均价</td>
			<td></td>
			<td></td>
		</tr>
	</thead>
	<tbody>
<?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
	<td> <img src="<?php echo ($vo["wxhead"]); ?>" style='width:75px;height:75px;'></td>
	<td>
		<?php if(empty($vo["pid"])): ?>无
			<?php else: ?>
			<a onclick="wx.Seller.detail(<?php echo ($vo["pid"]); ?>)">点击查看</a><?php endif; ?>
		<?php echo ($vo["nickname"]); ?></td>
	<td><?php echo ($vo["openid"]); ?></td>
	<td><?php echo ($vo["wxname"]); ?></td>
	<td><?php echo (date("Y-m-d H:i:s",$vo["register"])); ?></td>
	<td><?php echo ($vo["uo"]["c"]); ?></td>
	<td><?php echo ($vo["uo"]["cp"]); ?></td>
	<td><a class="btn1" onclick="wx.Member.change(this,<?php echo ($vo["uid"]); ?>)">设置为代理</a></td>
	<td><a href="<?php echo U('Admin/Member/order',array('id'=>$vo["openid"]));?>" target="_blank">查看订单</a></td>
</tr><?php endforeach; endif; else: echo "" ;endif; ?>
	</tbody>
</table>
<div class="pages" id="page"></div>
<script>wx.Member.page(<?php echo ($p); ?>,<?php echo ($count); ?>);</script>