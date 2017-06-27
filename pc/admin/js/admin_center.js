function changeNaviContent (index) {
    if (index == 0) {
	    // 录入书籍
        $(".pNavigationItem:eq(0) button").css("background-color", "rgba(0, 0, 0, 0)");
        $(".pNavigationItem:eq(1) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pNavigationItem:eq(2) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pContentWrap_0").show();
        $(".pContentWrap_1").hide();
        $(".pContentWrap_2").hide();
    } else if (index == 1) {
        // 新建书库
        $(".pNavigationItem:eq(0) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pNavigationItem:eq(1) button").css("background-color", "rgba(0, 0, 0, 0)");
        $(".pNavigationItem:eq(2) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pContentWrap_0").hide();
        $(".pContentWrap_1").show();
        $(".pContentWrap_2").hide();
    } else if (index == 2) {
        // 管理员账号管理
        $(".pNavigationItem:eq(0) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pNavigationItem:eq(1) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pNavigationItem:eq(2) button").css("background-color", "rgba(0, 0, 0, 0)");
        $(".pContentWrap_0").hide();
        $(".pContentWrap_1").hide();
        $(".pContentWrap_2").show();
    }
}

var urlArgs = window.location.search;
var tabIndex = urlArgs.split("=")[1];
if(!tabIndex) tabIndex = 0;
changeNaviContent(tabIndex);