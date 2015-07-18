'use strict';
var getUberPrice = require('../lib/getUberPrice');
var IndexModel = require('../models/index');

module.exports = function (router) {
    router.get('/:startLat/:startLng/:endLat/:endLng', function (req, res) {
        var start = {
            lat: req.params.startLat,
            lng: req.params.start:Lng
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

};
