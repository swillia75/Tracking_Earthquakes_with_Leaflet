//Create function to map earthquake data

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><h3>Date/Time:" + new Date(feature.properties.time) + 
    "</h3><h3>Magnitude:" + (feature.properties.mag) + "</h3>");
  };

  //Create GeoJSON layer for map
  var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
  });

  createMap(earthquakes);

};

function createMap(earthquakes) {

    //Add streetmap
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  //Create baseMap to hold streetmap
  var baseMaps = {"Street Map": streetmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Perform get request to url
d3.json(url, function(data){
    //Send data.features object to createfeatures function
    createFeatures(data.features);
});