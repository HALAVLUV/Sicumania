var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    if (q.pathname = '/')
    {
        var filename = "./web/index.html"
    }
    else if (path.extname(q.pathname) == '.')
    {
        var filename = "./web" + q.pathname + "html"
    }
    else 
    {
        var filename = "./web" + q.pathname;
    }
    var extension = path.extname(filename);
    fs.readFile(filename, function(err, data){
        
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end("404 not found oh no :((")
        }
        switch (extension){
            case '.html':
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(data);
                res.end();
            case '.js':
                res.writeHead(200, {'Content-Type': 'application/javascript'});
                res.end(data);
                case '.json':
                res.writeHead(200, {'Content-Type': 'application/javascript'});
                res.end(data);
            case '.png':
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.end(data, 'binary');
            case '.css':
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data);
            case '.jpg':
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(data, 'binary');
            default:
                res.writeHead(400, {'Content-Type': 'text/html'});
                res.end("400 ummm we dont have this kind of file available here wtf are you doing");
        }
    });

}).listen(8080);