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
