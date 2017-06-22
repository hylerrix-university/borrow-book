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
function getNewBooks () {
    var get_url = "";
    $.get(get_url, function (data, status) {
        data = JSON.parse(data);
        console.log(data);
    });
}

// getNewBooks();

getAllStacks();

