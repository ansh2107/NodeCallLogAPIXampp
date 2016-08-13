
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load customers route
var customers = require('./routes/customers'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'nodejs'

    },'pool') //or single

);



app.get('/', customers.index);
app.get('/userlist',customers.userlist);
app.post('/adduser', customers.adduser);
app.get('/deleteuser/:mobile', customers.deleteuser);
app.post('/callpost/:mobile', customers.callpost);
app.get('/deletecalldetails/:tophonenumber', customers.deletecalldetails);
app.get('/callget',customers.callget);
app.get('/searchuser/:mobile',customers.searchuser);
app.get('/searchcalldetails/:tophonenumber',customers.searchcalldetails);



app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
