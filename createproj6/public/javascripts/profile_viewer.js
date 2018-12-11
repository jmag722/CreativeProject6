angular.module('profileViewer', [])
    .controller('viewController', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.userList = [];
            $scope.getAll = function() {
                console.log("Retrieving profiles");
                return $http.get('/profiles/viewer').success(function(data) {
                    angular.copy(data, $scope.userList);
                });
            };
            $scope.getAll();
        }
        ]);