
var latlon

//GetLocation Paste	

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(recordPosition, showError);
  } else {
    $(".area-results").innerHTML = "Geolocation is not supported by this browser.";
  }
}

function recordPosition(position) {
  latlon = position.coords.latitude.toFixed(2) + "," + position.coords.longitude.toFixed(2);
  console.log(latlon);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
//**GetLocation Paste

function locationMsg() {
  var locaMsg = $(".area-results").append("</br> <h3 class='waitMsg'>We don't have your location yet...</h3>");
  return locaMsg;
}

function getDataFromAPI(ll, callback) {
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + "40.78,-73.972";
  var settings = {
  	dataType: "jsonp",
  	jsonp: "true",
  	radius: "1000",
    type: "bar",
    opennow: "true",
  	key: "AIzaSyAUXG5JEf76eTBRQULEcs_EgYMPt3ibYNY"
  }
  $.getJSON(url, settings, callback);
}

function checkLatLon() {
  if (!latlon) {
    $(".area-results").append("<h2 class='laterMsg'>We don't have your location yet.  Press it again!</h2>");
  } else {
    $(".area-results").empty();
  }
}

function renderResults(data) {
  $(".area-results").empty();
  console.log(data);
  if (data.results.length) {
    for (var i = 0; i < data.results.length; i++) {
      var place = data.results[i];
      $(".area-results").append("<div class='placeSec'><ul class='placeName'>" + place.name + "</ul></div>");
      if (place.vicinity) {
        $(".area-results").append("<li>" + place.vicinity + "</li>");
      }
      if (place.city) {
        $(".area-results").append("<li>City: " + place.city + "</li>");
      }
      if (place.rating) {
        $(".area-results").append("<li> Customer Rating: " + place.rating + "</li>");
      } 
      if (place.name) {
        $(".area-results").append("<a href='https://www.google.com/maps/search/" + place.name + "'> Map It </a>");
      }
    }
  } else {
    $(".area-results").append("Sorry bro, your area sucks.");
  }
}

//Event Functions//

$(".give-local").click(function(e) {
  e.preventDefault();
  getLocation();
  $(".give-local").hide();
  $(".doAPI").show().css("display", "block");
  locationMsg();
});

$(".doAPI").click(function(e) {
  e.preventDefault();
  if (".area-results") {
    $(".area-results").empty();
  }
  checkLatLon();
  getDataFromAPI(latlon, renderResults);
});

//ME https://maps.googleapis.com/maps/api/place/nearbysearch/json?27.90,-110.92&radius=305&type=bar&key=AIzaSyAUXG5JEf76eTBRQULEcs_EgYMPt3ibYNY

//EXAMPLE https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY







