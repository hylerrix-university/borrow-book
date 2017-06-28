function finishBook () {
    var isbn = $("input:eq(0)").val();
    var post_data = {
        "isbn": isbn
    };
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/infoBook";
    $.post(post_url, post_data, function (data, status) {
        console.log(data);
        $(".pContentDetailWrap:eq(0)").show();
        $(".pContentSubmitWrap:eq(0)").show();
    });
}

function saveBook () {
    var isbn = $("input:eq(0)").val();
    var post_data = {
        "isbn": isbn
    };
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/infoBook";
    $.post(post_url, post_data, function (data, status) {
        alert(data);
    });
}

function getAllStacks () {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getAllStacks";
    $.post(post_url, function (data, status) {
        data = JSON.parse(data);
        setStacks_0(data);
        setStacks_1(data);
        $(".pHiddenWrap").text(JSON.stringify(data));
    });
}

// 设置录入书籍选项卡下的单选框二级联动
function setStacks_0 (data) {
    for (var i = 0; i < data.length; i++) {
        // 一级单选框
        var templeteDiv = "<option value=\"" + data[i]["sId"] + "\">"  + data[i]["sName"] + "</option>";
        $(".pContentDetailItemWrap:eq(1) select").append(templeteDiv);
    }
    for (var j = 0; j < data[0]["categories"].length; j++) {
        $(".pContentDetailItemWrap:eq(2) select").append("\
            <option value=\"" + data[0]["categories"][j]["cId"] + "\">" + data[0]["categories"][j]["cName"] + "</option>\
        ");
    }
}

function changeCategories () {
    $(".pContentDetailItemWrap:eq(2) select").children().remove();
    var sId = $(".pContentDetailItemWrap:eq(1) option:selected").val();
    var data = JSON.parse($(".pHiddenWrap").text());
    for (var i = 0; i < data.length; i++) {
        if (sId == data[i]["sId"]) {
            // 找到了概述库下的类
            var categories = data[i]["categories"];
            for (var j = 0; j < categories.length; j++) {
                $(".pContentDetailItemWrap:eq(2) select").append("\
                    <option value=\"" + categories[j]["cId"] + "\">" + categories[j]["cName"] + "</option>\
                ");
            }
            break;
        }
    }
}

// 设置书库管理选项卡下的单选框二级联动
function setStacks_1 (data) {
    for (var i = 0; i < data.length; i++) {
        var templeteDiv = "\
        <div class=\"pContentStackItem\">\
            <button sId=" + data[i]["sId"] + " style=\"background-color: rgba(255, 51, 102, 1);\">\
                " + data[i]["sName"] + "\
            </button>\
            <button onclick=\"deleteStack(" + data[i]["sId"] + ")\">删除</button>\
        </div>"
        $(".pContentStackWrap").append(templeteDiv);
    }
    bindStackEvent(data);
}

function showStack (sId, data) {
    $(".pContentCategoriesItem").remove();
    for (var i = 0; i < data.length; i++) {
        if (sId == data[i]["sId"]) {
            // 找到了该书库
            var cateArr = data[i]["categories"];
            for (var i = 0; i < cateArr.length; i++) {
                // 增加每个类别
                var templeteDiv = "\
                    <div class=\"pContentCategoriesItem\">\
                        <button disabled=\"disabled\">" + cateArr[i]["cName"] + "</button>\
                        <button cId=" + cateArr[i]["cId"] + ">删除</button>\
                    </div>\
                "
                $(".pContentCategoriesHeader").after(templeteDiv);
            }
            bindCateEvent();
            break;
        }
    }
}

function bindStackEvent (data) {
    $(".pContentStackItem button").each(function () {
        $(this).click(function () {
            var sId = $(this).attr("sId");
            showStack(sId, data);
        });
    });
}

function bindCateEvent () {
    $(".pContentCategoriesItem").each(function (index) {
        $(".pContentCategoriesItem:eq(" + index + ") button:eq(1)").click(function () {
            var cId = $(this).attr("cId");
            console.log(cId);
        });
    });
}

function addStatck () {
    var stack = "";
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/addStack";
    var post_data = {
        "stack": stack
    }
    $.post(post_url, post_data, function (data, status) {
        console.log(data);
    });
}

function deleteStack () {
    var sId = "";
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/deleteStack";
    var post_data = {
        "sId": sId
    };
    $.post(post_url, post_data, function (data, status) {
        console.log(data);
    });
}

function addCategories () {
    var sId = "";
    var category = "";
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/addCategory";
    var post_data = {
        "sId": sId,
        "category": category
    };
    $.post(post_url, post_data, function (data, status) {
        console.log(data);
    });
}

function deleteCategories (cId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/deleteCategory";
    var post_data = {
        "cId": cId
    };
    $.post(post_url, post_data, function (data, status) {
        console.log(data);
    });
}

function registerManager () {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/register";
    var admin_name = $("#pTableNew input:eq(0)").val();
    var admin_password = $("#pTableNew input:eq(1)").val();
    var post_data = {
        "admin_name": admin_name,
        "admin_password": admin_password
    };
    $.post(post_url, post_data, function (data, status) {
        if(data["res"] == 0) {
            $(".mTableMessage:eq(0)").text("新增管理员 " + admin_name + " 失败，请检查您的邮箱格式");
        } else {
            $(".mTableMessage:eq(0)").text("新增管理员 " + admin_name + " 成功，正在重新加载");
            setTimeout(function () {
                window.location.href = "admin_center.html?tab=2";
            }, 2000);
        }
    });
}

function deleteManager (admin_name) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/cancel";
    var post_data = {
        "admin_name": admin_name
    };
    $.post(post_url, post_data, function (data, status) {
        $(".mTableMessage:eq(0)").text("删除管理员 " + admin_name + " 成功，正在重新加载");
        setTimeout(function () {
            window.location.href = "admin_center.html?tab=2";
        }, 2000);
    });
}

function selectAllManager () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/select";
    $.get(get_url, function (data, status) {
        for (var i = 0; i < data.length; i++) {
            var templeteDiv = "\
                <tr>\
                    <td>" + data[i]["admin_id"] + "</td>\
                    <td>" + data[i]["admin_name"] + "</td>\
                    <td>" + data[i]["admin_password"] + "</td>\
                    <td><button admin_name=\"" + data[i]["admin_name"] + "\">删除</button></td>\
                </tr>\
            ";
            $("#pTableList").append(templeteDiv);
        }
        bindManagerEvent();
    });
}

function bindManagerEvent () {
    $("#pTableList button").each(function () {
        $(this).click(function () {
            deleteManager($(this).attr("admin_name"));
        });
    })
}

// function 

getAllStacks();
selectAllManager();

function changeNaviContent (index) {
    if (index == 0) {
	    // 录入书籍
        $(".pNavigationItem:eq(0) button").css("background-color", "rgba(0, 0, 0, 0)");
        $(".pNavigationItem:eq(1) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pNavigationItem:eq(2) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pContentWrap_0").show();
        $(".pContentWrap_1").hide();
        $(".pContentWrap_2").hide();
    } else if (index == 1) {
        // 新建书库
        $(".pNavigationItem:eq(0) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pNavigationItem:eq(1) button").css("background-color", "rgba(0, 0, 0, 0)");
        $(".pNavigationItem:eq(2) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pContentWrap_0").hide();
        $(".pContentWrap_1").show();
        $(".pContentWrap_2").hide();
    } else if (index == 2) {
        // 管理员账号管理
        $(".pNavigationItem:eq(0) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pNavigationItem:eq(1) button").css("background-color", "rgba(0, 0, 0, .2)");
        $(".pNavigationItem:eq(2) button").css("background-color", "rgba(0, 0, 0, 0)");
        $(".pContentWrap_0").hide();
        $(".pContentWrap_1").hide();
        $(".pContentWrap_2").show();
    }
}

var urlArgs = window.location.search;
var tabIndex = urlArgs.split("=")[1];
if(!tabIndex) tabIndex = 0;
changeNaviContent(tabIndex);