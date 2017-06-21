function getCategoryBookById (cId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/searchBookByCid";
    var post_data = {
        "cId": cId,
        "rows": 10 // 每页返回 rows 条结果
    };
    
    // 获取书籍类别下的书籍
    $.post(post_url, post_data, function (data, status) {
        data = JSON.parse(data);
        // 本次获取的相关类别的书籍数量(<=3)
        var count = data["count"];
        var next = data["next"];
        var booksArr = data["books"];
        // 如果没有数据，提示消息并退出
        if (count === 0) {
            $(".mTitleHeader:eq(0)").show();
            $(".mTitleHeader:eq(0)").text("该类书籍暂时没有相关结果");
            return;
        }
        // “点击加载更多”按钮是否出现及其绑定函数
        handleNextButton(next);
        // 开始填充数据
        renderCategoryBook(booksArr);
    });
};

function setCategoryName (cId) {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getCategories";
    $.get(get_url, function (data, status) {
        // 获取书籍类别的名字
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            if (data[i]["cId"] === cId) {
                $(".mHeaderTitle:eq(0)").text("“" + data[i]["cName"] + "”类书籍");
                break;
            }
        }
    });
}

function getMoreCategoryBook(next) {
    var post_data = {
        "next": next
    };
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getNextBook";
    $.post(post_url, post_data, function (data, status) {
        data = JSON.parse(data);
        var booksArr = data["books"];
        var next = data["next"];
        // “点击加载更多”按钮是否出现及其绑定函数
        handleNextButton(next);
        // 开始填充数据
        renderCategoryBook(booksArr);
    });
}

function renderCategoryBook (booksArr) {
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
        $(".mButtonWrap").before(templeteDiv);
    }
}

function handleNextButton (next) {
    if (next) {
        $(".mButtonWrap").show();
        $(".mButtonWrap button").unbind();
        $(".mButtonWrap button").click(function() {
            getMoreCategoryBook(next);
        });
    } else {
        $(".mButtonWrap").hide();
        var titleDiv = "<div class=\"mTitleHeader\">已全部加载</div>";
        $(".mButtonWrap").after(titleDiv);
        return;
    }
}

setCategoryName(1);
getCategoryBookById(1);