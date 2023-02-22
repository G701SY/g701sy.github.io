// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2FvNSIsImEiOiJjbGNxYWM5bWkwMXA3M3FwaTA0MzJueGtmIn0.QioUkc7lTQxRG4KSVbFnoA";

const map = new mapboxgl.Map({
  container: "map", // container element id
  style: "mapbox://styles/gao5/clee7hvgj002y01ljeslb48fd",
  center: [-4.253617, 55.861724],
  zoom: 11
});

const data_url =
  "https://api.mapbox.com/datasets/v1/gao5/cleft399q02h72kpg8k7pnv91/features?access_token=pk.eyJ1IjoiZ2FvNSIsImEiOiJjbGNxYWM5bWkwMXA3M3FwaTA0MzJueGtmIn0.QioUkc7lTQxRG4KSVbFnoA";

map.on("load", () => {
  map.addLayer({
    id: "food",
    type: "circle",
    source: {
      type: "geojson",
      data: data_url
    },
    paint: {
      "circle-radius": 5,
      "circle-color": "#018571",
      "circle-opacity": 0.8
    }
  });

  //Slider interaction code goes below
  filterRating = ["!=", ["get", "RatingValue"], "placeholder"];
  filterYear = ["==", ["get", "RatingDate"], "2002"];

  map.setFilter("food", ["all", filterYear, filterRating]);

  document.getElementById("slider").addEventListener("input", (event) => {
    //Get the month value from the slider
    //Get the YEAR value from the slider
    const year = parseInt(event.target.value).toString();
    filterYear = ["==", ["get", "RatingDate"], year];

    //set the map filter
    map.setFilter("food", ["all", filterYear, filterRating]);

    // update text in the UI
    document.getElementById("RatingDate").innerText = year;
  });

  //Radio button interaction code goes below
  document.getElementById("filters").addEventListener("change", (event) => {
    const RatingValue = event.target.value;
    console.log(RatingValue);
    // update the map filter
    if (RatingValue == "all") {
      filterRating = ["!=", ["get", "RatingValue"], "placeholder"];
    } else if (RatingValue == "Pass and Eat Safe") {
      filterRating = ["==", ["get", "RatingValue"], "Pass and Eat Safe"];
    } else if (RatingValue == "Pass") {
      filterRating = ["==", ["get", "RatingValue"], "Pass"];
    } else if (RatingValue == "Improvement Required") {
      filterRating = ["==", ["get", "RatingValue"], "Improvement Required"];
    } else if (RatingValue == "Awaiting Inspection") {
      filterRating = ["==", ["get", "RatingValue"], "Awaiting Inspection"];
    } else {
      console.log("error");
    }
    map.setFilter("food", ["all", filterYear, filterRating]);
  });
});