$( document ).ready(function() {
    console.log( "ready!" );
  });


$("#shop-choices").change(function(event) {
    event.preventDefault();
    if ($(this).val() === 'add') {
        // Do something for option "b"
        $( location ).attr("href", "/insertshop");
    }
    
})

$("#product-choices").change(function(event) {
    event.preventDefault();
    if ($(this).val() === 'add') {
        // Do something for option "b"
        $( location ).attr("href", "/insertproduct");
    }
    
})

$("#shop-submit-btn").click(function(event) {
    event.preventDefault();

    $("#price-form").delay(100).fadeIn(100);
    $("#shop-choice-form").fadeOut(100);

    area = $("#shop-location").val()

    var geocode = {}
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address="+area+"&key=AIzaSyCL-EHbgBsjgKSaP4hZ38JFx2GtLv9R5wM",
        method: "GET",
        success: function(data,status) {
            geocode.lat = data.results[0].geometry.location.lat
            geocode.lng = data.results[0].geometry.location.lng

            $.ajax({
                url: "/observatory/api/prices?geoDist=5&geoLng="+geocode.lng+"&geoLat="+geocode.lat,
                method: "GET",
                success: function(data,status) {
                    console.log(data)
                },
                error: function(data,status) {
                    
                }
            })

        },
        error: function(data,status){
            console.log("error!!!!")
        }
    })

})