jQuery(function($) {
	$("#a_url").click(function() {
		$("html, body").animate({
			scrollTop : ($($(this).attr("href")).offset().top - 100) + "px"
		}, 500);
		return false;
	});
	$("#a_camera").click(function() {
		$("html, body").animate({
			scrollTop : ($($(this).attr("href")).offset().top - 100) + "px"
		}, 500);
		return false;
	});
	$("#a_upload").click(function() {
		$("html, body").animate({
			scrollTop : ($($(this).attr("href")).offset().top - 100) + "px"
		}, 500);
		return false;
	});
	$("#a_browser").click(function() {
		$("html, body").animate({
			scrollTop : ($($(this).attr("href")).offset().top - 100) + "px"
		}, 500);
		return false;
	});
});