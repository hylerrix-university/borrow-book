function Ajax (type, url, data, success, failed) {
    // 创建ajax对象
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
 
    var type = type.toUpperCase();
    // 用于清除缓存
    var random = Math.random();
 
    if (typeof data == 'object'){
        var str = '';
        for (var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }
 
    if (type == 'GET') {
        if (data) {
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url, true);
        }
        xhr.send();
    } else if (type == 'POST') {
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
 
    // 处理返回数据
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200){
                alert("success");
                success(xhr.responseText);
            } else {
                if (failed){
                    alert("failed");
                    failed(xhr.status);
                }
            }
        }
    }
}

function loadWechatUserInfo() {
    var sendData = {};
    Ajax('GET', 'https://wwwxinle.cn/Book/public/index.php/index/User/getInfo', sendData, function(data) {
        alert(data);
    }, function(error){
        alert(error);
    });
}

loadWechatUserInfo();




// // 所用接口：得到所有书库信息
// function loadCategories () {
//     if (window.XMLHttpRequest) {
//         // code for IE7+, Firefox, Chrome, Opera, Safari
//         xmlhttp = new XMLHttpRequest();
//     } else {
//         // code for IE6, IE5
//         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     var url = "https://corefuture.cn/lib_api/stack/getAllStacks.action";
//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();

//     xmlhttp.onreadystatechange = function () {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             // 获取到所请求的页面宣讲会信息并 JSON 化
//             var responseText = xmlhttp.responseText;
//             var resJSON = JSON.parse(responseText);
//             console.log(resJSON);
//         }
//     }
// }

// function loadCategoryBooks () {
//     if (window.XMLHttpRequest) {
//         // code for IE7+, Firefox, Chrome, Opera, Safari
//         xmlhttp = new XMLHttpRequest();
//     } else {
//         // code for IE6, IE5
//         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     var url = "https://corefuture.cn/lib_api/stack/getAllStacks.action";
//     xmlhttp.open("GET", url, true);
//     xmlhttp.send();

//     xmlhttp.onreadystatechange = function () {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             // 获取到所请求的页面宣讲会信息并 JSON 化
//             var responseText = xmlhttp.responseText;
//             var resJSON = JSON.parse(responseText);
//             console.log(resJSON);
//         }
//     }
// }

// loadCategories();
// loadCategoryBooks();