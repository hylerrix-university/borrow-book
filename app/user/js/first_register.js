var userInfo;

function getInfo () {
    $.get("https://wwwxinle.cn/Book/public/index.php/index/User/getInfo", function (data, status) {
        // 一次循环获取 JSON 里的第一个元素内容(不知道名字的情况下)
        userInfo = data;
        for (var obj in data) {
            $(".mUserName").text(data[obj]["nickname"]);
            $("img:first").attr("src", data[obj]["headimgurl"]);
        }
    });
}

function verifyLogin () {
    var password = $("input:eq(0)").val();
    var rePassword = $("input:eq(1)").val();
    var IDCard = $("input:eq(2)").val();
    var phone = $("input:eq(3)").val();
    var authCode = $("input:eq(4)").val();
    var flag = 1; // 1 代表判断通过

    if (!checkAuthCode(authCode)) flag = 0, tips = "不符合正确的验证码格式(6 位数字)";
    if (!checkPhone(phone)) flag = 0, tips = "请输入正确的手机号(只支持 11 位数字)";
    if (!checkIDCard(IDCard)) flag = 0, tips = "不符合正确的身份证号格式";
    if (!compareTwoPassWord(password, rePassword)) flag = 0, tips = "密码与重复密码不一致";
    if (!checkRePassword(rePassword)) flag = 0, tips = "不符合正确的重复密码格式(6~13位)";
    if (!checkPassword(password)) flag = 0, tips = "不符合正确的密码格式(6~13位)";

    // 输入有错误
    if (!flag) {
        showTips(tips);
        return false;
    }

    // 发送数据
    doRegister(password, rePassword, IDCard, phone, authCode);

    // 验证成功，跳转页面
    showTips("验证成功，跳转页面");
    window.setTimeout(function () {
       window.location = 'books_navigation.html';
    }, 2000);
}

function doRegister (password, rePassword, IDCard, phone, authCode) {
    var data_post = {
        "password": password,
        "rePassword": rePassword,
        "IDCard": IDCard,
        "phone": phone,
        "authCode": authCode
    };

    $.post("https://wwwxinle.cn/Book/public/index.php/index/User/insert", data_post, function (data, status) {
        alert(JSON.stringfiy(data));
    });
}

function getAuthCode () {
    // 获取电话信息
    var phone = $("input:eq(3)").val();
    // 获取隐藏存放验证码的标签
    var mAuthCodeWrap = $(".mAuthCodeWrap:first");
    var authCode = "";

    // 验证手机格式
    if (!checkPhone(phone)) {
        showTips("请输入正确的手机号(只支持 11 位数字)");
        return;
    }

    // 一次循环获取 JSON 里的第一个元素内容(不知道名字的情况下)
    for (var obj in userInfo) {
        var data_post = {
            "nickname": userInfo[obj]["nickname"],
            "tel": phone
        };
        $.post("https://wwwxinle.cn/Book/public/index.php/index/User/sendCode", data_post, function (data, status) {
            data = JSON.parse(data);
            if(data["success"] === true) {
                showTips("验证成功，请查收并填写验证码");
            } else {
                showTips("您的请求过于频繁或手机号填写错误");
            };
        });
    };

    // 将从服务器上获得到的验证码隐藏到 HTML 中
    mAuthCodeWrap.innerHTML = authCode;
    return authCode;
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

function checkAuthCode (authCode) {
    if (authCode === "") return false;
    if (authCode.length !== 6) return false;
    if (authCode.match(/[^\d]/g)) return false;
    return true;
}

function helpCenter () {
    showTips("如有其它问题请联系管理员 icorvoh@qq.com");
}

function showTips (tips) {
    // 获取提示框 js_hud 和其文本信息框 tips_title
    $(".tips_title:first").text(tips);
    $("#js_hud").css("display", "block");
    // 1.5 s 后跳转页面(缺少一个存 cookie 过程)
    window.setTimeout(function () {
       $("#js_hud").css("display", "none");
    }, 2000);
}

// loadWechatUserInfo();