function selectShopping () {
    // 清空书车里的书籍信息 div，以便重新渲染
    // $(".mBookIntroWrap:first").children().remove();
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/selectShopping";
    $.get(get_url, function (data, status) {
        console.log(data);
        // [ 
        //    "0" : { 
        //         "0" : "{"next":"","count":1,"books":[{"bId":"AVxoaoAWoMlguXEb9gRB","bName":"Java编程思想 （第4版）","sId":1,"cId":1,"spell":"javabianchengsixiang （di4ban）","initial":"javabcsx （d4b）","imgurl":"https://img1.doubanio.com/mpic/s2553047.jpg","isbn":"9787111213826","author":"[美] Bruce Eckel","count":1}]}", 
        //         "1" : "12", 
        //    }, 
        //    "1" : { 
        //         "0" : "{"next":"","count":0,"books":null}", 
        //         "1" : "1", 
        //    },
        // ]
        // 如果没有书籍信息
        if (data.length === 0) {
            $(".mTitleHeader:first").html("您的书车暂时为空<span>还可以选借至多 2 本书籍</span>");
            return;
        }
        $(".mTitleHeader:eq(1)").show();
        $(".mBorrowQRCodeWrap:first").show();
        $(".mButtonWrap:first").show();
        for (var i = 0; i < data.length; i++) {
            var books = JSON.parse(data[i]["0"]["0"]);
            console.log(books);
            var biId = data[i]["1"];
            var templeteDiv = "\
                <div class=\"mBookIntroItemWrap\" biId=\"\">\
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