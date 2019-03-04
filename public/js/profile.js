$( document ).ready(function() {
    console.log( "ready!" );
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

$('#btn-change-pass').click(function(e) {
    e.preventDefault();
    $("#password-change").delay(100).fadeIn(100);
    $("#main").fadeOut(100);
});

$('#btn-change-email').click(function(e) {
    e.preventDefault();
    $("#email-change").delay(100).fadeIn(100);
    $("#main").fadeOut(100);
});

$('#btn-show-prices').click(function(e) {
    e.preventDefault();
    $("#list-prices").delay(100).fadeIn(100);
    $("#main").fadeOut(100);
});
 
$('#return-main').click(function(e) {
    e.preventDefault();
    var temp = []
    temp = '/profile?token=' + localStorage.getItem('token')
    $( location ).attr("href", temp) //to fix ???
//     //TODO
});

$('#submit-cng-mail').click(function(e) {
    e.preventDefault();

    var oldMail = $("#old-mail").val()
    var mail1   = $("#new-mail").val()
    var mail2   = $("#new-mail-2").val()
   
    if ((mail1 != mail2) || (!validateEmail(mail1)) || (!validateEmail(mail2)) || (!validateEmail(oldMail))) {
        alert("Λαθος. Ελέγξτε τα στοιχεία σας και ξαναπροσπαθήστε")
    }
    else {
        var myData = {
            oldMail : oldMail,
            newMail : mail1
        }

        $.ajax({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            url: "/mailchange",
            method: "POST",
            data: myData,
            success: function(data,status) {
                alert("Το email σας άλλαξε. Ανακατεύθυνση στην αρχική σελίδα")
                $( location ).attr("href", "/")
            },
            error: function(data,status) {
                alert("Αποτυχία. Δοκιμάστε ξανά")
            }
        })
    }
});

$('#submit-cng-pass').click(function(e) {
    e.preventDefault();

    var oldPassword = $("#old-password").val()
    var mail1   = $("#new-password").val()
    var mail2   = $("#new-password-2").val()
   
    if ((mail1 != mail2)) {
        alert("Λαθος. Ελέγξτε τα στοιχεία σας και ξαναπροσπαθήστε")
    }
    else {
        var myData = {
            oldPassword : oldPassword,
            newPassword : mail1
        }

        $.ajax({
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            url: "/passwordchange",
            method: "POST",
            data: myData,
            success: function(data,status) {
                alert("Το password σας άλλαξε. Ανακατεύθυνση στην αρχική σελίδα")
                $( location ).attr("href", "/")
            },
            error: function(data,status) {
                alert("Αποτυχία. Δοκιμάστε ξανά")
            }
        })
    }
   
});