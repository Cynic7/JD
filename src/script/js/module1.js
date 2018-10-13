define([],function(){
	return {
		//参数为  jQuery的选择器
		redcirleTab:function(bullet,minindex,movebox,distance){
			bullet.eq(minindex).addClass('focus').siblings('.bullet').removeClass('focus');
			movebox.animate({left:-(minindex+1)*distance});
		},
		//无缝轮播  参数为字符串形式的选择器
		wufengLunbo:function(movebox,itembox,bullet,gonextbtn,gobackbtn,bigbox,distance){
			var index=0;
			var minindex=0;
			var bstop=true;
			var timer=null;
			var that=this;
			console.log(bigbox);
			$(itembox).eq(0).clone(true,true).appendTo(movebox);
			$(itembox).eq(2).clone(true,true).prependTo(movebox);
			$(bullet).on('mouseover',function(){
				index=$(this).index(bullet);   // 0
				minindex=$(this).index(bullet);  //0
				that.redcirleTab($(bullet),minindex,$(movebox),distance);
			});
			$(gonextbtn).on('click',function(){
				if(bstop){
						index++;
						minindex++;
						goto();
					}
			});
			$(gobackbtn).on('click',function(){
				if(bstop){
						index--;
						minindex--;
						goto();
						
					}
			});
			autoplay();
			$(bigbox).hover(function(){
				clearInterval(timer);
			},function(){
				autoplay();
			});
			function autoplay(){
				clearInterval(timer);
				timer=setInterval(function(){
					index++;
					minindex++;
					goto();
				},3000);
			}
			function goto(){
				bstop=false;
				if(minindex>=3)minindex=0;
				if(minindex<=-1)minindex=2;
				$(bullet).eq(minindex).addClass('focus').siblings('.bullet').removeClass('focus');
				$(movebox).animate({left:-(index+1)*distance},function(){
					if(index>=3){
						$(movebox).css({left:-distance});
						index=0;
					}
					if(index<=-1){
						index=2;
						$(movebox).css({left:-3*distance});
						console.log(index);
					}
					bstop=true;
				});
			}
		}
	}
})