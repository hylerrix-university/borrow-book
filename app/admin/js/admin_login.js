function login () {
	var admin_name = $("input:eq(0)").val();
	var admin_password = $("input:eq(1)").val();
	var post_data = {
		"admin_name": admin_name,
		"admin_password": admin_password,
		"admin_pid": 1
	}
	var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/login";
	$.post(post_url, post_data, function (data, status) {
		if (data["res"] == 1) {
			window.location.href = "admin_center.html";
		} else {
			$(".mTitleHeader:eq(1)").text("账号或密码错误");
			$(".mTitleHeader:eq(1)").show();
		}
	});
	return;
}

function logout () {
	window.location.href = "admin_login.html";
}