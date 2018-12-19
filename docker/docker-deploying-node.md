## docker实践-node应用部署

下面是一个简单的例子，用来实现如何在docker容器内运行node程序。我们需要创建一个简单的node webapp来构建一个镜像，然后基于这个image运行一个container，从而实现快速部署 
```cmd
okaychen@okaychen:~$  mkdir nodeTest
okaychen@okaychen:~$  cd nodeTest
okaychen@okaychen:~/nodeTest$  vi package.json
okaychen@okaychen:~/nodeTest$  vi server.js
okaychen@okaychen:~/nodeTest$  vi Dockerfile
okaychen@okaychen:~/nodeTest$  cat package.json
	{
	"package":"webtest",
	"version":"1.0.0",
	"description":"Node.js on Docker",
	"author":"okaychen",
	"main":"server.js",
	"script":{
	  "start":"node server.js"      
	},
	"dependencies":{
	  "express":"^4.13.3"
	}
	} 
okaychen@okaychen:~/nodeTest$  cat server.js
	'use strict';

	var express = require('express');

	var PORT = 8888;

	var app = express();
	app.get('/',function(req,res){
	  res.send('hello world\n');
	})

	app.listen(PORT);
	console.log('Running on http://localhost:' + PORT);
okaychen@okaychen:~/nodeTest$  cat Dockerfile
	FROM node

	# Create app directory
	RUN mkdir -p /home/Service
	WORKDIR /home/Service

	# Bundle app source
	COPY . /home/Service
	RUN npm install 

	EXPOSE 8888
	CMD ["npm","start"]
okaychen@okaychen:~/nodeTest$  docker build -t mynodeapp .
okaychen@okaychen:~/nodeTest$  sudo docker images
	REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
	mymodeapp           latest              01a7d13f47c2        7 seconds ago       897MB
okaychen@okaychen:~/nodeTest$  sudo docker run -d -p 8888:8888 01a
okaychen@okaychen:~/nodeTest$  sudo docker ps
	CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS                    NAMES
	e92fd357b0dd        01a                 "npm start"         9 seconds ago       Up 9 seconds        0.0.0.0:8888->8888/tcp   gallant_ardinghelli
okaychen@okaychen:~/nodeTest$  sudo docker logs e92

	> @1.0.0 start /home/Service
	> node server.js

	Running on http://localhost:8888
okaychen@okaychen:~/nodeTest$  curl -i localhost:8888
	HTTP/1.1 200 OK
	X-Powered-By: Express
	Content-Type: text/html; charset=utf-8
	Content-Length: 12
	ETag: W/"c-IlljY7PeQLBvmB+4XYIxLowO1RE"
	Date: Wed, 19 Dec 2018 03:27:29 GMT
	Connection: keep-alive

	hello world
```
### 创建DOckerfile
docker会根据dockerfile的内容来构建一个镜像。
```cmd
vi Dockerfile
```

```dockerfile
FROM node

# Create app directory
RUN mkdir -p /home/Service
WORKDIR /home/Service

# Bundle app source
COPY . /home/Service
RUN npm install 

EXPOSE 8888
CMD ["npm","start"]
```
1.`FROM node`FORM是构建镜像的基础镜像源，node是镜像的名称，没有指明源和版本tag的话，会默认指定docker hub源和tag最新版本。如果本地没有这个docker就会从该源下载
2.
```# Create app directory
RUN mkdir -p /home/Service
WORKDIR /home/Service
```

