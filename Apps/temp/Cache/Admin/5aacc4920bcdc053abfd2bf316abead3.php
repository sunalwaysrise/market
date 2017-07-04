<?php if (!defined('THINK_PATH')) exit();?><h2><span>数据报表</span></h2>
<div class="toolBar">
  <div class="input_4 input4">
    <input class="datepicker" value='<?php echo ($beginT); ?>' placeholder='开始时间' id='beginT'/>
  </div>
  <div class='input_4 input4'>
    <input class="datepicker" value='<?php echo ($endT); ?>' placeholder='结束时间' id='endT'/>
  </div>
  <div class="input5">
    <span id="order_con">销售代表ID</span><input id='pid' value='<?php echo ($pid); ?>'/>
  </div>
  <a class="btn1" onclick='wx.Report.search()'>搜索</a>
  <a class="btn1" style="float:right" onclick='wx.Report.down()'>GBK下载</a>
  <a class="btn1" style="float:right;margin-right:10px;" onclick='wx.Report.down2()'>UTF8下载</a>
</div>
<table class="table1">
  <thead class="tableHead1">
    <tr>
      <td width="80px">单号</td>
      <td width="100px">收货人</td>
      <!-- <td width="100px">电话</td> -->
      <td width="60px">省</td>
      <td width="60px">市</td>
      <td width="60px">总金额</td>
      <td >下单时间</td>
      <td width="80px">支付时间</td>
      <td width="110px">支付单号</td>
      <td >发票信息</td>
      <td width="80px">快递信息</td>
      <td width="80px">快递时间</td>
      <td>销售代表(ID)</td>
      <td width="85px">订单状态</td>
      <td width="85px">优惠券</td>
      <td width="85px">优惠券价值</td>
    </tr>
  </thead>
  <tbody>
    <?php if(is_array($list)): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><tr>
        <td><?php echo ($v["oid"]); ?></td>
        <td><?php echo ($v["nickname"]); ?></td>
        <!-- <td><?php echo ($v["phone"]); ?></td> -->
        <td><?php echo ($v["shen"]); ?></td>
        <td><?php echo ($v["shi"]); ?></td>
        <td><?php echo ($v["price"]); ?></td>
        <td><?php echo (date('Y-m-d H:i:s',$v["time"])); ?></td>
        <td><?php if(!empty($v["paytime"])): echo (mydate($v["paytime"])); endif; ?></td>
        <td><?php echo ($v["paycode"]); ?></td>
        <td><?php echo ($v["piao"]); ?></td>
        <td><?php echo ($v["kd"]); ?></td>
        <td><?php if(!empty($v["kdtime"])): echo (date('Y-m-d H:i:s',$v["kdtime"])); endif; ?></td>
        <td><?php if(!empty($v["pid"])): echo ($v["pwxname"]); ?>(<?php echo ($v["pid"]); ?>)<?php endif; ?></td>
        <td>
          <?php switch($v["status"]): case "1": ?>待付款<?php break;?>
            <?php case "2": ?>已支付<?php break;?>
            <?php case "3": ?>待发货<?php break;?>
            <?php case "4": ?>已发货<?php break;?>
            <?php case "5": ?>已签收<?php break;?>
            <?php case "6": ?>已完成<?php break;?>
            <?php case "7": ?>已过期<?php break;?>
            <?php case "8": ?>已取消<?php break; endswitch;?>
        </td>
        <td><?php if(!empty($v["couponsid"])): echo ($v["couponsid"]); else: ?>未使用<?php endif; ?></td>
        <td><?php if(!empty($v["couponsid"])): echo ($v["coupons"]); ?>元<?php endif; ?></td>
      </tr><?php endforeach; endif; else: echo "" ;endif; ?>
  </tbody>
</table>
<div class="pages" id="page"></div>
<script>wx.Report.page(<?php echo ($p); ?>,<?php echo ($count); ?>);</script>