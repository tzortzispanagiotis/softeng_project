$( document ).ready(function() {
    console.log( "ready!" );
});
var mymap;
$.getScript("https://unpkg.com/leaflet@1.4.0/dist/leaflet.js",function(){
  console.log("mapedw");
  mymap= L.map('mapid').setView([37.975602, 23.733965], 14);
  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
  }).addTo(mymap);
});
