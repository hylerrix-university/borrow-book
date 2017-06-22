function getRecommendSwitch () {
	var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/getRecommendSwitch";
	$.get(get_url, function (data, status) {
		console.log(data);
	});
}

function updateRecommendSwitch () {
	var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/updateRecommendSwitch";
	$.post(post_url, function (data, status) {
        console.log(data);
	});
}

getRecommendSwitch();