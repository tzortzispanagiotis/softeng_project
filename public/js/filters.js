$( document ).ready(function() {
    console.log( "ready!" );
});
/*Dilwseis synarthsewn
===================================*/
//synarthsh xeirismou tou Slider
var min_price;
var max_price;
var slider=$("#myRange");
var output=$("#showval");
function price_range() {
  $.ajax({
       url: "https://jsonplaceholder.typicode.com/posts",
       method: "GET",
       success: function(data,status) {
         min_price=data[0].id;
         max_price=data[0].id;
         for(var i=1;i<data.length;i++){
           if(data[i].id>max_price){
             max_price=data[i].id;
           }
           else if (data[i].id<min_price){
             min_price=data[i].id;
           }
         }
         slider.attr("min",min_price);
         slider.attr("max",max_price);
         slider.attr("value",max_price);
         output.html(slider.attr("value"));
       },
       error: function(data,status) {
         console.log(status);
       }
   })
}
//voi8itiki synarthsh gia fuel range
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

//emfanizei apo vash typous kausimou
function fuel_range(){
  $.ajax({
    url: "observatory/api/products ",
    method: "GET",
    success: function(data,status) {
      var unique=[];
      for (var i = 0; i < data.products.length; i++) {
        unique.push(data.products[i].name);
      }
      unique = unique.filter( onlyUnique );
      for(var i=0;i<unique.length;i++){
        $("#fuelbuttons").append('<button type="button" class="btn btn-primary btn-md btn-block"'+'id="fuelbutton'+i+'">' +unique[i]+"</button>");
      }
      if (i%2==1){
        $("#fuelbutton"+(i-1)).addClass("whole");
      }
    }

  })
}

function shops(){
  $.ajax({
    url: "observatory/api/shops ",
    method: "GET",
    success: function(data,status) {
      console.log(data);
      var unique=[];
      for (var i = 0; i < data.shops.length; i++) {
        unique.push(data.shops[i].name);  //edw na ginei typos
      }
      unique = unique.filter( onlyUnique );
      for(var i=0;i<unique.length;i++){
        $("#shopbuttons").append('<button type="button" class="btn btn-primary btn-md btn-block"'+'id=shopbutton'+i+'">' +unique[i]+"</button>");
      }
      /*if (i%2==1){
        $("#shopbuttons"+(i-1)).addClass("whole");
      }*/
    }

  })
}
/*Telos dilwsewn
=================================================*/
price_range();
fuel_range();
shops();

//real time ektypwsh ths epilegmenis timis
slider.on('input',function() {
  output.html(this.value);
});
