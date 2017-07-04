<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
<meta charset="utf-8" />
<title>新用户注册</title>
<meta name="keyword" content="<?php echo ($title); ?>" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="msapplication-tap-highlight" content="no">
<meta name="format-detection" content="telphone=no, email=no" />
<link type="text/css" rel="stylesheet" href="/Public/res/css/css.css?v=20151126"/>
</head>
<body class="sign">
<div id="loading"><div><a></a></div></div>
<div class="t1"></div>
<div class="t2"></div>
<div class="t3"></div>
<div class="signIn" id="s1">
	<?php if(($$u['send']) == "0"): ?><h2>新用户注册</h2><?php else: ?><h2>修改资料</h2><?php endif; ?>
	<div class="sL1"><label>家长姓名:</label><div><input id="pname" value="<?php echo ($u['realname']); ?>" /></div></div>
	<div class="sL1"><label>手机号码:</label><div><input type="tel" value="<?php echo ($u['telephone']); ?>" maxlength="11" id="telephone"/></div></div>
	<div class="sL1"><label>孩子生日:</label><div><input type="date" value="<?php echo ($u['birthday']); ?>" id="birthday"/></div></div>
	<div class="sL2"><a onclick="s2();">知情同意书</a></div>
	<div class="sL3"><label class="agreen"><span class="radio"></span>我已阅读并同意《知情同意书》</label></div>
	<div class="sL5"><a id="submit">提交</a></div>
	<?php if(($u['send']) == "1"): ?><div><a href="/">进入商城</a></div><?php endif; ?>
</div>
<div class="signIn" id="s2">
	<h2>知情同意书</h2>
	<div>雀巢致消费者的承诺：</div>
	<p>尊敬的消费者，您好！感谢您选择雀巢产品！雀巢（中国）有限公司（以下简称“雀巢”）一直秉承严格的质量监控，致力于为消费者提供安全优质食品，为确保您可以享受到选择雀巢产品的相关服务，保障您的合法权益，请您务必仔细阅读以下服务条款：</p>
	<div>雀巢重视对消费者个人隐私权的保护，这也是雀巢为各位消费者设立本隐私权条款并将努力更新本条款的内容，使其更加全面并更加符合您的期望。</div>
	<div>1．	隐私权条款的适用范围</div>
	<div>在您自愿提供您的相关信息（例如您的姓名、电话、宝宝出生年月，以下简称个人信息）之后，将由雀巢根据本隐私权政策予以保护，除以本条款第3款信息的使用方式中规定的相关方式，使用您提交的个人信息之外，雀巢在未征得您许可的情况下，不会将该信息对外公开或提供给第三方。</div>
	<div>2．	可能要求您提供的信息类型</div>
	<div>（1）	个人信息（适用本隐私权条款）</div>
	<div>（2）	其他一般性统计信息（不适用本隐私权条款），包括任何有关您或您的宝宝的非身份性信息，例如您和您宝宝的性别、关于您的购买习惯、产品和品牌喜好、喂养方式等相关信息。</div>
	<div>3．	信息的使用方式</div>
	<div>您同意，雀巢按照如下方式，使用您选择雀巢产品时自愿提供的个人信息：</div>
	<div>（1）	向您提供更优质的服务，雀巢会对各类信息进行收集和整合，您应准确提供个人信息，以确保您能获得后续相关服务。雀巢不对由于您未能准确提供信息造成的任何损失承担任何责任。您需对由于您未能如实提供前述信息而引发的任何问题负责。</div>
	<div>（2）	雀巢将通过邮寄、电话或电子邮件等方式为您提供关于雀巢消费者可享受的各种服务的信息，可参加的各种活动信息，以及雀巢认为您会感兴趣的任何其他信息。</div>
	<div>（3）	为了方便雀巢了解您的需求，雀巢可能会将您的信息提供给第三方调研机构以征询您参加品牌调研的意向。</div>
	<div>（4）	雀巢将在如下情况发生时，向相关方提供或披露您的个人信息，您应对由此引发的任何问题承担全部责任：</div>
	<div>（i）	已获得您的授权公开或披露您的信息或资料；</div>
	<div>（ii）	因您受邀参加雀巢举办的活动或接受服务而需要将您提供的信息披露给雀巢委托的第三方公司；</div>
	<div>（iii）	按照相关法律法规的要求而公开或披露您的信息或资料；</div>
	<div>（iv）	按照相关政府主管部门的要求而公开或披露您的信息或资料；</div>
	<div>（v）	经您同意让任何第三方共享您的信息或资料。</div>
	<a class="sL6" onclick="s1()">继续注册</a>
</div>
<div id="s3">
	<article>
		<h2>恭喜您成为雀巢医疗营养品的尊贵会员！</h2>
		<p>感谢您信任雀巢医疗营养品，我们将秉承雀巢公司一贯的安全优质宗旨，竭诚为您孩子提供专业的全面营养支持解决方案。</p>
		<img src="/Public/res/images/t4.png" />
		<a href="/">进入商城</a>
	</article>
</div>
<script src="/Public/res/js/util/jquery-1.11.1.min.js"></script>
<script>
$("#loading").hide();
agreen=false;
$('.agreen').click(function(){
	$(this).children('span').toggleClass('on');
	agreen=!agreen;
});
$("#submit").click(function(){
	if(!agreen){return alert('请阅读并同意《知情同意书》');}
	var d={
		pname:$.trim($("#pname").val()),
		telephone:$.trim($("#telephone").val()),
		birthday:$.trim($("#birthday").val())
	}
	if(!d.pname||!d.telephone||!d.birthday){
		return alert('家长姓名，电话，宝宝生日不能为空');
	}
	$.ajax({
		url:'<?php echo U("Index/home/register");?>',
		data:d,
		beforeSend:function(){$("#loading").show();},
		success:function(D){
			$("#loading").hide();
			if(D.status==1){
				$("#s1").hide();
				$("#s3").show();
			}else{
				alert(D.msg);
			}
		},
		error:function(){$("#loading").hide();},
	});
});
function s1 () {$("#s1").show();$("#s2").hide();}
function s2 () {$("#s2").show();$("#s1").hide();}
</script>
</body></html>