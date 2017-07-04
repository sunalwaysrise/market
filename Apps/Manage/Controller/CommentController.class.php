<?php
namespace Manage\Controller;
use Think\Controller;
class CommentController extends CommonController {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(5)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }
  public function index($p=0){
    $L=M('comment');
    $P=M('product');
    $l2=$L->order('time desc')->limit($p*20,20)->select();
    $count=$L->count();
    $l=array();
    foreach ($l2 as $k=>$v){
      $tmp=$v;
      $tmp["p"]=$P->field('title')->find($v['pid']);
      array_push($l,$tmp);
    }
    $r['flag']=1;
    $r['total_page']=ceil($count/20);
    $r['current_page']=$p;
    $r['result']=$l;
    $this->ajaxReturn($r);
  }
  public function reply(){
    $L=M('comment');
    $id=I('id');
    $i['id']=trim(I('id'));
    $i['reply']=trim(I('reply'));
    $tip=$L->save($i);
    if($tip){
      $r['flag']=1;
      $r['msg']='回复成功';
      $r['id']=$id;
    }else{
      $r['flag']=0;
      $r['msg']='回复失败';
    }
    $this->ajaxReturn($r);
  }
  public function del($id){
    $L=M('comment');
    $tip=$L->where('id='.$id)->delete();
    if($tip){
      $r['flag']=1;
      $r['msg']='删除成功';
    }else{
      $r['flag']=0;
      $r['msg']='删除失败';
    }
    $this->ajaxReturn($r);
  }

}
?>