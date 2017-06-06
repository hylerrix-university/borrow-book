# “无微不至”的借阅系统

## 竞赛场景页

> http://www.cnsoftbei.com/bencandy.php?fid=148&aid=1532

## 项目简介

> Jasmine 做单元测试，istanbul 检查单元测试代码覆盖率，Karma 自动化完成单元测试，Grunt 启动 Karma 统一项目管理，Yeoman 最后封装成一个项目原型模板，NPM 做 Node.js 的包依赖管理，Bower 做 javascript 的包依赖管理。

## 任务进度

- [X] 原型图
- [ ] 用户注册

> 场景.1: 用户被微信授权后跳转图书导航页。
> 场景.2: 管理员直接登录、登录界面下方提示发邮件申请账号

- [ ] 图书导航
- [ ] 搜索书籍
- [ ] 书籍详情
- [ ] 相关书籍
- [ ] 推荐阅读
- [ ] 在线预订
- [ ] 借书

> 场景.1: 用户扫描至多两本书的二维码并生产借书码的来找管理员
> 场景.2: 管理员扫描用户借书二维码并进行借书确认
> 说明.1: 这就需要借书码内含有所借之书的信息、用户和借阅状态信息

- [ ] 还书提醒

> 场景.1: 公众号自动推送

- [ ] 还书

> 场景.1: 用户凭借自己的借书二维码和所借书籍找管理员
> 场景.2: 管理员在自己的“还书验收”页面扫码确认还书

- [ ] 单元测试
- [ ] 概要设计说明书
- [ ] 需求规格说明书

## 项目目录

> 说明：(.gi) 寓意为 (使用 .gitignore 忽略上传)

.
├── README.md # 项目说明文档
├── admin # 管理员界面文件夹
├── bower.json # Bower 前端库依赖关系
├── bower_components # Bower 前端依赖库(.gi)
├── interface.md # 后端接口文档
├── jasmine # 单元测试文件
├── karma.conf.js # Karma 自动化完成单元测试配置
├── library.sql # 后端 SQL 源码
├── node_modules # Node 安装模块(.gi)
├── npm-debug.log # NPM 错误日志(.gi)
├── package.json # Node 配置
├── prototype # 原型图 HTML 版
├── unit-test # 前端单元测试文件
└── user # 用户界面文件夹

## 使用指南

* 克隆项目至本地

> git clone https://git.oschina.net/CreatShare/borrow-book.git

* 用 npm 构建环境

```
npm install
```

* 使用 bower 进行前端依赖库的安装(使用 npm 安装 bower)

```
bower install
```