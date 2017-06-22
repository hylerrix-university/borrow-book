function selectCollect () {
	var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/selectCollect";
	$.get(get_url, function (data, status) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
        	var templeteDiv = "\
        	    <a href=\"book_detail.html\">\
                    <div class=\"mBookIntroItemWrap\">\
                        <div class=\"mBookIntroItemPhoto\">\
                            <img src=\"images/icorvoh.jpg\">\
                        </div>\
                        <div class=\"mBookIntroCharacterWrap\">\
                            <div class=\"mBookIntroItemBookName\">这是一本书的书名" + data[i]["b_id"] + "</div>\
                            <div class=\"mBookIntroItemBookAuthor\">作者：韩亦乐</div>\
                            <div class=\"mBookIntroItemBookCount\">藏书：6666</div>\
                        </div>\
                    </div>\
                </a>\
                <div class=\"mDeleteButton\">\
                    <button>取消收藏</button>\
                </div>\
        	";
        	$(".mBookIntroWrap").append(templeteDiv);
        }
	});
}

selectCollect();