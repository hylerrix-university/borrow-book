# “借阅伴侣”接口文件

## 接口名称：补全图书信息

* 请求地址

https://corefure.cn/lib_api/book/finishBook.action

* 请求类型

HTTP：POST

* 参数
	
|参数名称|参数说明|必填|
|----|----|----|
|isbn|书的isbn号|Y|

* 结果示例

```
{
  "next": "",
  "count": 1,  
  "books": [
    {
      "bId": null,
      "bName": "大型网站系统与Java中间件开发实践",
      "sId": null,
      "cId": null,
      "spell": null,
      "initial": null,
      "imgurl": "https://img1.doubanio.com/mpic/s27269837.jpg",
      "isbn": "9787121227615",
      "author": "曾宪杰",
      "count": null
    }
  ]
}
```

* 返回参数说明

```
next:下一页得next值，""表示没有下一页
count:books中含有几本书
books:book的集合
book{
	bId:书籍唯一标识
	bName:书籍名称
	sId:书库的标识ID
	cId:书籍类型的标识ID
	spell:全拼
	initial:首字母
	imgurl:书籍图片路径
	isbn:书籍的isbn号
	author:作者
	count:书库中该书的总量
}
```

## 接口名称：储存书籍信息

* 请求地址:

https://corefure.cn/lib_api/book/saveBook.action

* 请求类型

HTTP：POST

* 参数
	
|参数名称|参数说明|必填|
|----|----|----|
|bName|书名|Y|
|sId|书库ID|Y|
|cId|书类型ID	|Y|
|imgurl|图片路径|N|
|isbn|书的isbn号|Y|
|author|作者|Y|
|count|该书总量|Y|

* 结果示例

```
{
	"IsSuccess": true
}
```

## 接口名称：得到所有书库信息

* 请求地址

https://corefure.cn/lib_api/stack/getAllStacks.action

* 请求类型

HTTP：POST

* 参数

无

* 结果示例

```
[
  {
    "sId": 1,
    "sName": "通信与计算机书库",
    "categories": [
      {
        "cId": 1,
        "cName": "编程语言",
        "sId": 1
      },
      {
        "cId": 2,
        "cName": "网站架构",
        "sId": 1
      }
    ]
  },
  {
    "sId": 2,
    "sName": "文艺书库",
    "categories": []
  },
  {
    "sId": 3,
    "sName": "社会科学书库",
    "categories": []
  }
]
```

* 返回参数说明

```
sId:书库ID
sName:书库名称
categories:书库所有分类
	cId:分类ID
	cName:分类名称
```

## 接口名称：得到所有分类信息

* 请求地址

https://corefure.cn/lib_api/category/getCategories.action

* 请求类型

HTTP：POST

* 参数

无

* 结果示例:

[
  {
    "cId": 1,
    "cName": "编程语言",
    "sId": 1
  },
  {
    "cId": 2,
    "cName": "网站架构",
    "sId": 1
  }
]

* 返回参数说明

```
sId:书库ID
cId:分类ID
cName:分类名称
```

## 接口名称：模糊查找书籍

* 请求地址

https://corefure.cn/lib_api/category/getCategories.action

* 请求类型

HTTP：POST

* 参数:

|参数名称|参数说明|必填|
|----|----|----|
|rows|分页（一页几本书）|Y|
|way|查找方式（通过书名way=0，全拼way=1，首字母查找way=3）|Y|
|bName|书名|way=0|
|spell|全拼|way=1|
|initial|首字母|way=3|

* 结果示例

```
{
  "next": "",
  "count": 1,
  "books": [
    {
      "bId": "AVxoTcTXoMlguXEb9gQ_",
      "bName": "Spring源码深度解析",
      "sId": 1,
      "cId": 1,
      "spell": "springyuanmashendujiexi",
      "initial": "springymsdjx",
      "imgurl": "https://img3.doubanio.com/mpic/s28047190.jpg",
      "isbn": "9787115325686",
      "author": "郝佳",
      "count": 1
    }
  ]
}
```

* 返回参数说明

```
next:下一页的next值，""表示没有下一页
count:books中含有几本书
books:book的集合
book{
	bId:书籍唯一标识
	bName:书籍名称
	sId:书库的标识ID
	cId:书籍类型的标识ID
	spell:全拼
	initial:首字母
	imgurl:书籍图片路径
	isbn:书籍的isbn号
	author:作者
	count:书库中该书的总量
}
```

## 接口名称：精确查找书籍

* 请求地址

https://corefure.cn/lib_api/book/searchBookExact.action

* 请求类型

HTTP：POST

* 参数

|参数名称|参数说明|必填|
|----|----|----|
|way|查找方式（通过id查找way=3 isbn查找way=4|Y|
|bId|书ID|way=3|
|isbn|书的ISBN号|way=4|

* 结果示例

```
{
  "next": "",
  "count": 1,
  "books": [
    {
      "bId": "AVxnYSiLoMlguXEb9gQ9",
      "bName": "大型网站系统与Java中间件开发实践",
      "sId": 1,
      "cId": 1,
      "spell": "daxingwangzhanxitongyujavazhongjianjiankaifashijian",
      "initial": "dxwzxtyjavazjjkfsj",
      "imgurl": "https://img1.doubanio.com/mpic/s27269837.jpg",
      "isbn": "9787121227615",
      "author": "曾宪杰",
      "count": 1
    }
  ]
}
```

* 返回参数说明

```
next:下一个的next值，""表示没有下一页
count:books中含有几本书
books:book的集合
book{
	bId:书籍唯一标识
	bName:书籍名称
	sId:书库的标识ID
	cId:书籍类型的标识ID
	spell:全拼
	initial:首字母
	imgurl:书籍图片路径
	isbn:书籍的isbn号
	author:作者
	count:书库中该书的总量
}
```

## 接口名称：获取下一页书籍

* 请求地址

https://corefure.cn/lib_api/book/searchBookNext.action

* 请求类型

HTTP：POST

* 参数

|参数名称|参数说明|必填|
|----|----|----|
|next|获取到的next值|Y|

* 结果示例:

```
{
  "next": "cXVlcnlUaGVuRmV0Y2g7NTs3ODE6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTs3ODU6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTs3ODI6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTs3ODM6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTs3ODQ6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTswOw==",
  "count": 1,
  "books": [
    {
      "bId": "AVxnYSiLoMlguXEb9gQ9",
      "bName": "大型网站系统与Java中间件开发实践",
      "sId": 1,
      "cId": 1,
      "spell": "daxingwangzhanxitongyujavazhongjianjiankaifashijian",
      "initial": "dxwzxtyjavazjjkfsj",
      "imgurl": "https://img1.doubanio.com/mpic/s27269837.jpg",
      "isbn": "9787121227615",
      "author": "曾宪杰",
      "count": 1
    }
  ]
}
```

* 返回参数说明

```
next:下一个的next值，""表示没有下一页
count:books中含有几本书
books:book的集合
book{
	bId:书籍唯一标识
	bName:书籍名称
	sId:书库的标识ID
	cId:书籍类型的标识ID
	spell:全拼
	initial:首字母
	imgurl:书籍图片路径
	isbn:书籍的isbn号
	author:作者
	count:书库中该书的总量
}
```

## 接口名称：通过分类ID获取书籍

* 请求地址

https://corefure.cn/lib_api/book/searchBookByCid.action

* 请求类型

HTTP：POST

* 参数

|参数名称|参数说明|必填|
|----|----|----|
|cId|分类id值	|Y|

* 结果示例

```
{
  "next": "cXVlcnlUaGVuRmV0Y2g7NTs3ODY6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTs3OTA6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTs3ODc6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTs3ODg6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTs3ODk6ckR1ZXVVQnZRN1dQNjVIYk53NDNZQTswOw==",
  "count": 3,
  "books": [
    {
      "bId": "AVxoaoAWoMlguXEb9gRB",
      "bName": "Java编程思想 （第4版）",
      "sId": 1,
      "cId": 1,
      "spell": "javabianchengsixiang （di4ban）",
      "initial": "javabcsx （d4b）",
      "imgurl": "https://img1.doubanio.com/mpic/s2553047.jpg",
      "isbn": "9787111213826",
      "author": "[美] Bruce Eckel",
      "count": 1
    },
    {
      "bId": "AVxnYSiLoMlguXEb9gQ9",
      "bName": "大型网站系统与Java中间件开发实践",
      "sId": 1,
      "cId": 1,
      "spell": "daxingwangzhanxitongyujavazhongjianjiankaifashijian",
      "initial": "dxwzxtyjavazjjkfsj",
      "imgurl": "https://img1.doubanio.com/mpic/s27269837.jpg",
      "isbn": "9787121227615",
      "author": "曾宪杰",
      "count": 1
    },
    {
      "bId": "AVxoTcTXoMlguXEb9gQ_",
      "bName": "Spring源码深度解析",
      "sId": 1,
      "cId": 1,
      "spell": "springyuanmashendujiexi",
      "initial": "springymsdjx",
      "imgurl": "https://img3.doubanio.com/mpic/s28047190.jpg",
      "isbn": "9787115325686",
      "author": "郝佳",
      "count": 1
    }
  ]
}
```

* 返回参数说明

```
next:下一个的next值，""表示没有下一页
count:books中含有几本书
books:book的集合
book{
	bId:书籍唯一标识
	bName:书籍名称
	sId:书库的标识ID
	cId:书籍类型的标识ID
	spell:全拼
	initial:首字母
	imgurl:书籍图片路径
	isbn:书籍的isbn号
	author:作者
	count:书库中该书的总量
}
```

## 获取图书详情

* 请求地址

https://corefure.cn/lib_api/book/getBookDetail.action

* 请求类型

HTTP：POST

* 参数

|参数名称|参数说明|必填|
|----|----|----|
|bId|书ID|Y|
|uId|用户主键ID|Y|

* 结果示例

```
{
  "book": {
    "next": "",
    "count": 1,
    "books": [
      {
        "bId": "AVxoaoAWoMlguXEb9gRB",
        "bName": "Java编程思想 （第4版）",
        "sId": null,
        "cId": null,
        "spell": null,
        "initial": null,
        "imgurl": "https://img1.doubanio.com/mpic/s2553047.jpg",
        "isbn": "9787111213826",
        "author": "[美] Bruce Eckel",
        "count": 1,
        "publisher": "机械工业出版社",
        "catalog": "读者评论\n前言\n简介\n第1章 对象导论\n1.1 抽象过程\n1.2 每个对象都有一个接口\n1.3 每个对象都提供服务\n1.4 被隐藏的具体实现\n1.5 复用具体实现\n1.6 继承\n1.6.1 “是一个”（is-a）与“像是一个”（is-like-a）关系\n1.7 伴随多态的可互换对象\n1.8 单根继承结构\n1.9 容器\n1.9.1 参数化类型（范型）\n1.10 对象的创建和生命期\n1.11 异常处理：处理错误\n1.12 并发编程\n1.13 Java与Internet\n1.13.1 Web是什么\n1.13.2 客户端编程\n1.13.3 服务器端编程\n1.22 总结\n第2章 一切都是对象\n2.1 用引用操纵对象\n2.2 必须由你创建所有对象\n2.2.1 存储到什么地方\n2.2.2 特例：基本类型\n2.2.3 Java中的数组\n2.3 永远不需要销毁对象\n2.3.1 作用域\n2.3.2 对象的作用域\n2.4 创建新的数据类型：类\n2.4.1 域和方法\n2.4.2 基本成员默认值\n2.5 方法、参数和返回值\n2.5.1 参数列表\n2.6 构建一个Java程序\n2.6.1 名字可见性\n2.6.2 运用其他构件\n2.6.3 static 关键字\n2.7 你的第一个Java程序\n编译和运行\n2.8 注释和嵌入式文档\n2.8.1 注释文档\n2.8.2 语法\n2.8.3 嵌入式HTML\n2.8.4 一些标签示例\n2.8.5 文档示例\n2.9 编码风格\n2.10 总结\n2.11 练习\n第3章 操作符\n3.1 更简单的打印语句\n3.2 使用Java操作符\n3.3 优先级\n3.4 赋值\n3.4.1 方法调用中的别名问题\n3.5 算术操作符\n3.5.1 一元加、减操作符\n3.6 自动递增和递减\n3.7 关系操作符\n3.7.1 测试对象的等价性\n3.8 逻辑操作符\n3.8.1 短路\n3.9 直接常量\n3.9.1 指数记数法\n3.10 按位操作符\n3.11 移位操作符\n3.12 三元操作符 if-else\n3.13 字符串操作符 + 和 +=\n3.14 使用操作符时常犯的错误\n3.15 类型转换操作符\n3.15.1 截尾和舍入\n3.15.2提升\n3.16 Java没有“sizeof”\n3.17 操作符小结\n3.18 总结\n第4章 控制执行流程\n4.1 true和false\n4.2 if-else\n4.3 迭代\n4.3.1 do-while\n4.3.2 for\n4.3.3 逗号操作符\n4.4 Foreach语法\n4.5 return\n4.6 break和 continue\n4.7 臭名昭著的“goto”\n4.8 switch\n4.9 总结\n第5章 初始化与清理\n5.1 用构造器确保初始化\n5.2 方法重载\n5.2.1 区分重载方法\n5.2.2 涉及基本类型的重载\n5.2.3 以返回值区分重载方法\n5.3 缺省构造器\n5.4 this关键字\n5.4.1 在构造器中调用构造器\n5.4.2 static的含义\n5.5 清理：终结处理和垃圾回收\n5.5.1 finalize()的用途何在\n5.5.2 你必须实施清理\n5.5.3 终结条件\n5.5.4 垃圾回收器如何工作\n5.6 成员初始化\n5.6.1 指定初始化\n5.7 构造器初始化\n5.7.1 初始化顺序\n5.7.2. 静态数据的初始化\n5.7.3. 显式的静态初始化\n5.7.4. 非静态实例初始化\n5.8 数组初始化\n5.8.1 可变参数列表\n5.9 枚举类型\n5.10 总结\n第6章 访问权限控制\n第7章 复用类\n第8章 多态\n第9章 接口\n第10章 内部类\n第11章 持有对象\n第12章 通过异常处理错误\n第13章 字符串\n第14章 类型信息\n第15章 泛型\n第16章 数组\n第17章 容器深入研究\n第18章 Java I/O系统\n第19章 枚举类型\n第20章 注解\n第21章 并发\n第22章 图形化用户界面\n附录A 补充材料\n可下载的补充材料\nThinking in C：Java的基础\nJava编程思想 研讨课\nHands-on Java研讨课CD\nThinking in Objects研讨课\nThinking in Enterprise Java\nThinking in Patterns(with Java)\nThinking in Patterns研讨课\n设计咨询与复审\n附录B 资源\n软件\n编辑器与IDE\n书籍\n分析与设计\nPython\n我的著作列表\n索引",
        "sName": "通信与计算机书库",
        "cName": "编程语言",
        "summary": "本书赢得了全球程序员的广泛赞誉，即使是最晦涩的概念，在Bruce Eckel的文字亲和力和小而直接的编程示例面前也会化解于无形。从Java的基础语法到最高级特性（深入的面向对象概念、多线程、自动项目构建、单元测试和调试等），本书都能逐步指导你轻松掌握。\n从本书获得的各项大奖以及来自世界各地的读者评论中，不难看出这是一本经典之作。本书的作者拥有多年教学经验，对C、C++以及Java语言都有独到、深入的见解，以通俗易懂及小而直接的示例解释了一个个晦涩抽象的概念。本书共22章，包括操作符、控制执行流程、访问权限控制、复用类、多态、接口、通过异常处理错误、字符串、泛型、数组、容器深入研究、Java I/O系统、枚举类型、并发以及图形化用户界面等内容。这些丰富的内容，包含了Java语言基础语法以及高级特性，适合各个层次的Java程序员阅读，同时也是高等院校讲授面向对象程序设计语言以及Java语言的绝佳教材和参考书。\n第4版特点：\n适合初学者与专业人员的经典的面向对象叙述方式，为更新的Java SE5/6增加了新的示例和章节。\n 测验框架显示程序输出。",
        "canBorCount": 1,
        "bookItems": [
          {
            "biId": 12,
            "bId": "AVxoaoAWoMlguXEb9gRB",
            "coding": "0100100000004",
            "borrow": false
          }
        ]
      }
    ]
  },
  "relatedBooks": {
    "next": "",
    "count": 3,
    "books": [
      {
        "bId": "AVxnYSiLoMlguXEb9gQ9",
        "bName": "大型网站系统与Java中间件开发实践",
        "sId": 1,
        "cId": 1,
        "spell": "daxingwangzhanxitongyujavazhongjianjiankaifashijian",
        "initial": "dxwzxtyjavazjjkfsj",
        "imgurl": "https://img1.doubanio.com/mpic/s27269837.jpg",
        "isbn": "9787121227615",
        "author": "曾宪杰",
        "count": 1
      },
      {
        "bId": "AVxoTcTXoMlguXEb9gQ_",
        "bName": "Spring源码深度解析",
        "sId": 1,
        "cId": 1,
        "spell": "springyuanmashendujiexi",
        "initial": "springymsdjx",
        "imgurl": "https://img3.doubanio.com/mpic/s28047190.jpg",
        "isbn": "9787115325686",
        "author": "郝佳",
        "count": 1
      },
      {
        "bId": "AVxT2uyroMlguXEb9gQ3",
        "bName": "Lucene搜索引擎开发进阶实战",
        "sId": 1,
        "cId": 1,
        "spell": "lucenesousuoyinqingkaifajinjieshizhan",
        "initial": "lucenessyqkfjjsz",
        "imgurl": "https://img3.doubanio.com/mpic/s27986841.jpg",
        "isbn": "9787111488422",
        "author": "成龙",
        "count": 1
      }
    ]
  }
}
```

* 返回参数说明

```
book:书籍详情
book{
	next:下一个的next值，""表示没有下一页
	count:books中含有几本书
	books:book的集合
	books[
		{	
			bId:书籍唯一标识
			bName:书籍名称
			sId:书库的标识ID
			cId:书籍类型的标识ID
			spell:全拼
			initial:首字母
			imgurl:书籍图片路径
			isbn:书籍的isbn号
			author:作者
			count:书库中该书的总量
			publisher：出版社
			catalog:目录
			canBorCount:在架可借数量
			bookItems:具体书籍集合
			"bookItems": [
	          {
	            "biId": 具体书项标识
	            "bId": 书籍ID,
	            "coding": 书项编码,
	            "borrow": 是否可借
	          }
	        ]
		}
	]
}
relatedBooks:相关书籍
	next:下一个的next值，""表示没有下一页
	count:books中含有几本书
	books:book的集合
	book{
		bId:书籍唯一标识
		bName:书籍名称
		sId:书库的标识ID
		cId:书籍类型的标识ID
		spell:全拼
		initial:首字母
		imgurl:书籍图片路径
		isbn:书籍的isbn号
		author:作者
		count:书库中该书的总量
	}
```

## 接口名称：获取推荐书籍

* 请求地址

https://corefure.cn/lib_api/book/getRecommderBooks.action

* 请求类型

HTTP：POST

* 参数

|参数名称|参数说明|必填|
|----|----|----|
|uId|用户主键ID|Y|

* 结果示例

```
{
  "next": "",
  "count": 1,
  "books": [
    {
      "bId": "AVxoaoAWoMlguXEb9gRB",
      "bName": "Java编程思想 （第4版）",
      "sId": 1,
      "cId": 1,
      "spell": "javabianchengsixiang （di4ban）",
      "initial": "javabcsx （d4b）",
      "imgurl": "https://img1.doubanio.com/mpic/s2553047.jpg",
      "isbn": "9787111213826",
      "author": "[美] Bruce Eckel",
      "count": 1
    }
  ]
}
```

* 返回参数说明

```
next:下一个的next值，""表示没有下一页
count:books中含有几本书
books:book的集合
book{
	bId:书籍唯一标识
	bName:书籍名称
	sId:书库的标识ID
	cId:书籍类型的标识ID
	spell:全拼
	initial:首字母
	imgurl:书籍图片路径
	isbn:书籍的isbn号
	author:作者
	count:书库中该书的总量
}
```


		

