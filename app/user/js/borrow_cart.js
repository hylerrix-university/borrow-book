function selectShopping () {
    // 清空书车里的书籍信息 div，以便重新渲染
    // $(".mBookIntroWrap:first").children().remove();
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/selectShopping";
    $.get(get_url, function (data, status) {
        // 如果没有书籍信息
        if (data.length === 0) {
            $(".mTitleHeader:first").html("您的书车暂时为空<span>还可以选借至多 2 本书籍</span>");
            return;
        }
        $(".mTitleHeader:first").html("书车已有 " + data.length + " 本<span>还可以选借至多 " + (2-data.length) + " 本书籍</span>");
        $(".mButtonWrap:first").show();
        for (var i = 0; i < data.length; i++) {
            var bookInfo = JSON.parse(data[i][0]);
            books = bookInfo["books"][0];
            var templeteDiv = "\
                <div class=\"mBookIntroItemWrap\" biId=\"" + data[i][1] + "\">\
                    <div class=\"mBookIntroItemPhoto\">\
                        <img src=\"" + books["imgurl"] + "\">\
                    </div>\
                    <div class=\"mBookIntroCharacterWrap\">\
                        <div class=\"mBookIntroItemBookName\">" + books["bName"] + "</div>\
                        <div class=\"mBookIntroItemBookAuthor\">作者：" + books["author"]; + "</div>\
                    </div>\
                    <div class=\"mDeleteButton\">\
                        <button>移出书车</button>\
                    </div>\
                </div>\
            ";
            $(".mBookIntroWrap:first").append(templeteDiv);
        }
        // 展示二维码相关信息
        $(".mTitleHeader:eq(1)").show();
        $(".mBorrowQRCodeWrap:first").show();
        // 给每个书籍旁的附属按钮绑定“移出书车”事件
        bindCancelShoppingEvent();
    });
}

// 给每个书籍旁的附属按钮绑定“移出书车”事件
function bindCancelShoppingEvent () {
    $(".mBookIntroItemWrap").each(function () {
    	$(this).click(function () {
    		var bId = $(this).attr("bId");
            cancelShopping(bId);
    	});
    });
}

// 把某本书移出书车
function cancelShopping (biId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/cancelShopping";
    var data = {
        "biId": biId
    };
    $.post(post_url, data, function (data, status) {
        // 移出书车成功，重新加载页面
        window.location.href = "borrow_cart.html";
    });
}

// 把所有书籍移出书车
function cancelAllShopping () {
    $(".mBookIntroItemWrap").each(function () {
    	var biId = $(this).attr("biId");
        cancelShopping(biId);
    });
}

selectShopping();