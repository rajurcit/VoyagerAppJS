scotchApp.controller('mainController', function ($scope, $http, $routeParams) {
    $scope.$watch('search', function () {
        Deatils();
    });
    function Deatils() {
        var data = $http({
            method: 'GET',
            url: 'http://staging.sirez.com/babyhugzservice/ProductApi.svc/GetHomeProductList',
        }).then(function successCallback(response) {            
            $scope.GetHomeProductList = response.data.ResultData;
            
        }, function errorCallback(response) {
            alert('Ohh Some error');
        });
    }
});