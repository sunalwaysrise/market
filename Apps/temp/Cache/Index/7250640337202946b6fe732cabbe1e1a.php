<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cmn-Hans" ng-app="tuan">
<head>
<meta charset="utf-8" />
<title><?php echo ($title); ?></title>
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
<div class="header1 header_guide">服务指南</div>
<?php if(!empty($bannerTop)): ?><div class="bannerTop2C">
	<div class="bannerTop2">
		<a href="http://<?php echo ($bannerTop["link"]); ?>"><img src="/Public/Uploads/<?php echo ($bannerTop["image"]); ?>" /></a>
	</div></div><?php endif; ?>
<div class="guide">
	<div class="guide_nav">
		<a href="#as_1" class="as_1">正品保证</a>
		<a href="#as_2" class="as_2">购买方式</a>
		<a href="#as_3" class="as_3">支付方式</a>
		<a href="#as_4" class="as_4">配送方式</a>
		<a href="#as_5" class="as_5">退换政策</a>
		<a href="#as_6" class="as_6">退款Q&A</a>
	</div>
	<ul>
		<li>
			<h2 id="as_1">正品保证</h2>
			<p>本商城为雀巢健康科学官方旗舰店，所有商品及服务均为雀巢健康科学公司直接提供，您在中国大陆地区所购买的所有雀巢健康科学公司的医疗营养品均可以在本平台进行防伪查验，欢迎使用雀巢医疗营养品<a target="_blank" href="http://wap.koudaitong.com/v2/showcase/mpnews?alias=1erff5z0d&spm=h55371_h55371_f5242796">防伪验真</a>服务。</p>
		</li>
		<li>
			<h2 id="as_2">购买方式</h2>
			<p>参照具体<a target="_blank" href="http://wap.koudaitong.com/v2/showcase/mpnews?alias=1f20ilzx9&spm=m142683344638578491783799.scan.3973145482">购物流程</a>进行购买，如需发票，我们将在两个工作日内开出，另单寄送，不随货同寄。另外本商城支持购物车功能，可多种商品合并购买。</p>
		</li>
		<li>
			<h2 id="as_3">支付方式</h2>
			<p>本商城支持微信钱包支付，不支持支付宝付款。</p>
		</li>
		<li>
			<h2 id="as_4">配送方式</h2>
			<p>本商城商品全部免运费，采用顺丰物流全程配送，配送范围覆盖全国大部分地区（港澳台除外）。全部货物从北京发出，北京、天津、河北通常次日到货；江浙沪等地2-3天；新疆、西藏、广西、内蒙古3-5天到货。</p>
			<p>在工作日情况下，如果在当天下午5点前完成支付，可当日发货；若下午5点以后完成支付，则在次日发货。由于本平台尚不支持周末及节假日发货，在节假日期间，以及前一天下午5点以后所产生的订单，将顺延至节假日结束后第一个工作日发货。</p>
		</li>
		<li>
			<h2 id="as_5">退换货政策</h2>
			<p>由于雀巢医疗营养品平台所售商品属于特殊属性商品，如果您已对所购商品进行签收，若非质量问题所引起的退货，将不予处理，还请在购买前对商品进行专业咨询(雀巢消费者热线：400 610 4868)。</p>
			<p>若商品存在质量问题（罐体破损、内容物结块、有异物等），可自商品签收日起7日内申请退货，15日内申请换货。<br/>
				<a target="_blank" href="http://wap.koudaitong.com/v2/showcase/mpnews?alias=195i23uhz&spm=m1426834275762368062481418.scan.3181057534">#退换货流程#</a></p>
		</li>
		<li>
			<h2 id="as_6">退款方式Q&A</h2>
			<p>问：怎么申请退款？</p>
			<div>答：请参照<a target="_blank" href="http://wap.koudaitong.com/v2/showcase/mpnews?alias=rtgtacb1&spm=h55371_h55371_f5242796">微信钱包退款流程</a>操作，并确认退款申请成功，如有问题请与客服联系申请退款</div>
			<p>问：退货后什么时候退款？钱退到哪里？</p>
			<div>
				<p>答：我们将在收到退货包裹3日内办理退款。</p>
				<div>1）使用储蓄卡、信用卡支付，退款原路退回到您的账户，按银行规定10-15个工作日到账。</div>
				<div>2）使用微信钱包支付，退款1-7个工作日后退回至微信钱包。</div>
			</div>
			<p>问：退货金额与商品价格不一致？</p>
			<div>答：您购买的商品如有参加满减或打折活动，退款金额按实际支付金额退回。</div>
		</li>
	</ul>
</div>
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
              <?php $__FOR_START_851746374__=0;$__FOR_END_851746374__=$canBuy;for($i=$__FOR_START_851746374__;$i < $__FOR_END_851746374__;$i+=1){ ?><option value="<?php echo ($i+1); ?>"><?php echo ($i+1); ?></option><?php } ?>
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
<script>$("#nav_2").addClass('cur')</script>
</body>
</html>