function getAllStacks () {
    $.get("https://wwwxinle.cn/Book/public/index.php/index/Book/getAllStacks", function(data, status){
        // 将获取到的数据 json 化
        data = JSON.parse(data);
        // 隐藏“正在加载”的提示
        $("#loading").css("display", "none");
        // 将获取到的数据动态循环填充
        for (var i = 0; i < data.length; i++) {
            // i 来跟踪每个书库的信息
            var stackItem = data[i].categories;
            var cateNum = data[i].categories.length;
            // 获取书库名
            var cateName = data[i].sName;
            var templateDiv = "\
                <div class=\"mStackWrap\">\
                    <div class=\"mStackSideBar\">" + cateName + "</div>\
                    <div class=\"mStackCategoriesWrap\">";
            for (var j =0; j < cateNum; j++) {
                // j 来跟踪每个具体类别的信息
                templateDiv += "\
                        <a class=\"mStackCategoriesLink\" cId=\"" + stackItem[j].cId + "\">\
                            <div class=\"mStackCategorie\">"
                                + stackItem[j].cName + "\
                            </div>\
                        </a>";
            }
            templateDiv += "\
                   </div>\
                </div>";

            $(".mAllStackWrap").append(templateDiv);
        }
        // 给每个类别绑定相应的点击事件
        bindStackEvent();
    });
}

function bindStackEvent() {
    $("a.mStackCategoriesLink").each(function () {
        $(this).click(function () {
            var cId = $(this).attr("cId");
            window.location.href = "categories_detail.html?cId=" + cId;
        });
    });
}

// 获得新书推荐信息并填充相应数据
function getNewBookRecommend () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getNewBookRecommend";
    $.get(get_url, function (data, status) {
        data = JSON.parse(data);
        var booksArr = data["books"];
        for (var i = 0; i < booksArr.length; i++) {
            $(".imgBox img:eq(" + i + ")").attr("bId", booksArr[i]["bId"]);
            $(".imgBox img:eq(" + i + ")").attr("src", booksArr[i]["imgurl"]);
            if (booksArr[i]["bName"].length >= 15) {
                $(".mCarouselBookName:eq(" + i + ")").text(booksArr[i]["bName"].substring(0, 15) + "...");
            } else {
                $(".mCarouselBookName:eq(" + i + ")").text(booksArr[i]["bName"]);
            }
        }
        // 绑定轮播图内容点击事件
        bindCarouselEvent();
    });
}

// 自动轮播新书
function turnCarousel (nextIndex) {
    // 将下一个轮播内容展现出来
    $(".imgBox:eq(" + nextIndex%3 + ")").show();
    // 隐藏其它的轮播图内容
    if (nextIndex%3 === 1) {
        // 下一个是第二个
        $(".imgBox:eq(" + 0 + ")").hide();
        $(".imgBox:eq(" + 2 + ")").hide();
    } else if (nextIndex%3 === 2) {
        // 下一个是第三个
        $(".imgBox:eq(" + 0 + ")").hide();
        $(".imgBox:eq(" + 1 + ")").hide();
    } else if (nextIndex%3 === 0) {
        // 下一个是第一个
        $(".imgBox:eq(" + 1 + ")").hide();
        $(".imgBox:eq(" + 2 + ")").hide();
    }
}

// 绑定轮播图内容点击事件
function bindCarouselEvent () {
    $(".imgBox img").each(function () {
        $(this).click(function () {
            var bId = $(this).attr("bId");
            window.location.href = "book_detail.html?bId=" + bId;
        });
    });
}

var carouseIndex = 0;
setInterval(function () {
    turnCarousel(carouseIndex);
    carouseIndex++;
}, 2500);
getNewBookRecommend();
getAllStacks();

