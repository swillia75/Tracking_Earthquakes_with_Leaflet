//Get query url for all earth quakes for last 7 days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Perform get request to url
d3.json(url, function(data){
    //Send data.features object to createfeatures function
    createFeatures(data.features);
});

//Create function to map earthquake data

function createFeatures(earthquakeData);

    // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

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
  var baseMap = {"Street Map": streetmap
};

}