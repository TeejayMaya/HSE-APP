//Package/Module dependencies declaration
var mysql = require('mysql');
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'hseapp_user',
              password : '',
              database : 'hse_app'
            });
 
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Export Model Logic
module.exports = connection;