<?php
namespace Manage\Controller;
use Think\Controller;
class CommonController extends Controller {
  public function init(){
    if ( !isset($_SESSION["qcid"]) ){
      $r['flag']=-1;
      $r['msg']='未登录';
      $this->ajaxReturn($r);
    }else{
      $this->qcid=$_SESSION['qcid'];
      $this->RBAC=$_SESSION['rbac'];
    }
  }
  public function rbac($k){
    $r=explode(',',$this->RBAC);
    if(in_array($k,$r)){
      return true;
    }else{
      return false;
    }
  }
  public function exportexcel($data=array(),$title=array(),$filename='report'){
    header("Content-type:application/octet-stream");
    header("Accept-Ranges:bytes");
    header("Content-type:application/vnd.ms-excel;charset=gbk");  
    header("Content-Disposition:attachment;filename=".$filename."gbk.xls");
    header("Pragma: no-cache");
    header("Expires: 0");
    //导出xls 开始
    if (!empty($title)){
      foreach ($title as $k => $v) {
        $title[$k]=iconv("UTF-8", "GB2312//IGNORE",$v);
      }
      $title= implode("\t", $title);
      echo "$title\n";
    }
    if (!empty($data)){
      foreach($data as $key=>$val){
        foreach ($val as $ck => $cv) {
          $data[$key][$ck]=iconv("UTF-8", "GB2312//IGNORE", $cv);
        }
        $data[$key]=implode("\t", $data[$key]);
      }
      echo implode("\n",$data);
    }
  }
}
?>