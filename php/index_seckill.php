<?php
	include "conn.php";
	$result=mysql_query("select * from goods where sid=61");
	$arr[0]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	$result=mysql_query("select * from goods where sid=65");
	$arr[1]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	$result=mysql_query("select * from goods where sid=180");
	$arr[2]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	$result=mysql_query("select * from goods where sid=177");
	$arr[3]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	$result=mysql_query("select * from goods where sid=178");
	$arr[4]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=179");
	$arr[5]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=188");
	$arr[6]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=181");
	$arr[7]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	$result=mysql_query("select * from goods where sid=166");
	$arr[8]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=163");
	$arr[9]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=192");
	$arr[10]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=203");
	$arr[11]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	echo json_encode($arr);
?>