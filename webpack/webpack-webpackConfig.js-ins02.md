# webpack笔记指南

[webpack docs](https://www.webpackjs.com/)

## ❤ 4.开发

### ☆ 使用source map
我们发现，使用webpack打包源代码时，我们将很难追踪到错误和警告在源代码的位置。

JavaScript提供了source map的功能，将编译后的代码映射回源代码，如果这个错误来自，b.js，source map就会明确告诉你。
这里使用inline-source-map举例：
webpack.config.js
```js
module.exports = {
    entry:{},
    devtool:'inline-source-map',
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugin:[],
    output:{}
}
```

### ☆ 选择一个开发工具
每次编译代码都需要手动npm run build 就显得很麻烦，
webpack中有几个不同的选项，可以帮助我们在代码变化后自动编译代码。
- webpack's watch mode
- webpack-dev-serve
- webpack-dev-middleware

#### 1）使用观察模式
添加一个用于启动webpack的观察模式的npm script脚本
package.json
```json
{
    "scripts":{
        "test": "echo \"Error: no test specified\" && exit 1",
        "watch": "webpack --watch",
        "build": "webpack"
    }
}
```
现在运行npm run watch ，就会看到webpack编译代码，然而却不退出命令行。这是因为script脚本还在观察文件。

> 唯一的缺点就是，为了看到修改后的实际结果，我们需要重新刷新浏览器。

### 2）webpack-dev-server
webpack-dev-server提供了一个简单的web服务器，并且能够实时重新加载
```bash
npm install --save-dev webpack-dev-server 
```
修改配置文件，告诉开发服务器（dev server），在哪里查找文件

webpack.config.js
```js
module.exports = {
    entry:{
        app:"./src/index.js",
        print:"./src/print.js"
    },
    devtool:"inline-source-map",
    devServer:{
        contentBase:'./dist'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugin:[],
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}
```

