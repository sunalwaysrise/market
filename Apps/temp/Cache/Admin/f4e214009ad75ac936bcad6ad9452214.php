<?php if (!defined('THINK_PATH')) exit();?><h2><span>订单中心</span></h2>
<div class="toolBar">
	<div class="input_4 input4">
		<input class="datepicker" value='<?php echo ($beginT); ?>' placeholder='开始时间' id='beginT'/>
	</div>
	<div class='input_4 input4'>
		<input class="datepicker" value='<?php echo ($endT); ?>' placeholder='结束时间' id='endT'/>
	</div>
	<div class="input5">
		<span id="order_con">
			<?php if(empty($ct)): ?>订单号
				<?php else: ?>
				<?php echo ($ct); endif; ?>
		</span>
		<input id='condition' value='<?php echo ($condition); ?>'/>
		<div id="order_conc"><p>订单号</p><p>支付单号</p><p>收货人</p></div>
	</div>
	<div class="select">
		<select id="status">
			<option value="0" <?php if(($status) == "0"): ?>selected<?php endif; ?> >订单状态</option>
			<option value="1" <?php if(($status) == "1"): ?>selected<?php endif; ?> >待付款</option>
			<option value="2" <?php if(($status) == "2"): ?>selected<?php endif; ?> >已支付</option>
			<option value="3" <?php if(($status) == "3"): ?>selected<?php endif; ?> >待发货</option>
			<option value="4" <?php if(($status) == "4"): ?>selected<?php endif; ?> >已发货</option>
			<option value="5" <?php if(($status) == "5"): ?>selected<?php endif; ?> >已签收</option>
			<option value="6" <?php if(($status) == "6"): ?>selected<?php endif; ?> >已完成</option>
			<option value="7" <?php if(($status) == "7"): ?>selected<?php endif; ?> >已过期</option>
			<option value="8" <?php if(($status) == "8"): ?>selected<?php endif; ?> >已取消</option>
		</select>
	</div>
	<a class="btn1" onclick='wx.Order.search()'>搜索</a>

	<a class="btn1" style="float:right;margin-right:10px;" onclick='wx.Order.tongbu()'>同步订单</a>
</div>
<table class="table1">
	<thead class="tableHead1">
		<tr>
			<td width="40px">单号</td>
			<td width="80px">微信昵称</td>
			<td width="50px">收货人</td>
			<td>地址</td>
      <td width="60px">总金额</td>
      <td width="80px">下单时间</td>
      <td width="80px">支付时间</td>
      <td width="100px">支付单号</td>
      <td width="80px">快递信息</td>
      <td width="80px">快递时间</td>
      <td width="80px">发票信息</td>
      <td width="40px">订单状态</td>
			<td width="40px">管理</td>
		</tr>
	</thead>
	<tbody>
		<?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
			<td rowspan="2"><?php echo ($vo["oid"]); if(($vo["isnew"]) == "1"): ?><i class="newOrder"></i><?php endif; ?></td>
			<td><?php echo ($vo["u"]["wxname"]); ?></td>
			<td id="list_nickname_<?php echo ($vo["oid"]); ?>"><?php echo ($vo["nickname"]); ?></td>
			<td><?php echo ($vo["shen"]); ?>-<?php echo ($vo["shi"]); ?>-<?php echo ($vo["address"]); ?>-(<?php echo ($vo["code"]); ?>)</td>
			<td><?php echo ($vo["price"]); ?></td>
			<td><?php echo (date('Y-m-d H:i:s',$vo["time"])); ?></td>
			<td><?php if(!empty($vo["paytime"])): echo (mydate($vo["paytime"])); endif; ?></td>
			<td><?php echo ($vo["paycode"]); ?></td>
			<td><?php echo ($vo["kd"]); echo ($vo["kdcode"]); ?></td>
			<td><?php if(!empty($vo["kdtime"])): echo (date('Y-m-d H:i:s',$vo["kdtime"])); endif; ?></td>
			<td><?php echo ($vo["piao"]); ?></td>
			<td rowspan="2" id="list_status_<?php echo ($vo["oid"]); ?>">
				<?php switch($vo["status"]): case "1": ?>待付款<?php break;?>
					<?php case "2": ?>已支付<?php break;?>
					<?php case "3": ?>待发货<?php break;?>
					<?php case "4": ?>已发货<?php break;?>
					<?php case "5": ?>已签收<?php break;?>
					<?php case "6": ?>已完成<?php break;?>
					<?php case "7": ?>已过期<?php break;?>
					<?php case "8": ?>已取消<?php break; endswitch;?>
			</td>
			<td rowspan="2"><a onclick='wx.Order.detail(<?php echo ($vo["oid"]); ?>)'>管理</a></td>
		</tr>
		<tr><td colspan="10" style="text-align:left"><?php echo ($vo["desc"]); ?></td></tr><?php endforeach; endif; else: echo "" ;endif; ?>
	</tbody>
</table>
<div class="pages" id="page"></div>
<script>wx.Order.page(<?php echo ($p); ?>,<?php echo ($count); ?>);</script>