/// <reference path="CalculatorService.js" />

scotchApp.controller('aboutController', function ($scope, $http, $cookies, $rootScope, $location, $templateCache) {
    fetch();

    $rootScope.$on('status_updated', function (event, obj) {
        $rootScope.tblData = obj.status;         
      //  $location.path('/table');
    })
   // $templateCache.get('templateId.html')
    function fetch() {
        var data = $http({
            method: 'GET',
            crossDomain: true,
            url: 'http://staging.sirez.com/babyhugzservice/ProductApi.svc/GetNewProductList'
        }).then(function successCallback(response) {
            var data = response.data;
            $scope.productDetails = response.data.ResultData;
            $cookies.cookiesData = response.data.ResultData;
            $rootScope.$broadcast('status_updated', { status: $scope.productDetails });
        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });
    }
});
