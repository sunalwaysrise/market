<?php
namespace Manage\Controller;
use Think\Controller;
/**
* 产品SKU
*/ 
class SkuController extends CommonController {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(2)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }

  /**
  * 产品SKU属性详情
  * pid 产品ID,必填,入参(int)
  */ 
  public function sku($pid){
    $SKU_NAME=M('sku_name');
    $SKU_VALUE=M('sku_value');
    $STOCK=M('stock');
    $rsc=$SKU_NAME->where('pid='.$pid.' and isdeleted=0')->order('az asc')->select();
    $result=array();
    foreach ($rsc as $k => $v){
      $sku_id=$v['id'];
      $rs=$v;
      $rs['items']=$SKU_VALUE->where('sku_id='.$sku_id.' and isdeleted=0')->order('az asc')->select();
      array_push($result,$rs);
    }
    $r['flag']=1;
    if(!$rsc){
      $r['flag']=0;
    }
    $r['result']=$result;
    $this->ajaxReturn($r);
  }



  /** 产品SKU属性设置
  * pid 产品ID,必填,入参(int)
  * sku_name sku属性名称,必填,入参: [{"name":""},{"name":""},{"name":""}] 
  * sku_value sku属性值,必填,入参:
    [
      [
        {"name":"",image:""},
        {"name":"",image:""},
        {"name":"",image:""}
      ],
      [
        {"name":""},
        {"name":""},
        {"name":""}
      ],
      [
        {"name":""},
        {"name":""},
        {"name":""}
      ] 
    ]
    二维数组,第一维长度和sku_name一致
  */
  public function sku_save(){
    $pid=I('pid');
    M('product')->where('pid='.$pid)->setField('status','0');
    $sku_name=$_POST['sku_name'];
    $sku_value=$_POST['sku_value'];

    // $pid=1;
    // $sku_name='[{"name":"p1"},{"name":"color"},{"name":"size"}]';
    // $sku_value='[[{"name":"red"},{"name":"green"},{"name":"blue"}],[{"name":"m"},{"name":"l"}],[{"name":"p"}]]';

    // if( !$pid || !$sku_name || !$sku_value ){
      $sku_name=json_decode($sku_name,true);
      $sku_value=json_decode($sku_value,true);
      $SKU_NAME=M('sku_name');
      $SKU_VALUE=M('sku_value');
      $sku_name_ids=array();
      $i=0;
      $SKU_NAME->where('pid='.$pid)->setField('isdeleted','1');
      foreach ($sku_name as $k => $v){
        $v['time']=time();
        $has=$SKU_NAME->where('pid='.$pid.' and name="'.$v['name'].'"')->find();
        if($has){
          $tip=$has['id'];
          if($has['isdeleted']==1){
            $has['isdeleted']=0;
            $has['az']=$k;
            $SKU_NAME->save($has);
          }
        }else{
          $v['pid']=$pid;
          $v['az']=$k;
          $tip=$SKU_NAME->add($v);
        }
        array_push($sku_name_ids, $tip);
      }
      foreach ($sku_value as $k => $value){
        $sku_id=$sku_name_ids[$k];
        $SKU_VALUE->where('sku_id='.$sku_id)->setField('isdeleted','1');
        foreach ($value as $key => $v){
          $has=$SKU_VALUE->where('sku_id='.$sku_id.' and name="'.$v['name'].'"')->find();
          if($has){
            if($has['isdeleted']==1){
              $has['isdeleted']=0;
              $has['image']=$v['image'];
              $has['az']=$key;
              $SKU_VALUE->save($has);
            }
          }else{
            $v['sku_id']=$sku_id;
            $v['time']=time();
            $v['az']=$key;
            $tip=$SKU_VALUE->add($v);
          }
        }
      }
      $r['flag']=1;
      $r['msg']='操作成功';
    // }else{
    //   $r['flag']=0;
    //   $r['msg']='请按规定传入参数';
    // }
    $this->ajaxReturn($r);
  }



  /**
  * 查询SKU信息
  * pid 产品ID,必填,int
  */
  public function stock($pid){
    $STOCK=M('stock');
    $rs=$STOCK->where('pid='.$pid.' and isdeleted=0')->order('az asc')->select();
      $r['flag']=0;
    if($rs){
      $r['flag']=1;
    }
    $r['result']=$rs;
    $this->ajaxReturn($r);
  }

  /**
  * 保存SKU信息
  * pid 产品ID,必填,int
  * sku sku详情,必填,[
    {"sku_value_id_1":"1","sku_value_id_2":"1","sku_value_id_3":"1","price":"100.00","count":"10"},
    {"sku_value_id_1":"2","sku_value_id_2":"3","sku_value_id_3":"6","price":"100.00","count":"10"},
    {"sku_value_id_1":"3","sku_value_id_2":"2","sku_value_id_3":"7","price":"100.00","count":"10"},
    {"sku_value_id_1":"4","sku_value_id_2":"4","sku_value_id_3":"2","price":"100.00","count":"10"},
    {"sku_value_id_1":"5","sku_value_id_2":"5","sku_value_id_3":"8","price":"100.00","count":"10"}
  ]
  */
  public function stock_save(){
    $STOCK=M('stock');
    $pid=I('pid');
    M('product')->where('pid='.$pid)->setField('status','0');
    $sku=$_POST['sku'];
    $sku=json_decode($sku,true);
    $STOCK->where('pid='.$pid)->setField('isdeleted','1');
    foreach ($sku as $k => $v){
      $con=array();
      if($v['sku_value_id_1']){array_push($con,'sku_value_id_1 ='.$v['sku_value_id_1']);}
      if($v['sku_value_id_2']){array_push($con,'sku_value_id_2 ='.$v['sku_value_id_2']);}
      if($v['sku_value_id_3']){array_push($con,'sku_value_id_3 ='.$v['sku_value_id_3']);}
      if($v['sku_value_id_4']){array_push($con,'sku_value_id_4 ='.$v['sku_value_id_4']);}
      if($v['sku_value_id_5']){array_push($con,'sku_value_id_5 ='.$v['sku_value_id_5']);}
      if($v['sku_value_id_6']){array_push($con,'sku_value_id_6 ='.$v['sku_value_id_6']);}
      if($v['sku_value_id_7']){array_push($con,'sku_value_id_7 ='.$v['sku_value_id_7']);}
      array_push($con,'pid = '.$pid);
      $con=implode($con, ' and ');
      $has=$STOCK->where($con)->find();
      if($has){
        $has['price']=$v['price'];
        $has['count']=$v['count'];
        $has['isdeleted']=0;
        $has['az']=$k;
        $has['time']=time();
        $STOCK->save($has);
      }else{
        $v['pid']=$pid;
        $v['az']=$k;
        $v['price']=$v['price'];
        $v['count']=$v['count'];
        $v['time']=time();
        $STOCK->add($v);
      }
    }
    $r['flag']=1;
    $r['msg']='操作成功';
    $this->ajaxReturn($r);
  }

  public function publish($pid){
    M('product')->where('pid='.$pid)->setField('status','1');
    $r['flag']=1;
    $this->ajaxReturn($r);
  }

}
?>
