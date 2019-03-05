$( document ).ready(function() {
    console.log( "ready!" );
  });
  
$("#submit-btn").click(function(event) {
    event.preventDefault();

    var inputData = {
        name : $("#shop-name").val(),
        address : $("#shop-address").val(),
        tags: $("#sel1").val()
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
            
            createData = {
                name : inputData.name,
                address : inputData.address,
                lng : geocode.lng,
                lat : geocode.lat,
                tags : inputData.tags
            }

            $.ajax({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                url: "/observatory/api/shops",
                method: "POST",
                data: createData,
                
                success: function(data,status) {
                    alert("Το κατάστημα προστέθηκε επιτυχώς!")
                    $( location ).attr("href", "/insertprice");
                },
                error: function(data,status) {
                    alert("Αποτυχία. Προσπαθήστε ξανά")
                    $( location ).attr("href", "/insertshop");
                }
            })
        },
        error: function(data,status) {
            alert("PULO")
        }
    })
})
  