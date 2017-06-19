function searchBook () {
	var data = {
		rows: 10,
		keyword: "大型网站系统与Java中间件开发实践",
		way: 0
	};
	$.post("https://wwwxinle.cn/Book/public/index.php/index/Book/searchBook", data, function (data, status) {
        alert(data);
	});
}

searchBook();