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

/***** PORTFOLIO page ******/
function initHome() {
	$(".list:not(#home_wr)").remove();
	ref = db.ref("root/home");
	ref.on("child_added", homeAdd);
	ref.on("child_removed", homeRev);
	ref.on("child_changed", homeChg);
}
initHome();

function homeAdd(data) {
	var id = data.key;
	var img = data.val().img;
	var src = '../img/port/' + img;
	var adtitle = data.val().adtitle;
	var skills = data.val().skills;
	var Contribute = data.val().Contribute;
	var Functions = data.val().Functions;
	var Explantion_1 = data.val().Explantion_1;
	var Explantion_2 = data.val().Explantion_2;
	var link = data.val().link;
	var html = '';
	html += '<ul class="list clear" id="' + id + '">';
	html += '<li class="col-md-3">';
	html += '<div>';
	html += '<img src="' + src + '">';
	html += '<input type="text" class="tit_img form-control" placeholder="이미지" value="' + img + '">';
	html += '</div>';
	html += '</li>';
	html += '<li class="col-md-6">';
	html += '<div>';
	html += '<input type="text" class="adtitle form-control" placeholder="project Name" value="' + adtitle + '">';
	html += '<input type="text" class="skills form-control" placeholder="skills" value="' + skills + '">';
	html += '<input type="text" class="Contribute form-control" placeholder="Contribute" value="' + Contribute + '">';
	html += '<input type="text" class="Functions form-control" placeholder="Functions" value="' + Functions + '">';
	html += '<input type="text" class="Explantion_1 form-control" placeholder="Explantion (1)" value="' + Explantion_1 + '">';
	html += '<input type="text" class="Explantion_2 form-control" placeholder="Explantion (2)" value="' + Explantion_2 + '">';
	html += '<input type="text" class="link form-control" style="margin-top:5px;" placeholder="링크주소" value="' + link + '">';
	html += '</div>';
	html += '</li>';
	html += '<li class="col-md-2">';
	html += '<div>';
	html += '<button class="btn btn-danger" onclick="homeDel(this);">삭제</button> ';
	html += '<button class="btn btn-warning" onclick="homeUp(this);">수정</button>';
	html += '</div>';
	html += '</li>';
	html += '</ul>';
	$("#home_wrap").append(html);
}

function homeRev(data) {
	var id = data.key;
	$("#" + id).remove();
}

function homeChg(data) {
	var id = data.key;
	var ul = $("#" + id);
	$("img", ul).attr("src", "../img/port/" + data.val().img);
	alert("수정되었습니다.");
}


$("#home_save").on('click', function () {
	var img = $("#home_wr .tit_img").val();
	var adtitle = $("#home_wr .adtitle").val();
	var skills = $("#home_wr .skills").val();
	var Contribute = $("#home_wr .Contribute").val();
	var Functions = $("#home_wr .Functions").val();
	var Explantion_1 = $("#home_wr .Explantion_1").val();
	var Explantion_2= $("#home_wr .Explantion_2").val();
	var link = $("#home_wr .link").val();
	if (img == '' || adtitle == '' || skills == '' || Contribute == '' || Functions == '' || Explantion_1 == '' || link == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/home");
		
		ref.push({
			img: img,
			adtitle: adtitle,
			skills: skills,
			Contribute: Contribute,
			Functions: Functions,
			Explantion_1: Explantion_1,
			Explantion_2: Explantion_2,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
});

function homeUp(obj) {
	var ul = $(obj).parent().parent().parent();
	var id = ul.attr("id");

	var img = '';
	if($(".tit_img",ul).val()) img = ($(".tit_img",ul).val());
	var adtitle = '';
	if($(".adtitle",ul).val()) adtitle = ($(".adtitle",ul).val());
	var skills = "";
	if($(".skills",ul).val()) skills = ($(".skills",ul).val());
	var Contribute = "";
	if($(".Contribute",ul).val()) Contribute = ($(".Contribute",ul).val());
	var Functions = '';
	if($(".Functions",ul).val()) Functions = ($(".Functions",ul).val());
	var Explantion_1 = '';
	if($(".Explantion_1",ul).val()) Explantion_1 = ($(".Explantion_1",ul).val());
	var Explantion_2= '';
	if($(".Explantion_2",ul).val()) Explantion_2 = ($(".Explantion_2",ul).val());
	var link = '';
	if($(".link",ul).val()) link = $(".link",ul).val();
	if (img == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/home/" + id);
		ref.update({
			img: img,
			adtitle: adtitle,
			skills: skills,
			Contribute: Contribute,
			Functions: Functions,
			Explantion_1: Explantion_1,
			Explantion_2: Explantion_2,
			link: link
		});
	}
}

function homeDel(obj) {
	if (confirm("정말로 삭제하시겠습니까?")) {
		//var id = obj.parentNode.parentNode.parentNode.id;
		var id = $(obj).parent().parent().parent().attr("id");
		if (id != "") {
			db.ref("root/home/" + id).remove();
		}
	}
}


