//Package/Module dependencies declaration
var path = require('path');
var __parentDir = path.dirname(module.parent.filename);

//Export Model Logic
exports.home = function(req, res){
res.sendFile(__parentDir + '/view/index.html');
}

exports.login = function(req, res){
res.sendFile(__parentDir + '/view/login-register.html');
}

exports.forgotpassword = function(req, res){
res.sendFile(__parentDir + '/view/forgot-password.html');
}

//export this router to use in our index.js
//module.exports = model;