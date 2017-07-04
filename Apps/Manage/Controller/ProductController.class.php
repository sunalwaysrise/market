<?php
namespace Manage\Controller;
use Think\Controller;
/**
* 产品中心
*/ 
class ProductController extends CommonController {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(2)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }
  public $pagesize=20;

  /**
  * 产品中心
  */
  public function index($id,$p=0){
    $P=M('product');
    // $l=$P->where('cid='.$id)->field('pid,title,cid,price,original,count,imgs,status')->order('status desc,az asc')->limit($p*$this->pagesize,$this->pagesize)->select();
    $l=$P->where('cid='.$id.' and isdeleted=0')->field('pid,title,cid,price,original,count,imgs,status')->order('status desc,az asc')->select();
    // $page=$P->where('cid='.$id)->count();
    $r['flag']=1;
    // $r['total_page']=ceil($page/$this->pagesize);
    // $r['current_page']=$p;
    $r['result']=$l;
    $r['result2']='cid='.$id.' and isdeleted!=1';
    $this->ajaxReturn($r);
  }

  public function name($id){
    $l=M('category')->find($id);
    $r['flag']=1;
    $r['result']=$l;
    $this->ajaxReturn($r);
  }


  public function product_detail_list($id){
    $P=M('product_detail');
    $ls=$P->where('pid='.$id.' and isdeleted=0')->order('az asc')->select();
    $r['flag']=1;
    $r['result']=$ls;
    $this->ajaxReturn($r);
  }

  public function product_detail_save(){
    $P=M('product_detail');
    $s['pid']=I('pid');
    $s['imgs']=I('imgs');
    $s['size']=I('size');
    $s['color']=I('color');
    $s['price']=I('price');
    $s['count']=I('count');
    $s['status']=I('status');
    $id=I('id');
    if($id){
      $tip=$P->save($s);
    }else{
      $tip=$P->add($s);
    }
    if($tip){
      $r['flag']=1;
      $r['msg']='操作成功';
    }else{
      $r['flag']=0;
      $r['msg']='操作失败';
    }
  }
  
  public function product_detail_deleted(){
    $P=M('product_detail');
    $s['id']=I('id');
    $s['isdeleted']=1;
    $tip=$P->save($s);
    if($tip){
      $r['flag']=1;
      $r['msg']='操作成功';
    }else{
      $r['flag']=0;
      $r['msg']='操作失败';
    }
  }

  /**
  * 产品详情
  */ 
  public function detail($id){
    $Detail=M("product");
    $r['detail']=$Detail->find($id);
    $r['category']=M('category')->select();
    $r['flag']=1;
    $this->ajaxReturn($r);
  }

  /**
  * 修改产品内容
  */
  public function update_detail(){
    $Detail  = M('product');
    $data['pid'] = I('pid');
    $data['title'] = trim($_POST['title']);
    $data['cid'] = trim($_POST['cid']);
    $data['price'] = trim($_POST['price']);
    $data['original'] = trim($_POST['original']);
    $data['tags'] = trim($_POST['tags']);
    $data['summary'] = trim($_POST['summary']);
    $data['count'] = trim($_POST['count']);
    $data['imgs'] = trim($_POST['imgs']);
    $data['sales'] = trim($_POST['sales']);
    $data['salesnum'] = trim($_POST['salesnum']);
    $data['content'] = $_POST['content'];
    $data['status'] = 0;
    $data['time'] = time();
    if(!$data['pid']){
      $tip=$Detail->add($data);
      if($tip){
        $r['flag']=1;
        $r['msg']='添加成功';
        $r['id']=$tip;
      }else{
        $r['flag']=0;
        $r['msg']='添加失败';
      }
    }else{
      $tip=$Detail->save($data);
      if($tip){
        $r['flag']=1;
        $r['msg']='修改成功';
        $r['id']=$data['pid'];
      }else{
        $r['flag']=0;
        $r['msg']='修改失败';
      }
    }
    $this->ajaxReturn($r);
  }

  /**
  * 上传产品图片
  */ 
  public function upload_product_image(){
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

  /**
  * 保存产品排序
  */
  public function az_product(){
    $ids=I('ids');
    $azs=I('azs');
    $ids=explode(',',$ids);
    $azs=explode(',',$azs);
    $i=0;
    $len=count($ids);
    $sa=array();
    for($i=0;$i<$len;$i++){
      $s=array();
      $s['pid']=$ids[$i];
      $s['az']=$azs[$i];
      array_push($sa,$s);
    }
    $t2=M('product_tmp');
    $tip=$t2->addAll($sa);
    $M=M();
    if($tip){
      $sql='UPDATE l_product a, l_product_tmp b
        SET a.az = b.az
        WHERE a.pid = b.pid;';
      $rs=$M->query($sql);
      $sql='truncate table l_product_tmp;';
      $M->query($sql);
      $r['flag']=1;
      $r['msg']='保存成功';
    }else{
      $sql='truncate table l_product_tmp;';
      $M->query($sql);
      $r['flag']=0;
      $r['msg']='保存失败：E003';
    }
    $this->ajaxReturn($r);
  }

  /**
  * 删除产品
  */
  public function delete_detail($id){
    $Detail=M("product");
    $s['pid']=$id;
    $s['isdeleted']=1;
    $tip=$Detail->save($s);
    if($tip){
      $data['flag']=1;
      $data['msg']='删除成功';
    }else{
      $data['flag']=0;
      $data['msg']='删除失败';
    }
    $this->ajaxReturn($data);
  }

  /**
  * 产品类别
  */ 
  public function category(){
    $r['flag']=1;
    $r['result']=M('category')->order('az asc')->select();
    $this->ajaxReturn($r);
  }

  /**
  * 修改类别信息
  */
  public function update_category(){
    $t=M('category');
    $s['name']=trim(I("name"));
    $s['status']=trim(I("status"));
    $tid=trim(I("id"));
    if(!$tid){
      $c=$t->where('name="'.$s['name'].'"')->count();
      if($c>0){
        $r['flag']=0;
        $r['msg']='该类别名称已存在';
        $r['info']=$c;
      }else{
        $tip=$t->add($s);
        if($tip){
          $r['flag']=1;
          $r['msg']='添加成功';
        }else{
          $r['flag']=0;
          $r['msg']='添加失败';
        }
      }
    }else{
      $s['tid']=$tid;
      $c=$t->where('name="'.$s['name'].'" and tid !='.$tid)->count();
      if($c>0){
        $r['flag']=0;
        $r['msg']='该类别名称已存在';
      }else{
        $tip=$t->save($s);
        if($tip){
          $r['flag']=1;
          $r['msg']='修改成功';
        }else{
          $r['flag']=0;
          $r['msg']='修改失败';
        }
      }
    }
    $this->ajaxReturn($r);
  }

  /**
  * 删除类别
  */ 
  public function delete_category($id){
    $t=M('category');
    $count=M('product')->where('cid='.$id)->count();
    if( $count >0 ){
      $r['flag']=0;
      $r['msg']='该类别下还有产品，无法删除该类别';
    }else{
      $c=$t->where('tid='.$id)->delete();
      if($c){
        $r['flag']=1;
        $r['msg']='删除成功';
      }else{
        $r['flag']=0;
        $r['msg']='删除失败';
      }
    }
    $this->ajaxReturn($r);
  }

  /**
  * 保存产品排序
  */
  public function az_category(){
    $t=M('category');
    $ids=I('ids');
    $azs=I('azs');
    $ids=explode(',',$ids);
    $azs=explode(',',$azs);
    $i=0;
    $len=count($ids);
    $sa=array();
    for($i=0;$i<$len;$i++){
      $s=array();
      $s['tid']=$ids[$i];
      $s['az']=$azs[$i];
      array_push($sa,$s);
    }
    $t2=M('category_tmp');
    $tip=$t2->addAll($sa);
    $M=M();
    if($tip){
      //建表成功
      //同步表
      $sql='UPDATE l_category a, l_category_tmp b
        SET a.az = b.az
        WHERE a.tid = b.tid;';
      $rs=$M->query($sql);
      $t2->where()->delete();
      //清空临时表
      $sql='truncate table l_category_tmp;';
      $M->query($sql);
      // if($c){
      $r['flag']=1;
      $r['msg']='保存成功';
    // }else{
    //   $r['flag']=0;
    //   $r['msg']='保存失败';
    // }
    }else{
      $sql='truncate table l_category_tmp;';
      $M->query($sql);
      $r['flag']=0;
      $r['msg']='保存失败：E003';
    }
    $this->ajaxReturn($r);
  }

}
?>
