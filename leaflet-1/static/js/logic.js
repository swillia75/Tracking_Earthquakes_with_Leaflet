//Create function to map earthquake data

function createFeatures(earthquakesData) {

    // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake

  function onEachFeature(features) {

    var placeMarkers = [];

    
    for (var i = 0; i < earthquakesData.length; i++) {

      var color = "";

      console.log(earthquakesData[i].properties.mag);

      if (earthquakesData[i].properties.mag > 7) {
        color = "red";
      }
      else if (earthquakesData[i].properties.mag > 6) {
        color = "orange";
      }
      else if (earthquakesData[i].properties.mag > 5) {
        color = "yellow";
      }
      else if (earthquakesData[i].properties.mag > 4) {
        color = "brown";
      }
      else if (earthquakesData[i].properties.mag > 3) {
        color = "blue";
      }
      else if (earthquakesData[i].properties.mag > 2) {
        color = "purple";
      }
      else if (earthquakesData[i].properties.mag > 1) {
        color = "green";
      }
      else {
      color = "black";
      }

      console.log(color)
  
      // Add circles to map

      placeMarkers.push(
        L.circle(earthquakesData[i].properties.place, {
          fillOpacity: 0.75,
          color: "white",
          fillColor: color,
          // Adjust radius
          radius: earthquakesData[i].properties.mag * 1500
        }).bindPopup("<h3>" + earthquakesData[i].properties.place +
        "</h3><h3>Date/Time:" + new Date(earthquakesData[i].properties.time) + 
        "</h3><h3>Magnitude:" + (earthquakesData[i].properties.mag) + "</h3>"));
      

      
    };
    console.log(placeMarkers);
   
  };
  



  //Create GeoJSON layer for map
  var quakes = L.geoJSON(earthquakesData, {
      onEachFeature: onEachFeature
  });

  createMap(L.layerGroup(placeMarkers));

};

function createMap(quakes) {

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
    Earthquakes: quakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, quakes]
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
d3.json(url, function(earthquakes){

  console.log(earthquakes);
    //Send data.features object to createfeatures function
    createFeatures(earthquakes.features);
});