function jsSDK (afterScan) {
    var jsapi_ticket_url = "https://wwwxinle.cn/Book/public/index.php/index/Index/ticket";
    var jsapi_ticket;

    $.get(jsapi_ticket_url, function (data, status) {
        data = JSON.parse(data);
        jsapi_ticket = data["ticket"];

        // 授权访问的当前页面的网页
        var url = location.href.split('#')[0];
        var createNonceStr = function () {
            return Math.random().toString(36).substr(2, 15);
        };

        var createTimestamp = function () {
            return parseInt(new Date().getTime() / 1000) + '';
        };

        var raw = function (args) {
            var keys = Object.keys(args);
            keys = keys.sort()
            var newArgs = {};
            keys.forEach(function (key) {
                newArgs[key.toLowerCase()] = args[key];
            });

            var string = '';
            for (var k in newArgs) {
                string += '&' + k + '=' + newArgs[k];
            }
            string = string.substr(1);
            return string;
        };

        /**
        * @synopsis 签名算法 
        *
        * @param jsapi_ticket 用于签名的 jsapi_ticket
        * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
        *
        * @returns
        */
        var sign = function (jsapi_ticket, url) {
            var ret = {
                jsapi_ticket: jsapi_ticket,
                nonceStr: createNonceStr(),
                timestamp: createTimestamp(),
                url: url
            };

            var string = raw(ret);
            console.log("string: " + string);
                // shaObj = new jsSHA(string, 'TEXT');
            ret.signature = sha1(string);

            return ret;
        };

        jsapi_ticket = sign(jsapi_ticket, url);

        // 用来调试数据
        console.log("url: " + url);
        console.log("jsapi_ticket: " + jsapi_ticket.jsapi_ticket);
        console.log("jsapi_ticket.timestamp: " + jsapi_ticket.timestamp);
        console.log("jsapi_ticket.nonceStr: " + jsapi_ticket.nonceStr);
        console.log("jsapi_ticket.signature: " + jsapi_ticket.signature);

        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端 alert 出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx1a474de918181499', // 必填，公众号的唯一标识
            timestamp: jsapi_ticket.timestamp, // 必填，生成签名的时间戳
            nonceStr: jsapi_ticket.nonceStr, // 必填，生成签名的随机串
            signature: jsapi_ticket.signature,// 必填，签名，见附录 1
            jsApiList: ["checkJsApi", "scanQRCode"] // 必填，需要使用的 JS 接口列表，所有 JS 接口列表见附录2
        });

        // 通过ready接口处理成功验证
        wx.ready(function() {
            // config信息验证后会执行 ready 方法，所有接口调用都必须在 config 接口获得结果之后，config 是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在 ready 函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在 ready 函数中。
            console.log("wx.ready");
        });

        // 通过error接口处理失败验证
        wx.error(function(res) {
            // config信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的 debug 模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名。
            console.log("wx.error");
        });

        // 调起微信扫一扫接口
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                afterScan(res);
            }
        });
    });
}

function scanBook (res) {
    var result = res.resultStr;
    var keyword = result.substring(7); // isbn
    var searchWay = 4;
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/Book/searchBook";
    var data = {
        "rows": 10,
        "keyword": keyword,
        "way": searchWay
    };
    $.post(post_url, data, function (data, status) {
        data = JSON.parse(data);
        var bId = data["books"][0]["bId"];
        window.location.href = "book_detail.html?bId=" + bId;
    });
}

function addShopping (res) {
    // 0100200000001
    var coding = res.resultStr;
    // 如果 coding 不存在
    if (coding.length != 13) {
        alert("请扫描正确的书籍内部条形码(Coding)");
        return;
    }
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/addShopping";
    var data = {
        "coding": coding
    };
    $.post(post_url, data, function (data, status) {
        data = JSON.parse(data);
        if (data["succeed"] == false) {
            alert(data["msg"]);
        }
        // 扫入书车成功，重新加载页面
        window.location.href = "borrow_cart.html";
    });
}

// 移出书车
function cancelShoppingByCoding (coding) {
    var post_url = "https://wwwxinle.cn/Book/public/index.php/index/User/cancelShopping";
    var data = {
        "coding": coding
    };
    $.post(post_url, data, function (data, status) {
        // 移出书车成功，改变相应状态
        $(".mButtonWrap button:eq(7)").hide();
        $(".mButtonWrap button:eq(6)").show();
        $(".mMessage:eq(0)").show();
        var tips = "移出书车成功，书车内容已更新。";
        $(".mMessage:eq(0) p:first").text(tips);
    });
}