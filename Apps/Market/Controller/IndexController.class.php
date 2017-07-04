<?php
namespace Market\Controller;
use Think\Controller;
/**
* 商城内容展示
*/
class IndexController extends CommonController{
  public $pagesize=10;
  public function banner(){
    $rs=M('banner')->where('status=1')->order('az asc')->select();
    $r['flag']=1;
    $r['result']=$rs;
    $this->ajaxReturn($r);
  }
  public function index(){
    $this->display();
  }
  public function home(){
    $rs=M('category')->where('status=1')->order('az asc')->select();
    $P=M('product');
    $result=array();
    foreach ($rs as $k => $v) {
      $tmp=$v;
      $con="cid = ".$v['tid']." and status=1 and isdeleted=0";
      $rs=$P->field('pid,title,imgs,cid,summary,price,original,tags')->where($con)->order('az asc')->select();
      $tmp['products']=$rs;
      array_push($result,$tmp);
    }
    $r['flag']=1;
    $r['result']=$result;
    $this->ajaxReturn($r);
  }
  public function category(){
    $rs=M('tags')->where('status=1')->order('az asc')->select();
    $r['flag']=1;
    $r['result']=$rs;
    $this->ajaxReturn($r);
  }
  public function products($id,$p=0){
    $P=M('product');
    $con="cid = ".$v['tid']." and status=1 and isdeleted=0";
    $rs=$P->where($con)->order('az asc')->field('title,cid,summary,price,original,tags,content')->limit($p*$this->pagesize,$this->pagesize)->select();
    $page=$P->where($con)->count();
    $r['flag']=1;
    $r['result']=$rs;
    $r['current_page']=$p;
    $r['total_page']=$page;
    $this->ajaxReturn($r);
  }
  public function detail($id){
    $rs=M('product')->find($id);
    $r['flag']=1;
    $r['result']=$rs;
    $r['sku']=$this->sku($id);
    $r['stock']=$this->stock($id);
    $this->ajaxReturn($r);
  }
  private function sku($pid){
    $SKU_NAME=M('sku_name');
    $SKU_VALUE=M('sku_value');
    $rsc=$SKU_NAME->where('pid='.$pid.' and isdeleted=0')->order('az asc')->select();
    $result=array();
    foreach ($rsc as $k => $v){
      $sku_id=$v['id'];
      $rs=$v;
      $rs['items']=$SKU_VALUE->where('sku_id='.$sku_id.' and isdeleted=0')->order('az asc')->select();
      array_push($result,$rs);
    }
    return $result;
  }
  private function stock($pid){
    $STOCK=M('stock');
    $rs=$STOCK->where('pid='.$pid.' and isdeleted=0')->order('az asc')->select();
    return $rs;
  }
  public function address(){
    $openid=session('openid');
    $m=M('user')->field('address')->where('openid="'.$openid.'"')->find();
    $r['flag']=1;
    $r['result']=$m['address'];
    $this->ajaxReturn($r);
  }
  public function address_save(){
    $openid=session('openid');
    $M=M('user');
    $m=$M->field('uid')->where('openid="'.$openid.'"')->find();
    $m['address']=I('address');
    $tip=$M->save($m);
    if($tip){
      $r['flag']=1;
      $r['msg']='操作成功';
    }else{
      $r['flag']=0;
      $r['msg']='操作失败';
    }
    $this->ajaxReturn($r);
  }
}
