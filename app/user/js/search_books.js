// 页面加载时根据 url 参数搜索一次
function getSearchBookByURL () {
    var urlArgs = window.location.search;
    if (!urlArgs) return;
    var argStr = urlArgs.substring(1); // 去掉第一个问号
    var argArr = argStr.split("&");
    var keyword;
    var way;
    argArr.forEach(function (element) {
        // 获取 keyword
        if (element.indexOf("keyword") !== -1) keyword = element.split("=")[1];
        // 获取 way
        if (element.indexOf("way") !== -1) way = element.split("=")[1];
    });
    $("input:first").val(decodeURI(keyword));
    // 将该记录设置成“书名搜索”方式
    $("select:first option:eq(" + parseInt(way) + ")").attr("selected", "selected");
    // 进行搜索
    getSearchBook();
}

function getSearchBook () {
    // 清除曾经搜的书渲染出的多余 DOM
    $("#searchBody .mSearchResultWrap").children().remove();
    $("#searchBody .mSameCategoryWrap").children().remove();
    $(".mTitleHeader:last").hide();
    // 进行搜索
    var keyword = $("input:first").val();
    var way = $("select:first").find("option:selected").val();
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/searchBook";
    var data = {
        "rows": 10,
        "keyword": keyword,
        "way": way
    };
    console.log(way);
    $.post(post_url, data, function (data, status) {
        // 搜索成功，再次读取搜索历史
        getAllRecord();
        data = JSON.parse(data);
        if (data["count"] === 0 || data == "false") {
            // 搜索结果不存在
            $(".mTitleHeader:first").show();
            $("#searchBody").hide();
            return;
        }
        // 记录本次搜索信息
        var way = $("select option:selected").attr("value");
        recordSearch(keyword, way);
        console.log(data);
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

function recordSearch (keyword, way) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/System/insertRecord";
    var data = {
        "keyword": keyword,
        "way": way
    };
    $.post(post_url, data, function (data, status) {
        // 本次搜索信息保存成功
        alert(data);
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
                    <a f_id=\"" + data[i]["f_id"] + "\" way=\"" + data[i]["way"] + "\">\
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

function isRecommd () {
    var isRecommdFlag;
    $.ajaxSetup({ 
        async : false 
    });
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/getRecommendSwitch";
    $.get(get_url, function (data, status) {
        if (data[0]["recommend"] == "0") {
            // 用户关闭了推荐功能
            isRecommdFlag = 0;
        } else {
            isRecommdFlag = 1;
        }
    });
    return isRecommdFlag;
}

// 获取推荐书籍，跟用户有关
function getRecommderBooks () {
    // 如果用户关闭了推荐功能
    if (!isRecommd()) {
        $(".mTitleHeader:eq(3)").hide();
        return;
    }
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getRecommderBooks";
    $.get(get_url, function (data, status) {
        data = JSON.parse(data);
        if (data["count"] == 0 || !data || data["books"] == null) {
            // 不存在推荐书籍时
            $(".mTitleHeader:eq(3) span").text("暂无推荐，每日凌晨两点准时更新");
            return;
        }
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
            var recordContent = $(this).find("div").get(0);
            $("input:first").val(recordContent.innerHTML);
            // 将该记录设置成“书名搜索”方式
            $("select:first option:eq(" + parseInt($(this).attr("way")) + ")").attr("selected", "selected");
            // 进行搜索
            getSearchBook();
        });
    });
}

// 页面加载时根据 url 参数搜索一次
getSearchBookByURL();
// 读取并填充搜索历史
getAllRecord();
// 获取推荐书籍
getRecommderBooks();