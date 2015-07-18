'use strict';

var _ = require('underscore');

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



function getRestaurants(lat, lng, term, cb) {
    var searchString = lat+","+lng;
    var distance = 50000; //distance in meters
    yelp.search({term: term, ll:searchString, radius_filter: distance},cb);
}

function getRestaurantPrice(rest_id, cb) {
    // Passes average price for the restaurant with given restaurant id(rest_id) to the callback(cb) 
}

function getRec(lat, lng, term, cb) {
    getRestaurants(lat, lng, term, function (err, data) {
        var sorted = _.sortBy(data.businesses, function (elem) {
            return elem.rating;
        });
        cb(null, sorted[sorted.length - 1]);
    });
}

function getJourney(lat, lng, cb) {
    var journey = [];
    getRec(lat, lng, 'food', function (err, rest) {
        journey.push(rest);
        var coord = rest.location.coordinate;
        getRec(coord.latitude, coord.longitude, 'dessert', function (err, dsrt) {
            journey.push(dsrt);
            var coord_d = dsrt.location.coordinate;
            getRec(coord_d.latitude, coord_d.longitude, 'bar', function (err, bar) {
                journey.push(bar);
                cb(err, journey);
            });
        });
    });
}


getJourney(37.354611, -121.918866, function(){});

module.exports = {
    getRestaurants: getRestaurants,
    getJourney: getJourney
};
