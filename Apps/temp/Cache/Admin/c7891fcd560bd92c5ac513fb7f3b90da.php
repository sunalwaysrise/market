<?php if (!defined('THINK_PATH')) exit();?><h2><span>今日订单</span></h2>

<h3>待发货(<?php echo ($l2c); ?>)</h3>
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
		<?php if(is_array($l2)): $i = 0; $__LIST__ = $l2;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
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

<h3>全部订单(<?php echo ($l1c); ?>)</h3>
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
		<?php if(is_array($l1)): $i = 0; $__LIST__ = $l1;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
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

<h3>已完成(<?php echo ($l3c); ?>)</h3>
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
		<?php if(is_array($l3)): $i = 0; $__LIST__ = $l3;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i;?><tr>
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