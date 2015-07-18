/**
 * Search Controller
 */

angular.module('RDash')
    .controller('SearchCtrl', ['$http', SearchCtrl]);

function SearchCtrl($http) {
    var self = this;
    self.isDisabled = false;
    self.repos = loadAll();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    self.list = {
      items: [],
      transports: []
    }

    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? self.repos.filter(createFilterFor(query)) : self.repos,
            deferred;
            return results;
    }

    function searchTextChange(text) {}

    function selectedItemChange(item) {
        if (item != null) {
            self.list.items.push(item);
            if (self.list.items.length > 1) {
              self.list.transports.push({
                isOpen: false
              })
            }
            self.searchText = null;
            self.selectedItem = null;
        }
    }
    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
        navigator.geolocation.getCurrentPosition(function(geo) {
            var lat = "" + geo.coords.latitude;
            var log = "" + geo.coords.longitude;
            $http.get(["http://10.16.20.212:8000/api/nearby", lat, log].join("/"))
                .success(function(res) {
                    var repos = res.businesses;
                    self.repos = repos.map(function(repo) {
                        repo.value = repo.name.toLowerCase();
                        return repo;
                    });
                });
        });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
        };
    }
}