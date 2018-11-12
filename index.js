
// 引入包

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('./getMime');


// 获取文件扩展名

var server = http.createServer((req, res) => {

    var pathname = req.url;
    // console.log(pathname)  //index.html?name=zhs

    // 对pathname处理 找到对应的静态页面
    pathname = url.parse(pathname).pathname;
    
    // 处理 '/' 请求
    if(pathname === '/') {
        pathname = '/index.html';
    }
    console.log(pathname); // url模块获取文件名
    
    if(pathname !== 'favicon.ico') { //过滤请求
        // fs模块读写静态文件，返回
        fs.readFile('static/' + pathname, (err, data) => {
            if (err) {
                // console.log(err) // 返回404页面
                fs.readFile('static/404.html', (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.writeHead(404, { 'content-type': 'text/html;charset=utf8' }); //响应头
                        res.write(data);
                        res.end(); //结束响应
                    }
                })
            } else {

                // 获取文件扩展名，响应mime类型
                var mimeType = mime.getMime(path.extname(pathname));
                res.writeHead(200, {'content-type': ''+ mimeType +';charset=utf8'});
                res.write(data);
                res.end();
            }
        })
    }

});

server.listen(8000);