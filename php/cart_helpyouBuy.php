<?php
	require "conn.php";
	
	if(isset($_POST['sid'])){
		$sid=$_POST['sid'];
		if($sid<=240)$sid++;
		$arr=array();
		for($i=0;$i<10;$i++){
			$result=mysql_query("select * from goods where sid='$sid'");
			if(mysql_num_rows($result)){
				array_push($arr,mysql_fetch_array($result,MYSQL_ASSOC));
			}else{
				$sid++;
				continue;
			}
			if(sizeof($arr)>=4){
				break;
			}
			if($sid<=240){
				$sid++;
			}else{
				$sid=150;
			}
		}
		echo json_encode($arr);
	}
?>