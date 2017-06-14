function userLogin () {
    var phone = document.getElementsByTagName("input")[0].value;
    var password = document.getElementsByTagName("input")[1].value;
    // 获取提示框 js_hud 和其文本信息框 tips_title
    var js_hud = document.getElementById("js_hud");
    var tips_title = document.getElementsByClassName("tips_title")[0];
    var tips = "";
    var flag = 1; // 1 代表判断通过

    if (!checkLoginPhone(phone)) flag = 0;
    if (!checkLoginPassword(password)) flag = 0;
    if (!askLogin(phone, password)) flag = 0;

    // 输入有错误
    if (!flag) {
        tips = "账号密码错误(请检查是否已从微信绑定手机号)";
        // 向提示块中填写相应提示并显示
        tips_title.innerHTML = tips;
        js_hud.style.display = "block";
        // 1.5 s 后隐藏提示块
        window.setTimeout(function () {
            js_hud.style.display = "none";
        }, 1500);
        return false;
    }

    // 验证成功，跳转页面
    tips_title.innerHTML = "登录成功，正在跳转...";
    js_hud.style.display = "block";
    // 1.5 s 后跳转页面(缺少一个存 cookie 过程)
    window.setTimeout(function () {
        location.href='books_navigation.html';
    }, 1500);
    return true;
}

function checkLoginPhone (phone) {
    if (phone === "") return false;
    if (phone.length !== 11) return false;
    if (phone.match(/[^\d]/g)) return false;
    return true;
}

function checkLoginPassword (password) {
    // 判断密码位数是否在 6~13 位
    if (password === "") return false;
    if (password.length < 6) return false;
    if (password.length > 13) return false;
    return true;
}

function askLogin (phone, password) {
    if (phone !== "18829533255") return false;
    if (password !== "123456") return false;
    return true;
}