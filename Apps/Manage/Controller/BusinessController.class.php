<?php
namespace Manage\Controller;
use Think\Controller;
/**
* 代理
*/
class BusinessController extends CommonController {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(3)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }
  public $pagesize=8;
  public function index($p=1){
    $U=M('user');
    $con=array();
    $p--;
    array_push($con, 'category = 1 ');
    if(I('realname')){
      array_push($con,'realname ="'.I('realname').'"');
      $r['realname']=I('realname');
    }
    if(I('nickname')){
      $nickname=urldecode(I('nickname'));
      array_push($con,'nickname like "%'.$nickname.'%"');
      $r['nickname']=$nickname;
    }
    $con=join(' and ',$con);
    $l=$U->where($con)->limit($p*$this->pagesize,$this->pagesize)->order('uid desc')->select();
    
    $count=$U->where($con)->count();
    $r['flag']=1;
    $r['total_items']=$count;
    $r['current_page']=$p;
    $r['page_size']=$this->pagesize;
    $r['result']=$l;
    $this->ajaxReturn($r);
  }
  public function detail($id){
    $U=M('user');
    $l=$U->find($id);
    if($l['category']==1){
      $l['count']=$U->where('pid='.$l['uid'])->count();
      $r['flag']=1;
      $r['result']=$l;
    }else{
      $r['flag']=0;
      $r['msg']='失败';
    }
    $this->ajaxReturn($r);
  }
  public function changeStatus(){
    $U=M('user');
    $data['uid']=I('id');
    $data['category']=0;
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
  public function member($p=1){
    $pid=I('id');
    $con=array();
    $p--;
    array_push($con, 'pid='.$pid);
    if(I('realname')){
      array_push($con,'realname ="'.I('realname').'"');
      $r['realname']=I('realname');
    }
    if(I('nickname')){
      $nickname=urldecode(I('nickname'));
      array_push($con,'nickname like "%'.$nickname.'%"');
      $r['nickname']=$nickname;
    }
    $con=join(' and ',$con);

    $U=M('user');
    $u=$U->field('uid,nickname,realname')->find($pid);
    $list=$U->where($con)->limit($p*$this->pagesize,$this->pagesize)->order('uid desc')->select();
    $count=$U->where($con)->count();
    $r['flag']=1;
    $r['user']=$u;
    $r['total_items']=$count;
    $r['current_page']=$p;
    $r['page_size']=$this->pagesize;
    $r['result']=$list;
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