 
scotchApp.controller('voyagerAPICtrl', function ($scope, $http, $cookies, $rootScope, $location, $templateCache, $window, $sce) {
    
    
    $scope.login = function () {
        $window.location.href = 'Templates/ACL-login.html';
    }
   
    function fetch() {
        var data = $http({
            method: 'GET',
            crossDomain: true,
            url: 'http://64.94.37.21:7014/vxws/item/110'
        }).then(function successCallback(response) {
           
            $scope.Message = $sce.trustAsHtml("My name is <span style = 'color:red'><b>Raju Gupta</b></span>");
            $scope.div = "<span style='color:red'><b >Raju Gupta HIIIIIII</b></span>";

            var x2js = new X2JS();
            var data = response.data;
            courses = x2js.xml_str2json(data);
            $scope.holdingData = courses.response.item.itemData;

        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });
    }
   // serviceParameters();
    function postData() {
         
        var parameters = {
            authFactor: '150',
            briefLogon: 'Y',
            pin: '15012'
        };
        var config = {
            params: parameters
        };
        var data = $http({
            method: 'POST',
            crossDomain: true,
            url: 'http://64.94.37.21:7014/vxws/AuthenticatePatronService', config
        }).then(function successCallback(response) {
 
            var x2js = new X2JS();
            var data = response.data;
            courses = x2js.xml_str2json(data);
            $scope.holdingData = courses.response.item.itemData;

        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });
    }

    function serviceParameters() {
        
        var xmlkey = 'Templates/Data.xml';
        $http.get('Templates/Data.xml').then(function (response) {
            $rootScope.dataxml = response;
        });
        var data = $http({
            method: 'POST',
            url: 'http://64.94.37.21:7014/vxws/SearchBibsForHeadingService',
            data: $rootScope.dataxml,
            headers: { "Content-Type": 'application/xml' }
        }).then(function successCallback(response) {
       
            var x2js = new X2JS();
            var data = response.data;
        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });

        
    }

    AuthenticatePatronService();
    function AuthenticatePatronService() {
      

        $http.get('Templates/Data.xml').then(function (response) {
            $rootScope.dataxml = response;
        });
        var data = $http({
            method: 'POST',
            url: 'http://64.94.37.21:7014/vxws/AuthenticatePatronService',
            data: $rootScope.dataxml,
            headers: { "Content-Type": 'application/xml' }
        }).then(function successCallback(response) {
             
            var x2js = new X2JS();
            var data = response.data;
        }, function errorCallback(response) {
            alert('some error!!!!!!');
        });


    }
});
