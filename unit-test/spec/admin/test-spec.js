// require("../../src/admin/test.js");

describe('test', function () {
	it('admin_test_add(1, 2) 的返回值应该为 3', function () {
		var c = admin_test_add(1, 2);
		expect(c).toEqual(3);
	});
});