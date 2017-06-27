function changeNaviContent (index) {
	if (index == 0) {
		$(".pNavigationItem:eq(0) button").css("background-color", "rgba(0, 0, 0, 0)");
		$(".pNavigationItem:eq(1) button").css("background-color", "rgba(0, 0, 0, .2)");
		$(".pContentWrap_0").show();
		$(".pContentWrap_1").hide();
	} else {
		console.log(index);
		$(".pNavigationItem:eq(1) button").css("background-color", "rgba(0, 0, 0, 0)");
		$(".pNavigationItem:eq(0) button").css("background-color", "rgba(0, 0, 0, .2)");
		$(".pContentWrap_1").show();
		$(".pContentWrap_0").hide();
	}
}

changeNaviContent(0);