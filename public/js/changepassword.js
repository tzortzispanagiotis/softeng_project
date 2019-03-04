$( document ).ready(function() {
    console.log( "ready!" );
});

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

$("#submit").click(function(event) {
    event.preventDefault();

    var pw1 = $("#password-1").val()
    var pw2 = $("#password-2").val()

    if (pw1 == pw2) {
        var myData = {
            password: pw1,
            token: getQueryVariable('token')
        }
        console.log(myData)
        if (!myData.token) alert("Try Again")
        else {
            $.ajax({
                url: "/forgottenpassword",
                method: "POST",
                data: myData,
                success: function(data,status) {
                    alert("Ο κωδικός άλλαξε. Ανακατεύθυνση στο login..")
                    $( location ).attr("href", "/login");
                },
                error: function(data,status) {
                    alert("Failed. Try Again")
                    $( location ).attr("href", "/recoverpassword");
                }
            })
        }
    }
    else {
        alert("Try again, password does not match")
    }
    

})