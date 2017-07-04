<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cmn-Hans" ng-app="tuan">
<head>
<meta charset="utf-8" />
<title><?php echo ($title); ?></title>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="expires" content="0"/>
<meta name="keyword" content="<?php echo ($title); ?>" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="msapplication-tap-highlight" content="no">
<meta name="format-detection" content="telphone=no, email=no" />
<link type="text/css" rel="stylesheet" href="/Public/res/css/css.css?v=20151126"/>
</head>
<body>
<div id="loading"><div><a></a></div></div>
<div id="Warp">
<div class="header1 header_order">我的订单</div>
<nav class="goodsNav">
	<a href="<?php echo U('Index/index/home',array('t'=>1));?>" class="goodNav1 <?php if(($nav) == "1"): ?>cur<?php endif; ?>" >未付款</a>
	<a href="<?php echo U('Index/index/home',array('t'=>2));?>" class="goodNav2 <?php if(($nav) == "2"): ?>cur<?php endif; ?>" >已付款</a>
	<a href="<?php echo U('Index/index/home',array('t'=>4));?>" class="goodNav3 <?php if(($nav) == "4"): ?>cur<?php endif; ?>" >已配送</a>
	<a href="<?php echo U('Index/index/home',array('t'=>6));?>" class="goodNav4 <?php if(($nav) == "6"): ?>cur<?php endif; ?>" >已完成</a>
	<a href="<?php echo U('Index/index/home',array('t'=>8));?>" class="goodNav5 <?php if(($nav) == "8"): ?>cur<?php endif; ?>" >已取消</a>
</nav>
<div id="orderList"></div>
<div id="end">没有更多了...</div>
  <div id="car">
    <div class="car_msk"></div>
    <div class="car">
      <div id="close"></div>
      <div id="carList"></div>
      <div class="bottom"><span id="total"></span><a id="step1">结算</a></div>
    </div>
  </div>
  <ul id="nav" class="nav">
    <li><a id="nav_1" href="<?php echo U('Index/index/index');?>">商城主页</a></li>
    <li><a id="nav_2" href="<?php echo U('Index/index/guide');?>">服务指南</a></li>
    <li><a id="carBtn">购物车</a></li>
    <li><a id="nav_4" href="<?php echo U('Index/index/home');?>">我的订单</a></li>
  </ul>
</div>
<div id="address">
  <div class="address">
    <div id="close2"></div>
    <h2>收货地址</h2>
    <ul class="addressUl">
      <?php if(($only) == "9"): ?><li id="qqNum"><label>数量</label><div class="setqqN"><a onclick="QC.buy.quick.sub(this)">-</a><b>1</b><a onclick="QC.buy.quick.plus(this)">+</a></div></li><?php endif; ?>
      <?php if(($only) == "1"): ?><li id="qqNum"><label>数量</label>
          <div class="setqqN">
            <select id="onlyBuyNum">
              <?php $__FOR_START_167767985__=0;$__FOR_END_167767985__=$canBuy;for($i=$__FOR_START_167767985__;$i < $__FOR_END_167767985__;$i+=1){ ?><option value="<?php echo ($i+1); ?>"><?php echo ($i+1); ?></option><?php } ?>
            </select>
          </div></li><?php endif; ?>
      <li><label>收货人</label><div><input id="nickname" placeholder="名字" /></div></li>
      <li><label>联系电话</label><div><input id="phone" type="tel" maxlength="12" placeholder="手机或固话"/></div></li>
      <li>
        <label>选择地区</label>
        <div>
          <em><select id="shen" onchange="QC.address.change(this)"></select></em>
          <em><select id="shi"></select></em>
        </div>
      </li>
      <li><label>详细地址</label><div><input id="uaddress" placeholder="街道门牌信息" /></div></li>
      <li><label>邮政编码</label><div><input type="tel" id="code" placeholder="邮政编码(选填)" /></div></li>
      <li><label>发票信息</label><div><input id="piao" placeholder="发票信息(选填)" /></div></li>
      <li id="qqNum2"><label>总计</label><div><span id="total2"></span></div></li>
    </ul>
    <ul class="coupons" id="coupons">
      <li>
        <label>优惠券</label>
        <div><span id="coupons0">选择优惠券</span>
          <select id="coupons1">
            
          </select>
        </div>
      </li>
      <li>
        <input placeholder="输入优惠码" value="" id="coupons2" />
      </li>
    </ul>
    <ul class="addressUl pm60">
      <li id="tt3"></li>
    </ul>
    <div class="bottom"><div id="submitData" onclick="QC.address.save();">确认下单</div></div>
  </div>
</div>
<?php if(($notFocus) == "1"): ?><div id="notFocus">
    <div class="notFocus">
      <h2>您还未关注我们哦~</h2>
      <a href="">去关注</a>
      </div>
  </div><?php endif; ?>

<script src="//apps.bdimg.com/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="/Public/res/js/common.js?v=20160127"></script>
<script>
QC.car.init();
QC.address.init();
var shareURL=encodeURIComponent(window.location.href);
if(1==2){
$.get('/index/home/getSignPackageBack?url='+shareURL,function(d){
  var share={
    t:'<?php echo ($title); ?>',
    d:"<?php echo ($title); ?>",
    l:d.url,
    i:"http://m.leadmedia.com.cn/Public/res/image/logo2.png"
  };
  <?php if(!empty($shareImg)): ?>share.i="http://m.leadmedia.com.cn/Public/Uploads/m<?php echo ($banner[0]); ?>";<?php endif; ?>
  wx.config({
    debug:false,
    appId:d.appId,
    timestamp:d.timestamp,
    nonceStr:d.nonceStr,
    signature:d.signature,
    jsApiList:['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo']
  });
  wx.ready(function(){
    wx.checkJsApi({
      jsApiList:['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'],
      success:function(res){}
    });
    wx.onMenuShareTimeline({
      title:share.t,
      link:share.l,
      imgUrl:share.i,
      success:function(res){},
      cancel:function(res){},
    });
    wx.onMenuShareAppMessage({
      title:share.t,
      desc:share.d,
      link:share.l,
      imgUrl:share.i,
      trigger:function(res){},
      success:function(res){},
      cancel:function(res){},
      fail:function(res){}
    });
    wx.onMenuShareQQ({
      title:share.t,
      desc:share.d,
      link:share.l,
      imgUrl:share.i,
      trigger:function(res){},
      complete:function(res){},
      success:function(res){},
      cancel:function(res){},
      fail:function(res){}
    });
    wx.onMenuShareWeibo({
      title:share.t,
      desc:share.d,
      link:share.l,
      imgUrl:share.i,
      trigger:function(res){},
      complete:function(res){},
      success:function(res){},
      cancel:function(res){},
      fail:function(res){}
    });
  });
  wx.error(function(res){
    console.log(res);
  });
});
}
</script>
<script>
$("#nav_4").addClass('cur');
$("body").css({"background":"#ffffff"});
QC.history.t='<?php echo ($nav); ?>';
QC.history.p=0;
QC.history.list();
$(window).scroll(function(){
  var scrollTop = $(this).scrollTop(),scrollHeight = $(document).height(),windowHeight = $(this).height();
  if(scrollTop + windowHeight >= scrollHeight){
    if(!QC.history.end || !QC.history.lock){
      QC.history.list();
    }
  }
});
</script>
</body>
</html>