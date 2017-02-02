﻿/// <reference path="CalculatorService.js" />

scotchApp.controller('aboutController', function ($scope, $http) {
    fetch();
    function fetch() {
        var data = $http({
            method: 'GET',
            url: 'http://staging.sirez.com/babyhugzservice/ProductApi.svc/GetNewProductList'
        }).then(function successCallback(response) {
            var data = response.data;
            $scope.productDetails = response.data.ResultData;
        }, function errorCallback(response) {

        });
    }
});


