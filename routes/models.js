//Package/Module dependencies declaration
var bcrypt = require('bcryptjs');
var crypto = require("crypto");
var fs = require('fs');
var dateTime = require('node-datetime');
var nodemailer = require('nodemailer');
var path = require('path');
const fileUpload = require('express-fileupload');
var myCustomFunctions = require('./functions');
var __parentDir = path.dirname(module.parent.filename);

global.customFunctions = myCustomFunctions;

//Export Model Logic
exports.home = function(req, res){
  res.sendFile(__parentDir + '/view/index.html');
}

//Sign-Up Model Logic
exports.signup = function(req, res){
  //Get form data
  var error; 
  var companyid; 
  var companyname = customFunctions.dataFilter(req.body.companyname);
  var companyemail = customFunctions.dataFilter(req.body.email);
  var companyphone = customFunctions.dataFilter(req.body.phone);
  var password = customFunctions.dataFilter(req.body.password);
  var passwordsalt = '';
  var hashedpassword = '';
  var companycode = ''; //companyname.replace(/\s+/g, '-').toLowerCase();
  var companyphoto = 'uploads/company-icon.png';
  var userphoto = 'uploads/avatar.png';
  var time = dateTime.create().format('H:M:S');
  var date = dateTime.create().format('d-m-Y');
  //Backend form validations
  if (companyname === "" || companyname === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your company name"})); 
  }
  else if (companyemail === "" || companyemail === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your email"}));
  }
  else if (companyphone === "" || companyphone === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your phone"}));
  }
  else if (password === "" || password === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your password"}));
  }
  else {
  //Generate Salt and Hash Password
  bcrypt.genSalt(10, function(err, salt) {
    passwordsalt = salt;
    bcrypt.hash(password, salt, function(err, hash) {
    hashedpassword = hash;
    });
  });
  //Validate name data if exist in the database
  function validateNameAvailability(companyname, callback){
     db.query("SELECT * FROM companies WHERE companyname=?", [companyname], function(err, result) {
       if(result.length) {
        console.log('existing counts: ' + result.length);
        callback("Company name provided already exist"); 
       } else {
        callback(null); 
       }
     });
  }
  //Validate email data if exist in the database
  function validateEmailAvailability(companyemail, callback){
     db.query("SELECT * FROM companies WHERE companyemail=?", [companyemail], function(err, result) {
       if(result.length) {
        console.log('existing counts: ' + result.length);
        callback("Company email provided already exist"); 
       } else {
        callback(null); 
       }
     });
  }
  //Validate phone data if exist in the database
  function validatePhoneAvailability(companyphone, callback){
     db.query("SELECT * FROM companies WHERE companyphone=?", [companyphone], function(err, result) {
       if(result.length) {
        console.log('existing counts: ' + result.length);
        callback("Company phone provided already exist"); 
       } else {
        callback(null); 
       }
     });
  }
  //Run the validation checks
  validateNameAvailability(companyname, function(err){
     if (err) {
     console.log('real error: ' + err);
     res.end(JSON.stringify({status: "failed", message: err})); 
     }
  });
  validateEmailAvailability(companyemail, function(err){
     if (err) {
     console.log('real error: ' + err);
     res.end(JSON.stringify({status: "failed", message: err})); 
     }
  });
  validatePhoneAvailability(companyphone, function(err){
     if (err) {
     console.log('real error: ' + err);
     res.end(JSON.stringify({status: "failed", message: err})); 
     } else {
     //Perform database query Into Companies Table
     var sql = "INSERT INTO companies SET status = 'pending', companyname = ?, companycode = ?, companyemail = ?, companyphone = ?, companylogo = ?, package = 'plastic', date = ?";
     var bindValues = [companyname, companycode, companyemail, companyphone, companyphoto, date];
       db.query(sql, bindValues, function(err, results) {
         companyid = results.insertId; if (err) throw err; console.log(results.affectedRows + 'id:' + results.insertId);
         //Perform database query Into Users Table
         var sql = "INSERT INTO staffs SET role = ?, companyid = ?, companyname = ?, username = ?, firstname = ?, lastname = ?, email = ?, phone = ?, photo = ?, password = ?, passwordsalt = ?, date = ?";
         var bindValues = ['admin', companyid, companyname, 'Admin', 'Staff', 'Admin Staff', companyemail, companyphone, userphoto, hashedpassword, passwordsalt, date];
         db.query(sql, bindValues, function(err, results){
         if (err) throw err; console.log(results.affectedRows);
         }); 
       });
     //Output & return result
     var json = {status: "success", message: "Registration successful. You can check your email for instructions to proceed to login"};
     res.send(JSON.stringify(json));
     }
  });
  }
}

//Login Model Logic
exports.login = function(req, res){
  var email = customFunctions.dataFilter(req.body.email);
  var password = customFunctions.dataFilter(req.body.password);
  var passwordsalt = '';
  var hashedpassword = '';
  var companyid = '';
  var companyname = '';
  var companylogo = '';
  var userid = '';
  var username = '';
  var useremail = '';
  var userimage = '';
  var accounttype = '';
  var logintoken = '';
  var logindevice = '';
  var date = dateTime.create().format('d-m-Y');
  //Backend form validations
  if (email === "" || email === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your email"}));
  }
  if (password === "" || password === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your password"}));
  }
  //Validate login details 
  function validateLoginDetails(email, hashedpassword, callback){
     var sql = "SELECT * FROM staffs WHERE email=? AND password=?";
     var bindValues = [email,hashedpassword];
     db.query(sql, bindValues, function(err, results){
       if(results.length) {
               companyid = results[0].companyid;
               companyname = results[0].companyname;
               userid = results[0].id;
               username = results[0].firstname + ' ' + results[0].lastname;
               useremail = results[0].email;
               userimage = results[0].photo;
               accounttype = results[0].role;
               logintoken = crypto.randomBytes(20).toString('hex');
               logindevice = Math.random().toString(36).substr(2, 5);
               req.session.userid = userid;
               req.session.username = username;
               req.session.companyid = companyid;
               //Update User record with logintoken in the database
               var sql = "UPDATE staffs SET logintoken=?, lastlogindate=? WHERE email=?";
               var bindValues = [logintoken,date,email];
               db.query(sql, bindValues, function(err, results){ });
               //Get Company Details from the database
               var sql = "SELECT * FROM companies WHERE id=?";
               var bindValues = [companyid];
               db.query(sql, bindValues, function(err, results){
                  if(results.length){
                  companylogo = results[0].companylogo;
                  }
                 });
               callback(null); 
       } else {
               callback("Invalid login"); 
       }
     });
  }
  //Get Salt from the database
  var sql = "SELECT * FROM staffs WHERE email=?";
  var bindValues = [email];
  db.query(sql, bindValues, function(err, myresults){
         if (err) throw err; 
         if(myresults.length){
            passwordsalt = myresults[0].passwordsalt;
            //Get PasswordHash
            bcrypt.hash(password, passwordsalt, function(err, hash) {
              hashedpassword = hash;
              validateLoginDetails(email, hashedpassword, function(err){
              if (err) {
                 res.end(JSON.stringify({status: "failed", message: "Invalid login"})); 
              } else {
                 res.end(JSON.stringify({status: "success", message: "Login successful", companyid: companyid, companyname: companyname, companylogo: companylogo, userid: userid, username: username, useremail: useremail, userimage: userimage, userposition: accounttype, accounttype: accounttype, logintoken: logintoken, logindevice: logindevice}));
              }
              });
            });
         } else {
            res.end(JSON.stringify({status: "failed", message: "Invalid login"})); 
         }
  });
}

//Forgot Password Model Logic
exports.forgotpassword = function(req, res){
  var email = customFunctions.dataFilter(req.body.email);
  var emailExist = '';
  var passwordremindercode = Math.random().toString(36).substr(2, 5);
  var passwordreminderdate = dateTime.create().format('d-m-Y');
  //Backend form validations
  if (email === "" || email === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your email"}));
  }
  //Check email from the database
  var sql = "SELECT * FROM staffs WHERE email=?";
  var bindValues = [email];
  db.query(sql, bindValues, function(err, results){
         if(results.length){
            emailExist = 'yes';
            //Update User record for reset in the database
            var sql = "UPDATE staffs SET passwordremindercode=?, passwordreminderdate=? WHERE email=?";
            var bindValues = [passwordremindercode,passwordreminderdate,email];
            db.query(sql, bindValues, function(err, results){ });
            //Send Automated Email
            var mailto=email;
            var mailsubject='Password Reset Request';
            var mailcontent="Hi, you requested for password reset on HSE-App, please click or visit the below link to reset and change your password <br><br> <br>Please note that this link is only valid within 24hours.<br> Regards,<br>HSE App Team.";
            customFunctions.sendCustomEmail(nodemailer,mailto,mailsubject,mailcontent);
            //Output & return result
            res.send(JSON.stringify({status: "success", message: "Reset link sent to your email"}));
         } else {
            emailExist = 'no';
            res.end(JSON.stringify({status: "failed", message: "Email not found on our database"}));
         }
  });
}

//Reset Password Model Logic
exports.resetpassword = function(req, res){
  var email = customFunctions.dataFilter(req.body.email);
  var code = customFunctions.dataFilter(req.body.code);
  var passwordsalt = '';
  var hashedpassword = '';
  var password = crypto.randomBytes(6).toString('hex');
  var date = dateTime.create().format('d-m-Y');
  //Backend form validations
  if (email === "" || email === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your email"}));
  }
  if (code === "" || code === "null") {
    res.end(JSON.stringify({status: "failed", message: "Please provide your code"}));
  }
  //Generate Salt and Hash Password
  bcrypt.genSalt(10, function(err, salt) {
    passwordsalt = salt;
    bcrypt.hash(password, salt, function(err, hash) {
    hashedpassword = hash;
    });
  });
  //Check email from the database
  var sql = "SELECT * FROM staffs WHERE email=? AND passwordremindercode=? AND passwordreminderdate=?";
  var bindValues = [email,code,date];
  db.query(sql, bindValues, function(err, results){
         if(results.length <=0){
            res.send(JSON.stringify({status: "failed", message: "Email not found on our database"})).end();
         } else {
            //Update User record with new password in the database
            var sql = "UPDATE staffs SET password=?, passwordsalt=?, passwordremindercode='null', passwordreminderdate='null' WHERE email=?";
            var bindValues = [hashedpassword,passwordsalt,email];
            db.query(sql, bindValues, function(err, results){ });
            //Send Automated Email
            var mailto=email;
            var mailsubject='New Password';
            var mailcontent="Hi, you requested for password reset on HSE-App, please find your new password below <br><br> New password: "+password+"<br>Regards,<br>HSE App Team.";
            customFunctions.sendCustomEmail(nodemailer,mailto,mailsubject,mailcontent);
            //Output & return result
            res.send(JSON.stringify({status: "success", message: "New password sent to your email"}));
         }
  });
}

//User Account Details Model Logic
exports.accountdetails = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
      	  //Get User Details from the database
          var sql = "SELECT * FROM staffs WHERE id=?";
          var bindValues = [userid];
          db.query(sql, bindValues, function(err, results){
              if(results.length){
		          //Output & return result
              res.end(JSON.stringify({status: "success", message: "Details", companyid: results[0].companyid, userid: results[0].id, username: results[0].username, userfirstname: results[0].firstname, userlastname: results[0].lastname, useremail: results[0].email, userphone: results[0].phone, userimage: results[0].photo, userlocation: results[0].location, userposition: results[0].role, accounttype: results[0].accounttype}));
              }
          });
     }
  });
}

//User Update Account Model Logic
exports.accountupdate = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var companyname = customFunctions.dataFilter(req.body.CompanyName);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var type = customFunctions.dataFilter(req.body.type);
            //Update to Database
              var username = customFunctions.dataFilter(req.body.username);
              var firstname = customFunctions.dataFilter(req.body.firstname);
              var lastname = customFunctions.dataFilter(req.body.lastname);
              var staffemail = customFunctions.dataFilter(req.body.email);
              var staffphone = customFunctions.dataFilter(req.body.phone);
              var password = customFunctions.dataFilter(req.body.password);
              var role = customFunctions.dataFilter(req.body.role);
              var location = customFunctions.dataFilter(req.body.location);
              var passwordsalt = '';
              var hashedpassword = '';
              if(password){
              //Generate Salt and Hash Password
              bcrypt.genSalt(10, function(err, salt) {
                passwordsalt = salt;
                bcrypt.hash(password, salt, function(err, hash) {
                  hashedpassword = hash;
                });
              });
              var sql = "UPDATE staffs SET password = ?, passwordsalt = ? WHERE companyid=? AND id=?";
              var bindValues = [hashedpassword, passwordsalt, companyid, userid];
              db.query(sql, bindValues, function(err, results){ });
              }
              if (req.files) {
              var myfile = req.files.photo;
              myfile.mv('uploads/' + req.files.photo.name, function(err) {
                if (err) throw err; 
              });
              var userphoto = 'uploads/' + req.files.photo.name;
              var sql = "UPDATE staffs SET photo = ? WHERE companyid=? AND id=?";
              var bindValues = [userphoto, companyid, userid];
              db.query(sql, bindValues, function(err, results){ if(err) throw err; });
              }
                  var sql = "UPDATE staffs SET username = ?, firstname = ?, lastname = ?, email = ?, phone = ?, role = ?, location = ? WHERE companyid=? AND id=?";
                  var bindValues = [username, firstname, lastname, staffemail, staffphone, role, location, companyid, userid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Updated successfully"})); });
     }
  });
}

//User Account Notifications Model Logic
exports.accountnotifications = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
          //Get User Details from the database
          var sql = "SELECT * FROM notifications WHERE `to`=? AND `status`='unread' ORDER BY id DESC";
          var bindValues = [userid];
          db.query(sql, bindValues, function(err, results){
              if(results.length){
              //Output & return result
              res.end(JSON.stringify(results));
              }
          });
     }
  });
}

//User Account Dashboard Details Model Logic
exports.dashboard = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var type = customFunctions.dataFilter(req.body.type);
        if (type==="statistics") {
            //Get User Details from the database
            var sql = "SELECT * FROM staffs WHERE id=?";
            var bindValues = [userid];
            db.query(sql, bindValues, function(err, results){
              if(results.length){
              //Output & return result
              res.end(JSON.stringify({status: "success", message: "Details", companyid: results[0].companyid, userid: results[0].id, username: results[0].username, useremail: results[0].email, userimage: results[0].photo, userposition: results[0].accounttype, accounttype: results[0].accounttype}));
              }
            });
        }
     }
  });
}

//User Company Policy Content Model Logic
exports.companypolicy = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var type = customFunctions.dataFilter(req.body.type);
            //Update Company Policy content to Database
            if(req.body.content){
              var mycontent = customFunctions.dataFilter(req.body.content);
              var sql = "UPDATE companies SET companypolicy=? WHERE id=?";
              var bindValues = [mycontent,companyid];
              db.query(sql, bindValues, function(err, results){ });
            }
            //Get Company Details from the database
            var sql = "SELECT * FROM companies WHERE id=?";
            var bindValues = [companyid];
            db.query(sql, bindValues, function(err, results){
              if(results.length){
              //Output & return result
              res.end(JSON.stringify({status: "success", message: "Updated successfully", content: results[0].companypolicy}));
              }
            });
     }
  });
}

//User Company Incidents Content Model Logic
exports.incidents = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var username = customFunctions.dataFilter(req.body.UserName);
        var type = customFunctions.dataFilter(req.body.type);
              // Form Data
              var myincidentID = customFunctions.dataFilter(req.body.incidentid);
              var myaction = customFunctions.dataFilter(req.body.action);
              var mycontent = customFunctions.dataFilter(req.body.content);
              var myproject = customFunctions.dataFilter(req.body.project);
              var mytype = customFunctions.dataFilter(req.body.type);
              var mystatus = customFunctions.dataFilter(req.body.status);
              var myassignedto = customFunctions.dataFilter(req.body.assignedto);
              var mystartdate = customFunctions.dataFilter(req.body.startdate);
              var myenddate = customFunctions.dataFilter(req.body.enddate);
              var mytime = dateTime.create().format('H:M:S');
              var mydate = dateTime.create().format('d-m-Y');
            //Post to Database
            if(myaction==="post"){ //Post Incident
              var sql = "INSERT INTO incidents SET companyid=?, userid=?, username=?, project=?, type=?, status=?, assignedto=?, startdate=?, enddate=?, details=?, time=?, date=?";
              var bindValues = [companyid, userid, username, myproject, mytype, mystatus, myassignedto, mystartdate, myenddate, mycontent, mytime, mydate];
              db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Posted successfully"})); });
            } else if(myaction==="update") { //Update Incident
              if(mystatus==="delete") { //Delete Action
                  var sql = "DELETE FROM incidents WHERE companyid=? AND id=?";
                  var bindValues = [companyid, myincidentID];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
              } else { //Update Action
                  var sql = "UPDATE incidents SET status=? WHERE companyid=? AND id=?";
                  var bindValues = [mystatus, companyid, myincidentID];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Updated successfully"})); });
              }
            } else { //Select Action
                  var sql = "SELECT * FROM incidents WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}

//User Company Staffs Model Logic
exports.staffs = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var companyname = customFunctions.dataFilter(req.body.CompanyName);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var type = customFunctions.dataFilter(req.body.type);
            //Post to Database
            if(req.body.action==="post"){
              var username = customFunctions.dataFilter(req.body.username);
              var firstname = customFunctions.dataFilter(req.body.firstname);
              var lastname = customFunctions.dataFilter(req.body.lastname);
              var staffemail = customFunctions.dataFilter(req.body.email);
              var staffphone = customFunctions.dataFilter(req.body.phone);
              var password = customFunctions.dataFilter(req.body.password);
              var location = customFunctions.dataFilter(req.body.location);
              var passwordsalt = '';
              var hashedpassword = '';
              var userphoto = 'uploads/avatar.png';
              var time = dateTime.create().format('H:M:S');
              var date = dateTime.create().format('d-m-Y');
              //Generate Salt and Hash Password
              bcrypt.genSalt(10, function(err, salt) {
                passwordsalt = salt;
                bcrypt.hash(password, salt, function(err, hash) {
                  hashedpassword = hash;
                });
              });
              var sql = "INSERT INTO staffs SET role = ?, companyid = ?, companyname = ?, username = ?, firstname = ?, lastname = ?, email = ?, phone = ?, photo = ?, password = ?, passwordsalt = ?, location = ?, date = ?";
              var bindValues = ['staff', companyid, companyname, username, firstname, lastname, staffemail, staffphone, userphoto, hashedpassword, passwordsalt, location, date];
              db.query(sql, bindValues, function(err, results){
                 res.end(JSON.stringify({status: "success", message: "Created successfully"}));
              }); 
            } else if(req.body.action==="update"){
              var staffid = customFunctions.dataFilter(req.body.staffid);
              var username = customFunctions.dataFilter(req.body.username);
              var firstname = customFunctions.dataFilter(req.body.firstname);
              var lastname = customFunctions.dataFilter(req.body.lastname);
              var staffemail = customFunctions.dataFilter(req.body.email);
              var staffphone = customFunctions.dataFilter(req.body.phone);
              var password = customFunctions.dataFilter(req.body.password);
              var passwordsalt = '';
              var hashedpassword = '';
              var userphoto = 'uploads/avatar.png';
              //Generate Salt and Hash Password
              bcrypt.genSalt(10, function(err, salt) {
                passwordsalt = salt;
                bcrypt.hash(password, salt, function(err, hash) {
                  hashedpassword = hash;
                });
              });
                  var sql = "UPDATE staffs SET username = ?, firstname = ?, lastname = ?, email = ?, phone = ?, photo = ?, password = ?, passwordsalt = ? WHERE companyid=? AND id=?";
                  var bindValues = [username, firstname, lastname, staffemail, staffphone, userphoto, hashedpassword, passwordsalt, companyid, staffid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Updated successfully"})); });
            } else if(req.body.action==="delete"){
              var staffid = customFunctions.dataFilter(req.body.staffid);
                  var sql = "DELETE FROM staffs WHERE companyid=? AND id=?";
                  var bindValues = [companyid, staffid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
            } else {
                  var sql = "SELECT * FROM staffs WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}

//User Company Projects Model Logic
exports.projects = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var companyname = customFunctions.dataFilter(req.body.CompanyName);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var type = customFunctions.dataFilter(req.body.type);
            //Post to Database
            if(req.body.action==="post"){
              var title = customFunctions.dataFilter(req.body.title);
              var type = customFunctions.dataFilter(req.body.type);
              var duration = customFunctions.dataFilter(req.body.duration);
              var status = customFunctions.dataFilter(req.body.status);
              var details = customFunctions.dataFilter(req.body.details);
              var time = dateTime.create().format('H:M:S');
              var date = dateTime.create().format('d-m-Y');
              var sql = "INSERT INTO projects SET companyid = ?, title = ?, type = ?, duration = ?, status = ?, details = ?, time = ?, date = ?";
              var bindValues = [companyid, title, type, duration, status, details, time, date];
              db.query(sql, bindValues, function(err, results){
                 res.end(JSON.stringify({status: "success", message: "Created successfully"}));
              }); 
            } else if(req.body.action==="update"){
              var projectid = customFunctions.dataFilter(req.body.projectid);
              var title = customFunctions.dataFilter(req.body.title);
              var type = customFunctions.dataFilter(req.body.type);
              var duration = customFunctions.dataFilter(req.body.duration);
              var status = customFunctions.dataFilter(req.body.status);
              var details = customFunctions.dataFilter(req.body.details);
                  var sql = "UPDATE projects SET title = ?, type = ?, duration = ?, status = ?, details = ? WHERE companyid=? AND id=?";
                  var bindValues = [title, type, duration, status, details, companyid, projectid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Updated successfully"})); });
            } else if(req.body.action==="delete"){
              var projectid = customFunctions.dataFilter(req.body.projectid);
                  var sql = "DELETE FROM projects WHERE companyid=? AND id=?";
                  var bindValues = [companyid, projectid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
            } else {
                  var sql = "SELECT * FROM projects WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(err) throw err;
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}

//User Company Action Tracker Model Logic
exports.actiontracker = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var username = customFunctions.dataFilter(req.body.UserName);
        var type = customFunctions.dataFilter(req.body.type);
              // Form Data
              var myactiontrackerID = customFunctions.dataFilter(req.body.actiontrackerid);
              var myaction = customFunctions.dataFilter(req.body.action);
              var mycontent = customFunctions.dataFilter(req.body.content);
              var myproject = customFunctions.dataFilter(req.body.project);
              var myunresolved = customFunctions.dataFilter(req.body.unresolved);
              var mystatus = customFunctions.dataFilter(req.body.status);
              var myassignedto = customFunctions.dataFilter(req.body.assignedto);
              var mytime = dateTime.create().format('H:M:S');
              var mydate = dateTime.create().format('d-m-Y');
            //Post to Database
            if(myaction==="post"){ //Post Incident
              var sql = "INSERT INTO actiontracker SET companyid=?, userid=?, username=?, project=?, unresolved=?, status=?, assignedto=?, details=?, time=?, date=?";
              var bindValues = [companyid, userid, username, myproject, myunresolved, mystatus, myassignedto, mycontent, mytime, mydate];
              db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Posted successfully"})); });
            } else if(myaction==="update") { //Update Incident
              if(mystatus==="delete") { //Delete Action
                  var sql = "DELETE FROM actiontracker WHERE companyid=? AND id=?";
                  var bindValues = [companyid, myactiontrackerID];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
              } else { //Update Action
                  var sql = "UPDATE actiontracker SET status=? WHERE companyid=? AND id=?";
                  var bindValues = [mystatus, companyid, myactiontrackerID];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Updated successfully"})); });
              }
            } else { //Select Action
                  var sql = "SELECT * FROM actiontracker WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}

//User Company Document/Files Model Logic
exports.documentfiles = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var username = customFunctions.dataFilter(req.body.UserName);
        var type = customFunctions.dataFilter(req.body.type);
              // Form Data
              var mypostid = customFunctions.dataFilter(req.body.documentfileid);
              var myaction = customFunctions.dataFilter(req.body.action);
              var mycontent = customFunctions.dataFilter(req.body.content);
              var mytitle = customFunctions.dataFilter(req.body.title);
              var mytype = customFunctions.dataFilter(req.body.type);
              var mytime = dateTime.create().format('H:M:S');
              var mydate = dateTime.create().format('d-m-Y');
            //Post to Database
            if(myaction==="post"){ //Post Incident
              var mediafile = req.files.mediafile;
              mediafile.mv('uploads/' + req.files.mediafile.name, function(err) {
                if (err) throw err; 
              });
              var myfile = 'uploads/' + req.files.mediafile.name;
              //SQL query
              var sql = "INSERT INTO documentfiles SET companyid=?, userid=?, username=?, mediafile=?, title=?, type=?, details=?, time=?, date=?";
              var bindValues = [companyid, userid, username, myfile, mytitle, mytype, mycontent, mytime, mydate];
              db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Posted successfully"})); });
            } else if(myaction==="update") { //Update Incident
                  var sql = "DELETE FROM documentfiles WHERE companyid=? AND id=?";
                  var bindValues = [companyid, mypostid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
            } else { //Select Action
                  var sql = "SELECT * FROM documentfiles WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}

//User Company Jobs Alerts Model Logic
exports.jobsalerts = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var username = customFunctions.dataFilter(req.body.UserName);
        var type = customFunctions.dataFilter(req.body.type);
              // Form Data
              var mypostid = customFunctions.dataFilter(req.body.postid);
              var myaction = customFunctions.dataFilter(req.body.action);
              var mycontent = customFunctions.dataFilter(req.body.content);
              var mytitle = customFunctions.dataFilter(req.body.title);
              //var mytype = customFunctions.dataFilter(req.body.type);
              var mytime = dateTime.create().format('H:M:S');
              var mydate = dateTime.create().format('d-m-Y');
            //Post to Database
            if(myaction==="post"){ //Post Incident
              var sql = "INSERT INTO jobalerts SET companyid=?, userid=?, username=?, title=?, details=?, time=?, date=?";
              var bindValues = [companyid, userid, username, mytitle, mycontent, mytime, mydate];
              db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Posted successfully"})); });
            } else if(myaction==="update") { //Update Incident
                  var sql = "DELETE FROM jobalerts WHERE companyid=? AND id=?";
                  var bindValues = [companyid, mypostid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
            } else { //Select Action
                  var sql = "SELECT * FROM jobalerts WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}

//User Company Emergency Mgt Model Logic
exports.emergencymgt = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var username = customFunctions.dataFilter(req.body.UserName);
        var type = customFunctions.dataFilter(req.body.type);
              // Form Data
              var mypostid = customFunctions.dataFilter(req.body.postid);
              var myaction = customFunctions.dataFilter(req.body.action);
              var mycontent = customFunctions.dataFilter(req.body.content);
              var mytitle = customFunctions.dataFilter(req.body.title);
              var mytime = dateTime.create().format('H:M:S');
              var mydate = dateTime.create().format('d-m-Y');
            //Post to Database
            if(myaction==="post"){ //Post Incident
              var sql = "INSERT INTO emergencymgt SET companyid=?, userid=?, username=?, title=?, details=?, time=?, date=?";
              var bindValues = [companyid, userid, username, mytitle, mycontent, mytime, mydate];
              db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Posted successfully"})); });
            } else if(myaction==="update") { //Update Incident
                  var sql = "DELETE FROM emergencymgt WHERE companyid=? AND id=?";
                  var bindValues = [companyid, mypostid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
            } else { //Select Action
                  var sql = "SELECT * FROM emergencymgt WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}

//User Company Trainings Model Logic
exports.trainings = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var username = customFunctions.dataFilter(req.body.UserName);
        var type = customFunctions.dataFilter(req.body.type);
              // Form Data
              var mypostid = customFunctions.dataFilter(req.body.postid);
              var myaction = customFunctions.dataFilter(req.body.action);
              var mycontent = customFunctions.dataFilter(req.body.content);
              var mytitle = customFunctions.dataFilter(req.body.title);
              var mytime = dateTime.create().format('H:M:S');
              var mydate = dateTime.create().format('d-m-Y');
            //Post to Database
            if(myaction==="post"){ //Post Incident
              var sql = "INSERT INTO trainings SET companyid=?, userid=?, username=?, title=?, details=?, time=?, date=?";
              var bindValues = [companyid, userid, username, mytitle, mycontent, mytime, mydate];
              db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Posted successfully"})); });
            } else if(myaction==="update") { //Update Incident
                  var sql = "DELETE FROM trainings WHERE companyid=? AND id=?";
                  var bindValues = [companyid, mypostid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
            } else { //Select Action
                  var sql = "SELECT * FROM trainings WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}

//User Company Scheduling Model Logic
exports.schedule = function(req, res){
  customFunctions.loggedInUsersAccessOnly(req, res, function(denyaccess){
     if (denyaccess) {
        res.end(JSON.stringify({status: "failed", message: "Invalid login access"})); 
     } else {
        var companyid = customFunctions.dataFilter(req.body.CompanyID);
        var userid = customFunctions.dataFilter(req.body.UserID);
        var username = customFunctions.dataFilter(req.body.UserName);
        var type = customFunctions.dataFilter(req.body.type);
              // Form Data
              var mypostid = customFunctions.dataFilter(req.body.postid);
              var myaction = customFunctions.dataFilter(req.body.action);
              var mycontent = customFunctions.dataFilter(req.body.content);
              var mytitle = customFunctions.dataFilter(req.body.title);
              var mytype = customFunctions.dataFilter(req.body.type);
              var mytime = dateTime.create().format('H:M:S');
              var mydate = dateTime.create().format('d-m-Y');
            //Post to Database
            if(myaction==="post"){ //Post Incident
              var sql = "INSERT INTO schedules SET companyid=?, userid=?, username=?, title=?, type=?, details=?, time=?, date=?";
              var bindValues = [companyid, userid, username, mytitle, mytype, mycontent, mytime, mydate];
              db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Posted successfully"})); });
            } else if(myaction==="update") { //Update Incident
                  var sql = "DELETE FROM schedules WHERE companyid=? AND id=?";
                  var bindValues = [companyid, mypostid];
                  db.query(sql, bindValues, function(err, results){ res.end(JSON.stringify({status: "success", message: "Deleted successfully"})); });
            } else { //Select Action
                  var sql = "SELECT * FROM schedules WHERE companyid=?";
                  var bindValues = [companyid];
                  db.query(sql, bindValues, function(err, results){
                      if(results.length){
                        res.end(JSON.stringify(results));
                      }
                  });
            }
     }
  });
}