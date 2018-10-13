<?php
	include "conn.php";
	//手机
	$result=mysql_query("select * from goods where sid=61");
	$arr[0]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=63");
	$arr[1]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=75");
	$arr[2]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=78");
	$arr[3]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=66");
	$arr[4]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=74");
	$arr[5]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	
	//男装
	$result=mysql_query("select * from goods where sid=169");
	$arr[6]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=161");
	$arr[7]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=165");
	$arr[8]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=162");
	$arr[9]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=163");
	$arr[10]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=164");
	$arr[11]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	//女装
	$result=mysql_query("select * from goods where sid=121");
	$arr[12]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=122");
	$arr[13]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=123");
	$arr[14]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=124");
	$arr[15]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=125");
	$arr[16]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=126");
	$arr[17]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	//电脑
	$result=mysql_query("select * from goods where sid=213");
	$arr[18]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=214");
	$arr[19]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=215");
	$arr[20]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=216");
	$arr[21]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=217");
	$arr[22]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=219");
	$arr[23]=mysql_fetch_array($result,MYSQL_ASSOC);
	
	//零食
	$result=mysql_query("select * from goods where sid=184");
	$arr[24]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=197");
	$arr[25]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=191");
	$arr[26]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=192");
	$arr[27]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=193");
	$arr[28]=mysql_fetch_array($result,MYSQL_ASSOC);
	$result=mysql_query("select * from goods where sid=196");
	$arr[29]=mysql_fetch_array($result,MYSQL_ASSOC);
	echo json_encode($arr);
?>