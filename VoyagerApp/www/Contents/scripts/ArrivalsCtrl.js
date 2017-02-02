/// <reference path="CalculatorService.js" />

scotchApp.controller('aboutController', function ($scope, $http) {

    $scope.$watch('search', function () {
        var data = fetch();
    });
    $scope.search = "Sherlock Holmes";
    function fetch() {
        var data = $http({
            method: 'GET',
            url: 'http://staging.sirez.com/babyhugzservice/ProductApi.svc/GetNewArrivalsProductList'
        }).then(function successCallback(response) {
             
            var data = response.data;
            $scope.productDetails = response.data.ResultData;

        }, function errorCallback(response) {

        });
    }
});


