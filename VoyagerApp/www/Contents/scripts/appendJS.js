
scotchApp.controller('HomeCtrl1',  function ($scope, $http, $routeParams, $compile) {
    Deatils();    
    function Deatils() {        
        var data = $http({
            method: 'GET',
            url: 'http://staging.sirez.com/babyhugzservice/ProductApi.svc/GetNewProductList',
            // params: { id: $routeParams.id }
        }).then(function successCallback(response) {
            $scope.productDetail = response.data.ResultData;
            let generatedTemplate="";
            for (var i = 0; i < $scope.productDetail.length; i++) {
                 generatedTemplate +=  '<p>' + $scope.productDetail[i].ProductName + '</p>';                
            }
            sessionStorage.setItem("loginUser", "Raju");
            document.getElementById("tblDiv").innerHTML = generatedTemplate;
            $scope.loginUser = sessionStorage.getItem("loginUser");
        }, function errorCallback(response) {
            alert('Some Error!!!!!!!!!!!');
        });
    }
});