# webpack笔记指南

[webpack docs](https://www.webpackjs.com/)

## ☆ 1.基本安装
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
### 使用一个配置文件
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

# npm脚本{NPM Scripts}
使用npm script脚本设置的快捷方式，可以避免每次使用`npx webpack webpack.config.js`这种CLI运行方式的麻烦。
在你的package.json添加一个npm脚本。
```json
"scripts":{
    'test':'echo \"Error:no test specified\" && exit 1',
    'build': 'webpack'
}
```