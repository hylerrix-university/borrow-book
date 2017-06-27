function finishBook () {
    var isbn = $("input:eq(0)").val();
    var post_data = {
        "isbn": isbn
    };
    var post_url = "https://corefuture.cn/lib_api/book/finishBook.action";
    // $.post(post_url, post_data, function (data, status) {
        // alert(data);
        $(".pContentDetailWrap:eq(0)").show();
        $(".pContentSubmitWrap:eq(0)").show();
    // });
}

function saveBook () {
    var isbn = $("input:eq(0)").val();
    var post_data = {
        "isbn": isbn
    };
    var post_url = "https://corefuture.cn/lib_api/book/finishBook.action";
    $.post(post_url, post_data, function (data, status) {
        alert(data);
    });
}

function getAllStacks () {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getAllStacks";
    $.post(post_url, function (data, status) {
        console.log(data);
        setStacks_0();
        setStacks_1();
    });
}

// 设置录入书籍选项卡下的单选框二级联动
function setStacks_0 () {

}

// 设置书库管理选项卡下的单选框二级联动
function setStacks_1 () {

}

getAllStacks();


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