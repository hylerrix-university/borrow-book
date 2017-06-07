require.config({
	// baseUrl: "js/"
    paths: {
        // "fill_nav_img": "fill_nav_img"
    }
});

require(['load_nav_bar'], function (moduleA){
    // some code here
    moduleA.load_nav_content();
    moduleA.fill_nav_img();
});