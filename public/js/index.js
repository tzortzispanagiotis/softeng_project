$( document ).ready(function() {
    console.log( "ready!" );
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

var unique=[];
//zitaei apo ti vasi ta names twn proiontwn kai ta typwnei
function show_alternatives() {
  $.ajax({
    url: "observatory/api/products ",
    method: "GET",
    success: function(data,status) {
      //console.log(data);
      for (var i = 0; i < data.products.length; i++) {
        unique.push(data.products[i].category);
      }
      unique = unique.filter( onlyUnique );
      for(var i=0;i<unique.length;i++){
        $('#select').append("<option value=\""+unique[i]+"\">"+unique[i]+"</option>")
      }
    }

  })
}

show_alternatives()

$("#btn-src").click(function(event) {
  event.preventDefault();

  inputData = {
    productCategory: $("#select").val(),
    address: $("#address").val()
  }

  var temp = inputData.address.split(" ")

    var list = ""
    for (var i in temp) {
        list = list + temp[i]
        list = list + "+"
    }
    list = list.substring(0, list.length - 1)

    var geocode = {}
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+list+"&key=AIzaSyCL-EHbgBsjgKSaP4hZ38JFx2GtLv9R5wM",
        method: "GET",
        success: function(data,status) {
            geocode.lat = data.results[0].geometry.location.lat
            geocode.lng = data.results[0].geometry.location.lng
            if (inputData.productCategory != 'Καύσιμο') {
              $( location ).attr("href", "/searchresults?lat="+geocode.lat+"&lng="+geocode.lng+"&cat="+inputData.productCategory)
            }
            else {
              $( location ).attr("href", "/searchresults?lat="+geocode.lat+"&lng="+geocode.lng)
            }
        },
        error: function(data,status) {
          alert("PULO")
        }
  })
})

