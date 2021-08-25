var mymap = L.map('mapid').setView([56.1304, -106.3468], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  //access token associated with Alex M. account localhost3000 only:
  accessToken: 'pk.eyJ1IjoiYWxleHRoZW1hYyIsImEiOiJja3NvdmMxbHgwY3kxMm9xaDE2bmpta2Z5In0.Ffh1H3NBCGodmYzkhmhJCw'
}).addTo(mymap);
