function selectShopping () {
    // 清空书车里的书籍信息 div，以便重新渲染
    // $(".mBookIntroWrap:first").children().remove();
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/selectShopping";
    $.get(get_url, function (data, status) {
        // 如果没有书籍信息
        if (data.length === 0) {
            $(".mTitleHeader:eq(0)").html("您的书车暂时为空<span>还可以选借至多 2 本书籍</span>");
            return;
        }
        $(".mTitleHeader:eq(0)").html(
            "书车已有 " + data.length + " 本" + 
            "<span>还可以选借至多 " + (2-data.length) + " 本书籍</span>" + 
            "<span>请在俩小时内联系管理员进行借阅</span>"
        );
        $(".mButtonWrap:first").show();
        for (var i = 0; i < data.length; i++) {
            var bookInfo = JSON.parse(data[i][0]);
            books = bookInfo["books"][0];
            // 限制作者名字展示出的长度
            var templeteDiv = "\
                <div class=\"mBookIntroItemWrap\" biId=\"" + data[i][1] + "\">\
                    <div class=\"mBookIntroItemPhoto\">\
                        <img src=\"" + books["imgurl"] + "\">\
                    </div>\
                    <div class=\"mBookIntroCharacterWrap\">\
                        <div class=\"mBookIntroItemBookName\">" + books["bName"] + "</div>\
                        <div class=\"mBookIntroItemBookAuthor\">作者：" + books["author"] + "</div>\
                    </div>\
                    <div class=\"mDeleteButton\" biId=\"" + data[i][1] + "\">\
                        <button onclick=\"cancelShopping(data[i][1])\">移出书车</button>\
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
    $(".mDeleteButton").each(function () {
    	$(this).click(function () {
    		var biId = $(this).attr("biId");
            cancelShopping(biId);
    	});
    });
}

// 把某本书移出书车
function cancelShopping (biId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/cancelShopping";
    var post_data = {
        "biId": biId
    };
    $.post(post_url, post_data, function (data, status) {
        // 移出书车成功，重新加载页面
        window.location.href = "borrow_cart.html";
    });
}

// 把所有书籍移出书车
function cancelAllShopping () {
    $(".mDeleteButton").each(function () {
    	var biId = $(this).attr("biId");
        cancelShopping(biId);
    });
}

// 确定借阅后，生成二维码
function lendBook () {
    // 展示二维码相关信息
    $(".mTitleHeader:eq(2)").show();
    $(".mBorrowQRCodeWrap:first").show();
    var biIdArr = [];
    $(".mBookIntroItemWrap").each(function () {
        biIdArr.push($(this).attr("biId"));
    });
    // 请求数据
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/lendBook";
    var post_data = {};
    for (var i = 0; i < biIdArr.length; i++) post_data["biId" + (i+1)] = biIdArr[i];
    $.post(post_url, post_data, function (data ,status) {      
        var imgBase64 = jrQrcode.getQrBase64(data, {
            padding       : 10,   // 二维码四边空白（默认为10px）
            width         : 256,  // 二维码图片宽度（默认为256px）
            height        : 256,  // 二维码图片高度（默认为256px）
            correctLevel  : QRErrorCorrectLevel.H,    // 二维码容错level（默认为高）
            reverse       : false,        // 反色二维码，二维码颜色为上层容器的背景颜色
            background    : "#ffffff",    // 二维码背景颜色（默认白色）
            foreground    : "#000000"     // 二维码颜色（默认黑色）
        });
        $(".mBorrowQRCode img").attr("src", imgBase64);
        // 不能再次借阅
        $(".mButtonWrap button:eq(1)").hide();
        $(".mButtonWrap button:eq(2)").show();
    });
}

function checkStatus () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/checkStatus";
    $.get(get_url, function (data, status) {
        if (!data["status"] || !data["check"]) {
            // ("还没有借阅，正常进入购物车");
            selectShopping();
        } else {
            // ("已经借阅，直接显示二维码");
            var imgBase64 = jrQrcode.getQrBase64(data["check"], {
                padding       : 10,   // 二维码四边空白（默认为10px）
                width         : 256,  // 二维码图片宽度（默认为256px）
                height        : 256,  // 二维码图片高度（默认为256px）
                correctLevel  : QRErrorCorrectLevel.H,    // 二维码容错level（默认为高）
                reverse       : false,        // 反色二维码，二维码颜色为上层容器的背景颜色
                background    : "#ffffff",    // 二维码背景颜色（默认白色）
                foreground    : "#000000"     // 二维码颜色（默认黑色）
            });
            $(".mBorrowQRCode img").attr("src", imgBase64);
            $(".mTitleHeader:eq(0)").html("您的书籍正在借阅中<span>请及时联系管理员归还</sapn>");
            $(".mTitleHeader:eq(1)").hide();
            // 展示二维码
            $(".mTitleHeader:eq(2)").show();
            $(".mBorrowQRCodeWrap").show();
        }
    });
}

checkStatus();