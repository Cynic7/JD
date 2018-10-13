define(['config'],function(){
	require(['jquery','jqcookie'],function($,$jqcookie){
		if($.cookie('JDdata_username')){
			$('#username').val($.cookie('JDdata_username'));
			$('#password').val($.cookie('JDdata_password'));
		}
		$('#submit').on('click',function(){
			var usr=$('#username').val();
			var pas=$('#password').val();
			if(usr!=''&&pas!=''){
				$.ajax({
					type:"post",
					url:"http://10.31.162.78/JD/php/login.php",
					async:true,
					data:{
						username:usr,
						password:pas
					}
				}).done(function(data){
					if(data){
						$.cookie('JDdata_username',usr,{expires:10});
						$.cookie('JDdata_password',pas,{expires:10});
						location.href="index.html";
					}else{
						$('.errorInfo').show();
						$('.errorInfo span').html('账户名或密码错误,请重新输入');
					}
				});
			}else{
				$('.errorInfo span').html('用户名或密码不能为空');
			}
			
		});
		
	})
})