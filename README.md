# “无微不至”的借阅助手

## 竞赛场景页

> * [第六届“中国软件杯”大学生软件设计大赛赛题](http://www.cnsoftbei.com/bencandy.php?fid=148&aid=1532)

> * [“无微不至”的借读伴侣作品提交须知](http://www.cnsoftbei.com/bencandy.php?fid=148&aid=1562)

## 开发简介

> JsHint 做代码风格规范检测，Jasmine 做单元测试，Istanbul 检查单元测试代码覆盖率，Karma 自动化完成单元测试，Grunt 启动 Karma 统一项目管理，Yeoman 最后封装成一个项目原型模板，NPM 做 Node.js 的包依赖管理，Bower 做 JavaScript 的包依赖管理，RequireJS 做 JS 的 AMD 模块规范开发，Webpack 最终打包整个项目文件。

## 任务场景

* 首次登陆

> 场景.1: 用户被微信授权后跳转图书导航页。

> 场景.2: 管理员直接登录、登录界面下方提示发邮件申请账号

* 借阅书籍

> 场景.1: 用户扫描至多两本书的二维码并生产借书码的来找管理员

> 场景.2: 管理员扫描用户借书二维码并进行借书确认

> 说明.1: 这就需要借书码内含有所借之书的信息、用户和借阅状态信息

* 还书提醒

> 场景.1: 公众号自动推送

* 还书

> 场景.1: 用户凭借自己的借书二维码和所借书籍找管理员

> 场景.2: 管理员在自己的“还书验收”页面扫码确认还书

## 项目目录

> 说明：(.gi) 寓意为 (使用 .gitignore 忽略上传)

```
.
├── README.md # 项目说明文档
├── app # 前端项目正式源码
│   ├── admin # 管理员界面
│   └── user # 用户界面
├── bower.json # Bower 前端库依赖关系
├── bower_components # Bower 前端依赖库(.gi)
│   └── 相关配置详见 [bower.json](./bower.json)
├── gruntfile.js # Grunt 构建流配置
├── interface.md # 后端接口文档
├── karma.conf.js # Karma 自动化完成单元测试配置
├── library.sql # 后端 SQL 源码
├── node_modules # Node 安装模块(.gi)
│   └── 相关配置详见 [package.json](./package.json)
├── package.json # Node 配置
├── prototype # 原型图 HTML 版
├── unit-test # 前端单元测试
├── .yo-rc.json # Yo 隐藏文件
└── .gitignore # Git 版本管理忽略信息说明文件
```

## 前端页面及其命名约定

### user 用户页面

```
app/user/first_register.html # 首次登陆
app/user/books_navigation.html # 图书导航
app/user/search_books.html # 书库搜书
app/user/borrow_cart.html # 借阅书车
app/user/user_center.html # 个人中心
app/user/book_detail.html # 书籍详情
app/user/categories_detail.html # 类别详情
app/user/user_information.html # 个人信息
app/user/user_collection.html # 我的收藏
app/user/user_reserve.html # 我的预订
app/user/user_borrow.html # 借阅历史
app/user/user_search.html # 搜索记录
app/user/change_information.html # 修改信息
app/user/call_us.html # 联系我们
```

### admin 管理员页面

```
app/admin/admin_login # 登录界面
app/admin/input_books # 录入书籍
app/admin/alter_right # 授权验收
app/admin/admin_center.html # 个人中心
app/admin/admin_awards.html # 我的授权
app/admin/admin_receipt.html # 我的验收
app/admin/call_us.html # 联系我们
```

## 使用指南

### 克隆项目至本地

> git clone https://git.oschina.net/CreatShare/borrow-book.git

### 使用 bower 安装项目依赖的前端库

```
npm install -g bower
bower install
```

### 使用 npm 构建环境

```
npm install
```

需要使用的全局 npm 依赖库

```
npm install phantomjs -g # 下载很慢，推荐使用其他下载方式
```

```
npm install -g yo
```

### 执行单元测试并查看结果

1. 使用 karma(请定制相关配置 karma.conf.js)

```
karma start karma.conf.js
```

2. 直接使用通过 bower 安装的 jasmine 依赖库 

```
open unit-test/index.html
```

### 查看 istanbul 测试报告

从文件中打开(具体目录视操作系统而定)

```
open unit-test/coverage/Chrome\ 58.0.3029\ \(Mac\ OS\ X\ 10.12.5\)/index.html
```
