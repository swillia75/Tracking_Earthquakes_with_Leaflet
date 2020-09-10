//Create function to get radius based on magnitude
function selectRadius (earthquakes) {

  return earthquakes * 1500;
    
};

//Create function to give differentt colors magnitudes
function selectColor (earthquakes) {

  console.log(earthquakes);
  
  if (earthquakes > 7) {
    return ("red");
  }
  else if (earthquakes > 6) {
    return ("orange");
  }
  else if (earthquakes > 5) {
    return ("yellow");
  }
  else if (earthquakes > 4) {
    return ("brown");
  }
  else if (earthquakes > 3) {
    return ("blue");
  }
  else if (earthquakes > 2) {
    return ("purple");
  }
  else if (earthquakes > 1) {
    return ("green");
  }
  else {
    return ("black");
  }
};

//Create function to create circle markers

function createMarkers(earthquakes) {


  //Define features to get data
  var features = earthquakes.features;

  console.log(features);
  \
  //Create array for quake markers
  var quakeMarkers = [];
   
  //Loop through features list to get lat, lon, and mag for the feature
  for (var i = 0; i < features.length; i++) {

    //Save marker data to variable
    var quakeMarker = L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[2]], {
                        fillOpacity: 0.75,
                        color: "white",
                        fillColor: selectColor(features[i].properties.mag),
                        radius: selectRadius(features[i].properties.mag)

                        //Create popup for each marker
                      }).bindPopup("<h3>" + features[i].properties.place +
                      "</h3><h3>Date/Time:" + new Date(features[i].properties.time) + 
                      "</h3><h3>Magnitude:" + (features[i].properties.mag) + "</h3>");
                  
    //Push quakeMarker to quakeMarkers array  
    quakeMarkers.push(quakeMarker);
      
  };
   var quakes = L.geoJSON(quakeMarkers);
   
   console.log(quakeMarkers);

  //Call createMap function using quakeMarker array 
  createMap(quakes);
};
  


//Create function to create map

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
    "Earthquakes": quakes
  };

    // Create map, giving it the streetmap and earthquakes layers 
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, quakes]
  });

    // Create a layer control
    // Pass in  baseMaps and overlayMaps
    // Add to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

 
};


  

//URL for all earthquakes for last 7days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Perform get request to url and call createMarkers function
d3.json(url, createMarkers);

