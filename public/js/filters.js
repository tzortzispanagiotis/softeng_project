$( document ).ready(function() {
    console.log( "ready!" );
});

var searchresults=[];
var sad_flag=0;
/*Dilwseis synarthsewn
===================================*/
//vazei to url pou afora to category
//use=1 pataei koumpi,use 0 3epataei
function getCategoryUrl(cat,use) {
  u='';
  var vars=getQueryVars();
  var prevcat=vars.cat ?  vars.cat.split(','):[];
  if(cat && use==1) {
    u+='&cat=' + cat;
  }
  for (var i = 0; i < prevcat.length; i++) {
    if (use==1){
      u+='&cat='+prevcat[i];
    }
    else if (use==0) {
      if (prevcat[i]!=cat){
        u+='&cat='+prevcat[i];
      }
    }
  }
  return u;
}
//vazei to meros tou url pou afora to lng lat
function getStdUrl() {
  var vars=getQueryVars();
  var url='/searchResults?'
  var u = [];
  // if(cat) {
  //   u.push('cat=' + cat);
  // }
  // else {
  //   u.push('cat='+vars.cat);
  // }
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
  return url;
}
//ama use=1 tote epilogh alliws an 0 tote apoepilogh
function getCorpUrl(corp,use) {
  var vars=getQueryVars();
  var prevcorp= vars.corp ?  vars.corp.split(','):[];
  var url='';
  var u=[];
  if (corp && use==1){
    u.push('&corp='+corp);
  }
  for (var i = 0; i < prevcorp.length; i++) {
    if (use==1){
      u.push('&corp='+prevcorp[i]);
    }
    else if (use==0){
      if(prevcorp[i]!=corp) {
        u.push('&corp='+prevcorp[i]);
      }
    }
  }
  u.map((u, index) => {
      url += u;
  })
  return url;
}
//vazei sto url to kommati tou geoDist
function getGeoDist() {
  u='';
  if (getQueryVars().geoDist) {
    u+='&geoDist='+ getQueryVars().geoDist;
  }
  return u;
}
//vazei sto url to priceLimit
function getPriceLimit(){
  u='';
  if (getQueryVars().priceLimit) {
    u+='&priceLimit='+ getQueryVars().priceLimit;
  }
  return u;
}
var priceLimit;
var min_price;
var max_price;
var slider=$("#myRange");
var output=$("#showval");
//xeirizetai to slider twn timwn
function price_range() {
  $.ajax({
       url: "/observatory/api/prices",
       method: "GET",
       success: function(data,status) {
         console.log(data)
         min_price=parseFloat(data.prices[0].price);
         max_price=parseFloat(data.prices[0].price);
         for(var i=1;i<data.prices.length;i++){
           if(parseFloat(data.prices[i].price)>max_price){
             max_price=parseFloat(data.prices[i].price);
           }
           else if (parseFloat(data.prices[i].price)<min_price){
             min_price=parseFloat(data.prices[i].price);
           }
         }
         console.log("min="+min_price)
         console.log("max="+max_price)
         /*var*/ priceLimit=getQueryVars().priceLimit ? parseFloat(getQueryVars().priceLimit) : max_price;
         slider.attr("min",min_price);
         slider.attr("max",max_price+0.001);
        //  slider.attr("min",0.231);
        //  slider.attr("max",50);
         slider.attr("value",parseFloat(priceLimit).toFixed(3));
         output.html(parseFloat(priceLimit).toFixed(3));
       },
       error: function(data,status) {
         console.log(status);
       }
   })
}

var distance_slider = $("#myDistance");
var distance_output= $("#showdistval");
//xeirizetai to slider twn apostasewn
function distance_range(){
  var geoDist=getQueryVars().geoDist ? getQueryVars().geoDist: 5;
  distance_slider.attr("min",1);
  distance_slider.attr("max",15);
  distance_slider.attr("value",geoDist);
  distance_output.html(geoDist);
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
      var prevcat=vars.cat? vars.cat.split(','):[];
      unique = unique.filter( onlyUnique );
      for(var i=0;i<unique.length;i++){
          var flag=0;
          for(var j=0;j<prevcat.length;j++) {
            if (unique[i] === decodeURIComponent(prevcat[j])){
              flag=1;
            }
          }
          if (flag){
            $("#fuelbuttons").append('<button type="button" class="category-btn-Selected btn btn-light text-wrap btn-md doubles"'+'id="fuelbutton'+i+'">' +unique[i]+"</button>");
          }
          else {
            $("#fuelbuttons").append('<button type="button" class="category-btn-notSelected btn btn-outline-light text-wrap btn-md doubles"'+'id="fuelbutton'+i+'">' +unique[i]+"</button>");
          }
      }
      if (i%2==1){
        $("#fuelbutton"+(i-1)).addClass("w-100");
      }
      $(".category-btn-notSelected").click(function (event){
          cat = event.currentTarget.innerText;
          url=getStdUrl()+getCategoryUrl(cat,1)+getCorpUrl(null,1)+getGeoDist()+getPriceLimit();
          window.location.assign(url);
      })
      $(".category-btn-Selected").click(function (event){
        cat=event.currentTarget.innerText;
        url=getStdUrl()+getCategoryUrl(cat,0)+getCorpUrl(null,1)+getGeoDist()+getPriceLimit();
        window.location.assign(url);
      })
    }

  })
}

//emfanizei apo ti vasi tis etairies poy anhkoun ta katasthmata
function shops(){
  $.ajax({
    url: "/observatory/api/shops ",
    method: "GET",
    success: function(data,status) {
      //console.log(data);
      var unique=[];
      var corp;
      var vars=getQueryVars();
      var prevcorp= vars.corp ?  vars.corp.split(','):[];
      //console.log(prevcorp);
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
          $("#shopbuttons").append('<button type="button" class="shops-btn-Selected btn btn-light text-wrap btn-md doubles"'+'id=shopbutton'+i+'">' +unique[i]+"</button>");
        }
        else{
          $("#shopbuttons").append('<button type="button" class="shops-btn-notSelected btn btn-outline-light text-wrap btn-md doubles"'+'id=shopbutton'+i+'">' +unique[i]+"</button>");
        }
      }
      if (i%2==1){
        $("#shopbuttons"+(i-1)).addClass("w-100");
      }
      $(".shops-btn-notSelected").click(function (event){
        corp = event.currentTarget.innerText;
        //console.log(tag);
        url=getStdUrl(null)+getCategoryUrl(null,1)+getCorpUrl(corp,1)+getGeoDist()+getPriceLimit();
        window.location.assign(url);
      })
      $(".shops-btn-Selected").click(function (event) {
        corp = event.currentTarget.innerText;
        var url=getStdUrl()+getCategoryUrl(null,1)+getCorpUrl(corp,0)+getGeoDist()+getPriceLimit();
        window.location.assign(url);
      })
    }
  })
}
//pairnei apo to url tis times lng lat cat corp geoDist priceLimit
function getQueryVars(){
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      if (vars[hash[0]]!=undefined){
        vars[hash[0]]=vars[hash[0]]+','+decodeURIComponent(hash[1]);
      }
      else vars[hash[0]] = decodeURIComponent(hash[1]);
  }
  var lng = vars["lng"];
  var lat = vars["lat"];
  var cat = vars["cat"];searchResults
  var corp= vars["corp"];
  var geoDist=vars["geoDist"];
  var priceLimit=vars["priceLimit"];
  return { lng, lat, cat,corp,geoDist,priceLimit}
}
//kanei to query gia tis times kai emfanizei ta apotelesmata
function searchResults() {
  var vars = getQueryVars();
  var lng = vars.lng;
  var lat = vars.lat;
  var cat = vars.cat ? vars.cat.split(','):[];  //pinakas me categories
  var corp= vars.corp ? vars.corp.split(','):[];
  var geoDist=vars.geoDist ? vars.geoDist : 5;
  /*var*/ //priceLimit = vars.priceLimit ? parseFloat(vars.priceLimit) : parseFloat(max_price);
  console.log(priceLimit)
  //console.log(corp);
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
    u='';
    for (var i = 0; i < cat.length; i++) {
      if (i==0){
        u+='cat='+cat[i];
      }
      else {
        u+='&cat='+cat[i]
      }
    }
    var firstquery= '/observatory/api/products?'+u;
    $.get(firstquery, function(response, status) {
      var productsInCategory = response.products;
      //productsInCategory.filter(value => -1 !== vars.indexOf(value));
      //console.log(productsInCategory);
      var corpQuery = shopids.map(elem => {
        return '&shops='+elem;
      }).join('');
      //console.log(corpQuery);
      var pricesQuery = '/observatory/api/prices?' + productsInCategory.map((p, index) => {
        
        return index !== 0 ? '&products=' + p.id : 'products=' + p.id
      }).join('') + corpQuery + '&geoDist='+geoDist+'&geoLat=' + lat + '&geoLng=' + lng + '&sort=price|ASC'
      //console.log(pricesQuery);
  
      $.get(pricesQuery, function(foundPrices) {
        //console.log(foundPrices);
        console.log(priceLimit)
        var html = '';
        var outputprices=[];
        //console.log(priceLimit)
        for (var i = 0; i <foundPrices.prices.length; i++) {
          //console.log(foundPrices.prices[i].price)
          
          if (parseFloat(foundPrices.prices[i].price) <= priceLimit) {
            outputprices.push(foundPrices.prices[i]);
          }
        }
        console.log(outputprices)
        if (outputprices.length==0 || (shopids.length==0 && corp.length!=0)) {
          html+='<div class="offset-md-3 col-md-6 text-center white-text">Δεν βρέθηκαν αποτελέσματα</div>';
          sad_flag=1;
          $('#results').html(html);
        }
        else {
              
              outputprices.forEach(price => {
              //console.log(price);
                $.get('/observatory/api/products/'+price.productId, function (foundProduct) {
                  searchresults.push(outputprices[i]);
                  //console.log(foundProduct);
                  html = `
                  <div class="col-10 offset-1 offset-xl-0 col-xl-4">
                    <div class="card mb-3">
                      <div class="card-header bg-primary card-title"><b>${price.shopAddress} | ${price.shopTags.split(',')[0]}</b></div>
                      <div class="card-body">
                        <div class="float-right">
                          <b>${price.price} &euro;</b>
                        </div>
                        <div>
                          ${price.date}
                        </div>
                      </div>
                      <div class="card-footer">${price.productName} | <b>${foundProduct.category}</b>
                      </div>
                      <button type="button" value="${price.priceId}" class="btn btn-danger" id="report-button${price.priceId}">Αναφορά Τιμής</button>
                    </div>
                  </div>
                  `
                  $('#results').append(html);
                  setMarker(price.shopId);
                  $("#report-button"+price.priceId).click(function (event) {
                    var autoseimai=$(this);
                    var querystring='/observatory/api/prices/report/'+event.currentTarget.value;
                    $.get(querystring,function (data,status) {
                      alert('Επιτυχής Αναφορά Τιμής');
                      $(this).removeClass("report-button");
                      //autoseimai.removeClass('btn btn-danger').removeClass('report-button').addClass('bg-success reported-btn').html('Επιτύχης Αναφορά');
                      autoseimai.hide();
                    });
                  })
                })   
            })
         }
        //localStorage.setItem("lat",searchresult_lat);
          setMarkers();
          //$('#results').html(html);
      })
    })
  })
}

/*Telos dilwsewn
=================================================*/
$(document).ready(function() {
  price_range();
  fuel_range();
  shops();
  searchResults();
  distance_range();
  //setMarkers();
})
//real time ektypwsh ths epilegmenis timis
slider.on('input',function() {
  output.html(this.value);
  slider.on('mouseout',function() {
    url=getStdUrl()+getCategoryUrl(null,1)+getCorpUrl(null,1)+getGeoDist()+'&priceLimit='+this.value;
    window.location.assign(url);
  });
});
distance_slider.on('input',function() {
  distance_output.html(this.value);
  // url=getStdUrl()+getCorpUrl(null,1)+'&geoDist='+this.value;
  // window.location.assign(url);
  distance_slider.on('mouseout',function() {
    url=getStdUrl()+getCategoryUrl(null,1)+getCorpUrl(null,1)+'&geoDist='+this.value+getPriceLimit();
    window.location.assign(url);
  });
});

$("#show_filters").on('click',function (event) {
  if ($(this).hasClass("filtra-not-Selected")) {
    $("#mapfasi").addClass("d-none");
    $("#filterbar").removeClass("d-none")
    $(this).addClass("filtra-Selected").removeClass("filtra-not-Selected");
  }
  else {
    $("#mapfasi").removeClass("d-none");
    $("#filterbar").addClass("d-none")
    $(this).removeClass("filtra-Selected").addClass("filtra-not-Selected");
  }
})

/*TO KOMMATI POU AFORA TA maps
=====================================================*/

var map;
var lat=parseFloat(getQueryVars().lat);
var lng=parseFloat(getQueryVars().lng);
var mylatlng={lat: lat, lng: lng}
//console.log(mylatlng);
function createmap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: mylatlng,
    zoom: 13
  });
}
function setMarkers () {
  console.log(searchresults.length);
  var image=(sad_flag==1) ? 'static/img/sad_icon.png':'static/img/humanicon.png';
  var pos_marker = new google.maps.Marker({
          position: mylatlng,
          draggable:true,
          map: map,
          title: 'Η τοποθεσία μου',
          animation: google.maps.Animation.DROP,
          icon: image
  });
  google.maps.event.addListener(pos_marker, 'dragend', function()
  {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      latLng: pos_marker.getPosition()
    },
    function (result,status) {
      if (status==google.maps.GeocoderStatus.OK) {
        var address=result[0].formatted_address;
        var temp=address.split(",");
        var list = ""
        for (var i in temp) {
            list = list + temp[i]
            list = list + "+"
        }
        list = list.substring(0, list.length - 1)
        var lat,lng;
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address="+list+"&key=AIzaSyCL-EHbgBsjgKSaP4hZ38JFx2GtLv9R5wM",
            method: "GET",
            success: function(data,status) {
                lat = data.results[0].geometry.location.lat
                lng = data.results[0].geometry.location.lng
                url='/searchResults?lat='+lat+'&lng='+lng+getCategoryUrl(null,1)+getCorpUrl(null,1)+getGeoDist()+getPriceLimit();
                window.location.assign(url);
        }
      })
      }
    }
      )
  });

  pos_marker.addListener('click', toggleBounce);
  function toggleBounce() {
      if (pos_marker.getAnimation() !== null) {
        pos_marker.setAnimation(null);
      } else {
        pos_marker.setAnimation(google.maps.Animation.BOUNCE);
      }
  }
  //var search_final=searchresults.shop.filter(onlyUnique);
}

function setMarker(id){
    //console.log('mpika');
    var fuel_icon='static/img/fuelicon_red.png'
    $.get('/observatory/api/shops/'+id, function (foundShop) {
      var marker = new google.maps.Marker ({
        position: {lat:parseFloat(foundShop.lat),lng:parseFloat(foundShop.lng)},
        map: map,
        title: foundShop.address,
        icon: fuel_icon
    })
    })
}