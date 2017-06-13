function verifyLogin () {
    var password = document.getElementsByTagName("input")[0].value;
    var rePassword = document.getElementsByTagName("input")[1].value;
    var IDCard = document.getElementsByTagName("input")[2].value;
    var phone = document.getElementsByTagName("input")[3].value;
    var password = document.getElementsByTagName("input")[4].value;
    var userAuthCode = document.getElementsByTagName("input")[5].value;
    var authCode = getAuthCode();

    if (!checkPassword(password)) return false;
    if (!checkRePassword(password, rePassword)) return false;
    if (!compareTwoPassWord(password, rePassword)) return false;
    if (!checkIDCard(IDCard)) return false;
    if (!checkPhone(phone)) return false;
    if (!checkAuthCodeInput(userAuthCode)) return false;
    if (!checkAuthCodeValidity(authCode, userAuthCode)) return false;

    return true;
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
    for (var i = 0; i < 17; i++)
    {
        ai = IDCard[i];
        wi = factor[i];
        sum += ai * wi;
    }
    var last = parity[sum % 11];
    if(parity[sum % 11] != IDCard[17]){
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

function getAuthCode (phone) {
    var authCode = "123456";

    return authCode;
}

function checkAuthCodeValidity (authCode, userAuthCode) {
    if (authCode !== userAuthCode) return false;
    return true;
}