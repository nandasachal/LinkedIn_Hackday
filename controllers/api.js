'use strict';
var getUberPrice = require('../lib/getUberPrice');
var Yelp = require('../lib/getYelpData');
var IndexModel = require('../models/index');

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.send('ok');
    });
    router.get('/uberprice/:startLat/:startLng/:endLat/:endLng', function (req, res) {
        var start = {
            lat: req.params.startLat,
            lng: req.params.startLng
        };
        var end = {
            lat: req.params.endLat,
            lng: req.params.startLng
        };
        getUberPrice(start, end, function (err, pricing) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(pricing);
            }
        });
    });

    router.get('/nearby/:lat/:lng', function (req, res) {
        Yelp.getRestaurants(req.params.lat, req.params.lng, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    });

    router.get('/foodcost/:rest_id', function (req, res) {
        Yelp.getRestaurantPrice(req.params.rest_id, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    });

};
