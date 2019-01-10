$( document ).ready(function() {
    console.log( "ready!" );
});

$("#login-btn").click(function(event) {
    event.preventDefault(); 
    
    var myData = {
        username : $("#username").val(),
        password : $("#password").val()
    }
    console.log(myData)

    $.ajax({
        url: "/observatory/api/login",
        method: "POST",
        data: myData,
        success: function(data,status) {
            if (status == 'success') {
                var token = data.token
                localStorage.setItem("token", token)
                $( location ).attr("href", "/");
            }
            else {
                alert("Λάθος κώδιξ προσβάσεως")
            }
            
        }
        })
                    
})   
