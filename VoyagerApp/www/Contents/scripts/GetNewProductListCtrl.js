var myApp = angular.module('myApp', ['ProductService'], ['starter']);
myApp.controller('productCtrl', function ($scope, Services, Dbinfo) {
    $scope.ProductList = function () {
        $scope.GetNewProductList = Services.GetNewProductList();
        
    }
});

