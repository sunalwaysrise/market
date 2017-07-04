<?php
function mydate($d){
  if(strlen($d)==14){
    $r=substr($d,0,4)."-".substr($d,4,2)."-".substr($d,6,2)." ".substr($d,8,2).":".substr($d,10,2).":".substr($d,12,2);
  }else{
    $r=date('Y-m-d H:i:s',$d);
  }
  return $r;
}
?>