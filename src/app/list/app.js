angular.module('ngTableTutorial', ['ngTable'])
.controller('tableController', function ($scope, $filter, ngTableParams) {

    });
});

$scope.usersTable = new ngTableParams({
    page: 1,
    count: 10
}, {
    total: $scope.users.length, 
    getData: function ($defer, params) {
        $scope.data = $scope.users.slice((params.page() - 1) * params.count(), params.page() * params.count());
        $defer.resolve($scope.data);
    }
});