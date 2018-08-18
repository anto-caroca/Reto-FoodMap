/**
 * This example uses the Search Places API entypoint to find restaurants in 
 * Recoleta, Chile
 *
 * A full list of available request parameters can be found in the Places API documentation.
 * see:  http://developer.here.com/rest-apis/documentation/places/topics_api/resource-search.html
 *
 * Note that the places module https://js.api.here.com/v3/3.0/mapsjs-places.js
 * must be loaded to use the Places API endpoints
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 */
function searchPlaces(platform) {
  // creates a Search entypoint
  var search = new H.places.Search(platform.getPlacesService());
  // creates parameters for search request 
  var params = {
    'q': 'restaurant',
    'at': '-33.4167,-70.65' // coordenadas de la comuna de Recoleta
  };
  // creates a request with callbacks
  search.request(params, {}, onResult, onError);
}


/**
 * This function will be called once the Places REST API provides a response
 * @param  {Object} result          A JSONP object representing the  location(s) found.
 *
 * see: http://developer.here.com/rest-apis/documentation/places/topics_api/media-type-search.html
 *
 */
function onResult(result) {
  var places = result.results.items;
 // console.log(places);
  /*
   * The styling of the places response on the map is entirely under the developer's control.
   * A representative styling can be found the full JS + HTML code of this example
   * in the functions below:
   */
  addPlacesToMap(places);
  addPlacesToPanel(places);
}


/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 *
 * see: see: http://developer.here.com/rest-apis/documentation/places/topics_api/object-error.html
 */
function onError(error) {
  error = data;
  alert(error);
}


/**
 * Boilerplate map initialization code starts below:
 */


// Hold a reference to any infobubble opened
var bubble;

/**
 * Opens/Closes a infobubble
 * @param  {H.geo.Point} position     The location on the map.
 * @param  {String} text              The contents of the infobubble.
 */
function openBubble(position, text){
  if(!bubble){
    bubble =  new H.ui.InfoBubble(
      position,
      // The FO property holds the province name.
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}



/**
 * Creates a series of clickable markers for each place found  and adds it to the map.
 * @param {Object[]} places An array of places as received from the H.service.getPlacesService
 */
function addPlacesToMap(places) {
  var group = new  H.map.Group();
  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    map.setCenter(evt.target.getPosition());
    openBubble(
      evt.target.getPosition(), evt.target.content);
  }, false);

  group.addObjects(places.map(function (place) {
    var marker = new H.map.Marker({lat: place.position[0], lng: place.position[1]})
    marker.content = '<div style="font-size: 12px" ><h4 style="font-size: 15px">' + place.title +
      '</h4><h4 style="font-size: 12px">' + place.category.title + '</h4>' + place.vicinity + '</div>';
    return marker;
  }));

  map.addObject(group);

  // get geo bounding box for the group and set it to the map
  map.setViewBounds(group.getBounds());
}

/**
 * Creates a series of list items for each location found, and adds it to the panel.
 * @param {Object[]} locations An array of locations as received from the
 *                             H.service.GeocodingService
 */

function addPlacesToPanel(places){
// console.log(places);
/*  var nodeOL = document.createElement('select'),  // se crea select con titulo de cada restaurant
    i;
   
  /*nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';*/

  /* for (i = 0;  i < places.length; i += 1) {
     var li = document.createElement('option'),
        divLabel = document.createElement('option'),
        content =  '<strong style="font-size: large;">' + places[i].title  + '</strong>';

      divLabel.innerHTML = content;
      li.appendChild(divLabel);
      nodeOL.appendChild(li);
  }

 /*content += '&nbsp;<span style="font-size:smaller">(' +  places[i].category.title + ')</span></br>'; //esto muestra la diraccion de todos los restaurantes juntos
        content +=  places[i].vicinity + '</br>';                                                       // sacar index de cada restaurant y hacer match con su respectiva direccion
        content += '<strong>distance:</strong>' +  places[i].distance + 'm</br>';*/

  //placesContainer.appendChild(nodeOL);
}


// 1. initialize platform
var platform = new H.service.Platform({
  app_id: 'YTwDUxFfBXp7TI2GimXS',
  app_code: 'qlKZLMttFtDmjErf3WAolA',
  useHTTPS: true,
  useCIT: true
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map, {
    center: {lat: -33.4167, lng: -70.65},
    zoom: 15
  });

var placesContainer = document.getElementById('panel');

// add map behavior

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components

var ui = H.ui.UI.createDefault(map, defaultLayers);

searchPlaces(platform);


