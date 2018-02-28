let updateWidget = function(data) {

  console.log("Got weather data: ", data)
  // YOUR CODE GOES HERE
  // HINT:
  // Weather icons are provided for you. Sample URL: http://openweathermap.org/img/w/01d.png
  // The very last part ('01d.png') should be obtained from the weather information.

  $(".card-text").text("It is " + Math.round(data.main.temp) + " degrees outside.")
  $(".card-title").text(data.name)
  $("img").attr("src",'http://openweathermap.org/img/w/'+data.weather[0].icon+".png")

}

let getParisWeather = function(event) {
  let latitude = "48.8566";
  let longitude = "2.3522";
  let apiKey = "76b81bc418323a5347ec46fa9ef345cb";
  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'

  weatherServiceURL += "lat=" + latitude
  weatherServiceURL += "&lon=" + longitude
  weatherServiceURL += "&appid=" + apiKey + "&units=imperial"

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

let getCurrentWeather = function(pos) {
  // console.log('Location data:', info)
  let latitude = pos.coords.latitude
  let longitude = pos.coords.longitude
  let apiKey = "76b81bc418323a5347ec46fa9ef345cb";
  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'

  weatherServiceURL += "lat=" + latitude
  weatherServiceURL += "&lon=" + longitude
  weatherServiceURL += "&appid=" + apiKey + "&units=imperial"
  
  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}


let currentLocation = function(event){
  navigator.geolocation.getCurrentPosition(getCurrentWeather)
}

window.onload = getParisWeather

$("#get_forecast").on("click", currentLocation)


////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
