<?php
namespace Market\Controller;
use Think\Controller;
class ApiController extends Controller {
  public $PAY_SUCCESS_TPL="";

  public function index(){
  }
  public function valid(){
    $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
    if (!empty($postStr)){
      $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
      $RX_TYPE = trim($postObj->MsgType);
      switch($RX_TYPE){
        case "text":
          $resultStr = $this->handleText($postObj);
          break;
        case "event":
          $resultStr = $this->responseText($postObj);
          break;
        case "location":
          $resultStr = $this->locationText($postObj);
          break;
        default:
          $resultStr = $this->handleText($postObj);
          break;
      }
      echo $resultStr;
    }else{
      $resultStr = $this->handleText($postObj);
      echo $resultStr;
    }
  }

  private function checkSignature(){
      $signature = $_GET["signature"];
      $timestamp = $_GET["timestamp"];
      $nonce = $_GET["nonce"];    
      $token = 'wutuaa1d3g5';
      $tmpArr = array($token, $timestamp, $nonce);
      sort($tmpArr);
      $tmpStr = implode( $tmpArr );
      $tmpStr = sha1( $tmpStr );
      if( $tmpStr == $signature ){
          return true;
      }else{
          return false;
      }
  }
            
  protected $KEY='';

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

  public function result(){//微信通知
    $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
    if(!empty($postStr)){
      $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
      if($postObj->result_code=="SUCCESS" && $postObj->result_code=="SUCCESS"){
        $oid=strval($postObj->out_trade_no);
        $O=M('order');
        $order=$O->find($oid);
        if($order['status']==1){
          $o['appid']=$postObj->appid;
          $o['bank_type']=$postObj->bank_type;
          $o['cash_fee']=$postObj->cash_fee;
          $o['fee_type']=$postObj->fee_type;
          $o['is_subscribe']=$postObj->is_subscribe;
          $o['mch_id']=$postObj->mch_id;
          $o['nonce_str']=$postObj->nonce_str;
          $o['openid']=$postObj->openid;
          $o['out_trade_no']=$postObj->out_trade_no;
          $o['result_code']=$postObj->result_code;
          $o['return_code']=$postObj->return_code;
          $o['time_end']=$postObj->time_end;
          $o['total_fee']=$postObj->total_fee;
          $o['trade_type']=$postObj->trade_type;
          $o['transaction_id']=$postObj->transaction_id;
          $KEY=$this->getSign($o);
          if($KEY==$postObj->sign){

            $i['oid']=$order['oid'];
            $i['status']=2;
            $i['paycode']=strval($postObj->transaction_id);
            $i['paytime']=strval($postObj->time_end);
            
            $k=$O->save($i);
            $O2=M('orderdetail');
            $E=$O2->where('oid='.$oid)->select();
            foreach ($E as $k => $v){
              $F['id']=$v['id'];
              $F['status']=2;
              $O2->save($F);
            }
            $this->pay_success_mb($order);
            \Think\Log::write($oid.'PAYSUCCESS');
            if(!$k){
              \Think\Log::write('O:'.$oid.':40001');
            }
            echo "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
          }else{
            \Think\Log::write('O:'.$oid.':40002');
            echo "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[SIGN_ERROR]]></return_msg></xml>";
          }
        }else{
          echo "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[SUCCESSED]]></return_msg></xml>";
        }
      }else{
        echo "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[UNSUCCESS]]></return_msg></xml>";
      }
    }else{
      echo "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[EMPTY]]></return_msg></xml>";
    }
  }

  protected function getAccessToken() {
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

  public function test($id=114){
    $this->pay_success_mb(M('order')->find($id));
  }
  
  protected function pay_success_mb($D){
    $accessToken = $this->getAccessToken();
    $url='https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$accessToken;
    $openid=$D['openid'];
    $summary=$D['summary'];
    $oid=$D['oid'];
    $price=$D['price'];
    $first='您好，您的订单已支付';
    $link="http://".DOMAIN."/#!/order_detail/".$oid;
    $remark="我们马上为您发货，感谢您的光临~";
    $json='{
      "touser":"'.$openid.'",
      "template_id":"'.$this->PAY_SUCCESS_TPL.'",
      "url":"'.$link.'",
      "topcolor":"#FF0000",
      "data":{
        "first": {
        "value":"'.$first.'",
        "color":"#173177"
        },
        "keyword1": {
        "value":"'.$summary.'",
        "color":"#173177"
        },
        "keyword2":{
        "value":"订单号8080-'.$oid.'",
        "color":"#173177"
        },
        "keyword3":{
        "value":"'.$price.'",
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

  public function set($openid){
    session('openid',$openid);
  }
}