define(['module1','../thirdplugins/jquery'],function(m1){
	return {
		//轮播图
		lunbo:!function(){
			var index=0;
			var timer=null;
			var bstop=true;
			var imgItem=$('.fs .fs_col2 figure a');
			var bullet=$('.fs .fs_col2 .bullet_wrap .bullet');
			
			bullet.on('mouseover',function(){
				index=$(this).index();
				lunboSwitch();
			})
			$('.fs .fs_col2 .gonext').on('click',function(){
				if(bstop){
					index++;
					if(index>=imgItem.size())index=0;
					lunboSwitch();
				}
			})
			$('.fs .fs_col2 .goback').on('click',function(){
				if(bstop){
					index--;
					if(index<=-1)index=imgItem.size()-1;
					lunboSwitch();
				}
			})
			function autoplay(){
				clearInterval(timer);
				timer=setInterval(function(){
					index++;
					if(index>=imgItem.size())index=0;
					lunboSwitch();
				},3000);
			}
			autoplay();
			
			$('.fs .fs_col2').hover(function(){
				clearInterval(timer);
			},function(){
				autoplay();
			});
			function lunboSwitch(){
				bstop=false;
				bullet.eq(index).addClass('focus').siblings('.bullet').removeClass('focus');
				imgItem.eq(index).animate({opacity:1}).siblings('a').animate({opacity:0},function(){bstop=true});
			}
		}(),
		
		//二级导航
		nav2:!function(){
			var bstop=true;
			var nav2=$('.fs .fs_col1 .nav2');
			
			$('.fs .fs_col1 .nav1 li').hover(function(){
				nav2.show().addClass('nav2move');
				if($(window).scrollTop()<=252)nav2.css({top:0});
				else{
					nav2.css({
						top:$(window).scrollTop()-$('.fs .fs_col1').offset().top
					})
				}
				
			},function(){
				nav2.hide();
			});
			nav2.hover(function(){
				nav2.show().removeClass('nav2move');
			},function(){
				nav2.hide();
			});

		}(),
		
		//用户登录
		dengLu:!function(){
			
		}(),
		
		//秒杀倒计时
		seckillTime:!function(){
			var thisday=new Date();
			var d=new Date();
			d.setHours(thisday.getHours()+1);
			var secTimer=setInterval(function(){
				var date=new Date();
				var time=((d-date)/100);
				
				var min=double(parseInt(time/600%60));
				var sec=double(parseInt(time/10%60));
				var minsec=parseInt(time%10)+'0';

				var $timer=$('.sk_header .timer div');
				$timer.eq(0).html(min);
				$timer.eq(1).html(sec);
				$timer.eq(2).html(minsec);
				if(min<=0&&sec<=0&&minsec<=0){
					clearInterval(secTimer);
					$timer.eq(0).html("00");
					$timer.eq(1).html("00");
					$timer.eq(2).html("00");
				}
			},100);
			
			function double(num){
				num=num<10? '0'+num:num;
				return num;
			}
		}(),
		
		//秒杀列表
		seckillList:!function(){
			var distance=4;
			var skList=$('.sk .wrap .sk_body');
			var skItem=$('.sk .wrap .sk_body .sk_item');

			var bstop=true;
			$('.sk .wrap .sk_body_overflow .gonext').on('click',function(){
				if(bstop==true){
					bstop=false;
					distance+=4;
					
					skList.animate({left:-$('.sk .wrap .sk_body .sk_item').outerWidth()*distance},800,function(){
						bstop=true;
						if(skList.position().left==-$('.sk .wrap .sk_body .sk_item').outerWidth()*16){
							distance=4;
							skList.css({left:-$('.sk .wrap .sk_body .sk_item').outerWidth()*distance});
						}
					});
				}
			});
			$('.sk .wrap .sk_body_overflow .goback').on('click',function(){
				if(bstop==true){
					bstop=false;
					distance-=4;
					skList.animate({left:-$('.sk .wrap .sk_body .sk_item').outerWidth()*distance},800,function(){
						bstop=true;
						if(skList.position().left==0){
							distance=12;
							skList.css({left:-$('.sk .wrap .sk_body .sk_item').outerWidth()*distance});
						}
					});
				}
			});
		}(),
	
		//秒杀右侧自动轮播
		seckill_last:!function(){
			var index=0;
			var minindex=0;
			$('.sk .sk_last .bullet_wrap_0 .bullet_0').on('mouseover',function(){
				index=$(this).index();
				minindex=$(this).index();
				seckill_last_switch();
			});
			var timer=null;
			function autoplay(){
				clearInterval(timer);
				timer=setInterval(function(){
					index++;
					minindex++;
					if(minindex>=2)minindex=0;
					seckill_last_switch();
				},3000);
			}
			autoplay();
			$('.sk .sk_last').hover(function(){
				clearInterval(timer);
			},function(){
				autoplay();
			});
			function seckill_last_switch(){
				$('.sk .sk_last .bullet_wrap_0 .bullet_0').eq(minindex).addClass('active').siblings('.bullet_0').removeClass('active');
				$('.sk .sk_last .sk_last_wrap').animate({left:index*-180},function(){
					if(index>=2){
						$('.sk .sk_last .sk_last_wrap').css({left:0});
						index=0;
					}
				});
			}
		}(),
	
		//tab切换  促销公告
		tab:!function(){
			$('.fs .fs_col4 .news a:not(.more)').on('mouseover',function(){
				var index=$(this).index('.fs .fs_col4 .news a:not(.more)');
				$('.fs .fs_col4 .news .cuxiao').eq(index).show().siblings('.fs .fs_col4 .news .cuxiao').hide();
				if(index==0)
				$('.fs .fs_col4 .news .redline').animate({left:10},300);  //10 57
				else
				$('.fs .fs_col4 .news .redline').animate({left:57},300);
			})
		}(),
		
		//排行版,tab切换
		paihangban:!function(){
			var wrapMove=$('.paiHangBan .box_bd .paiHangBan_wrap_move');
			var bullet=$('.paiHangBan .box_bd .bullet');
			bullet.on('mouseover',function(){
				$(this).addClass('focus').siblings('.paiHangBan .box_bd .bullet').removeClass('focus');
				wrapMove.animate({left:-$(this).index()*390});
			});
			$('.paiHangBan .nav li').each(function(index,ele){
				$(this).find('a').on('click',function(){
					wrapMove.eq(index).show().siblings('.paiHangBan_wrap_move').hide();
					$('.paiHangBan .nav li a').removeClass("nav_active");
					$(this).addClass("nav_active");
					bullet.eq(0).addClass('focus').siblings('.paiHangBan .box_bd .bullet').removeClass('focus');
					wrapMove.css({left:0});
				})
			});
		}(),
	
		//会买专辑，轮播图
		huiMai:!function(){
			m1.wufengLunbo('#huimai1 .huiMai_move','#huimai1 .box_bd','#huimai1 .bullet','#huimai1 .gonext','#huimai1 .goback','#huimai1',390);
//			var index=0;
//			var minindex=0;
//			var bstop=true;
//			$('#huimai1 .box_bd').eq(0).clone(true,true).appendTo('#huimai1 .huiMai_move');
//			$('#huimai1 .box_bd').eq(2).clone(true,true).prependTo('#huimai1 .huiMai_move');
//			$('#huimai1 .bullet').on('mouseover',function(){
//				index=$(this).index('#huimai1 .bullet');   // 0
//				minindex=$(this).index('#huimai1 .bullet');  //0
//				m1.redcirleTab($('#huimai1 .bullet'),minindex,$('#huimai1 .huiMai_move'));
//			});
//			$('#huimai1 .gonext').on('click',function(){
//				if(bstop){
//					index++;
//					minindex++;
//					goto();
//				}
//			});
//			$('#huimai1 .goback').on('click',function(){
//				if(bstop){
//					index--;
//					minindex--;
//					goto();
//					console.log(index);  //-1170  -390 
//				}
//			})
//			function goto(){
//				bstop=false;
//				if(minindex>=3)minindex=0;
//				if(minindex<=-1)minindex=2;
//				$('#huimai1 .bullet').eq(minindex).addClass('focus').siblings('.bullet').removeClass('focus');
//				$('#huimai1 .huiMai_move').animate({left:-(index+1)*390},function(){
//					if(index>=3){
//						$('#huimai1 .huiMai_move').css({left:-390});
//						index=0;
//					}
//					if(index<=-1){
//						index=2;
//						$('#huimai1 .huiMai_move').css({left:-3*390});
//						console.log(index);
//					}
//					bstop=true;
//				});
//			}
			
		}(),
		
		//觅me轮播图  miMe
		miMe:!function(){
			m1.wufengLunbo('#miMe .miMe_move','#miMe .box_bd','#miMe .bullet','#miMe .gonext','#miMe .goback','#miMe',390);
		}(),
		
		//领券中心
		lingQuan:!function(){
			var minindex=0;
			$('.lingQuan .bullet').on('mouseover',function(){
				minindex=$(this).index('.lingQuan .bullet');  //0
				$('.lingQuan .bullet').eq(minindex).addClass('focus').siblings('.bullet').removeClass('focus');
				$('.lingQuan .box_bd').animate({left:-minindex*350});
			});
		}(),
		
		//特色推荐轮播图
		teSe:!function(){
			m1.wufengLunbo('.teSe .teSe_movebox','.teSe .flex_floatbox','.teSe .bullet','.teSe .gonext','.teSe .goback','.teSe .wrap',1190);
		}(),
		
		//侧边栏
		aside:!function(){
			var movebox=$('.toolbar_wrap .toolbar_right');
			
			$('.toolbar_wrap .toolbar_item').on('click',function(){
				movebox.animate({right:270});
			});
			$('.toolbar_wrap .huiyuan_box_title em').on('click',function(){
				movebox.animate({right:0});
			});
			$('.toolbar_wrap .gotop').on('click',function(){
				$(window).scrollTop(0);
			})
		}(),
		
		//搜索框提示
		searchTips:!function(){
			
			$('.header_content').on('input','.form .search_text',function(){
				var that=this;
				
				require(['https://suggest.taobao.com/sug?code=utf-8&q='+$(this).val()+'&_ksTS=1539076833248_549&callback=define'],function(d){
					
					if(d.result[0]){
						$(that).siblings('.searchTips').show();
						$.each(d.result, function(index,value) {
							$(that).siblings('.searchTips').find('a').eq(index).html(value[0]);
							var $i=$('<i>约'+value[1]+'个商品</i>');
							$(that).siblings('.searchTips').find('a').eq(index).append($i);
						});
						$(that).siblings('.searchTips').find('a').on('click',function(){
							$(that).val($(this).text().split('约')[0]);
							$(that).siblings('.searchTips').hide();
						})
					}else{
						$(that).siblings('.searchTips').hide();
					}

				})
			})
			

		}()
	}
})





