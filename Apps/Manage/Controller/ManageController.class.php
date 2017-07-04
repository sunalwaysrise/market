<?php
namespace Manage\Controller;
use Think\Controller;
/**
* 管理员主页
*/
class ManageController extends CommonController {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(1)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }
  public function index(){
    $user=M("rootmanage");
    $l=$user->where('isdeleted=0')->select();
    $r['flag']=1;
    $r['result']=$l;
    $this->ajaxReturn($r);
  }

  public function detail($id){
    $user=M("rootmanage");
    $u=$user->field('id,username,realname,rbac,time,ip,status,isdeleted')->find($id);
    if($u && $u['isdeleted']==0){
      $r['flag']=1;
      $r['result']=$u;
    }else{
      $r['flag']=0;
      $r['msg']='错误';
    }
    $this->ajaxReturn($r);
  }
  public function saved(){
    $Detail  = M('rootmanage');
    $data['username']=trim(I('username'));
    $data['realname']=trim(I('realname'));
    $password=trim(I('password'));
    $data['rbac']=I('rbac');
    $data['status']=I('status');
    if(I('id')){
      $data['id']=I('id');
      if($password){
        $data['password'] = md5($password);
      }
      $uname=$data['username'];
      $c=$Detail->where('username ="'.$uname.'" and id !='.$data['id'])->count();
      if($c){
        $r['flag']=0;
        $r['msg']='用户名已存在';
      }else{
        $data['time']=time();
        $tip=$Detail->save($data);
        if($tip){
          $r['flag']=1;
          $r['msg']='修改成功';
        }else{
          $r['flag']=0;
          $r['msg']='修改失败';
        }
      }
    }else{
      if($password){
        $uname=$data['username'];
        $data['password'] = md5($password);
        $c=$Detail->where('username ="'.$uname.'"')->count();
        if($c){
          $r['flag']=0;
          $r['msg']='用户已存在';
        }else{
          $data['time']=time();
          $tip=$Detail->add($data);
          if($tip){
            $r['flag']=1;
            $r['msg']='添加成功';
          }else{
            $r['flag']=0;
            $r['msg']='添加失败';
          }
        }
      }else{
        $r['flag']=0;
        $r['info']='密码不能为空';
      }
    }
    $this->ajaxReturn($r);
  }
  public function deleted($id){
    $s['isdeleted']=1;
    $s['id']=$id;
    $tip=M("rootmanage")->save($s);
    if($tip){
      $r['flag']=1;
      $r['msg']='成功';
    }else{
      $r['flag']=0;
      $r['msg']='失败';
    }
    $this->ajaxReturn($r);
  }
  public function locked($id){
    $s['status']=0;
    $s['id']=$id;
    $tip=M("rootmanage")->save($s);
    if($tip){
      $r['flag']=1;
      $r['msg']='成功';
    }else{
      $r['flag']=0;
      $r['msg']='失败';
    }
    $this->ajaxReturn($r);
  }
}
