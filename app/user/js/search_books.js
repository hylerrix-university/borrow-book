function getSearchBook () {
    // 清除曾经搜的书渲染出的多余 DOM
    $("#searchBody .mSearchResultWrap").children().remove();
    $("#searchBody .mSameCategoryWrap").children().remove();
    $(".mTitleHeader:last").hide();
    // 进行搜索
    var keyword = $("input:first").val();
    var searchWay = $("select:first").find("option:selected").val();
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/searchBook";
    var data = {
        "rows": 10,
        "keyword": keyword,
        "way": searchWay
    };
    $.post(post_url, data, function (data, status) {
        // 搜索成功，再次读取搜索历史
        getAllRecord();
        data = JSON.parse(data);
        if (data["count"] === 0) {
            // 搜索结果不存在
            $(".mTitleHeader:first").show();
            $("#searchBody").hide();
            return;
        }
        // 记录本次搜索信息
        recordSearch(keyword);
        var booksArr = data["books"];

        for (var i = 0; i < booksArr.length; i++) {
            // 显示搜索提示
            $(".mTitleHeader:eq(1)").css("display", "block");
            $(".mTitleHeader:eq(1) span").text("（您本次搜索的是：" + keyword + "）");
            // 将所有数据填充到相应位置
            var templeteDiv = "\
                <div class=\"mBookIntroWrap\">\
                    <a bId=\"" + booksArr[i]["bId"] + "\">\
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
        // 给每一本书绑定点击事件
        bindBookClickEvent();
        // 获取相关书籍，跟本次搜索有关
        searchSameCategory(booksArr[0]["cId"]);
        $(".mTitleHeader:first").hide();
        $("#searchBody").show();
    });
};

// 获取相关书籍，跟本次搜索有关
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
        // 开始填充数据
        var booksArr = data["books"];
        for (var i = 0; i < booksArr.length; i++) {
            var templeteDiv = "\
                <div class=\"mBookIntroMiniItemWrap\">\
                    <a bId=\"" + booksArr[i]["bId"] + "\">\
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
            $(".mSameCategoryWrap:eq(0)").append(templeteDiv);
        }
    });
};

// 给每一本书绑定点击事件
function bindBookClickEvent () {
    $(".mBookIntroWrap a").each(function () {
        $(this).click(function () {
            var bId = $(this).attr("bId");
            window.location.href = "book_detail.html?bId=" + bId;
        });
    });
    $(".mBookIntroMiniItemWrap a").each(function () {
        $(this).click(function () {
            var bId = $(this).attr("bId");
            window.location.href = "book_detail.html?bId=" + bId;
        });
    });
}

function recordSearch (keyword) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/System/insertRecord";
    var data = {
        "keyword": keyword
    };
    $.post(post_url, data, function (data, status) {
        // 本次搜索信息保存成功
    });
}

function getAllRecord () {
    $(".mWechatRecordWrap").children().remove();
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/System/getRecord";
    $.get(get_url, function (data, status) {
        // length 用来控制显示出来的条数
        var dataLength = data.length;
        if (dataLength === 0) {
            $(".mTitleHeader:eq(4) span").text("您还没有搜索过，请进行搜索");
            return;
        }
        // 如果数据超过 7 条
        if (dataLength > 7) {
            // 显示“点击加载更多按钮”
            $(".mTitleHeader:last").show();
            dataLength = 7;
        }
        $(".mTitleHeader:eq(4) span").text("(已加载 " + dataLength + " 条搜索记录)");
        // 从最近的搜索历史开始显示 dataLength 个
        for (var i = data.length - 1; i >= data.length - dataLength; i--) {
            var templeteDiv = "\
                <div class=\"mWechatRecordRightItemWrap\">\
                    <a f_id=\"" + data[i]["f_id"] + "\">\
                        <div class=\"mWechatRecordRightContent\">" + data[i]["value"] + "</div>\
                    </a>\
                    <div class=\"mWechatRecordRightPhoto\">\
                        <img src=\"images/icorvoh.jpg\">\
                    </div>\
                </div>\
            ";
            $(".mWechatRecordWrap:first").append(templeteDiv);
        }
        // 绑定每条搜索记录的点击事件
        bindRecordEvent();
    });
}

// 获取推荐书籍，跟用户有关
function getRecommderBooks () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getRecommderBooks";
    $.get(get_url, function (data, status) {
        if (!data) {
            // 不存在推荐书籍时
            $(".mTitleHeader:eq(3) span").text("暂无推荐，每日凌晨两点准时更新");
            return;
        }
        data = JSON.parse(data);
        if (data["books"] === null) return;
        $(".mSameCategoryWrap:eq(1)")
        // 开始填充数据
        var booksArr = data["books"];
        for (var i = 0; i < booksArr.length; i++) {
            var templeteDiv = "\
                <div class=\"mBookIntroMiniItemWrap\">\
                    <a bId=\"" + booksArr[i]["bId"] + "\">\
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
            $(".mSameCategoryWrap:eq(1)").append(templeteDiv);
        }
        $(".mTitleHeader:eq(3) span").text("根据您最近的搜索偏向推荐");
        $(".mSameCategoryWrap:eq(1)").show();
    });
}

// 绑定每条搜索记录的点击事件
function bindRecordEvent () {
    $(".mWechatRecordRightItemWrap a").each(function () {
        $(this).click(function () {
            var a = $(this).find("div").get(0);
            $("input:first").val(a.innerHTML);
            // 将该记录设置成“书名搜索”方式
            $("select:first option:first").attr("selected", "selected");
            // 进行搜索
            getSearchBook();
        });
    });
}

// 读取并填充搜索历史
getAllRecord();
// 获取推荐书籍
getRecommderBooks();

function scanBook () {
    var jsapi_ticket_url = "https://wwwxinle.cn/Book/public/index.php/index/Index/ticket";
    var jsapi_ticket;

    $.get(jsapi_ticket_url, function (data, status) {
        data = JSON.parse(data);
        jsapi_ticket = data["ticket"];
    });

    // 授权访问的当前页面的网页
    var url = location.href.split('#')[0];
    console.log(url);
    var createNonceStr = function () {
        return Math.random().toString(36).substr(2, 15);
    };

    var createTimestamp = function () {
        return parseInt(new Date().getTime() / 1000) + '';
    };

    var raw = function (args) {
        var keys = Object.keys(args);
        keys = keys.sort()
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key];
        });

        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    };

    /**
    * @synopsis 签名算法 
    *
    * @param jsapi_ticket 用于签名的 jsapi_ticket
    * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
    *
    * @returns
    */
    var sign = function (jsapi_ticket, url) {
        var ret = {
            jsapi_ticket: jsapi_ticket,
            nonceStr: createNonceStr(),
            timestamp: createTimestamp(),
            url: url
        };

        var string = raw(ret);
            shaObj = new jsSHA(string, 'TEXT');
        ret.signature = shaObj.getHash('SHA-1', 'HEX');

        return ret;
    };

    jsapi_ticket = sign(jsapi_ticket, url);
    console.log(jsapi_ticket);

    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx1a474de918181499', // 必填，公众号的唯一标识
        timestamp: jsapi_ticket.timestamp, // 必填，生成签名的时间戳
        nonceStr: jsapi_ticket.nonceStr, // 必填，生成签名的随机串
        signature: jsapi_ticket.signature,// 必填，签名，见附录1
        jsApiList: ["checkJsApi", "scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    // 通过ready接口处理成功验证
    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        console.log("wx.ready");
    });

    // 通过error接口处理失败验证
    wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log("wx.error");
        alert("wx.error");
    });

    // 调起微信扫一扫接口
    wx.scanQRCode({
        needResult: 1,
        // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], 
        // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            // 当 needResult 为 1 时，扫码返回的结果
            $
        }
    });
}