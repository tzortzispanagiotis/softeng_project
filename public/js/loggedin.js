$( document ).ready(function() {
    console.log( "ready!" );
}); 

function show_loggedin(){
if (localStorage.token!=null){
  $("#list").prepend('<li class="nav-item" id="loggedin" title="Εισαγωγη τιμής"><a class="nav-link" href="/insertprice">Εισαγωγη τιμής</a></li>');
  $("#list").prepend('<li class="nav-item" id="loggedin" title="Δες το προφιλ σου"><a class="nav-link" href="/profile?token='+localStorage.token+"\">"+"Προβολή προφίλ("+localStorage.username+')</a></li>');
  $("#login").html('<a class="nav-link" href="">Αποσύνδεση</a>').attr("name","logout");
}
else {
  $("#login").html('<a class="nav-link" href="">Συνδέσου</a>').attr("name","login");
  $("#loggedin").remove();
}
}

show_loggedin();

$("#login").click(function (event,status){
    event.preventDefault();
    myData = {
        token: localStorage.getItem("token")
    }
    if ($(this).attr("name")=="logout") {
      $.ajax({
          url: "/observatory/api/logout",
          method: "POST",
          data: myData,
          success: function(data,status) {
              localStorage.removeItem("token")
              localStorage.removeItem("username")
              alert("Logout successful. Redirect to main page.")
              show_loggedin()
              $( location ).attr("href", "/");
          }
      })
    }
  else {
    $( location ).attr("href", "/login");
  }
})
