distanceFunctions = {}

function toRadians (angle) {
    pi = Math.PI
    return angle * (pi / 180);
  }
//distance function for price query
distanceFunctions.distance = (lat1,lat2,lon1,lon2) => {
    console.log(lat1)
    console.log(lat2)

    var R = 6371e3; // metres
    var f1 = lat1.toRadians()
    var f2 = lat2.toRadians();
    var Df = (lat2-lat1).toRadians();
    var Dl = (lon2-lon1).toRadians();
    var a = Math.sin(Df/2) * Math.sin(Df/2) +
            Math.cos(f1) * Math.cos(f2) *
            Math.sin(Dl/2) * Math.sin(Dl/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d ; 
}

module.exports = distanceFunctions