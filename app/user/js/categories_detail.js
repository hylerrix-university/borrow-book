function getCategoryById (cId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/searchBookByCid";
    var data = {
        "cId": cId,
        "rows": 2 // 每页返回 2 条结果
    };
    // 获取书籍类别的名字
    var categoryName;
    $.get("https://wwwxinle.cn/Book/public/index.php/index/Book/getCategories", function (data, status) {
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            if (data[i]["cId"] === cId) {
                categoryName = data[i]["cName"];
                break;
            }
        }
    });
    // 获取书籍类别下的书籍
    $.post(post_url, data, function (data, status) {
    	console.log(data);
        data = JSON.parse(data);
        // 本次获取的相关类别的书籍数量(<=3)
        var count = data["count"];
        $(".mHeaderTitle:eq(0)").text("“" + categoryName + "”类书籍");
        // 如果没有数据，提示消息并退出
        if (count === 0) {
            $(".mTitleHeader:eq(0)").after("<div class=\"mTitleHeader\">该类书籍暂时没有相关结果</div>");
            $(".mTitleHeader:eq(0)").hide();
            return;
        }
        $(".mTitleHeader:eq(0)").text("本页已加载书籍种类：" + count + " 条");
        // 开始填充数据
        var booksArr = data["books"];
        for (var i = 0; i < booksArr.length; i++) {
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
            $(".mTitleHeader:first").after(templeteDiv);
        }
    });
};

getCategoryById(1);