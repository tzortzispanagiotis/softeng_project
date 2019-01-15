$( document ).ready(function() {
    console.log( "ready!" );
});

//elegxei an o kwdikos einai egkyros, exw 8ewrisei 4-20 psifia
$("#password1").focusout(function (){
  if ($( this ).val().length <4 || $(this).val().length>20) {
    $( "#psw1" ).addClass("show");
    $( "#psw1" ).removeClass("dontshow");
  }
  else {
    $( "#psw1" ).addClass("dontshow");
    $( "#psw1" ).removeClass("show");
  }
})
//svini to minimataki katw ap to username
$("#username").focusout(function () {
  if($(this).val()!=""){
    $( "#usr" ).addClass("dontshow");
    $( "#usr" ).removeClass("show");
  }
})
//svini to minimataki katw ap to email
$("#email1").focusout(function () {
  if($(this).val()!=""){
    $( "#eml" ).addClass("dontshow");
    $( "#eml" ).removeClass("show");
  }
})
//otan path8ei to signup-btn kanei post sto observatory/api/signup
//an epityxei mas kanei redirect sto /login
//alliws petaei alert
//elegxei an kapoio pedio einai keno
$("#signup-btn").click(function(event) {
  var myData ={
    username: $("#username").val(),
    password: $("#password1").val(),
    email: $("#email1").val(),
    role: 'USER'
  }
 
  if($("#username").val()==""){
    $( "#usr" ).addClass("show");
    $( "#usr" ).removeClass("dontshow");
  }
  else if ($("#email1").val()=="") {
    $( "#eml" ).addClass("show");
    $( "#eml" ).removeClass("dontshow");
  }
  else if ($("#password1").val()=="") {
    $( "#psw1" ).addClass("show");
    $( "#psw1" ).removeClass("dontshow");
  }
  else if ($("#password1").val()!=$("#password2").val()) {
    $( "#psw2" ).addClass("show");
    $( "#psw2" ).removeClass("dontshow");
  }
  else {
    event.preventDefault();
    $( "#psw2" ).addClass("dontshow");
    $( "#psw2" ).removeClass("show");
    $.ajax({
        url: "observatory/api/signup",
        method: "POST",
        data: myData,
        success: function(data,status) {
          alert("Εγγραφή επιτυχής!")
          $( location ).attr("href", "/login");
         },
         error: function(data,status) {
           alert("Κατι δεν δουλεύει")
           $( location ).attr("href", "/login");
         }
      })
  }
});
