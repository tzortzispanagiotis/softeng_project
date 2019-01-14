$( document ).ready(function() {
    console.log( "ready!" );
});

$("#logout-btn").click(function(event) {
    event.preventDefault(); 
    
    myData = {
        token: localStorage.getItem("token")
    }

    $.ajax({
        url: "/observatory/api/logout",
        method: "POST",
        data: myData,
        success: function(data,status) {
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            alert("Logout successful. Redirect to main page.")
            $( location ).attr("href", "/");   
        }
    })
})