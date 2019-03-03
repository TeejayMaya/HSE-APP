var userlogin = localStorage.getItem('userlogin');
var companyid = localStorage.getItem('companyid');
var companyname = localStorage.getItem('companyname');
var companylogo = localStorage.getItem('companylogo');
var userid = localStorage.getItem('userid');
var username = localStorage.getItem('username');
var useremail = localStorage.getItem('useremail');
var userphone = localStorage.getItem('userphone');
var userphoto = localStorage.getItem('userphoto');
var userposition = localStorage.getItem('userposition');
var useraccounttype = localStorage.getItem('useraccounttype');
var LoginToken = localStorage.getItem('LoginToken');
var LoginDevice = localStorage.getItem('LoginDevice');
var PushToken = localStorage.getItem('PushTokenDevice');
var url = location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var appVersion = "1.1.6";

// Login Check With localStorage
if (localStorage.getItem('userid') && (filename === 'login' || filename === 'signup' || filename === 'forgotpassword' || filename === 'index')) {
   //it doesnt exist
   window.location.href="/overview";
} else if (!localStorage.getItem('userid') && (filename !== 'login' && filename !== 'signup' && filename !== 'forgotpassword' && filename !== 'index')) {
   // do something else maybe
   window.location.href = "/logout";
}


// Append User Login Token To All URL API Requests
var appToken="UserID="+userid+"&UserAccountType="+useraccounttype+"&UserTOKEN="+LoginToken+"&UserDEVICE="+LoginDevice+"&UserAppVersion="+appVersion+"&origin=MobileApp";
var appUserToken="/"+userid+"/"+useraccounttype+"/"+LoginToken+"/"+LoginDevice+"/"+appVersion+"/MobileApp";
var appUserTokenString="UserID="+userid+"&UserAccountType="+useraccounttype+"&UserTOKEN="+LoginToken+"&UserDEVICE="+LoginDevice+"&UserAppVersion="+appVersion+"&origin=MobileApp";