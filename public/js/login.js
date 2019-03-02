$( document ).ready(function() {
    console.log( "ready!" );
});

$("#login-btn").click(function(event) {
    event.preventDefault();

    var myData = {
        username : $("#login-username").val(),
        password : $("#password").val()
    }

    $.ajax({
        url: "/observatory/api/login",
        method: "POST",
        data: myData,
        success: function(data,status) {
            var token = data.token
            localStorage.setItem("token", token)
            localStorage.setItem("username", myData.username)
            $( location ).attr("href", "/");
        },
        error: function(data,status) {
            alert("Wrong password or username")
            $( location ).attr("href", "/login");
        }
    })

})
