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
	FROM ndoe

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

```