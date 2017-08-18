$(document).ready(function () {
    FB.init({
        appId: '2100813633278010',
        cookie: true,
        xfbml: true,
        version: 'v2.10'
    });
    checkLoginState();
});
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}
function statusChangeCallback(response) {
        if (response.status === 'connected') {
            $.ajax({
                type: "POST",
                url: "api/checklogin.php",
                data: "userid=" + response.authResponse.userID,
                success: function (data) {
                    if(window.location.pathname == "/Worldwiders/index.php"){
                        window.location = "home.php"
                    }
                    if(data < 0 ){
                        user_signup(); 
                    }
            }
          });
          return;
        } 
        if (response.status === 'not_authorized') {
            FB.login(function (response) {
                statusChangeCallback2(response);
            }, {scope: 'public_profile,email'});
        } else {
            if(window.location.pathname != "/Worldwiders/index.php"){
                window.location = "index.php"
            }
        }
      }
      function statusChangeCallback2(response) {
         $.ajax({
            type: "POST",
            url: "api/checklogin.php",
            data: "userid=" + response.authResponse.userID,
            success: function (data) {
                if(data < 0 ){
                    user_signup(); 
                }
            }
          });
      }
      function user_signup() {
        console.log('Welcome! Fetching your information.... ');
        FB.api('/me', 
            {fields: "id,about,picture,birthday,email,gender,hometown,location,name"}, function (response) {
            insert(response);
            function insert(response) {
              var id = response.id;
              var name = response.name;
              var email = response.email;
              var location = response.location.name;
              var nationality = response.hometown.name;
              var birthdate = response.birthday;
              
              $.ajax({
                  type: "POST",
                  url: "api/insert.php?action=login",
                  data: "name=" + name + "&email=" + email + "&userid="+ id +"&location="+ location +"&nationality="+ nationality +"&birthdate="+ birthdate,
                  success: function (data) {
                     if(window.location.pathname != "/Worldwiders/home.php"){
                        window.location = "home.php"
                     }
                  }
              });
            }
        });
      }