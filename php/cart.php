<?php
	require "conn.php";
	
	if(isset($_POST['sidarr'])){
		$sidarr=$_POST['sidarr'];
		$arr=array();
		for($i=0;$i<sizeof($sidarr);$i++){
			$result=mysql_query("select * from goods where sid='$sidarr[$i]'");
			$arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
		}

//		$arr=array();
//		for($i=0;$i<mysql_num_rows($result);$i++){
//			$arr2[$i][0]=mysql_fetch_array($result,MYSQL_ASSOC);
//		}
		echo json_encode($arr);
	}


//	$result=mysql_query("SELECT *,RAND() as r FROM goods ORDER BY r LIMIT 0,10");
//	$arr=array();
//	for($i=0;$i<mysql_num_rows($result);$i++){
//		$arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
//	}
//	echo json_encode($arr);
?>