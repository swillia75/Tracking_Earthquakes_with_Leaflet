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

// function createMarkers(earthquakes) {

//   var features = earthquakes.features;

// //     // Define a function we want to run once for each feature in the features array
// //   // Give each feature a popup describing the place and time of the earthquake
//   console.log(features);
//   //function onEachFeature(earthquakes) {
//      // Add circles to map
//   var quakeMarkers = [];
    
//   for (var i = 0; i < features.length; i++) {

//     console.log(features[i].geometry.coordinates[1]);

//     var quakeMarker = L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[2]], {
//                         fillOpacity: 0.75,
//                         color: "white",
//                         fillColor: selectColor(features[i].properties.mag),
        
//                         // Adjust radius
//                         radius: selectRadius(features[i].properties.mag)
//                       }).bindPopup("<h3>" + features[i].properties.place +
//                       "</h3><h3>Date/Time:" + new Date(features[i].properties.time) + 
//                       "</h3><h3>Magnitude:" + (features[i].properties.mag) + "</h3>");
      
//     console.log(quakeMarker);                 
      
//     quakeMarkers.push(quakeMarker);
      
//   };
//   console.log(quakeMarkers);
//   var quakes = L.layerGroup(quakeMarkers);

//   createMap(quakes);
// };
    //Call createMap function using quakeMarker array 
  

  


//Create function to create map

function createMap(quakes) {

  console.log(quakes);

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
  var baseMaps = {
    "Street Map": streetmap
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

  var features = earthquakes.features;

//     // Define a function we want to run once for each feature in the features array
//   // Give each feature a popup describing the place and time of the earthquake
  console.log(features);
  //function onEachFeature(earthquakes) {
     // Add circles to map
  var quakeMarkers = [];
    
  for (var i = 0; i < features.length; i++) {

    console.log(features[i].geometry.coordinates[1]);

    var quakeMarker = L.circle([features[i].geometry.coordinates[1], features[i].geometry.coordinates[2]], {
                        fillOpacity: 0.75,
                        color: "white",
                        fillColor: selectColor(features[i].properties.mag),
        
                        // Adjust radius
                        radius: selectRadius(features[i].properties.mag)
                      }).bindPopup("<h3>" + features[i].properties.place +
                      "</h3><h3>Date/Time:" + new Date(features[i].properties.time) + 
                      "</h3><h3>Magnitude:" + (features[i].properties.mag) + "</h3>");
      
    console.log(quakeMarker);                 
      
    quakeMarkers.push(quakeMarker);
      
  };
  console.log(quakeMarkers);
  L.layerGroup(quakeMarkers).addTo(myMap);
};


  

//URL for all earthquakes for last 7days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Perform get request to url and call createMarkers function
d3.json(url, createMap);