function getCategories () {
    $.get("https://wwwxinle.cn/Book/public/index.php/index/Book/getCategories", function (data, status) {
    	console.log(data);
    });
}

getCategories();