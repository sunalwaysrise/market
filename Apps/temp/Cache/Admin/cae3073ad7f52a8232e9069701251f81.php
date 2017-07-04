<?php if (!defined('THINK_PATH')) exit();?><h2>信息管理</h2>
<ul class="list1">
<li><span>用户名</span><div><?php echo ($my['username']); ?></div></li>
<li><span>修改密码</span><div><input type="password" value="" class="input1 require" id="pass"/></div><i></i></li>
<li><span>重复密码</span><div><input type="password" value="" class="input1 require" id="pass2"/></div><i></i></li>
<li><span></span><div><a class="btn1" onclick="wx.My.save()">保存<a></div></li>
</ul>