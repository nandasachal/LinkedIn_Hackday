/**
 * Search Controller
 */

angular.module('RDash')
    .controller('SearchCtrl', ['$http', '$scope', SearchCtrl]);

function SearchCtrl($http, $scope) {
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
            self.list.items.push(angular.copy(item));
            if (self.list.items.length > 1) {
              self.list.transports.push({
                isOpen: false,
                choice: "fa-male"
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
        // navigator.geolocation.getCurrentPosition(function(geo) {
        //     var lat = "" + geo.coords.latitude;
        //     var log = "" + geo.coords.longitude;
        //     $http.get(["http://10.16.20.212:8000/api/nearby", lat, log].join("/"))
        //         .success(function(res) {
        //             var repos = res.businesses;
        //             self.repos = repos.map(function(repo) {
        //                 repo.value = repo.name.toLowerCase();
        //                 return repo;
        //             });
        //         });
        // });
                    $http.get("http://10.16.20.212:8000/api/nearby/37.354611/-121.918866")
                .success(function(res) {
                    var repos = res.businesses;
                    self.repos = repos.map(function(repo) {
                        repo.value = repo.name.toLowerCase();
                        return repo;
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

    $scope.removeItem = function (index) {
      self.list.items.splice(index, index);
      if (index != 0) {
        self.list.transports.splice(index-1, index-1);
      }
    }

    $scope.recommendJourney = function() {
      $http.get("http://10.16.20.212:8000/api/getjourney/37.354611/-121.918866")
        .success(function(res){
          for (var i in res) {
            selectedItemChange(res[i]);
          }
        })
    }

    $scope.selectTransport = function(transport, choice) {
      transport.choice = choice;
    }
}