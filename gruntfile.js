module.exports = function(grunt) {

  // 定义各种模块的参数，每一个成员项对应一个同名模块
  grunt.initConfig({
    jshint: {
      options: {
        eqeqeq: true, // 表示要用严格相等运算符取代相等运算符
        trailing: true // 表示行尾不得有多余的空格
      },
      files: ['Gruntfile.js', 'karma.conf.js']
    },

    concat: { // 用来合并同类文件
      js: {
        src: ['lib/module1.js', 'lib/module2.js', 'lib/plugin.js'],
        dest: 'dist/script.js'
      }
      css: {
        src: ['style/normalize.css', 'style/base.css', 'style/theme.css'],
        dest: 'dist/screen.css'
      }
    },

    uglify: { // 用来压缩代码
      options: {
        banner: bannerContent,
        sourceMapRoot: '../',
        sourceMap: 'distrib/'+name+'.min.js.map',
        sourceMapUrl: name+'.min.js.map'
      },
      target : {
      expand: true,
      cwd: 'js/origin',
      src : '*.js',
      dest : 'js/'
      }
    },

    watch:  {

    },

    cssmin: {
      minify: { // 压缩
        expand: true, // 是否将下面文件名的占位符（即*号）都要扩展成具体的文件名
        cwd: 'css/', // 需要处理的文件(input)所在的目录
        src: ['*.css', '!*.min.css'], // 表示需要处理的文件
        dest: 'css/', // 表示处理后的文件名或所在目录
        ext: '.min.css' // 表示处理后的文件后缀名
      },
      combine: { // 合并
        files: { 
          // 表示输出文件是 css 子目录下的 out.min.css
          // 输入文件则是 css 子目录下的 part1.min.css 和 part2.min.css
          'css/out.min.css': ['css/part1.min.css', 'css/part2.min.css']
        }
      }
    }
  });

  copy: { // 用于复制文件与目录
    main: {
      expand: true,
      cwd: 'src/',
      src: '**',
      dest: 'dest/',
      flatten: true,
      filter: 'isFile',
    },
  },

  // 从 node_modules 目录加载模块文件
  require('load-grunt-tasks')(grunt); // 替代 grunt.loadNpmTasks 语句

  // 每行 registerTask 定义一个任务
  // 第一个参数为任务名，第二个参数是一个数组，，表示该任务需要依次使用的模块
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('check', ['jshint']);

};