<?php
namespace Market\Controller;
use Think\Controller;
/**
*微信方法
*/
class CommonController extends Controller{

  protected $appId="wxcdaf4f91f65ff448";
  protected $appSecret="f5aad4174c3b5050e2af0491b1f5048f";
  protected $mchId="1480845562";
  protected $KEY='0e2af0491b1f5048ff5aad4174c3b505';
  public $PAY_STATUS_CODE=array('1'=>'待付款,去支付','2'=>'已支付','3'=>'待发货','4'=>'已发货','5'=>'已签收','6'=>'已完成','7'=>'已过期','8'=>'已取消');

  private function set_pid($k,$M){
    $Me=$M->find($k);
    if($Me['category']==1){
      $r['pid']=$k;
      $r['tid']='';
    }else{
      $r['pid']=$Me['pid'];//共享销售代表
      $r['tid']=$Me['uid'];//推荐人ID
    }
    return $r;
  }
  // public function _initialize(){
  //   session('openid','oDZrXwQW1K7mmIej-ap3r__Mg3Lc');
  // }

  public function _initialize(){
    if(!session('openid')){
      if(I('state')=='signup'){
        if(I('code')){
          $url='https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$this->appId.'&secret='.$this->appSecret.'&code='.I('code').'&grant_type=authorization_code';
          $str=$this->httpGet($url);
          $str=json_decode($str);
          $url='https://api.weixin.qq.com/sns/userinfo?access_token='.$str->access_token.'&openid='.$str->openid.'&lang=zh_CN';
          $str=$this->httpGet($url);
          $str=json_decode($str);
          $u=M('user');
          $d['openid']=$str->openid;
          $d['nickname']=$str->nickname;
          $d['sex']=$str->sex;
          $d['city']=$str->city;
          $d['country']=$str->country;
          $d['province']=$str->province;
          $d['language']=$str->language;
          $d['headimgurl']=$str->headimgurl;
          $d['subscribe_time']=$str->subscribe_time;
          $d['remark']=$str->remark;
          $d['category']=0;
          $d['register']=time();
          $d['status']=1;
          $d['username']='wechat';
          $d['password']='wechat';
          $ii['updatetime']=time();
          if($d['openid']){
            $openid=$d['openid'];
            session('openid',$openid);
            $k=I('k');
            if($k){
              $pid_msg=$this->set_pid($k,$u);
              $d['pid']=$pid_msg['pid'];
              $d['tid']=$pid_msg['tid'];
              $d['pidtime']=time();
            }
            $u->add($d);
          }
        }else{
          dump('SQ ERROR');
        }
      }else{
        if(I('code')){
          //从微信获取openid
          $url='https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$this->appId.'&secret='.$this->appSecret.'&code='.I('code').'&grant_type=authorization_code';
          $str=$this->httpGet($url);
          $str=json_decode($str);
          $openid=$str->openid;
          if($openid){
            $U=M('user');
            $me=$U->where('openid ="'.$openid.'"')->find();
            if(!$me){
              $URL = urlencode("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
              $link='https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$this->appId.'&redirect_uri='.$URL.'&response_type=code&scope=snsapi_userinfo&state=signup#wechat_redirect';
              Header("Location: $link");
              die();
            }else{
              if( time()-$me['updatetime']>604800 ){
                //更新头像和昵称。一天只操作一次
                $ACCESS_TOKEN=$this->getAccessToken();
                $url='https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$ACCESS_TOKEN.'&openid='.$openid;
                $str=$this->httpGet($url);
                $str=json_decode($str);
                if($str->headimgurl!=$me['headimgurl'] || $str->nickname!=$me['nickname']){
                  if($str->headimgurl){
                    $ii['headimgurl']=$str->headimgurl;
                  }
                  if($str->nickname){
                    $ii['nickname']=$str->nickname;
                  }
                  $ii['uid']=$me['uid'];
                  $ii['updatetime']=time();
                  $U->save($ii);
                }
              }
              session('openid',$openid);
            }
          }
        }else{
          //去微信取OPENID
          $URL = urlencode("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
          $link='https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$this->appId.'&redirect_uri='.$URL.'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
          Header("Location: $link");
          die();
        }
      }
    }else{
      $k=I("k");
      if($k){
        $openid=session('openid');
        $u=M('user');
        $me=$u->where('openid ="'.$openid.'"')->find();
        if(!$me['pid']){
          $pid_msg=$this->set_pid($k,$u);
          $d['pid']=$pid_msg['pid'];
          $d['tid']=$pid_msg['tid'];
          $d['uid']=$me['uid'];
          $d['pidtime']=time();
          $u->save($d);
        }
      }
    }
  }
  
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
  public function getSignPackageBack(){
    $jsapiTicket = $this->getJsApiTicket();
    $url=$_GET['url'];
    // dump($url);
    $timestamp = time();
    $nonceStr = $this->createNonceStr();
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
    $signature = sha1($string);
    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string,
      "len"=>strlen($url)
    );
    $this->ajaxReturn($signPackage);
  }
  protected function createNonceStr($length) {
    $chars = "abcdefghijklmnopqrstuvwxyz0123456789";  
    $str ="";
    for ( $i = 0; $i < $length; $i++ )  {  
      $str.= substr($chars, mt_rand(0, strlen($chars)-1), 1);  
    }  
    return $str;
  }
  protected function getJsApiTicket(){
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
  protected function httpGet($url) {
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
      $errmsg="curl出错，错误码:$error"."<a href='http://curl.haxx.se/libcurl/c/libcurl-errors.html'>错误原因查询</a>";
      \Think\Log::write($errmsg);
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

  
}