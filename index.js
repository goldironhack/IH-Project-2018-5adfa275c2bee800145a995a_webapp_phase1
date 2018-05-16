const API_KEY = "AIzaSyA-SzJddoiSg2Rq6C45hY0O5yec0q7bEjQ";

var map;
var ny_coordinates= {lat:40.730610,lng:-73.935242};
var bro_coordinates= {lat:40.650002, lng:-73.949997};
var ny_marker;
var bro_marker;
var directionsService;
var directionsRenderer;
var polygon;
var randomCol;
var colo = [];
var ale = ['green','blue','red','yellow'];

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: ny_coordinates
        });
        ny_marker = new google.maps.Marker({
          position: ny_coordinates,
          map: map
        });
        bro_marker = new google.maps.Marker({
          position: bro_coordinates,
          map: map
        });
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        markerEvents(bro_marker);

        map.data.loadGeoJson(
            'http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');


        map.data.setStyle(function(feature){
            var color = randomCol();
            return {fillColor: color,
            strokeWeight: 1,
            fillOpacity : 0.3 };
        });
      }
function markerEvents(marker){
  if(marker != "undefined"){
    marker.addListener("click",function(){
      getRoute();
    });
  }
}
function getRoute(){
  var request =  {
    origin: ny_marker.position,
    destination: bro_marker.position,
    travelMode: 'DRIVING'
  };
  directionsRenderer.setMap(map);
  directionsService.route(request,function(result,status){
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    }
  });
}
function drawPolygon(polygon, color){
  polygon = new google.maps.Polygon({
  paths: triangleCoords,
  strokeColor: color,
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: color,
  fillOpacity: 0.35
});
polygon.setMap(map);
}
function randomCol(){
  hex = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
  for (var i = 0; i < 7; i++) {
    randomCo = "#";
    for (var j = 0; j < 6; i++) {
      pos = random(0,hex.length);
      randomCo += hex[pos];
    }
    colo.push(randomCo);
  }

  return colo[Math.floor(Math.random() * colo.length)];
}

function random(inferior,superior){
   numPosibilidades = superior - inferior;
   aleat = Math.random() * numPosibilidades;
   aleat = Math.floor(aleat);
   return parseInt(inferior) + aleat;
}