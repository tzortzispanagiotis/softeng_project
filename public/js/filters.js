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
       url: "observatory/api/prices",
       method: "GET",
       success: function(data,status) {
         min_price=data[0].price;
         max_price=data[0].price;
         for(var i=1;i<data.length;i++){
           if(data[i].price>max_price){
             max_price=data[i].price;
           }
           else if (data[i].price<min_price){
             min_price=data[i].price;
           }
         }
         slider.attr("min",min_price);
         slider.attr("max",max_price);
         slider.attr("value",max_price);
         output.html(Number(slider.attr("value")).toFixed(3));
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
        unique.push(data.products[i].category);
      }
      var vars = getQueryVars();
      unique = unique.filter( onlyUnique );
      for(var i=0;i<unique.length;i++){
          if(unique[i] === decodeURIComponent(vars.cat)){
            $("#fuelbuttons").append('<button type="button" class="category-btn btn btn-primary text-wrap btn-md doubles"'+'id="fuelbutton'+i+'">' +unique[i]+"</button>");
          } else {
            $("#fuelbuttons").append('<button type="button" class="category-btn btn btn-outline-primary text-wrap btn-md doubles"'+'id="fuelbutton'+i+'">' +unique[i]+"</button>");
          }
      }
      if (i%2==1){
        $("#fuelbutton"+(i-1)).addClass("w-100");
      }
      $(".category-btn").click(function (event){
          cat = event.currentTarget.innerText
          var url = '/searchResults?';
          var u = [];
          if(cat) {
            u.push('cat=' + cat);
          }
          if (vars.lat) {
            u.push('lat=' + vars.lat);
          }
          if(vars.lng) {
            u.push('lng=' + vars.lng);
          }
          u.map((u, index) => {
            if(index === 0) {
              url += u;
            } else {
              url += '&' + u;
            }
          })
          window.location.assign(url);
      })
      // @TODO to be implemented
      // $('.category-btn').on('click', function(event){
      //   $('.category-btn').css('class', )
      //   var element = event.currentTarget;
      // });
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
        unique.push(data.shops[i].tags[0]);  //edw na ginei typoscategory
      }
      unique = unique.filter( onlyUnique );
      for(var i=0;i<unique.length;i++){
        $("#shopbuttons").append('<button type="button" class="shops-btn btn btn-outline-primary text-wrap btn-md doubles"'+'id=shopbutton'+i+'">' +unique[i]+"</button>");
      }
      if (i%2==1){
        $("#shopbuttons"+(i-1)).addClass("w-100");
      }
    }

  })
}

function updateButtonSelected(event) {
  console.log(event);
}

function getQueryVars(){
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  var lng = vars["lng"];
  var lat = vars["lat"];
  var cat = vars["cat"];
  return { lng, lat, cat}
}


function searchResults() {
  var vars = getQueryVars();
  var lng = vars.lng;
  var lat = vars.lat;
  var cat = vars.cat;

  $.get('/observatory/api/products?cat=' + cat, function(response, status) {
    var productsInCategory = response.products;
    console.log(productsInCategory);
    var pricesQuery = '/observatory/api/prices?' + productsInCategory.map((p, index) => {
      return index !== 0 ? '&productId=' + p.id: 'productId=' + p.id
    }).join('') + '&geoDist=100&geoLat=' + lat + '&geoLng=' + lng + '&sort=price|ASC'
    $.get(pricesQuery, function(prices) {
      console.log(prices);
      var html = '';
      prices.forEach(price => {
        html += `
        <div class="col-md-6">
          <div class="card mb-3">
            <div class="card-header">${price.shop.address}</div>
            <div class="card-body">
              <div class="float-right">
                ${price.price.toFixed(3)} &euro;
              </div>
              <div>
                ${price.date}
              </div>
            </div>
            <div class="card-footer">${price.product.name} | ${price.product.category}</div>
          </div>
        </div>
        `
      })
      $('#results').html(html);
    })
  })


  // var pricesQuery = '/observatory/api/prices?' + productsInCategory.map(p => p.id)
  // $.get('/observatory/api/prices?productId=' )



}

/*Telos dilwsewn
=================================================*/
$(document).ready(function() {
  price_range();
  fuel_range();
  shops();
  searchResults();
})
//real time ektypwsh ths epilegmenis timis
slider.on('input',function() {
  output.html(this.value);
});
