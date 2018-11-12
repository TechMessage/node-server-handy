// 根据扩展名 返回content-type

var fs = require('fs');

exports.getMime = function (extname) {

    var res = fs.readFileSync('./mime.json');

    // console.log(res.toString());

    // 转json
    var obj = JSON.parse(res.toString());
    // 
    return obj[extname] || 'text/html';
}

