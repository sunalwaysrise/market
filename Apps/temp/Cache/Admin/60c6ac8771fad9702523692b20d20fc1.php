<?php if (!defined('THINK_PATH')) exit();?><h2>
	<span>积分设置</span>
</h2>
<ul class="line2">
	<li><a>会员签到积分</a><span><input type="number" step="1" min="1" value="<?php echo ($qiandao); ?>" class="input1"></span><a class="btn1" onclick="wx.SendPoint(this,1)">修改</a></li>
	<li><a>商品评论积分</a><span><input type="number" step="1" min="1" value="<?php echo ($pinglun); ?>" class="input1"></span><a class="btn1" onclick="wx.SendPoint(this,2)">修改</a></li>
	<li><a>推荐好友积分</a><span><input type="number" step="1" min="1" value="<?php echo ($tuiguang); ?>" class="input1"></span><a class="btn1" onclick="wx.SendPoint(this,3)">修改</a></li>
</ul>