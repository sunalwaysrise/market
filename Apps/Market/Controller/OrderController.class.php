<?php
namespace Market\Controller;
use Think\Controller;
/**
* 订单处理
*/
class OrderController extends CommonController{
  public $pagesize=10;
  /*我的订单*/
  public function index($p=0){
    $t=I('t');
    $O=M('order');
    $c='openid ="'.session('openid').'" ';
    if($t==1){
      $c.='AND status=1';
    }else if($t==2){
      $c.='AND (status=2 OR status=3 )';
    }else if($t==4){
      $c.='AND status=4';
    }else if($t==6){
      $c.='AND (status=5 OR status=6)';
    }else if($t==8){
      $c.='AND (status=7 OR status=8)';
    }
    $rs=$O->where($c)->order('time desc')->limit($p*$this->pagesize,$this->pagesize)->select();
    $page=$O->where($c)->count();
    $r['flag']=1;
    $r['result']=$rs;
    $r['current_page']=$p;
    $r['total_page']=ceil($page/$this->pagesize);
    $r['t']=$t;
    $this->ajaxReturn($r);
  }
  /*订单详情*/
  public function detail($id){
    $id=I('id');
    $D=M('order');
    $O=M('orderdetail');
    $P=M('product');
    $d=$D->find($id);
    if($d["openid"]==session('openid')){
      if($d['status']==1){
        //当前显示订单未支付
        $this->checkPayStatus($id);
        $d=$D->find($id);
      }
      $r['order']=$d;
      $lis=$O->where('oid ='.$id)->select();
      $arr1=array();
      foreach ($lis as $k => $v){
        $tmp=$v;
        $tmp['g']=$P->field('title,imgs')->find($v['pid']);
        array_push($arr1,$tmp);
      }
      $r['order_detail']=$arr1;
      $r['tip']=$this->PAY_STATUS_CODE[ $d['status'] ];
      if($d['status']==1){
        //设置倒计时
        $r["endtime"]=($d['time']+PAY_OUT_TIME-time());
      }
      $r['flag']=1;
    }else{
      $r['flag']=0;
      $r['msg']="没有权限";
    }
    $this->ajaxReturn($r);
  }

  /*下单*/
  public function buy(){
    $openid=session('openid');
    $pid=session('pid');
    $o1=M('order');
    $o2=M('orderdetail');
    $P=M('product');
    $S=M('stock');
    $data["openid"]=$openid;
    $data["pid"]=$pid;
    $data["nickname"]=I('nickname');
    $data["phone"]=I('phone');
    $data["shen"]=I('shen');
    $data["shi"]=I('shi');
    $data["qu"]=I('qu');
    $data["piao"]=I('piao');
    $data["code"]=I('code');
    $data["address"]=I('address');
    $data["status"]=1;
    $data["payway"]=1;
    $pro=explode('$',I('goods'));
    $desc='';
    $m=0;
    $tprice=0;
    $dataList=array();
    foreach($pro as $k => $v){
      $g=explode(',',$v);
      // 库存ID，产品ID，购买数量，名称，图片，规格
      $G=$P->field('title,status')->find($g[1]);//产品是否在线
      if($G['status']==0){
        continue;
      }
      $H=$S->field('id,count,price,isdeleted')->find($g[0]);//库存是否在线
      if($H['isdeleted']==1){
        continue;
      }
      if($H['count']<1){
        continue;
      }
      if($g[2]>$H['count']){
        $g[2]=$H['count'];
      }
      $tmp=array(
        'openid'=>$openid,
        'num'=>$g[2],
        'sid'=>$g[0],//库存ID
        'pid'=>$g[1],//产品ID
        'style'=>$g[5],//规格名称
        'price'=>$H['price'],
        'time'=>time()
      );
      $img=$g[4];
      $desc.=$G["title"].','.$g[2].'件'.','.$g[5];
      $m+=$H['price']*$g[2];
      array_push($dataList,$tmp);
    }
    if(count($dataList)==0){
      $r['status']=0;
      $r['msg']='商品库存为0或已下架';
    }else{
      if($m<200){
        $m+=10;
      }
      $data["price"]=$m;
      $data["time"]=time();
      $data["summary"]=$desc;
      $data["status"]=1;
      $data["img"]=$img;
      $tip=$o1->add($data);
      if($tip){
        $dataLists=array();
        foreach ($dataList as $key => $value) {
          $tmp=$value;
          $tmp['oid']=$tip;
          array_push($dataLists,$tmp);
        }
        $tip2=$o2->addAll($dataLists);
        if($tip2){
          $r['flag']=1;
          $r['msg']='您已下单成功,请尽快支付';
          $r['order_id']=$tip;//订单ID
          foreach ($dataLists as $k => $v){
            $tip=$S->where("id=".$v['sid'])->setDec('count',$v['num']); // 减库存
          }
        }else{
          $r['flag']=0;
          $r['msg']='订单明细表写入失败';
          $o1->delete($tip);
        }
      }else{
        $r['flag']=0;
        $r['msg']='订单总表写入失败';
      }
    }
    $this->ajaxReturn($r);
  }

  /*用户取消*/
  public function cancel(){
    $openid=session('openid');
    $id=I('id');
    $D=M('order');
    $O=M('orderdetail');
    $d=$D->find($id);
    $r['flag']=0;
    if($d["openid"]==session('openid')){
      if($d['status']==1){
        //当前显示订单未支付
        $this->checkPayStatus($id);
        $d=$D->field('oid,status')->find($id);
        if($d['status']==1){
          //取消订单
          /*订单总表数据更新*/
          $e['oid']=$id;
          $e['status']=8;
          $D->save($e);
          /*订单子表数据更新*/
          $E=$O->field('pid,num,sid')->where('oid='.$id)->select();
          $G['status']=8;
          $O->where('oid='.$id)->save($G);
          /*回库存*/
          $S=M('stock');
          foreach ($E as $k => $v){
            $S->where("id=".$v['sid'])->setInc('count',$v['num']);
          }
          $r['flag']=1;
          $r['msg']="操作成功";
        }else{
          $r['msg']="非待支付订单,无法取消";
        }
      }else{
        $r['msg']="非待支付订单,无法取消";
      }
    }else{
      $r['msg']="没有权限";
    }
    $this->ajaxReturn($r);
  }

  /*用户确认收货*/
  public function check(){
    $openid=session('openid');
    $id=I('id');
    $D=M('order');
    $O=M('orderdetail');
    $d=$D->find($id);
    $r['flag']=0;
    if($d["openid"]==session('openid')){
      if($d['status']==4){
        //取消订单
        /*订单总表数据更新*/
        $e['oid']=$id;
        $e['status']=5;
        $D->save($e);
        /*订单子表数据更新*/
        $G['status']=5;
        $O->where('oid='.$id)->save($G);
        $r['flag']=1;
        $r['msg']="操作成功";
      }else{
        $r['msg']="未发货订单，无法确认";
      }
    }else{
      $r['msg']="没有权限";
    }
    $this->ajaxReturn($r);
  }

  /*支付*/
  public function pay(){
    $id=I('id');
    $D=M('order');
    $d=$D->find($id);
    $check=0;
    if($d['status']==2){
      //已支付
      $msg='已支付';
    }else{
      if($d['status']==1){
        //验证支付状态
        $this->checkPayStatus($id);
        $d=$D->find($id);
        if($d['status']==1){
          //没有支付
          if($d["openid"]==session('openid')){
            $data['d']=$d;
            $r['order']=$d;
            $url = "http://".DOMAIN."/market/api/result";
            $total_fee=$d['price']*100;
            $pD['out_trade_no']=$d['oid'];
            $pD['body']=mb_substr($d['summary'],0,15,'utf-8');
            $pD['total_fee']=$total_fee;
            $pD['notify_url']=$url;
            $pD['trade_type']='JSAPI';
            $pD['openid']=$d['openid'];
            $pD['appid']=$this->appId;
            $pD['mch_id']=$this->mchId;
            $pD['spbill_create_ip']=get_client_ip();
            $length=32;
            $pD['nonce_str']=$this->createNonceStr($length);
            $pD['sign']=$this->getSign($pD);
            $xml=$this->arrayToXml($pD);
            $response=$this->postXmlCurl($xml,'https://api.mch.weixin.qq.com/pay/unifiedorder',30);
            $result=$this->xmlToArray($response);
            if($result['return_code']="SUCCESS"){
              if($result['result_code']="SUCCESS"){
                $prepay_id=$result["prepay_id"];
                $err=$prepay_id.'prepay_id';
                $this->assign('signPackage',$this->getSignPackage());
                $this->assign('prepay_id',$prepay_id);
                $this->assign('appid',$this->appId);
                $p=$this->getParameters($prepay_id);
                $this->assign('p',$p);
                $this->assign('title','微信安全支付');
              }else{
                $err=$result['err_code'].'--'.$result['err_code_des'];
              }
            }else{
              $err=$result['return_msg'];
            }
            $check=1;
            $this->assign('err',$err);
            $endtime=($d['time']+PAY_OUT_TIME-time());
            $this->assign("endtime",$endtime);
            $this->assign("pay",$d['status']);
            $this->assign("d",$d);
          }else{
            $msg='没有支付权限';
          }
        }
      }else{
        $msg="无法支付";
      }
    }
    $this->assign("check",$check);
    $this->assign("msg",$msg);
    $this->display();
  }

  /*支付回调*/
  public function buycallback($oid){
    $D=M('order');
    $d=$D->find($oid);
    if($d['status']==1){
      $this->checkPayStatus($oid);//检查支付状况
      $d=$D->find($oid);
    }
    $ss=$this->PAY_STATUS_CODE[ $d['status'] ];
    $this->assign('r',$d);
    $this->assign('s',$ss);
    $this->display();
  }

  /*确认支付状态*/
  private function checkPayStatus($oid){
    $pD['appid']=$this->appId;
    $pD['mch_id']=$this->mchId;
    $pD['out_trade_no']=$oid;
    $length=32;
    $pD['nonce_str']=$this->createNonceStr($length);
    $pD['sign']=$this->getSign($pD);
    $xml=$this->arrayToXml($pD);
    $response=$this->postXmlCurl($xml,'https://api.mch.weixin.qq.com/pay/orderquery',30);
    $result=$this->xmlToArray($response);
    $r=0;
    if($result['return_code']=='SUCCESS'){
      if($result['result_code']=='SUCCESS'){
        if($result['trade_state']=='SUCCESS'){
          $this->paySuccess($oid,$result['transaction_id'],$result['time_end']);
          $r=1;
        }else{
          \Think\Log::write('微信调用显示未支付','UNPAY_checkPayStatus_1');
        }
      }else{
         // $r['msg']=$result['err_code_des'].$result['err_code'];
         \Think\Log::write('ID:'.$oid.'.'.$r['msg'],'UNPAY_checkPayStatus_2');
      }
    }else{
      // $r['msg']=$result['return_msg'];
      \Think\Log::write('ID:'.$oid.'.'.$r['msg'],'UNPAY_checkPayStatus_3');
    }
    if($r==0){
      $this->payEnd($oid);
    }
    return $r;
  }

  /*支付成功*/
  public function paySuccess($oid,$result,$time_end){
    //订单总表数据更新
    $O=M('order');
    $D=$O->find($oid);
    // $d['paytime']=time();
    $d['paytime']=$time_end;
    $d['status']=2;
    $d['paycode']=$result;
    $d['oid']=$oid;
    $tip=$O->save($d);
    if($tip){
      //订单子表数据更新
      $F['status']=2;
      M('orderdetail')->where('oid='.$oid)->save($F);
      $this->mb($D);
    }else{
      \Think\Log::write($oid.'支付成功,更新失败','paySuccessERR');
    }
  }

  /*未支付*/
  private function payEnd($oid){
    $O=M('order');
    $d=$O->find($oid);
    if((time()-$d['time'])>PAY_OUT_TIME){
      /*订单总表数据更新*/
      $e['oid']=$oid;
      $e['status']=7;
      $O->save($e);
      /*订单子表数据更新*/
      $O2=M('orderdetail');
      $E=$O2->field('pid,num,sid')->where('oid='.$oid)->select();
      $G['status']=7;
      $O2->where('oid='.$oid)->save($G);
      /*回库存*/
      $P=M('stock');
      foreach ($E as $k => $v){
        $P->where("id=".$v['sid'])->setInc('count',$v['num']);
      }
    }
  }

}
