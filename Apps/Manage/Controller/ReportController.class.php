<?php
namespace Manage\Controller;
use Think\Controller;
/**
* 报表
*/ 
class ReportController extends CommonController {
// class ReportController extends Controller {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(8)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }

  /**
  * 订单状态1:待付款;2:已支付;3:待发货;4:已发货;5:已签收;6:已完成;7:已过期;8:已取消
  * 时间内所有产品销量
  */ 
  public function goods(){
    $con=array();
    array_push($con, 'status in (2,3,4,5,6)');
    if(I('begin_time')){
      $r['begin_time']=I('begin_time');
      array_push($con,'time >'.strtotime(I('begin_time')));
    }
    if(I('end_time')){
      $r['end_time']=I('end_time');
      array_push($con,'time <'.strtotime(I('end_time'))+86400);
    }
    $O=M('orderdetail');
    $p=M('product')->field('pid,title,imgs')->select();
    $con=join(' and ',$con);
    $result=array();
    foreach ($p as $k => $v){
      $rs=$O->where($con.' and pid='.$v['pid'])->select();
      $num=0;
      $price=0;
      foreach ($rs as $key => $value) {
        $num+=$value['num'];
        $price+=($num*$value['price']);
      }
      $arr=$v;
      $arr['num']=$num;
      $arr['price']=$price;
      array_push($result,$arr);
    }
    $r['result']=$result;
    $r['flag']=1;
    $this->ajaxReturn($r);
  }

  /**
  * 返回指定长度的时间戳
  */ 
  private function count_season($len=12){
    $year=date('Y');
    $month=date('m');
    $day=1;
    $i=0;
    $result=array();
    for($i;$i<$len;$i++){
      $month--;
      if($month<=0){
        $month=12;
        $year--;
      }
      $tmp['time']=$year.'-'.$month.'-'.$day;
      $tmp['timestrap']=strtotime($year.'-'.$month.'-'.$day);
      array_push($result, $tmp);
    }
    return $result;
  }

  /**
  * 近12月会员数量
  */ 
  public function fans($id=12){
    $time = $this->count_season($id);
    $U=M('user');
    $result=array();
    foreach ($time as $k => $v) {
      if($k==0){
        $end_time=time();
      }else{
        $end_time=$time[$k-1]['timestrap'];
      }
      $begin_time=$v['timestrap'];
      // dump("begin:$begin_time,end:$end_time");
      $tmp['time']=$v['time'];
      $tmp['num']=$U->where( 'register >'.$begin_time.' and register <'.$end_time )->count();
      array_push($result,$tmp);
    }
    $r['flag']=1;
    $r['result']=$result;
    $this->ajaxReturn($r);
  }

  /**
  * 近12个月的销量
  */ 
  public function order($id=12){
    $time = $this->count_season($id);
    $O=M('order');
    $result=array();
    foreach ($time as $k => $v) {
      if($k==0){
        $end_time=time();
      }else{
        $end_time=$time[$k-1]['timestrap'];
      }
      $begin_time=$v['timestrap'];
      $tmp['time']=$v['time'];
      $l=$O->field('price')->where( 'status in (2,3,4,5,6)  and time >'.$begin_time.' and time <'.$end_time )->select();
      $price=0;
      foreach ($l as $key => $value) {
         $price+=$value['price'];
      }
      $tmp['price']=$price;
      array_push($result,$tmp);
    }
    $r['flag']=1;
    $r['result']=$result;
    $this->ajaxReturn($r);
  }

}
?>