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
        $(".mTitleHeader:eq(1)").show();
        $(".mBorrowQRCodeWrap:first").show();
        $(".mButtonWrap:first").show();
        for (var i = 0; i < data.length; i++) {
            var templeteDiv = "\
                <div class=\"mBookIntroItemWrap\" bId=\"\">\
                    <div class=\"mBookIntroItemPhoto\">\
                        <img src=\"images/icorvoh.jpg\">\
                    </div>\
                    <div class=\"mBookIntroCharacterWrap\">\
                        <div class=\"mBookIntroItemBookName\">这是一本书的书名</div>\
                        <div class=\"mBookIntroItemBookAuthor\">作者：韩亦乐</div>\
                        <div class=\"mBookIntroItemBookCount\">数量：1</div>\
                    </div>\
                    <div class=\"mDeleteButton\">\
                        <button onclick=\"cancelShopping()\">移出书车</button>\
                    </div>\
                </div>\
            ";
            $(".mBookIntroWrap:first").append(templeteDiv);
        }
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
function cancelShopping (bId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/cancelShopping";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        // 移出书车成功，重新加载页面
        window.location.href = "borrow_cart.html";
    });
}

// 把所有书籍移出书车
function cancelAllShopping () {
    $(".mBookIntroItemWrap").each(function () {
    	var bId = $(this).attr("bId");
        cancelShopping(bId);
    });
}

selectShopping();