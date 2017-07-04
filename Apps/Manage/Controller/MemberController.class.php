<?php
namespace Manage\Controller;
use Think\Controller;
/**
* 普通会员
*/
class MemberController extends CommonController {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(6)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }
  public $pagesize=20;
  public function index($p=0){
    $U=M('user');
    $con=array();
    array_push($con, 'category = 0 ');
    if(I('realname')){
      array_push($con,'realname like "%'.$realname.'%"');
      $r['realname']=I('realname');
    }
    if(I('nickname')){
      $nickname=urldecode(I('nickname'));
      array_push($con,'nickname like "%'.$nickname.'%"');
      $r['nickname']=$nickname;
    }
    $con=join(' and ',$con);
    $l=$U->where($con)->limit($p*$this->pagesize,$this->pagesize)->order('uid desc')->select();
    $list=array();
    $O=M('order');
    foreach ($l as $k => $v){
      $tmp=$v;
      $l2=$O->field('price')->where('openid="'.$v["openid"].'" and  status != 1  and status !=7 and status != 8')->select();
      $order_count=count($l2);
      $cost=0;
      $per_order_cost=0;
      if($order_count>0){
        foreach ($l2 as $key => $value){
          $cost+=$value['price'];
        }
        $per_order_cost=$cost/$order_count;
      }
      $tmp['cost']=$cost;
      $tmp['per_order_cost']=$per_order_cost;
      $tmp['order_count']=$order_count;
      array_push($list,$tmp);
    }
    $count=$U->where($con)->count();
    $r['flag']=1;
    // $r['total_page']=ceil($count/$this->pagesize);
    $r['result']=$list;
    $r['flag']=1;
    $r['total_items']=$count;
    $r['current_page']=$p;
    $r['page_size']=$this->pagesize;
    $this->ajaxReturn($r);
  }
  public function detail($id){
    $U=M('user');
    $l=$U->find($id);
    if($l['category']==1){
      $r['flag']=0;
      $r['msg']='失败';
    }else{
      $r['flag']=1;
      $r['result']=$l;
    }
    $this->ajaxReturn($r);
  }
  public function changeStatus(){
    $U=M('user');
    $data['uid']=I('id');
    $data['category']=1;
    $tip=$U->save($data);
    if($tip){
      $r['flag']=1;
      $r['msg']='成功';
    }else{
      $r['flag']=0;
      $r['msg']='失败';
    }
    $this->ajaxReturn($r);
  }

  public function order($p=1){
    $id=I('id');
    $p--;
    $U=M('user');
    $O=M('order');
    $u=$U->field('uid,nickname,realname,pid,openid')->find($id);
    $con='openid="'.$u['openid'].'"';
    $list=$O->where($con)->limit($p*$this->pagesize,$this->pagesize)->order('oid desc')->select();
    $count=$O->where($con)->count();
    $r['flag']=1;
    $r['user']=$u;
    $r['total_items']=$count;
    $r['current_page']=$p;
    $r['page_size']=$this->pagesize;
    $r['result']=$list;
    $this->ajaxReturn($r);
  }

}
?>