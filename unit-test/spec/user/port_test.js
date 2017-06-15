describe("测试 ajax 接口请求代码", function () {
	describe("补全图书信息单元测试", function () {
        it("补全图书信息成功", function () {
        	var isbn = "9787121227615";
            var output = getBookInfoByISBN(isbn);
            var result = false;
            expect(output).toEqual();
        });

        it("补全图书信息失败", function () {
        	var isbn = "";
            var output = finishBook();
            var result = false;
            expect(output).toEqual();
        });
	});


});