<?php
namespace Index\Controller;
use Think\Controller;
class ApiController extends Controller {
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
            
  private $KEY='';

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
            \Think\Log::write($O2['id'].'PAYSUCCESS');
            if(!$k){
              \Think\Log::write('O:'.$O2['id'].':40001');
            }
            echo "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
          }else{
            \Think\Log::write('O:'.$O2['id'].':40002');
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

  public function set($openid){
    session('openid',$openid);
  }
}