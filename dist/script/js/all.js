require(['reg_validata']);

define(['config'],function(){
	require(['jquery','validata'],function($,validata){
		$(function(){
				$('.form1').validate({
					rules:{
						username:{
							required:true,
							minlength:6,
							maxlength:18,
							remote: {//将前端的name给后端
							    url: "http://10.31.162.78/JD/php/reg.php",     //后台处理程序
							    type: "post"               //数据发送方式
							}
						},
						password:{
							required:true,
							rangelength:[6,16]
						},
						repass:{
							required:true,
							equalTo:'#password'
						},
						email:{
							required:true,
							email:true
						},
						checkbox:{
							required:true
						}
					},
					messages:{
						username:{
							required:'用户名不能为空',
							minlength:'用户名长度不能小于6',
							maxlength:'用户名长度不能大于18',
							remote:'用户名已存在'
						},
						password:{
							required:'密码不能为空',
							rangelength:'密码长度需要在6到16之间'
						},
						repass:{
							required:'密码重复不能为空',
							equalTo:'密码与上次输入不同'
						},
						email:{
							required:'电子邮箱不能为空',
							email:'你输入的邮箱格式有误'
						},
						checkbox:{
							required:'请勾选'
						}
					}
					
				});
			});
			
		$.validator.setDefaults({
		    /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
		    success: function(label){
		        label.text('√').css({color:"green"}).addClass('valid');
		    }
		});
		
//		console.log($('.form-control'));
//		
//		$('.form-control').on('input',function(){
//			var lab=$('.tishi').eq($(this).index('.form-control'));
//			if(lab.html()!="√"&&!lab.hasClass('valid')){
//				lab.css({color:"red",fontWeight:"normal"});
//			}
//		});
		
	})
})