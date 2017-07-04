<?php
namespace Manage\Controller;
use Think\Controller;
class LoginController extends Controller {
  public function verify(){
    $config =    array(
        'fontSize' =>14,
        'imageW'=>100,
        'imageH'=>30,
        'length'=>4,
    );
    $Verify = new \Think\Verify($config);
    $Verify->entry();
  }
  public function signIn(){
    $verify = new \Think\Verify();
    if(!$verify->check(I('verify'))){
      $data['flag']=0;
      $data['msg']='验证码错误';
      $this->ajaxReturn($data);
    }
    if(!I("username") || !I("password")){
      $data['flag']=0;
      $data['msg']='用户名密码不能为空';
      $this->ajaxReturn($data);
    }
    $User = M('rootmanage');
    $r=$User->where("username='".I("username")."'")->find();
    if(!$r || $r['password'] !=  I("password","","md5")){
      $data['flag']=0;
      $data['r']=$r['password'];
      $data['s']=I("password","","md5");
      $data['msg']='账号或密码错误';
      $this->ajaxReturn($data);
    }else{
      if($r['status']==0){
        $data['flag']=0;
        $data['msg']='账号被锁定';
      }else{
        $data=array(
          'id'=>$r['id'],
          'time'=>time(),
          'ip'=>get_client_ip(),
        );
        $User->save($data);
        session('qcid',$r["id"]);
        session('rbac',$r["rbac"]);
        session('username',$r["username"]);
        $data['flag']=1;
        $data['msg']='登录成功';
      }
      $this->ajaxReturn($data);
    }
  }
}
?>