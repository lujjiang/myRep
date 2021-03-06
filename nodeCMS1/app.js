
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , admin = require('./routes/admin')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , menu = require('./routes/admin/menu');
  

var app = express();

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/:name', routes.index);
app.get('/users', user.list);
app.get('/config', admin.index);
app.get('/menus/:id', menu.getMenus);
app.get('/menu/add',menu.menuAdd);
app.post('/menu/add',menu.doMenuAdd);
app.get('/menu/json/:name',menu.menuJSON);
app.get('/menu/show/:name',menu.menuList);
app.get('/menu/steak/food',routes.food);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
