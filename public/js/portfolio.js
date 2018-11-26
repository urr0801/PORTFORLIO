
// admin에서 받아오기
var config = {
	apiKey: "AIzaSyAWdnZaCCuOrVvPdInBEN-PKg0lsFuRVto",
	authDomain: "uportfoli.firebaseapp.com",
	databaseURL: "https://uportfoli.firebaseio.com",
	projectId: "uportfoli",
	storageBucket: "uportfoli.appspot.com",
	messagingSenderId: "260216334544"
};
firebase.initializeApp(config);

var db = firebase.database();
var ref;
var key;

(function initHome() {
	ref = db.ref("root/home");
	ref.on("child_added", homeAdd);
	ref.on("child_removed", homeRev);
	ref.on("child_changed", homeChg);
})();
function homeAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/port/'+img;
	var adtitle = data.val().adtitle;
	var skills = data.val().skills;
	var Contribute = data.val().Contribute;
	var Functions = data.val().Functions;
	var Explantion_1 = data.val().Explantion_1;
	var Explantion_2 = data.val().Explantion_2;
	var link = data.val().link;
	var html = '';
	html += '<div class="site_bg clear page" id="'+id+'">';
	html += '<div class="site_box row">';
	html += '<div class="site_img"><img src="'+src+'" alt="site_img" class="img"></div>';
	html += '<ul class="site_txt">';
	html += '<li><h3>project Name</h3></li>';
	html += '<li><h2>'+adtitle+'</h2></li>';
	html += '<li><hr /></li>';
	html += '<li><p>skills: '+skills+'</p></li>';
	html += '<li><p>Contribute:'+Contribute+'</p></li>';
	html += '<li><p>Functions : '+Functions+'</p></li>';
	html += '<li><p>Explantion</p></li>';
	html += '<li><p>'+Explantion_1+'</p></li>';
	html += '<li><p>'+Explantion_2+'</p></li>';
	html += '</ul>';
	html += '<button class="but w3-button w3-round-xxlarge w3-white" onclick="goUrl(\''+link+'\');">go site</button>';
	html += '</div>';
	html += '</div>';
	$("#port_wrap").append(html);
	$(window).trigger("resize");
}
function homeRev(data) {
	var id = data.key;
	$("#"+id).remove();
	$(window).trigger("resize");
}
function homeChg(data) {
	var id = data.key;
	var ul = $("#"+id);
	$("img", ul).attr("src", "../img/port/"+data.val().img);
	$("span", ul).html(data.val().title);
	$(window).trigger("resize");
}



// scroll 
var scTop = $(window).scrollTop();
var gap = [];
var now = 0;
$(window).resize(function(){
	$(".page").each(function (i) {
		gap[i] = $(this).offset().top;
	});
}).trigger("resize");
$(window).on("mousewheel DOMMouseScroll", wheelFn);
function wheelFn(e) {
	e.preventDefault();
	e.stopPropagation();
	var dir = e.originalEvent.wheelDelta;
	$(window).off("mousewheel DOMMouseScroll");
	scTop = $(window).scrollTop();
	for (var i=0; i<gap.length; i++) {
		if (scTop <= gap[i]) {
			now = i;
			break;
		}
	}
	if (dir > 0) { if (now > 0) now--; } 
	else { if (now < gap.length - 1) now++; }
	$("html, body").stop().animate({"scrollTop": gap[now] + "px"}, 200, function(){
		$(window).on("mousewheel DOMMouseScroll", wheelFn);
		$(".site_img").addClass("ani_img");
		$(".site_txt").addClass("ani_txt");
	});
	}


// 높이에따른 애니메이션

