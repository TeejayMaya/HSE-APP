/** General Functions **/

//Form Success Function
function onSuccessForm(data, status)
        {
            var responsestatus = data.status;
            var responsemessage = data.message;
			    if(responsestatus==="success") {
				$(".alert").show();
				$(".alert").addClass("alert-success");
				$(".alert").removeClass("alert-danger");
				$(".alert").html(responsemessage);
				$(".alert").show();
				} else {
				$(".alert").addClass("alert-danger");
				$(".alert").removeClass("alert-success");
				$(".alert").html(responsemessage);
				$(".alert").show();
				}
        }
		
		
//Form Failure Function
function onErrorForm(data, status, xhr)
        {
            // handle an error
			alert("Error: " + data.responseText);
        }

//Login User Data Storage Function
function loginUserDataStorage(data)
        {
                if(data.status==="success") {
                localStorage.setItem('userlogin','true');
                localStorage.setItem('companyid', data.companyid);
                localStorage.setItem('companyname', data.companyname);
                localStorage.setItem('companylogo', data.companylogo);
                localStorage.setItem('userid', data.userid);
                localStorage.setItem('username', data.username);
                localStorage.setItem('useremail', data.useremail);
                localStorage.setItem('userphoto', data.userimage);
                localStorage.setItem('userphone', data.userphone);
                localStorage.setItem('userposition', data.userposition);
                localStorage.setItem('useraccounttype', data.accounttype);
                localStorage.setItem('LoginToken', data.logintoken);
                }
        }
		
		
/** Specific Functions **/

//Start Login Function    
$(document).ready(function() {
 $("#StaffLoginBTN").click(function(){
 var formData = new FormData($(".StaffLoginForm")[0]);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/login",
                    cache: false,
					crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
					async: true,
					contentType: false,
                    processData: false,
					beforeSend: function(){ $(".alert").show(); $(".alert").addClass("alert-info"); $(".alert").text('Connecting...'); },
                    success: function(data,status){ loginUserDataStorage(data); $(".alert").show(); $(".alert").html(data.message); if(data.status==="success"){ window.location='/overview'; } },
                    error: onErrorForm
                });
                return false;
 });
});
//End Login Function

//Start Register Function    
$(document).ready(function() {
 $("#CompanyRegisterBTN").click(function(){
 var formData = new FormData($(".CompanyRegisterForm")[0]);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/signup",
                    cache: false,
					crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
					async: true,
					contentType: false,
                    processData: false,
					beforeSend: function(){ $(".alert").show(); $(".alert").addClass("alert-info"); $(".alert").text('Connecting...'); },
                    success: function(data,status){ $(".alert").show(); $(".alert").html(data.message); },
                    error: onErrorForm
                });
                return false;
 });
});
//End Register Function

//Start Password Reset Function    
$(document).ready(function() {
 $("#StaffResetPasswordBTN").click(function(){
 var formData = new FormData($("#StaffResetPasswordForm")[0]);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/forgotpassword",
                    cache: false,
					crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
					async: true,
					contentType: false,
                    processData: false,
					beforeSend: function(){ $(".alert").show(); $(".alert").addClass("alert-info"); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Password Reset Function

//Start Account Update Function    
$(document).ready(function() {
 $("#AccountUpdateBTN").click(function(){
                var formData = new FormData($("#AccountUpdateForm")[0]);  
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/accountupdate",
                    cache: false,
					crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
					async: true,
					contentType: false,
                    processData: false,
					beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Account Update Function

//Start Account Update Company Policy Function    
$(document).ready(function() {
 $("#CompanyPolicyBTN").click(function(){
                var formData = new FormData($("#CompanyPolicyForm")[0]);  
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/company-policy",
                    cache: false,
					crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
					async: true,
					contentType: false,
                    processData: false,
					beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Account Update Company Policy Function

//Start Add Incident Function    
$(document).ready(function() {
 $("#AddIncidentBTN").click(function(){
                var formData = new FormData($("#AddIncidentForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/incident",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Incident Function

//Start Update Incident Function
function updateIncidentStatus(incidentID, incidentStatus)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('incidentid', incidentID);
                formData.append('status', incidentStatus);
                formData.append('action', 'update');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/incident",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Incident Function

//Start Add Action Tracker Function    
$(document).ready(function() {
 $("#AddActionTrackerBTN").click(function(){
                var formData = new FormData($("#AddActionTrackerForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/action-tracker",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Action Tracker Function

//Start Update Action Tracker Function
function updateActionTrackerStatus(ActionTrackerID, ActionTrackerIDStatus)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('actiontrackerid', ActionTrackerID);
                formData.append('status', ActionTrackerIDStatus);
                formData.append('action', 'update');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/action-tracker",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Action Tracker Function

//Start Add Document/File Function    
$(document).ready(function() {
 $("#AddDocumentFileBTN").click(function(){
                var formData = new FormData($("#AddDocumentFileForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/docs-files",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Document/File Function

//Start Update Document/File Function
function deleteDocumentFile(postID)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('documentfileid', postID);
                formData.append('action', 'delete');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/docs-files",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Document/File Function

//Start Download Document/File Function
function downloadDocumentFile(myfile)
{
                
}
//End Download Document/File Function

//Start Add Job Alert Function    
$(document).ready(function() {
 $("#AddJobAlertBTN").click(function(){
                var formData = new FormData($("#AddJobAlertForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/jobs-alerts",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Job Alert Function

//Start Update Job Alert Function
function deleteJobAlert(postID)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('postid', postID);
                formData.append('action', 'delete');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/jobs-alerts",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Job Alert Function

//Start Add Emergency Management Function    
$(document).ready(function() {
 $("#AddEmergencyManagementBTN").click(function(){
                var formData = new FormData($("#AddEmergencyManagementForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/emergency-mgt",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Emergency Management Function

//Start Update Emergency Management Function
function deleteEmergencyManagement(postID)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('postid', postID);
                formData.append('action', 'delete');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/emergency-mgt",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Emergency Management Function

//Start Add Training Function    
$(document).ready(function() {
 $("#AddTrainingBTN").click(function(){
                var formData = new FormData($("#AddTrainingForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/trainings",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Training Function

//Start Update Training Function
function deleteTraining(postID)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('postid', postID);
                formData.append('action', 'delete');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/trainings",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Training Function

//Start Add Schedule Function    
$(document).ready(function() {
 $("#AddScheduleBTN").click(function(){
                var formData = new FormData($("#AddScheduleForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/schedule",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Schedule Function

//Start Update Schedule Function
function deleteSchedule(postID)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('postid', postID);
                formData.append('action', 'delete');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/schedule",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Schedule Function

//Start Add Project Function    
$(document).ready(function() {
 $("#AddProjectBTN").click(function(){
                var formData = new FormData($("#AddProjectForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/projects",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Project Function

//Start Update Project Function
function deleteProject(postID)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('postid', postID);
                formData.append('action', 'delete');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/projects",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Project Function

//Start Add Staff Function    
$(document).ready(function() {
 $("#AddStaffBTN").click(function(){
                var formData = new FormData($("#AddStaffForm")[0]);
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('CompanyName', companyname);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/staffs",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ $(".alert").show(); $(".alert").text('Posting...'); },
                    success: onSuccessForm,
                    error: onErrorForm
                });
                return false;
 });
});
//End Add Staff Function

//Start Update Staff Function
function deleteStaff(postID)
{
                var formData = new FormData();
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                formData.append('staffid', postID);
                formData.append('action', 'delete');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/staffs",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: function(){ alert('Updating...'); },
                    success: function(data, status){ alert(data.message); },
                    error: onErrorForm
                });
}
//End Update Staff Function


//User Account Notifications Data Function
function getMyAccountNotifications()
        {
                var formData = new FormData();  
                formData.append('UserID', userid);
                formData.append('UserName', username);
                formData.append('CompanyID', companyid);
                formData.append('UserTOKEN', LoginToken);
                formData.append('UserDEVICE', LoginDevice);
                formData.append('UserAppVersion', appVersion);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/api/notifications",
                    cache: false,
                    crossDomain: true,
                    data: formData,
                    dataType: 'json', // Choosing a JSON datatype
                    async: true,
                    contentType: false,
                    processData: false,
                    success: function(data, status) { 
                        for (var i = 0, len = data.length; i < len; i++) {
                        $('#MyNotificationsMenu').append("<li><a href='javascript:void(0);'><span class='table-img msg-user'><img src='"+data[i].fromphoto+"' alt=''></span><span class='menu-info'><span class='menu-title'>"+data[i].from+"</span><span class='menu-desc'><i class='material-icons'>access_time</i> "+data[i].time+" "+data[i].date+"</span><span class='menu-desc'>"+data[i].details+"</span></span></a></li>");
                        };
                    }
                });
        }
        
$(document).ready(function() {
  if (localStorage.getItem('userid') && localStorage.getItem('companyid')){
    getMyAccountNotifications();
    $(".MyCompanyName").html(companyname);
    $(".MyProfilePhoto").attr('src', userphoto);
    $(".MyProfileName").html(username);
    $(".MyProfilePosition").html(userposition);
  }
});
//Intercept all Ajax requests
    /**$.ajaxSetup({
        dataFilter: function (data, type) {
            //modify the data
            if(data.message==="Invalid login access") { window.location.href = "/logout"; }
            return data;
        }
    });**/

