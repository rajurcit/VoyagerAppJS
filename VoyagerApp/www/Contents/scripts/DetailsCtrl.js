scotchApp.controller('DetailsController', function ($scope, $http, $routeParams) {
    $scope.$watch('search', function () {       
        Deatils();
    });

    function Deatils() {
        var data = $http({
            method: 'GET',            
            url: 'http://staging.sirez.com/babyhugzservice/ProductApi.svc/GetProductDetails/' + $routeParams.id + '',
           // params: { id: $routeParams.id }
        }).then(function successCallback(response) {            
            $scope.productDetail = response.data.ResultData;
            $scope.ProductName = $scope.productDetail.ProductDetails.ProductName
            $scope.SalePrice = $scope.productDetail.ProductDetails.SalePrice
            $scope.ProductId = $scope.productDetail.ProductDetails.ProductId
            $scope.ProductDescription = $scope.productDetail.ProductDetails.ProductDescription
        }, function errorCallback(response) {

        });
    }
});