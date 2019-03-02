$( document ).ready(function() {
    console.log( "ready!" );
  });
  
$("#submit-btn").click(function(event) {
    event.preventDefault();

    var inputData = {
        name : $("#product-name").val(),
        description : $("#product-description").val(),
        category: $("#product-category").val(),
        tags: "a"
    }

    // var temp = inputData.address.split(" ")

    // var list = ""
    // for (var i in temp) {
    //     list = list + temp[i]
    //     list = list + "+"
    // }
    // list = list.substring(0, list.length - 1)


    $.ajax({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        url: "/observatory/api/products",
        method: "POST",
        data: inputData,
        
        success: function(data,status) {
            alert("Το προιον προστέθηκε επιτυχώς!")
            $( location ).attr("href", "/");
        },
        error: function(data,status) {
            console.log(status)
            alert("Αποτυχία. Προσπαθήστε ξανά")
            $( location ).attr("href", "/insertproduct");
        }
    })
})
  