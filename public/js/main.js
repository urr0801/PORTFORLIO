// 메뉴 bars toggle
$(".fa-bars").click(function () {
	$(".nav_box").slideToggle();
	$(this).stop().animate({'right':'17rem'});
	$(this).removeClass("fa-bars");
	$(this).addClass("fa-times");
	$(".weather_box").hide();
	$(".weather_icon").hide();
});

$(".fa-times").click(function () {
	$(".nav_box").slideToggle();
	$(this).stop().animate({'right':'2rem'});
	$(this).removeClass("fa-times");
	$(this).addClass("fa-bars");
	$(".weather_box").show();
	$(".weather_icon").show();
});


// 날씨 toggle
$(".weather_icon").click(function () {
	$(".weather_box").slideToggle();
});

// 메뉴 hover
$(".menu > li").hover(function () {
	// $(this).addClass("xxx")
	// $(this).stop().animate({fontSize: '3.5em'});
	$(this).stop().css({"color": "#222", "font-size": "3.5rem", "cursor": "pointer"});
	
}, function () {
	// $(this).removeClass("xxx")
	// $(this).stop().animate({fontSize: '3em'})
	$(this).stop().css({"color": "#fff", "font-size": "3rem","cursor": "none"});
});

// 날씨
$.ajax({
	url: "../json/city.json",
	type: "get",
	dataType: "json",
	success: function(data){
		var city = data.cities;
		var html = '';
		for(var i=0; i<city.length; i++) {
			html = '<option value="'+city[i].id+'">'+city[i].name+'</option>';
			$("#area").append(html);
		}
		$("#area").trigger("change");
	},
	error:function(xhr, status, error) {
		console.log(xhr, status, error);
	}
});
$("#area").change(function(){
	var id = $(this).val();
	var city = $(this).find('option:selected').text();
	var appid = "02efdd64bdc14b279bc91d9247db4722";
	var units = "metric";
	var dt = new Date();
	var date = dt.getFullYear()+"년 "+(dt.getMonth()+1)+"월 "+dt.getDate()+"일";
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather",
		type: "get",
		dataType: "json",
		data: {
			id: id,
			appid: appid,
			units: units
		},
		success: function(data){
			$(".dl_icon").attr("src", "../img/icon/"+data.weather[0].icon+".png");
			$(".dl_area > span").html(city);
			$(".dl_date").html(date);
			$(".dl_temp").html(data.main.temp+'℃ (최고:'+data.main.temp_max+'℃ / 최저:'+data.main.temp_min+'℃)');
			$(".dl_desc").html(data.weather[0].description);
			$("#modal").hide();
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error);
		}
	});
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/forecast",
		type: "get",
		dataType: "json",
		data: {
			id: id,
			appid: appid,
			units: units
		},
		success: function(data){
			$(".weekly").empty();
			for(var i=0; i<data.cnt; i++) {
				html = '<li class="clear">';
				html+= '<img src="../img/icon/'+data.list[i].weather[0].icon+'.png" class="img wk_icon">';
				html+= '<ul>';
				html+= '<li class="wk_area">'+city+'</li>';
				html+= '<li class="wk_date">'+data.list[i].dt_txt+'</li>';
				html+= '<li class="wk_temp">'+data.list[i].main.temp+'℃</li>';
				html+= '<li class="wk_desc">'+data.list[i].weather[0].description+'</li>';
				html+= '</ul>';
				html+= '</li>';
				$(".weekly").append(html);
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error);
		}
	});
});
