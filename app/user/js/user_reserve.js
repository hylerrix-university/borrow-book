function getAllReserve () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/selectScheduleBook";
    $.get(get_url, function (data, status) {
        $(".mTitleHeader:first").text("您总共预订书籍 " + data.length + " 条");
        for (var i = 0; i < data.length; i++) {
            data[i] = JSON.parse(data[i]);
            var templeteDiv = "\
                <a bId=\"" + data[i]["books"][0]["bId"] + "\">\
                    <div class=\"mBookIntroItemWrap\">\
                        <div class=\"mBookIntroItemPhoto\">\
                            <img src=\"" + data[i]["books"][0]["imgurl"] + "\">\
                        </div>\
                        <div class=\"mBookIntroCharacterWrap\">\
                            <div class=\"mBookIntroItemBookName\">" + data[i]["books"][0]["bName"] + "</div>\
                            <div class=\"mBookIntroItemBookAuthor\">作者：" + data[i]["books"][0]["author"] + "</div>\
                            <div class=\"mBookIntroItemBookCount\">藏书：" + data[i]["books"][0]["count"] + "</div>\
                        </div>\
                    </div>\
                </a>\
                <div class=\"mDeleteButton\">\
                    <button bId=\"" + data[i]["books"][0]["bId"] + "\">取消预订</button>\
                </div>\
            ";
            $(".mBookIntroWrap").append(templeteDiv);
        }
        // 绑定每本书的跳转事件
        bindBookEvent();
        // 绑定每本书取消预订事件
        bindCancelScheduleEvent();
    });
}

// 绑定每本书的跳转事件
function bindBookEvent () {
    // 除了第一个“返回”按钮外的所有 a 标签
    $("a:gt(0)").each(function () {
        $(this).click(function () {
            var bId = $(this).attr("bId");
            window.location.href = "book_detail.html?bId=" + bId;
        });
    });
}

// 绑定每本书取消预订事件
function bindCancelScheduleEvent () {
    $(".mDeleteButton button").each(function () {
        $(this).click(function () {
            // 触发取消收藏
            var bId = $(this).attr("bId");
            cancelSchedule(bId);
        });
    });
}

// 取消预订
function cancelSchedule (bId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/cancelScheduleBook";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        // 取消预订成功，重新加载页面
        window.location.href = "user_reserve.html";
    });
}

getAllReserve();