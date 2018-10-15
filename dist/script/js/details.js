!function($){
	class reload{
		loadHF(){
			$('header').load('header.html');
			$('footer').load('footer.html');
		}
	}
	new reload().loadHF();
	
	//渲染
	class draw{
		constructor(){
			this.$str=location.search.split('?')[1];
			this.$arr=this.$str.split('&');
			
		}
		drawData(){
			for(var value of this.$arr){
				this.$new=value.split('=');
				if(this.$new[0]=='sid'){this.$sid=this.$new[1];break;}
			}
			
			
			$.ajax({
				type:"get",
				url:"http://10.31.162.78/JD/php/details.php?sid="+this.$sid,
				async:true,
				dataType:"json"
			}).done(function(data){
				var that=this;
				this.dataObj=data[0];
				console.log(this.dataObj);
				var smallimg=$(`<img src="${this.dataObj.img1}" alt="" class="smallimg"/>`);
				var smallimgBox=$('.details .content .row1 .small_img');
				smallimgBox.find('img').remove();
				smallimgBox.prepend(smallimg);     								//渲染大图
				$('.bigimg').attr('src',this.dataObj.img1);
				
				this.smallimg=$('.details .content .row1 .small_img .smallimg');
				
				$('.details .top .top_right>a').html(this.dataObj.shop_name);                  //渲染店铺名
				$('.details .top .top_right .score b').text(this.dataObj.score);			   //渲染店铺评分
				
				this.imgArr=[];
				this.emptyArr=new Array(6);				//为了循环6次，建立长度为6的数组
				$.each(this.emptyArr,function(index){
					if(that.dataObj['img'+(index+1)])that.imgArr.push(that.dataObj['img'+(index+1)]);
					else return false;
				});
				if(this.imgArr.length<6)$('.details .row1 .next_btn').css({opacity:0.5});
				
				this.liStr="";
				var that=this;
				$.each(this.imgArr, function(index,value) {
					that.liStr+=`
								<li ${index==0?"class='imgborder'":""}>
									<img src="${value}" alt="" />
								</li>
								`
				});
				$('.details .content .row1 .row1_bottom ul').html(this.liStr); 					//渲染列表图
				
				$('.details .content .row2 h2 span').html(this.dataObj.title.split(/\n\s*/)[0]);  //渲染大标题
				$('head title').html(this.dataObj.title.split(/\n\s*/)[0]);
				$('.details .content .row2 .price').text(this.dataObj.price);					//渲染价格

				$('.fenqi:eq(1) div:eq(1) span').html(Number(this.dataObj.price/3).toFixed(2));		//计算分期付款的值
				$('.fenqi:eq(1) div:eq(2) span').html(Number(this.dataObj.price/6).toFixed(2));
				$('.fenqi:eq(1) div:eq(3) span').html(Number(this.dataObj.price/12).toFixed(2));
				$('.fenqi:eq(1) div:eq(4) span').html(Number(this.dataObj.price/24).toFixed(2));
				
				var comment=this.dataObj.comment.replace(/^二手有售\s*(.*)$/,'$1').replace(/条评价/,'');
				$('.details .content .row2 .discuss span').text(comment);								//渲染评论数
				
				new fdj(this.smallimg).init();
				new effect().init();
			});
			
		}
	}
	
	new draw().drawData();
	
	//放大镜
	class fdj{
		constructor(smallimg){
			this.sf=$('.details .content .row1 .small_img .smallf');
			this.smallimg=smallimg;
			this.bf=$('.details .content .row1 .bigf');
			this.bigimg=$('.details .content .row1 .bigimg');
			this.smllimgBox=$('.details .row1 .small_img');
		}
		init(){
			this.sf.css({
				width:this.smallimg.width()*this.bf.width()/this.bigimg.width(),
				height:this.smallimg.height()*this.bf.height()/this.bigimg.height()
			});
			var that=this;
			this.bili=this.bigimg.width()/this.smallimg.width();
			//console.log(this.bili);  //1.777
			this.smllimgBox.hover(function(){
				that.sf.css("visibility","visible");
				that.bf.css("visibility","visible");
			},function(){
				that.sf.css("visibility","hidden");
				that.bf.css("visibility","hidden");
			});
			
			this.smllimgBox.on('mousemove',function(e){
				that.fdjmove(e);
			});
			
			$('.row1_bottom ul').on('click','li',function(){
				var src=$(this).find('img').attr('src');
				$(this).addClass('imgborder').siblings('li').removeClass('imgborder');
				that.imgswitch(src);
			})
			
			$('.row1 .next_btn').on('click',function(){
				that.ulmoveNext(this);
			})
			$('.row1 .back_btn').on('click',function(){
				that.ulmoveBack(this);
			})
		}
		
		imgswitch(src){
			this.bigimg.attr('src',src);
			this.smallimg.attr('src',src);
		}
		
		ulmoveNext(btn){
			if($(btn).css('opacity')==1){
				$('.row1_bottom ul').animate({left:-58-9});
				$(btn).css('opacity',0.5);
				$('.row1 .back_btn').css('opacity',1);
			}
		}
		ulmoveBack(btn){
			if($(btn).css('opacity')==1){
				$('.row1_bottom ul').animate({left:0});
				$(btn).css('opacity',0.5);
				$('.row1 .next_btn').css('opacity',1);
			}
		}
		
		fdjmove(e){
			var l=e.pageX-this.smallimg.offset().left-this.sf.outerWidth()/2;
			var t=e.pageY-this.smallimg.offset().top-this.sf.outerHeight()/2;
			if(l<=0)l=0;
			if(l>=this.smallimg.width()-this.sf.width())l=this.smallimg.width()-this.sf.width();
			if(t<=0)t=0;
			if(t>=this.smallimg.height()-this.sf.height())t=this.smallimg.height()-this.sf.height();
			this.sf.css({
				left:l,
				top:t
			})
			this.bigimg.css({
				left:-this.bili*l,
				top:-this.bili*t
			})
		}
	}
	
	//效果
	class effect{
		constructor(){
			this.score=$('.details .wrap .score b');
			this.scorebox=$('.details .wrap .score');
			this.bigbox=$('.details .wrap .top_right');
			this.guige=$('#guige div');
			this.fenqi=$('.fenqi div');
			this.jia=$('.calculator button').eq(0);
			this.jian=$('.calculator button').eq(1);
			this.goodsNum=$('.calculator input');
		}
		
		init(){
			console.log(this.score.html());
			var that=this;
			if(this.score.html()=='null'){
				this.img=$('<img src="images/ziying.png" style="width:43px;height:14px;margin-top:15px;margin-right:10px" >');
				this.scorebox.hide();
				this.img.prependTo(this.bigbox);
			}
			
			this.guige.on('click',function(){
				$(this).addClass('redborder').siblings('div').removeClass('redborder');
			})
			this.fenqi.on('click',function(){
				$(this).addClass('redborder').siblings('div').removeClass('redborder');
			})
			this.goodsNum.val(1);
			this.jia.on('click',function(){
				var num=that.goodsNum.val();
				num++;
				num=that.numChange(num);
				that.goodsNum.val(num);
			})
			
			this.jian.on('click',function(){
				var num=that.goodsNum.val();
				num--;
				num=that.numChange(num);
				that.goodsNum.val(num);
			})
			this.goodsNum.on('input',function(){
				var num=that.numChange($(this).val());
				$(this).val(num);
			})
			
		}
		numChange(num){
			if(num<=0)num=1;
			if(num>=99)num=99;
			if(isNaN(parseInt(num))){
				num=1;
			}else{
				num=parseInt(num);
			}
			return num;
			
		}
	}
	
	//购物车
	class shop{
		constructor(){
			this.sidarr=[];
			this.numarr=[];
			this.join=$('.details .join');
			this.$str=location.search.split('?')[1];
			this.$arr=this.$str.split('&');
			this.mask=$('.mask');
			this.modalbox=$('.mask .modalbox');
		}
		
		init(){
			var that=this;
			$.each(this.$arr,function(index,value){
				var $new=value.split('=');
				console.log($new);
				if($new[0]=='sid'){that.sid=$new[1];return false;}
			});
			this.join.on('click', function() {
		        that.joinClick();
		    });
		}
		
		//点击加入购物车
		joinClick(){
			  var that=this;
			  if (this.getcookie('cartsid') && this.getcookie('cartnum')) {
		            this.sidarr =this.getcookie('cartsid').split(',');
		            this.numarr =this.getcookie('cartnum').split(','); 
		        }
			  var sidIndex=$.inArray(this.sid,this.sidarr);
			  if (sidIndex!= -1) {	 			//sid存在,数量累加
			  		if(this.getcookie('cartnum')==''){
		                var num=parseInt($('.calculator input').val());
		                this.numarr[sidIndex]=num;					//根据$.inArray通过sid确定位置.
		                this.addcookie('cartnum',this.numarr.toString(), 10);//修改后的结果
		                this.sidarr[sidIndex]=this.sid;					//将当前id添加到对应的位置。
		                this.addcookie('cartsid',this.sidarr.toString(), 10);	//将整个数组添加到cookie
		            }else{
		                var num=parseInt(this.numarr[sidIndex])+parseInt($('.calculator input').val());	//当前的值和cookie里面的值(和sid对应的值)进行累加
		                this.numarr[sidIndex]=num;						//将新的数量，覆盖原先的值。
		                this.addcookie('cartnum',this.numarr, 10);
		            }
			  }else{
				  	this.sidarr.push(this.sid); 					//将sid追加到数组
		            this.addcookie('cartsid',this.sidarr, 10); 			//存cookie
		            this.numarr.push($('.calculator input').val()); 	//将表单的值追加到数组
		            this.addcookie('cartnum',this.numarr, 10); 			//存cookie
			  }
			  
			  //模态框
			  this.modalBox();
		}
		
		//模态框
		modalBox(){
			this.modalbox.css({
			  	left:(document.documentElement.clientWidth-this.modalbox.outerWidth())/2,
			  	top:(document.documentElement.clientHeight-this.modalbox.outerHeight())/2+$(window).scrollTop()-50
		    })
		    this.mask.show();
		    var that=this;
		    $('.modalbox .close').on('click',function(){
		  		that.mask.slideUp(600);
		    });
		    $('.modalbox button:not(.close)').on('click',function(){
		  		location.href="cart.html";
		    });
		    
		    //拖拽
		    this.modalbox.on('mousedown',function(e){
		    	var shortx=e.offsetX;
		    	var shorty=e.offsetY;
		    	var that=this;
		    	$(document).on('mousemove',function(e){
		    		var l=e.pageX-shortx;
		    		var t=e.pageY-shorty;
		    		if(l<=0)l=0;
		    		if(l>=document.documentElement.clientWidth-$(that).outerWidth())
		    		l=document.documentElement.clientWidth-$(that).outerWidth();
		    		if(t<=0)t=0;
		    		if(t>=$(window).scrollTop()+document.documentElement.clientHeight-$(that).outerHeight())
		    		t=$(window).scrollTop()+document.documentElement.clientHeight-$(that).outerHeight();
		    		$(that).css({left:l,top:t});
		    	});
		    	$(document).on('mouseup',function(){
		    		$(this).off('mousemove');
		    		$(this).off('mouseup');
		    	})
		    	
		    })
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
	
	new shop().init();
	
}(jQuery)
		
