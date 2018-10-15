!function($){
	
	class reload{
		loadHF(){
			$('header').load('header.html');
			$('footer').load('footer.html');
		}
	}
	new reload().loadHF();
	
	//购物车效果
	class cart{
		constructor(){
			this.li=$('.notEmpty_cart_wrap .main_list li');
			this.empty=$('.empty_cart_wrap');
			this.noEmpty=$('.notEmpty_cart_wrap');
			this.helpBuyStr='';
			this.sidarr=[];
			this.numarr=[];
		}
		init(){
			this.cookieToArray();	//将cookie转化为数组   同时赋值给this.sidarr
			if(this.sidarr[0]&&this.numarr[0]){
				this.noEmpty.show();
				this.empty.hide();
				this.createcart(this.sidarr,this.numarr);
			}else{
				this.noEmpty.hide();
				this.empty.show();
			}
			
		}
		createcart(sidarr,numarr){
			var that=this;
			$.ajax({
				type:"post",
				url:"http://10.31.162.78/JD/php/cart.php",
				async:true,
				dataType:"json",
				data:{
					sidarr:sidarr
				}
			}).done(function(data){
				console.log(data);
				 $.each(data,function(i,value){
		                var $clone =that.li.clone(true);		//对隐藏的模块进行克隆
		                var num=numarr[i];
		                
		                //渲染数据
		                $clone.find('figure a').attr('href','details.html?sid='+data[i].sid);
		                $clone.find('figure').find('img').attr('src', data[i].img1);
		                $clone.find('figure').find('img').attr('sid', data[i].sid);
		                $clone.find('.tit').find('a').html(data[i].title.split(/\n\s*/)[0]).attr('href','details.html?sid='+data[i].sid);
		                $clone.find('.price').find('span').html(data[i].price);
		                $clone.find('.num').find('input').val(num);
		                if($clone.find('.check_one').is(':checked')){
		                	$clone.css("background","#fff4e8");
		                }
		                
		                //计算价格,每个商品的价格
		                var $dj1 = parseFloat($clone.find('.price span').html());			//获取单价
		                $clone.find('.one_sum span').html(($dj1 * num).toFixed(2));			//num：数量
		                $clone.css('display', 'block');				//克隆的模块是隐藏，显示出来。
		                $('.main_list').append($clone);				//追加
		                that.kong();										//购物车是否为空
						$clone.find('.check_one').on('click',function(){
							that.totalprice();						//总价和总数
							if($(this).is(':checked')){
								$(this).parents('li').css("background","#fff4e8");
							}else{
								$(this).parents('li').css("background","#fff");
							}
						})
						
						// +-按钮 改变商品数量
						$clone.find('.up').on('click',function(){
							var $count = $(this).parents('li').find('.num input').val();
		    				$count++;
							that.updonw($(this),$count);
						})
						$clone.find('.down').on('click',function(){
							var $count = $(this).parents('li').find('.num input').val();
		    				$count--;
							that.updonw($(this),$count);
						})
						
						//输入框改变商品数量
						$clone.find('.num input').on('input',function(){
							that.changeNum($(this));
						})
						
				 })
				 
				 var oli=$('.main_list li');
				 var all=$('.all');
				 
				 function quanxuan(){
				 	if($('.main_list li:visible .check_one:checked').size()==$('.main_list li:visible').size()){
						all.prop('checked',true);
					}else{
						all.prop('checked',false);
					}
				 }
				 quanxuan();
				//计算购物车中有多少个商品类
				$('.notEmpty_cart_wrap h2 span').html(oli.size()-1);
				
				//全选按钮
				all.on('click',function(){
					if($(this).is(':checked')){
						$('.main_list li .check_one').prop('checked',true);
						all.prop('checked',true);
						oli.css("background","#fff4e8");
					}else{
						$('.main_list li .check_one').prop('checked',false);
						all.prop('checked',false);
						oli.css("background","#fff");
					}
					that.totalprice();
				})

				$('.main_list li:visible .check_one').on('click',function(){
					quanxuan();
				})
				
				
				//删除单个商品
				$('.main_list').on('click','.del', function(ev) {
				   that.delgoods($(this));
				   that.kong();
				});
				
				//删除选中的商品
				$('.del_checked').on('click',function(){
					that.cookieToArray(); //转数组
					if($('.main_list li .check_one:checked').size()>=1){
						if(confirm('你确定要删除吗？')){
							$('.main_list li .check_one:checked').each(function(index,element){
								$(element).parents('li').remove();
								that.delgoodslist($(element).parents('li').find('img').attr('sid'),that.sidarr);
							})
							that.kong();
						}
					}else{
						alert('至少选择一项哦 亲~');
					}
				})
				
				//删除所有商品
				$('.del_all').on('click',function(){
					if(confirm('你确定清空购物车吗？')){
						$('.main_list li:visible').each(function(index,element){
							$(element).remove();
							that.delgoodslist($(element).find('img').attr('sid'),that.sidarr);
						})
						that.kong();
					}
				})
				
				//购物车帮你选
				$.each(that.sidarr, function(index,value) {
					that.helpyouBuy(value);
				});
			});
		}
		
		//计算数量改变后单个商品的价格
		singlegoodsprice(row){
			var $dj = parseFloat(row.parents('li').find('.price').find('span').html());
		    var $cnum = parseInt(row.parents('li').find('.num input').val());
		    return ($dj * $cnum).toFixed(2);
		}
		
		//改变商品数量++  --
		updonw(obj,$count){
		    if ($count >= 99) {
		        $count = 99;
		    }
		    if($count<=1)$count = 1;
		    obj.parents('li').find('.num input').val($count);
		    obj.parents('li').find('.one_sum').find('span').html(this.singlegoodsprice(obj));//改变后的价格
		    this.totalprice();
		    this.setcookie(obj);
		}
		
		//输入框改变商品数量
		changeNum(obj){
			var $reg = /^\d+$/g; 				//只能输入数字
		    var $value = parseInt(obj.val());
		    if ($reg.test($value)) {
		        if ($value >= 99) {				//限定范围
		            obj.val(99);
		        } else if ($value <= 0) {
		            obj.val(1);
		        } else {
		            obj.val($value);
		        }
		    } else {
		        obj.val(1);
		    }
		    obj.parents('li').find('.one_sum').find('span').html(this.singlegoodsprice(obj));//改变后的价格
		    this.totalprice();
		    this.setcookie(obj);
		}
		
		//计算总价格
		totalprice(){
			var total = 0;			//总的价格
		    var countnum = 0;		//总的数量
		    $('.main_list li:visible').each(function(i,ele) {					//可视的商品列表进行遍历，循环叠加
		        if ($(ele).find('.check_one').is(':checked')) {	//商品的复选框是选中的
		            total += parseFloat($(ele).find('.one_sum span').html());
		            countnum += parseInt($(ele).find('.num').find('input').val());
		        }
		    });
		    //赋值
		    $('.account div:eq(1) strong em span').html(total.toFixed(2));
		    $('.account div:eq(1) b span').html(countnum);
		}
		
		//删除cookie
		delgoodslist(sid,sidarr){
			var index = -1;
		    index=$.inArray(sid,sidarr);
		    if(index!=-1){
		    	this.sidarr=sidarr;
			    this.sidarr.splice(index, 1);//删除数组对应的值
			    this.numarr.splice(index, 1);//删除数组对应的值
			    console.log(this.sidarr);
			    this.addCookie('cartsid',this.sidarr.toString(),10);//添加cookie
			    this.addCookie('cartnum', this.numarr.toString(),10);
		    }
		    
		}
		
		//删除商品
		delgoods(obj){
			this.cookieToArray(); //转数组
		   if(confirm('你确定要删除吗？')){
		     obj.first().parents('li').remove();
		     this.delgoodslist(obj.first().parents('li').find('img').attr('sid'),this.sidarr);
		     this.totalprice();
		   }
		}
		
		//购物车帮你选
		helpyouBuy(sid){
			var that=this;
			$.ajax({
				type:"post",
				url:"http://10.31.162.78/JD/php/cart_helpyouBuy.php",
				async:true,
				dataType:"json",
				data:{
					sid:sid
				}
			}).done(function(data){
				console.log(data);
				$.each(data, function(index,value) {
					that.helpBuyStr+=`
								<li>
									<figure>
										<a href="details.html?sid=${value.sid}" target="_blank"><img src="${value.img1}" alt="" /></a>
									</figure>
									<p class="helpyou_tit"><a href="" target="_blank">${value.title}</a></p>
									<div class="helpyou_price">
										￥<span>${value.price}</span>
									</div>
									<div class="helpyou_common">
										<span>${value.comment}</span>人已购买
									</div>
								</li>
							`;
				});
				$('.w .helpyou').html(that.helpBuyStr);
			})
		}
		
		//获取cookie转化为数组
		cookieToArray(){
			if(this.getCookie('cartsid')){
		        this.sidarr=this.getCookie('cartsid').split(',');
		    }
		    
		    if(this.getCookie('cartnum')){
		        this.numarr=this.getCookie('cartnum').split(',');
		    }
		}
		
		//判断购物车是否为空
		kong(){
			this.cookieToArray();
			if(!(this.sidarr[0]&&this.numarr[0])){
				this.noEmpty.hide();
				this.empty.show();
			}
		}
		
		setcookie(obj){
			this.cookieToArray();
		    var $index = obj.parents('li').find('img').attr('sid');
		    this.numarr[this.sidarr.indexOf($index)] = obj.parents('li').find('.num input').val();
		    this.addCookie('cartnum',this.numarr.toString(), 10);
		}
		addCookie(key,value,day){
			var date = new Date(); //创建日期对象
	        date.setDate(date.getDate() + day); //过期时间：获取当前的日期+天数，设置给date
	        document.cookie = key + '=' + encodeURI(value) + ';expires=' + date; //添加cookie，设置过期时间
		}
		
		getCookie(key){
			var str = decodeURI(document.cookie);
	        var arr = str.split('; ');
	        for (var i = 0; i < arr.length; i++) {
	            var arr1 = arr[i].split('=');
	            if (arr1[0] == key) {
	                return arr1[1];
	            }
	        }
		}
		
		delCookie(key){
			this.addcookie(key,'',-1); 
		}
		
	}
	
	new cart().init();
	
}(jQuery)
