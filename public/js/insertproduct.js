$( document ).ready(function() {
    console.log( "ready!" );
  });
  
$("#submit-btn").click(function(event) {
    event.preventDefault();

    var inputData = {
        name : $("#product-name").val(),
        description : $("#product-description").val(),
        category: $("#product-category").val(),
        tags: $("#product-tags").val()
    }

    var temp = inputData.tags.split(" ")

    var list = ""
    for (var i in temp) {
        list = list + temp[i]
        list = list + ","
    }
    list1 = list.substring(0, list.length - 1)

    var finalinputData = {
        name : inputData.name,
        description : inputData.description,
        category: inputData.category,
        tags: list1
    }
    
    
    $.ajax({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        url: "/observatory/api/products",
        method: "POST",
        data: finalinputData, //
        
        success: function(data,status) {
            alert("Το προιον προστέθηκε επιτυχώς!")
            $( location ).attr("href", "/insertprice");
        },
        error: function(data,status) {
            console.log(status)
            alert("Αποτυχία. Προσπαθήστε ξανά")
            $( location ).attr("href", "/insertproduct");
        }
    })
})
  