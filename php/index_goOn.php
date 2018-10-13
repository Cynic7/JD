<?php  
	require "conn.php";

	$result=mysql_query("SELECT *,RAND() as r FROM goods ORDER BY r LIMIT 0,10");
	$arr=array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	echo json_encode($arr);
	
?>