function getAllRecord () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/System/getRecord";
    $.get(get_url, function (data, status) {
        if (data.length === 0) {
            $(".mWechatRecordLeftContent:eq(0)").text("您还没有使用过搜索功能");
            $(".mWechatRecordLeftContent:eq(1)").text("期待您的首次使用");
        }
        $(".mTitleHeader:eq(0)").text("总计 " + data.length + " 条搜索记录");
	    $(".mWechatRecordLeftContent:eq(0)").text("您总共有 " + data.length + " 条搜索记录");
        $(".mWechatRecordLeftContent:eq(1)").text("每条记录可点击并进行相应搜索");
        // 从最近的搜索历史开始显示
        for (var i = data.length; i > 0; i--) {
            var templeteDiv = "\
                <div class=\"mWechatRecordRightItemWrap\">\
                    <a keyword=\"" + data[i - 1]["value"] + "\" way=\"" + data[i - 1]["way"] + "\" >\
                        <div class=\"mWechatRecordRightContent\">" + data[i - 1]["value"] + "</div>\
                    </a>\
                    <div class=\"mWechatRecordRightPhoto\">\
                        <img src=\"images/icorvoh.jpg\">\
                    </div>\
                </div>";
            $(".mWechatRecordWrap").append(templeteDiv);
        }
        bindRecordEvent();
    });
}

function bindRecordEvent () {
    $(".mWechatRecordRightItemWrap a").each(function () {
        $(this).click(function () {
            var keyword = $(this).attr("keyword");
            var way = $(this).attr("way");
            window.location.href = "search_books.html?keyword=" + keyword + "&way=" + way;
        });
    })
}

function deleteAllRecord () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/System/flushRecord";
    $.get(get_url, function (data, status) {
        // 清除搜索记录成功
        $(".mTitleHeader:eq(0)").text("总计 " + 0 + " 条搜索记录");
        $(".mWechatRecordLeftContent:eq(0)").text("您已成功清除所有搜索记录");
        $(".mWechatRecordLeftContent:eq(1)").text("期待您的再次搜索");
        $(".mWechatRecordRightItemWrap").remove();
    });
}

getAllRecord();