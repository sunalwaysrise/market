<?php
include 'phpqrcode.php';
$q=$_REQUEST["k"];
QRcode::png($q);
?>