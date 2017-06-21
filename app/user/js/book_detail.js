function getBookDetail (bId) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/getBookDetail";
    var data = {
        "bId": bId
    };
    $.post(post_url, data, function (data, status) {
        data = JSON.parse(data);
        // 书籍详情
        var bookDetail = data["book"]["books"][0];
        $(".mBookDetailPhoto img").attr("src", bookDetail["imgurl"]);
        $(".mBookDetailCharacterTitleItem").text(bookDetail["bName"]);
        $(".mBookDetailCharacterItem:eq(0) span").text(bookDetail["author"]);
        $(".mBookDetailCharacterItem:eq(1) span").text(bookDetail["publisher"]);
        $(".mBookDetailCharacterItem:eq(2) span").text(bookDetail["isbn"]);
        $(".mBookDetailCharacterItem:eq(3) span").text(bookDetail["count"]); // 藏书量
        $(".mBookDetailCharacterItem:eq(4) span").text(bookDetail["canBorCount"]); // 当前可借
        $(".mBookDetailBelongTo").text("所属类别：" + bookDetail["sName"] + " > " + bookDetail["cName"]);
        var catalog = bookDetail["catalog"];
        var catalogArr = catalog.split("\n");
        for (var i = 0; i < catalogArr.length; i++) {
            var catalogDiv = "<div class=\"mBookDetailCatalog\">" + catalogArr[i] + "</div>";
            $(".mBookDetailHeaderTitle:eq(1)").before(catalogDiv);
        }
        $(".mBookDetailIntro").text(bookDetail["summary"]);
        // 推荐书籍
        var relatedBooks = data["relatedBooks"]["books"];
        $(".mTitleHeader:eq(0) span").text("已加载 " + relatedBooks.length + " 本书籍");
        for (var i = 0; i < relatedBooks.length; i++) {
            var relatedBookDiv = "\
                <div class=\"mBookRelativeItemWrap\">\
                    <a href=\"book_detail.html\">\
                        <div class=\"mBookMiniPhoto\">\
                            <img src=\"" + relatedBooks[i]["imgurl"] + "\">\
                        </div>\
                        <div class=\"mBookMiniBookName\">" + relatedBooks[i]["bName"] + "</div>\
                        <div class=\"mBookMiniBookAuthor\">" + relatedBooks[i]["author"] + "</div>\
                    </a>\
                </div>\
            ";
            $(".mBookRelativeWrap").append(relatedBookDiv);
        }
    });
}

var bId = "AVxoaoAWoMlguXEb9gRB";
getBookDetail(bId);