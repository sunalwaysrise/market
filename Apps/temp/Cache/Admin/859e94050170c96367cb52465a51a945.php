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
  <div class="topBar"><a>欢迎 <?php echo ($username); ?> 登录，请慎重操作后台</a><a id="signOut">退出</a></div>
</div>
<div class="main">
  <div class="aside" id="aside">
    <h2>账号管理</h2>
    <a onclick="wx.util.getContnet('My','index')">帐号管理</a>
    <a onclick="wx.util.getContnet('My','manage')">管理员管理</a>
    <h2>产品管理</h2></h2>
    <a onclick="wx.util.getContnet('Product','index')">产品管理</a>
    <a onclick="wx.util.getContnet('Product','tags')">产品标签管理</a>
    <a onclick="wx.util.getContnet('Comment','index')">产品评论</a>
    <a onclick="wx.util.getContnet('Product','tags')">tag-test</a>
    <h2>会员</h2>
    <a onclick="wx.util.getContnet('Member','index')">查看会员</a>
    <h2>订单管理</h2>
    <a onclick="wx.util.getContnet('Order','total')">今日订单</a>
    <a onclick="wx.util.getContnet('Order','index')">查看订单</a>
    <h2>数据报表</h2>
    <a onclick="wx.util.getContnet('Report','index')">数据报表</a>
    <a onclick="wx.util.getFrame('Report','monthfans',0,'每个月最后一天的会员数')">a.每月会员数</a>
    <a onclick="wx.util.getFrame('Report','monthorder',0,'每月销量汇总')">b.每月销量汇总</a>
    <a onclick="wx.util.getFrame('Report','fanslocal',0,'粉丝省份排名')">c.粉丝省份排名</a>
    <h2>首页Banner</h2>
    <a onclick="wx.util.getContnet('Banner','index')">设置Banner</a>
    <a onclick="wx.util.getFrame('Banner','top',0)">通用广告</a>
    <h2>积分设置</h2>
    <a onclick="wx.util.getContnet('Sendpoint','index')">设置</a>
  </div>
  <div class="content" id="content">
    <h2>欢迎您登录，祝您使用愉快</h2>
  </div>
  <div id="loading"></div>
</div>
<div id="tip"></div>
<script src="/Public/admin/js/jquery.min.js"></script>	
<script src="/Public/admin/js/jquery.Form.js"></script>
<script src="/Public/admin/js/base.js"></script>
<script src="/Public/admin/js/datepicker.js"></script>
<script src="/Public/admin/js/lhgcalendar.min.js"></script>

</body>
</html>