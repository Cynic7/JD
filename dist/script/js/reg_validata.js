define(["config"],function(){require(["jquery","validata"],function(e,r){e(function(){e(".form1").validate({rules:{username:{required:!0,minlength:6,maxlength:18,remote:{url:"http://10.31.162.78/JD/php/reg.php",type:"post"}},password:{required:!0,rangelength:[6,16]},repass:{required:!0,equalTo:"#password"},email:{required:!0,email:!0},checkbox:{required:!0}},messages:{username:{required:"用户名不能为空",minlength:"用户名长度不能小于6",maxlength:"用户名长度不能大于18",remote:"用户名已存在"},password:{required:"密码不能为空",rangelength:"密码长度需要在6到16之间"},repass:{required:"密码重复不能为空",equalTo:"密码与上次输入不同"},email:{required:"电子邮箱不能为空",email:"你输入的邮箱格式有误"},checkbox:{required:"请勾选"}}})}),e.validator.setDefaults({success:function(e){e.text("√").css({color:"green"}).addClass("valid")}})})});