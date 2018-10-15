!function($){
	
	//用户名登录
	function getcookie(name){
		var arr=document.cookie.split('; ');
		var bstop=0;
		$.each(arr,function(index,value){
			var newarr=value.split('=');
			if(newarr[0]==name){
				bstop=newarr[1];
				return false;
			}
		});
		return bstop;
	}
	var username=getcookie('JDdata_username');
	
	if(username){
		$('header').find('.header .wrap ul li.denglu').remove();
		$('header').find('.header .wrap ul li.zhuce').remove();
		
		var ele=$('<li><a href="login.html">退出</a></li>');
		$('header .header .wrap ul').eq(0).prepend(ele);
		var ele=$('<li></li>');
		ele.html('<a style="color:#666;width:76px" href="#" class="elip">Hi, '+username+'</a>');
		$('header .header .wrap ul').eq(0).prepend(ele);
		
		$('.fs .fs_col4 .user span a').html(username);
		$('.fs .fs_col4 .user span a')
	}
	
	//头部的购物车效果
	var sidarr=null;
	var numarr=null;
	if(getcookie('cartsid')[0]&&getcookie('cartnum')[0]){
		sidarr=getcookie('cartsid').split(',');
		numarr=getcookie('cartnum').split(',');
	}
	
	if(sidarr&&numarr){
		$.ajax({
			type:"post",
			url:"http://10.31.162.78/JD/php/cart.php",
			async:true,
			dataType:"json",
			data:{
				sidarr:sidarr
			}
		}).done(function(data){
			$('.shop_hoverbox .shop .sum').html(data.length);
			var str='';
			$.each(data, function(index,value) {
				str+=`
					<li class="clear">
						<figure>
							<a href="details.html?sid=${value.sid}" target="_blank"><img src="${value.img1}" alt="" /></a>
						</figure>
						<p><a href="details.html?sid=${value.sid}" target="_blank">${value.title.split(/\n\s*/)[0]}</a></p>
						<b>￥<span class="price">${value.price}</span>x<span class="num">${numarr[index]}</span></b>
					</li>
					`;
			});
			$('.full_content ul').html(str);
		});
		$('.shop_hoverbox').hover(function(){
			
			$('.full_content').show();
			console.log($('full_content'))
		},function(){
			$('.full_content').hide();
		})
	}else{
		$('.shop_hoverbox').hover(function(){
			$('.empty_content').show();
		},function(){
			$('.empty_content').hide();
		})
	}
	
}(jQuery)
