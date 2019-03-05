$( document ).ready(function() {
    console.log( "ready!" );
});
var audio2= new Audio ('/static/music/rns_effect.mp3')
$(".navbar-brand").mouseover(function () {
  audio2.play();
})
