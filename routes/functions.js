//Abstract Class/Functions
module.exports = {

   loggedInUsersAccessOnly(request, response, callback) {
        var sql = "SELECT * FROM staffs WHERE id=? AND logintoken=?";
        var bindValues = [customFunctions.dataFilter(request.body.UserID), customFunctions.dataFilter(request.body.UserTOKEN)];
        db.query(sql, bindValues, function(err, results){
            if(results.length){
              callback(null); 
            } else {
              callback("Invalid login access"); 
              //response.redirect('/login');
              //response.end();
            }
        });
      /**if (request.session.userid) {
      	//Logged In
      	//Get Company Details from the database
        var sql = "SELECT * FROM staffs WHERE id=? AND logintoken=?";
        var bindValues = [customFunctions.dataFilter(request.body.UserID), customFunctions.dataFilter(request.body.UserTOKEN)];
        db.query(sql, bindValues, function(err, results){
            if(results.length){
		    callback(null); 
            } else {
		    callback("Invalid login access"); 
        //response.redirect('/login');
        //response.end();
            }
        });
	    } else {
		   //response.sendFile(__parentDir + '/view/login-register.html');
		   callback("Invalid login access"); 
		   //response.redirect('/logout');
		   //response.end();
	    }**/
   },

   dataFilter(text) {
      //console.log(text);
      return text;
   },

   sendCustomEmail(nodemailer,mailto,mailsubject,mailcontent) {
      var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
      });

      var mailOptions = {
      from: 'youremail@gmail.com',
      to: mailto,
      subject: mailsubject,
      text: mailcontent
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
   }

};