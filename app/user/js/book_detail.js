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
        $(".mTitleHeader:eq(0) span").text("已加载 " + relatedBooks.length + " 本书籍");
        for (var i = 0; i < relatedBooks.length; i++) {
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

// 判断书籍是否已经被用户预订、收藏或加入书车并绑定相应事件
function judgeBook () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var data = {
        "bId": bId
    }
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/judgeBook";
    $.post(post_url, data, function (data, status) {
        console.log(data);
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
        // 取消收藏成功，改变相应状态
        $(".mButtonWrap button:eq(1)").hide();
        $(".mButtonWrap button:eq(0)").show();
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
        $(".mButtonWrap button:eq(2)").hide();
        $(".mButtonWrap button:eq(3)").show();
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
        $(".mButtonWrap button:eq(3)").hide();
        $(".mButtonWrap button:eq(2)").show();
    });
}

// 加入书车
function addShopping () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/addShopping";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        // 加入书车成功，改变相应状态
        $(".mButtonWrap button:eq(4)").hide();
        $(".mButtonWrap button:eq(5)").show();
    });
}

// 移出书车
function cancelShopping () {
    var urlArgs = window.location.search;
    var bId = urlArgs.split("=")[1];
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/cancelShopping";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        // 加入书车成功，改变相应状态
        $(".mButtonWrap button:eq(5)").hide();
        $(".mButtonWrap button:eq(4)").show();
    });
}

function catalogShow () {
    $(".mBookDetailCatalog").each(function () {
        $(this).toggle(1000);
    });
}

judgeBook();
getBookDetail();