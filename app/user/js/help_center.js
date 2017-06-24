function getInfo () {
	var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/getInfo";
    $.get(get_url, function (data, status) {
        // 一次循环获取 JSON 里的第一个元素内容(不知道名字的情况下)
        for (var obj in data) {
            $(".mWechatRecordRightPhoto img").each(function () {
            	console.log($(this));
            	$(this).attr("src", data[obj]["headimgurl"]);
            });
        }
    });
}

getInfo();