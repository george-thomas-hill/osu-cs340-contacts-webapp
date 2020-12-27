// Contacts Webapp (backend)
// By Jacky Tran and George Hill
// For CS 340
// Adapted from the CS 340 sample Node.js database-driven webesite.

// Require the necessesary packages:
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({
  defaultLayout:'main',
});

// Set up Express:
var app = express();
app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

// Set up paths:
app.use('/static', express.static('public'));

app.use('/home', require('./home.js'));
app.use('/myAccount', require('./myAccount.js'));
app.use('/contacts', require('./contacts.js'));
app.use('/editContact', require('./editContact.js'));
app.use('/interactions', require('./interactions.js'));
app.use('/interactionDetails', require('./interactionDetails.js'));
app.use('/modes', require('./modes.js'));

app.use('/', require('./home.js'));

// Set up error-handling:
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// Start Express:
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
