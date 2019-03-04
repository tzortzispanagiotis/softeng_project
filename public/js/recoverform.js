$( document ).ready(function() {
    console.log( "ready!" );
});

$("#submit").click(function(event) {
    event.preventDefault();

    var myData = {
        email : $("#email").val()
    }

    console.log(myData)

    $.ajax({
        url: "/recoverpassword",
        method: "POST",
        data: myData,
        success: function(data,status) {
            alert("Email Sent. Check Your Email")
            $( location ).attr("href", "/");
        },
        error: function(data,status) {
            alert("Failed. Try Again")
            $( location ).attr("href", "/recoverpassword");
        }
    })

})