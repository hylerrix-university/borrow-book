function searchBook (keyword) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/searchBook";
    var data = {
        "rows": 10,
        "keyword": keyword,
        "way": 0
    };
    $.post(post_url, data, function (data, status) {
        data = JSON.parse(data);
        var booksArr = data["books"];
        for (var i = 0; i < booksArr.length; i++) {
            // 隐藏“请在上方进行搜索”的相关提示
            $(".mTitleHeader:eq(0)").css("display", "none");
            // 显示搜索提示
            $(".mTitleHeader:eq(1)").css("display", "block");
            $(".mTitleHeader:eq(1) span").text("（您本次搜索的是：" + keyword + "）");
            // 将所有数据填充到相应位置
            var templeteDiv = "\
                <div class=\"mBookIntroWrap\">\
                    <a href=\"book_detail.html\">\
                        <div class=\"mBookIntroItemWrap\">\
                            <div class=\"mBookIntroItemPhoto\">\
                                <img src=\"" + booksArr[i]["imgurl"] + "\">\
                            </div>\
                            <div class=\"mBookIntroCharacterWrap\">\
                                <div class=\"mBookIntroItemBookName\">" + booksArr[i]["bName"] + "</div>\
                                <div class=\"mBookIntroItemBookAuthor\">作者：" + booksArr[i]["author"] + "</div>\
                                <div class=\"mBookIntroItemBookCount\">藏书：" + booksArr[i]["count"] + "</div>\
                            </div>\
                        </div>\
                    </a>\
                </div>\
            ";
            $(".mSearchResultWrap:first").append(templeteDiv);
        }
    });
};

function searchSameCategory (cId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/searchBookByCid";
    var data = {
        "cId": cId,
        "rows": 3
    };
    $.post(post_url, data, function (data, status) {
        data = JSON.parse(data);
        // 本次获取的相关类别的书籍数量(<=3)
        var count = data["count"];
        $(".mTitleHeader:eq(2) span").text("(已加载 " + count + " 条，点击加载更多）");
        // 开始填充数据
        var booksArr = data["books"];
        for (var i = 0; i < booksArr.length; i++) {
            var templeteDiv = "\
                <div class=\"mBookIntroMiniItemWrap\">\
                    <a href=\"book_detail.html\">\
                        <div class=\"mBookMiniPhoto\">\
                            <img src=\"" + booksArr[i]["imgurl"] + "\">\
                        </div>\
                        <div class=\"mBookMiniBookName\">\
                            " + booksArr[i]["bName"] + "\
                        </div>\
                        <div class=\"mBookMiniBookAuthor\">\
                            作者：" + booksArr[i]["author"] + "\
                        </div>\
                    </a>\
                </div>\
            ";
            $(".mSameCategoryWrap:first").append(templeteDiv);
        }
    });
};

searchBook("大型网站系统与Java中间件开发实践");
searchSameCategory(1);