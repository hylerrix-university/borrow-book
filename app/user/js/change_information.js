// 是否能再次修改身份证，并据此修改相应
function canBorrow () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/canBorrow";
    $.get(get_url, function (data, status) {
        if (!data["res"]) {
            // 不能再次修改身份证
            // 给隐藏的身份证框随便设置一个身份证号
            $("input:eq(3)").val("111111111111111111");
            $(".mTitleHeader:last").after(
                "<div class=\"mTitleHeader\">您的身份证已成功验证<span>无法再次修改</span></div>"
            );
        } else {
            // 如果可以再次修改身份证
            $(".mRegisterItemWrap:eq(3)").show();
        }
    });
}

canBorrow();

function updateInfo () {
    var password = $("input:eq(0)").val();
    var newPassword = $("input:eq(1)").val();
    var rePassword = $("input:eq(2)").val();
    var identity = $("input:eq(3)").val();
    var flag = 1; // 1 代表判断通过

    if (!checkIDCard(identity)) flag = 0, tips = "不符合正确的身份证号格式";
    if (!compareTwoPassWord(newPassword, rePassword)) flag = 0, tips = "密码与重复密码不一致";
    if (!checkPassword(rePassword)) flag = 0, tips = "不符合正确的重复密码格式(6~13位)";
    if (!checkPassword(newPassword)) flag = 0, tips = "不符合正确的新密码格式(6~13位)";
    if (!checkPassword(password)) flag = 0, tips = "不符合正确的旧密码格式(6~13位)";

    if (!flag) {
        showTips(tips);
        return;
    }

    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/update";

    var post_data = {
        "password": password,
        "newPassword": newPassword,
        "identity": identity,
    }
    console.log(post_data);

    $.post(post_url, post_data, function (data, status) {
        console.log(data);
        if (data["res"] == -1) {
            tips = "密码错误，请重新填写";
            showTips(tips);
            return;
        }
        // 更新成功
        showTips("更新成功！");
        window.setTimeout(function () {
           window.location.href = "user_information.html";
        }, 2000);
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
        var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/sendCode";
        $.post(post_url, data_post, function (data, status) {
            data = JSON.parse(data);
            if(data["success"] === true) {
                showTips("请注意查收并填写验证码");
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

function showTips (tips) {
    // 获取提示框 js_hud 和其文本信息框 tips_title
    $(".tips_title:first").text(tips);
    $("#js_hud").css("display", "block");
    // 1.5 s 后跳转页面(缺少一个存 cookie 过程)
    window.setTimeout(function () {
       $("#js_hud").css("display", "none");
    }, 2000);
}