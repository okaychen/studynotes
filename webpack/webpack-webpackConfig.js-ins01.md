# webpack笔记指南

[webpack docs](https://www.webpackjs.com/)


## ❤ 1.起步
### ☆ 基本安装
```
mkdir webapck-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```
项目目录结构：
```
webpack-demo
    -package.json
```
1.去掉package.json中的`"main":"index.js"`防止意外发布，

2.加上`"private":true`,保证我们的安装包是私有的

3.然后运行npx webpack（npm v5.2.0引入的一条命令，可以通过npm install npx -g安装）；

结构目录变成如下：
```
webpack-demo
    -package.json
    -dist
      -main.js
```
### ☆ 使用配置文件
虽然在webpack4.0，可以无须任何配置使用，然而大多数的项目仍然需要很复杂的配置，所以我们需要对webpack配置文件有一定的学习了解。

1.新建一个webpack.config.js配置文件
```bash
vi webpack.config.js
# 我们需要通过npm install --save-dev html-webpack-plugin，安装HtmlWebpackPlugin；有关它的作用，下面会在具体介绍。
# 键入下面配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    plugin:[
        new HtmlWebpackPlugin({
            title:'Output Management'
        })
    ],
    output:{
            filename:'bundle.js',
            path:path.resolve(__dirname,'dist');
    },
}
# 运行npx webpack。发现dist文件夹下多了一个新生成的index.html文件,引入了打包后的bundle.js,title是我们在HtmlWebpackPlugin中指定的
```

### ☆ npm脚本{NPM Scripts}
使用npm script脚本设置的快捷方式，可以避免每次使用`npx webpack webpack.config.js`这种CLI运行方式的麻烦。
在你的package.json添加一个npm脚本。
```json
"scripts":{
    'test':'echo \"Error:no test specified\" && exit 1',
    'build': 'webpack'
}
```
这样就可以使用npm run build命令替代之前使用的npx命令。

## ❤ 2.管理资源

webpack最出色的功能之一就是，除了JavaScript，还可以通过loader引入其他任何类型的文件，例如css，图片，字体，数据。

### ☆ 加载css
为了从JavaScript模块import一个css文件，我们需要在module配置中，安装并添加`style-loader`和`css-loader`
```bash
npm install style-loader css-loader --save-dev
```
webpack.config.js
```js
const path = require('path');

module.exports = {
    entry:"./src/index.js",
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:"/\.css$/",
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
```
> webpack根据正则表达式，来确定y应该查找哪些文件，并将其提供给指定的loader。在这种情况下,以.css文件结尾的全部文件，都将被提供给style-loader和css-loader

## ❤ 3.管理输出

### ☆ 设定html-webpack-plugin
> 虽然/dist文件夹下已经存在index.html，html-webpack-plugin可以帮助我们默认生成新的index.html文件，它会用新生成的index.html，把我们原来的替换。

### ☆ 清理/dist文件夹
可能由于一些原因遗留下的文件，使我们的/dist文件夹显得相当杂乱。webpack无法追踪到/dist文件夹下哪些是在实际项目中会用到的。

所以，在每次构建前清理/dist文件夹，是比较推荐的做法。

`clean-webpack-plugin`是比较普及的管理插件，
```bash
npm install clean-webpack-plugin --save-dev
```
webpack.config.js
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:"./src/index.js",
    plugin:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'demo'
        })
    ],
    output:{
        filename:"",
        path:path.resolve(__dirname,'dist')
    }
}
```