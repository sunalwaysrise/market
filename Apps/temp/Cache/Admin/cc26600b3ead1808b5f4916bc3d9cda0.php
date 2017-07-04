<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<title>会员中心</title>
<meta name="author" content="luwenbin@live.com" />
<link type="text/css" rel="stylesheet" href="/Public/admin/css/style.css"/>
</head><body>
<div class="top">
  <h1></h1>
  <div class="topBar"><a>欢迎 <?php echo ($username); ?> 登录，请慎重操作后台</a></div>
</div>
<div class="main">
  <h2 class="content2"><span><?php echo ($use['wxname']); ?>的购买记录</span></h2>
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
      <td rowspan="2"><?php echo ($vo["oid"]); ?></td>
      <td><?php echo ($vo["u"]["wxname"]); ?></td>
      <td id="list_nickname_<?php echo ($vo["oid"]); ?>"><?php echo ($vo["nickname"]); ?></td>
      <td><?php echo ($vo["shen"]); ?>-<?php echo ($vo["shi"]); ?>-<?php echo ($vo["address"]); ?>-(<?php echo ($vo["code"]); ?>)</td>
      <td><?php echo ($vo["price"]); ?></td>
      <td><?php echo (date('Y-m-d H:i:s',$vo["time"])); ?></td>
      <td><?php if(!empty($vo["paytime"])): echo (date('Y-m-d H:i:s',$vo["paytime"])); endif; ?></td>
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
</div>
<div id="tip"></div>
<script src="/Public/admin/js/jquery.min.js"></script>	
<script src="/Public/admin/js/jquery.Form.js"></script>
<script src="/Public/admin/js/base.js"></script>
<script src="/Public/admin/js/datepicker.js"></script>
<script src="/Public/admin/js/lhgcalendar.min.js"></script>

<script>
wx.Member.orderopenid="<?php echo ($openid); ?>";
wx.Member.page3(<?php echo ($p); ?>,<?php echo ($count); ?>);
</script>
</body>
</html>