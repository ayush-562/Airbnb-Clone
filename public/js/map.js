mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose style from mapbox's core styles
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

map.scrollZoom.disable();
// map.dragPan.disable();
map.addControl(new mapboxgl.NavigationControl());
map.setMaxZoom(14);
map.setMaxPitch(70);

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${listing.title}</h3><p>Exact Location provided after booking</p>`
        )
    )
    .addTo(map);
