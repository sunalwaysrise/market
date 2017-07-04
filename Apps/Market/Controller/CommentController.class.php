<?php
namespace Market\Controller;
use Think\Controller;
/**
*商品评论
*/
class CommentController extends Controller{
  public function index($p=0){
    $O=M('comment');
    $pid=I('id');
    $l=$O->where('pid='.$pid)->order('id desc')->limit($p*10,10)->select();
    $r['flag']=1;
    $r['result']=$l;
    $r['total_page']= ceil($O->where('pid='.$pid)->count()/10);
    $this->ajaxReturn($r);
  }
  public function add(){
    $pid=I('pid');
    $openid=session('openid');
    $r['flag']=0;
    if($openid){
      $u=M('user');
      $me=$u->where('openid ="'.$openid.'"')->find();
      $o=M('orderdetail');
      $c=M('comment');
      $tip1=$o->where('pid='.$pid.' and openid="'.$openid.'"')->count();//该产品订单数量
      $tip2=$c->where('pid='.$pid.' and openid="'.$openid.'"')->count();//该产品评论数量
      if($tip1>$tip2){
        $d['pid']=$pid;
        $d['nickname']=$me['nickname'];
        $d['openid']=$openid;
        $d['headimgurl']=$me['headimgurl'];
        $d['start']=I('start');
        $d['content']=trim(I('content'));
        $d['time']=time();
        $c->add($d);
        $r['flag']=1;
        $r['msg']='评论成功';
      }else{
        $r['msg']='购买过才能评论';
      }
    }else{
      $r['msg']='未登录';
    }
    $this->ajaxReturn($r);
  }
  public function del(){
    $openid=session('openid');
    $r['flag']=0;
    if($openid){
      $c=M('comment');
      $pid=I('pid');
      $tip=$c->where('pid='.$pid.' and openid="'.$openid.'"')->delete();
      if($tip){
        $r['status']=1;
        $r['msg']='成功';
      }else{
        $r['msg']='失败';
      }
    }else{
      $r['msg']='未登录';
    }
    $this->ajaxReturn($r);
  }
}