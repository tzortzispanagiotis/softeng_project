$( document ).ready(function() {
    console.log( "ready!" );
});

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

('#return-main').click(function(e) {
    e.preventDefault();
    //TODO
});

('#submit-cng-mail').click(function(e) {
    e.preventDefault();
   
});

('#submit-cng-pass').click(function(e) {
    e.preventDefault();
   
});