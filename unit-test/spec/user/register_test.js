describe("注册界面前端单元测试", function () {
    describe("验证新密码", function () {
        it("密码不能为空", function () {
            var password = "";
            var output = checkPassword(password);
            var result = false;
            expect(output).toEqual(result);
        });

        it("密码位数不能小于 6 位", function () {
            var password = "12345";
            var output = checkPassword(password);
            var result = false;
            expect(output).toEqual(result);
        });

        it("密码位数不能大于 13 位", function () {
            var password = "12345678901234";
            var output = checkPassword(password);
            var result = false;
            expect(output).toEqual(result);
        });

        it("密码验证成功", function () {
            var password = "1234567890";
            var output = checkPassword(password);
            var result = true;
            expect(output).toEqual(result);
        });
    });

    describe("验证重复密码", function () {
        it("重复密码不能为空", function () {
            var rePassword = "";
            var output = checkRePassword(rePassword);
            var result = false;
            expect(output).toEqual(result);
        });

        it("重复密码位数不应该小于 6 位", function () {
            var rePassword = "12345";
            var output = checkRePassword(rePassword);
            var result = false;
            expect(output).toEqual(result);
        });

        it("重复密码位数不应该大于 13 位", function () {
            var rePassword = "12345678901234";
            var output = checkRePassword(rePassword);
            var result = false;
            expect(output).toEqual(result);
        });
    });

    describe("验证密码和重复密码是否一致", function () {
        it("重复密码和密码不一致", function () {
            var password = "123456";
            var rePassword = "1234567";
            var output = compareTwoPassWord(password, rePassword);
            var result = false;
            expect(output).toEqual(result);
        });

        it("重复密码和密码一致", function () {
            var password = "123456";
            var rePassword = "123456";
            var output = compareTwoPassWord(password, rePassword);
            var result = true;
            expect(output).toEqual(result);
        });
    })

    describe("验证身份证号", function () {
        it("身份证号不能为空", function () {
            var IDCard = "";
            var output = checkIDCard(IDCard);
            var result = false;
            expect(output).toEqual(result);
        });

        it("身份证号位数不能不是 18", function () {
            var IDCard = "12345678901234567890";
            var output = checkIDCard(IDCard);
            var result = false;
            expect(output).toEqual(result);
        });

        it("身份证号不能为非数字(除最后一位X)", function () {
            var IDCard = "a12345678901234567";
            var output = checkIDCard(IDCard);
            var result = false;
            expect(output).toEqual(result);
        });

        it("身份证校验不合格", function () {
            var IDCard = "123456789012345678";
            var output = checkIDCard(IDCard);
            var result = false;
            expect(output).toEqual(result);
        });

        it("身份证号输入正确", function () {
            var IDCard = "610528199710090011";
            var output = checkIDCard(IDCard);
            var result = true;
            expect(output).toEqual(result);
        });
    });

    describe("验证手机", function () {
        it("手机号不能为空", function () {
            var phone = "";
            var output = checkPhone(phone);
            var result = false;
            expect(output).toEqual(result);
        });

        it("手机号不能为非数字", function () {
            var phone = "";
            var output = checkPhone(phone);
            var result = false;
            expect(output).toEqual(result);
        });

        it("手机号位数不能不是 11", function () {
            var phone = "123456789";
            var output = checkPhone(phone);
            var result = false;
            expect(output).toEqual(result);
        });

        it("手机号验证成功", function () {
            var phone = "18829533255";
            var output = checkPhone(phone);
            var result = true;
            expect(output).toEqual(result);
        });
    });

    describe("验证用户输入的手机验证码", function () {
    	it("验证码不能为空", function () {
            var userAuthCode = "";
            var output = checkAuthCodeInput(userAuthCode);
            var result = false;
            expect(output).toEqual(result);
        });

        it("验证码位数必须为 6", function () {
            var userAuthCode = "1234567890";
            var output = checkAuthCodeInput(userAuthCode);
            var result = false;
            expect(output).toEqual(result);
        });

        it("验证码不能为非数字", function () {
            var userAuthCode = "a12345";
            var output = checkAuthCodeInput(userAuthCode);
            var result = false;
            expect(output).toEqual(result);
        });

        it("验证码验证成功", function () {
            var userAuthCode = "123456";
            var output = checkAuthCodeInput(userAuthCode);
            var result = true;
            expect(output).toEqual(result);
        });
    });

    xdescribe("获取手机验证码", function () {
        it("验证码获取失败", function () {
        	// 失败会返回空字符串
            var phone = "12345678901";
            var output = getAuthCode(phone);
            var authCode = "";
            expect(output).toEqual(result);
        });

        it("验证码获取成功", function () {
        	// 成功后会返回 6 位纯数字
            var phone = "18829533255";
            var output = getAuthCode(phone);
            var authCodeNum = parseInt(output).toString().length;
            expect(authCodeNum).toEqual(6);
        });
    });

    // describe("验证用户输入的验证码和服务器验证码是否一致", function () {
    // 	it("两个验证码不一致", function () {
    //         var authCode = "654321";
    //         var userAuthCode = "123456";
    //         var output = checkAuthCodeValidity(authCode, userAuthCode);
    //         var result = false;
    //         expect(output).toEqual(result);
    //     });

    //     it("两个验证码一致", function () {
    //         var authCode = "123456";
    //         var userAuthCode = "123456";
    //         var output = checkAuthCodeValidity(authCode, userAuthCode);
    //         var result = true;
    //         expect(output).toEqual(result);
    //     });
    // });
});