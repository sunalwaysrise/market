<?php
namespace Manage\Controller;
use Think\Controller;
/**
* 订单页面
*/
class OrderController extends CommonController {
  public function _initialize(){
    parent::init();
    if(!$this->rbac(7)){
      $r['flag']=0;
      $r['msg']='没有权限';
      $this->ajaxReturn($r);
    }
  }
  // //正式

  protected $appId="";
  protected $appSecret="";
  protected $mchId="";
  protected $KEY='';

  public function getSignPackage(){
    $jsapiTicket = $this->getJsApiTicket();
    $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $timestamp = time();
    $length=16;
    $nonceStr = $this->createNonceStr($length);
    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
    $signature = sha1($string);
    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string
    );
    return $signPackage; 
  }
  private function createNonceStr($length) {
    $chars = "abcdefghijklmnopqrstuvwxyz0123456789";  
    $str ="";
    for ( $i = 0; $i < $length; $i++ )  {  
      $str.= substr($chars, mt_rand(0, strlen($chars)-1), 1);  
    }  
    return $str;
  }
  private function getJsApiTicket(){
    // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
    //$data = json_decode(file_get_contents("jsapi_ticket.json"));
    $data = S('jsapi_ticket');
    if($data->expire_time < time()){
      $accessToken = $this->getAccessToken();
      $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
      $res = json_decode($this->httpGet($url));
      $ticket = $res->ticket;
      if($ticket){
        $data->expire_time = time() + 7000;
        $data->jsapi_ticket = $ticket;
        // $fp = fopen("jsapi_ticket.json", "w");
        // fwrite($fp, json_encode($data));
        // fclose($fp);
        S('jsapi_ticket',$data);
      }
    } else {
      $ticket = $data->jsapi_ticket;
    }
    return $ticket;
  }
  private function getAccessToken() {
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
    //$data = json_decode(file_get_contents("access_token.json"));
    $data = S('weixin_access_token');
    if ($data->expire_time < time()) {
      $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
      $res = json_decode($this->httpGet($url));
      $access_token = $res->access_token;
      if ($access_token) {
        $data->expire_time = time() + 7000;
        $data->access_token = $access_token;
        // $fp = fopen("access_token.json", "w");
        // fwrite($fp, json_encode($data));
        // fclose($fp);
        S('weixin_access_token',$data);// 缓存数据7200秒
      }
    } else {
      $access_token = $data->access_token;
    }
    return $access_token;
  }
  private function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_URL, $url);
    $res = curl_exec($curl);
    curl_close($curl);
    return $res;
  }
  public function formatBizQueryParaMap($paraMap, $urlencode){
    $buff = "";
    ksort($paraMap);
    foreach ($paraMap as $k => $v){
      if($urlencode){
        $v = urlencode($v);
      }
      //$buff .= strtolower($k) . "=" . $v . "&";
      $buff .= $k . "=" . $v . "&";
    }
    $reqPar;
    if (strlen($buff) > 0) {
      $reqPar = substr($buff, 0, strlen($buff)-1);
    }
    return $reqPar;
  }
  public function arrayToXml($arr){
    $xml = "<xml>";
    foreach ($arr as $key=>$val){
      //$xml.="<".$key.">".$val."</".$key.">"; 
      if(is_numeric($val)){
        $xml.="<".$key.">".$val."</".$key.">"; 
      }else{
        $xml.="<".$key."><![CDATA[".$val."]]></".$key.">";  
      }
    }
    $xml.="</xml>";
    return $xml;
  }
  public function xmlToArray($xml){
    //将XML转为array
    $array_data = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
    return $array_data;
  }
  public function getSign($Obj){
    foreach ($Obj as $k => $v){
      $Parameters[$k] = $v;
    }
    //签名步骤一：按字典序排序参数
    ksort($Parameters);
    $String = $this->formatBizQueryParaMap($Parameters, false);
    //echo '【string1】'.$String.'</br>';
    //签名步骤二：在string后加入KEY
    $String = $String."&key=".$this->KEY;
    //echo "【string2】".$String."</br>";
    //签名步骤三：MD5加密
    $String = md5($String);
    //echo "【string3】 ".$String."</br>";
    //签名步骤四：所有字符转为大写
    $result_ = strtoupper($String);
    //echo "【result】 ".$result_."</br>";
    return $result_;
  }
  public function postXmlCurl($xml,$url,$second=30){   
    $ch = curl_init();
    //设置超时
    curl_setopt($ch, CURLOP_TIMEOUT, $second);
    //这里设置代理，如果有的话
    //curl_setopt($ch,CURLOPT_PROXY, '8.8.8.8');
    //curl_setopt($ch,CURLOPT_PROXYPORT, 8080);
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,FALSE);
    curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,FALSE);
    //设置header
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    //要求结果为字符串且输出到屏幕上
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    //post提交方式
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
    //运行curl
    $data = curl_exec($ch);
    curl_close($ch);
    //返回结果
    if($data){
      curl_close($ch);
      return $data;
    }else{ 
      $error = curl_errno($ch);
      echo "curl出错，错误码:$error"."<br>"; 
      echo "<a href='http://curl.haxx.se/libcurl/c/libcurl-errors.html'>错误原因查询</a></br>";
      curl_close($ch);
      return false;
    }
  }
  public function getParameters($prepay_id){
    $jsApiObj["appId"] = $this->appId;
    $timeStamp = time();
    $jsApiObj["timeStamp"] = "$timeStamp";
    $length=16;
    $jsApiObj["nonceStr"] = $this->createNoncestr($length);
    $jsApiObj["package"] = "prepay_id=$prepay_id";
    $jsApiObj["signType"] = "MD5";
    $jsApiObj["paySign"] = $this->getSign($jsApiObj);
    $parameters = json_encode($jsApiObj);
    return $parameters;
  }
  /*以上为微信提供方法*/

  public $pagesize=10;

  /**
  * parma
  * begin_time 开始时间
  * end_time 截至时间
  * status 订单状态
  * condition 查询条件内容
  * condition_type 查询条件类型 [1,2,3]
  */
  public function index($p=1){
    $p--;
    $O=M('order');
    $con=array();
    if(I('begin_time')){
      array_push($con,'time >'.strtotime(I('begin_time')));
    }
    if(I('end_time')){
      $end_time=strtotime(I('end_time'))+86400;
      array_push($con,'time <'.$end_time);
    }
    if(I('status') && I('status')!="0"){
      array_push($con,'status ="'.I('status').'"');
    }
    if(I('paycode')){
      array_push($con,'paycode ="'.I('paycode').'"');
    }
    if(I('nickname')){
      array_push($con,'nickname ="'.I('nickname').'"');
    }
    $con=join(' and ',$con);
    //dump($con);
    $l2=$O->where($con)->limit($p*$this->pagesize,$this->pagesize)->order('time desc')->select();
    $count=$O->where($con)->count();
    $list=array();
    $U=M('user');
    foreach ($l2 as $k => $v){
      $tmp=$v;
      $k=$U->field('nickname')->where('openid ="'.$v['openid'].'"')->find();
      $tmp['user']=$k;
      array_push($list, $tmp);
    }
    $r['flag']=1;
    $r['total_items']=$count;
    $r['current_page']=$p;
    $r['page_size']=$this->pagesize;
    $r['result']=$list;
    $this->ajaxReturn($r);
  }

  /**
  *今日订单
  */
  public function today(){
    $O=M('order');
    $U=M('user');
    $t1=strtotime(date('Y-m-d'));
    //显示当天的总订单数量
    $list1=array();
    $l1=$O->where('time >'.$t1)->order('time desc')->select();
    foreach ($l1 as $k => $v){
      $tmp=$v;
      $k=$U->field('nickname')->where('openid ="'.$v['openid'].'"')->find();
      $tmp['user']=$k;
      array_push($list1, $tmp);
    }
    $r['today_total_order']=$list1;
    // 1:待付款;2:已支付;3:待发货;4:已发货;5:已签收;6:已完成;7:已过期;8:已取消
    //待发货订单数量
    $list2=array();
    $l1=$O->where('status in (2,3) and time >'.$t1)->order('time desc')->select();
    foreach ($l1 as $k => $v){
      $tmp=$v;
      $k=$U->field('nickname')->where('openid ="'.$v['openid'].'"')->find();
      $tmp['user']=$k;
      array_push($list2, $tmp);
    }
    $r['today_unsend_order']=$list2;
    //已完成交易订单数量
    $list3=array();
    $l1=$O->where('status in (4,5,6)  and time >'.$t1)->order('time desc')->select();
    foreach ($l1 as $k => $v){
      $tmp=$v;
      $k=$U->field('nickname')->where('openid ="'.$v['openid'].'"')->find();
      $tmp['user']=$k;
      array_push($list3, $tmp);
    }
    $r['today_finished_order']=$list3;
    $r['flag']=1;
    $this->ajaxReturn($r);
  }

  /**
  *订单详情
  * summary 订单概要
  * detail [] 列表
  */ 
  public function detail($id){
    $O=M('order');
    $r['flag']=1;
    $r['summary']=$O->find($id);
    $sql='select P.title,P.imgs,P.price AS now_price,O.id,O.pid,O.num,O.price,O.time from l_product AS P INNER JOIN l_orderdetail AS O ON P.pid = O.pid where O.oid='.$id;
    $r['detail']=M()->query($sql);
    $this->ajaxReturn($r);
  }
  /**
  * 管理员备注
  */
  public function managetip(){
    $O=M('order');
    $d['oid']=I('id');
    $d['managetip']=I('managetip');
    $tip=$O->save($d);
    if($tip){
      $r['flag']=1;
      $r['msg']='操作成功';
    }else{
      $r['flag']=0;
      $r['msg']='操作失败';
    }

    $this->ajaxReturn($r);
  }
  /**
  * 修改物流信息
  */ 
  public function change_logistics(){
    $O=M('order');
    $o=$O->find(I('id'));
    //订单状态1:待付款;2:已支付;3:待发货;4:已发货;5:已签收;6:已完成;7:已过期;8:已取消
    if($o['status']<4){
      $d['nickname']=I('nickname');
      $d['phone']=I('phone');
      $d['address']=I('address');
      $d['oid']=I('id');
      $tip=$O->save($d);
      if($tip){
        $r['flag']=1;
        $r['msg']='修改成功';
      }else{
        $r['flag']=0;
        $r['msg']='修改失败';
      }
    }else{
      $r['flag']=0;
      $r['msg']='订单已发货,信息无法修改';
    }
    $this->ajaxReturn($r);
  }

  /**
  * 修改订单状态
  */ 
  public function change_status(){
    $O=M('order');
    $O2=M('orderdetail');
    $oid=I('id');
    $orders=$O->find($oid);
    $to_status=I('status');
    $now_status=$orders['status'];
    $data['oid']=$oid;
    if( $to_status==2 && $now_status==1 ){
      // 后台设置为已收款
      $data['status']=2;
      $tip=$O->save($data);
      if($tip){
        $dd['status']=2;
        $O2->where('oid='.$oid)->save($dd);
        $r['flag']=1;
        $r['msg']='成功';
      }else{
        $r['flag']=0;
        $r['msg']='失败';
      }
    }else if( $to_status==4 && ( $now_status==2||$now_status==3 ) ){
      // 已付款,待发货订单设置为已发货
      if(!$orders['kdname']||!$orders['kdcode']){
        $r['flag']=0;
        $r['msg']='操作失败，请先设置快递信息';
      }else{
        $data['status']=4;
        $tip=$O->save($data);
        if($tip){
          $dd['status']=4;
          $O2->where('oid='.$oid)->save($dd);
          $r['flag']=1;
          $r['msg']='成功';
          $this->mb($orders);
        }else{
          $r['flag']=0;
          $r['msg']='失败';
        }
      }
    }else if( $to_status==6 && ( $now_status==4 || $now_status==5 ) ){
      // 已发货 和 已签收 的订单设置为 已完成
      $data['status']=6;
      $tip=$O->save($data);
      if($tip){
        $dd['status']=6;
        $O2->where('oid='.$data['oid'])->save($dd);
        $r['flag']=1;
        $r['msg']='成功';
      }else{
        $r['flag']=0;
        $r['msg']='失败';
      }
    }else if( $to_status==8 ){
      // 取消订单
      $data['status']=8;
      $tip=$O->save($data);
      if($tip){
        $dd['status']=8;
        $O2->where('oid='.$oid)->save($dd);
        $r['flag']=1;
        $r['msg']='成功';

        /*回库存*/
        if( $now_status!=8 && $now_status!=7 ){
          $E=$O2->where('oid='.$oid)->select();
          $P=M('stock');
          foreach ($E as $k => $v){
            $P->where("id=".$v['sid'])->setInc('count',$v['num']);
          }
        }
      }else{
        $r['flag']=0;
        $r['msg']='失败';
      }
    }else{
      $r['flag']=0;
      if($now_status==1){
        $msg='仅能设置为已支付';
      }else if($now_status==2||$now_status==3){
        $msg='仅能设置为已发货';
      }else if($now_status==4||$now_status==5){
        $msg='仅能设置为已完成';
      }else if($now_status==6){
        $msg='仅能设置为已取消';
      }else if($now_status==7||$now_status==8){
        $msg='当前状态订单无法做此操作';
      }
      $r['msg']=$msg;
    }
    $this->ajaxReturn($r);
  }

  /**
  * 设置物流信息
  * 待付款，已签收，已过期，已取消 状态的订单无法调用
  */
  public function send_goods(){
    $O=M('order');
    $oid=I('id');
    $orders=$O->find($oid);
    $data['oid']=$oid;
    $order_status=$orders['status'];
    if( $order_status == 1 || $order_status == 5 || $order_status == 7 || $order_status == 8  ){
      $r['flag']=0;
      $r['msg']='该订单无法调整物流信息';
    }else{
      $data['kd']=trim(I('kd'));
      $data['kdname']=trim(I('kdname'));
      $data['kdcode']=trim(I('kdcode'));
      $data['kdtime']=time();
      $tip=$O->save($data);
      if($tip){
        $r['flag']=1;
        $r['msg']='成功';
      }else{
        $r['flag']=0;
        $r['msg']='失败';
      }
    }
    $this->ajaxReturn($r);
  }

  /**
  * 所有未支付订单 同步最新状态,有支付单号但是状态错误订单同步
  */
  public function order_sync(){
    $O=M('order');
    $orders=$O->field('oid')->where('status =1')->select();
    foreach ($orders as $k => $v) {
      $this->m_order_sync($v['oid']);
    }
    $orders=$O->field('oid')->where('status = 7 and paycode!=""')->select();
    $O2=M('orderdetail');
    foreach ($oo2 as $k => $v){
      $oid=$v['oid'];
      $cc['oid']=$oid;
      $cc['status']=2;
      $dd['status']=2;
      $O->save($cc);
      $O2->where('oid='.$oid)->save($dd);
      \Think\Log::record('订单'.$oid.'已支付,但显示过期','ERR');
    }
    $r['flag']=1;
    $this->ajaxReturn($r);
  }
  /**
  * 去微信询问是否支付成功
  */
  private function m_order_sync($oid){
    $pD['appid']=$this->appId;
    $pD['mch_id']=$this->mchId;
    $pD['out_trade_no']=$oid;
    $length=32;
    $pD['nonce_str']=$this->createNonceStr($length);
    $pD['sign']=$this->getSign($pD);
    $xml=$this->arrayToXml($pD);
    $response=$this->postXmlCurl($xml,'https://api.mch.weixin.qq.com/pay/orderquery',30);
    $result=$this->xmlToArray($response);
    $tf=true;
    $O=M('order');
    $D=$O->find($oid);
    $O2=M('orderdetail');
    if($result['return_code']=='SUCCESS'){
      if($result['result_code']=='SUCCESS'){
        if($result['trade_state']=='SUCCESS'){
          $d['paytime']=time();
          $d['status']=2;
          $d['paycode']=$result['transaction_id'];
          $d['oid']=$oid;
          $tf=false;
          $tip=$O->save($d);
          $F['status']=2;
          $O2->where('oid='.$oid)->save($F);
          \Think\Log::record('订单'.$D['oid'].'已支付');
        }
      }
    }
    if($tf){
      if((time()-$D['time'])>PAY_OUT_TIME){
        $e['oid']=$oid;
        $e['status']=7;
        $f['status']=7;
        $O->save($e);
        $O2->where('oid='.$oid)->save($f);
        /*回库存*/
        $E=$O2->where('oid='.$oid)->select();
        $P=M('stock');
        foreach ($E as $k => $v){
          $P->where("id=".$v['sid'])->setInc('count',$v['num']);
        }
        \Think\Log::record('订单'.$D['oid'].'过期未支付');
      }
    }
  }

  /**
  * 消息模板
  */
  private function mb($D){
    $accessToken = $this->getAccessToken();
    $url='https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
    $openid=$D['openid'];
    $summary=$D['summary'];
    $oid=$D['oid'];
    $kd=$D['kd'];
    $kdcode=$D['kdcode'];
    $nickname=$D['nickname'];
    $address=$D['shen'].''.$D['shi'].''.$D['address'];
    $remark='发货时间:'.date("Y-m-d H:i:s",$D['kdtime']);
    $link="http://".DOMAIN."/#!/order_detail/".$oid;
    $json='{
      "touser":"'.$openid.'",
      "template_id":"c7GI_YQ4EN6Z-keAxt9l_Xz2hpApfDKJPLa2H7LXEs4",
      "url":"'.$oid.'",
      "topcolor":"#FF0000",
      "data":{
        "first": {
        "value":"您好，您的商品已经开始配送",
        "color":"#173177"
        },
        "keyword1": {
        "value":"'.$summary.'",
        "color":"#173177"
        },
        "keyword2":{
        "value":"'.$kd.'",
        "color":"#173177"
        },
        "keyword3":{
        "value":"'.$kdcode.'",
        "color":"#173177"
        },
        "keyword4":{
        "value":"'.$address.'",
        "color":"#173177"
        },
        "remark":{
        "value":"'.$remark.'",
        "color":"#173177"
        }
      }
    }';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_URL,$url);  
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec($ch);  
    \Think\Log::write('订单:'.$oid.'调用模板'.$result,'ERR');
  }

}
?>