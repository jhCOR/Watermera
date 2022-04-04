var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

var expressErrorHandler = require('express-error-handler');
var expressSession = require('express-session');
 
const redis = require('redis');
const RedisStore=require('connect-redis')(expressSession);
var passport = require('passport');
var flash = require('connect-flash');
var multer=require('multer');

var config = require('./config/config');
var database = require('./database/database');
var route_loader = require('./routes/route_loader');
var cors=require('cors');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('config.server_port : %d', config.server_port);
app.set('port', process.env.PORT || 3001);

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
require('dotenv').config();
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', function (req, res, next) {

	console.log('Request Type:', req.method);
	next();
});

var router = express.Router();
route_loader.init(app, router);
router.get('/session/set/:value', function(req, res) {
    req.session.redSession = req.params.value;
    res.send('session written in Redis successfully');
});

app.get('/session/get/', function(req, res) {
    if(req.session.redSession)
        res.send('the session value stored in Redis is: ' + req.session.redSess);
    else
        res.send("no session value stored in Redis ");
});
// 패스포트 설정
var configPassport = require('./config/passport');
configPassport(app, passport);

// 패스포트 라우팅 설정
var userPassport = require('./routes/user_passport');
userPassport(router, passport);


var renderRouter = require('./routes/route_loader');
var router = express.Router();
route_loader.init(app, router);

var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

app.use((err, req, res, next) => { 
  console.error("E:"+err.stack); 
  res.status(500).send('서버 에러!'); 
});

process.on('uncaughtException', function (err) {
	console.log('uncaughtException 발생함 : ' + err);
	console.log('서버 프로세스 종료하지 않고 유지함.');
	console.log(err.stack);
});

process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
	database.init(app, config);
   
});

