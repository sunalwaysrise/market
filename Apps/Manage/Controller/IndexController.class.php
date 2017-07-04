<?php
namespace Manage\Controller;
use Think\Controller;
class IndexController extends CommonController {
  public function _initialize(){
    parent::init();
  }
  public function index(){
    $r['flag']=1;
    $r['username']=session('username');
    $U=M('user');
    $today = strtotime(date('Y-m-d'));
    $week = mktime ( 0, 0, 0, date ( "m" ), date ( "d" ) - date ( "w" ) + 1, date ( "Y" ) );
    $year=date('Y');
    $month=date('m');
    $day=1;
    $month=strtotime($year.'-'.$month.'-'.$day);
    $r['member_count'] = $U->where('category = 0')->count();
    $r['new_member_today'] = $U->where('category = 0 and register > '.$today)->count();
    $r['new_member_month'] = $U->where('category = 0 and register > '.$month)->count();
    $r['business_count'] = $U->where('category = 1')->count();
    $r['week_business_count'] = $U->where('category = 1 and register > '.$week)->count();
    $r['month_business_count'] = $U->where('category = 1 and register > '.$month)->count();
    $r['week']=$week;
    $r['month']=$month;
    $O=M('order');
    $o=$O->field('price')->where('status in (2,3,4,5,6) and time>'.$today)->select();
    $w=$O->field('price')->where('status in (2,3,4,5,6) and time>'.$week)->select();
    $m=$O->field('price')->where('status in (2,3,4,5,6) and time>'.$month)->select();
    $r['today_order']=count($o);
    $r['week_order']=count($w);
    $r['month_order']=count($m);
    $s=0;
    foreach ($o as $k => $v) {
      $s+=$v['price'];
    }
    $r['today_sales']=$s;
    $s=0;
    foreach ($w as $k => $v) {
      $s+=$v['price'];
    }
    $r['week_sales']=$s;
    $s=0;
    foreach ($m as $k => $v) {
      $s+=$v['price'];
    }
    $r['month_sales']=$s;
    $r['product']=M('product')->field('title,imgs,price,count')->where('status=1 and isdeleted =0')->order('count asc')->select();
    $this->ajaxReturn($r);
  }
  public function signOut(){
    unset($_SESSION['qcid']);
    unset($_SESSION['username']);
  }
  public function _empty(){}
  public function set(){
    session('openid',I('openid'));
  }
}
?>