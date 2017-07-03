var express=require("express");

var redis = require("redis");

var session=require("express-session");

var redisStore = require('connect-redis')(session);

var client = redis.createClient(6379, 'mycachecluster.irxo43.0001.use1.cache.amazonaws.com', {no_ready_check: true});

var authentication=require('./Authentication.js');

var register=require('./Register.js');

var update=require('./update.js');

var addProducts=require('./addProducts.js');

var modifyProducts=require('./modifyProducts.js');

var viewProducts=require('./viewProducts.js');

var viewUsers=require('./viewUser.js');

var port=3000;

var sess;

var bodyParser=require("body-parser");

var app=express();

app.use( session({cookie: {maxAge:900000},resave:false,rolling:true,saveUnitialized:false,secret:'abcd123',
	store: new redisStore({ host: 'mycachecluster.irxo43.0001.use1.cache.amazonaws.com', port: 6379, client: client,ttl :300})}));		     

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.get('/',function(req,resp){
	resp.json({message:'Welcome to ECommerce Shopping application'});
});

app.post('/login',authentication.login);

app.post('/logout',authentication.logout);

app.post('/registerUser',register.registerUser);

app.post('/updateInfo',update.updateInfo);

app.post('/addProducts',addProducts.add);

app.post('/modifyProduct',modifyProducts.modify);

app.post('/viewProducts',viewProducts.view);

app.post('/viewUsers',viewUsers.view);

app.listen(port,function() {
	console.log('Express listening on port:'+port+'!');
});

