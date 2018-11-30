var n = 1;
var interval;
var depth = 2;
$("#ab_slides").find(".slide").each(function(){
	var name = $(this).data("name");
	var html = '<span class="fa fa-circle w3-padding" onclick="paging(this);"></span>';
	$(this).parent().next().find(".pager").append(html);
});
interval = setInterval(FnSlide, 3000);
function FnSlide() {
	$("#ab_slides").parent().find(".pager").find("span").removeClass("poger_in").addClass("poger_out");
	$("#ab_slides").parent().find(".pager").find("span").eq(n).removeClass("poger_out").addClass("poger_in");
	$("#ab_slides .slide").stop().eq(n).css({"display":"none","z-index":depth++}).fadeIn(1000, function(){
		if(n == 2) n = -1;
		n++;
	});
}
function paging(obj) {
	n = $(obj).index();
	clearInterval(interval);
	FnSlide();
	interval = setInterval(FnSlide, 3000);
}
$("#ab_slides").hover(function(){
	clearInterval(interval);
}, function(){
	interval = setInterval(FnSlide, 3000);
});



