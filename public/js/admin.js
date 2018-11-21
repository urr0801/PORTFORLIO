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

/***** HOME ******/
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
	var src = '../img/main/' + img;
	var title = data.val().title;
	var link = data.val().link;
	var html = '';
	html += '<ul class="list clear row" id="' + id + '">';
	html += '<li class="col-xs-4 col-sm-3 col-md-2 col-lg-2">';
	html += '<div>';
	html += '<img src="' + src + '">';
	html += '<input type="text" class="tit_img form-control" placeholder="이미지" value="' + img + '">';
	html += '</div>';
	html += '</li>';
	html += '<li class="col-xs-4 col-sm-6 col-md-7 col-lg-8">';
	html += '<div>';
	html += '<input type="text" class="title form-control" placeholder="타이틀" value="' + title + '">';
	html += '<input type="text" class="link form-control" style="margin-top:5px;" placeholder="링크주소" value="' + link + '">';
	html += '</div>';
	html += '</li>';
	html += '<li class="col-xs-4 col-sm-3 col-md-3 col-lg-2">';
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
	$("img", ul).attr("src", "../img/main/" + data.val().img);
	alert("수정되었습니다.");
}


$("#home_save").on('click', function () {
	var img = $("#home_wr .tit_img").val();
	var title = $("#home_wr .title").val();
	var link = $("#home_wr .link").val();
	if (title == '' || link == '' || img == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/home");
		ref.push({
			img: img,
			title: title,
			link: link
		}).key;
		alert("등록되었습니다.");
	}
});

function homeUp(obj) {
	var ul = $(obj).parent().parent().parent();
	var id = ul.attr("id");
	var img = $(".tit_img", ul).val();
	var title = $(".title", ul).val();
	var link = $(".link", ul).val();
	if (title == '' || link == '' || img == '') {
		alert("내용을 적어주세요.");
	} else {
		ref = db.ref("root/home/" + id);
		ref.update({
			img: img,
			title: title,
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