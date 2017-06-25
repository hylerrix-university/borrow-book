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
                        <img src=\"images/anonymity.jpg\">\
                    </div>\
                </div>";
            $(".mWechatRecordWrap").append(templeteDiv);
        }
        // 绑定搜索记录点击事件
        bindRecordEvent();
        // 设置搜索记录旁的头像
        getUserInfo();
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

// 获取头像和姓名
function getUserInfo () {
    // 获取头像和姓名
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/getInfo";
    $.get(get_url, function (data, status) {
        // 一次循环获取 JSON 里的第一个元素内容(不知道名字的情况下)
        for (var obj in data) {
            $(".mWechatRecordRightPhoto img").each(function () {
                $(this).attr("src", data[obj]["headimgurl"]);
            });
        }
    });
}

getAllRecord();