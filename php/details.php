<?php  

	require "conn.php";
	
	if(isset($_GET['sid'])){
		$sid=$_GET['sid'];
		
		$result=mysql_query("select * from goods where sid='$sid'");
		
		$arr=array();
		for($i=0;$i<mysql_num_rows($result);$i++){
			$arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
		}
		echo json_encode($arr);
	}

?>