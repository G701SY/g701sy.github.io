// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2FvNSIsImEiOiJjbGNxYWM5bWkwMXA3M3FwaTA0MzJueGtmIn0.QioUkc7lTQxRG4KSVbFnoA";

// Define a map object by initialising a Map from Mapbox
const map = new mapboxgl.Map({
  container: "map",
  // Replace YOUR_STYLE_URL with your style URL.
  style: "mapbox://styles/gao5/cle8eu8e7001m01mklulwnm62"
});

map.on("load", () => {
  const layers = [
    "Pass and Eat Safe",
    "Pass",
    "Improvement required",
    "Awaiting Inspection"
  ];
  const colors = ["#018571", "#80cdc1", "#a6611a", "#dfc27d"];

  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement("div");
    const key = document.createElement("span");
    key.className = "legend-key";
    key.style.backgroundColor = color;

    const value = document.createElement("span");
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  });
});

//直接copylab2
//a navigation control
map.addControl(new mapboxgl.NavigationControl(), "top-left");

//a find my current location control
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);

//a geocoder search control
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places", // Placeholder text for the search bar
  proximity: {
    longitude: 55.861724,
    latitude: -4.253617,
    zoom: 11
  } // Coordinates of Glasgow center
});

map.addControl(geocoder, "top-right");

//添加比例尺
const scale = new mapboxgl.ScaleControl({
  maxWidth: 100, //size of the scale bar
  unit: "metric"
});
map.addControl(scale);