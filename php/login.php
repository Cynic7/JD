<?php
	require "conn.php";
	
	if(isset($_POST['username'])){//前端ajax传输过来的值
		$username=$_POST['username'];
		$password=md5($_POST['password']);
	}else{
		exit('非法操作');
	}

	$query="select * from user where username='$username' and password='$password'";
	$result=mysql_query($query);
	
	if(mysql_fetch_array($result)){
		echo true;
	}else{
		echo false;
	}
?>
