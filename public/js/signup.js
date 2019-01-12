$( document ).ready(function() {
    console.log( "ready!" );
});
//elegxos an oi kwdikoi einai idioi metaxy tous
$("#password2").focusout(function (){
  if ($("#password1").val()!=$("#password2").val()) {
    $( "#psw2" ).addClass("show");
    $( "#psw2" ).removeClass("dontshow");
  }
  else {
    $( "#psw2" ).addClass("dontshow");
    $( "#psw2" ).removeClass("show");
  }
})
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

//otan path8ei to signup-btn kanei post sto observatory/api/signup
//an epityxei mas kanei redirect sto /login
//alliws petaei alert
$("#signup-btn").click(function(event) {
  event.preventDefault();
  var myData ={
    username: $("#username").val(),
    password: $("#password1").val(),
    email: $("#email").val(),
    role: 'USER'
  }
  $.ajax({
       url: "observatory/api/signup",
       method: "POST",
       data: myData,
       success: function(data,status) {
           $( location ).attr("href", "/login");
       },
       error: function(data,status) {
           alert("Κατι δεν δουλεύει")
           $( location ).attr("href", "/signup");
       }
   })

});
