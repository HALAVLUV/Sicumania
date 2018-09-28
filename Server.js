var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
  email: String,
  password:   String,
  firstname: String,
  lastname: String,
  classs: String,
  balance: Number,
  isAdmin: Boolean,
  isLoggedIn: Boolean
});

var sicumsSchema = new Schema({
    topic: String,
    name:   String,
    allowedList: String,
    adminList: String,
  });

var counterUser = 0;
var counterSicums = 0;


function writeSicums(content, topic, name) 
{
    fs.writeFile(topic + name, content, (err) => {  
        if (err) throw err;
    });
}


function retSicum(topic, name, allowedList, adminList)
{
    mongoose.connect("mongodb://localhost");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() 
    {
        var sicum = mongoose.model('sicum', sicumsSchema);
    });
        return sicum.find();
}


function registerNewUser(email, password, firstname, lastname, classs)
{
    mongoose.connect("mongodb://localhost");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() 
    {
        var user = mongoose.model('user', usersSchema);
        var newUser = new user({email: email, password:password, firstname:firstname, lastname:lastname, classs:classs, isAdmin: false, isLoggedIn: true});
        newUser.save(function (err) {
            if (err) return handleError(err);
        });
        console.log("hola")
        return newUser.id;
    });
}

function returnUserID(mail, query)
{
    mongoose.connect("mongodb://localhost");
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() 
    {
        var user = mongoose.model('user', usersSchema);
        user.findOne({ email : query }), returnField, function(err, found)
        {
            if (err) return handleError(err);
            return found.id;
        }
    });
}

http.createServer(function (req, res) {
    if (req.method === "GET")
    {
        var q = url.parse(req.url, true);
        if (q.pathname === '/')
        {
            var filename = "./web/index.html"
        }
        else if (q.pathname === '/echo')
        {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("hello");
            return;
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
    }
    
    if (req.method === 'POST')
    {
        var body = "";
        req.on("data", function (chunk) {
            body += chunk;
            console.log(chunk)
        });
        req.on("end", function(){
            if (req.url === '/signup.html')
            {
                var data = qs.parse(body);
                var id = registerNewUser(data.email, data.password, data.firstname, data.lastname, data.classs);
                res.writeHead(201, { "Content-Type": "text/plain" });
                res.end("id=" + id);
            }
            if (req.url === '/signin.html')
            {
                var data = qs.parse(body);
                res.writeHead(201, { "Content-Type": "text/plain" });
                res.end(true);
            }
            if (req.url === '/writeSicum.html')
            {
                var data = qs.parse(body);
                writeSicums(data);
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end();
            }
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("whaaaaaaaaaaat the fuck did you even do to get this error");
        });
    }
}).listen(8080);