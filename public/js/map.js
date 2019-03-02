var map;
function createmap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.906053, lng: 23.732894},
    zoom: 12
  });
  console.log("ple");
}
