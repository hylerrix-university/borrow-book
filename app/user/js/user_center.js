function getUserInfo () {
	// 获取头像和姓名
	var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/getInfo";
    $.get(get_url, function (data, status) {
        // 一次循环获取 JSON 里的第一个元素内容(不知道名字的情况下)
        for (var obj in data) {
            $(".mUserPhoto:first img").attr("src", data[obj]["headimgurl"]);
            $(".mUserName:first").text(data[obj]["nickname"]);
        }
    });
}

getUserInfo();