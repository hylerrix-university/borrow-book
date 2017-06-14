describe("用户 PC 端登录界面前端单元测试", function () {
	describe("验证手机号格式", function () {
        it("手机号不能为空", function () {
            var phone = "";
            var output = checkLoginPhone(phone);
            var result = false;
            expect(output).toEqual(result);
        });

        it("手机号不能为非数字", function () {
            var phone = "";
            var output = checkLoginPhone(phone);
            var result = false;
            expect(output).toEqual(result);
        });

        it("手机号位数不能不是 11", function () {
            var phone = "123456789";
            var output = checkLoginPhone(phone);
            var result = false;
            expect(output).toEqual(result);
        });

        it("手机号验证成功", function () {
            var phone = "18829533255";
            var output = checkLoginPhone(phone);
            var result = true;
            expect(output).toEqual(result);
        });
	});

	describe("验证密码格式", function () {
        it("密码不能为空", function () {
            var password = "";
            var output = checkLoginPassword(password);
            var result = false;
            expect(output).toEqual(result);
        });

        it("密码位数不能小于 6 位", function () {
            var password = "12345";
            var output = checkLoginPassword(password);
            var result = false;
            expect(output).toEqual(result);
        });

        it("密码位数不能大于 13 位", function () {
            var password = "12345678901234";
            var output = checkLoginPassword(password);
            var result = false;
            expect(output).toEqual(result);
        });

        it("密码验证成功", function () {
            var password = "1234567890";
            var output = checkLoginPassword(password);
            var result = true;
            expect(output).toEqual(result);
        });
    });

    describe("向后台请求登录", function () {
    	it("账号密码错误", function () {
            var phone = "666";
            var password = "233";
            var output = askLogin(phone, password);
            var result = false;
            expect(output).toEqual(result);
    	});

    	it("登录请求成功", function () {
            var phone = "18829533255";
            var password = "123456";
            var output = askLogin(phone, password);
            var result = true;
            expect(output).toEqual(result);
    	});
    })
});