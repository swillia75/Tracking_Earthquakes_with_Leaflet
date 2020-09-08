//Get query url for all earth quakes for last 7 days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Perform get request to url
d3.json(url, function(data){
    //Send data.features object to createfeatures function
    createfeatures(data.features);
});