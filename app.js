var express	= require('express'),
	app 	= express(),
	server	= require('http').createServer(app)
	bodyParser	= require('body-parser'),
	cookieParser= require('cookie-parser');
	//session		= require('express-session');


app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
//app.use(session({ secret: "dfI3dD43220jhsdjjjsdkoen",saveUninitialized: true,resave: true}));


var loader = require("./loader")();

var port = process.env.OPENSHIFT_NODEJS_PORT || 2518 ;
var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";


server.listen(port, ip);

console.log("work "+ip+':'+port);