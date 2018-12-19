## docker实践-node应用部署

下面是一个简单的例子，用来实现如何在docker容器内运行node程序。我们需要创建一个简单的node webapp来构建一个镜像，然后基于这个image运行一个container，从而实现快速部署 
```
okaychen@okaychen:~$  mkdir nodeTest
okaychen@okaychen:~$  cd nodeTest
okaychen@okaychen:~/nodeTest$  vi package.json
okaychen@okaychen:~/nodeTest$  vi server.js
okaychen@okaychen:~/nodeTest$  vi Dockerfile

```