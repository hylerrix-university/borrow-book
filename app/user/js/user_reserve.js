function getAllReserve () {
    var get_url = "https://wwwxinle.cn/Book/public/index.php/index/User/selectScheduleBook";
    $.get(get_url, function (data, status) {
        $(".mTitleHeader:first").text("您总共预订书籍 " + data.length + " 条");
        for (var i = 0; i < data.length; i++) {
            var templeteDiv = "\
                <a href=\"book_detail.html\">\
                    <div class=\"mBookIntroItemWrap\">\
                        <div class=\"mBookIntroItemPhoto\">\
                            <img src=\"images/icorvoh.jpg\">\
                        </div>\
                        <div class=\"mBookIntroCharacterWrap\">\
                            <div class=\"mBookIntroItemBookName\">这是一本书的书名</div>\
                            <div class=\"mBookIntroItemBookAuthor\">作者：韩亦乐</div>\
                            <div class=\"mBookIntroItemBookCount\">藏书：6666</div>\
                        </div>\
                    </div>\
                </a>\
                <div class=\"mDeleteButton\">\
                    <button>取消预订</button>\
                </div>\
            ";
            $(".mBookIntroWrap").append(templeteDiv);
        }
    });
}

getAllReserve();