<?php
namespace Manage\Controller;
use Think\Controller;
/**
* 个人主页
*/
class MyController extends CommonController {
  public function _initialize(){
    parent::init();
  }
  public function index(){
    $U=M("rootmanage");
    $id=session('qcid');
    $u=$U->field('username,ip,time')->find($id);
    $r['flag']=1;
    $r['result']=$u;
    $this->ajaxReturn($r);
  }
  public function save(){
    $M  = M('rootmanage');
    $oldpassword=I('oldpassword');
    $password=trim(I('password'));
    $id=session('qcid');
    $m=$M->find($id);
    $r['flag']=0;
    if($m['password']==md5($oldpassword)){
      if($password){
        $s['id']=$id;
        $s['password']=md5($password);
        $tip=$M->save($s);
        if($tip){
          $r['flag']=1;
          $r['msg']='修改成功';
        }else{
          $r['msg']='操作失败';
        }
      }else{
        $r['msg']='密码不能为空';
      }
    }else{
      $r['msg']='旧密码错误';
    }
    $this->ajaxReturn($r);
  }

}
?>