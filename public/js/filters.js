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
         slider.attr("value",(min_price+max_price)/2);
         output.html(slider.attr("value"));
       },
       error: function(data,status) {
         console.log(status);
       }
   })
}
//emfanizei apo vash typous kausimou
function fuel_range(){
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    success: function(data,status) {
      for(var i=0;i<8;i++){
        $("#fuelbuttons").append('<button type="button" class="filterbutton"'+'id="fuelbutton'+i+'">' +"ΒΕΝΖΙΝΑ"+"</button>");
      }
      if (i%2==1){
        $("#fuelbutton"+(i-1)).addClass("whole");
      }
    }

  })
}
/*Telos dilwsewn
=================================================*/
price_range();
fuel_range();


//real time ektypwsh ths epilegmenis timis
slider.on('input',function() {
  output.html(this.value);
});
