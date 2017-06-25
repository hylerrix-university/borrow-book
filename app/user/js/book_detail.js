// 判断书籍是否已经被用户收藏、预订
function judgeBook () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var data = {
        "bId": bId
    }
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/judgeBook";
    $.post(post_url, data, function (data, status) {
        var isCollect = data["isCollect"];
        var isSchedule = data["isSchedule"];
        // 将能否预订的信息隐藏在按钮中
        $(".mButtonWrap button:eq(0)").attr("isSchedule", isSchedule);
        $(".mButtonWrap button:eq(1)").attr("isSchedule", isSchedule);
        if (isCollect) $(".mButtonWrap button:eq(4)").show(); // 显示“收藏本书”
        if (!isCollect) $(".mButtonWrap button:eq(5)").show(); // 显示“取消收藏”
    });
}

function getBookDetail () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getBookDetail";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        data = JSON.parse(data);
        // 书籍详情
        var bookDetail = data["book"]["books"][0];
        $(".mBookDetailPhoto img").attr("src", bookDetail["imgurl"]);
        $(".mBookDetailCharacterTitleItem").text(bookDetail["bName"]);
        $(".mBookDetailCharacterItem:eq(0) span").text(bookDetail["author"]);
        $(".mBookDetailCharacterItem:eq(1) span").text(bookDetail["publisher"]);
        $(".mBookDetailCharacterItem:eq(2) span").text(bookDetail["isbn"]);
        $(".mBookDetailCharacterItem:eq(3) span").text(bookDetail["count"]); // 藏书量
        $(".mBookDetailCharacterItem:eq(4) span").text(bookDetail["canBorCount"]); // 当前可借
        // 根据当前可借量给展示相应按钮
        var isSchedule = $(".mButtonWrap button:eq(0)").attr("isSchedule");
        if (bookDetail["canBorCount"] == 0) {
            if (isSchedule == 1) {
                // 没有可借书籍，可以预订
                $(".mButtonWrap button:eq(0)").show();
                $(".mButtonWrap button:eq(1)").hide();
            } else {
                // 没有可借书籍，无法预订
                $(".mButtonWrap button:eq(1)").show();
                $(".mButtonWrap button:eq(0)").hide();
            }
        } else {
            // 有可借书籍，显示“预约书籍”
            $(".mButtonWrap button:eq(2)").show();
            $(".mButtonWrap button:eq(3)").hide();
        }
        $(".mBookDetailBelongTo").text("所属类别：" + bookDetail["sName"] + " > " + bookDetail["cName"]);
        var catalog = bookDetail["catalog"];
        var catalogArr = catalog.split("\n");
        // 清除目录中的“正在加载”
        $(".mBookDetailCatalog:eq(0)").remove();
        // 填充目录
        for (var i = 0; i < catalogArr.length; i++) {
            var catalogDiv = "<div class=\"mBookDetailCatalog\" style=\"display: none\">" + catalogArr[i] + "</div>";
            $(".mBookDetailPartWrap:eq(1)").append(catalogDiv);
        }
        $(".mBookDetailIntro").text(bookDetail["summary"]);
        // 同类书籍
        var relatedBooks = data["relatedBooks"]["books"];
        var relatedLength = relatedBooks.length;
        if (relatedLength > 3) relatedLength = 3;
        $(".mTitleHeader:eq(0) span").text("已加载 " + relatedLength + " 本书籍");
        for (var i = 0; i < relatedLength; i++) {
            var relatedBookDiv = "\
                <div class=\"mBookRelativeItemWrap\">\
                    <a bId=\"" + relatedBooks[i]["bId"] + "\">\
                        <div class=\"mBookMiniPhoto\">\
                            <img src=\"" + relatedBooks[i]["imgurl"] + "\">\
                        </div>\
                        <div class=\"mBookMiniBookName\">" + relatedBooks[i]["bName"] + "</div>\
                        <div class=\"mBookMiniBookAuthor\">" + relatedBooks[i]["author"] + "</div>\
                    </a>\
                </div>\
            ";
            $(".mBookRelativeWrap").append(relatedBookDiv);
        }
        // 给每个同类书籍绑定相应的点击事件
        bindSameCateEvent();
    });
}

function bindSameCateEvent() {
    $(".mBookRelativeItemWrap a").each(function () {
        $(this).click(function () {
            var bId = $(this).attr("bId");
            window.location.href = "book_detail.html?bId=" + bId;
        });
    });
}

// 预订书籍
function scheduleBook () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/scheduleBook";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        // 预订书籍成功，改变相应状态
        $(".mButtonWrap button:eq(0)").hide();
        $(".mButtonWrap button:eq(1)").show();
        $(".mMessage:eq(0)").show();
        var tips = "预订书籍成功，您可以到“我的预订”页面中查看。当本书可借量增加时将会从公众号中通知您。";
        $(".mMessage:eq(0) p:first").text(tips);
    });
}

// 取消预订
function cancelScheduleBook () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/cancelScheduleBook";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        // 取消预订成功，改变相应状态
        $(".mButtonWrap button:eq(1)").hide();
        $(".mButtonWrap button:eq(0)").show();
        $(".mMessage:eq(0)").show();
        var tips = "取消预订成功，欢迎再次预订。";
        $(".mMessage:eq(0) p:first").text(tips);
    });
}

// 预约书籍
function orderBook () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/orderBook";
    var data = {
        "bId": bId
    }
    $.post(post_url, data, function () {
        // 预约书籍成功，改变相应状态
        $(".mButtonWrap button:eq(2)").hide();
        $(".mButtonWrap button:eq(3)").show();
        $(".mMessage:eq(0)").show();
        var tips = "预约书籍成功，您预约的书籍已加入书车，请在两小时内前往借阅书库找到该书并联系管理员进行借阅。";
        $(".mMessage:eq(0) p:first").text(tips);
    });
}

// 添加收藏
function addCollect () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/addCollect";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        // 加入收藏成功，改变相应状态
        $(".mButtonWrap button:eq(4)").hide();
        $(".mButtonWrap button:eq(5)").show();
        $(".mMessage:eq(0)").show();
        var tips = "添加收藏成功，您可以到“我的收藏”页面中查看。";
        $(".mMessage:eq(0) p:first").text(tips);
    });
}

// 取消收藏
function cancelCollect () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/cancelCollect";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        // 取消收藏成功，改变相应状态
        $(".mButtonWrap button:eq(5)").hide();
        $(".mButtonWrap button:eq(4)").show();
        $(".mMessage:eq(0)").show();
        var tips = "取消收藏成功，“我的收藏”页面已更新。";
        $(".mMessage:eq(0) p:first").text(tips);
    });
}

function catalogShow () {
    $(".mBookDetailCatalog").each(function () {
        $(this).toggle(1000);
    });
}

judgeBook();
getBookDetail();