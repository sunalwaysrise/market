<?php
namespace Manage\Controller;
use Think\Controller;
class BannerController extends CommonController {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(4)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }
  public function index($p=0){
    $P=M('banner');
    $l=$P->order('status desc,az desc')->limit($p*10,10)->select();
    $page=$P->count();
    $page=ceil($page/10);
    $r['flag']=1;
    $r['total_page']=$page;
    $r['current_page']=$p;
    $r['result']=$l;
    $this->ajaxReturn($r);
  }
  
  public function detail(){
    $id=I('id');
    $Detail=M("banner");
    $d=$Detail->find($id);
    $r['flag']=1;
    $r['result']=$d;
    $this->ajaxReturn($r);
  }
  public function update_detail(){
    $Detail  = M('banner');
    $data['bid'] = trim($_POST['bid']);
    $data['link'] = trim($_POST['link']);
    $data['status'] = trim($_POST['status']);
    $data['az'] = trim($_POST['az']);
    $data['title'] = trim($_POST['title']);
    $data['image'] = trim($_POST['image']);
    $data['time'] = time();
    if(!$data['bid']){
      $tip=$Detail->add($data);
      if($tip){
        $r['flag']=1;
        $r['msg']='添加成功';
        $r['id']=$tip;
      }else{
        $r['status']=0;
        $r['info']='添加失败';
      }
    }else{
      $tip=$Detail->save($data);
      if($tip){
        $r['flag']=1;
        $r['msg']='保存成功';
        $r['id']=$data['bid'];
      }else{
        $r['status']=0;
        $r['info']='保存失败';
      }
    }
    $this->ajaxReturn($r);
  }
  public function upload(){
    $config = array(
      'maxSize'    =>    3145728,
      'rootPath'   =>    './Public/',
      'savePath'   =>    '/Uploads/',
      'saveName'   =>    time().mt_rand(),
      'exts'       =>    array('jpg', 'gif', 'png', 'jpeg'),
      'autoSub'    =>    false,
    );
    $upload = new \Think\Upload($config);
    $info=$upload->upload();
    if($info){
      $url = $info['file']['savename'];
      $image = new \Think\Image();
      $image->open('./Public/Uploads/'.$url);
      $image->thumb(640, 280,\Think\Image::IMAGE_THUMB_CENTER)->save('./Public/Uploads/m'.$url);
      $r['msg']=$url;
      $r['flag']=1;
    }else{
      $r['flag']=0;
      $r['msg']='上传失败';
      $r['info']=$upload->getError();
    }
    $this->ajaxReturn($r);
  }
  public function delete_detail($id){
    $Detail=M("banner");
    $tip=$Detail->where('bid='.$id)->delete();
    if($tip==false || $tip==0){
      $r['flag']=0;
      $r['msg']='失败';
    }else{
      $r['flag']=1;
      $r['msg']='成功';
    }
    $this->ajaxReturn($r);
  }
  /**
  * 保存排序
  */
  public function az_banner(){
    $ids=I('ids');
    $azs=I('azs');
    $ids=explode(',',$ids);
    $azs=explode(',',$azs);
    $i=0;
    $len=count($ids);
    $sa=array();
    for($i=0;$i<$len;$i++){
      $s=array();
      $s['bid']=$ids[$i];
      $s['az']=$azs[$i];
      array_push($sa,$s);
    }
    $t2=M('banner_tmp');
    $tip=$t2->addAll($sa);
    $M=M();
    if($tip){
      $sql='UPDATE l_banner a, l_banner_tmp b
        SET a.az = b.az
        WHERE a.bid = b.bid;';
      $rs=$M->query($sql);
      $sql='truncate table l_banner_tmp;';
      $M->query($sql);
      $r['flag']=1;
      $r['msg']='保存成功';
    }else{
      $sql='truncate table l_banner_tmp;';
      $M->query($sql);
      $r['flag']=0;
      $r['msg']='保存失败：E003';
    }
    $this->ajaxReturn($r);
  }
}
?>