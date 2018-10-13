require.config({
	paths:{
		'jquery':"../thirdplugins/jquery1.11.3"
	}
})

define(['jquery'],function($){
	var urlStr="http://10.31.162.78/JD/php/";
	return {
		//加载头部和尾部的html文件，同时添加事件和效果
		reload:!function(){
			$('.header_content').load('header.html',function(){
				document.cookie='JDdata_username=sda';
				function getcookie(name){
					var arr=document.cookie.split(';');
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
					
					var ele=$('<li></li>');
					$('header .header .wrap ul').eq(0).prepend(ele);
					var ele=$('<li></li>');
					ele.html('<a style="color:#666;width:76px" href="#" class="elip">Hi, '+username+'</a>');
					$('header .header .wrap ul').eq(0).prepend(ele);
					
					$('.fs .fs_col4 .user span a').html(username);
				}
				
				//顶部搜索框悬浮
				var bstop=true;
				$(window).on('scroll',function(){
					if(bstop&&$(window).scrollTop()>=800){
						$('.search').addClass('searchFloat');
						$('.search .form .hotwords').hide();
						$('.shop_hoverbox').hide();
						var floatLogo=$('<div class="searchFloat_logo"></div>');
						floatLogo.appendTo('.search');
						bstop=false;
						$('.searchFloat').addClass('hidden');
					}
					if($(window).scrollTop()<=300){
						$('.search').removeClass('searchFloat');
						$('.search .form .hotwords').show();
						$('.shop_hoverbox').show();
						$('.searchFloat_logo').remove();
						$('.search').removeClass('hidden');
						bstop=true;
					}
				})
			});
			$('footer').load('footer.html');
		}(),
		
		firstDrawing:!function(){
			$.ajax({
				type:"get",
				url:urlStr+"index1.php",
				async:true,
				dataType:"json"
			}).done(function(data){
																				//渲染头部广告栏
				$('header .header_AD').html(`
												<a href="${data[0].href}" target="_blank">		
													<img src="${data[0].img}"/>
													<span></span>
												</a>
											`);
				$('.fs .left>img').attr("src",data[1].img);        //渲染侧边广告栏
				$('.fs .left a').attr('href',data[2].href);
				$('.fs .left a img').attr("src",data[2].img);
				
				var hotwords=data[18].text.split(",");								//渲染热词
				$('header .search .hotwords a').each(function(index,element){
					$(element).html(hotwords[index+1]);
				})
				var hotswitch=0;
				setInterval(function(){
					$('header .search .hotwords .first').html(hotwords[hotswitch]);
					if(hotswitch==0)hotswitch=1;
					else hotswitch=0;
				},2000);
				
				$('.fs .fs_col2 figure .img1').attr("src",data[3].img);				//渲染轮播图
				$('.fs .fs_col2 figure .img2').attr("src",data[4].img);
				$('.fs .fs_col2 figure .img3').attr("src",data[5].img);
				$('.fs .fs_col2 figure .img4').attr("src",data[6].img);
				$('.fs .fs_col2 figure .img5').attr("src",data[7].img);
				$('.fs .fs_col2 figure .img6').attr("src",data[8].img);
				$('.fs .fs_col2 figure .img7').attr("src",data[9].img);
				$('.fs .fs_col2 figure .img8').attr("src",data[10].img);
				
				$('.fs .fs_col3 a:eq(0) img').attr("src",data[11].img);				//轮播图右侧
				$('.fs .fs_col3 a:eq(1) img').attr("src",data[12].img);
				$('.fs .fs_col3 a:eq(2) img').attr("src",data[13].img);
				
				var cuxiao=data[14].text.split(',');								//促销文字
				$('.fs .fs_col4 .news .cuxiao:eq(0) li').each(function(index,element){
					$(element).find('a').html(cuxiao[index]);
				})
				var cuxiao=data[15].text.split(',');								//公告文字
				$('.fs .fs_col4 .news .cuxiao:eq(1) li').each(function(index,element){
					$(element).find('a').html(cuxiao[index]);
				})
				
				$('.sk .sk_last a:eq(0) img').attr("src",data[16].img);
				$('.sk .sk_last a:eq(1) img').attr("src",data[17].img);
				$('.sk .sk_last a:eq(2) img').attr("src",data[16].img);
			});
		}(),
		
		seckillDrawing:!function(){
			$.ajax({
				type:"post",
				url:urlStr+"index_seckill.php",
				async:true,
				dataType:"json"
			}).done(function(data){
				console.log(data);
				var secStr="";
				var emptyArr=new Array(4);
				$.each(emptyArr,function(index){
					var value=data[$(data).size()+index-4];
					var t=value.title.split(/\n\s*/);
					if(t.length<2)t[1]=t[0];
					secStr+=`
						<li class="sk_item">
							<a href="details.html?sid=${value.sid}" target="_blank" title="${t[1]}">
								<img src="${value.img1}" alt="" />
								<p class="sk_item_name">${t[0]}</h4>
								<div class="price">
									<span>￥${value.price}</span>
									<s>￥${parseInt(value.price*1.5)+".00"}</s>
								</div>
							</a>
						</li>
					`
				});
				
				$.each(data, function(index,value) {
					var t=value.title.split(/\n\s*/);
					if(t.length<2)t[1]=t[0];
					secStr+=`
						<li class="sk_item">
							<a href="details.html?sid=${value.sid}" target="_blank" title="${t[1]}">
								<img src="${value.img1}" alt="" />
								<p class="sk_item_name">${t[0]}</h4>
								<div class="price">
									<span>￥${value.price}</span>
									<s>￥${parseInt(value.price*1.5)+".00"}</s>
								</div>
							</a>
						</li>
					`
				});
				
				$.each(emptyArr,function(index){
					var value=data[index];
					var t=value.title.split(/\n\s*/);
					if(t.length<2)t[1]=t[0];
					secStr+=`
						<li class="sk_item">
							<a href="details.html?sid=${value.sid}" target="_blank" title="${t[1]}">
								<img src="${value.img1}" alt="" />
								<p class="sk_item_name">${t[0]}</h4>
								<div class="price">
									<span>￥${value.price}</span>
									<s>￥${parseInt(value.price*1.5)+".00"}</s>
								</div>
							</a>
						</li>
					`
				})

				$('.sk .wrap .sk_body').html(secStr);
			});
		}(),
		
		//排行版
		paiHangBan:!function(){
			$.ajax({
				type:"get",
				url:urlStr+"index_paiHangBan.php",
				dataType:"json"
			}).done(function(data){
				var str="";
				var str1="";
				var str2="";
				var str3="";
				var str4="";
				
				function draw(value,i,num,index,t){
					var str='';
					if(index==i)str+=`<ol class="item_list">`;
					if(index==i+3)str+=`<ol class="item_list">`;
					str+=`
						<li>
							<a href="details.html?sid=${value.sid}" target="_blank" class="clear" title="${t[1]}">
								<img src="${value.img1}" alt="" />
								<span class="icon_price">${index+num}</span>
								<p>${t[0]}</p>
							</a>
						</li>
					`;
					if(index==i+2)str+=`</ol>`;
					if(index==i+5)str+=`</ol>`;
					return str;
				}
				$.each(data, function(index,value) {
					var t=value.title.split(/\n\s*/);
					if(t.length<2)t[1]=t[0];
					if(index<6){
						str+=draw(value,0,1,index,t);
						$('#move_0').html(str);
					}
					if(index<12&&index>=6){
						str1+=draw(value,6,-5,index,t);
						$('#move_1').html(str1);
					}
					if(index<18&&index>=12){
						str2+=draw(value,12,-11,index,t);
						$('#move_2').html(str2);
					}
					if(index<24&&index>=18){
						str3+=draw(value,18,-17,index,t);
						$('#move_3').html(str3);
					}
					
					if(index<30&&index>=24){
						str4+=draw(value,24,-23,index,t);
						$('#move_4').html(str4);
					}
				});
			});
				
		}(),
		
		//发现好货
		faxianHaoHuo:!function(){
			$.ajax({
				type:"get",
				url:urlStr+"index1.php",
				dataType:"json"
			}).done(function(data){
				var goOnStr="";
				
				$.each(data, function(index,value) {
					if(index>=22&&index<=25){
						var t=value.text.split(/\n\s*/);
						if(t.length<2)t[1]=t[0];
						goOnStr+=`
							<a href="${value.href}" target="_blank" title="${t[1]}">
								<figure>
									<img src="${value.img}" alt="" />
								</figure>
								<h3 class='elip'>
									${t[0]}
								</h3>
								<span class="elip">
									${t[1]}
								</span>
							</a>
						`
					}
				});
				
				$('#faXianhaohuo .box_bd').html(goOnStr);
			})
		}(),
		
		//JOY寻宝
		xunBao:!function(){
			var bstop=true;
			$(window).on('scroll',function(e){
//				console.log($('.xunBao').offset().top);   //元素到页面顶端的值  6608
//				console.log($(this).scrollTop());		//滚动条
//				console.log(document.documentElement.clientHeight);  //可视区
//				console.log($(window).scrollTop()+document.documentElement.clientHeight-400);
				if($('.xunBao').offset().top<$(window).scrollTop()+document.documentElement.clientHeight-400&&bstop==true){
					bstop=false;
					$.ajax({
						type:"get",
						url:urlStr+"index_xunBao.php",
						dataType:"json"
					}).done(function(data){
						console.log(data);
						var goOnStr="";
						$.each(data, function(index,value) {
							
							goOnStr+=`
								<div class="xunBao_box">
									<a href="" target="_blank" title="">
										<figure>
											<img src="${value.img1}"/>
										</figure>
										<h4>${value.title}<span>${value.text}</span></h4>
										<div class="mask"></div>
										<ul class="clear">
											<li>
												<img src="${value.img2}"/>
											</li>
											<li>
												<img src="${value.img3}"/>
											</li>
											<li>
												<img src="${value.img4}"/>
											</li>
										</ul>
									</a>
								</div>
							`
						});
						
						$('.xunBao .wrap').html(goOnStr);
					})
					
				}
			})
		}(),
		
		goOn:!function(){
			var bstop1=true;
			var bstop2=true;
			var bstop3=true;
			var bstop4=true;
			var goOnStr="";
			function draw(){
				$.ajax({
					type:"get",
					url:urlStr+"index_goOn.php",
					dataType:"json"
				}).done(function(data){
					
					$.each(data, function(index,value) {
						var t=value.title.split(/\n\s*/);
						if(t.length<2)t[1]=t[0];
						goOnStr+=`
							<li>
								<a href="details.html?sid=${value.sid}" target="_blank" title="${t[1]}">
									<figure>
										<img src="${value.img1}" style="width:170px;height:170px"/>
									</figure>
									<p>
										${t[0]}
									</p>
									<div class="price">
										￥<span>${value.price}</span>
									</div>
								</a>
							</li>
						`
					});
					
					$('.go_on .wrap_noH').html(goOnStr);
				})
			}
			$(window).on('scroll',function(e){
				if($('.go_on').offset().top<$(window).scrollTop()+document.documentElement.clientHeight-400&&bstop1==true){
					bstop1=false;
					draw();
				}
				if($('.go_on').offset().top<$(window).scrollTop()+document.documentElement.clientHeight-800&&bstop2==true){
					bstop2=false;
					draw();
				}
				if($('.go_on').offset().top<$(window).scrollTop()+document.documentElement.clientHeight-1400&&bstop3==true){
					bstop3=false;
					draw();
				}
				if($('.go_on').offset().top<$(window).scrollTop()+document.documentElement.clientHeight-2000&&bstop4==true){
					bstop4=false;
					draw();
				}
			})
		}()
	}

})