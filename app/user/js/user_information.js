function getUserInfo () {
	// 获取头像和姓名
	var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/getInfo";
    $.get(get_url, function (data, status) {
        // 一次循环获取 JSON 里的第一个元素内容(不知道名字的情况下)
        for (var obj in data) {
            $(".mUserInfoItemRightContent:first img").attr("src", data[obj]["headimgurl"]);
            $(".mUserInfoItemRightContent:eq(1)").text(data[obj]["nickname"]);
        }
    });
    // 获取借阅、收藏、预订信息
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/getUserInfo";
    $.get(get_url, function (data, status) {
        $(".mUserInfoItemRightContent:eq(2)").text(data["borrowNum"] + "次");
        $(".mUserInfoItemRightContent:eq(3)").text(data["collectNum"] + "本");
        $(".mUserInfoItemRightContent:eq(4)").text(data["scheduleNum"] + "本");
    });
}

function getRecommendSwitch () {
	var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/getRecommendSwitch";
	$.get(get_url, function (data, status) {
		if (data[0]["recommend"] == 0) {
			// 现在是关闭推荐的状态
            $(".mUserInfoItemRightContent:eq(5)").text("已关闭(点击开启)");
            $("button:first").unbind();
            $("button:first").click(function () {
                updateRecommendSwitch(1);
            });
		} else {
			// 现在是开启推荐的状态
			$(".mUserInfoItemRightContent:eq(5)").text("已开启(点击关闭)");
			$("button:first").unbind();
            $("button:first").click(function () {
                updateRecommendSwitch(0);
            });
		}
	});
}

function updateRecommendSwitch (status) {
	var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/updateRecommendSwitch";
	var data = {
		"request": status
	};
	$(".mUserInfoItemRightContent:eq(5)").text("正在更新中");
	$.post(post_url, data, function (data, status) {
		// 更新成功，重新绑定点击事件
		getRecommendSwitch();
	});
}

getUserInfo();
getRecommendSwitch();