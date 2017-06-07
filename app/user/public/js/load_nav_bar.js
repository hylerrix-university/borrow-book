define(function () {
    function load_nav_content () {
    	var mNavWrap = document.getElementsByClassName("mNavWrap")[0];
    	mNavWrap.innerHTML = "\
	    	<a href=\"javascript:;\">\
				<div class=\"mNavInnerWrap\">\
					<img class=\"mNavInnerLogo\" src=\"#\">\
					<div class=\"mNavInnerTitle mNavInnerTitleAvtive\">图书导航</div>\
				</div>\
			</a>\
	        \
			<a href=\"search_books.html\">\
				<div class=\"mNavInnerWrap\">\
					<img class=\"mNavInnerLogo\" src=\"#\">\
					<div class=\"mNavInnerTitle\">书库搜书</div>\
				</div>\
			</a>\
	        \
			<a href=\"borrow_cart.html\">\
				<div class=\"mNavInnerWrap\">\
					<img class=\"mNavInnerLogo\" src=\"#\">\
					<div class=\"mNavInnerTitle\">借阅书车</div>\
				</div>\
			</a>\
	        \
			<a href=\"personal_center.html\">\
				<div class=\"mNavInnerWrap\">\
					<img class=\"mNavInnerLogo\" src=\"#\">\
					<div class=\"mNavInnerTitle\">个人中心</div>\
				</div>\
			</a>\
	        \
	        <div class=\"clear\"></div>\
        ";
    };

    function fill_nav_img () {
		var mNavInnerLogo = document.getElementsByClassName("mNavInnerLogo");
		var imgSrc = [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuBAMAAACllzYEAAAAFVBMVEUAAAAziP8ziP8ziP8ziP8ziP8ziP/lH9NBAAAABnRSTlMA5xlJtuSz8J1bAAAAYElEQVQ4y2OgLmAWS4MAYVRxxjQoSEQVZ0uDAXRxKE11ccM0bECYQQyFj3BuGnYwaMVTFICeZHLDEE8C+14NLk4QgHSSLw63NwES/vjdg+n+QROeQ1UcR3rGkf6DGagEAFDDDo4sv1r4AAAAAElFTkSuQmCC",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuBAMAAACllzYEAAAAHlBMVEUAAACYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJigirPYAAAACXRSTlMA8+eFY+RJ8GQsXby7AAAAa0lEQVQ4y2OAAkcHOEYBmgFwjAJmToBhguJJM4EALg4CahCjMcQnQYzAEJ8JNRrNfE5C4ijuRxVvd0BghDgyoIm44UwYEEYRl4SLT8ShfjIu8weF+Ki/hpa/sIpjAmg+RQeToPkaHYQxMAAA3q3FVFclU74AAAAASUVORK5CYII=",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuBAMAAACllzYEAAAAD1BMVEUAAACYmJiYmJiYmJiYmJgZgX/CAAAABHRSTlMA5klKqU6WSgAAAGpJREFUOMtjoC5gEnGBACFUcUYXKHBEFWdxgQF0cShNdXFFF2xAiEEEhY9wrgt2wODigMX7LAMvDo4BRwUUcUQMCMDEcfsLOUYoEXdAjmEHAu5BiDOD3W8waMJz0ItjBzjTsyFWcWEGKgEAS6NcEQjPCBsAAAAASUVORK5CYII=",
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAb1BMVEUAAACYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJjZIJHxAAAAJHRSTlMA+QYIE+W3jsnt3WxaT9guHRjFVBDOh5p5ZUpyIPPBqYEnJqswvp1IAAACEklEQVRIx51Wi3KjMAy0HQdIwyOUdx60Sf3/33hr7o61AuGu1UyGsSXLK2ktRT1LncVRftD6kEdxVqtNMWmkXSA6Ss1L491l7xayv+zWrc9vkz5pq8IaY4uqTaaNt/Oa627y1Z/CzVM/3dctLii9p8NxgdQcD1A0pdy9eiBfdg2j/fKAruJSWOujeiFHDftTgLuBdaZeyvkGPMTfbVpDMo1458MARyTreGBy/gMFwD9E3P241/uxD8P7APzfcC7IoA0CifVfCsTEa5HPy5TZvYBiG0dp6GZADf3pFF/DsvhyvaelKtN3z4hZ472m+EbO9XQeTwVgvuNZ0zsXgd/YO7FeWA0hAH2dVVjUKsONdP4JJIoCPJ/zAjAzf3sr9KmipOHpFtA89Ip6xFOGPEWO50XlwefOFdQDuqCvC9aFc7kCe+z/ebd+gfPmH9h5lab5RmZoTjAbeScYhrpRVYbKRErOGHImTCTLtMFIlokk2OA7STBTjHJvc+2N8/bul4JiksCQLHGUJFOCwM/P4zE6KeP96XnsgsdX3aYuPRS1qothat63Knh88mkP3rgrSZnOHxj4tEXjqKDMCxF2kcNBxcYRtKUHkCRWSbEJ8DzYltj0Rvi2ywYM/+Pc9NhSW/yIhFJoKHxLlQ3bCT5J1rFhB+PA3VfHQcRxwJw128Pm56NsOShrY2oxKL8zhn8+5L/5F+IXCKpQ7CGTrWQAAAAASUVORK5CYII="
		];
		for (var i = 0; i < mNavInnerLogo.length; i++) {
			mNavInnerLogo[i].src = imgSrc[i];
		}
	}

    return {
        load_nav_content: load_nav_content,
        fill_nav_img: fill_nav_img
    };
});