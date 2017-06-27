function login () {
	var admin_name = $("input:eq(0)").val();
	var admin_password = $("input:eq(1)").val();
	var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Manager/login";
	var post_data = {
		"admin_name": admin_name,
		"admin_password": admin_password,
		"admin_pid": 1
	}
	console.log(post_data);
	$.post(post_url, post_data, function (data, status) {
		if (data["res"] == 1) {
			window.location.href = "admin_center.html";
		} else {
			$(".login-ic:eq(2) input").val("提示信息：您的账号密码有错");
			$(".login-ic:eq(2)").show();
		}
	})
}