function getAuthCode () {
    // 获取电话信息
    var phone = document.getElementsByTagName("input")[3].value;
    // 获取隐藏存放验证码的标签
    var mAuthCodeWrap = document.getElementsByClassName("mAuthCodeWrap")[0];
    // 获取提示框 js_hud 和其文本信息框 tips_title
    var js_hud = document.getElementById("js_hud");
    var tips_title = document.getElementsByClassName("tips_title")[0];
    var authCode = "123456";
    var tips = "";

    if (!checkPhone(phone)) {
        js_hud.style.display = "block";
        tips = "请输入正确的手机号(只支持 11 位数字)";
        window.setTimeout(function () {
            js_hud.style.display = "none";
        }, 1500);
        tips_title.innerHTML = tips;
    }

    // 将从服务器上获得到的验证码隐藏到 HTML 中
    mAuthCodeWrap.innerHTML = authCode;
    return authCode;
}

function verifyLogin () {
    var password = document.getElementsByTagName("input")[0].value;
    var rePassword = document.getElementsByTagName("input")[1].value;
    var IDCard = document.getElementsByTagName("input")[2].value;
    var phone = document.getElementsByTagName("input")[3].value;
    var userAuthCode = document.getElementsByTagName("input")[4].value;
    var tips_title = document.getElementsByClassName("tips_title")[0];
    var authCode = document.getElementsByClassName("mAuthCodeWrap")[0].innerHTML;
    var js_hud = document.getElementById("js_hud");
    var tips = "";
    var flag = 1; // 1 代表判断通过

    if (!checkPassword(password)) flag = 0, tips = "不符合正确的密码格式(6~13位)";
    if (!checkRePassword(rePassword)) flag = 0, tips = "不符合正确的重复密码格式(6~13位)";
    if (!compareTwoPassWord(password, rePassword)) flag = 0, tips = "密码与重复密码不一致";
    if (!checkIDCard(IDCard)) flag = 0, tips = "不符合正确的身份证号格式";
    if (!checkPhone(phone)) flag = 0, tips = "请输入正确的手机号(只支持 11 位数字)";
    if (!checkAuthCodeInput(userAuthCode)) flag = 0, tips = "不符合正确的验证码格式(6 位数字)";
    if (!checkAuthCodeValidity(authCode, userAuthCode)) flag = 0, tips = "验证码不匹配";

    // 输入有错误
    if (!flag) {
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
}

function checkPassword (password) {
    // 判断密码位数是否在 6~13 位
    if (password === "") return false;
    if (password.length < 6) return false;
    if (password.length > 13) return false;
    return true;
}

function checkRePassword (rePassword) {
    if (rePassword === "") return false;
    if (rePassword.length < 6) return false;
    if (rePassword.length > 13) return false;
    return true;
}

function compareTwoPassWord (password, rePassword) {
    if (password !== rePassword) return false;
    return true;
}

function checkIDCard (IDCard) {
    if (IDCard === "") return false;
    if (IDCard.length !== 18) return false;
    if (IDCard.match(/\d{17}[\dX]/g) === null) return false;
    // 校验身份证的最后一位校验码
    IDCard = IDCard.split("");
    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    //校验位
    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    var sum = 0;
    var ai = 0;
    var wi = 0;
    for (var i = 0; i < 17; i++) {
        ai = IDCard[i];
        wi = factor[i];
        sum += ai * wi;
    }
    var last = parity[sum % 11];
    if (parity[sum % 11] != IDCard[17]) {
        return false;
    }
    return true;
}

function checkPhone (phone) {
    if (phone === "") return false;
    if (phone.length !== 11) return false;
    if (phone.match(/[^\d]/g)) return false;
    return true;
}

function checkAuthCodeInput (userAuthCode) {
    if (userAuthCode === "") return false;
    if (userAuthCode.length !== 6) return false;
    if (userAuthCode.match(/[^\d]/g)) return false;
    return true;
}

function checkAuthCodeValidity (authCode, userAuthCode) {
    if (authCode !== userAuthCode) return false;
    return true;
}