
// Creating TopSpotsFactory to contain top spots related services

(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('TopSpotsFactory', TopSpotsFactory);

    TopSpotsFactory.$inject = ['$http','$q'];

    /* @ngInject */
    function TopSpotsFactory($http, $q) {
        var service = {
            getTopSpots: getTopSpots,
            addTopSpot: addTopSpot,
            deleteTopSpot: deleteTopSpot
        };
        return service;

        ////////////////

        //Defining TopSpots related services to get, add and delete topSpots

        function getTopSpots() {

            var defer = $q.defer();

                $http({
                method: 'GET',
                url: '../../topspots.json'
            }).then(function(response){
                if (typeof response.data === 'object'){
                    defer.resolve(response);
                } else{
                    defer.reject("No data found!");
                }              
            },
            function(error){
                defer.reject(error);
            });

            return defer.promise;

        }

        function addTopSpot(topSpots, topSpotName, topSpotDesc, topSpotLat, topSpotLong){

            var topSpotLocation = [topSpotLat, topSpotLong];
            var topSpot = {name: topSpotName, description: topSpotDesc, location: topSpotLocation};
            return topSpots.push(topSpot);

        }

        function deleteTopSpot(topSpots, index){
            
            return topSpots.splice(index, 1);

        }
    }
})();


    
