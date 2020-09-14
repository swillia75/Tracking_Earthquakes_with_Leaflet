  //URL for all earthquakes for last 7days

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Perform get request to url and call createMarkers function

d3.json(url, function(data) {   

  //Pull out feature objects of data array

  var features = data.features

  console.log(features);

  var quakeMarkers = [];
  //Loop through features array to create markers

  for (i = 0; i < features.length; i++) {

    var color = " "

    if (features[i].properties.mag > 7) {
      color = "red";
    }
    else if (features[i].properties.mag  > 6) {
     color = "orange";
    }
    else if (features[i].properties.mag  > 5) {
      color = "yellow";
    }
    else if (features[i].properties.mag  > 4) {
      color = "brown";
    }
    else if (features[i].properties.mag  > 3) {
      color = "blue";
    }
    else if (features[i].properties.mag  > 2) {
      color = "purple";
    }
    else if (features[i].properties.mag  > 1) {
      color = "green";
    }
    else {
      color = "black";
    };
    //Create circle markers and call selectColor and selectRadius for each feature

    var quakeMarker = L.circleMarker([features[i].geometry.coordinates[1], features[i].geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,   
      radius: features[i].properties.mag *3

      //Create popup for each marker

    }).bindPopup("<h3>" + features[i].properties.place +
    "</h3><h3>Date/Time:" + new Date(features[i].properties.time) + 
    "</h3><h3>Magnitude:" + (features[i].properties.mag) + "</h3>"); 

    quakeMarkers.push(quakeMarker);
  
  };
  console.log(quakeMarkers);

  var quakes = L.layerGroup(quakeMarkers);

  console.log(quakes);

  //Add streetmap layer
    
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap
  };

  var overlayMaps = {
    "Earthquakes": quakes
  };

  console.log(quakes);

  //Create basemap

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layer: [streetmap, quakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsable: false
  }).addTo(myMap);

  //Create Legend

  var legend = L.control({position: "bottomright"});
  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend");
    var magnitude = ["Magnitude", "7", "6", "5", "4", "3", "2", "1", "<1"];
    var colorLabels = ["white", "red", "orange", "yellow", "brown", 
                      "blue", "purple", "green", "white"];
    
                    

    for (var i = 0; i < magnitude.length; i++) {
    
      div.innerHTML += 
        "<li style = \"background-color:" + colorLabels[i] + "\">" + magnitude[i] +"</li>" + "</div>";
    
    };
    return div;
    
    
  };
  legend.addTo(myMap);
});


