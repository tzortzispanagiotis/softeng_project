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
         slider.attr("value",(min_price+max_price)/2);
         output.html(Number(slider.attr("value")).toFixed(3));
       },
       error: function(data,status) {
         console.log(status);
       }
   })
}

var distance_slider = $("#myDistance");
var distance_output= $("#showdistval");
function distance_range(){
  distance_slider.attr("min",1);
  distance_slider.attr("max",15);
  distance_slider.attr("value",5);
  distance_output.html(5);
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
    }

  })
}


function shops(){
  $.ajax({
    url: "observatory/api/shops ",
    method: "GET",
    success: function(data,status) {
      //console.log(data);
      var unique=[];
      var corp;
      var vars=getQueryVars();
      var prevcorp= vars.corp ?  vars.corp.split(','):[];
      console.log(prevcorp);
      for (var i = 0; i < data.shops.length; i++) {
        unique.push(data.shops[i].tags[0]);  //edw na ginei typoscategory
      }
      unique = unique.filter( onlyUnique );
      for(var i=0;i<unique.length;i++){
        var flag=0;
        for (var j=0;j<prevcorp.length;j++){
          if(unique[i] === decodeURIComponent(prevcorp[j])) {
            flag=1;
          }
        }
        if(flag){
          $("#shopbuttons").append('<button type="button" class="shops-btn-Selected btn btn-primary text-wrap btn-md doubles"'+'id=shopbutton'+i+'">' +unique[i]+"</button>");
        }
        else{
          $("#shopbuttons").append('<button type="button" class="shops-btn-notSelected btn btn-outline-primary text-wrap btn-md doubles"'+'id=shopbutton'+i+'">' +unique[i]+"</button>");
        }
      }
      if (i%2==1){
        $("#shopbuttons"+(i-1)).addClass("w-100");
      }
      $(".shops-btn-notSelected").click(function (event){
        corp = event.currentTarget.innerText;
        //console.log(tag);
        var url = '/searchResults?';
        var u = [];
        u.push('cat='+vars.cat);
        u.push('lat='+vars.lat);
        u.push('lng='+vars.lng);
        if (corp){
          u.push('corp='+corp);
        }
        for (var i = 0; i < prevcorp.length; i++) {
          u.push('corp='+prevcorp[i]);
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
      $(".shops-btn-Selected").click(function (event) {
        corp = event.currentTarget.innerText;
        //console.log(tag);
        var url = '/searchResults?';
        var u = [];
        u.push('cat='+vars.cat);
        u.push('lat='+vars.lat);
        u.push('lng='+vars.lng);
        for (var i = 0; i < prevcorp.length; i++) {
          if(prevcorp[i]!=corp) {
            u.push('corp='+prevcorp[i]);
          }
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
    }
  })
}
function getQueryVars(){
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      if (vars[hash[0]]!=undefined){
        vars[hash[0]]=vars[hash[0]]+','+hash[1];
      }
      else vars[hash[0]] = hash[1];
  }
  var lng = vars["lng"];
  var lat = vars["lat"];
  var cat = vars["cat"];
  var corp= vars["corp"];
  return { lng, lat, cat,corp}
}


function searchResults() {
  var vars = getQueryVars();
  var lng = vars.lng;
  var lat = vars.lat;
  var cat = vars.cat;
  var corp= vars.corp ? vars.corp.split(','):[];
  console.log(corp);
  var shopids=[];
  $.get('/observatory/api/shops',function(data,status){
    for(var i=0;i<data.shops.length;i++){
      for (var j=0;j<corp.length;j++){
        if (data.shops[i].tags[0]==corp[j]){
          shopids.push(data.shops[i].id);
        }
      }
    }
    //console.log(shopids);
    $.get('/observatory/api/products?cat=' + cat, function(response, status) {
      var productsInCategory = response.products;
      //productsInCategory.filter(value => -1 !== vars.indexOf(value));
      //console.log(productsInCategory);
      var corpQuery = shopids.map(elem => {
        return '&shopId='+elem;
      }).join('');
      //console.log(corpQuery);
      var pricesQuery = '/observatory/api/prices?' + productsInCategory.map((p, index) => {
        return index !== 0 ? '&productId=' + p.id : 'productId=' + p.id
      }).join('') + corpQuery + '&geoDist=100&geoLat=' + lat + '&geoLng=' + lng + '&sort=price|ASC'
      //console.log(pricesQuery);
      $.get(pricesQuery, function(prices) {
        //console.log(prices);
        var html = '';
        if (prices.length==0 || (shopids.length==0 && corp.length!=0)) {
          html+='<div class="offset-md-3 col-md-6 text-center">Δεν βρέθηκαν αποτελέσματα</div>';
        }
        else {
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
        }
        $('#results').html(html);
      })
    })


  })
  //console.log(shopids);



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
  distance_range();
})
//real time ektypwsh ths epilegmenis timis
slider.on('input',function() {
  output.html(this.value);
});
distance_slider.on('input',function() {
  distance_output.html(this.value);
});
