'use strict';

var yelp = require("yelp").createClient({
  consumer_key: "E-Q0xyoYv-4_7B9oVw_e_w", 
  consumer_secret: "3wKoRWHp6b4Xc3-ppmFVx75yFIU",
  token: "tPvdCqw12lpbMVcx9xV6uhFFnavaeXiN",
  token_secret: "kgpIbJJ5Ch_7vtaq6svV1Hu8OYg"
});

/**
yelp.search({term: "food", location: "Montreal"}, function(error, data) {
  console.log(error);
  console.log(data);
});
*/

/**
yelp.business("yelp-san-francisco", function(error, data) {
  console.log(error);
  console.log(data);
});
*/


function getRestaurants(lat, lng, cb) {
    // Passes Nearby restaurants for corresponding latitude and longitude to the callback(cb)
}

function getRestaurantPrice(rest_id, cb) {
    // Passes average price for the restaurant with given restaurant id(rest_id) to the callback(cb)
}
