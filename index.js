//Package/Module dependencies declaration
var http = require('http');
var path = require('path');
var cors = require('cors')
var formData = require("express-form-data");
var os = require("os");
var session = require('express-session');
const fileUpload = require('express-fileupload');
var bcrypt = require('bcryptjs');
var crypto = require("crypto");
var fs = require('fs');
var dateTime = require('node-datetime');
var nodemailer = require('nodemailer');
var express = require('express');
var forever = require('forever-monitor');
//var mysql = require('mysql');
var connection = require('./routes/config');
var customFunctions = require('./routes/functions');
var model = require('./routes/models');
var app = express();

//Settings Set-Up
// all environments
var child = new (forever.Monitor)('index.js', {
    max: 3,
    silent: true,
    args: []
});
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/view');
//app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'view')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(cors());
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// clear from the request and delete all empty files (size == 0)
app.use(formData.format());
// change file objects to stream.Readable 
app.use(formData.stream());
// union body and files
app.use(formData.union());
//Express-FileUpload settings
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/uploads/'
}));

global.db = connection;

//Routers (Frontend/View)
app.all('/', function(req, res) {
   res.sendFile(__dirname + '/view/index.html');
});
app.get('/index', function(req, res) {
   res.sendFile(__dirname + '/view/index.html');
});
app.get('/login', function(req, res) {
   res.sendFile(__dirname + '/view/login-register.html');
});
app.get('/signup', function(req, res) {
   res.sendFile(__dirname + '/view/login-register.html');
});
app.get('/forgotpassword', function(req, res) {
   res.sendFile(__dirname + '/view/forgot-password.html');
});
app.get('/logout', function(req, res) {
   res.sendFile(__dirname + '/view/logout.html');
});
app.get('/overview', function(req, res) {
   res.sendFile(__dirname + '/view/overview.html');
});
app.get('/company-policy', function(req, res) {
   res.sendFile(__dirname + '/view/company-policy.html');
});
app.get('/incidents', function(req, res) {
   res.sendFile(__dirname + '/view/incidents.html');
});
app.get('/action-tracker', function(req, res) {
   res.sendFile(__dirname + '/view/action-tracker.html');
});
app.get('/docs-files', function(req, res) {
   res.sendFile(__dirname + '/view/docs-files.html');
});
app.get('/jobs-alerts', function(req, res) {
   res.sendFile(__dirname + '/view/jobs-alerts.html');
});
app.get('/emergency-mgt', function(req, res) {
   res.sendFile(__dirname + '/view/emergency-mgt.html');
});
app.get('/trainings', function(req, res) {
   res.sendFile(__dirname + '/view/trainings.html');
});
app.get('/schedule', function(req, res) {
   res.sendFile(__dirname + '/view/schedule.html');
});
app.get('/settings', function(req, res) {
   res.sendFile(__dirname + '/view/settings.html');
});
app.get('/about', function(req, res) {
   res.sendFile(__dirname + '/view/about.html');
});
app.get('/contact', function(req, res) {
   res.sendFile(__dirname + '/view/contact.html');
});
app.get('/report-incident', function(req, res) {
   res.sendFile(__dirname + '/view/report-incident.html');
});
app.get('/account', function(req, res) {
   res.sendFile(__dirname + '/view/account.html');
});
app.get('/projects', function(req, res) {
   res.sendFile(__dirname + '/view/projects.html');
});
app.get('/add-staff', function(req, res) {
   res.sendFile(__dirname + '/view/add-staff.html');
});
app.get('/staffs', function(req, res) {
   res.sendFile(__dirname + '/view/staffs.html');
});
app.get('/notifications', function(req, res) {
   res.sendFile(__dirname + '/view/notifications.html');
});


//API Routers (Backend Models/Logic)
app.use('/api/login', model.login);
app.use('/api/signup', model.signup);
app.use('/api/forgotpassword', model.forgotpassword);
app.use('/api/accountdetails', model.accountdetails);
app.use('/api/notifications', model.accountnotifications);
app.use('/api/accountupdate', model.accountupdate);
app.use('/api/dashboard', model.dashboard);
app.use('/api/company-policy', model.companypolicy);
app.use('/api/incidents', model.incidents);
app.use('/api/staffs', model.staffs);
app.use('/api/projects', model.projects);
app.use('/api/action-tracker', model.actiontracker);
app.use('/api/docs-files', model.documentfiles);
app.use('/api/jobs-alerts', model.jobsalerts);
app.use('/api/emergency-mgt', model.emergencymgt);
app.use('/api/trainings', model.trainings);
app.use('/api/schedule', model.schedule);

// Handle 404
app.use(function(req, res) {
   //res.send('404: Page not Found');
   res.sendFile(__dirname + '/view/404.html');
});
// Handle 500
app.use(function(error, req, res, next) {
   //res.send('500: Internal Server Error');
   console.log(error);
   res.sendFile(__dirname + '/view/500.html');
});
//Auto restart server on crash
child.start();
child.on('watch:restart', function(info) {
    console.error('Restaring script because ' + info.file + ' changed');
});

child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});

child.on('exit:code', function(code) {
    console.error('Forever detected script exited with code ' + code);
});

//Server - Port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
