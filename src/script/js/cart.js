!function($){
	
	class reload{
		loadHF(){
			$('header').load('header.html');
			$('footer').load('footer.html');
		}
	}
	new reload().loadHF();
	
	class cart{
		constructor(){
			this.li=$('.notEmpty_cart_wrap .main_list li');
		}
		init(){
			this.createcart();
		}
		createcart(sid,num){
			var that=this;
			$.ajax({
				type:"post",
				url:"http://10.31.162.78/JD/php/cart.php",
				async:true,
				dataType:"json",
				data:{
					sidarr:[61,62,63,64]
				}
			}).done(function(data){
				console.log(data);
				 $.each(data,function(i,value){
				 	//图片的sid和数据里面的sid匹配
				 	num=1;
		                var $clone =that.li.clone(true);//对隐藏的模块进行克隆
		                console.log($clone);
		                //都是赋值
		                $clone.find('figure').find('img').attr('src', data[i].img1);
		                $clone.find('figure').find('img').attr('sid', data[i].sid);
		                $clone.find('.tit').find('a').html(data[i].title);
		                $clone.find('.price').find('span').html(data[i].price);
		                $clone.find('.num').find('input').val(num);
		                //计算价格,每个商品的价格
		                var $dj1 = parseFloat($clone.find('.price span').html());//获取单价
		                $clone.find('.one_sum span').html(($dj1 * num).toFixed(2));//num：数量
		                $clone.css('display', 'block');//克隆的模块是隐藏，显示出来。
		                $('.main_list').append($clone);//追加
//		                kong();//购物车是否为空
//		                totalprice();//总价和总数
		            
				 })
			});
		}
		
		addcookie(key,value,day){
			var date = new Date(); //创建日期对象
	        date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
	        document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
		}
		
		getcookie(key){
			var str = decodeURI(document.cookie);
	        var arr = str.split('; ');
	        for (var i = 0; i < arr.length; i++) {
	            var arr1 = arr[i].split('=');
	            if (arr1[0] == key) {
	                return arr1[1];
	            }
	        }
		}
		
		delcookie(key){
			this.addcookie(key,'',-1); 
		}
		
	}
	
	new cart().init();
	
}(jQuery)
