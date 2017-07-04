<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<title>登录</title>
<meta name="author" content="luwenbin@live.com" />
<link type="text/css" rel="stylesheet" href="/Public/admin/css/style.css"/>
</head>
<body style="background:#f0f0f0">
<div class="login">
	<div class="title">登录</div>
	<div class="line"><label>用户名</label><input id="username" type="text" class="input1"/></div>
	<div class="line"><label>密码</label><input id="password" type="password" class="input1"/></div>
	<div class="line"><label>验证码</label><input id="verify" type="text" class="input1 input11"/><img src="<?php echo U('Login/verify');?>" id="verifySrc"/></div>
	<div class="line line0"><a class="btn1" id="login">登录</a></div>
</div>
<script src="/Public/admin/js/jquery.min.js"></script>	
<script src="/Public/admin/js/base.js"></script>
<script>
var verify="<?php echo U('Login/verify');?>";
$("#login").click(function(){
	var username=$("#username").val(),password=$("#password").val(),verify=$("#verify").val();
	if(!username || !password ){
		return false;
	}else{
		$.post("<?php echo U('Login/signIn');?>",{username:username,password:password,verify:verify},function(data){
			$("#verifySrc").click();
			if(data.status==0){
				$("#verifySrc").click();
				alert(data.info);
			}else if(data.status==1){
				window.location.href=WEB_APP+"/Index/index";
			}
		})
	}
});
$("#verifySrc").click(function(){
	$(this).attr({"src":verify});
});
</script>
</body>
</html>